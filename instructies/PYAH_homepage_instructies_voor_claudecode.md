# Instructies voor Claude Code — Homepage update Private Yoga at Home

## Doel

Vervang de **volledige huidige homepage-content** door de nieuwe tekst hieronder.
Dit is een volledige vervanging — geen samenvoeging. Verwijder ook:
- de docentencarrousel (het blok "Maak kennis met onze docenten")
- het blok "Ben jij yogadocent?"

De site draait op: https://deluxe-torte-769a35.netlify.app

---

## Structuur & opmaak

Gebruik de bestaande CSS-klassen van de site voor secties, koppen en lay-outs.
Elke sectie heeft een aangegeven achtergrondkleur (zie `.section-*` annotaties).
De 3 feature-blokken in de sectie "Zorgvuldig geselecteerde docenten" worden naast elkaar weergegeven in **3 kolommen** (gebruik de bestaande grid/kolommen-klasse van de site).

---

## Nieuwe homepage-content

### HERO — `.section-hero` (bestaande hero-stijl)

**Overline:** Haarlem & omgeving

**H1:** Privé yoga aan huis in Haarlem — afgestemd op jouw lichaam en behoeften

**CTA-knop:** Bekijk de docenten → `/docenten`

---

### SECTIE 1 — `.section-white`

Je agenda is vol. Je hoofd staat zelden stil. En toch voel je dat je lichaam iets anders nodig heeft dan nog een to-do.

Met privé yoga aan huis in Haarlem hoef je nergens heen. Een zorgvuldig geselecteerde yogadocent komt naar jou toe — op jouw tijd, in jouw tempo, afgestemd op wat jij nodig hebt.

Geen groepsles waar je je aan moet aanpassen. Geen reistijd. Gewoon rust, ruimte en echte aandacht — bij jou thuis.

---

### SECTIE 2 — `.section-creme`

**Overline:** In drie stappen

**H2:** Zo werkt het

**Intro:** Van zoeken naar jouw eigen privé yogadocent aan huis, volg je de stappen:

**[3 kolommen]**

**H3:** 1. Kies een docent
Bekijk profielen van gecertificeerde yogadocenten in Haarlem. Filter op yogastijl, specialisme en ervaring. Zo vind je iemand die echt bij jou past.

**H3:** 2. Plan een kennismaking
Begin met een vrijblijvend online kennismakingsgesprek. Je stemt wensen, verwachtingen en planning af en voelt of er een klik is.

**H3:** 3. Eerste les bij jou thuis
Is het een match? Dan plant de docent een introductieles in bij jou thuis, op een moment dat past. Boeken en betalen regel je veilig via het platform.

**[einde 3 kolommen]**

Wil je graag meer informatie hoe het werkt, klik dan op onderstaande knop:

**CTA-knop:** Hoe werkt het? → `/hoe-werkt-het`

---

### SECTIE 3 — `.section-white`

**Overline:** Persoonlijk & afgestemd

**H2:** Waarom privé yoga aan huis?

**Intro:** Groepslessen zijn voor veel mensen een prima start. Maar als je merkt dat de les net niet aansluit op jouw lijf, je tempo of je situatie, dan mis je iets.

Bij een groepsles volg je het ritme van de groep. Bij privé yoga aan huis volgt de docent jóuw ritme.

**H3:** Dat maakt het verschil voor mensen die:

- herstellende zijn van een blessure of burn-out en veilige, rustige begeleiding zoeken
- weinig tijd hebben en yoga in hun drukke leven willen passen, zonder reistijd
- zich niet prettig voelen in een groep, of behoefte hebben aan echt persoonlijke aandacht
- zwanger zijn of net bevallen en yoga willen die helemaal is afgestemd op hun lichaam

**Citaat (uitgelicht, quote-stijl):**
> Yoga werkt het beste als het aansluit bij waar je nu bent. Privé yoga aan huis maakt dat mogelijk.

---

### SECTIE 4 — `.section-pearl`

**H2:** Zorgvuldig geselecteerde docenten

**[3 kolommen]**

**H3:** Zorgvuldig geselecteerde docenten
We werken alleen met docenten die we screenen op opleiding, ervaring en yogastijl. Zo kies je met vertrouwen een startende of ervaren docent die bij je past.

**H3:** Privé yoga, afgestemd op jouw lichaam
Jij bepaalt je doel en tempo. De docent stemt de les af op jouw situatie — van stress en herstel tot sterker en soepeler worden.

**H3:** Alles makkelijk & veilig geregeld
Bekijk profielen, kies je docent, plan je les en betaal veilig online. Alles op één plek.

**[einde 3 kolommen]**

---

### SECTIE 5 — `.section-white`

**H4:** Niet iedere yogadocent is zomaar toegelaten tot het platform

Bij Private Yoga at Home werken we alleen met docenten die voldoen aan heldere kwaliteitseisen:

- Aantoonbare opleiding: minimaal een erkende 200-urige Yoga Teacher Training
- Recente leservaring en een duidelijk specialisme
- Ingeschreven bij de Kamer van Koophandel en verzekerd als zzp'er
- Persoonlijk gescreend — want kwaliteit staat boven schaal

Elke docent heeft een helder profiel met yogastijl, specialisaties en ervaring. Zo kies je met vertrouwen.

---

### SECTIE 6 — `.section-terracotta`

**Overline:** Over de founder

**H2:** Waarom Private Yoga at Home bestaat

**Intro:** Private Yoga at Home is opgericht door Sabine Blok, founder van Private Yoga Amsterdam.

**Citaat:**
> "Na vijf jaar lang mensen thuis begeleiden weet ik hoe groot het verschil is tussen een les in een studio en een les in je eigen vertrouwde omgeving. Mensen ontspannen dieper. Ze durven meer te vragen. En ze gaan echt vooruit, omdat elke les is afgestemd op hún situatie.
>
> Vanuit die ervaring bouw ik Private Yoga at Home: een platform waar iedereen die dat wil, een goede yogadocent aan huis kan vinden — met de kwaliteit, het vertrouwen en het gemak dat daarbij hoort."

*— Sabine Blok, founder Private Yoga at Home*

---

### SECTIE 7 — `.section-dark` (CTA-sectie)

**Overline:** Maak een begin

**H3:** Benieuwd welke docent bij jou past?

Bekijk de profielen van onze yogadocenten in Haarlem en voel of er iemand is die bij jou aansluit. Begin vrijblijvend met een kennismakingsgesprek — en ervaar zelf wat persoonlijke yoga aan huis voor jou kan betekenen.

**CTA-knop primair:** Bekijk de docenten → `/docenten`

**CTA-knop secundair:** Hoe werkt het? → `/hoe-werkt-het`

---

## Aandachtspunten

- Gebruik de **bestaande CSS-klassen** van de site; voeg geen nieuwe stijlen toe tenzij strikt noodzakelijk.
- De `.section-*` klassen zijn richtinggevend — gebruik de dichtstbijzijnde bestaande variant als een klasse niet bestaat.
- De `[3 kolommen]` blokken dienen gerenderd te worden met de bestaande grid-klasse van de site.
- De routes `/docenten` en `/hoe-werkt-het` zijn bestaande pagina's — controleer de exacte slugs in de codebase.
- **Verwijder** de docentencarrousel en het "Ben jij yogadocent?" blok volledig.
