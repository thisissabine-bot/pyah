import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { welkomstEmail, afwijzingEmailNaGesprek } from "@/lib/email/eindbeslissing";
import { niveauLabel } from "@/lib/aanmeldingenBeoordeling";

interface Body {
  eindbeslissing?: "match" | "geen_match";
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as Body | null;

  if (!body || (body.eindbeslissing !== "match" && body.eindbeslissing !== "geen_match")) {
    return NextResponse.json({ error: "Ongeldige beslissing." }, { status: 400 });
  }

  const supabase = createServerClient();

  const { data: aanmelding, error: fetchError } = await supabase
    .from("aanmeldingen")
    .select("id, naam, email, type, match_beslissing, niveau_inschatting, eindbeslissing")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !aanmelding || aanmelding.type !== "docent" || aanmelding.match_beslissing !== "ja") {
    return NextResponse.json({ error: "Aanmelding niet gevonden of nog niet uitgenodigd." }, { status: 404 });
  }
  if (aanmelding.eindbeslissing) {
    return NextResponse.json({ error: "Deze eindbeslissing is al genomen." }, { status: 409 });
  }

  const nu = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("aanmeldingen")
    .update({ eindbeslissing: body.eindbeslissing, eindbeslissing_op: nu })
    .eq("id", id);

  if (updateError) {
    console.error("[aanmeldingen/eindbeslissing] Supabase update-fout:", updateError.message);
    return NextResponse.json({ error: "Beslissing kon niet worden opgeslagen." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const email =
    body.eindbeslissing === "match"
      ? welkomstEmail(aanmelding.naam, niveauLabel(aanmelding.niveau_inschatting))
      : afwijzingEmailNaGesprek(aanmelding.naam);

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
      console.error("[aanmeldingen/eindbeslissing] Resend-fout:", verstuurd.error);
    } else {
      mailVerzonden = true;
    }
  } catch (emailError) {
    console.error("[aanmeldingen/eindbeslissing] Resend-fout:", emailError);
  }

  // eindbeslissing_mail_verzonden_op blijft leeg als de mail niet is gelukt, zelfde patroon
  // als mail_verzonden_op bij de Stap 2-beslissing (v1.32).
  if (mailVerzonden) {
    const { error: mailUpdateError } = await supabase
      .from("aanmeldingen")
      .update({ eindbeslissing_mail_verzonden_op: nu })
      .eq("id", id);
    if (mailUpdateError) {
      console.error("[aanmeldingen/eindbeslissing] Supabase mail_verzonden_op-fout:", mailUpdateError.message);
    }
  }

  return NextResponse.json({ ok: true, eindbeslissing: body.eindbeslissing, mail_verzonden: mailVerzonden });
}
