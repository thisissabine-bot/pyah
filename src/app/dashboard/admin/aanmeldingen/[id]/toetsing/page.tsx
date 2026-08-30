import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import ToetsingForm from "@/components/admin/ToetsingForm";

// Voorkomt dat Netlify's durable/edge-cache een eerder gerenderde snapshot van deze toetsing
// blijft serveren nadat het formulier is opgeslagen.
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ToetsingPage({ params }: Props) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: aanmelding } = await supabase
    .from("aanmeldingen")
    .select(
      "id, naam, woonplaats, opleiding, trainingsuren, jaren_leservaring, recente_lespraktijk, ervaring_privelessen, yogastijlen, andere_disciplines, niveau_inschatting, match_beslissing, type",
    )
    .eq("id", id)
    .eq("type", "docent")
    .maybeSingle();

  // Alleen toegankelijk voor al-uitgenodigde aanmeldingen (Stap 2, match_beslissing = 'ja'),
  // conform sectie 5 van de opdracht.
  if (!aanmelding || aanmelding.match_beslissing !== "ja") notFound();

  const { data: toetsing } = await supabase
    .from("toetsingen")
    .select("*")
    .eq("aanmelding_id", id)
    .maybeSingle();

  return (
    <div className="container page-section">
      <Link className="admin-terug-link" href={`/dashboard/admin/aanmeldingen/${id}`}>
        ← Terug naar aanmelding
      </Link>

      <h2 className="heading-h2 accent-terracotta mb-text">Toetsingsdocument — {aanmelding.naam}</h2>
      <h3 className="heading-h3 mb-section">{aanmelding.woonplaats ?? "—"}</h3>

      <ToetsingForm
        aanmeldingId={id}
        docentAntwoorden={{
          opleiding: aanmelding.opleiding ?? "",
          trainingsuren: aanmelding.trainingsuren ?? "",
          jaren_leservaring: aanmelding.jaren_leservaring ?? "",
          recente_lespraktijk: aanmelding.recente_lespraktijk ?? "",
          ervaring_privelessen: aanmelding.ervaring_privelessen ?? "",
          yogastijlen: aanmelding.yogastijlen ?? "",
          andere_disciplines: aanmelding.andere_disciplines ?? "",
        }}
        initieel={{
          niveau_definitief: toetsing?.niveau_definitief ?? aanmelding.niveau_inschatting ?? "",
          datum_gesprek: toetsing?.datum_gesprek ?? "",
          geboortedatum: toetsing?.geboortedatum ?? "",
          kvk_nummer: toetsing?.kvk_nummer ?? "",
          kor_van_toepassing_per: toetsing?.kor_van_toepassing_per ?? "",
          kor_verdiend_euro:
            toetsing?.kor_verdiend_cent != null ? (toetsing.kor_verdiend_cent / 100).toFixed(2) : "",
          verzekering_geldig_tot: toetsing?.verzekering_geldig_tot ?? "",
          ytt_200u_in_orde: toetsing?.ytt_200u_in_orde ?? "",
          verzekering_in_orde: toetsing?.verzekering_in_orde ?? "",
          geschikt_1op1: toetsing?.geschikt_1op1 ?? "",
          regio_passend: toetsing?.regio_passend ?? "",
          houding_passend_pyah: toetsing?.houding_passend_pyah ?? "",
          veiligheid_professionaliteit: toetsing?.veiligheid_professionaliteit ?? "",
          community_gevoel: toetsing?.community_gevoel ?? "",
          intuitieve_match: toetsing?.intuitieve_match ?? "",
          checklist_opmerkingen: toetsing?.checklist_opmerkingen ?? "",
          vak_intake_ervaring: toetsing?.vak_intake_ervaring ?? "",
          vak_werkwijze_verwoorden: toetsing?.vak_werkwijze_verwoorden ?? "",
          vak_grenzen_doorverwijzing: toetsing?.vak_grenzen_doorverwijzing ?? "",
          vak_rust_aandacht: toetsing?.vak_rust_aandacht ?? "",
          vak_veilig_zonder_groep: toetsing?.vak_veilig_zonder_groep ?? "",
          vak_flexibiliteit: toetsing?.vak_flexibiliteit ?? "",
          vak_certificering_vs_ervaring: toetsing?.vak_certificering_vs_ervaring ?? "",
          houding_feedback_ontwikkeling: toetsing?.houding_feedback_ontwikkeling ?? "",
          houding_samenwerkingsstructuur: toetsing?.houding_samenwerkingsstructuur ?? "",
          houding_community_bereidheid: toetsing?.houding_community_bereidheid ?? "",
          houding_respect_platform: toetsing?.houding_respect_platform ?? "",
          energie_gelijkwaardig_zuiver: toetsing?.energie_gelijkwaardig_zuiver ?? "",
          energie_samenwerken_niet_halen: toetsing?.energie_samenwerken_niet_halen ?? "",
          energie_aanraden_dierbare: toetsing?.energie_aanraden_dierbare ?? "",
          ingevuld_door: toetsing?.ingevuld_door ?? "Sabine Blok",
          extra_notities: toetsing?.extra_notities ?? "",
        }}
      />
    </div>
  );
}
