-- Herstructurering van de tabel `toetsingen` (CC-opdracht: Toetsingsdocument Stap 3,
-- volledige herstructurering, 30-08-2026). Vervangt de paginavolgorde en velden uit
-- 20260829210000_toetsingen.sql.
--
-- Let op: de opdracht ging ervan uit dat de tabel "nog niet op een gedeelde/productie-
-- database" stond — dat klopt niet meer: `toetsingen` is inmiddels al toegepast en in
-- gebruik (zie CLAUDE.md v1.42/v1.45–v1.47). Daarom hier bewust ALTER-statements i.p.v.
-- de tabel opnieuw aan te maken, zodat eventuele al ingevoerde toetsingen niet verloren
-- gaan op de kolommen die ongewijzigd blijven. Op de kolommen die hieronder vervallen
-- (zie 2.3/2.4 van de opdracht) gaat reeds ingevoerde data wél verloren — dat is een
-- bewust aanvaard gevolg van de herstructurering, niet per ongeluk.

-- 2.1 Basisgegevens — twee nieuwe KOR-velden
ALTER TABLE toetsingen
  ADD COLUMN IF NOT EXISTS kor_van_toepassing_per DATE,
  ADD COLUMN IF NOT EXISTS kor_verdiend_cent INTEGER;

-- 2.3 Checklist — verzekering_in_orde verhuist van los BOOLEAN-veld naar TEXT-checklistitem
-- (ja/nee/twijfel), zelfde patroon als de andere checklist-items.
DO $$
BEGIN
  IF (
    SELECT data_type FROM information_schema.columns
    WHERE table_name = 'toetsingen' AND column_name = 'verzekering_in_orde'
  ) = 'boolean' THEN
    ALTER TABLE toetsingen ALTER COLUMN verzekering_in_orde TYPE TEXT
      USING (CASE
        WHEN verzekering_in_orde IS TRUE THEN 'ja'
        WHEN verzekering_in_orde IS FALSE THEN 'nee'
        ELSE NULL
      END);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'toetsingen_verzekering_in_orde_check') THEN
    ALTER TABLE toetsingen ADD CONSTRAINT toetsingen_verzekering_in_orde_check
      CHECK (verzekering_in_orde IN ('ja', 'nee', 'twijfel'));
  END IF;
END $$;

-- Vervallen top-level ja/nee-velden (opgegaan in de checklist hierboven)
ALTER TABLE toetsingen
  DROP COLUMN IF EXISTS opleiding_in_orde,
  DROP COLUMN IF EXISTS certificaten_besproken;

-- 2.4 Open vragen — de 5 grote vrije-tekstvelden vervallen, vervangen door 14 losse,
-- kleine velden verdeeld over 3 secties (vak_*, houding_*, energie_*).
ALTER TABLE toetsingen
  DROP COLUMN IF EXISTS praktisch_professioneel,
  DROP COLUMN IF EXISTS vakinhoudelijk,
  DROP COLUMN IF EXISTS geschiktheid_1op1_toelichting,
  DROP COLUMN IF EXISTS houding_cultuur,
  DROP COLUMN IF EXISTS energie_intuitie,
  ADD COLUMN IF NOT EXISTS vak_intake_ervaring TEXT,
  ADD COLUMN IF NOT EXISTS vak_werkwijze_verwoorden TEXT,
  ADD COLUMN IF NOT EXISTS vak_grenzen_doorverwijzing TEXT,
  ADD COLUMN IF NOT EXISTS vak_rust_aandacht TEXT,
  ADD COLUMN IF NOT EXISTS vak_veilig_zonder_groep TEXT,
  ADD COLUMN IF NOT EXISTS vak_flexibiliteit TEXT,
  ADD COLUMN IF NOT EXISTS vak_certificering_vs_ervaring TEXT,
  ADD COLUMN IF NOT EXISTS houding_feedback_ontwikkeling TEXT,
  ADD COLUMN IF NOT EXISTS houding_samenwerkingsstructuur TEXT,
  ADD COLUMN IF NOT EXISTS houding_community_bereidheid TEXT,
  ADD COLUMN IF NOT EXISTS houding_respect_platform TEXT,
  ADD COLUMN IF NOT EXISTS energie_gelijkwaardig_zuiver TEXT,
  ADD COLUMN IF NOT EXISTS energie_samenwerken_niet_halen TEXT,
  ADD COLUMN IF NOT EXISTS energie_aanraden_dierbare TEXT;
