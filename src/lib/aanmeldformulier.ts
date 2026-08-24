import { z } from "zod";

export const JAREN_LESERVARING_OPTIES = [
  "Minder dan 1 jaar",
  "1-2 jaar",
  "3-5 jaar",
  "6-10 jaar",
  "Meer dan 10 jaar",
] as const;

export const RECENTE_LESPRAKTIJK_OPTIES = [
  "Ja, wekelijks",
  "Ja, regelmatig",
  "Af en toe",
  "Nee",
] as const;

export const ERVARING_PRIVELESSEN_OPTIES = [
  "Ja, regelmatig",
  "Ja, af en toe",
  "Nog niet",
] as const;

export const TRAININGSUREN_OPTIES = [
  "200 uur",
  "400 uur",
  "Meer dan 400 uur",
] as const;

export const REGIO_OPTIES = [
  { value: "haarlem_eo", label: "Ik woon in Haarlem of directe omgeving" },
  { value: "wachtlijst", label: "Ik woon buiten Haarlem en wil op de wachtlijst voor een volgende regio" },
] as const;

const verplichtAkkoord = z
  .boolean()
  .refine((v) => v === true, { message: "Dit vinkje is verplicht om je aan te melden." });

// Schema van het DB-facing formulier: dit is precies de vorm die naar de API/Supabase gaat.
export const aanmeldformulierSchema = z.object({
  naam: z.string().trim().min(1, "Vul je naam in."),
  email: z.string().trim().min(1, "Vul je e-mailadres in.").email("Vul een geldig e-mailadres in."),
  woonplaats: z.string().trim().min(1, "Vul je woonplaats in."),
  opleiding: z.string().trim().min(1, "Vertel bij welk instituut je je opleiding hebt gevolgd."),
  trainingsuren: z.enum(TRAININGSUREN_OPTIES, { message: "Maak een keuze." }),
  jaren_leservaring: z.enum(JAREN_LESERVARING_OPTIES, { message: "Maak een keuze." }),
  recente_lespraktijk: z.enum(RECENTE_LESPRAKTIJK_OPTIES, { message: "Maak een keuze." }),
  ervaring_privelessen: z.enum(ERVARING_PRIVELESSEN_OPTIES, { message: "Maak een keuze." }),
  yogastijlen: z.string().trim().min(1, "Vertel welke yogastijlen je lesgeeft."),
  andere_disciplines: z.string().trim(),
  motivatie: z.string().trim().min(1, "Vertel waarom je je wilt aansluiten bij Private Yoga at Home."),
  toelichting: z.string().trim(),
  regio: z.enum(["haarlem_eo", "wachtlijst"], { message: "Maak een keuze." }),
  akkoord_erkende_opleiding: verplichtAkkoord,
  akkoord_geen_garantie: verplichtAkkoord,
  akkoord_avb: verplichtAkkoord,
  akkoord_privacyverklaring: verplichtAkkoord,
});

export type AanmeldformulierValues = z.infer<typeof aanmeldformulierSchema>;

// Formulier-schema voor de client: voegt de ja/nee-schakelvragen toe die bepalen of
// andere_disciplines/toelichting verplicht zijn. Deze twee schakelvelden gaan niet mee
// naar de API — de client bouwt daar de DB-facing payload (AanmeldformulierValues) van.
export const aanmeldformulierFormSchema = aanmeldformulierSchema
  .omit({ andere_disciplines: true, toelichting: true })
  .extend({
    heeft_andere_disciplines: z.enum(["ja", "nee"], { message: "Maak een keuze." }),
    andere_disciplines: z.string().trim(),
    heeft_toelichting: z.enum(["ja", "nee"], { message: "Maak een keuze." }),
    toelichting: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    if (data.heeft_andere_disciplines === "ja" && data.andere_disciplines.trim() === "") {
      ctx.addIssue({ code: "custom", path: ["andere_disciplines"], message: "Vertel welke disciplines je aanbiedt." });
    }
    if (data.heeft_toelichting === "ja" && data.toelichting.trim() === "") {
      ctx.addIssue({ code: "custom", path: ["toelichting"], message: "Licht toe wat je met ons wilt delen." });
    }
  });

export type AanmeldformulierFormValues = z.infer<typeof aanmeldformulierFormSchema>;
