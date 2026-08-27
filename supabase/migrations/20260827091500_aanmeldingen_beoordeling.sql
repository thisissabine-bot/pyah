-- Interne beoordeling van docentaanmeldingen (CC-opdracht: Aanmeldingen-overzicht, Stap 2)
-- Sabine legt per aanmelding een niveau-inschatting en een match-beslissing vast.
ALTER TABLE aanmeldingen ADD COLUMN niveau_inschatting TEXT
  CHECK (niveau_inschatting IN ('startend', 'ervaren'));
ALTER TABLE aanmeldingen ADD COLUMN match_beslissing TEXT
  CHECK (match_beslissing IN ('ja', 'nee'));
ALTER TABLE aanmeldingen ADD COLUMN beoordeeld_op TIMESTAMPTZ;
ALTER TABLE aanmeldingen ADD COLUMN mail_verzonden_op TIMESTAMPTZ;
-- `verwerkt` (bestaande kolom) wordt op true gezet zodra `match_beslissing` is ingevuld
-- en de bijbehorende mail is verzonden.
