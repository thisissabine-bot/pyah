import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { sorteerAanmeldingen, statusLabel } from "@/lib/aanmeldingenBeoordeling";

interface Props {
  searchParams: Promise<{ toast?: string; mail?: string; naam?: string }>;
}

export default async function AanmeldingenOverzichtPage({ searchParams }: Props) {
  const { toast, mail, naam } = await searchParams;
  const supabase = createServerClient();

  const { data } = await supabase
    .from("aanmeldingen")
    .select("id, naam, woonplaats, created_at, verwerkt, match_beslissing, beoordeeld_op")
    .eq("type", "docent");

  const rows = sorteerAanmeldingen(data ?? []);

  const mailMislukt = mail === "mislukt";
  const beslissingLabel = toast === "uitgenodigd" ? "uitnodiging" : toast === "afgewezen" ? "afwijzing" : null;
  const toastTekst =
    beslissingLabel && mailMislukt
      ? `Beslissing opgeslagen, maar de ${beslissingLabel}smail kon niet worden verstuurd naar ${naam ?? "de docent"}.`
      : beslissingLabel
        ? `${beslissingLabel === "uitnodiging" ? "Uitnodiging" : "Afwijzing"} verstuurd naar ${naam ?? "de docent"}.`
        : null;

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
                <th>Woonplaats</th>
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
                      </Link>
                    </td>
                    <td>
                      <Link className="admin-aanmeldingen-cel-link" href={href}>
                        {new Date(row.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
                      </Link>
                    </td>
                    <td>
                      <Link className="admin-aanmeldingen-cel-link" href={href}>
                        <span className={`admin-status-badge admin-status-badge--${status.toLowerCase()}`}>{status}</span>
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
