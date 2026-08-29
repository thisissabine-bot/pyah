import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { REGIO_OPTIES } from "@/lib/aanmeldformulier";
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
    .select("id, naam, regio, opleiding, yogastijlen, andere_disciplines, niveau_inschatting, match_beslissing, type")
    .eq("id", id)
    .eq("type", "docent")
    .maybeSingle();

  // Alleen toegankelijk voor al-uitgenodigde aanmeldingen (Stap 2, match_beslissing = 'ja'),
  // conform sectie 2 van de opdracht.
  if (!aanmelding || aanmelding.match_beslissing !== "ja") notFound();

  const { data: toetsing } = await supabase
    .from("toetsingen")
    .select("*")
    .eq("aanmelding_id", id)
    .maybeSingle();

  const regioLabel = REGIO_OPTIES.find((o) => o.value === aanmelding.regio)?.label ?? aanmelding.regio;

  return (
    <div className="container page-section">
      <Link className="admin-terug-link" href={`/dashboard/admin/aanmeldingen/${id}`}>
        ← Terug naar aanmelding
      </Link>

      <h2 className="heading-h2 accent-terracotta mb-text">Toetsingsdocument — {aanmelding.naam}</h2>
      <p className="text-body mb-section">{regioLabel ?? "—"}</p>

      <ToetsingForm
        aanmeldingId={id}
        initieel={{
          opleiding: aanmelding.opleiding ?? "",
          yogastijlen: aanmelding.yogastijlen ?? "",
          andere_disciplines: aanmelding.andere_disciplines ?? "",
          niveau_definitief: toetsing?.niveau_definitief ?? aanmelding.niveau_inschatting ?? "",
          datum_gesprek: toetsing?.datum_gesprek ?? "",
          geboortedatum: toetsing?.geboortedatum ?? "",
          kvk_nummer: toetsing?.kvk_nummer ?? "",
          verzekering_geldig_tot: toetsing?.verzekering_geldig_tot ?? "",
          opleiding_in_orde: toetsing?.opleiding_in_orde === true ? "ja" : toetsing?.opleiding_in_orde === false ? "nee" : "",
          verzekering_in_orde: toetsing?.verzekering_in_orde === true ? "ja" : toetsing?.verzekering_in_orde === false ? "nee" : "",
          certificaten_besproken: toetsing?.certificaten_besproken === true ? "ja" : toetsing?.certificaten_besproken === false ? "nee" : "",
          ytt_200u_in_orde: toetsing?.ytt_200u_in_orde ?? "",
          geschikt_1op1: toetsing?.geschikt_1op1 ?? "",
          regio_passend: toetsing?.regio_passend ?? "",
          houding_passend_pyah: toetsing?.houding_passend_pyah ?? "",
          veiligheid_professionaliteit: toetsing?.veiligheid_professionaliteit ?? "",
          community_gevoel: toetsing?.community_gevoel ?? "",
          intuitieve_match: toetsing?.intuitieve_match ?? "",
          checklist_opmerkingen: toetsing?.checklist_opmerkingen ?? "",
          praktisch_professioneel: toetsing?.praktisch_professioneel ?? "",
          vakinhoudelijk: toetsing?.vakinhoudelijk ?? "",
          geschiktheid_1op1_toelichting: toetsing?.geschiktheid_1op1_toelichting ?? "",
          houding_cultuur: toetsing?.houding_cultuur ?? "",
          energie_intuitie: toetsing?.energie_intuitie ?? "",
          ingevuld_door: toetsing?.ingevuld_door ?? "Sabine Blok",
          extra_notities: toetsing?.extra_notities ?? "",
        }}
      />
    </div>
  );
}
