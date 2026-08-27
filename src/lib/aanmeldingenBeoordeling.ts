import type { Database } from "@/lib/supabase/types";

export type Aanmelding = Database["public"]["Tables"]["aanmeldingen"]["Row"];

export const NIVEAU_OPTIES = [
  { value: "startend", label: "Startend" },
  { value: "ervaren", label: "Ervaren" },
] as const;

export type StatusLabel = "Nieuw" | "Uitgenodigd" | "Afgewezen";

export function statusLabel(aanmelding: Pick<Aanmelding, "verwerkt" | "match_beslissing">): StatusLabel {
  if (!aanmelding.verwerkt) return "Nieuw";
  if (aanmelding.match_beslissing === "ja") return "Uitgenodigd";
  return "Afgewezen";
}

export function niveauLabel(niveau: Aanmelding["niveau_inschatting"]): string {
  return NIVEAU_OPTIES.find((optie) => optie.value === niveau)?.label ?? "—";
}

// Sorteert docent-aanmeldingen volgens het overzicht: nog te beoordelen bovenaan
// (oudste aanmelding eerst), daaronder de al afgehandelde (meest recent beoordeeld eerst).
export function sorteerAanmeldingen<T extends Pick<Aanmelding, "verwerkt" | "created_at" | "beoordeeld_op">>(rows: T[]): T[] {
  const nietVerwerkt = rows
    .filter((row) => !row.verwerkt)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
  const verwerkt = rows
    .filter((row) => row.verwerkt)
    .sort((a, b) => (b.beoordeeld_op ?? "").localeCompare(a.beoordeeld_op ?? ""));
  return [...nietVerwerkt, ...verwerkt];
}
