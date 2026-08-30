// E-mailteksten voor de eindbeslissing na het kennismakingsgesprek (CC-opdracht: Stap 4A/4B,
// 30-08-2026). Los van de Stap 2-mails in aanmeldingBeoordeling.ts — andere fase, andere
// ondertekening (Sabine Blok i.p.v. Team Private Yoga at Home, want dit volgt op een
// persoonlijk gesprek).

import { wrapEmailHtml } from "./emailLayout";
import { voornaam, escapeHtml } from "./emailHelpers";

// Zelfde patroon als CALENDLY_LINK_PLACEHOLDER — profielaanmaak (Stap 5) is nog niet gebouwd.
export const REGISTRATIE_LINK_PLACEHOLDER = "#"; // TODO: vervangen zodra Stap 5 gebouwd is

const HANDTEKENING_SABINE = `Met warme groet,<br />
                      Sabine Blok<br />
                      Private Yoga at Home`;

export function welkomstEmail(naam: string, niveauLabel: string) {
  const voor = voornaam(naam);
  return {
    subject: "Welkom bij PYAH — hier zijn je volgende stappen",
    text: `Hoi ${voor},

Leuk dat we elkaar online hebben ontmoet. Ons gesprek voelde goed en ik ben blij je te mogen verwelkomen bij Private Yoga at Home.

Op basis van je ervaring en profiel plaats ik je als ${niveauLabel} docent binnen PYAH.

De volgende stappen zijn:

1. Officiële registratie
   Maak je account aan via: ${REGISTRATIE_LINK_PLACEHOLDER}

2. Profiel aanmaken
   Na registratie kun je direct beginnen met je docentprofiel.

3. Let op: AVB-verzekering verplicht
   Je profiel kan pas online als je een geldig bewijs van je bedrijfsaansprakelijkheidsverzekering (AVB) hebt geüpload. Zorg dat je dit bij de hand hebt.
   Dit geldt ook voor je certificaten voor de opleidingen die je hebt gedaan en de extra disciplines die je hebt gevolgd (indien beschikbaar).

4. Goedkeuring profiel
   Zodra je profiel klaar is, bekijk ik het. Pas daarna gaat het online op het platform.

Bij het aanmaken van je profiel kom je ook de Platformovereenkomst, de Algemene Voorwaarden Docenten en de Kwaliteits- en veiligheidsrichtlijnen tegen — je bevestigt deze daar digitaal.

Benieuwd naar de tarieven en het verschil tussen Startend en Ervaren? Bekijk de abonnementen: https://privateyogaathome.nl/voor-docenten/abonnement

Heb je vragen of loop je ergens tegenaan? Laat het me weten.

Ik kijk ernaar uit om je snel online te zien staan.

Met warme groet,
Sabine Blok
Private Yoga at Home`,
    html: wrapEmailHtml({
      handtekeningHtml: HANDTEKENING_SABINE,
      bodyHtml: `
        <p style="margin: 0 0 16px 0;">Hoi ${escapeHtml(voor)},</p>
        <p style="margin: 0 0 16px 0;">Leuk dat we elkaar online hebben ontmoet. Ons gesprek voelde goed en ik ben blij je te mogen verwelkomen bij Private Yoga at Home.</p>
        <p style="margin: 0 0 16px 0;">Op basis van je ervaring en profiel plaats ik je als ${escapeHtml(niveauLabel)} docent binnen PYAH.</p>
        <p style="margin: 0 0 8px 0;"><strong>De volgende stappen zijn:</strong></p>
        <p style="margin: 0 0 4px 0;"><strong>1. Officiële registratie</strong></p>
        <p style="margin: 0 0 16px 0;">
          <a href="${escapeHtml(REGISTRATIE_LINK_PLACEHOLDER)}" style="background-color: #a66658; color: #ffffff; padding: 12px 24px; text-decoration: none; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 15px;">Maak je account aan</a>
        </p>
        <p style="margin: 0 0 4px 0;"><strong>2. Profiel aanmaken</strong></p>
        <p style="margin: 0 0 16px 0;">Na registratie kun je direct beginnen met je docentprofiel.</p>
        <p style="margin: 0 0 4px 0;"><strong>3. Let op: AVB-verzekering verplicht</strong></p>
        <p style="margin: 0 0 16px 0;">Je profiel kan pas online als je een geldig bewijs van je bedrijfsaansprakelijkheidsverzekering (AVB) hebt geüpload. Zorg dat je dit bij de hand hebt. Dit geldt ook voor je certificaten voor de opleidingen die je hebt gedaan en de extra disciplines die je hebt gevolgd (indien beschikbaar).</p>
        <p style="margin: 0 0 4px 0;"><strong>4. Goedkeuring profiel</strong></p>
        <p style="margin: 0 0 16px 0;">Zodra je profiel klaar is, bekijk ik het. Pas daarna gaat het online op het platform.</p>
        <p style="margin: 0 0 16px 0;">Bij het aanmaken van je profiel kom je ook de Platformovereenkomst, de Algemene Voorwaarden Docenten en de Kwaliteits- en veiligheidsrichtlijnen tegen — je bevestigt deze daar digitaal.</p>
        <p style="margin: 0 0 16px 0;">Benieuwd naar de tarieven en het verschil tussen Startend en Ervaren? Bekijk de <a href="https://privateyogaathome.nl/voor-docenten/abonnement" style="color: #a66658;">abonnementen</a>.</p>
        <p style="margin: 0 0 16px 0;">Heb je vragen of loop je ergens tegenaan? Laat het me weten.</p>
        <p style="margin: 0;">Ik kijk ernaar uit om je snel online te zien staan.</p>
      `,
    }),
  };
}

export function afwijzingEmailNaGesprek(naam: string) {
  const voor = voornaam(naam);
  return {
    subject: "Terugkoppeling op ons gesprek",
    text: `Hoi ${voor},

Bedankt voor ons gesprek, het was fijn om je beter te leren kennen.

Ons gesprek voelde prettig, maar ik merk dat er toch niet genoeg aansluiting is om nu een goede match te maken.

Ik wens je heel veel succes en wie weet komen we elkaar in de toekomst opnieuw tegen.

Met warme groet,
Sabine Blok
Private Yoga at Home`,
    html: wrapEmailHtml({
      handtekeningHtml: HANDTEKENING_SABINE,
      bodyHtml: `
        <p style="margin: 0 0 16px 0;">Hoi ${escapeHtml(voor)},</p>
        <p style="margin: 0 0 16px 0;">Bedankt voor ons gesprek, het was fijn om je beter te leren kennen.</p>
        <p style="margin: 0 0 16px 0;">Ons gesprek voelde prettig, maar ik merk dat er toch niet genoeg aansluiting is om nu een goede match te maken.</p>
        <p style="margin: 0;">Ik wens je heel veel succes en wie weet komen we elkaar in de toekomst opnieuw tegen.</p>
      `,
    }),
  };
}
