# CLAUDE.md — Private Yoga at Home (PYAH)
## Bouwinstructie voor Claude Code

---

## Wat bouwen we?

Een two-sided marketplace genaamd **Private Yoga at Home (PYAH)**.
Klanten vinden hier een zorgvuldig geselecteerde yogadocent aan huis.
Docenten krijgen een professioneel profiel en boekingssysteem.

**Domeinnaam:** privateyogaathome.nl (geregistreerd via Cloud86)
**Hosting:** Netlify (gratis tier, koppelen aan domein na deploy)
**Database:** Supabase (gratis tier)
**Betalingen:** Mollie
**Framework:** Next.js 14 (App Router) met Tailwind CSS
**Taal:** TypeScript

---

## Designvisie

Het platform heeft een **warme, rustige en professionele uitstraling**.

- **Stijl:** Veel witruimte, zachte schaduwen, afgeronde hoeken, subtiele hover-animaties
- **Sfeer:** High-end wellness — vertrouwen, rust, kwaliteit

### Officiële kleurenpalet

| Naam        | Hex       | Gebruik                                      |
|-------------|-----------|----------------------------------------------|
| `licht`     | `#ebe3e0` | Achtergronden, hover-states, badge-fills     |
| `zacht`     | `#d4baad` | Borders, subtiele vlakken, card-borders      |
| `accent`    | `#a66658` | Primaire knop, links, actieve states, badges |
| `donker`    | `#484f47` | Bodytekst, secundaire labels, navigatie      |
| `diep`      | `#260f09` | Headings, sterke nadruk                      |

### Typografie

**Heading font: Arsenica Variable** (Adobe Font — lokaal inladen)

Arsenica is niet beschikbaar via Google Fonts. Gebruik `next/font/local`:

1. Download `Arsenica-Variable.woff2` uit Adobe Fonts (via Creative Cloud → Fonts)
2. Sla op in `public/fonts/Arsenica-Variable.woff2`
3. Laad in via `src/app/layout.tsx`:

```ts
import localFont from 'next/font/local'

const arsenica = localFont({
  src: '../../public/fonts/Arsenica-Variable.woff2',
  variable: '--font-arsenica',
  display: 'swap',
})
```

4. Voeg `arsenica.variable` toe aan de `<html>` className
5. Gebruik in Tailwind: `font-['var(--font-arsenica)']` of maak een shorthand in `tailwind.config.ts`

**Body font: DM Sans** (Google Fonts)

```
https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap
```

Of via `next/font/google`:
```ts
import { DM_Sans } from 'next/font/google'
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
```

---

## Tech stack setup

### Installatie (voer dit uit in je terminal)
```bash
npx create-next-app@latest pyah --typescript --tailwind --eslint --app --src-dir
cd pyah
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install stripe @stripe/stripe-js
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react
npm install next-cloudinary   # voor afbeeldingen uploaden
```

### Omgevingsvariabelen
Maak een `.env.local` bestand aan in de root:
```
NEXT_PUBLIC_SUPABASE_URL=jouw_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=jouw_service_role_key
STRIPE_SECRET_KEY=jouw_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=jouw_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=jouw_webhook_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=jouw_cloudinary_naam
```

---

## Mappenstructuur

```
src/
  app/
    (public)/               # Publieke pagina's (geen login vereist)
      page.tsx              # Homepage
      docenten/
        page.tsx            # Zoekpagina docenten
        [slug]/
          page.tsx          # Docentprofiel (openbaar)
      over/
        page.tsx            # Over PYAH
      voor-docenten/
        page.tsx            # Landingspagina voor docenten
    (auth)/                 # Login/registratie
      login/page.tsx
      registreer/page.tsx
    dashboard/
      docent/               # Docent dashboard (ingelogd)
        page.tsx            # Overzicht
        profiel/page.tsx    # Profiel bewerken
        aanvragen/page.tsx  # Klantaanvragen
        agenda/page.tsx     # Boekingen
        uitbetaling/page.tsx
      admin/                # Admin dashboard (alleen Sabine)
        page.tsx
        docenten/page.tsx
        betalingen/page.tsx
    api/
      webhooks/
        stripe/route.ts     # Stripe webhook handler
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
      DocentCard.tsx        # Kaartje in de zoekresultaten
      DocentProfiel.tsx     # Volledig openbaar profiel
      ZoekFilters.tsx       # Filters (stijl, locatie, niveau)
    boekingen/
      LesKiezer.tsx         # Introductieles (altijd 75 min, vast) of Losse les (kies 60/75 min)
      BetalingForm.tsx
  lib/
    supabase/
      client.ts             # Browser client
      server.ts             # Server client
      types.ts              # TypeScript types gegenereerd vanuit DB
    stripe/
      client.ts
    utils.ts
```

