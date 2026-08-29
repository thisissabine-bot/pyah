-- Derde match-beslissing 'wachtlijst' voor docentaanmeldingen buiten de pilotregio
-- (CC-opdracht: Wachtlijst-optie, Stap 2). De check-constraint is oorspronkelijk inline
-- aangemaakt via ADD COLUMN in 20260827091500_aanmeldingen_beoordeling.sql, waarbij Postgres
-- de naam <tabel>_<kolom>_check genereert.
ALTER TABLE aanmeldingen DROP CONSTRAINT IF EXISTS aanmeldingen_match_beslissing_check;
ALTER TABLE aanmeldingen ADD CONSTRAINT aanmeldingen_match_beslissing_check
  CHECK (match_beslissing IN ('ja', 'nee', 'wachtlijst'));
