import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { REGIO_OPTIES } from "@/lib/aanmeldformulier";
import { niveauLabel } from "@/lib/aanmeldingenBeoordeling";
import BeoordelingForm from "@/components/admin/BeoordelingForm";

// Voorkomt dat Netlify's durable/edge-cache een eerder gerenderde snapshot van een specifieke
// aanmelding blijft serveren nadat de status/data is gewijzigd (bijv. na een nieuwe deploy of
// na een beslissing) — deze pagina moet altijd verse data tonen.
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

function veld(label: string, waarde: string | null) {
  return (
    <div className="admin-detail-veld">
      <span className="admin-detail-label">{label}</span>
      <span className="text-body">{waarde && waarde.trim() !== "" ? waarde : "—"}</span>
    </div>
  );
}

export default async function AanmeldingDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: aanmelding } = await supabase
    .from("aanmeldingen")
    .select("*")
    .eq("id", id)
    .eq("type", "docent")
    .maybeSingle();

  if (!aanmelding) notFound();

  const regioLabel = REGIO_OPTIES.find((o) => o.value === aanmelding.regio)?.label ?? aanmelding.regio;
  const datumAanmelding = new Date(aanmelding.created_at).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container page-section">
      <Link className="admin-terug-link" href="/dashboard/admin/aanmeldingen">
        ← Terug naar overzicht
      </Link>

      <h2 className="heading-h2 accent-terracotta mb-section">
        {aanmelding.naam}
        {aanmelding.regio === "wachtlijst" && <span className="admin-badge-regio">Buiten regio</span>}
      </h2>

      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Persoonlijke gegevens</h3>
        {veld("Naam", aanmelding.naam)}
        {veld("E-mail", aanmelding.email)}
        {veld("Woonplaats", aanmelding.woonplaats)}
        {veld("Regio", regioLabel)}
        {veld("Datum aanmelding", datumAanmelding)}
      </div>

      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Opleiding &amp; ervaring</h3>
        {veld("Opleiding", aanmelding.opleiding)}
        {veld("Trainingsuren", aanmelding.trainingsuren)}
        {veld("Jaren leservaring", aanmelding.jaren_leservaring)}
        {veld("Recente lespraktijk (afgelopen 6–12 maanden)", aanmelding.recente_lespraktijk)}
        {veld("Ervaring met privélessen", aanmelding.ervaring_privelessen)}
      </div>

      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Specialisaties</h3>
        {veld("Yogastijlen", aanmelding.yogastijlen)}
        {veld("Andere disciplines", aanmelding.andere_disciplines)}
      </div>

      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Motivatie &amp; toelichting</h3>
        {veld("Motivatie", aanmelding.motivatie)}
        {veld("Toelichting", aanmelding.toelichting)}
      </div>

      {aanmelding.verwerkt ? (
        <div className="admin-samenvatting">
          <p className="text-body mb-text">
            Beoordeeld op {aanmelding.beoordeeld_op
              ? new Date(aanmelding.beoordeeld_op).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })
              : "—"}
            {" — "}
            {aanmelding.match_beslissing === "ja"
              ? "Uitgenodigd"
              : aanmelding.match_beslissing === "wachtlijst"
                ? "Op wachtlijst"
                : "Afgewezen"}
            {" — niveau: "}
            {niveauLabel(aanmelding.niveau_inschatting)}
          </p>
          {!aanmelding.mail_verzonden_op && (
            <p className="admin-toast admin-toast--warning mb-text">
              De{" "}
              {aanmelding.match_beslissing === "ja"
                ? "uitnodigings"
                : aanmelding.match_beslissing === "wachtlijst"
                  ? "wachtlijst"
                  : "afwijzings"}
              mail is niet verstuurd. Neem handmatig contact op met {aanmelding.naam} — deze beslissing kan niet
              opnieuw via het systeem worden verstuurd.
            </p>
          )}
          {aanmelding.match_beslissing === "ja" && (
            <div className="btn-row">
              <Link className="btn-dark-b" href={`/dashboard/admin/aanmeldingen/${aanmelding.id}/toetsing`}>
                Toetsingsdocument invullen/bekijken
              </Link>
            </div>
          )}
        </div>
      ) : (
        <BeoordelingForm id={aanmelding.id} naam={aanmelding.naam} />
      )}
    </div>
  );
}