---

## Database schema (Supabase)

Maak deze tabellen aan in Supabase (SQL Editor):

```sql
-- Docenten profielen
CREATE TABLE docenten (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  naam TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,           -- URL: /docenten/anne-de-vries
  bio TEXT,
  foto_url TEXT,
  video_url TEXT,
  locatie TEXT NOT NULL,               -- bijv. "Haarlem"
  reisafstand_km INTEGER DEFAULT 10,
  yogastijlen TEXT[] DEFAULT '{}',     -- ['Hatha', 'Yin', 'Vinyasa']
  specialisaties TEXT[] DEFAULT '{}',  -- ['zwangerschap', 'senioren']
  ervaringsniveau TEXT CHECK (ervaringsniveau IN ('startend', 'ervaren')),
  jaren_ervaring INTEGER,
  opleiding TEXT,
  certificering TEXT,
  actief BOOLEAN DEFAULT false,        -- false = wacht op goedkeuring Sabine
  abonnement TEXT CHECK (abonnement IN ('startend', 'ervaren')) DEFAULT 'startend',
  stripe_account_id TEXT,              -- voor uitbetalingen
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tarieven per docent (losse lessen)
-- Elke docent heeft maximaal 3 rijen: introductieles (altijd 75 min) + losse les 60 min + losse les 75 min
CREATE TABLE tarieven (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  docent_id UUID REFERENCES docenten(id) ON DELETE CASCADE,
  naam TEXT NOT NULL CHECK (naam IN ('Introductieles', 'Losse les')),
  duur_minuten INTEGER NOT NULL CHECK (
    (naam = 'Introductieles' AND duur_minuten = 75) OR
    (naam = 'Losse les' AND duur_minuten IN (60, 75))
  ),
  prijs_cent INTEGER NOT NULL,
  actief BOOLEAN DEFAULT true
);
-- Introductieles: altijd 75 minuten, eenmalig per klant-docent combinatie
-- Losse les: klant kiest 60 of 75 minuten, elk eigen prijs
--
-- Voorbeeld ervaren docent:
-- Introductieles  75 min → €90   (docent ontvangt €72 na 20% commissie)
-- Losse les       60 min → €85   (docent ontvangt €68 na 20% commissie)
-- Losse les       75 min → €95   (docent ontvangt €76 na 20% commissie)
--
-- Voorbeeld startend docent:
-- Introductieles  75 min → €70   (docent ontvangt €63 na 10% commissie)
-- Losse les       60 min → €65   (docent ontvangt €58,50 na 10% commissie)
-- Losse les       75 min → €75   (docent ontvangt €67,50 na 10% commissie)

-- Boekingen (losse lessen)
CREATE TABLE boekingen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  klant_naam TEXT NOT NULL,
  klant_email TEXT NOT NULL,
  klant_telefoon TEXT,
  docent_id UUID REFERENCES docenten(id),
  tarief_id UUID REFERENCES tarieven(id),
  status TEXT CHECK (status IN ('aangevraagd', 'bevestigd', 'voltooid', 'geannuleerd')) DEFAULT 'aangevraagd',
  stripe_payment_intent TEXT,
  stripe_betaald BOOLEAN DEFAULT false,
  bedrag_cent INTEGER,            -- lesprijs
  commissie_cent INTEGER,         -- PYAH commissie (10% of 20%)
  uitbetaling_cent INTEGER,       -- docent ontvangt dit
  afspraak_datum TIMESTAMPTZ,
  notities TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  docent_id UUID REFERENCES docenten(id),
  boeking_id UUID REFERENCES boekingen(id),
  score INTEGER CHECK (score BETWEEN 1 AND 5),
  tekst TEXT,
  publiek BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aanmeldingen (wachtlijst docenten)
CREATE TABLE aanmeldingen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  naam TEXT NOT NULL,
  email TEXT NOT NULL,
  locatie TEXT,
  bericht TEXT,
  type TEXT CHECK (type IN ('docent', 'klant')) DEFAULT 'docent',
  verwerkt BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security inschakelen
ALTER TABLE docenten ENABLE ROW LEVEL SECURITY;
ALTER TABLE boekingen ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Beleid: iedereen mag actieve docenten zien
CREATE POLICY "Actieve docenten zijn publiek zichtbaar"
  ON docenten FOR SELECT
  USING (actief = true);

-- Beleid: docenten mogen hun eigen profiel bewerken
CREATE POLICY "Docent mag eigen profiel bewerken"
  ON docenten FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## Pagina voor pagina: wat moet er op staan

### 1. Homepage (`/`)
- Hero sectie: grote kop, ondertitel, CTA-knop "Vind jouw yogadocent"
- Korte uitleg hoe het werkt (3 stappen: zoek → kennismaak → les aan huis)
- Featured docenten (3–4 profielkaartjes)
- Sectie "Waarom PYAH?" met 3 voordelen
- CTA voor docenten onderaan: "Yogadocent? Sluit je aan"
- Footer met contact en sociale media

### 2. Docenten zoeken (`/docenten`)
- Zoekbalk en filters (yogastijl, locatie, ervaringsniveau)
- Grid van DocentCards
- Elke card: foto, naam, stijlen, locatie, startprijs, knop "Bekijk profiel"

### 3. Docentprofiel (`/docenten/[slug]`)
- Grote profielfoto
- Naam, locatie, yogastijlen als badges
- Bio (persoonlijk verhaal)
- Specialisaties
- Opleiding en certificering
- Beschikbare lestarieven: klant kiest lestype (intro/los) én duur (60 of 75 min), prijs wordt live getoond
- Reviews van klanten
- CTA: "Plan een kennismakingsgesprek" (link naar Calendly of formulier)

### 4. Over PYAH (`/over`)
- Verhaal van Sabine
- Missie en visie
- Hoe docenten worden geselecteerd (kwaliteitsgarantie)

### 5. Voor docenten (`/voor-docenten`)
- Voordelen van aansluiten
- Ervaringsniveaus uitgelegd (startend vs ervaren)
- Tarieven en commissies
- Aanmeldformulier (gaat naar `aanmeldingen` tabel)

---

## Commissie- en tarieflogica (belangrijk)

### Lestypes
| Lestype        | Duur       | Keuze voor klant         |
|----------------|------------|--------------------------|
| Introductieles | Altijd 75 min | Geen keuze — vast     |
| Losse les      | 60 of 75 min  | Klant kiest bij boeking |

De introductieles is eenmalig per klant-docent combinatie. Enforce dit in de database:
```sql
CREATE UNIQUE INDEX één_intro_per_klant_docent
  ON boekingen (klant_email, docent_id)
  WHERE tarief_naam = 'Introductieles';
