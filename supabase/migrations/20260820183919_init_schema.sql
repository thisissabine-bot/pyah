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
  avb_verzekering BOOLEAN DEFAULT false, -- verplicht voor livegang (stap 4A onboarding)
  avb_document_url TEXT,               -- verplicht uploadpad naar AVB-bewijs (bijv. Cloudinary); profiel kan niet live zonder dit veld
  abonnement TEXT CHECK (abonnement IN ('startend', 'ervaren')) DEFAULT 'startend',
  mollie_customer_id TEXT,             -- voor uitbetalingen via Mollie
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

-- Lesregistraties (voorheen 'boekingen' — de Docent registreert een reeds afgesproken les, de Klant boekt niet zelf via het platform)
CREATE TABLE lesregistraties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  klant_naam TEXT NOT NULL,
  klant_email TEXT NOT NULL,
  klant_telefoon TEXT,
  docent_id UUID REFERENCES docenten(id),
  tarief_id UUID REFERENCES tarieven(id),
  status TEXT CHECK (status IN ('ingepland', 'bevestigd', 'voltooid', 'geannuleerd', 'niet_gegeven')) DEFAULT 'ingepland',
  mollie_payment_id TEXT,
  mollie_betaald BOOLEAN DEFAULT false,
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
  lesregistratie_id UUID REFERENCES lesregistraties(id),
  score INTEGER CHECK (score BETWEEN 1 AND 5),
  tekst TEXT,
  publiek BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aanmeldingen (wachtlijst docenten)
-- Velden komen rechtstreeks uit het aanmeldformulier op /voor-docenten (stap 1 onboarding)
CREATE TABLE aanmeldingen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  naam TEXT NOT NULL,
  email TEXT NOT NULL,
  woonplaats TEXT,                        -- woonplaats / regio
  opleiding TEXT,                         -- yoga-opleiding(en) en discipline
  jaren_leservaring INTEGER,              -- jaren leservaring
  recente_lespraktijk TEXT,               -- lespraktijk afgelopen 6-12 maanden
  ervaring_privelessen TEXT,              -- ervaring met privélessen
  type TEXT CHECK (type IN ('docent', 'klant')) DEFAULT 'docent',
  verwerkt BOOLEAN DEFAULT false,         -- false = nog niet beoordeeld door Sabine
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ✅ OPGELOST (was hier: "OPEN BOUWPUNT — schema-uitbreiding aanmeldingen, nog niet gebouwd").
-- Het aanmeldformulier is sinds 21-08-2026 (v1.29) functioneel; de destijds ontbrekende velden
-- en verklaringen (yogastijlen, andere_disciplines, motivatie, toelichting, regio, de vier
-- akkoord_*-verklaringen) zijn toen rechtstreeks via de SQL Editor toegevoegd, zonder
-- bijbehorend migratiebestand. Met terugwerkende kracht vastgelegd in
-- 20260829120000_aanmeldingen_historische_inhaalslag.sql (29-08-2026), geverifieerd tegen de
-- daadwerkelijke live database.

-- Row Level Security inschakelen
ALTER TABLE docenten ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesregistraties ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Beleid: iedereen mag actieve docenten zien
CREATE POLICY "Actieve docenten zijn publiek zichtbaar"
ON docenten FOR SELECT
USING (actief = true);

-- Beleid: docenten mogen hun eigen profiel bewerken
CREATE POLICY "Docent mag eigen profiel bewerken"
ON docenten FOR UPDATE
USING (auth.uid() = user_id);
