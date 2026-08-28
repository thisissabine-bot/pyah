import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { uitnodigingEmail, afwijzingEmail } from "@/lib/email/aanmeldingBeoordeling";

interface Body {
  niveau_inschatting?: "startend" | "ervaren";
  match_beslissing?: "ja" | "nee";
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as Body | null;

  if (!body || (body.match_beslissing !== "ja" && body.match_beslissing !== "nee")) {
    return NextResponse.json({ error: "Ongeldige beslissing." }, { status: 400 });
  }
  if (body.niveau_inschatting !== undefined && body.niveau_inschatting !== "startend" && body.niveau_inschatting !== "ervaren") {
    return NextResponse.json({ error: "Ongeldig niveau." }, { status: 400 });
  }
  if (body.match_beslissing === "ja" && !body.niveau_inschatting) {
    return NextResponse.json({ error: "Kies eerst een niveau-inschatting voordat je een uitnodiging verstuurt." }, { status: 400 });
  }

  const supabase = createServerClient();

  const { data: aanmelding, error: fetchError } = await supabase
    .from("aanmeldingen")
    .select("id, naam, email, type, verwerkt")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !aanmelding || aanmelding.type !== "docent") {
    return NextResponse.json({ error: "Aanmelding niet gevonden." }, { status: 404 });
  }
  if (aanmelding.verwerkt) {
    return NextResponse.json({ error: "Deze aanmelding is al beoordeeld." }, { status: 409 });
  }

  const nu = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("aanmeldingen")
    .update({
      niveau_inschatting: body.niveau_inschatting ?? null,
      match_beslissing: body.match_beslissing,
      beoordeeld_op: nu,
      verwerkt: true,
    })
    .eq("id", id);

  if (updateError) {
    console.error("[aanmeldingen/beslissing] Supabase update-fout:", updateError.message);
    return NextResponse.json({ error: "Beslissing kon niet worden opgeslagen." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const email = body.match_beslissing === "ja" ? uitnodigingEmail(aanmelding.naam) : afwijzingEmail(aanmelding.naam);

  let mailVerzonden = false;
  try {
    const verstuurd = await resend.emails.send({
      from: "Private Yoga at Home <docenten@privateyogaathome.nl>",
      to: aanmelding.email,
      replyTo: "docenten@privateyogaathome.nl",
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    if (verstuurd.error) {
      console.error("[aanmeldingen/beslissing] Resend-fout:", verstuurd.error);
    } else {
      mailVerzonden = true;
    }
  } catch (emailError) {
    console.error("[aanmeldingen/beslissing] Resend-fout:", emailError);
  }

  // mail_verzonden_op blijft leeg als de mail niet is gelukt, zodat dit zichtbaar blijft
  // (ook bij later terugkijken op de detailpagina) — niet alleen in de toast direct na de actie.
  if (mailVerzonden) {
    const { error: mailUpdateError } = await supabase
      .from("aanmeldingen")
      .update({ mail_verzonden_op: nu })
      .eq("id", id);
    if (mailUpdateError) {
      console.error("[aanmeldingen/beslissing] Supabase mail_verzonden_op-fout:", mailUpdateError.message);
    }
  }

  return NextResponse.json({
    ok: true,
    naam: aanmelding.naam,
    match_beslissing: body.match_beslissing,
    mail_verzonden: mailVerzonden,
  });
}
