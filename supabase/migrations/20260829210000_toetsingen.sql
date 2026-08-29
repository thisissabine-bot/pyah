-- Toetsingsdocument bij het kennismakingsgesprek (CC-opdracht: Toetsingsdocument, Stap 3).
-- Eén rij per aanmelding; het formulier blijft altijd te openen/overschrijven, geen
-- afronden/vergrendelen-status.
CREATE TABLE toetsingen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aanmelding_id UUID NOT NULL REFERENCES aanmeldingen(id) ON DELETE CASCADE UNIQUE,

  -- Basisgegevens (live tijdens gesprek)
  datum_gesprek DATE,
  geboortedatum DATE,
  kvk_nummer TEXT,
  verzekering_geldig_tot DATE,

  -- Opleiding & niveau (niveau_definitief wordt bij opslaan teruggeschreven naar
  -- aanmeldingen.niveau_inschatting, zie route /api/admin/aanmeldingen/[id]/toetsing)
  niveau_definitief TEXT CHECK (niveau_definitief IN ('startend', 'ervaren')),
  opleiding_in_orde BOOLEAN,
  verzekering_in_orde BOOLEAN,
  certificaten_besproken BOOLEAN,

  -- Checklist (JA/NEE/TWIJFEL)
  ytt_200u_in_orde TEXT CHECK (ytt_200u_in_orde IN ('ja','nee','twijfel')),
  geschikt_1op1 TEXT CHECK (geschikt_1op1 IN ('ja','nee','twijfel')),
  regio_passend TEXT CHECK (regio_passend IN ('ja','nee','twijfel')),
  houding_passend_pyah TEXT CHECK (houding_passend_pyah IN ('ja','nee','twijfel')),
  veiligheid_professionaliteit TEXT CHECK (veiligheid_professionaliteit IN ('ja','nee','twijfel')),
  community_gevoel TEXT CHECK (community_gevoel IN ('ja','nee','twijfel')),
  intuitieve_match TEXT CHECK (intuitieve_match IN ('ja','nee','twijfel')),
  checklist_opmerkingen TEXT,

  -- Verdieping tijdens gesprek (vrije tekst per subsectie)
  praktisch_professioneel TEXT,
  vakinhoudelijk TEXT,
  geschiktheid_1op1_toelichting TEXT,
  houding_cultuur TEXT,
  energie_intuitie TEXT,

  -- Afsluiting
  ingevuld_door TEXT DEFAULT 'Sabine Blok',
  extra_notities TEXT,

  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Geen RLS: net als `aanmeldingen` wordt deze tabel uitsluitend via de admin-routes benaderd,
-- met de service-role key (createServerClient), die RLS toch al omzeilt.
