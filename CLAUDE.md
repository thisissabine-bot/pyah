\# CLAUDE.md — Private Yoga at Home (PYAH)  
\#\# Bouwinstructie voor Claude Code

\---

\#\# Versiegeschiedenis

| Versie | Datum | Wijzigingen |
| :----- | :---- | :---------- |
| v1.35 | 28-08-2026 | v1.33's scroll-fix bleek in de praktijk (na livetest door Sabine) niet betrouwbaar: de `smooth`-scrollanimatie naar de bevestigingstekst kon halverwege worden onderbroken (vermoedelijk door een layout-verschuiving vlak na de submit, bijv. het inladen van het Arsenica-lettertype), waardoor de pagina alsnog ergens halverwege bleef hangen in plaats van bovenaan de bevestigingstekst. `AanmeldFormulier.tsx` scrollt nu instant (`behavior: "auto"`, na dubbele `requestAnimationFrame` zodat het na de layout-update van de browser plaatsvindt) in plaats van geanimeerd — geen tijdvenster meer waarin de scroll kan worden afgebroken. |
| v1.34 | 28-08-2026 | HTML e-mailsjabloon met handtekening gebouwd (CC-opdracht "HTML e-mailsjabloon met handtekening", `CC-opdracht_HTML-emailsjabloon.docx`): nieuwe herbruikbare layoutfunctie `wrapEmailHtml()` in `src/lib/email/emailLayout.ts` — table-based HTML met inline styles (geen externe CSS/classes, geen custom lettertypen), buitenste container max-breedte 600px wit, vaste handtekening onderaan met dunne scheidingslijn (`#d4baad`) boven "Hartelijke groet, Team Private Yoga at Home" + logo-afbeelding (max-breedte 180px, alt-tekst "Private Yoga at Home"). Logo wordt statisch geladen vanaf de absolute publieke URL `https://privateyogaathome.nl/email/logo-pyah-email.png` (bestand `public/email/logo-pyah-email.png` bestond al, door Sabine aangeleverd — niet opnieuw gegenereerd; feitelijke afmeting bij oplevering 562×150px i.p.v. de 640×72px uit de opdracht, verder ongemoeid gelaten). `uitnodigingEmail()` en `afwijzingEmail()` (`src/lib/email/aanmeldingBeoordeling.ts`) hebben nu naast het bestaande `text`-veld ook een `html`-veld via `wrapEmailHtml()`; inhoud (aanhef, teksten, Calendly-placeholder) ongewijzigd — de Calendly-plek in de uitnodigingsmail is in de HTML-versie een knop (`<a>`, accentkleur `#a66658`) i.p.v. kale tekst-URL. Route `/api/admin/aanmeldingen/[id]/beslissing` geeft nu ook `html` mee aan `resend.emails.send()` (naast `text` als fallback). Buiten scope, conform de opdracht: welkomstmail-inhoud (Stap 4A — sjabloon is er wel al klaar voor), Cloudinary, en de bevestigingsmail van het aanmeldformulier (`/api/voor-docenten/aanmelden`) — die blijft platte tekst. |
| v1.33 | 28-08-2026 | UX-bug op `/voor-docenten/aanmelden` gefixt: na het versturen van het aanmeldformulier verving de bevestigingstekst ("Bedankt voor je aanmelding!") het lange formulier door een kort blokje, waardoor de pagina korter werd terwijl de scrollpositie gelijk bleef — de bezoeker "zakte" zo visueel door naar de onderste CTA-sectie ("Nog vragen?") in plaats van bovenaan de bevestiging te blijven. `AanmeldFormulier.tsx` scrollt nu expliciet (`scrollIntoView`, smooth) naar de bevestigingstekst zodra deze verschijnt. |
| v1.32 | 28-08-2026 | Mislukte mailverzending bij een aanmeldingsbeoordeling is nu zichtbaar in de UI in plaats van stil weg te vallen achter een succes-toast: `mail_verzonden_op` op `aanmeldingen` wordt voortaan alleen gezet bij daadwerkelijk verzonden mail (was: altijd gezet, ook bij een mislukte Resend-aanroep — een dataintegriteitsbug). Route `/api/admin/aanmeldingen/[id]/beslissing` geeft `mail_verzonden` (boolean) terug; overzichtspagina toont bij mislukte verzending "Beslissing opgeslagen, maar de mail kon niet worden verstuurd" i.p.v. de gewone succes-toast (nieuwe stijl `.admin-toast--warning`, sectie 28 `layout.css`, binnen bestaand kleurenpalet: achtergrond `#a66658`, tekst wit); detailpagina toont dezelfde waarschuwing blijvend zodra een admin later terugkijkt op een al-beoordeelde aanmelding waarvan de mail niet aankwam. Tegelijk de tijdelijke RESEND_API_KEY-debug-logging uit v1.31's laatste debug-commit verwijderd, nu de sleutelmismatch tussen deze route en de aanmeldformulier-route is opgelost. |
| v1.31 | 27-08-2026 | Docent-onboarding Stap 2 gebouwd (CC-opdracht "Aanmeldingen-overzicht — Stap 2"): admin-overzicht (`app/dashboard/admin/aanmeldingen/page.tsx`) en detailpagina (`app/dashboard/admin/aanmeldingen/[id]/page.tsx`) waarmee Sabine binnengekomen docentaanmeldingen kan bekijken, een niveau-inschatting (Startend/Ervaren) vastleggen en een match-beslissing (uitnodigen/afwijzen) nemen; bij de beslissing verstuurt het systeem automatisch de bijbehorende e-mail via Resend (`src/lib/email/aanmeldingBeoordeling.ts`, incl. `CALENDLY_LINK_PLACEHOLDER`-constante bovenaan het bestand, nog op `"#"` in afwachting van de definitieve Calendly-link) en zet `verwerkt = true`. Schema uitgebreid met `niveau_inschatting`, `match_beslissing`, `beoordeeld_op`, `mail_verzonden_op` op `aanmeldingen` (migratie `20260827091500_aanmeldingen_beoordeling.sql`). Actielogica: "Match — uitnodigen" vereist eerst een ingevulde niveau-inschatting (inline validatiemelding anders); een beslissing is server-side niet terug te draaien (route weigert een tweede beslissing op een al-verwerkte aanmelding). Beperkt tot `type = 'docent'`; `type = 'klant'`-aanmeldingen, het Toetsingsdocument (07A, Stap 3) en de Calendly-koppeling zelf blijven buiten scope, conform de opdracht. ⚠️ Gebouwd zonder auth-gate op `/dashboard/admin/*` — in overleg met Sabine bewust gekozen omdat er nog geen werkende adminlogin/`middleware.ts` in de codebase bestaat (Fase 4, punt 15, nog niet gebouwd) en de opdracht zelf geen auth noemt; deze route toont persoonsgegevens en kan e-mails versturen, dus moet vóór een echte deploy alsnog achter een adminlogin. Nieuwe migratie is (net als de vorige) nog niet toegepast op de live Supabase-database — moet nog handmatig via SQL Editor (of `supabase db push` na `supabase link`) worden uitgevoerd voordat deze pagina's echt met data werken. Nieuwe CSS-sectie 28 in `layout.css` toegevoegd (tabel-striping/hover, statusbadges, toast, detail-velden) — zelfde patroon als bestaande tabel-/formuliersecties. |
| v1.30 | 24-08-2026 | Aanmeldformulier docenten (sectie 4 van `/voor-docenten/aanmelden`) bijgesteld op vraag van Sabine. Vraag "Welke yogaopleiding(en) heb je gevolgd?" vervangen door "Bij welk (internationaal) erkend instituut zoals Yoga Alliance of gelijkwaardig heb je je opleiding gevolgd?" (oude toelichting over trainingsuren vervalt); nieuw verplicht veld "Hoeveel trainingsuren heeft je yogaopleiding omvat?" toegevoegd direct erna (keuzelijst: 200 uur / 400 uur / Meer dan 400 uur — 200 uur is de minimumeis voor toelating, dus de laagste optie) — hiervoor nieuwe kolom `trainingsuren` TEXT+CHECK toegevoegd aan `aanmeldingen` (migratie `20260824134937_aanmeldingen_trainingsuren.sql`). "Welke yogastijlen geef je les?" is nu verplicht (was optioneel). "Bied je daarnaast nog andere disciplines aan?" en "Is er nog iets dat je met ons wilt delen?" zijn beide verplicht gemaakt met een Nee/Ja-schakelvraag (Nee eerst, zodat bij "Ja" het bijbehorende invulveld er direct op aansluit) — bij "Ja" verschijnt een verplicht tekstveld ("Zo ja, welke?" resp. "Zo ja, licht toe:"), bij "Nee" wordt de onderliggende kolom leeg opgeslagen; dit is puur een UI-laag (`heeft_andere_disciplines`/`heeft_toelichting`, alleen client-side, niet naar de API/DB gestuurd) bovenop de bestaande `andere_disciplines`/`toelichting`-kolommen, dus geen schema-wijziging nodig. Spacing tussen H3-subkop en volgende bodytekst binnen dit formulier eerst volledig verwijderd op verzoek, bleek in de praktijk te krap oogend naast de rest van de pagina — teruggezet, maar met de bestaande kleine `.mb-text` (10px) in plaats van de standaard `.mb-section` (48px) die de rest van de site gebruikt: een bewuste, kleinere tussenmaat, alleen toegepast op de H3's binnen dit formulier. CTA-sectie onderaan de pagina (overline "Nog vragen?" / H3 "Benieuwd naar tarief en commissie?") bijgewerkt: bodytekst en knoppen "Bekijk de abonnementen"/"Hoe werkt het?" vervangen door "Tarieven" (→ `/voor-docenten/tarieven`) / "Abonnement" (→ `/voor-docenten/abonnement`) — beide routes bestonden al. |
| v1.29 | 21-08-2026 | Aanmeldformulier (`/voor-docenten/aanmelden`) functioneel gemaakt: invullen → react-hook-form + zod-validatie → insert in `aanmeldingen` (`type='docent'`, `verwerkt=false`) → bevestigingsmail naar de docent + notificatiemail naar Sabine via Resend, alles op basis van de live paginatekst (niet het conceptdocument). Bij het koppelen bleken twee dingen niet meer overeen te komen tussen live pagina en het inmiddels uitgebreide schema: (1) de regio-keuze stond nog als twee losse, niet-verplichte checkboxes (`akkoord_pilotregio`/`akkoord_wachtlijst`) zonder DB-kolom — vervangen door een verplichte radio-groep die naar de nieuwe kolom `regio` schrijft (`haarlem_eo` / `wachtlijst`); (2) de zichtbare tekst bij "Hoeveel jaar geef je yogales?" gebruikte een en-dash ("1–2 jaar"), terwijl de DB-CHECK-constraint een koppelteken verwacht ("1-2 jaar") — na overleg met Sabine de weergave aangepast naar koppelteken zodat weergave en opgeslagen waarde gelijk zijn (empirisch bevestigd: insert met koppelteken-waarde slaagt). `recente_lespraktijk`/`ervaring_privelessen` slaan nu de zichtbare labeltekst op (bijv. "Ja, wekelijks") i.p.v. de eerdere value-slugs, voor consistentie met `jaren_leservaring` — er staat geen DB-constraint op deze twee kolommen, dus dit is geen harde eis. CREATE TABLE-blok `aanmeldingen` bijgewerkt naar het daadwerkelijke schema (was op punten verouderd: `jaren_leservaring` stond nog als INTEGER i.p.v. TEXT+CHECK); open bouwpunt over de ontbrekende schema-uitbreiding is hiermee opgelost. `src/lib/supabase/types.ts` (sterk verouderde hand-written Supabase-types) aangevuld met `Relationships`/`Views`/`Functions` zodat het `Database`-type structureel voldoet aan wat `@supabase/supabase-js` v2.105 verwacht — nodig omdat dit de eerste `.insert()`-aanroep in de codebase is; verdere veroudering van dat bestand (bijv. `boekingen` i.p.v. `lesregistraties`) niet aangepakt, buiten scope van deze opdracht. Nieuwe CSS-classes `.form-radio-row` en `.form-error` toegevoegd aan sectie 21 van `layout.css`, zelfde patroon als het bestaande `.form-checkbox-row`. Na livetest bleek de RESEND_API_KEY verlopen/ongeldig; na vernieuwing werkte de bevestigingsmail meteen, maar de notificatiemail naar `admin@privateyogaathome.nl` bouncete eerst ("Recipient not found") omdat die mailbox nog niet bestond — Resend zette het adres daardoor automatisch op de suppression-lijst; na aanmaken van de mailbox én handmatig verwijderen uit de suppression-lijst kwam de mail wel aan. Notificatiemail naar Sabine uitgebreid van het oorspronkelijk voorziene korte overzicht (naam, woonplaats, regio, opleiding, ervaring) naar álle ingevulde velden (incl. yogastijlen, andere disciplines, motivatie, toelichting) op verzoek na livetest. Toelichtingsregels toegevoegd op de pagina: "Kies één van de twee." onder de regio-radio's, "Vink alle vier de onderdelen aan om je aanmelding te kunnen versturen." boven de verklaringen. Privacyverklaring-checkboxtekst gecorrigeerd naar een link "Privacybeleid" → `/privacybeleid` (stond eerst als kale tekst zonder link). Buiten scope (later): admin-beoordelingsscherm, welkomstmail-met-registratietoken, wachtlijstbeheer-UI. |
| v1.28 | 21-08-2026 | Kaart met pin op docentprofiel (`DocentKaart.tsx`) en de kaart op `/docenten` (`ZoekKaart.tsx`) tonen geen pin voor docenten buiten de vier oorspronkelijke steden (Amsterdam, Haarlem, Utrecht, Rotterdam) — de component rendert dan stil niets, zonder foutmelding. Ontdekt bij Emma van Dijk (Vijfhuizen): geen kaart, wel bij Anne de Vries (Haarlem). `STAD_COORDINATEN` in beide bestanden (was al gedupliceerd, niet samengevoegd — buiten scope van deze fix) uitgebreid met de overige pilotplaatsen: Zandvoort, Heemstede, Aerdenhout, Vijfhuizen, Hoofddorp, Bloemendaal. |
| v1.27 | 21-08-2026 | Privacybeleid en Cookiebeleid gepubliceerd: placeholder-inhoud op `/privacybeleid` en `/cookiebeleid` vervangen door paginatitel + PDF-link (`privacybeleid-v1.pdf` / `cookiebeleid-v1.pdf`, `target="_blank"`, geen download-attribuut — zelfde patroon als AV Klanten/AV Docenten). Legal-linkregel in `Footer.tsx` en `DocentFooter.tsx` (die sinds de AV-livegang alleen "Algemene voorwaarden" toonde) aangevuld met "Privacybeleid" en "Cookiebeleid"; "Disclaimer" blijft bewust ongelinkt tot die pagina inhoud heeft. `av-docenten-v5.pdf` en `av-klanten-v5.pdf` vervangen door bijgewerkte versies (zelfde bestandsnaam, dus geen codewijziging nodig). |
| v1.26 | 20-08-2026 | Tabel `boekingen` hernoemd naar `lesregistraties` (en alle verwijzingen ernaar: kolomnaam `boeking_id` → `lesregistratie_id` in `reviews`, `facturen` en `tegoeden`; unieke index, ALTER TABLE-blok, RLS, cron job-beschrijving, dashboardmap). Reden: de tabel wordt gevuld door de Docent die een reeds mondeling/telefonisch afgesproken les vastlegt — niet door een Klant die iets aanvraagt of boekt via het platform. Status-set tegelijk gecorrigeerd van `aangevraagd/bevestigd/voltooid/geannuleerd` naar `ingepland/bevestigd/voltooid/geannuleerd/niet_gegeven`, conform de al langer vastgelegde Statusreeks in de facturatie/lesregistratie-sectie — de basistabel liep hierop achter. ⚠️ Open punt: het component `lesregistraties/LesKiezer.tsx` (Mappenstructuur) beschrijft een klant-facing keuzecomponent voor lestype/duur — dit lijkt een leftover van een eerder concept waarin de klant zelf boekt. Nog te beoordelen of dit component nog past, of dat de lestype/duur-keuze uitsluitend via het Docent-dashboard (lesregistratie) hoort te lopen. |
| v1.25 | 19-08-2026 | Sectie "Tabellen met veel rijen — striping & hover" uitgebreid met een expliciete uitzondering voor tabellen op een witte sectie-achtergrond: de standaard striping-combinatie (rgba(255,255,255,0.5) + #ebe3e0) bleek daar te vlak — wit-op-wit geeft nauwelijks contrast. Ontdekt bij /voor-docenten/tarieven, sectie 2 (Lestarieven). Voor déze tabel een sterkere tint toegepast (koprij en rij "Losse les 60 min." #ebe3e0, rij "Introductieles" en "Losse les 75 min." #f5f1f0) — een bewuste uitzondering voor déze tabel, geen nieuwe algemene regel. |
| v1.24 | 18-08-2026 | Sectie "Sectie-overgangen — vaste standaard" uitgebreid met een derde, bredere uitzondering: reeksen opeenvolgende secties met dezelfde achtergrondkleur gebruiken `.page-section-top` op elke sectie behalve de laatste van de reeks, waardoor de tussenruimte halveert naar 80px/100px in plaats van de volle 160px/200px. Dit patroon bleek al toegepast op de klantpagina `/over` maar was nog niet gedocumenteerd; nu ook doorgevoerd op `/voor-docenten/over` (inclusief het alsnog correct in een `.container`/sectie wrappen van de eerste "FOTO LIGGEND BEELD", die voorheen als kale `<div>` zonder eigen marge tussen twee secties stond). |
| v1.23 | 12-08-206 | Maandelijkse pop-up/reminder voor KOR-docenten gekoppeld aan activiteit: alleen actief bij minimaal 1 bevestigde les in de voorafgaande maand, om docenten zonder boekingen niet onnodig lastig te vallen. Hervat automatisch bij de eerstvolgende bevestigde les. Maandoverzicht uitgebreid met 5e categorie "Geen check deze maand" zodat inactieve docenten niet ten onrechte als "geen reactie" worden geteld. Opschortingsregel bij uitblijven reactie na reminder verwijst nu naar Platformovereenkomst Art. 6.7 lid g / Art. 5.5 (optie A: automatisch opschorten, geen individuele afweging per geval). |
| v1.22 | 11-08-2026 | Nieuwe subsectie "E-mail bij verzending uitbetalingsspecificatie — KOR-docent" toegevoegd: begeleidende e-mail bij de uitbetalingsspecificatie bevat voor KOR-docenten een aanvullende meldplicht-herinnering over de omzetgrens (totale omzet, niet alleen via PYAH). Staat los van de factuur/PDF zelf, die ongewijzigd blijft. |
| v1.21 | 10-08-2026 | Nieuwe sectie "KOR-monitoring — btw-status Docenten" toegevoegd: maandelijkse btw-statuscheck voor KOR-docenten (pop-up bij inloggen, 3 keuzes + toelichting eigen verantwoordelijkheid bij werk elders), reminder-mail na 5 werkdagen zonder reactie, maandelijks overzicht naar Sabine rond de 10e (4 categorieën incl. "geen reactie"). De maandelijkse zelf-check is robuuster omdat deze niet afhankelijk is van omzet die PYAH zelf kan meten, maar de docent zelf om zijn totale positie (incl. werk elders) vraagt. |
| v1.20 | 07-08-2026 | Klantzijde `Header.tsx`/`Footer.tsx` bijgewerkt (`DocentHeader.tsx`/`DocentFooter.tsx` ongewijzigd): tijdelijk "Home"-item toegevoegd naast het logo in de header, linkend naar \`/homepage-preview\` (de gebouwde maar nog niet live Homepage-route, zolang \`/\` bezet is door de coming-soon pagina) — gemarkeerd met een TIJDELIJK-comment, te verwijderen zodra de Homepage live gaat op \`/\`; footer-navigatie aangevuld met "Hoe werkt het?" en "Tarieven", en "Voor docenten" hernoemd naar "Docent worden" (zelfde route \`/voor-docenten\`, voorkomt een dubbele link naast de nieuwe "Docent worden"-eis); footer-onderbalk herverdeeld: copyright links, vier nieuwe legal-links rechts (Algemene voorwaarden • Privacybeleid • Cookiebeleid • Disclaimer, zelfde stijl als copyright-tekst), op mobiel gestapeld en gecentreerd; vier bijbehorende placeholder-pagina's aangemaakt (\`/algemene-voorwaarden\`, \`/privacybeleid\`, \`/cookiebeleid\`, \`/disclaimer\` — titel + "Binnenkort beschikbaar", content volgt later los) |
| v1.19 | 07-08-2026 | Sectie-overgang-standaard (v1.18, 160px/200px) op basis van visuele screenshot-review kortstondig gehalveerd naar 80px/100px site-breed — bleek achteraf gebaseerd op een meetfout in het geannoteerde-screenshot-script (een overgang werd als 100px gelabeld terwijl de werkelijke waarde 200px was, gelijk aan de rest van de pagina), waardoor de halvering op een onjuiste aanname stoelde. Teruggedraaid naar de bewuste 160px/200px-waarde van v1.18 op `.page-section`, `.page-section-hero`, `Footer.tsx`/`DocentFooter.tsx`, `.zoek-resultaten-wrapper` en `.image-placeholder-liggend-margin`. Netto blijvende wijziging: twee bewuste, kleinere uitzonderingen vastgelegd — de quote-balk op `/hoe-werkt-het` (geen eigen marge, dus 80px/100px i.p.v. 160px/200px) en het "Tussenblok" op `/voor-docenten/hoe-werkt-het` (ongewijzigd, was al een uitzondering). Sectie "Sectie-overgangen — vaste standaard" bijgewerkt met deze twee uitzonderingen |
| v1.18 | 06-08-2026 | Sectie-overgang-standaard verhoogd en site-breed symmetrisch gemaakt: was 128px/160px (met de hero-overgang als asymmetrische uitzondering op 144px/192px), wordt overal — inclusief hero en footer — een vaste, symmetrische 160px (<640px) / 200px (≥640px), 80/80 resp. 100/100 verdeeld. Ontdekt via een handmatige visuele check (twee gelijk-hoge referentieblokken naast de witruimte) dat de oude waarden weliswaar een correct totaal gaven maar niet symmetrisch waren rond de kleurgrens. Doorgevoerd via \`.page-section\`/\`.page-section-hero\` (\`layout.css\`) en de padding-top van \`Footer.tsx\`/\`DocentFooter.tsx\` (was vast 48px \`py-12\`, nu 80px/100px) — de \`.footer-margin\`-klasse is hierdoor overbodig geworden en verwijderd; sectie "Footer-marge" en nieuwe sectie "Sectie-overgangen — vaste standaard" bijgewerkt |
| v1.17 | 06-08-2026 | Nieuwe sectie "Footer-marge" toegevoegd aan "Pagina-layout — patroon": vaste standaard van 128px (<640px) / 160px (≥640px) ruimte boven de footer op alle pagina's, geverifieerd tegen de daadwerkelijk gerenderde output i.p.v. alleen de CSS-bron; toegepast via nieuwe klasse \`footer-margin\` (\`layout.css\`) als losse toevoeging op de laatste sectie van een pagina, zonder \`Footer.tsx\`/\`DocentFooter.tsx\` of \`.page-section\` zelf aan te passen; \`/docenten\` en de live coming-soon pagina op \`/\` hebben een eigen losse aanpassing omdat ze niet het standaard \`.page-section\`-patroon voor de laatste sectie volgen |
| v1.16 | 31-07-2026 | Sectie "Tabellen met veel rijen — striping & hover" gecorrigeerd: de eerder vastgelegde striping (\`#ebe3e0\` 100%/60%) bleek onzichtbaar op een \`section-pearl\`-achtergrond (zelfde kleur als de sectie zelf) — ontdekt bij livegang van de Abonnementen-pagina. Vervangen door een vaste, sectie-onafhankelijke combinatie (\`rgba(255,255,255,0.5)\` + \`#ebe3e0\`) die op zowel witte als pearl-secties werkt |
| v1.15 | 31-07-2026 | Kleurmodifiers (.accent-terracotta / .accent-moss / .on-dark) uitgebreid naar H4 en H5, die dit voorheen niet hadden; default-kleur van H4 en H5 in typography.css gewijzigd van terracotta naar mosgroen (H4 daarnaast 20px → 18px); FAQ-pagina (Abonnement) H4's krijgen hierdoor mosgroen i.p.v. terracotta; Abonnementen-pagina toelichting-sectie: item-titels worden H5 i.p.v. losse alinea-stijl, zodat ze visueel linken met de categoriekoppen in de vergelijkingstabel |
| v1.14 | 30-07-2026 | Sectie "Pagina-layout — patroon" uitgebreid met nieuw sectietype 2b (tekst/tekst naast elkaar, voor Startend/Ervaren-vergelijkingen) en met een paragraaf over gestripete tabelachtergronden met hover-state (referentie: Abonnementen-pagina); toekomstig punt toegevoegd bij "Toekomstige uitbreiding": "Delen van eigen workshops & trainingen binnen de docenten-community" is geparkeerd voor de pilotfase, zelfde patroon als het 4-lessenpakket |
| v1.13 | 28-07-2026 | Open bouwpunt toegevoegd na \`CREATE TABLE aanmeldingen\`: schema mist kolommen voor yogastijlen, andere disciplines, motivatie, toelichting en de verklaringen/akkoordpunten (incl. AVB-checkbox) uit de definitieve Aanmeldformulier-paginatekst; pagina wordt vooralsnog als statische UI gebouwd, schema-uitbreiding + functioneel maken volgt in de backend-fase |
| v1.12 | 27-07-2026 | Regel toegevoegd aan "Pagina-layout — patroon": opsommingen binnen gecentreerde secties (sectietype 1) gebruiken geen bullets maar losse gecentreerde regels, om links uitgelijnde bullets binnen gecentreerde tekst te voorkomen |
| v1.11 | 27-07-2026 | Sectie "Pagina-layout — patroon" toegevoegd: drie sectietypes vastgelegd (1-koloms gecentreerd, 2-koloms wisselend, gekleurd blok gecentreerd) |
| v1.10 | 24-07-2026 | Verouderde sectie "5. Voor docenten" verwijderd; Mappenstructuur bijgewerkt met geneste docentzone-pagina's (hoe-werkt-het, over, abonnement, aanmelden) en DocentHeader.tsx/DocentFooter.tsx toegevoegd aan components/layout — bracht de bestandsstructuur in lijn met de eerder vastgelegde Docentzone-navigatie |
| v1.9 | 23-07-2026 | Nieuwe sectie "Docentzone — navigatie & structuur" toegevoegd na "Pagina voor pagina: wat moet er op staan": docentzijde is een volledig gescheiden zone onder \`/voor-docenten\` met eigen navigatie, eigen header-styling (\`\#a66658\`, witte tekst/logo) en een aparte docent-versie van "Over PYAH" (\`/voor-docenten/over\`, los van klant-\`/over\`); oude sectie "5. Voor docenten" gemarkeerd als verouderd/te vervangen door de nieuwe structuur |
| v1.8 | 22-07-2026 | Facturatie/lesregistratie-sectie (v2) toegevoegd na "Commissie- en tarieflogica", inclusief escape-opmaak gelijkgetrokken met de rest van het document; verouderde sectie "BTW-logica — raadpleeg je boekhouder" en bijbehorende \`uitbetalingen\`-tabel verwijderd (vervangen door \`facturen\`-tabel en herijkte btw-logica in nieuwe sectie); tegenstrijdige zin over uitbetalingsfrequentie in "Betalingsflow" gecorrigeerd (was: einde van de maand, is: tweewekelijks rond de 1e en 15e); verouderd voorbeeldprijzenblok bij \`CREATE TABLE tarieven\` verwijderd (niet-herijkte bedragen, geen toegevoegde waarde op die plek) |
| v1.7 | 24-05-2026 | Docentgrid kolomverdeling vastgesteld: 2 mobiel / 3 tablet / 4 desktop |
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
Docenten krijgen een professioneel profiel en lesregistratiesysteem.

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
Koppen H1 t/m H5 kunnen wisselen tussen terracotta en mosgroen afhankelijk van de pagina en sectie. Gebruik daarvoor altijd een modifier class in combinatie met de heading class:
\- \`.accent-terracotta\` — zet een kop naar \`#a66658\`
\- \`.accent-moss\` — zet een kop naar \`#484f47\`
\- \`.on-dark\` — zet een kop naar \`#ffffff\` op een donkere achtergrond

Voorbeeld: \`<h2 class="heading-h2 accent-terracotta">Titel</h2>\`

Kies nooit zelf een kleur — vraag Sabine welke modifier van toepassing is als dit niet expliciet is aangegeven.

\*\*H4 en H5 — default-kleur gewijzigd (v1.15)\*\*  
H4 en H5 hadden voorheen geen kleurmodifiers en stonden vast op terracotta (\`#a66658\`). Sinds v1.15 gebruiken ook H4 en H5 het modifier-systeem hierboven, en is de \*\*default-kleur van beide gewijzigd naar mosgroen\*\* (\`#484f47\`) — terracotta blijft beschikbaar via \`.accent-terracotta\` waar dat expliciet gewenst is. H4 is daarnaast verkleind van 20px naar 18px. Reden: bij herhaald gebruik van H4/H5 binnen één pagina (bijv. FAQ-items, of een lange lijst met item-titels) werd terracotta al snel een "brei" van dezelfde kleur; mosgroen is rustiger bij herhaling en houdt terracotta beschikbaar voor de koppen die er echt uit moeten springen (H1-H3).

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
page.tsx            # Landingspagina voor docenten (docentzone-homepage)
hoe-werkt-het/
page.tsx          # Hoe werkt het? (docentzone)
over/
page.tsx          # Over PYAH (docent-versie, los van klant-/over)
abonnement/
page.tsx          # Abonnement
aanmelden/
page.tsx          # Aanmelden 
(auth)/                 \# Login/registratie  
login/page.tsx  
registreer/page.tsx  
dashboard/  
docent/               \# Docent dashboard (ingelogd)  
page.tsx            \# Overzicht  
profiel/page.tsx    \# Profiel bewerken  
aanvragen/page.tsx  \# Klantaanvragen  
agenda/page.tsx     \# Lesregistraties  
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
DocentHeader.tsx     # Docentzone-header — achtergrond #a66658, witte tekst/logo
DocentFooter.tsx     # Docentzone-footer, los van de klant-footer 
ui/  
Button.tsx  
Card.tsx  
Badge.tsx  
Input.tsx  
docenten/  
DocentCard.tsx        \# Kaartje in de zoekresultaten  
DocentProfiel.tsx     \# Volledig openbaar profiel  
ZoekFilters.tsx       \# Filters (stijl, locatie, niveau)  
lesregistraties/  
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

\-- Lesregistraties (voorheen 'boekingen' — de Docent registreert een reeds afgesproken les, de Klant boekt niet zelf via het platform)  
CREATE TABLE lesregistraties (  
id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
klant\_naam TEXT NOT NULL,  
klant\_email TEXT NOT NULL,  
klant\_telefoon TEXT,  
docent\_id UUID REFERENCES docenten(id),  
tarief\_id UUID REFERENCES tarieven(id),  
status TEXT CHECK (status IN ('ingepland', 'bevestigd', 'voltooid', 'geannuleerd', 'niet\_gegeven')) DEFAULT 'ingepland',  
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
lesregistratie\_id UUID REFERENCES lesregistraties(id),  
score INTEGER CHECK (score BETWEEN 1 AND 5),  
tekst TEXT,  
publiek BOOLEAN DEFAULT true,  
created\_at TIMESTAMPTZ DEFAULT NOW()  
);

\-- Aanmeldingen (wachtlijst docenten)  
\-- Velden komen rechtstreeks uit het aanmeldformulier op /voor-docenten/aanmelden — functioneel sinds 21-08-2026  
CREATE TABLE aanmeldingen (  
id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
naam TEXT NOT NULL,  
email TEXT NOT NULL,  
woonplaats TEXT,                        \-- woonplaats  
opleiding TEXT,                         \-- welke yogaopleiding(en) heb je gevolgd?  
jaren\_leservaring TEXT CHECK (jaren\_leservaring IN ('Minder dan 1 jaar', '1-2 jaar', '3-5 jaar', '6-10 jaar', 'Meer dan 10 jaar')),  
recente\_lespraktijk TEXT,               \-- lespraktijk afgelopen 6-12 maanden (keuzelijst, geen DB-constraint)  
ervaring\_privelessen TEXT,              \-- ervaring met privélessen (keuzelijst, geen DB-constraint)  
yogastijlen TEXT,                       \-- welke yogastijlen geef je? (vrij tekstveld)  
andere\_disciplines TEXT,                \-- ademwerk, meditatie, sound healing, coaching, workshops (vrij tekstveld)  
motivatie TEXT,                         \-- waarom wil je je aansluiten? (verplicht in het formulier, niet op DB-niveau)  
toelichting TEXT,                       \-- vrij tekstveld, optioneel  
regio TEXT CHECK (regio IN ('haarlem\_eo', 'wachtlijst')),  \-- radio-knoppen, precies één verplicht  
akkoord\_erkende\_opleiding BOOLEAN DEFAULT false,  
akkoord\_geen\_garantie BOOLEAN DEFAULT false,  
akkoord\_avb BOOLEAN DEFAULT false,  
akkoord\_privacyverklaring BOOLEAN DEFAULT false,  
type TEXT CHECK (type IN ('docent', 'klant')) DEFAULT 'docent',  
verwerkt BOOLEAN DEFAULT false,         \-- false \= nog niet beoordeeld door Sabine  
created\_at TIMESTAMPTZ DEFAULT NOW()  
);
\-- Let op: dit schema is al akkoord\_erkende\_opleiding / akkoord\_geen\_garantie / akkoord\_avb / akkoord\_privacyverklaring
\-- (4 verklaringen) i.p.v. de oorspronkelijk voorziene 6 (akkoord\_regio\_pilot en akkoord\_wachtlijst zijn vervangen
\-- door de \`regio\`-kolom met radio-knoppen op de pagina, in plaats van twee losse checkboxes).

\-- Row Level Security inschakelen  
ALTER TABLE docenten ENABLE ROW LEVEL SECURITY;  
ALTER TABLE lesregistraties ENABLE ROW LEVEL SECURITY;  
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

\#\#\# 5\. Docentzone — navigatie & structuur

De docentzijde is een \*\*volledig gescheiden zone\*\* van de klantzijde, met eigen navigatie, eigen header-styling en een eigen URL-structuur onder \`/voor-docenten\`.

\#\#\# URL-structuur (genest)

| Pagina | URL |
| :----- | :-- |
| Docentzone-homepage | \`/voor-docenten\` |
| Hoe werkt het? | \`/voor-docenten/hoe-werkt-het\` |
| Over PYAH (docent-versie) | \`/voor-docenten/over\` |
| Abonnement | \`/voor-docenten/abonnement\` |
| Aanmelden | \`/voor-docenten/aanmelden\` |

\*\*Let op:\*\* \`/voor-docenten/over\` is een \*\*aparte pagina\*\*, los van de klant-versie op \`/over\`. Andere invalshoek: autonomie, professionaliteit en community voor de docent (zie Merkessentie, "Missie docentzijde"), niet het klantperspectief van rust/vertrouwen.

\#\#\# Navigatie klantzijde (bevestigd)

Docenten zoeken · Hoe werkt het? · Over PYAH · Tarieven · Inloggen · Docent worden

\#\#\# Navigatie docentzone (bevestigd)

Hoe werkt het? · Over PYAH · Abonnement · Aanmelden/Inloggen · [knop] Op zoek naar een yogadocent?

De link "Docent worden" uit de klant-nav staat niet in het docentmenu zelf — dat is de pagina waar je al op staat (\`/voor-docenten\`), dus deze linkt niet naar zichzelf.

\#\#\# Wisselpunt tussen de twee zones

\- \*\*Logo in de docentzone linkt naar \`/voor-docenten\`\*\* (niet naar de klant-homepage \`/\`) — een bezoeker die via Google op \`/voor-docenten\` landt, blijft zo binnen de docentzone.  
\- \*\*Knop rechts in de docent-header: "Op zoek naar een yogadocent?"\*\* — link terug naar de klantzijde, voor klanten die per ongeluk op een docentpagina belanden.  
\- De klant-nav is \*\*volledig afwezig\*\* in de docentzone (geen gedeeld menu).

\#\#\# Styling docentzone

\- Headerkleur: \*\*\`\#a66658\`\*\* (accent/terracotta), met \*\*witte tekst en wit logo\*\*  
\- Aparte header-/footercomponenten aangeraden: \`DocentHeader.tsx\` / \`DocentFooter.tsx\`, los van de bestaande \`Header.tsx\` / \`Footer.tsx\`

\---

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
| Losse les      | 60 of 75 min  | Klant kiest bij lesregistratie |

De introductieles is eenmalig per klant-docent combinatie. Enforce dit in de database:  
\`\`\`sql  
CREATE UNIQUE INDEX één\_intro\_per\_klant\_docent  
ON lesregistraties (klant\_email, docent\_id)  
WHERE tarief\_naam \= 'Introductieles';  
\`\`\`

\#\#\# Ervaringsniveau bepaalt de commissie  
| Niveau    | Commissie PYAH | Docent ontvangt |  
|-----------|---------------|-----------------|  
| Startend  | 10%           | 90% van lesprijs |  
| Ervaren   | 20%           | 80% van lesprijs |

\#\#\# Betalingsflow — geld loopt via PYAH

\*\*Belangrijk:\*\* de klant betaalt altijd het volledige lesbedrag aan PYAH.  
PYAH betaalt de docent tweewekelijks uit (rond de 1e en 15e van de maand), minus de commissie.

Technisch via Mollie:  
\- Gebruik de \*\*Mollie Payments API\*\* — klant betaalt via een betaallink (iDEAL, creditcard, etc.)  
\- Geld komt op PYAH's Mollie-rekening  
\- Tweewekelijks maakt PYAH een transfer naar de docent (rond de 1e en 15e van de maand)

\`\`\`ts  
// Mollie betaling aanmaken — geld naar PYAH  
const payment \= await mollieClient.payments.create({  
amount: { currency: 'EUR', value: bedragEuro },  // bijv. '90.00'  
description: \`Les bij ${docent.naam}\`,  
redirectUrl: \`${process.env.NEXT\_PUBLIC\_URL}/lesregistratie/bevestigd\`,  
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

\#\# Facturatie, lesregistratie & uitbetaling


\---

\#\#\# Beschikbaarheid — Desktop & Tablet only

De volgende pagina's zijn uitsluitend beschikbaar op schermen van 768px en breder:

\- Factuur aanmaken (docent dashboard)
\- Factuuroverzicht (docent dashboard)
\- Uitbetalingsoverzicht (docent dashboard)
\- Factuurbeheer (admin dashboard)

Op smallere schermen toont de pagina een melding:
> "Deze functie is beschikbaar op tablet en desktop. Open het platform op een groter scherm om verder te gaan."

Implementeer via een \`useDeviceGuard\`-hook die de viewport controleert en de pagina vervangt door een vriendelijke melding onder 768px.

\---

\#\#\# Tarieven & toeslag

\#\#\#\# Vaste lestarieven (klantprijs incl. 21% BTW)

| Lestype            | Duur      | Startend  | Ervaren   |
|--------------------|-----------|-----------|-----------|
| Introductieles     | 75 min.   | € 80      | € 99      |
| Losse les          | 60 min.   | € 80      | € 99      |
| Losse les          | 75 min.   | € 97      | € 120     |

De introductieles duurt altijd 75 minuten en is eenmalig per klant-docent combinatie.
De prijs is gelijkgesteld aan de losse les van 60 minuten om de drempel te verlagen.

\#\#\#\# Toeslag extra persoon

Per extra persoon wordt \*\*25% toeslag\*\* berekend over de basislesprijs.

\`\`\`ts
// Toeslag extra persoon
const toeslag\_factor = 1 + (0.25 \* (aantal\_personen - 1))
const lesprijs\_met\_toeslag\_cent = Math.round(basisprijs\_cent \* toeslag\_factor)

// Voorbeelden (Ervaren docent, losse les 75 min. = €120):
// 1 persoon: €120 × 1.00 = €120
// 2 personen: €120 × 1.25 = €150
// 3 personen: €120 × 1.50 = €180
\`\`\`

De docent voert het aantal personen in bij het registreren van de les.
Het systeem berekent de toeslag automatisch en toont de totaalprijs vóór het aanmaken van de factuur.

\#\#\#\# Commissie per niveau

| Niveau   | Commissie PYAH | Docent ontvangt |
|----------|---------------|-----------------|
| Startend | 10%           | 90% van lesprijs (incl. toeslag) |
| Ervaren  | 20%           | 80% van lesprijs (incl. toeslag) |

Commissie wordt berekend over de lesprijs inclusief toeslag, exclusief reiskosten.

\#\#\#\# Reiskosten

\- Tarief: \*\*€ 0,25 per kilometer, exclusief btw\*\*
\- Alleen berekend voor afstand \*\*boven 10 km\*\* van de klantlocatie
\- \*\*De docent bepaalt zelf\*\* of, en voor hoeveel kilometer, reiskosten worden doorberekend aan de klant — dit is geen verplichting. De docent voert het aantal te factureren kilometers zelf in bij het aanmaken van de factuur (mag lager zijn dan de werkelijke afstand)
\- Reiskosten vallen \*\*buiten de PYAH-commissie\*\*: het volledige nettobedrag (€ 0,25/km) gaat naar de docent, \*\*ongeacht\*\* of de docent btw-plichtig is of de KOR toepast
\- Het systeem berekent automatisch: \`(opgegeven\_km - 10) \* 0.25\` als opgegeven\_km > 10

\`\`\`ts
const reiskosten\_cent = opgegeven\_km > 10
  ? Math.round((opgegeven\_km - 10) \* 0.25 \* 100)
  : 0
\`\`\`

\*\*BTW op reiskosten (bevestigd door belastingadviseur, zie Jan de Belastingman-rapport JDB-8066-EA46, sectie 4.5 en 6.6):\*\*
\- PYAH is in het commissionairsmodel de verkoper richting de klant. Reiskosten zijn onderdeel van de vergoeding die PYAH aan de klant in rekening brengt, dus PYAH berekent \*\*altijd 21% btw\*\* over de reiskosten aan de klant — \*\*ongeacht de btw-status van de docent\*\*.
\- De btw-status van de docent bepaalt alleen of PYAH deze btw als voorbelasting kan verrekenen (bij een btw-plichtige docent: ja, via de self-billing factuur met btw-vermelding. Bij een KOR-docent: nee — de docent brengt geen btw in rekening, dus er is geen voorbelasting op dit deel. Dit is een bewust geaccepteerd fiscaal effect, geen fout).
\- De docent ontvangt in beide gevallen hetzelfde: € 0,25/km netto, exclusief btw. Dit bedrag verandert niet op basis van de btw-status van de docent.
\- Rekenvoorbeeld (5 km boven de grens, KOR-docent): netto reiskosten € 1,25 → klant betaalt € 1,25 + 21% btw = € 1,51 → PYAH draagt € 0,26 btw af aan de Belastingdienst → docent ontvangt € 1,25. Resultaat voor PYAH: € 0,00 (neutraal, geen commissie op reiskosten).
\- \~\~Het systeem past dit automatisch toe op basis van de BTW-status in het docentprofiel\~\~ — vervallen; de btw op reiskosten aan de klant is niet langer afhankelijk van de btw-status van de docent.

\---

\#\#\# Lesregistratie — docent boekt lessen in het systeem

De docent is verantwoordelijk voor het invoeren van alle afgesproken lessen in het dashboard.
Dit is de basis voor facturatie én voor uitbetaling. Zonder geregistreerde les: geen factuur, geen uitbetaling.

\#\#\#\# Lestypes

| Lestype | Toelichting |
|---|---|
| Introductieles | Altijd 75 min., eenmalig per klant-docent combinatie, directe betaling |
| Losse les | 60 of 75 min., klant kiest; betaalterm 7 dagen |
| 4-lessenpakket | 4 lessen vooraf gefactureerd en betaald; klant kiest 60 of 75 min. per les |

\#\#\#\# Wat de docent invoert per les

\- Klant (naam + e-mail — verplicht)
\- Lestype: Introductieles / Losse les / 4-lessenpakket
\- Duur: 60 of 75 minuten (bij losse les; introductieles is altijd 75 min.)
\- Aantal personen (standaard 1; bij meer dan 1 wordt toeslag berekend)
\- Datum en tijdstip
\- Locatie klant (adres — voor reiskostenberekening)
\- Reisafstand in km (optioneel; systeem berekent reiskosten automatisch als > 10 km)
\- Notities (optioneel)

\#\#\#\# Statusreeks lesregistraties

\`\`\`
ingepland → bevestigd → voltooid
                ↓
           geannuleerd (buiten 24h — les schuift door)
           niet\_gegeven (docent rapporteert; admin handelt af)
\`\`\`

| Status | Betekenis |
|---|---|
| \`ingepland\` | Docent heeft les geregistreerd; factuur nog niet verstuurd of betaling nog open |
| \`bevestigd\` | Betaling ontvangen; les staat vast |
| \`voltooid\` | Les bevestigd als gegeven (door docent of automatisch na 24h) |
| \`geannuleerd\` | Les afgebeld buiten 24h; geen uitbetaling nu — les schuift door |
| \`niet\_gegeven\` | Docent rapporteert dat les niet heeft plaatsgevonden; admin ontvangt notificatie |

\*\*Annulering binnen 24 uur:\*\* de les telt als gegeven. Status wordt \`voltooid\` met vlag \`annulering\_binnen\_24u = true\`. Docent ontvangt volledige uitbetaling.

\---

\#\#\# Facturatie — docent maakt factuur aan

\#\#\#\# Factuurstroom

De factuur wordt aangemaakt door de docent in het dashboard, maar gaat uit onder naam en KvK van \*\*PYAH\*\* (commissionairmodel). De docent initieert; PYAH is de facturerende partij richting de klant.

\#\#\#\# Stap-voor-stap

1\. Docent registreert les (zie boven)
2\. Docent opent les in dashboard → klikt "Factuur aanmaken"
3\. Systeem vult automatisch in:
   \- Klantgegevens
   \- Lestype, duur, aantal personen, datum
   \- Lesprijs inclusief eventuele toeslag
   \- Reiskosten (indien van toepassing)
   \- BTW-uitsplitsing (21%)
   \- PYAH-factuurgegevens (naam, KvK, BTW-nummer)
   \- Uniek factuurnummer (gegenereerd door systeem)
   \- Betalingstermijn (standaard 7 dagen; introductieles: directe betaling)
4\. Docent controleert en bevestigt
5\. Systeem genereert factuur als PDF + Mollie betaallink
6\. Factuur + betaallink worden automatisch per e-mail verstuurd naar de klant
7\. Betaallink is ook zichtbaar in het docent-dashboard zodat de docent hem handmatig kan kopiëren en via WhatsApp kan sturen

\#\#\#\# Introductieles — directe betaling

\- Betalingstermijn is \*\*direct\*\* (niet 7 dagen)
\- Mollie genereert een iDEAL-betaallink die direct actief is
\- Les gaat gewoon door, ook als betaling nog niet is afgerond
\- Betaallink verloopt na 48 uur als niet betaald → systeem stuurt automatisch een nieuwe link

\#\#\#\# 4-lessenpakket

\- Één factuur voor het volledige pakket (4 lessen)
\- Klant betaalt het totaalbedrag vooraf in één keer
\- Het systeem registreert 4 afzonderlijke lessen en houdt tegoed bij
\- Status per les in het pakket: \`ingepland\` → \`bevestigd\` → \`voltooid\`
\- Dashboard toont docent én klant het resterende tegoed: "2 van 4 lessen gebruikt"
\- \*\*Geldigheid pakket: 6 weken vanaf de datum van de eerste les\*\*
  \- Systeem berekent: \`geldig\_tot = datum\_eerste\_les + 42 dagen\`
  \- Verlopen pakketten worden automatisch op \`actief = false\` gezet via dagelijkse cron job
  \- Alleen de admin (Sabine) kan de vervaldatum verlengen (bijv. bij blessure of vakantie)
  \- Verlenging via admin-dashboard → Pakketten → [pakket selecteren] → "Vervaldatum aanpassen"
  \- Elke verlenging wordt gelogd in \`admin\_acties\`

\#\#\#\# Losse les — annulering buiten 24 uur

Als een losse les buiten 24 uur voor aanvang wordt geannuleerd:

\- Lesregistratie krijgt status \`geannuleerd\`
\- Klant ontvangt automatisch een \*\*tegoed\*\* van het volledige lesbedrag
\- Tegoed is geldig voor \*\*4 weken\*\* vanaf de annuleringsdatum
\- Tegoed is gekoppeld aan dezelfde docent
\- Op dag 21 ontvangt de klant een automatische herinnering: "Je tegoed verloopt over een week."
\- Na 4 weken vervalt het tegoed — geen terugbetaling (vastgelegd in de AV)
\- Alleen de admin kan een tegoed verlengen

Het admin-dashboard toont een overzicht van alle openstaande tegoeden: per docent, per klant, met vervaldatum en bedrag.

\#\#\#\# Factuuropbouw (velden op de PDF)

\`\`\`
FACTUUR

Van:        Private Yoga at Home (PYAH)
            KvK: [invullen]
            BTW: [invullen]
            support@privateyogaathome.nl

Aan:        [Naam klant]
            [E-mailadres klant]
            [Bedrijfsnaam + KvK indien B2B]

Factuurnummer:   PYAH-2026-0001
Factuurdatum:    [datum aanmaken]
Vervaldatum:     [factuurdatum + 7 dagen] / Directe betaling (introductieles)

Omschrijving                         Aantal   Prijs excl. BTW   BTW (21%)   Totaal
─────────────────────────────────────────────────────────────────────────────────────
[Lestype] - [duur] min. ([x] pers.)   1        € xx,xx           € xx,xx     € xx,xx
Toeslag extra persoon (x pers.)       1        € xx,xx           € xx,xx     € xx,xx
Reiskosten ([x] km à €0,25)           1        € xx,xx           € xx,xx     € xx,xx

                                                       Totaal incl. BTW:   € xx,xx

Betalen via: [Mollie betaallink]
\`\`\`

\---

\#\#\# Betalingsherinneringen

Automatisch verstuurd via Supabase Edge Function + e-mail (Resend).

| Moment  | Actie |
|---------|-------|
| Dag 8   | Eerste herinnering — vriendelijk, betaallink opnieuw |
| Dag 14  | Tweede herinnering — iets urgenter, betaallink opnieuw |

De admin (Sabine) kan altijd handmatig een herinnering sturen via admin-dashboard → klantoverzicht → "Herinnering sturen".

Herinneringen worden niet verstuurd als de factuur al betaald is. Het systeem controleert betaalstatus via Mollie webhook vóór verzending.

\#\#\#\# E-mailtekst eerste herinnering (dag 8)

\`\`\`
Onderwerp: Herinnering: factuur [factuurnummer] — Private Yoga at Home

Hoi [naam klant],

Fijn dat je een les hebt gepland via Private Yoga at Home.

We zagen dat de betaling voor factuur [factuurnummer] (€ [bedrag]) nog openstaat.
Misschien is de mail tussendoor binnengekomen — geen probleem.

Je kunt veilig betalen via onderstaande link:
→ [Mollie betaallink]

Heb je vragen? Stuur een e-mail naar support@privateyogaathome.nl.

Fijne dag,
Team Private Yoga at Home
\`\`\`

\---

\#\#\# Lesbevestiging na afloop

Na elke les ontvangt de docent een automatische bevestigingsmail:

\`\`\`
Onderwerp: Bevestig je les van [datum] — [naam klant]

Hoi [naam docent],

Kun je bevestigen dat de les van [datum] met [naam klant] heeft plaatsgevonden?

→ [Knop: Ja, les heeft plaatsgevonden]
→ [Knop: Nee, les heeft niet plaatsgevonden]

Als je niet reageert, wordt de les automatisch als bevestigd geregistreerd na 24 uur.

Fijne dag,
Team Private Yoga at Home
\`\`\`

\#\#\#\# Bij "Nee, les heeft niet plaatsgevonden"

De docent wordt gevraagd een reden op te geven (vrij tekstveld, verplicht):

\`\`\`
Geef een korte toelichting:
[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]

→ [Versturen]
\`\`\`

Na verzenden:
\- Lesregistratie krijgt status \`niet\_gegeven\`
\- Reden wordt opgeslagen in de database (\`lesregistraties.niet\_gegeven\_reden\`)
\- Admin (Sabine) ontvangt een notificatie: "Les niet gegeven — [naam docent] / [naam klant] / [datum]"
\- De lesregistratie is zichtbaar in het docent-dashboard met status "Niet gegeven" en de opgegeven reden
\- Sabine handelt de situatie handmatig af (buiten het systeem om of via admin-dashboard)

\#\#\#\# Bevestigingslogica

\- Docent klikt "Ja" → status \`voltooid\`
\- Docent reageert niet binnen 24 uur → systeem zet status automatisch op \`voltooid\` + \`auto\_bevestigd = true\`
\- Alleen de admin (Sabine) kan een bevestiging terugdraaien via het admin-dashboard

\---

#### E-mail bij verzending uitbetalingsspecificatie — KOR-docent

Voor Docenten met btw-status KOR bevat de begeleidende e-mail bij de uitbetalingsspecificatie,
naast de standaardtekst, de volgende toegevoegde regel:

"Let op: nadert je omzet de KOR-grens? Meld dit dan direct via je dashboard
of aan admin@privateyogaathome.nl."

Deze regel staat niet op de factuur/PDF zelf — die blijft kort en feitelijk (zie
btw-regel in Uitbetalingsspecificatie hierboven). De herinnering is een aanvulling
op de meldplicht uit Platformovereenkomst Art. 5.6 / AV Docenten Art. 3.8.

\---

\#\#\# Uitbetaling docent — self-billing

PYAH genereert automatisch een \*\*uitbetalingsspecificatie\*\* per docent per uitbetalingsperiode.
Dit document telt als factuur (self-billing). De docent hoeft zelf niets te sturen.
Self-billing is vastgelegd als akkoordpunt bij profielaanmaak (zie sectie Docentprofiel).

\#\#\#\# Uitbetalingsmoment

\- Rond de \*\*1e van de maand\*\* (lessen uit tweede helft vorige maand)
\- Rond de \*\*15e van de maand\*\* (lessen uit eerste helft lopende maand)

\#\#\#\# Berekening per uitbetaling

\`\`\`ts
const commissie\_cent    = Math.round(lesprijs\_cent \* (niveau === 'ervaren' ? 0.20 : 0.10))
const uitbetaling\_cent  = lesprijs\_cent - commissie\_cent + reiskosten\_cent
// Reiskosten worden altijd 100% uitbetaald — vallen buiten commissie
\`\`\`

\#\#\#\# Uitbetalingsspecificatie (PDF inhoud)

\`\`\`
UITBETALINGSSPECIFICATIE

Private Yoga at Home (PYAH) — ten behoeve van [naam docent]
Periode: [bijv. 1–15 mei 2026]
Uitbetalingsdatum: [datum]

Datum        Klant         Lestype           Pers.  Lesprijs   Commissie   Reiskosten  Uitbetaling
──────────────────────────────────────────────────────────────────────────────────────────────────
01-05-2026   [naam]        Losse les 75 min.  1      € 120,00   -€ 24,00    € 5,00      € 101,00
...

                                                        Totaal deze periode:             € xxx,xx

Overgemaakt naar IBAN: [IBAN docent]
\`\`\`

\- Docent ontvangt de specificatie per e-mail op de uitbetalingsdatum
\- Downloadbaar als PDF in docent-dashboard → "Uitbetalingen"
\- Dit document dient als administratief bewijs voor de docent (boekhouding)

\---

\#\#\# Docentprofiel — aanmaken, opslaan en indienen

\#\#\#\# Welkomstmail na kennismakingsgesprek

Na goedkeuring door Sabine ontvangt de docent een welkomstmail met:
\- Een \*\*persoonlijke registratielink\*\* (unieke token, 7 dagen geldig)
\- Bijlagen: Platformovereenkomst (PDF), Kwaliteits- en veiligheidsrichtlijnen (PDF), AV Docenten (PDF)
\- Uitleg over de vervolgstappen

De docent wordt gevraagd deze documenten door te lezen vóór het aanmaken van het profiel.

\#\#\#\# Profielstatussen

| Status | Betekenis | Notificatie aan Sabine |
|---|---|---|
| \`concept\` | Docent is bezig, tussentijds opgeslagen | Nee |
| \`ingediend\` | Klaar voor beoordeling | Ja |
| \`actief\` | Goedgekeurd en live | Ja |
| \`teruggestuurd\` | Sabine heeft het profiel teruggestuurd | — (Sabine mailt zelf) |

\#\#\#\# Tussentijds opslaan

\- Knop: \*\*"Opslaan als concept"\*\* — altijd zichtbaar tijdens het aanmaakproces
\- Status blijft \`concept\`; Sabine ontvangt geen notificatie
\- Docent kan later opnieuw inloggen en verder werken

\#\#\#\# Profielaanpassingen na goedkeuring

Een goedgekeurd profiel (\`actief\`) mag de docent \*\*vrij aanpassen\*\* zonder hergoedkeuring.

\- Bij elke opgeslagen wijziging ontvangt Sabine een notificatie: "Profiel bijgewerkt — [naam docent]"
\- Sabine kan het profiel altijd inzien en indien nodig contact opnemen met de docent
\- Er is geen automatische hergoedkeuring vereist

\#\#\#\# Indienen ter goedkeuring

Als het profiel klaar is, klikt de docent op \*\*"Profiel indienen ter goedkeuring"\*\*.

Een overzichtspagina toont de akkoord-punten. Het profiel kan pas worden ingediend als alle vinkjes zijn aangevinkt, de BTW-status is gekozen en de handtekening is ingevuld.

\#\#\#\# Akkoord-punten bij indiening

\`\`\`
☐  Ik heb de Platformovereenkomst gelezen en ga hiermee akkoord.
     → [Platformovereenkomst downloaden (PDF)]

☐  Ik heb de Kwaliteits- en veiligheidsrichtlijnen gelezen en ga hiermee akkoord.
     → [Richtlijnen downloaden (PDF)]

☐  Ik heb de Algemene Voorwaarden Docenten gelezen en ga hiermee akkoord.
     → [AV Docenten downloaden (PDF)]

☐  Ik geef Private Yoga at Home toestemming om uitbetalingsspecificaties op mijn naam
     op te stellen. Ik hoef zelf geen factuur te sturen voor mijn uitbetalingen (self-billing).

BTW-status (verplichte keuze):
  ○  Ik ben BTW-plichtig  |  BTW-nummer: [invulveld — verplicht bij deze keuze]
  ○  Ik val onder de KOR-regeling (geen BTW)

Digitale handtekening:
  "Door mijn naam in te vullen bevestig ik dat ik bovenstaande akkoordpunten heb
   gelezen en hiermee instem."

  Naam: [\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]   Datum: [automatisch ingevuld]
\`\`\`

Na indiening:
\- Status wordt \`ingediend\`
\- Sabine ontvangt notificatie: "Nieuw profiel klaar voor beoordeling — [naam docent]"
\- Akkoorddata (tijdstip, naam, IP-adres) worden opgeslagen in de database

\#\#\#\# Terugsturen

\- Status wordt \`teruggestuurd\`
\- Docent ontvangt automatische e-mail: "Je profiel is teruggestuurd. Je ontvangt binnenkort een bericht van Sabine met uitleg."
\- Sabine stuurt zelf een e-mail met toelichting (buiten het systeem om)
\- Docent past profiel aan en dient opnieuw in

\---

\#\#\# Klantaccount — optioneel

Het aanmaken van een account is \*\*niet verplicht\*\*. Betaling, facturatie en lesbevestiging werken volledig op basis van e-mailadres.

| Functie | Zonder account | Met account |
|---|---|---|
| Factuur ontvangen (e-mail) | ✓ | ✓ |
| Betalen via Mollie | ✓ | ✓ |
| Review schrijven (via e-maillink) | ✓ | ✓ |
| Tegoed-herinnering ontvangen (e-mail) | ✓ | ✓ |
| Aankomende lessen zien | — | ✓ |
| Lesgeschiedenis | — | ✓ |
| Pakketstatus ("2 van 4 lessen gebruikt") | — | ✓ |
| Tegoed inzien | — | ✓ |
| Facturen downloaden (PDF) | — | ✓ |
| Facturatieoverzicht | — | ✓ |

\#\#\#\# Klantaccount — velden bij registratie

\- Voornaam + achternaam
\- E-mailadres
\- Wachtwoord
\- Optioneel: bedrijfsnaam + KvK-nummer (voor B2B-facturen)

\#\#\#\# Klantdashboard — navigatie

\`\`\`
Mijn lessen     — aankomende lessen + geschiedenis
Mijn pakket     — resterende lessen (alleen zichtbaar bij actief pakket)
Mijn tegoed     — openstaand tegoed + vervaldatum (alleen zichtbaar indien actief tegoed)
Facturen        — overzicht + downloadbare PDF's
Reviews         — schrijven en bekijken
\`\`\`

Geen berichtenbox. Klanten communiceren via eigen e-mail of WhatsApp.

\#\#\#\# Reviews zonder account

Na elke bevestigde les ontvangt de klant een automatische e-mail met een \*\*magic link\*\* (14 dagen geldig):

\`\`\`
Onderwerp: Hoe was je les met [naam docent]? — Private Yoga at Home

Hoi [naam klant],

Fijn dat je een les hebt gehad met [naam docent].
We zijn benieuwd hoe het was.

→ [Knop: Schrijf een review]  (magic link, 14 dagen geldig)

Dank je wel,
Team Private Yoga at Home
\`\`\`

\---

\#\#\# Admin impersonatie — inloggen als docent

Admin-dashboard → Docenten → [docent selecteren] → "Inloggen als deze docent"

\#\#\#\# Wat de admin kan als docent

\- Volledige docentweergave zien (profiel, agenda, aanvragen, facturen)
\- Factuur aanmaken en versturen namens de docent
\- Lesregistratie bekijken en controleren
\- Factuur doorsturen als deze klaar staat maar nog niet verstuurd is

\#\#\#\# Vereisten

\- Alle acties worden gelogd in \`admin\_acties\`
\- Zichtbare balk in de interface: \*\*"Je bekijkt het account van [naam docent] — Terug naar admin"\*\*
\- Impersonatie via tijdelijk sessietoken (30 minuten, daarna automatisch verlopen)

\---

\#\#\# Database-uitbreidingen

\`\`\`sql
-- Facturen
CREATE TABLE facturen (
  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),
  factuurnummer TEXT UNIQUE NOT NULL,
  docent\_id UUID REFERENCES docenten(id),
  lesregistratie\_id UUID REFERENCES lesregistraties(id),
  pakket\_id UUID REFERENCES lessenpakketten(id),
  klant\_naam TEXT NOT NULL,
  klant\_email TEXT NOT NULL,
  klant\_bedrijfsnaam TEXT,
  klant\_kvk TEXT,
  lesprijs\_cent INTEGER NOT NULL,
  toeslag\_cent INTEGER DEFAULT 0,        -- 25% per extra persoon
  aantal\_personen INTEGER DEFAULT 1,
  reiskosten\_cent INTEGER DEFAULT 0,
  reisafstand\_km INTEGER DEFAULT 0,
  btw\_cent INTEGER NOT NULL,
  totaal\_cent INTEGER NOT NULL,
  directe\_betaling BOOLEAN DEFAULT false,
  betalingstermijn\_dagen INTEGER DEFAULT 7,
  mollie\_payment\_id TEXT,
  betaald BOOLEAN DEFAULT false,
  betaald\_op TIMESTAMPTZ,
  verstuurd\_op TIMESTAMPTZ,
  pdf\_url TEXT,
  herinnering\_1\_verstuurd BOOLEAN DEFAULT false,
  herinnering\_2\_verstuurd BOOLEAN DEFAULT false,
  created\_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessenpakketten
CREATE TABLE lessenpakketten (
  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),
  klant\_email TEXT NOT NULL,
  klant\_naam TEXT NOT NULL,
  docent\_id UUID REFERENCES docenten(id),
  aantal\_lessen INTEGER DEFAULT 4,
  lessen\_gebruikt INTEGER DEFAULT 0,
  datum\_eerste\_les DATE,                              -- geldigheid berekend vanaf hier
  geldig\_tot TIMESTAMPTZ,                             -- datum\_eerste\_les + 42 dagen; alleen admin kan aanpassen
  factuur\_id UUID REFERENCES facturen(id),
  actief BOOLEAN DEFAULT true,
  created\_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tegoeden (losse les geannuleerd buiten 24h)
CREATE TABLE tegoeden (
  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),
  klant\_email TEXT NOT NULL,
  klant\_naam TEXT NOT NULL,
  docent\_id UUID REFERENCES docenten(id),
  lesregistratie\_id UUID REFERENCES lesregistraties(id),
  bedrag\_cent INTEGER NOT NULL,
  geldig\_tot TIMESTAMPTZ NOT NULL,                    -- annulering\_datum + 28 dagen
  gebruikt BOOLEAN DEFAULT false,
  gebruikt\_op TIMESTAMPTZ,
  herinnering\_verstuurd BOOLEAN DEFAULT false,        -- dag 21 herinnering
  vervallen BOOLEAN DEFAULT false,
  created\_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin actie log
CREATE TABLE admin\_acties (
  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),
  admin\_id UUID REFERENCES auth.users(id),
  docent\_id UUID REFERENCES docenten(id),
  actie TEXT NOT NULL,
  context JSONB,
  tijdstip TIMESTAMPTZ DEFAULT NOW()
);

-- Factuurnummer sequence
CREATE SEQUENCE factuur\_nummer\_seq START 1;
CREATE OR REPLACE FUNCTION genereer\_factuurnummer()
RETURNS TEXT AS $$
  SELECT 'PYAH-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' || LPAD(nextval('factuur\_nummer\_seq')::TEXT, 4, '0');
$$ LANGUAGE SQL;
\`\`\`

\#\#\#\# Aanpassingen bestaande tabellen

\`\`\`sql
-- lesregistraties
ALTER TABLE lesregistraties
  ADD COLUMN pakket\_id UUID REFERENCES lessenpakketten(id),
  ADD COLUMN aantal\_personen INTEGER DEFAULT 1,
  ADD COLUMN bevestigd\_door\_docent BOOLEAN DEFAULT false,
  ADD COLUMN bevestigd\_op TIMESTAMPTZ,
  ADD COLUMN auto\_bevestigd BOOLEAN DEFAULT false,
  ADD COLUMN annulering\_binnen\_24u BOOLEAN DEFAULT false,
  ADD COLUMN niet\_gegeven\_reden TEXT;

-- docenten
ALTER TABLE docenten
  ADD COLUMN profiel\_status TEXT
    CHECK (profiel\_status IN ('concept', 'ingediend', 'actief', 'teruggestuurd'))
    DEFAULT 'concept',
  ADD COLUMN akkoord\_platformovereenkomst BOOLEAN DEFAULT false,
  ADD COLUMN akkoord\_richtlijnen BOOLEAN DEFAULT false,
  ADD COLUMN akkoord\_av\_docenten BOOLEAN DEFAULT false,
  ADD COLUMN akkoord\_selfbilling BOOLEAN DEFAULT false,
  ADD COLUMN akkoord\_naam TEXT,
  ADD COLUMN akkoord\_tijdstip TIMESTAMPTZ,
  ADD COLUMN akkoord\_ip TEXT,
  ADD COLUMN btw\_status TEXT CHECK (btw\_status IN ('btw\_plichtig', 'kor')),
  ADD COLUMN btw\_nummer TEXT,
  ADD COLUMN ingediend\_op TIMESTAMPTZ;
\`\`\`

\---

## KOR-monitoring — btw-status Docenten

Alleen relevant voor Docenten met btw-status "KOR" (niet voor btw-plichtige Docenten).

### Maandelijkse pop-up bij inloggen

- Trigger: eerste keer inloggen na de 1e van de maand, zolang nog geen bevestiging is
  gegeven voor de lopende maand.
- **Alleen actief indien de Docent in de voorafgaande kalendermaand minimaal 1
  bevestigde les had** (d.w.z. er is een uitbetalingsspecificatie opgesteld). Geen
  lessen die maand → geen pop-up, geen reminder-mail.
- Hervat automatisch: zodra de eerstvolgende les wordt bevestigd, wordt de eerstvolgende
  maandcyclus weer normaal geactiveerd — geen handmatige herstart nodig.
- Toont: cumulatieve omzet via PYAH dit kalenderjaar tot nu toe.
- Keuzes (single-select):
  1. Ik val nog onder de KOR-regeling
  2. Ik ben niet langer vrijgesteld (btw-plichtig geworden)
  3. Ik nader mijn omzetgrens (KOR + overig werk samen)
- Kleine toelichting onderaan de pop-up: "Werk je ook buiten PYAH als zelfstandig
  ondernemer? Dan telt die omzet mee voor je KOR-grens. Je bent zelf verantwoordelijk
  voor het bewaken van je totale omzet."
- Vastlegging: keuze + tijdstip wordt opgeslagen per Docent per maand (bewijsstuk voor
  btw-statuscontrole).

### Reminder-mail (vangnet)

- Trigger: geen bevestiging ontvangen binnen 5 werkdagen na de 1e van de maand — alleen
  van toepassing als de pop-up die maand actief was (zie hierboven).
- Actie: automatische e-mail naar de Docent met dezelfde vraag als de pop-up.
- Reageert de Docent ook na deze reminder niet vóór de eerstvolgende uitbetalingsdatum,
  dan schort PYAH de eerstvolgende uitbetaling op conform Platformovereenkomst Art. 6.7
  lid g / Art. 5.5.

### Maandoverzicht naar Sabine

- Verzending: rond de 10e van de maand.
- Inhoud: 5 categorieën met docentnamen + aantal per categorie:
  1. Valt nog onder de KOR
  2. Niet langer vrijgesteld
  3. Nadert omzetgrens
  4. Geen reactie ontvangen (ook niet na reminder)
  5. Geen check deze maand (geen lessen, dus overgeslagen)

### Openstaand bouwpunt

Platformovereenkomst Art. 6.7 bevat een sub-lid (opschortingsrecht bij niet-bevestigen van btw-status) dat oorspronkelijk was geformuleerd rond het inmiddels vervallen drempel-systeem. Tekst moet nog worden aangepast zodat deze verwijst naar het maandelijkse mechanisme in plaats van naar "een naderende KOR-omzetgrens". Zie ook het losse punt hierover in de juridisch-adviseur-actielijst.

\---

\#\#\# Cron jobs (Supabase Edge Functions)

| Functie | Frequentie | Wat het doet |
|---|---|---|
| \`check\_lesbevestiging\` | Elk uur | Zet lesregistraties ouder dan 24h na lesdatum automatisch op \`voltooid\` als docent niet heeft bevestigd |
| \`check\_betalingsherinnering\` | Elke dag 9:00 | Stuurt herinnering op dag 8 en dag 14 na factuurdatum als niet betaald |
| \`check\_pakket\_vervaldatum\` | Elke dag 6:00 | Zet pakketten met verlopen \`geldig\_tot\` op \`actief = false\` |
| \`check\_tegoed\_herinnering\` | Elke dag 9:00 | Stuurt herinnering aan klant op dag 21 als tegoed nog niet gebruikt is |
| \`check\_tegoed\_vervaldatum\` | Elke dag 6:00 | Zet tegoeden met verlopen \`geldig\_tot\` op \`vervallen = true\` |
| \`bereken\_uitbetaling\` | 1e en 15e maand | Genereert uitbetalingsspecificaties voor alle docenten met bevestigde lessen in de periode |

\---

\#\#\# Toekomstige uitbreiding — Ervaren docenten

In een latere fase kunnen Ervaren docenten zelf facturen aanmaken voor workshops, trainingen en trajecten buiten de vaste tariefstructuur. De \`facturen\`-tabel ondersteunt dit al. Voeg bij uitbreiding een veld \`type\` toe aan facturen: \`'les' | 'workshop' | 'traject'\`.

Voor de pilotfase is deze functionaliteit \*\*niet actief\*\*.

\#\#\# Toekomstige uitbreiding — Community: delen van workshops/trainingen

"Delen van eigen workshops & trainingen binnen de docenten-community" is voor de pilotfase geparkeerd, zelfde reden als het 4-lessenpakket — nog niet actief. Verwijderd uit de Abonnementen-pagina (vergelijkingstabel + toelichting). Toe te voegen zodra de community-functionaliteit actief wordt.

\---


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

\*\*Fase 3 — Lesregistraties & betalingen\*\*  
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

\#\#\# Docentgrid kolomverdeling (\`/docenten\`)  
CSS-klasse: \`.kaartjes-grid-v2\` in \`layout.css\`

| Breakpoint | Kolommen |
| :--------- | :------- |
| Mobiel (< 768px) | 2 |
| Tablet (≥ 768px) | 3 |
| Desktop (≥ 1024px) | 4 |

\---
## Pagina-layout — patroon

Pagina's volgen een vast opbouwpatroon van sectietypes. Dit patroon geldt als leidraad voor nieuwe pagina's, tenzij Sabine expliciet iets anders aangeeft voor een specifieke sectie.

### Sectietype 1 — Gecentreerd, 1-koloms
Gebruikt voor de hero/intro (altijd sectie 1 van een pagina) en voor secties die zich niet lenen voor 2 kolommen (lange lijsten, tabellen, FAQ).

### Sectietype 2 — 2-koloms, wisselend
Vanaf sectie 2: waar de inhoud zich leent voor 2 kolommen (bijv. foto + tekst), wissel de kant per sectie:
- Eerste 2-koloms sectie: foto rechts, tekst links
- Volgende 2-koloms sectie: foto links, tekst rechts
- Enzovoort, per sectie wisselend

Bij twijfel of een sectie zich leent voor 2 kolommen: volg het patroon van eerder gebouwde pagina's (bijv. Homepage). Vraag alleen als het echt niet duidelijk is.

### Sectietype 2b — Tekst/tekst naast elkaar (vergelijking)
Gebruikt wanneer twee korte tekstblokken direct met elkaar vergeleken moeten worden binnen één sectie — bijvoorbeeld Startend versus Ervaren. Dit verschilt van sectietype 2, waar het gaat om foto/tekst die per sectie van kant wisselt: bij 2b staan twee tekstblokken naast elkaar binnen dezelfde sectie, niet wisselend over meerdere secties.

Op mobiel worden de kolommen gestapeld (eerste kolom boven, tweede kolom onder).

Referentie: Abonnementen-pagina (`/voor-docenten/abonnement`), sectie 2 (Startend/Ervaren-intro).

### Sectietype 3 — Gekleurd blok, gecentreerd
Gebruikt voor uitgelichte tussenstukken of CTA-secties (zie referentie `/voor-docenten`). Tekst altijd gecentreerd, volledige achtergrondkleur op sectieniveau.

Kleur wordt per sectie **expliciet door Sabine aangegeven** — CC kiest deze niet zelf. Toegestane combinaties:

| Achtergrondkleur | Tekstkleur |
|---|---|
| `#d4baad` (zacht) | zwart (`#260f09`) |
| `#484f47` (donker) | wit |
| `#a66658` (accent) | wit |
| `#260f09` (diep) | wit |

Dit sectietype telt niet mee in de links/rechts-wisseling van sectietype 2 — het is een onderbreking van dat patroon, geen onderdeel ervan.

Knoppen binnen dit sectietype volgen de bestaande knoppenlogica (`btn-dark-a` / `btn-dark-b` / `btn-light`) op basis van de achtergrondkleur van het blok — geen aparte knopstijl.

### Bij twijfel
Als niet duidelijk is welk sectietype of welke kleur van toepassing is: altijd eerst aan Sabine vragen, nooit zelf invullen (conform de algemene regel "bronbestanden zijn leidend").

Opsommingen binnen gecentreerde secties (sectietype 1): gebruik geen bullets — bullets zijn altijd links uitgelijnd, ook binnen gecentreerde tekst, wat een rommelig effect geeft. Gebruik in plaats daarvan losse, gecentreerde regels zonder opsommingsteken.

### Tabellen met veel rijen — striping & hover
Voor tabellen met meerdere rijen (zoals de abonnement-vergelijkingstabel) geen horizontale lijntjes tussen rijen gebruiken. In plaats daarvan wisselen de rijen doorlopend (rij voor rij, niet per categorie herstart) tussen twee vaste kleuren, **ongeacht de achtergrondkleur van de sectie eromheen**:
- Rij-type A: `rgba(255, 255, 255, 0.5)` (wit, 50% dekking)
- Rij-type B: `#ebe3e0`

Deze combinatie werkt op zowel een witte sectie-achtergrond (`section-white`) als een pearl-achtergrond (`section-pearl`, ook `#ebe3e0`): op een pearl-sectie versmelt rij B met de achtergrond en steekt rij A (wit) af; op een witte sectie versmelt rij A met de achtergrond en steekt rij B (`#ebe3e0`) af. In beide gevallen blijft het afwisselende patroon zichtbaar, zonder dat er onderscheid gemaakt hoeft te worden per sectie-achtergrond. Gebruik deze vaste combinatie dus altijd, niet `#ebe3e0` op 100%/60% dekking (dat werkt alleen op een witte achtergrond en is onzichtbaar op pearl).

Let op: dit werkt niet op een donkere sectie-achtergrond (`#484f47` of `#260f09`) — kom je die situatie tegen, vraag dan eerst aan Sabine.

Categoriekoppen krijgen een eigen onderscheidende stijl (vetgedrukt) en tellen niet mee in de rij-telling voor de striping.

Bij hover over een rij: achtergrond wordt `#d4baad` met een zachte `transition-colors`.

Referentie: Abonnementen-pagina, sectie 3 (vergelijkingstabel).

#### Tabellen op een witte sectie-achtergrond — uitzondering (vastgesteld 19-08-2026)

Op `/voor-docenten/tarieven`, sectie 2 (Lestarieven), staat de tabel op een witte sectie-achtergrond. De standaard striping-combinatie (`rgba(255,255,255,0.5)` + `#ebe3e0`) oogt hier te vlak — wit-op-wit geeft nauwelijks contrast. Voor déze tabel geldt daarom een sterkere, aangepaste tint i.p.v. de standaardcombinatie:
- Koprij: `#ebe3e0`
- Rij "Introductieles" en "Losse les 75 min.": `#f5f1f0`
- Rij "Losse les 60 min.": `#ebe3e0`

Dit is een bewuste uitzondering voor déze tabel, geen nieuwe algemene regel. Bij een vergelijkbare situatie elders (korte tabel op witte achtergrond): eerst aan Sabine vragen of dezelfde aanpak van toepassing is.

### Sectie-overgangen — vaste standaard (v1.18, uitgebreid v1.24)
Elke sectie-overgang op elke pagina — tussen twee secties, na de hero, én naar de footer — gebruikt dezelfde vaste, symmetrische marge: **160px (<640px) / 200px (≥640px)**, opgebouwd uit twee gelijke helften van 80px/100px (padding-bottom van de bovenste sectie = padding-top van de onderste sectie). Dit komt uit `.page-section` en `.page-section-hero` in `layout.css`, die beide standaard 80px/80px (<640px) en 100px/100px (≥640px) padding hebben — top én bottom altijd gelijk, dus symmetrisch van zichzelf.

Drie bewuste uitzonderingen op deze standaard:

- Quote-balk op `/hoe-werkt-het` (`.image-placeholder-liggend-quote`, vastgesteld 07-08-2026, zie v1.19): een dunne decoratieve foto-balk met citaat voelde bij de volle standaard te ruim aan. Deze heeft zelf geen marge — de ruimte errond komt uitsluitend van de omliggende secties (dus 80px/100px in plaats van 160px/200px).
- "Tussenblok" op `/voor-docenten/hoe-werkt-het` (`.page-section-top`, vastgesteld 07-08-2026, zie v1.19): intentionele same-color-continuering zonder eigen bottom-padding — geen echte kleurgrens, dus geen volledige overgang nodig.
- **Reeksen van opeenvolgende secties met dezelfde achtergrondkleur** (vastgesteld 18-08-2026, zie v1.24): wanneer meerdere secties met dezelfde achtergrondkleur direct op elkaar volgen (bijv. een reeks `section-white`-secties zonder echte kleurgrens ertussen), gebruikt elke sectie in die reeks `.page-section-top` in plaats van `.page-section`. Alleen de allerlaatste sectie van de reeks — vlak vóór een echte kleurwissel of vóór de footer — behoudt de volledige `.page-section` (nodig voor de correcte 160px/200px-afsluiting daar). Zo halveert de tussenruimte tussen gelijk-gekleurde secties naar 80px/100px, terwijl de hero-overgang en de footer-marge de volle 160px/200px behouden. Ontdekt doordat de volle 160px/200px tussen twee opeenvolgende witte secties op `/voor-docenten/over` als te ruim werd ervaren; het patroon bleek al toegepast op de klantpagina `/over` maar stond nog niet gedocumenteerd. Doorgevoerd op `/voor-docenten/over` conform het bestaande `/over`-patroon.

### Footer-marge
De footer-marge volgt automatisch uit diezelfde standaard, zonder aparte compensatie-klasse: `Footer.tsx` en `DocentFooter.tsx` hebben zelf een padding-top van 80px/100px (i.p.v. de vroegere vaste 48px `py-12`), exact gelijk aan de padding-bottom van een standaard `.page-section`. De eerder gebruikte `.footer-margin`-klasse is hierdoor overbodig geworden en verwijderd.

Twee pagina's hebben een eigen losse waarde omdat hun laatste blok niet het standaard `.page-section`-patroon volgt:
- `/docenten` (zoekpagina): laatste blok is `.zoek-resultaten-wrapper`, padding-bottom rechtstreeks op 80px/100px gezet.
- `/` (live coming-soon pagina): eigen footer los van `Footer.tsx`/`DocentFooter.tsx` — `.footer` in `coming-soon.module.css` heeft nu zelf ook 80px/100px padding-top, en `.aanmeldenSection` staat op 80px/100px padding-bottom.

Referentie: doorgevoerd op alle bestaande klant- en docentzijde-pagina's, augustus 2026.

\---
\#\# Notities voor de pilotfase

\- Start met \*\*statische testdata\*\* voor 2–3 docentprofielen zodat het platform er meteen vol uitziet  
\- Het aanmeldformulier voor docenten (\`/voor-docenten\`) is prioriteit — dit is hoe Sabine haar eerste docenten werft  
\- Calendly kan tijdelijk de kennismakingsgesprekken afhandelen (embed of link) — geen maatwerk nodig in fase 1  
\- Mobiel-first: veel klanten zullen via hun telefoon zoeken

\---

\*Dit document is de bouwinstructie voor het PYAH platform. Werk fase voor fase. Commit na elke werkende fase naar GitHub.\*  
