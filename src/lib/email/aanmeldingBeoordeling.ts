// E-mailteksten voor de match-beslissing op een docentaanmelding (CC-opdracht: Aanmeldingen-overzicht, Stap 2).

// De Calendly-link staat nog niet vast — één plek, eenvoudig aan te passen zodra bekend.
export const CALENDLY_LINK_PLACEHOLDER = "#"; // TODO: vervangen zodra Calendly-link bekend is

function voornaam(naam: string): string {
  return naam.trim().split(/\s+/)[0] ?? naam;
}

export function uitnodigingEmail(naam: string) {
  return {
    subject: "Leuk je beter te leren kennen — kennismakingsgesprek Private Yoga at Home",
    text: `Hoi ${voornaam(naam)},

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
  };
}

export function afwijzingEmail(naam: string) {
  return {
    subject: "Je aanmelding bij Private Yoga at Home",
    text: `Hoi ${voornaam(naam)},

Bedankt voor je aanmelding en de tijd die je erin hebt gestoken. We hebben
je gegevens met aandacht bekeken.

Op dit moment zien we helaas geen goede match tussen jouw profiel en waar
we nu naar op zoek zijn binnen de pilot in de regio Haarlem.

We wensen je alle goeds toe.

Warme groet,
Sabine — Private Yoga at Home`,
  };
}
