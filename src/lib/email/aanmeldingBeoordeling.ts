// E-mailteksten voor de match-beslissing op een docentaanmelding (CC-opdracht: Aanmeldingen-overzicht, Stap 2;
// HTML-opmaak + handtekening toegevoegd via CC-opdracht: HTML e-mailsjabloon met handtekening, 28-08-2026).

import { wrapEmailHtml } from "./emailLayout";

// De Calendly-link staat nog niet vast — één plek, eenvoudig aan te passen zodra bekend.
export const CALENDLY_LINK_PLACEHOLDER = "#"; // TODO: vervangen zodra Calendly-link bekend is

function voornaam(naam: string): string {
  return naam.trim().split(/\s+/)[0] ?? naam;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function uitnodigingEmail(naam: string) {
  const voor = voornaam(naam);
  return {
    subject: "Leuk je beter te leren kennen — kennismakingsgesprek Private Yoga at Home",
    text: `Hoi ${voor},

Bedankt voor je aanmelding bij Private Yoga at Home. We hebben je gegevens
rustig doorgenomen en we zijn benieuwd naar jou!

Graag plannen we een kort online kennismakingsgesprek. Daarin bespreken we
onder andere je ervaring, de abonnementsvorm en of het van beide kanten
voelt als een match.

Plan hier je gesprek in: ${CALENDLY_LINK_PLACEHOLDER}
Mochten deze data voor jou niet goed uitkomen, mail me dan gerust met
nieuwe data.

Heb je vooraf vragen? Mail gerust naar docenten@privateyogaathome.nl.

Tot snel!

Warme groet,
Sabine — Private Yoga at Home`,
    html: wrapEmailHtml({
      bodyHtml: `
        <p style="margin: 0 0 16px 0;">Hoi ${escapeHtml(voor)},</p>
        <p style="margin: 0 0 16px 0;">Bedankt voor je aanmelding bij Private Yoga at Home. We hebben je gegevens rustig doorgenomen en we zijn benieuwd naar jou!</p>
        <p style="margin: 0 0 16px 0;">Graag plannen we een kort online kennismakingsgesprek. Daarin bespreken we onder andere je ervaring, de abonnementsvorm en of het van beide kanten voelt als een match.</p>
        <p style="margin: 0 0 8px 0;">Plan hier je gesprek in:</p>
        <p style="margin: 0 0 16px 0;">
          <a href="${CALENDLY_LINK_PLACEHOLDER}" style="background-color: #a66658; color: #ffffff; padding: 12px 24px; text-decoration: none; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 15px;">Plan je kennismakingsgesprek</a>
        </p>
        <p style="margin: 0 0 16px 0;">Mochten deze data voor jou niet goed uitkomen, mail me dan gerust met nieuwe data.</p>
        <p style="margin: 0 0 16px 0;">Heb je vooraf vragen? Mail gerust naar <a href="mailto:docenten@privateyogaathome.nl" style="color: #a66658;">docenten@privateyogaathome.nl</a>.</p>
        <p style="margin: 0;">Tot snel!</p>
      `,
    }),
  };
}

export function afwijzingEmail(naam: string) {
  const voor = voornaam(naam);
  return {
    subject: "Je aanmelding bij Private Yoga at Home",
    text: `Hoi ${voor},

Bedankt voor je aanmelding en de tijd die je erin hebt gestoken. We hebben
je gegevens met aandacht bekeken.

Op dit moment zien we helaas geen goede match tussen jouw profiel en waar
we nu naar op zoek zijn binnen de pilot in de regio Haarlem.

We wensen je alle goeds toe.

Warme groet,
Sabine — Private Yoga at Home`,
    html: wrapEmailHtml({
      bodyHtml: `
        <p style="margin: 0 0 16px 0;">Hoi ${escapeHtml(voor)},</p>
        <p style="margin: 0 0 16px 0;">Bedankt voor je aanmelding en de tijd die je erin hebt gestoken. We hebben je gegevens met aandacht bekeken.</p>
        <p style="margin: 0 0 16px 0;">Op dit moment zien we helaas geen goede match tussen jouw profiel en waar we nu naar op zoek zijn binnen de pilot in de regio Haarlem.</p>
        <p style="margin: 0;">We wensen je alle goeds toe.</p>
      `,
    }),
  };
}
