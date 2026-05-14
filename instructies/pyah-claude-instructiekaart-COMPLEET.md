# PYAH — Claude Instructiekaart (Compleet)
# Private Yoga at Home · privateyogaathome.nl
# Gebruik dit document ALTIJD als referentie bij het bouwen of aanpassen van PYAH-pagina's.
# Voeg GEEN inline styles toe. Maak GEEN nieuwe class-namen aan. Wijk NIET af.

---

## INHOUDSOPGAVE

1. [Typografie](#1-typografie)
2. [Knoppen](#2-knoppen)
3. [Sectie-achtergronden](#3-sectie-achtergronden)
4. [Layout & Spacing](#4-layout--spacing)
5. [Navigatie & Header](#5-navigatie--header)
6. [Wat Claude nooit mag doen](#6-wat-claude-nooit-mag-doen)

---

## 1. TYPOGRAFIE

### Toegestane class-namen

| Class            | HTML-tag         | Gebruik                        |
|------------------|------------------|--------------------------------|
| heading-overline | `<p>` of `<span>`| Label boven een kop            |
| heading-h1       | `<h1>`           | Hero-kop / pagina-titel        |
| heading-h2       | `<h2>`           | Sectie-kop / subkop            |
| heading-h3       | `<h3>`           | Tussenkop (Arsenica Variable 600)     |
| heading-h4       | `<h4>`           | Tussenkop / card-titel (Lato)  |
| heading-h5       | `<h5>`           | Kleine tussenkop               |
| text-intro       | `<p>`            | Introductietekst / lead-in     |
| text-body        | `<p>`            | Lopende tekst                  |
| text-small       | `<p>` of `<span>`| Labels, badges, meta           |
| text-quote       | `<blockquote>`   | Citaat                         |

### Op donkere achtergrond

Voeg de extra class `.on-dark` toe aan tekstelementen én knoppen wanneer de sectie van het type **Donker** is (zie §3 voor de volledige regel).

```html
<h1 class="heading-h1 on-dark">Titel op donkere achtergrond</h1>
```

### Voorbeeldoutput

```html
<p class="heading-overline">Jouw categorie</p>
<h1 class="heading-h1">De paginatitel staat hier</h1>
<p class="text-intro">Dit is de introductietekst. Eén of twee zinnen als lead-in.</p>
<p class="text-body">Dit is de lopende tekst. Langer, meer informatief.</p>
<a class="btn-3" href="#">Call to action</a>
```

---

## 2. KNOPPEN

Er bestaat geen `.btn` class. Gebruik altijd een van de drie specifieke knopclasses.

### Toegestane knop class-namen

| Class  | Achtergrond pagina | Knopkleur normaal | Hover   | Active  | Tekstkleur normaal |
|--------|--------------------|-------------------|---------|---------|--------------------|
| .btn-1 | Donker             | #d4baad           | #a66658 | #484f47 | #260f09            |
| .btn-2 | Donker             | #484f47           | #a66658 | #d4baad | #ffffff            |
| .btn-3 | Licht              | #a66658           | #d4baad | #484f47 | #ffffff            |

### Keuzeregel

- Staat de knop op een **donkere** achtergrond (`#260f09`, terracotta, mosgroen, header, footer)? → Gebruik `.btn-1` of `.btn-2` (voorkeur: `.btn-1`) **+ `.on-dark`**
- Staat de knop op een **lichte** achtergrond (wit, parel, crème)? → Gebruik `.btn-3`
- Twijfel je? → Gebruik `.btn-3`

### `.on-dark` op knoppen

Voeg altijd `.on-dark` toe aan een knop wanneer deze in een donkere sectie staat.

```html
<!-- Primaire knop op donkere achtergrond -->
<a class="btn-1 on-dark" href="/voor-docenten">Meer over aansluiten</a>

<!-- Secundaire knop op donkere achtergrond -->
<a class="btn-2 on-dark" href="/docenten">Bekijk profiel</a>

<!-- Primaire CTA op lichte achtergrond -->
<a class="btn-3" href="/docenten">Vind jouw yogadocent</a>
```

### Transition

Altijd: `transition: all 0.2s ease` — staat al in de CSS, niet opnieuw toevoegen.

---

## 3. SECTIE-ACHTERGRONDEN

### `.on-dark` — centrale definitie (geldt voor tekst én knoppen)

Voeg `.on-dark` toe aan **alle** tekstelementen en knoppen wanneer de sectie van het type **Donker** is.

| Sectie-class        | Achtergrondkleur | Hex     | Type   | on-dark nodig? |
|---------------------|------------------|---------|--------|----------------|
| .section-white      | Wit              | #ffffff | Licht  | ❌ Nee          |
| .section-pearl      | Parel            | #ebe3e0 | Licht  | ❌ Nee          |
| .section-creme      | Crème            | #d4baad | Licht  | ❌ Nee          |
| .section-dark       | Donkerbruin      | #260f09 | Donker | ✅ Ja           |
| .section-terracotta | Terracotta       | #a66658 | Donker | ✅ Ja           |
| .section-moss       | Mosgroen         | #484f47 | Donker | ✅ Ja           |
| .site-header        | Donkerbruin      | #260f09 | Donker | ✅ Ja           |
| .site-footer        | Donkerbruin      | #260f09 | Donker | ✅ Ja           |

### Voorbeeldoutput

```html
<!-- Lichte sectie -->
<section class="page-section section-white">
  <div class="container">
    <p class="heading-overline">Jouw categorie</p>
    <h2 class="heading-h2">Sectietitel op wit</h2>
    <p class="text-body">Lopende tekst op lichte achtergrond.</p>
    <a class="btn-3" href="#">Call to action</a>
  </div>
</section>

<!-- Donkere sectie -->
<section class="page-section section-dark">
  <div class="container">
    <p class="heading-overline on-dark">Jouw categorie</p>
    <h2 class="heading-h2 on-dark">Sectietitel op donker</h2>
    <p class="text-body on-dark">Lopende tekst op donkere achtergrond.</p>
    <a class="btn-1 on-dark" href="#">Call to action</a>
  </div>
</section>

<!-- Crème sectie -->
<section class="page-section section-creme">
  <div class="container">
    <h2 class="heading-h2">Sectietitel op crème</h2>
    <p class="text-body">Lopende tekst op crème achtergrond.</p>
    <a class="btn-3" href="#">Call to action</a>
  </div>
</section>

<!-- Hero sectie (altijd eerste sectie op pagina) -->
<section class="page-section-hero section-pearl">
  <div class="container">
    <h1 class="heading-h1">Hero-titel</h1>
    <p class="text-intro">Lead-in tekst.</p>
    <a class="btn-3" href="#">Call to action</a>
  </div>
</section>
```

---

## 4. LAYOUT & SPACING

### Container

Elke pagina gebruikt altijd één container-breedte. Nooit afwijken.

| Class        | Max-breedte | Padding mobiel | Padding desktop |
|--------------|-------------|----------------|-----------------|
| `.container` | 1200px      | 16px           | 24px            |

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 640px) {
  .container {
    padding: 0 24px;
  }
}
```

### Sectie-spacing

`.page-section` regelt uitsluitend de padding boven en onder een sectie.
`.section-white`, `.section-dark` etc. regelen de achtergrondkleur (zie §3).
Gebruik altijd **beide** classes samen op één element.

```html
<section class="page-section section-dark">
```

| Class                | Gebruik                        | Mobiel | Desktop |
|----------------------|--------------------------------|--------|---------|
| `.page-section`      | Alle standaard secties         | 64px   | 80px    |
| `.page-section-hero` | Alleen de eerste hero-sectie   | 80px   | 112px   |
| `.footer-inner`      | Binnenste padding van footer   | 48px   | 48px    |

Regel: gebruik `.page-section` als standaard. Alleen de allereerste sectie op een pagina krijgt `.page-section-hero`.

```css
.page-section {
  padding-top: 64px;
  padding-bottom: 64px;
}

.page-section-hero {
  padding-top: 80px;
  padding-bottom: 80px;
}

.footer-inner {
  padding-top: 48px;
  padding-bottom: 48px;
}

@media (min-width: 640px) {
  .page-section {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  .page-section-hero {
    padding-top: 112px;
    padding-bottom: 112px;
  }
}
```

### Grid-systemen

| Class          | Gebruik                  | Mobiel | Tablet | Desktop | Gap  |
|----------------|--------------------------|--------|--------|---------|------|
| `.grid-3col`   | Features, USP's, footer  | 1      | 2      | 3       | 32px |
| `.grid-cards`  | Docentenkaarten          | 1      | 2      | 4       | 24px |
| `.grid-footer` | Footer kolommen          | 1      | 2      | 3       | 32px |

```css
.grid-3col,
.grid-cards,
.grid-footer {
  display: grid;
  grid-template-columns: 1fr;
}

.grid-3col  { gap: 32px; }
.grid-cards { gap: 24px; }
.grid-footer { gap: 32px; }

@media (min-width: 640px) {
  .grid-3col,
  .grid-footer {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-3col,
  .grid-footer {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Interne spacing tussen elementen

| Class          | Gebruik                    | Waarde |
|----------------|----------------------------|--------|
| `.mb-section`  | H2 → grid eronder          | 48px   |
| `.mb-heading`  | H2 docenten → grid         | 40px   |
| `.mb-subtitle` | H1 hero → subtitel         | 24px   |
| `.mb-cta`      | Subtitel hero → knop       | 32px   |
| `.mb-icon`     | Icoontje → H3 (card)       | 16px   |
| `.mb-text`     | H3 → paragraaf             | 8px    |
| `.mb-meta`     | H3 → locatie (docentkaart) | 4px    |
| `.mb-tags`     | Locatie → stijlen          | 12px   |
| `.mb-action`   | Stijlen → prijs/knop       | 16px   |

```css
.mb-section  { margin-bottom: 48px; }
.mb-heading  { margin-bottom: 40px; }
.mb-subtitle { margin-bottom: 24px; }
.mb-cta      { margin-bottom: 32px; }
.mb-icon     { margin-bottom: 16px; }
.mb-text     { margin-bottom: 8px; }
.mb-meta     { margin-bottom: 4px; }
.mb-tags     { margin-bottom: 12px; }
.mb-action   { margin-bottom: 16px; }
```

### Feature / USP-kaarten

```html
<div class="feature-card">
  <div class="feature-icon">
    <!-- icoon, 24×24px, kleur #a66658, aria-hidden="true" -->
  </div>
  <h3 class="heading-h3">Titel</h3>
  <p class="text-body">Omschrijving.</p>
</div>
```

- Achtergrond: `#ebe3e0`
- Icoontje-wrapper: 48×48px · achtergrond `#ffffff` · `border-radius: 12px`

### Stap-icoontjes (Zo werkt het sectie)

```html
<div class="stap-icon">
  <!-- icoon, 24×24px, kleur #a66658, aria-hidden="true" -->
</div>
```

- Grootte: 56×56px · achtergrond `#ebe3e0` · `border-radius: 16px` · gecentreerd

### Icoontjes

| Gebruik               | Grootte | Kleur        |
|-----------------------|---------|--------------|
| Features / stappen    | 24×24px | #a66658      |
| Kaart-locatie icoon   | 13×13px | #d4baad      |
| Footer-contact iconen | 14×14px | currentColor |

Altijd `aria-hidden="true"` toevoegen aan icoontjes.

### Animaties & transitions

| Element       | Effect                                                |
|---------------|-------------------------------------------------------|
| Knoppen hover | Zie §2 Knoppen — knoppen zijn leidend                 |
| Kaarten hover | `translateY(-4px)` · `transition: all 0.2s ease`     |
| Links hover   | kleur naar `#a66658` · `transition: color 0.2s ease` |

### Checklist voor elke nieuwe pagina

- [ ] Container: altijd `.container` (max 1200px)
- [ ] Elke sectie: `.page-section` + een sectie-kleurclass (bijv. `.section-dark`)
- [ ] Eerste sectie: `.page-section-hero` · alle andere: `.page-section`
- [ ] Grids: `.grid-3col` (gap 32px) of `.grid-cards` (gap 24px, 4 kolommen desktop)
- [ ] Interne spacing: gebruik `.mb-` classes, geen losse margin-waarden
- [ ] Icoontjes: altijd `aria-hidden="true"`
- [ ] Donkere sectie: `.on-dark` op alle tekstelementen én knoppen
- [ ] Geen inline styles
- [ ] Geen nieuwe class-namen

---

## 5. NAVIGATIE & HEADER

### Vaste waarden

| Eigenschap           | Waarde                  |
|----------------------|-------------------------|
| Header achtergrond   | #260f09                 |
| Footer achtergrond   | #260f09                 |
| Lettertype navigatie | Lato (400 en 600)       |
| Navlink kleur normaal| #ffffff                 |
| Navlink hover        | #ffffff + underline     |
| Navlink actief       | #a66658                 |
| Knop "Docent worden" | .btn-1 on-dark          |
| Link "Inloggen"      | .nav-link-secondary     |
| Mobiel menu          | slide-in van rechts     |
| Hamburger kleur      | #ffffff                 |

### Toegestane class-namen navigatie

| Class               | Element                      | Gebruik                                       |
|---------------------|------------------------------|-----------------------------------------------|
| .site-header        | `<header>`                   | Hoofdcontainer van de header                  |
| .nav-container      | `<div>`                      | Binnenste wrapper (max-width + padding)       |
| .nav-logo           | `<a>`                        | Logo-link links in de header                  |
| .nav-menu           | `<nav>` of `<ul>`            | De navigatielinks samen                       |
| .nav-link           | `<a>`                        | Gewone navigatielink (wit, hover = underline) |
| .nav-link-active    | `<a>`                        | Actieve pagina-link (terracotta #a66658)      |
| .nav-link-secondary | `<a>`                        | "Inloggen"-link (wit, iets minder nadruk)     |
| .nav-actions        | `<div>`                      | Wrapper voor Inloggen + Docent worden         |
| .nav-toggle         | `<button>`                   | Hamburger-knop (alleen zichtbaar op mobiel)   |
| .nav-drawer         | `<div>`                      | Slide-in menu op mobiel                       |
| .nav-drawer-open    | toegevoegd aan `.nav-drawer` | Klasse die het menu zichtbaar maakt           |
| .nav-overlay        | `<div>`                      | Donkere overlay achter het open mobiele menu  |

### CSS-referentieblok navigatie

```css
/* ─── HEADER ─────────────────────────────────────────────── */
.site-header {
  background-color: #260f09;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

/* ─── LOGO ───────────────────────────────────────────────── */
.nav-logo {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  flex-shrink: 0;
}

/* ─── NAVIGATIELINKS ─────────────────────────────────────── */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #ffffff;
  text-decoration: none;
  transition: text-decoration 0.2s ease;
}

.nav-link:hover {
  text-decoration: underline;
  color: #ffffff;
}

.nav-link-active {
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #a66658;
  text-decoration: none;
}

.nav-link-active:hover {
  text-decoration: underline;
  color: #a66658;
}

/* ─── RECHTS: INLOGGEN + DOCENT WORDEN ───────────────────── */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.nav-link-secondary {
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #ffffff;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s ease, text-decoration 0.2s ease;
}

.nav-link-secondary:hover {
  opacity: 1;
  text-decoration: underline;
}

/* ─── HAMBURGER (mobiel) ─────────────────────────────────── */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #ffffff;
}

/* ─── MOBIEL MENU (slide-in van rechts) ──────────────────── */
.nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 280px;
  background-color: #260f09;
  display: flex;
  flex-direction: column;
  padding: 80px 32px 40px;
  gap: 24px;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 200;
}

.nav-drawer.nav-drawer-open {
  transform: translateX(0);
}

.nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
}

.nav-overlay.nav-drawer-open {
  display: block;
}

/* ─── RESPONSIVE ─────────────────────────────────────────── */
@media (max-width: 768px) {
  .nav-menu,
  .nav-actions {
    display: none;
  }

  .nav-toggle {
    display: block;
  }

  .nav-drawer .nav-link,
  .nav-drawer .nav-link-active,
  .nav-drawer .nav-link-secondary {
    font-size: 18px;
  }

  .nav-drawer .nav-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 16px;
  }
}
```

### Voorbeeldoutput navigatie

```html
<!-- HEADER -->
<header class="site-header">
  <div class="nav-container">

    <!-- Logo -->
    <a class="nav-logo" href="/">
      <img src="/pyah/logo-verticaal-wit.svg" alt="PYAH" height="60">
    </a>

    <!-- Navigatie (desktop) -->
    <nav>
      <ul class="nav-menu">
        <li><a class="nav-link-active" href="/">Home</a></li>
        <li><a class="nav-link" href="/docenten">Docenten</a></li>
        <li><a class="nav-link" href="/hoe-het-werkt">Hoe het werkt</a></li>
        <li><a class="nav-link" href="/over-ons">Over ons</a></li>
      </ul>
    </nav>

    <!-- Acties rechts -->
    <div class="nav-actions">
      <a class="nav-link-secondary" href="/inloggen">Inloggen</a>
      <a class="btn-1 on-dark" href="/voor-docenten">Docent worden</a>
    </div>

    <!-- Hamburger (mobiel) -->
    <button class="nav-toggle" aria-label="Menu openen">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>
</header>

<!-- MOBIEL MENU -->
<div class="nav-overlay" id="navOverlay"></div>
<div class="nav-drawer" id="navDrawer">
  <a class="nav-link-active" href="/">Home</a>
  <a class="nav-link" href="/docenten">Docenten</a>
  <a class="nav-link" href="/hoe-het-werkt">Hoe het werkt</a>
  <a class="nav-link" href="/over-ons">Over ons</a>
  <div class="nav-actions">
    <a class="nav-link-secondary" href="/inloggen">Inloggen</a>
    <a class="btn-1 on-dark" href="/voor-docenten">Docent worden</a>
  </div>
</div>

<!-- HAMBURGER JAVASCRIPT -->
<script>
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.getElementById('navDrawer');
  const overlay = document.getElementById('navOverlay');

  toggle.addEventListener('click', () => {
    drawer.classList.toggle('nav-drawer-open');
    overlay.classList.toggle('nav-drawer-open');
  });

  overlay.addEventListener('click', () => {
    drawer.classList.remove('nav-drawer-open');
    overlay.classList.remove('nav-drawer-open');
  });
</script>
```

---

## 6. WAT CLAUDE NOOIT MAG DOEN

### Algemeen
- Geen `style="..."` attributen — nergens, nooit
- Geen nieuwe class-namen verzinnen buiten de lijsten in dit document
- Geen andere kleuren kiezen dan de vaste PYAH-kleurwaarden
- Niet afwijken ook al lijkt iets "logischer"

### Typografie
- Geen `font-size`, `color` of `font-family` direct in HTML schrijven
- Nooit `.btn` gebruiken — deze class bestaat niet

### Knoppen
- Geen nieuwe knopstijlen verzinnen zoals `.btn-primary` of `.cta-button`
- Geen hover-kleur zelf kiezen
- Nooit `.on-dark` weglaten op knoppen binnen een donkere sectie
- `.btn-1`/`.btn-2` altijd met `.on-dark` op donkere secties

### Sectie-achtergronden
- Geen `style="background-color: ..."` op secties
- Geen nieuwe achtergrondklassen verzinnen zoals `.bg-brown` of `.dark-section`
- Nooit `.on-dark` weglaten op tekst of knoppen binnen een donkere sectie
- Nooit alleen `.page-section` gebruiken zonder een sectie-kleurclass erbij

### Layout & Spacing
- Geen andere container-breedte gebruiken dan 1200px
- `.page-section` en `.section-[kleur]` nooit door elkaar halen
- Geen losse `margin`-waarden — altijd `.mb-` classes gebruiken

### Navigatie
- Geen `style="..."` attributen in header of navigatie
- Geen nieuwe class-namen verzinnen zoals `.navbar`, `.header-nav`, `.menu-item`
- `.nav-link-active` alleen gebruiken op de pagina waar de bezoeker nu op staat
- `.btn-1` niet vervangen door `.btn-3` of een eigen knopstijl in de header
- Nooit `.on-dark` weglaten op knoppen in de header of footer
