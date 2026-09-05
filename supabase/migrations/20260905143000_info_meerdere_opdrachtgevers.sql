-- Info-icoon "Meerdere opdrachtgevers" (CC-opdracht "info-icoon meerdere
-- opdrachtgevers", 05-09-2026). Niet-bindend informatiemoment, losstaand van de
-- bestaande AV-acceptatievelden op `docenten` (akkoord_platformovereenkomst e.d.).
--
-- "geopend op" wordt bij élke keer dat de modal wordt geopend gelogd als losse rij
-- (audit trail — de opdracht liet de keuze bewust open: "kan meerdere waarden
-- hebben, of alleen eerste/laatste, bouwvoorkeur bij CC"). "bevestigd op" is een
-- eenmalige timestamp op `docenten` zelf: wordt alleen gezet bij de eerste
-- "Ik heb dit gelezen"-klik en daarna nooit meer overschreven (afgedwongen in de
-- API-route, zie src/app/api/docent/[id]/info-meerdere-opdrachtgevers/route.ts).
--
-- Nog niet geplaatst op een pagina: het docentendashboard (incl. agenda/
-- lesregistratie-overzicht, Fase 4) bestaat nog niet. Component + migratie staan
-- klaar om ingeplugd te worden zodra dat dashboard gebouwd wordt.
CREATE TABLE info_meerdere_opdrachtgevers_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  docent_id UUID NOT NULL REFERENCES docenten(id) ON DELETE CASCADE,
  geopend_op TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX info_meerdere_opdrachtgevers_log_docent_id_idx
  ON info_meerdere_opdrachtgevers_log (docent_id);

ALTER TABLE docenten
  ADD COLUMN info_meerdere_opdrachtgevers_bevestigd_op TIMESTAMPTZ;

-- Geen RLS: zelfde reden als `aanmeldingen`/`toetsingen` — uitsluitend via
-- createServerClient() (service-role key) benaderd.
