import { Resend } from "resend";
import { NextResponse } from "next/server";
import { aanmeldformulierSchema, REGIO_OPTIES } from "@/lib/aanmeldformulier";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = aanmeldformulierSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldige of onvolledige gegevens." }, { status: 400 });
  }

  const values = parsed.data;
  const supabase = createServerClient();

  const { error: insertError } = await supabase.from("aanmeldingen").insert({
    naam: values.naam,
    email: values.email,
    woonplaats: values.woonplaats,
    opleiding: values.opleiding,
    trainingsuren: values.trainingsuren,
    jaren_leservaring: values.jaren_leservaring,
    recente_lespraktijk: values.recente_lespraktijk,
    ervaring_privelessen: values.ervaring_privelessen,
    yogastijlen: values.yogastijlen || null,
    andere_disciplines: values.andere_disciplines || null,
    motivatie: values.motivatie,
    toelichting: values.toelichting || null,
    regio: values.regio,
    akkoord_erkende_opleiding: values.akkoord_erkende_opleiding,
    akkoord_geen_garantie: values.akkoord_geen_garantie,
    akkoord_avb: values.akkoord_avb,
    akkoord_privacyverklaring: values.akkoord_privacyverklaring,
    type: "docent",
    verwerkt: false,
  });

  if (insertError) {
    console.error("[aanmeldformulier] Supabase insert-fout:", insertError.message);
    return NextResponse.json({ error: "Aanmelding kon niet worden opgeslagen." }, { status: 500 });
  }

  const regioLabel = REGIO_OPTIES.find((o) => o.value === values.regio)?.label ?? values.regio;
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const bevestiging = await resend.emails.send({
      from: "Private Yoga at Home <noreply@privateyogaathome.nl>",
      to: values.email,
      subject: "Bedankt voor je aanmelding — Private Yoga at Home",
      text: `Hoi ${values.naam},

Bedankt voor je aanmelding als yogadocent bij Private Yoga at Home.

Wat gebeurt er nu?

1. Bevestiging
Je ontvangt deze e-mail als bevestiging dat we je aanmelding hebben ontvangen. Je hoort meestal binnen 5 werkdagen van ons.

2. Beoordeling
We bekijken je opleiding, leservaring en of jouw achtergrond aansluit bij Private Yoga at Home.

3. Kennismakingsgesprek
Zien we een mogelijke match? Dan nodigen we je uit voor een online kennismakingsgesprek.

4. Profiel aanmaken
Na een positieve kennismaking ontvang je een uitnodiging om je docentprofiel aan te maken. Let op: een AVB-verzekering is hierbij verplicht. Zodra alles is gecontroleerd, wordt je profiel zichtbaar op het platform.

Heb je vragen? Stuur een e-mail naar docenten@privateyogaathome.nl.

Fijne dag,
Team Private Yoga at Home`,
    });
    if (bevestiging.error) {
      console.error("[aanmeldformulier] Resend-fout (bevestigingsmail):", bevestiging.error);
    }

    const notificatie = await resend.emails.send({
      from: "Private Yoga at Home <noreply@privateyogaathome.nl>",
      to: "admin@privateyogaathome.nl",
      subject: `Nieuwe docentaanmelding — ${values.naam}`,
      text: `Nieuwe aanmelding via /voor-docenten/aanmelden:

Naam: ${values.naam}
E-mail: ${values.email}
Woonplaats: ${values.woonplaats}
Regio-keuze: ${regioLabel}
Opleiding: ${values.opleiding}
Trainingsuren: ${values.trainingsuren}
Jaren leservaring: ${values.jaren_leservaring}
Recente lespraktijk: ${values.recente_lespraktijk}
Ervaring privélessen: ${values.ervaring_privelessen}
Yogastijlen: ${values.yogastijlen || "—"}
Andere disciplines: ${values.andere_disciplines || "—"}
Motivatie: ${values.motivatie}
Toelichting: ${values.toelichting || "—"}`,
    });
    if (notificatie.error) {
      console.error("[aanmeldformulier] Resend-fout (notificatie Sabine):", notificatie.error);
    }
  } catch (emailError) {
    console.error("[aanmeldformulier] Resend-fout:", emailError);
  }

  return NextResponse.json({ ok: true });
}
