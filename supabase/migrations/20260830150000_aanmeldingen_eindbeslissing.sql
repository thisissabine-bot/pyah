-- Eindbeslissing na het kennismakingsgesprek (CC-opdracht: Stap 4A/4B, 30-08-2026), los van
-- de bestaande Stap 2-beslissing match_beslissing.
--
-- eindbeslissing_mail_verzonden_op is niet expliciet genoemd in de opdracht (sectie 1 noemt
-- alleen eindbeslissing/eindbeslissing_op), maar wel nodig om sectie 2's vereiste
-- ("foutafhandeling bij mislukte verzending zoals in v1.32 gebouwd") daadwerkelijk te kunnen
-- bouwen — v1.32's patroon steunt juist op zo'n kolom om na een mislukte verzending blijvend
-- zichtbaar te maken (ook na een pagina-herlaad) dat de mail niet is aangekomen.
ALTER TABLE aanmeldingen
  ADD COLUMN IF NOT EXISTS eindbeslissing TEXT CHECK (eindbeslissing IN ('match', 'geen_match')),
  ADD COLUMN IF NOT EXISTS eindbeslissing_op TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS eindbeslissing_mail_verzonden_op TIMESTAMPTZ;
