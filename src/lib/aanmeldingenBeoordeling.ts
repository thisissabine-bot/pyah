import type { Database } from "@/lib/supabase/types";

export type Aanmelding = Database["public"]["Tables"]["aanmeldingen"]["Row"];

export const NIVEAU_OPTIES = [
  { value: "startend", label: "Startend" },
  { value: "ervaren", label: "Ervaren" },
] as const;

export type StatusLabel = "Nieuw" | "Uitgenodigd" | "Afgewezen" | "Wachtlijst";

export function statusLabel(aanmelding: Pick<Aanmelding, "verwerkt" | "match_beslissing">): StatusLabel {
  if (!aanmelding.verwerkt) return "Nieuw";
  if (aanmelding.match_beslissing === "ja") return "Uitgenodigd";
  if (aanmelding.match_beslissing === "wachtlijst") return "Wachtlijst";
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

// Alfabetisch op woonplaats, ongeacht status — bedoeld om clusters van (vooral wachtlijst-)
// aanmeldingen per plaats te herkennen. Overschrijft de standaard status-gebaseerde groepering
// hierboven zolang deze sortering actief is (CC-opdracht: Wachtlijst-optie, Stap 2).
export function sorteerOpWoonplaats<T extends Pick<Aanmelding, "woonplaats">>(
  rows: T[],
  richting: "asc" | "desc",
): T[] {
  const gesorteerd = [...rows].sort((a, b) => (a.woonplaats ?? "").localeCompare(b.woonplaats ?? "", "nl"));
  return richting === "desc" ? gesorteerd.reverse() : gesorteerd;
}
