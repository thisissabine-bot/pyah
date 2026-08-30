// Kleine, gedeelde helpers voor e-mailteksten (gebruikt door zowel de Stap 2- als de
// Stap 4-mails).

export function voornaam(naam: string): string {
  return naam.trim().split(/\s+/)[0] ?? naam;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
