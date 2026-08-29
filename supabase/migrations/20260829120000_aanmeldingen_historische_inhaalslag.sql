-- Inhaalmigratie: legt kolommen en constraints vast die al sinds 21-08-2026 (v1.29,
-- docentaanmeldformulier functioneel gemaakt) live op de database staan, maar nooit in een
-- migratiebestand hebben gestaan (vermoedelijk destijds rechtstreeks via de SQL Editor
-- toegevoegd). Geverifieerd tegen de daadwerkelijke live database op 29-08-2026 via
-- pg_constraint — niet afgeleid van CLAUDE.md of aannames.
--
-- Deze migratie hoeft NIET (opnieuw) op de huidige database te worden uitgevoerd — alles
-- staat er al. Ze is bewust idempotent (IF NOT EXISTS / conditionele DO-block) zodat een
-- per ongeluk uitvoeren op de huidige database geen foutmelding geeft, en zodat een
-- database die wél helemaal vanaf `supabase/migrations/` wordt opgebouwd, op hetzelfde
-- eindresultaat uitkomt.

-- jaren_leservaring stond in de oorspronkelijke init_schema.sql nog als INTEGER; is live
-- gewijzigd naar TEXT met een CHECK-constraint die (afwijkend van de overige constraints op
-- deze tabel) geen tabelprefix in de naam heeft: 'jaren_leservaring_check' i.p.v. het
-- gebruikelijke 'aanmeldingen_jaren_leservaring_check'.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'jaren_leservaring_check') THEN
    ALTER TABLE aanmeldingen ALTER COLUMN jaren_leservaring TYPE TEXT USING jaren_leservaring::TEXT;
    ALTER TABLE aanmeldingen ADD CONSTRAINT jaren_leservaring_check
      CHECK (jaren_leservaring IN ('Minder dan 1 jaar', '1-2 jaar', '3-5 jaar', '6-10 jaar', 'Meer dan 10 jaar'));
  END IF;
END $$;

ALTER TABLE aanmeldingen
  ADD COLUMN IF NOT EXISTS yogastijlen TEXT,
  ADD COLUMN IF NOT EXISTS andere_disciplines TEXT,
  ADD COLUMN IF NOT EXISTS motivatie TEXT,
  ADD COLUMN IF NOT EXISTS toelichting TEXT,
  ADD COLUMN IF NOT EXISTS regio TEXT CHECK (regio IN ('haarlem_eo', 'wachtlijst')),
  ADD COLUMN IF NOT EXISTS akkoord_erkende_opleiding BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS akkoord_geen_garantie BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS akkoord_avb BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS akkoord_privacyverklaring BOOLEAN DEFAULT false;
