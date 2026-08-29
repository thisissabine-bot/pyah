import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

type JaNeeTwijfel = "ja" | "nee" | "twijfel" | null;

interface Body {
  opleiding?: string | null;
  yogastijlen?: string | null;
  andere_disciplines?: string | null;
  niveau_definitief?: "startend" | "ervaren" | null;

  datum_gesprek?: string | null;
  geboortedatum?: string | null;
  kvk_nummer?: string | null;
  verzekering_geldig_tot?: string | null;

  opleiding_in_orde?: boolean | null;
  verzekering_in_orde?: boolean | null;
  certificaten_besproken?: boolean | null;

  ytt_200u_in_orde?: JaNeeTwijfel;
  geschikt_1op1?: JaNeeTwijfel;
  regio_passend?: JaNeeTwijfel;
  houding_passend_pyah?: JaNeeTwijfel;
  veiligheid_professionaliteit?: JaNeeTwijfel;
  community_gevoel?: JaNeeTwijfel;
  intuitieve_match?: JaNeeTwijfel;
  checklist_opmerkingen?: string | null;

  praktisch_professioneel?: string | null;
  vakinhoudelijk?: string | null;
  geschiktheid_1op1_toelichting?: string | null;
  houding_cultuur?: string | null;
  energie_intuitie?: string | null;

  ingevuld_door?: string | null;
  extra_notities?: string | null;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as Body | null;

  if (!body) {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const supabase = createServerClient();

  const { data: aanmelding, error: fetchError } = await supabase
    .from("aanmeldingen")
    .select("id, type, match_beslissing")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !aanmelding || aanmelding.type !== "docent" || aanmelding.match_beslissing !== "ja") {
    return NextResponse.json({ error: "Aanmelding niet gevonden of nog niet uitgenodigd." }, { status: 404 });
  }

  const { error: upsertError } = await supabase
    .from("toetsingen")
    .upsert(
      {
        aanmelding_id: id,
        datum_gesprek: body.datum_gesprek || null,
        geboortedatum: body.geboortedatum || null,
        kvk_nummer: body.kvk_nummer || null,
        verzekering_geldig_tot: body.verzekering_geldig_tot || null,
        niveau_definitief: body.niveau_definitief || null,
        opleiding_in_orde: body.opleiding_in_orde ?? null,
        verzekering_in_orde: body.verzekering_in_orde ?? null,
        certificaten_besproken: body.certificaten_besproken ?? null,
        ytt_200u_in_orde: body.ytt_200u_in_orde || null,
        geschikt_1op1: body.geschikt_1op1 || null,
        regio_passend: body.regio_passend || null,
        houding_passend_pyah: body.houding_passend_pyah || null,
        veiligheid_professionaliteit: body.veiligheid_professionaliteit || null,
        community_gevoel: body.community_gevoel || null,
        intuitieve_match: body.intuitieve_match || null,
        checklist_opmerkingen: body.checklist_opmerkingen || null,
        praktisch_professioneel: body.praktisch_professioneel || null,
        vakinhoudelijk: body.vakinhoudelijk || null,
        geschiktheid_1op1_toelichting: body.geschiktheid_1op1_toelichting || null,
        houding_cultuur: body.houding_cultuur || null,
        energie_intuitie: body.energie_intuitie || null,
        ingevuld_door: body.ingevuld_door || "Sabine Blok",
        extra_notities: body.extra_notities || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "aanmelding_id" },
    );

  if (upsertError) {
    console.error("[aanmeldingen/toetsing] Supabase upsert-fout:", upsertError.message);
    return NextResponse.json({ error: "Toetsing kon niet worden opgeslagen." }, { status: 500 });
  }

  // Sectie 4.1: opleiding, yogastijlen, andere_disciplines en niveau_definitief zijn hier
  // bewerkbare kopieën van de oorspronkelijke aanmelding-velden (geen eigen kolom in
  // `toetsingen`) — worden bij opslaan teruggeschreven naar `aanmeldingen`, zodat er één
  // actuele waarde blijft bestaan die elders (bijv. Stap 4A) gebruikt kan worden.
  const { error: aanmeldingUpdateError } = await supabase
    .from("aanmeldingen")
    .update({
      opleiding: body.opleiding || null,
      yogastijlen: body.yogastijlen || null,
      andere_disciplines: body.andere_disciplines || null,
      niveau_inschatting: body.niveau_definitief || null,
    })
    .eq("id", id);

  if (aanmeldingUpdateError) {
    console.error("[aanmeldingen/toetsing] Supabase aanmelding-update-fout:", aanmeldingUpdateError.message);
    return NextResponse.json(
      { error: "Toetsing opgeslagen, maar de aanmelding kon niet worden bijgewerkt." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
