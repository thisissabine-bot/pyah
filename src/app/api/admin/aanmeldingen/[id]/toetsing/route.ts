import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

type JaNeeTwijfel = "ja" | "nee" | "twijfel" | null;

interface Body {
  niveau_definitief?: "startend" | "ervaren" | null;

  datum_gesprek?: string | null;
  geboortedatum?: string | null;
  kvk_nummer?: string | null;
  kor_van_toepassing_per?: string | null;
  kor_verdiend_cent?: number | null;
  verzekering_geldig_tot?: string | null;

  ytt_200u_in_orde?: JaNeeTwijfel;
  verzekering_in_orde?: JaNeeTwijfel;
  geschikt_1op1?: JaNeeTwijfel;
  regio_passend?: JaNeeTwijfel;
  houding_passend_pyah?: JaNeeTwijfel;
  veiligheid_professionaliteit?: JaNeeTwijfel;
  community_gevoel?: JaNeeTwijfel;
  intuitieve_match?: JaNeeTwijfel;
  checklist_opmerkingen?: string | null;

  vak_intake_ervaring?: string | null;
  vak_werkwijze_verwoorden?: string | null;
  vak_grenzen_doorverwijzing?: string | null;
  vak_rust_aandacht?: string | null;
  vak_veilig_zonder_groep?: string | null;
  vak_flexibiliteit?: string | null;
  vak_certificering_vs_ervaring?: string | null;
  houding_feedback_ontwikkeling?: string | null;
  houding_samenwerkingsstructuur?: string | null;
  houding_community_bereidheid?: string | null;
  houding_respect_platform?: string | null;
  energie_gelijkwaardig_zuiver?: string | null;
  energie_samenwerken_niet_halen?: string | null;
  energie_aanraden_dierbare?: string | null;

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
        kor_van_toepassing_per: body.kor_van_toepassing_per || null,
        kor_verdiend_cent: body.kor_verdiend_cent ?? null,
        verzekering_geldig_tot: body.verzekering_geldig_tot || null,
        niveau_definitief: body.niveau_definitief || null,
        ytt_200u_in_orde: body.ytt_200u_in_orde || null,
        verzekering_in_orde: body.verzekering_in_orde || null,
        geschikt_1op1: body.geschikt_1op1 || null,
        regio_passend: body.regio_passend || null,
        houding_passend_pyah: body.houding_passend_pyah || null,
        veiligheid_professionaliteit: body.veiligheid_professionaliteit || null,
        community_gevoel: body.community_gevoel || null,
        intuitieve_match: body.intuitieve_match || null,
        checklist_opmerkingen: body.checklist_opmerkingen || null,
        vak_intake_ervaring: body.vak_intake_ervaring || null,
        vak_werkwijze_verwoorden: body.vak_werkwijze_verwoorden || null,
        vak_grenzen_doorverwijzing: body.vak_grenzen_doorverwijzing || null,
        vak_rust_aandacht: body.vak_rust_aandacht || null,
        vak_veilig_zonder_groep: body.vak_veilig_zonder_groep || null,
        vak_flexibiliteit: body.vak_flexibiliteit || null,
        vak_certificering_vs_ervaring: body.vak_certificering_vs_ervaring || null,
        houding_feedback_ontwikkeling: body.houding_feedback_ontwikkeling || null,
        houding_samenwerkingsstructuur: body.houding_samenwerkingsstructuur || null,
        houding_community_bereidheid: body.houding_community_bereidheid || null,
        houding_respect_platform: body.houding_respect_platform || null,
        energie_gelijkwaardig_zuiver: body.energie_gelijkwaardig_zuiver || null,
        energie_samenwerken_niet_halen: body.energie_samenwerken_niet_halen || null,
        energie_aanraden_dierbare: body.energie_aanraden_dierbare || null,
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

  // niveau_definitief blijft de enige waarde die teruggeschreven wordt naar aanmeldingen
  // (aanmeldingen.niveau_inschatting) — opleiding/yogastijlen/andere_disciplines zijn sinds de
  // herstructurering puur read-only op deze pagina (sectie "Docent's eigen antwoorden"),
  // niet meer overschrijfbaar.
  const { error: aanmeldingUpdateError } = await supabase
    .from("aanmeldingen")
    .update({ niveau_inschatting: body.niveau_definitief || null })
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
