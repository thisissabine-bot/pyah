\# CLAUDE.md — Private Yoga at Home (PYAH)  
\#\# Bouwinstructie voor Claude Code

\---

\#\# Versiegeschiedenis

| Versie | Datum | Wijzigingen |
| :----- | :---- | :---------- |
| v1.6 | 23-05-2026 | Verbod op Tailwind utilities voor typografie expliciet gedocumenteerd |
| v1.5 | 23-05-2026 | Kleurmodifiers voor koppen gedocumenteerd: .accent-terracotta, .accent-moss, .on-dark |
| v1.4 | 23-05-2026 | DocentCard rounded-2xl expliciet benoemd als enige uitzondering op rechte hoeken |
| v1.3 | 23-05-2026 | Deploy Vercel → Netlify gecorrigeerd |
| v1.2 | 23-05-2026 | Knopstijlen gecorrigeerd: 3 varianten (btn-dark-a, btn-dark-b, btn-light) conform Brandbook |
| v1.1 | 23-05-2026 | Body font DM Sans → Lato; kleurgebruik omschrijvingen bijgewerkt conform typography.css |
| v1.0 | — | Initiële versie |

> \*\*Git-werkwijze:\*\* commit \`CLAUDE.md\` bij elke wijziging met een duidelijk bericht, bijv. \`docs: knopstijlen gecorrigeerd conform Brandbook\`. Git bewaart de volledige geschiedenis; dit blok geeft een snelle leesbare samenvatting.

\---

\#\# Wat bouwen we?

Een two-sided marketplace genaamd \*\*Private Yoga at Home (PYAH)\*\*.  
Klanten vinden hier een zorgvuldig geselecteerde yogadocent aan huis.  
Docenten krijgen een professioneel profiel en boekingssysteem.

\*\*Domeinnaam:\*\* privateyogaathome.nl (geregistreerd via Cloud86)  
\*\*Hosting:\*\* Netlify (gratis tier, koppelen aan domein na deploy)  
\*\*Database:\*\* Supabase (gratis tier)  
\*\*Betalingen:\*\* Mollie  
\*\*Framework:\*\* Next.js 14 (App Router) met Tailwind CSS  
\*\*Taal:\*\* TypeScript

\---

\#\# Designvisie

Het platform heeft een \*\*warme, rustige en professionele uitstraling\*\*.

\- \*\*Stijl:\*\* Veel witruimte, zachte schaduwen, rechte hoeken, subtiele hover-animaties  
\- \*\*Sfeer:\*\* High-end wellness — vertrouwen, rust, kwaliteit

\#\#\# Officiële kleurenpalet

| Naam | Hex | Gebruik |
| :---- | :---- | :---- |
| \`licht\` | \`\#ebe3e0\` | Achtergronden, hover-states, badge-fills |
| \`zacht\` | \`\#d4baad\` | Borders, subtiele vlakken, card-borders |
| \`accent\` | \`\#a66658\` | H1, H3, H4, overline, quote, badges, actieve states |
| \`donker\` | \`\#484f47\` | H2, secundaire labels, navigatie |
| \`diep\` | \`\#260f09\` | Bodytekst, H5, knoppen, sterke nadruk |

\#\#\# Typografie

\*\*Heading font: Arsenica Variable\*\* (Adobe Font — lokaal inladen)

Arsenica is niet beschikbaar via Google Fonts. Gebruik \`next/font/local\`:

1\. Download \`Arsenica-Variable.woff2\` uit Adobe Fonts (via Creative Cloud → Fonts)  
2\. Sla op in \`public/fonts/Arsenica-Variable.woff2\`  
3\. Laad in via \`src/app/layout.tsx\`:

\`\`\`ts  
import localFont from 'next/font/local'

const arsenica \= localFont({  
src: '../../public/fonts/Arsenica-Variable.woff2',  
variable: '--font-arsenica',  
display: 'swap',  
})  
\`\`\`

4\. Voeg \`arsenica.variable\` toe aan de \`\<html\>\` className  
5\. Gebruik in Tailwind: \`font-\['var(--font-arsenica)'\]\` of maak een shorthand in \`tailwind.config.ts\`

\*\*Body font: Lato\*\* (Google Fonts)

\`\`\`  
https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700\&display=swap  
\`\`\`

Of via \`next/font/google\`:  
\`\`\`ts  
import { Lato } from 'next/font/google'  
const lato \= Lato({ weight: \['300', '400', '700'\], subsets: \['latin'\], variable: '--font-lato' })  
\`\`\`

\*\*Typografie & CSS-systeem\*\*  
\`typography.css\` is het enige bronbestand voor typografie. Dit bestand wordt nooit aangepast. Als iets visueel niet klopt, pas dan altijd de klassen in de component aan — niet het CSS-systeem.

\*\*Kleurmodifiers voor koppen\*\*  
Koppen H1, H2 en H3 kunnen wisselen tussen terracotta en mosgroen afhankelijk van de pagina en sectie. Gebruik daarvoor altijd een modifier class in combinatie met de heading class:
\- \`.accent-terracotta\` — zet een kop naar \`#a66658\`
\- \`.accent-moss\` — zet een kop naar \`#484f47\`
\- \`.on-dark\` — zet een kop naar \`#ffffff\` op een donkere achtergrond

Voorbeeld: \`<h2 class="heading-h2 accent-terracotta">Titel</h2>\`

Kies nooit zelf een kleur — vraag Sabine welke modifier van toepassing is als dit niet expliciet is aangegeven.

\*\*Geen Tailwind op tekstelementen\*\*  
Gebruik nooit Tailwind utilities zoals \`text-sm\`, \`text-xl\`, \`font-bold\`, \`text-pyah-\*\`, \`leading-relaxed\` etc. op tekstelementen. Gebruik uitsluitend de classes uit \`typography.css\` en \`layout.css\`. Als een passende class ontbreekt, meld dit dan aan Sabine — voeg geen Tailwind toe als vervanging en verzin geen nieuwe class zelf.

\---

\#\# Tech stack setup

\#\#\# Installatie (voer dit uit in je terminal)  
\`\`\`bash  
npx create-next-app@latest pyah \--typescript \--tailwind \--eslint \--app \--src-dir  
cd pyah  
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs  
npm install @mollie/api-client  
npm install react-hook-form zod @hookform/resolvers  
npm install lucide-react  
npm install next-cloudinary   \# voor afbeeldingen uploaden  
\`\`\`

\#\#\# Omgevingsvariabelen  
Maak een \`.env.local\` bestand aan in de root:  
\`\`\`  
NEXT\_PUBLIC\_SUPABASE\_URL=jouw\_supabase\_url  
NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY=jouw\_supabase\_anon\_key  
SUPABASE\_SERVICE\_ROLE\_KEY=jouw\_service\_role\_key  
MOLLIE\_API\_KEY=jouw\_mollie\_api\_key  
MOLLIE\_WEBHOOK\_SECRET=jouw\_mollie\_webhook\_secret  
NEXT\_PUBLIC\_CLOUDINARY\_CLOUD\_NAME=jouw\_cloudinary\_naam  
\`\`\`

\---

\#\# Mappenstructuur

\`\`\`  
src/  
app/  
(public)/               \# Publieke pagina's (geen login vereist)  
page.tsx              \# Homepage  
docenten/  
page.tsx            \# Zoekpagina docenten  
\[slug\]/  
page.tsx          \# Docentprofiel (openbaar)  
over/  
page.tsx            \# Over PYAH  
voor-docenten/  
page.tsx            \# Landingspagina voor docenten  
(auth)/                 \# Login/registratie  
login/page.tsx  
registreer/page.tsx  
dashboard/  
docent/               \# Docent dashboard (ingelogd)  
page.tsx            \# Overzicht  
profiel/page.tsx    \# Profiel bewerken  
aanvragen/page.tsx  \# Klantaanvragen  
agenda/page.tsx     \# Boekingen  
uitbetaling/page.tsx  
admin/                \# Admin dashboard (alleen Sabine)  
page.tsx  
docenten/page.tsx  
betalingen/page.tsx  
klant/                \# Klant dashboard (ingelogd)  
page.tsx            \# Overzicht  
lessen/page.tsx     \# Mijn lessen (agenda \+ history)  
docent/page.tsx     \# Mijn docent (contact, wisselen)  
facturen/page.tsx   \# Betalingsoverzicht  
reviews/page.tsx    \# Beoordeel docent  
api/  
webhooks/  
mollie/route.ts     \# Mollie webhook handler  
components/  
layout/  
Header.tsx  
Footer.tsx  
Navigation.tsx  
ui/  
Button.tsx  
Card.tsx  
Badge.tsx  
Input.tsx  
docenten/  
DocentCard.tsx        \# Kaartje in de zoekresultaten  
DocentProfiel.tsx     \# Volledig openbaar profiel  
ZoekFilters.tsx       \# Filters (stijl, locatie, niveau)  
boekingen/  
LesKiezer.tsx         \# Introductieles (altijd 75 min, vast) of Losse les (kies 60/75 min)  
BetalingForm.tsx  
lib/  
supabase/  
client.ts             \# Browser client  
server.ts             \# Server client  
types.ts              \# TypeScript types gegenereerd vanuit DB  
mollie/  
client.ts  
utils.ts  
\`\`\`

\---

\#\# Database schema (Supabase)

Maak deze tabellen aan in Supabase (SQL Editor):

\`\`\`sql  
\-- Docenten profielen  
CREATE TABLE docenten (  
id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
user\_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,  
naam TEXT NOT NULL,  
slug TEXT UNIQUE NOT NULL,           \-- URL: /docenten/anne-de-vries  
bio TEXT,  
foto\_url TEXT,  
video\_url TEXT,  
locatie TEXT NOT NULL,               \-- bijv. "Haarlem"  
reisafstand\_km INTEGER DEFAULT 10,  
yogastijlen TEXT\[\] DEFAULT '{}',     \-- \['Hatha', 'Yin', 'Vinyasa'\]  
specialisaties TEXT\[\] DEFAULT '{}',  \-- \['zwangerschap', 'senioren'\]  
ervaringsniveau TEXT CHECK (ervaringsniveau IN ('startend', 'ervaren')),  
jaren\_ervaring INTEGER,  
opleiding TEXT,  
certificering TEXT,  
actief BOOLEAN DEFAULT false,        \-- false \= wacht op goedkeuring Sabine  
avb\_verzekering BOOLEAN DEFAULT false, \-- verplicht voor livegang (stap 4A onboarding)  
avb\_document\_url TEXT,               \-- verplicht uploadpad naar AVB-bewijs (bijv. Cloudinary); profiel kan niet live zonder dit veld  
abonnement TEXT CHECK (abonnement IN ('startend', 'ervaren')) DEFAULT 'startend',  
mollie\_customer\_id TEXT,             \-- voor uitbetalingen via Mollie  
created\_at TIMESTAMPTZ DEFAULT NOW()  
);

\-- Tarieven per docent (losse lessen)  
\-- Elke docent heeft maximaal 3 rijen: introductieles (altijd 75 min) \+ losse les 60 min \+ losse les 75 min  
CREATE TABLE tarieven (  
id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
docent\_id UUID REFERENCES docenten(id) ON DELETE CASCADE,  
naam TEXT NOT NULL CHECK (naam IN ('Introductieles', 'Losse les')),  
duur\_minuten INTEGER NOT NULL CHECK (  
(naam \= 'Introductieles' AND duur\_minuten \= 75\) OR  
(naam \= 'Losse les' AND duur\_minuten IN (60, 75))  
),  
prijs\_cent INTEGER NOT NULL,  
actief BOOLEAN DEFAULT true  
);  
\-- Introductieles: altijd 75 minuten, eenmalig per klant-docent combinatie  
\-- Losse les: klant kiest 60 of 75 minuten, elk eigen prijs  
\--  
\-- Voorbeeld ervaren docent:  
\-- Introductieles  75 min → €90   (docent ontvangt €72 na 20% commissie)  
\-- Losse les       60 min → €85   (docent ontvangt €68 na 20% commissie)  
\-- Losse les       75 min → €95   (docent ontvangt €76 na 20% commissie)  
\--  
\-- Voorbeeld startend docent:  
\-- Introductieles  75 min → €70   (docent ontvangt €63 na 10% commissie)  
\-- Losse les       60 min → €65   (docent ontvangt €58,50 na 10% commissie)  
\-- Losse les       75 min → €75   (docent ontvangt €67,50 na 10% commissie)

\-- Boekingen (losse lessen)  
CREATE TABLE boekingen (  
id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
klant\_naam TEXT NOT NULL,  
klant\_email TEXT NOT NULL,  
klant\_telefoon TEXT,  
docent\_id UUID REFERENCES docenten(id),  
tarief\_id UUID REFERENCES tarieven(id),  
status TEXT CHECK (status IN ('aangevraagd', 'bevestigd', 'voltooid', 'geannuleerd')) DEFAULT 'aangevraagd',  
mollie\_payment\_id TEXT,  
mollie\_betaald BOOLEAN DEFAULT false,  
bedrag\_cent INTEGER,            \-- lesprijs  
commissie\_cent INTEGER,         \-- PYAH commissie (10% of 20%)  
uitbetaling\_cent INTEGER,       \-- docent ontvangt dit  
afspraak\_datum TIMESTAMPTZ,  
notities TEXT,  
created\_at TIMESTAMPTZ DEFAULT NOW()  
);

\-- Reviews  
CREATE TABLE reviews (  
id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
docent\_id UUID REFERENCES docenten(id),  
boeking\_id UUID REFERENCES boekingen(id),  
score INTEGER CHECK (score BETWEEN 1 AND 5),  
tekst TEXT,  
publiek BOOLEAN DEFAULT true,  
created\_at TIMESTAMPTZ DEFAULT NOW()  
);

\-- Aanmeldingen (wachtlijst docenten)  
\-- Velden komen rechtstreeks uit het aanmeldformulier op /voor-docenten (stap 1 onboarding)  
CREATE TABLE aanmeldingen (  
id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
naam TEXT NOT NULL,  
email TEXT NOT NULL,  
woonplaats TEXT,                        \-- woonplaats / regio  
opleiding TEXT,                         \-- yoga-opleiding(en) en discipline  
jaren\_leservaring INTEGER,              \-- jaren leservaring  
recente\_lespraktijk TEXT,              \-- lespraktijk afgelopen 6-12 maanden  
ervaring\_privelessen TEXT,             \-- ervaring met privélessen  
type TEXT CHECK (type IN ('docent', 'klant')) DEFAULT 'docent',  
verwerkt BOOLEAN DEFAULT false,         \-- false \= nog niet beoordeeld door Sabine  
created\_at TIMESTAMPTZ DEFAULT NOW()  
);

\-- Row Level Security inschakelen  
ALTER TABLE docenten ENABLE ROW LEVEL SECURITY;  
ALTER TABLE boekingen ENABLE ROW LEVEL SECURITY;  
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

\-- Beleid: iedereen mag actieve docenten zien  
CREATE POLICY "Actieve docenten zijn publiek zichtbaar"  
ON docenten FOR SELECT  
USING (actief \= true);

\-- Beleid: docenten mogen hun eigen profiel bewerken  
CREATE POLICY "Docent mag eigen profiel bewerken"  
ON docenten FOR UPDATE  
USING (auth.uid() \= user\_id);  
\`\`\`

\---

\#\# Pagina voor pagina: wat moet er op staan

\#\#\# 1\. Homepage (\`/\`)  
\- Hero sectie: grote kop, ondertitel, CTA-knop "Vind jouw yogadocent"  
\- Korte uitleg hoe het werkt (3 stappen: zoek → kennismaak → les aan huis)  
\- Featured docenten (3–4 profielkaartjes)  
\- Sectie "Waarom PYAH?" met 3 voordelen  
\- CTA voor docenten onderaan: "Yogadocent? Sluit je aan"  
\- Footer met contact en sociale media

\#\#\# 2\. Docenten zoeken (\`/docenten\`)  
\- Zoekbalk en filters (yogastijl, locatie, ervaringsniveau)  
\- Grid van DocentCards  
\- Elke card: foto, naam, stijlen, locatie, startprijs, knop "Bekijk profiel"

\#\#\# 3\. Docentprofiel (\`/docenten/\[slug\]\`)  
\- Grote profielfoto  
\- Naam, locatie, yogastijlen als badges  
\- Bio (persoonlijk verhaal)  
\- Specialisaties  
\- Opleiding en certificering  
\- Beschikbare lestarieven: klant kiest lestype (intro/los) én duur (60 of 75 min), prijs wordt live getoond  
\- Reviews van klanten  
\- CTA: "Plan een kennismakingsgesprek" (link naar Calendly of formulier)

\#\#\# 4\. Over PYAH (\`/over\`)  
\- Verhaal van Sabine  
\- Missie en visie  
\- Hoe docenten worden geselecteerd (kwaliteitsgarantie)

\#\#\# 5\. Voor docenten (\`/voor-docenten\`)  
\- Wie is PYAH? (korte intro)  
\- Wat voor docenten zoeken we? (profiel \+ persoonlijkheid)  
\- Ervaringsniveaus uitgelegd (startend vs ervaren)  
\- Abonnement vergelijkingstabel (startend vs ervaren, incl. introductiekorting)  
\- Tarieven en commissies (10% en 20%)  
\- Aanmeldformulier (gaat naar \`aanmeldingen\` tabel) — CTA: "Interesse? Meld je aan"

\#\#\# 6\. Docentprofiel aanmaken (ingelogd, na goedkeuring Sabine)
\- **AVB-upload is een verplicht veld** — het profiel kan niet worden ingediend ter goedkeuring zonder geüpload verzekeringsbewijs  
\- Upload verloopt via Cloudinary (gebruik \`next-cloudinary\`)  
\- Het geüploade document wordt opgeslagen als \`avb\_document\_url\` in de \`docenten\` tabel  
\- Sabine controleert het document bij profielgoedkeuring en zet \`avb\_verzekering\` op \`true\`  
\- Zolang \`avb\_document\_url\` leeg is én \`avb\_verzekering = false\`, kan het profiel niet op \`actief = true\` worden gezet  
\- Bij verlenging of wijziging van de verzekering kan de Docent een nieuw document uploaden via het dashboard

\---

\#\# Commissie- en tarieflogica (belangrijk)

\#\#\# Lestypes  
| Lestype        | Duur       | Keuze voor klant         |  
|----------------|------------|--------------------------|  
| Introductieles | Altijd 75 min | Geen keuze — vast     |  
| Losse les      | 60 of 75 min  | Klant kiest bij boeking |

De introductieles is eenmalig per klant-docent combinatie. Enforce dit in de database:  
\`\`\`sql  
CREATE UNIQUE INDEX één\_intro\_per\_klant\_docent  
ON boekingen (klant\_email, docent\_id)  
WHERE tarief\_naam \= 'Introductieles';  
\`\`\`

\#\#\# Ervaringsniveau bepaalt de commissie  
| Niveau    | Commissie PYAH | Docent ontvangt |  
|-----------|---------------|-----------------|  
| Startend  | 10%           | 90% van lesprijs |  
| Ervaren   | 20%           | 80% van lesprijs |

\#\#\# Betalingsflow — geld loopt via PYAH

\*\*Belangrijk:\*\* de klant betaalt altijd het volledige lesbedrag aan PYAH.  
PYAH betaalt de docent aan het einde van elke maand uit, minus de commissie.

Technisch via Mollie:  
\- Gebruik de \*\*Mollie Payments API\*\* — klant betaalt via een betaallink (iDEAL, creditcard, etc.)  
\- Geld komt op PYAH's Mollie-rekening  
\- Tweewekelijks maakt PYAH een transfer naar de docent (rond de 1e en 15e van de maand)

\`\`\`ts  
// Mollie betaling aanmaken — geld naar PYAH  
const payment \= await mollieClient.payments.create({  
amount: { currency: 'EUR', value: bedragEuro },  // bijv. '90.00'  
description: \`Les bij ${docent.naam}\`,  
redirectUrl: \`${process.env.NEXT\_PUBLIC\_URL}/boeking/bevestigd\`,  
webhookUrl: \`${process.env.NEXT\_PUBLIC\_URL}/api/webhooks/mollie\`,  
metadata: {  
docent\_id: docent.id,  
tarief\_id: tarief.id,  
klant\_naam,  
klant\_email,  
}  
})  
\`\`\`

\`\`\`ts  
// Berekening commissie (in webhook handler)  
const commissie\_procent \= docent.ervaringsniveau \=== 'ervaren' ? 0.20 : 0.10  
const commissie\_cent    \= Math.round(bedrag\_cent \* commissie\_procent)  
const uitbetaling\_cent  \= bedrag\_cent \- commissie\_cent  
\`\`\`

\#\#\# BTW-logica — ⚠️ raadpleeg je boekhouder

\> \*\*Let op:\*\* de BTW-behandeling hieronder is gebaseerd op het commissionairsmodel  
\> (PYAH int namens de docent, betaalt door, en draagt BTW af over de commissie).  
\> Bespreek dit met een belastingadviseur om te bevestigen dat dit klopt voor jouw situatie  
\> vóórdat het platform live gaat.

Verwachte logica op basis van jouw beschrijving:  
\- \*\*Over het uitbetalingsdeel aan de docent:\*\* geen BTW — dit is doorbetalend  
\- \*\*Over de commissie van PYAH:\*\* 21% BTW afdragen  
\- Voorbeeld (ervaren docent, les van €90):  
\- Commissie: €18,00 (20%)  
\- BTW over commissie: €3,78 (21% van €18)  
\- Netto commissie PYAH: €14,22  
\- Uitbetaling aan docent: €72,00

Voeg een \`maandoverzicht\` tabel toe voor de maandelijkse uitbetalingen:

\`\`\`sql  
CREATE TABLE uitbetalingen (  
id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
docent\_id UUID REFERENCES docenten(id),  
periode TEXT NOT NULL,              \-- bijv. '2026-05'  
aantal\_lessen INTEGER,  
bruto\_cent INTEGER,                 \-- totaal ontvangen van klanten  
commissie\_cent INTEGER,             \-- PYAH's deel  
btw\_over\_commissie\_cent INTEGER,    \-- 21% over commissie  
uitbetaling\_cent INTEGER,           \-- naar docent  
uitbetaald\_op TIMESTAMPTZ,  
mollie\_transfer\_id TEXT,  
created\_at TIMESTAMPTZ DEFAULT NOW()  
);  
\`\`\`

—

Betalingsinfrastructuur

\#\#\# Abonnementen docenten  
Docenten betalen een maandelijks abonnement afhankelijk van hun niveau:

| Niveau | Normaal tarief | Introductietarief (eerste 6 maanden) |
| :---- | :---- | :---- |
| Startend | €10/maand | €5/maand |
| Ervaren | €20/maand | €10/maand |

\#\#\# Introductiekorting  
Het eerste half jaar krijgen docenten 50% korting op hun abonnement.

⚠️ \*Open vraag: geldt de kortingsperiode vanaf de livegang van het platform, of vanaf het moment dat de individuele docent zich aanmeldt?\*

\#\#\# Technische afhandeling abonnementen

\*\*Mollie\*\* verzorgt de daadwerkelijke betalingsverwerking:  
\- Terugkerende betalingen via de Mollie Subscriptions API  
\- Per docentniveau een abonnement aangemaakt (normaal én introductietarief)  
\- Mollie incasseert automatisch maandelijks  
\- Bij mislukte betaling stuurt Mollie een webhook naar de backend

\*\*Supabase\*\* beheert de abonnementsstatus:  
\- Slaat op welk niveau een docent heeft en of het abonnement actief is  
\- Verwerkt webhooks van Mollie (betaling geslaagd / mislukt)  
\- Past automatisch de zichtbaarheid van het docentprofiel aan bij een mislukte betaling  
\- Houdt per docent bij wanneer de introductiekorting vervalt

\*\*Flow:\*\*  
Docent meldt zich aan via /voor-docenten → Sabine beoordeelt aanmelding en kent niveau toe (Startend of Ervaren) → welkomstmail met bevestiging niveau → docent registreert zich officieel op platform → Mollie-abonnement aangemaakt op basis van door Sabine bepaald niveau → Mollie incasseert maandelijks → webhook → Supabase werkt status bij → profiel actief of gepauzeerd

⚠️ Het niveau (Startend/Ervaren) wordt uitsluitend door de admin (Sabine) ingesteld — nooit door de docent zelf. In het docent-dashboard is dit veld niet bewerkbaar.

\---

\#\# Authenticatie

Gebruik Supabase Auth:  
\- Docenten loggen in via e-mail \+ wachtwoord  
\- Admin (Sabine) heeft een apart rol-systeem via \`user\_metadata: { role: 'admin' }\`  
\- Klanten loggen in via e-mail \+ wachtwoord — zij hebben een eigen dashboard (Mijn lessen, Mijn docent, Facturen, Reviews)  
\- Middleware in \`middleware.ts\` beschermt \`/dashboard/\*\` routes

\---

\#\# Bouwvolgorde (doe dit stap voor stap)

\*\*Fase 1 — Fundament (doe dit als eerste)\*\*  
1\. Next.js project opzetten met Tailwind  
2\. Supabase project aanmaken en schema uitvoeren  
3\. Globale layout: Header, Footer, kleurenschema, fonts  
4\. Homepage (statisch, nog geen data)

\*\*Fase 2 — Docentprofielen\*\*  
5\. Zoekpagina met statische testdata  
6\. Docentprofiel pagina  
7\. Supabase koppeling: echte data laden

\*\*Fase 3 — Boekingen & betalingen\*\*  
8\. LesKiezer component (introductieles of losse les kiezen)  
9\. Mollie betaallink integratie  
10\. Webhook handler voor bevestiging  
11\. Bevestigingsmail (via Supabase Edge Functions of Resend)

\*\*Fase 4 — Dashboards\*\*  
12\. Docent registratie \+ login  
13\. Automatische ontvangstbevestiging na aanmelding via /voor-docenten (e-mail naar docent met uitleg vervolgstappen)  
14\. Docent dashboard (profiel bewerken, aanvragen zien) — inclusief verplicht AVB-uploadveld; profiel kan niet worden ingediend zonder geüpload verzekeringsbewijs  
15\. Admin dashboard (docenten goedkeuren incl. niveau toewijzen, AVB-document inzien en goedkeuren, betalingen overzicht)

\*\*Fase 5 — Afwerking\*\*  
15\. Reviews systeem  
16\. SEO (metadata, sitemap)  
17\. Deploy op Netlify  
18\. Domeinnaam koppelen via Cloud86

\---

\#\# Stijlrichtlijnen voor componenten

\#\#\# Kleuren (zet in \`tailwind.config.ts\`)  
\`\`\`js  
colors: {  
pyah: {  
licht:  '\#ebe3e0',  
zacht:  '\#d4baad',  
accent: '\#a66658',  
donker: '\#484f47',  
diep:   '\#260f09',  
}  
}  
\`\`\`

\#\#\# Knoppen  
Drie varianten, afhankelijk van de achtergrond. Rechte hoeken, geen border.

| Variant | Klasse | Default | Hover | Active |
| :--- | :--- | :--- | :--- | :--- |
| Donker — roze start | \`btn-dark-a\` | \`#d4baad\` tekst \`#260f09\` | \`#a66658\` tekst wit | \`#484f47\` tekst wit |
| Donker — mosgroen start | \`btn-dark-b\` | \`#484f47\` tekst wit | \`#a66658\` tekst wit | \`#d4baad\` tekst \`#260f09\` |
| Licht — terracotta start | \`btn-light\` | \`#a66658\` tekst wit | \`#d4baad\` tekst \`#260f09\` | \`#484f47\` tekst wit |

Tailwind-equivalent per variant:  
\`\`\`  
btn-dark-a : bg-pyah-zacht text-pyah-diep hover:bg-pyah-accent hover:text-white active:bg-pyah-donker active:text-white  
btn-dark-b : bg-pyah-donker text-white hover:bg-pyah-accent hover:text-white active:bg-pyah-zacht active:text-pyah-diep  
btn-light  : bg-pyah-accent text-white hover:bg-pyah-zacht hover:text-pyah-diep active:bg-pyah-donker active:text-white  
\`\`\`  
Alle knoppen: \`rounded-none border-none px-5 py-[7px] font-lato text-sm font-normal\`

\#\#\# Kaartjes (DocentCard)  
\- Witte achtergrond met zachte schaduw: \`shadow-sm hover:shadow-md transition-shadow\`  
\- Afgeronde hoeken: \`rounded-2xl\` — dit is de **enige uitzondering** op de "rechte hoeken" regel. Alle andere elementen (knoppen, inputs, containers) gebruiken \`rounded-none\`.  
\- Subtiele hover: lichte opwaartse beweging \`hover:-translate-y-1 transition-transform\`

\---

\#\# Notities voor de pilotfase

\- Start met \*\*statische testdata\*\* voor 2–3 docentprofielen zodat het platform er meteen vol uitziet  
\- Het aanmeldformulier voor docenten (\`/voor-docenten\`) is prioriteit — dit is hoe Sabine haar eerste docenten werft  
\- Calendly kan tijdelijk de kennismakingsgesprekken afhandelen (embed of link) — geen maatwerk nodig in fase 1  
\- Mobiel-first: veel klanten zullen via hun telefoon zoeken

\---

\*Dit document is de bouwinstructie voor het PYAH platform. Werk fase voor fase. Commit na elke werkende fase naar GitHub.\*  