```

### Ervaringsniveau bepaalt de commissie
| Niveau    | Commissie PYAH | Docent ontvangt |
|-----------|---------------|-----------------|
| Startend  | 10%           | 90% van lesprijs |
| Ervaren   | 20%           | 80% van lesprijs |

### Betalingsflow — geld loopt via PYAH

**Belangrijk:** de klant betaalt altijd het volledige lesbedrag aan PYAH.
PYAH betaalt de docent aan het einde van elke maand uit, minus de commissie.

Technisch in Stripe:
- Gebruik **Stripe Connect** met `transfer_data` (of handmatige maandelijkse transfers)
- Klant betaalt via een gewone Stripe Checkout sessie — geld komt op PYAH's Stripe account
- Aan het einde van de maand maakt PYAH handmatig of automatisch een transfer naar de docent

```ts
// Stripe Checkout aanmaken — geld naar PYAH
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card', 'ideal'],
  line_items: [{
    price_data: {
      currency: 'eur',
      unit_amount: bedrag_cent,  // volledig lesbedrag
      product_data: { name: `Les bij ${docent.naam}` },
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${process.env.NEXT_PUBLIC_URL}/boeking/bevestigd?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/docenten/${docent.slug}`,
  metadata: {
    docent_id: docent.id,
    tarief_id: tarief.id,
    klant_naam,
    klant_email,
  }
})
```

```ts
// Berekening commissie (in webhook handler)
const commissie_procent = docent.ervaringsniveau === 'ervaren' ? 0.20 : 0.10
const commissie_cent    = Math.round(bedrag_cent * commissie_procent)
const uitbetaling_cent  = bedrag_cent - commissie_cent
```

### BTW-logica — ⚠️ raadpleeg je boekhouder

> **Let op:** de BTW-behandeling hieronder is gebaseerd op het commissionairsmodel
> (PYAH int namens de docent, betaalt door, en draagt BTW af over de commissie).
> Bespreek dit met een belastingadviseur om te bevestigen dat dit klopt voor jouw situatie
> vóórdat het platform live gaat.

Verwachte logica op basis van jouw beschrijving:
- **Over het uitbetalingsdeel aan de docent:** geen BTW — dit is doorbetalend
- **Over de commissie van PYAH:** 21% BTW afdragen
- Voorbeeld (ervaren docent, les van €90):
  - Commissie: €18,00 (20%)
  - BTW over commissie: €3,78 (21% van €18)
  - Netto commissie PYAH: €14,22
  - Uitbetaling aan docent: €72,00

Voeg een `maandoverzicht` tabel toe voor de maandelijkse uitbetalingen:

```sql
CREATE TABLE uitbetalingen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  docent_id UUID REFERENCES docenten(id),
  periode TEXT NOT NULL,              -- bijv. '2026-05'
  aantal_lessen INTEGER,
  bruto_cent INTEGER,                 -- totaal ontvangen van klanten
  commissie_cent INTEGER,             -- PYAH's deel
  btw_over_commissie_cent INTEGER,    -- 21% over commissie
  uitbetaling_cent INTEGER,           -- naar docent
  uitbetaald_op TIMESTAMPTZ,
  stripe_transfer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Authenticatie

Gebruik Supabase Auth:
- Docenten loggen in via e-mail + wachtwoord
- Admin (Sabine) heeft een apart rol-systeem via `user_metadata: { role: 'admin' }`
- Klanten hoeven **geen** account — zij boeken als gast (naam + e-mail)
- Middleware in `middleware.ts` beschermt `/dashboard/*` routes

---

## Bouwvolgorde (doe dit stap voor stap)

**Fase 1 — Fundament (doe dit als eerste)**
1. Next.js project opzetten met Tailwind
2. Supabase project aanmaken en schema uitvoeren
3. Globale layout: Header, Footer, kleurenschema, fonts
4. Homepage (statisch, nog geen data)

**Fase 2 — Docentprofielen**
5. Zoekpagina met statische testdata
6. Docentprofiel pagina
7. Supabase koppeling: echte data laden

**Fase 3 — Boekingen & betalingen**
8. LesKiezer component (introductieles of losse les kiezen)
9. Stripe checkout integratie
10. Webhook handler voor bevestiging
11. Bevestigingsmail (via Supabase Edge Functions of Resend)

**Fase 4 — Dashboards**
12. Docent registratie + login
13. Docent dashboard (profiel bewerken, aanvragen zien)
14. Admin dashboard (docenten goedkeuren, betalingen overzicht)

**Fase 5 — Afwerking**
15. Reviews systeem
16. SEO (metadata, sitemap)
17. Deploy op Vercel
18. Domeinnaam koppelen via Cloud86

---

## Stijlrichtlijnen voor componenten

### Kleuren (zet in `tailwind.config.ts`)
```js
colors: {
  pyah: {
    licht:  '#ebe3e0',
    zacht:  '#d4baad',
    accent: '#a66658',
    donker: '#484f47',
    diep:   '#260f09',
  }
}
```

### Knoppen
- Primair: `bg-pyah-accent text-white hover:opacity-90`
- Secundair: `border border-pyah-accent text-pyah-accent hover:bg-pyah-licht`

### Kaartjes (DocentCard)
- Witte achtergrond met zachte schaduw: `shadow-sm hover:shadow-md transition-shadow`
- Afgeronde hoeken: `rounded-2xl`
- Subtiele hover: lichte opwaartse beweging `hover:-translate-y-1 transition-transform`

---

## Notities voor de pilotfase

- Start met **statische testdata** voor 2–3 docentprofielen zodat het platform er meteen vol uitziet
- Het aanmeldformulier voor docenten (`/voor-docenten`) is prioriteit — dit is hoe Sabine haar eerste docenten werft
- Calendly kan tijdelijk de kennismakingsgesprekken afhandelen (embed of link) — geen maatwerk nodig in fase 1
- Mobiel-first: veel klanten zullen via hun telefoon zoeken

---

*Dit document is de bouwinstructie voor het PYAH platform. Werk fase voor fase. Commit na elke werkende fase naar GitHub.*
