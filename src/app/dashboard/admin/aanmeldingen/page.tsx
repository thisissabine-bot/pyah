import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { sorteerAanmeldingen, sorteerOpWoonplaats, statusLabel, statusBadgeSlug } from "@/lib/aanmeldingenBeoordeling";

// Voorkomt dat Netlify's durable/edge-cache een eerder gerenderde snapshot van dit overzicht
// blijft serveren nadat de status/data van een aanmelding is gewijzigd.
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  searchParams: Promise<{ toast?: string; mail?: string; naam?: string; sort?: string; dir?: string }>;
}

const TOAST_BERICHTEN: Record<string, { ok: (naam: string) => string; mislukt: (naam: string) => string }> = {
  uitgenodigd: {
    ok: (naam) => `Uitnodiging verstuurd naar ${naam}.`,
    mislukt: (naam) => `Beslissing opgeslagen, maar de uitnodigingsmail kon niet worden verstuurd naar ${naam}.`,
  },
  afgewezen: {
    ok: (naam) => `Afwijzing verstuurd naar ${naam}.`,
    mislukt: (naam) => `Beslissing opgeslagen, maar de afwijzingsmail kon niet worden verstuurd naar ${naam}.`,
  },
  wachtlijst: {
    ok: (naam) => `${naam} is op de wachtlijst gezet en de bevestigingsmail is verstuurd.`,
    mislukt: (naam) => `Beslissing opgeslagen, maar de wachtlijstmail kon niet worden verstuurd naar ${naam}.`,
  },
};

export default async function AanmeldingenOverzichtPage({ searchParams }: Props) {
  const { toast, mail, naam, sort, dir } = await searchParams;
  const supabase = createServerClient();

  const { data } = await supabase
    .from("aanmeldingen")
    .select("id, naam, woonplaats, created_at, verwerkt, match_beslissing, beoordeeld_op, regio, eindbeslissing")
    .eq("type", "docent");

  const woonplaatsRichting = sort === "woonplaats" ? (dir === "desc" ? "desc" : "asc") : null;
  const rows = woonplaatsRichting
    ? sorteerOpWoonplaats(data ?? [], woonplaatsRichting)
    : sorteerAanmeldingen(data ?? []);

  const woonplaatsSortHref = `/dashboard/admin/aanmeldingen?sort=woonplaats&dir=${woonplaatsRichting === "asc" ? "desc" : "asc"}`;
  const woonplaatsSortIndicator = woonplaatsRichting === "asc" ? " ↑" : woonplaatsRichting === "desc" ? " ↓" : "";

  const mailMislukt = mail === "mislukt";
  const bericht = toast ? TOAST_BERICHTEN[toast] : undefined;
  const toastTekst = bericht ? (mailMislukt ? bericht.mislukt : bericht.ok)(naam ?? "de docent") : null;

  return (
    <div className="container page-section">
      <h2 className="heading-h2 accent-terracotta mb-section">Aanmeldingen</h2>

      {toastTekst && (
        <p className={`admin-toast mb-section${mailMislukt ? " admin-toast--warning" : ""}`}>{toastTekst}</p>
      )}

      {rows.length === 0 ? (
        <p className="text-body">Er zijn nog geen docentaanmeldingen.</p>
      ) : (
        <div className="admin-aanmeldingen-tabel-wrapper">
          <table className="admin-aanmeldingen-tabel">
            <thead>
              <tr>
                <th>Naam</th>
                <th>
                  <Link className="admin-sort-link" href={woonplaatsSortHref}>
                    Woonplaats{woonplaatsSortIndicator}
                  </Link>
                </th>
                <th>Datum aanmelding</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const status = statusLabel(row);
                const href = `/dashboard/admin/aanmeldingen/${row.id}`;
                return (
                  <tr key={row.id} className={`admin-aanmeldingen-rij ${index % 2 === 0 ? "admin-aanmeldingen-rij-a" : "admin-aanmeldingen-rij-b"}`}>
                    <td>
                      <Link className="admin-aanmeldingen-cel-link" href={href}>
                        {row.naam}
                      </Link>
                    </td>
                    <td>
                      <Link className="admin-aanmeldingen-cel-link" href={href}>
                        {row.woonplaats ?? "—"}
                        {row.regio === "wachtlijst" && <span className="admin-badge-regio">Buiten regio</span>}
                      </Link>
                    </td>
                    <td>
                      <Link className="admin-aanmeldingen-cel-link" href={href}>
                        {new Date(row.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
                      </Link>
                    </td>
                    <td>
                      <Link className="admin-aanmeldingen-cel-link" href={href}>
                        <span className={`admin-status-badge admin-status-badge--${statusBadgeSlug(status)}`}>{status}</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
