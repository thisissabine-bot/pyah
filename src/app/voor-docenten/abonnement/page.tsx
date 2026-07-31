import Link from "next/link";
import { Check } from "lucide-react";

type TabelItem = {
  label: string;
  startend: boolean;
  ervaren: boolean;
};

type TabelCategorie = {
  titel: string;
  items: TabelItem[];
};

const TABEL: TabelCategorie[] = [
  {
    titel: "Profiel & professionaliteit",
    items: [
      { label: "Professionele profielpagina op Private Yoga at Home", startend: true, ervaren: true },
      { label: "Specialisaties zichtbaar op je profiel", startend: true, ervaren: true },
      { label: "Deel uitmaken van een zorgvuldig samengesteld kwaliteitsnetwerk", startend: true, ervaren: true },
      { label: "Positionering als Private Yoga Teacher binnen PYAH", startend: true, ervaren: true },
    ],
  },
  {
    titel: "Marketing & groei van het platform",
    items: [
      { label: "PYAH investeert actief in online zichtbaarheid en campagnes", startend: true, ervaren: true },
      { label: "Structurele marketing om nieuwe klanten naar het platform te brengen", startend: true, ervaren: true },
    ],
  },
  {
    titel: "Zichtbaarheid & vindbaarheid",
    items: [
      { label: "Vindbaar voor klanten die zoeken naar privé yoga aan huis", startend: true, ervaren: true },
      { label: "Ontvangst van aanvragen rechtstreeks in je inbox", startend: true, ervaren: true },
      { label: "Kans op uitgelicht worden via website / socials", startend: false, ervaren: true },
      { label: "Bloggen voor extra zichtbaarheid & vindbaarheid (SEO)", startend: false, ervaren: true },
      { label: "Content gekoppeld aan profiel", startend: false, ervaren: true },
      { label: "Mogelijkheid om trainingen, workshops te delen op het platform", startend: false, ervaren: true },
      { label: "Je profiel verschijnt hoger in de zoekresultaten op het platform", startend: false, ervaren: true },
      { label: "Extra zichtbaarheid via website, nieuwsbrief of social media", startend: false, ervaren: true },
      { label: "Zichtbaarheid in campagnes waar mogelijk", startend: false, ervaren: true },
      { label: "“Ervaren badge” of visuele markering op profiel", startend: false, ervaren: true },
    ],
  },
  {
    titel: "Community & verbinding",
    items: [
      { label: "Toegang tot besloten Private Yoga Teacher community", startend: true, ervaren: true },
      { label: "Doorverwijzingen en samenwerkingen met andere docenten", startend: true, ervaren: true },
    ],
  },
  {
    titel: "Groei & ondersteuning",
    items: [
      { label: "Deelname aan online Teacher Events (1x per 2–3 maanden)", startend: true, ervaren: true },
      { label: "Toegang tot praktische teacher tools (checklists, richtlijnen, intake)", startend: true, ervaren: true },
      { label: "Inspiratie, kennisdeling en professionele verdieping", startend: true, ervaren: true },
    ],
  },
  {
    titel: "Verdieping (optioneel)",
    items: [
      { label: "Deelname aan live events (tegen ticketprijs)", startend: true, ervaren: true },
      { label: "Mogelijkheid om zichtbaar bij te dragen tijdens (online) events of themabijeenkomsten", startend: false, ervaren: true },
    ],
  },
];

function slugify(titel: string): string {
  return titel
    .toLowerCase()
    .replace(/&/g, "en")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type TabelRij =
  | { type: "categorie"; key: string; titel: string }
  | { type: "item"; key: string; item: TabelItem; rijClass: "abonnement-rij-a" | "abonnement-rij-b" };

const TABEL_RIJEN: TabelRij[] = TABEL.reduce<{ rijen: TabelRij[]; teller: number }>(
  (acc, categorie) => {
    acc.rijen.push({ type: "categorie", key: categorie.titel, titel: categorie.titel });
    for (const item of categorie.items) {
      acc.rijen.push({
        type: "item",
        key: item.label,
        item,
        rijClass: acc.teller % 2 === 0 ? "abonnement-rij-a" : "abonnement-rij-b",
      });
      acc.teller += 1;
    }
    return acc;
  },
  { rijen: [], teller: 0 }
).rijen;

function TabelWaarde({ waarde }: { waarde: boolean }) {
  return waarde
    ? <span className="icon-check"><Check size={16} strokeWidth={3} aria-label="Inbegrepen" /></span>
    : <span className="icon-geen" aria-label="Niet inbegrepen">—</span>;
}

const TOELICHTING = [
  {
    titel: "Profiel & professionaliteit",
    items: [
      {
        naam: "Professionele profielpagina op Private Yoga at Home",
        tekst: "Je krijgt een eigen profielpagina op het platform, die je zelf aanmaakt na goedkeuring door PYAH. Je plaatst hier maximaal 6 foto's en deelt wie je bent, je opleidingen, yogastijlen, specialisaties en je beschikbaarheid. Dit is jouw visitekaartje binnen PYAH.",
      },
      {
        naam: "Specialisaties zichtbaar op je profiel",
        tekst: "Je geeft aan op welke thema's jij gespecialiseerd bent, zoals burn-out, zwangerschap, blessures of ademwerk. Zo ontstaat de best mogelijke match.",
      },
      {
        naam: "Deel uitmaken van een zorgvuldig samengesteld kwaliteitsnetwerk",
        tekst: "PYAH werkt alleen met gecertificeerde yogadocenten die voldoen aan de toelatingsvoorwaarden. Toelating gaat niet automatisch — elke docent doorloopt eerst een kennismaking.",
      },
      {
        naam: "Positionering als Private Yoga Teacher binnen PYAH",
        tekst: "Je positioneert jezelf specifiek als docent voor privélessen aan huis. Dat versterkt je professionaliteit, ook als je daarnaast groepslessen blijft geven.",
      },
    ],
  },
  {
    titel: "Marketing & groei van het platform",
    items: [
      {
        naam: "PYAH investeert actief in online zichtbaarheid en campagnes",
        tekst: "PYAH adverteert actief, onder andere op social media, gericht op het aantrekken van nieuwe klanten. Als docent profiteer je direct van het bereik dat hierdoor ontstaat.",
      },
      {
        naam: "Structurele marketing om nieuwe klanten naar het platform te brengen",
        tekst: "PYAH bouwt continu aan de bekendheid van het platform, zodat er een stabiele stroom van geïnteresseerde klanten ontstaat.",
      },
    ],
  },
  {
    titel: "Zichtbaarheid & vindbaarheid",
    items: [
      {
        naam: "Vindbaar voor klanten die zoeken naar privé yoga aan huis",
        tekst: "Je profiel is zichtbaar voor klanten die op Private Yoga at Home zoeken naar een docent. Zij filteren op locatie, specialisaties en beschikbaarheid.",
      },
      {
        naam: "Ontvangst van aanvragen rechtstreeks in je inbox",
        tekst: "Je ontvangt aanvragen direct in je eigen inbox op het platform. Je bepaalt zelf of en wanneer je reageert — PYAH bemiddelt niet in de communicatie tussen jou en de klant.",
      },
      {
        naam: "Kans op uitgelicht worden via website / socials",
        tekst: "PYAH kan Ervaren docenten uitlichten via de website of social media, bijvoorbeeld bij een bijzonder profiel of thema.",
      },
      {
        naam: "Bloggen voor extra zichtbaarheid & vindbaarheid (SEO)",
        tekst: "Je schrijft blogs die je profiel versterken en bijdragen aan betere vindbaarheid via Google.",
      },
      {
        naam: "Content gekoppeld aan profiel",
        tekst: "Alles wat je deelt — blogs, trainingen, workshops — wordt gekoppeld aan je profiel. Zo zien klanten niet alleen wie je bent, maar ook waar je voor staat.",
      },
      {
        naam: "Mogelijkheid om trainingen, workshops te delen op het platform",
        tekst: "Je deelt trainingen, workshops of verdiepende sessies via het platform, naast je privélessen aan huis.",
      },
      {
        naam: "Je profiel verschijnt hoger in de zoekresultaten op het platform",
        tekst: "Je profiel wordt eerder getoond, wat de kans vergroot dat klanten het als eerste bekijken.",
      },
      {
        naam: "Extra zichtbaarheid via website, nieuwsbrief of social media",
        tekst: "PYAH brengt je profiel of expertise extra onder de aandacht, bewust en selectief.",
      },
      {
        naam: "Zichtbaarheid in campagnes waar mogelijk",
        tekst: "Bij marketingcampagnes van PYAH kan er ruimte zijn om jouw profiel of specialisatie uit te lichten.",
      },
      {
        naam: "“Ervaren badge” of visuele markering op profiel",
        tekst: "Je profiel krijgt een visuele markering die klanten extra vertrouwen geeft bij het kiezen van een docent.",
      },
    ],
  },
  {
    titel: "Community & verbinding",
    items: [
      {
        naam: "Toegang tot besloten Private Yoga Teacher community",
        tekst: "Je krijgt toegang tot een besloten community voor alle docenten van PYAH — het kanaal wordt nog bepaald. Een professionele plek om vragen te stellen, ervaringen te delen en met elkaar in contact te blijven.",
      },
      {
        naam: "Doorverwijzingen en samenwerkingen met andere docenten",
        tekst: "Er kan ruimte ontstaan voor doorverwijzingen en samenwerkingen tussen docenten, altijd in afstemming met PYAH.",
      },
    ],
  },
  {
    titel: "Groei & ondersteuning",
    items: [
      {
        naam: "Deelname aan online Teacher Events (1x per 2–3 maanden)",
        tekst: "PYAH organiseert regelmatig online bijeenkomsten, met ruimte voor ervaringen, vragen en verdieping.",
      },
      {
        naam: "Toegang tot praktische teacher tools (checklists, richtlijnen, intake)",
        tekst: "Je krijgt toegang tot praktische hulpmiddelen zoals voorbeeld-intakes, veiligheidsrichtlijnen en checklists.",
      },
      {
        naam: "Inspiratie, kennisdeling en professionele verdieping",
        tekst: "Binnen PYAH is er ruimte om kennis en ervaring met elkaar te delen, via de community, events of gedeelde materialen.",
      },
    ],
  },
  {
    titel: "Verdieping (optioneel)",
    items: [
      {
        naam: "Deelname aan live events (tegen ticketprijs)",
        tekst: "PYAH organiseert live bijeenkomsten waarin ontmoeting en verdieping centraal staan, tegen een ticketprijs.",
      },
      {
        naam: "Mogelijkheid om zichtbaar bij te dragen tijdens (online) events of themabijeenkomsten",
        tekst: "Je kunt gevraagd worden — of jezelf aanbieden — om je ervaring te delen tijdens online events of themasessies. Altijd op vrijwillige basis.",
      },
    ],
  },
];

export default function AbonnementPage() {
  return (
    <>
      {/* SECTIE 1 — Hero (sectietype 1: gecentreerd, 1-koloms) */}
      <section className="page-section-hero hero-with-image">
        <div className="hero-placeholder" />
        <div className="container hero-content">
          <p className="heading-overline on-dark mb-text">Voor yogadocenten</p>
          <h1 className="heading-h1 on-dark">
            Startend of Ervaren<br />
            jouw abonnement bij<br />
            Private Yoga at Home
          </h1>
        </div>
      </section>

      {/* SECTIE 2 — Intro (sectietype 2b: Startend/Ervaren naast elkaar) */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Twee niveaus, één heldere structuur</p>
          <h2 className="heading-h2 accent-moss mb-heading">
            Waarom Private Yoga at Home<br />
            werkt met Startend en Ervaren
          </h2>
          <p className="text-body mb-section">
            Binnen Private Yoga at Home werken we met twee niveaus: Startend en Ervaren.<br />
            Deze indeling zorgt voor duidelijkheid voor jou als docent,<br />
            én voor de klant die een passende docent zoekt.
          </p>

          <div className="grid-2col-equal">
            <div className="text-intro">
              <h3 className="heading-h3 mb-text">Startend</h3>
              <p className="text-body">
                Startend geeft je de ruimte om ervaring op te bouwen met privélessen, in een professionele en veilige setting, tegen een lager tarief, een lagere commissie en een lager maandabonnement.
              </p>
            </div>
            <div className="text-intro">
              <h3 className="heading-h3 mb-text">Ervaren</h3>
              <p className="text-body">
                Ervaren past bij docenten die al steviger in hun werk staan. Met dat niveau groeit ook de zichtbaarheid, de mogelijkheden binnen het platform en de commissie.
              </p>
            </div>
          </div>

          <blockquote className="text-quote mt-section mb-section">
            Zo ontstaat een transparant model waarin je kunt instappen,<br />
            groeien en op een natuurlijke manier doorstromen.
          </blockquote>

          <Link className="btn-light" href="/voor-docenten/hoe-werkt-het">
            Bekijk het verschil tussen Startend en Ervaren
          </Link>
        </div>
      </section>

      {/* SECTIE 3 — Vergelijkingstabel (sectietype 1: gecentreerd, 1-koloms) */}
      <section className="page-section section-pearl section-centered">
        <div className="container">
          <p className="heading-overline mb-text">In één oogopslag</p>
          <h2 className="heading-h2 accent-moss mb-heading">Wat krijg je als Startend of Ervaren docent?</h2>

          <div className="abonnement-tabel-wrapper">
            <table className="abonnement-tabel">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="kolom-check">Startend</th>
                  <th scope="col" className="kolom-check">Ervaren</th>
                </tr>
              </thead>
              <tbody>
                {TABEL_RIJEN.map((rij) =>
                  rij.type === "categorie" ? (
                    <tr key={rij.key} className="abonnement-tabel-categorie">
                      <td colSpan={3}>
                        <a href={`#${slugify(rij.titel)}`} className="abonnement-tabel-categorie-link">
                          {rij.titel}
                        </a>
                      </td>
                    </tr>
                  ) : (
                    <tr key={rij.key} className={`abonnement-tabel-rij ${rij.rijClass}`}>
                      <td>{rij.item.label}</td>
                      <td className="kolom-check"><TabelWaarde waarde={rij.item.startend} /></td>
                      <td className="kolom-check"><TabelWaarde waarde={rij.item.ervaren} /></td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <p className="text-body mt-section mb-cta">
            De commissie en het abonnementsbedrag verschillen per niveau. <br />
            Bekijk de tarieven op de pagina Tarieven.
          </p>
          <Link className="btn-light" href="/voor-docenten/tarieven">
            Bekijk de tarieven
          </Link>
        </div>
      </section>

      {/* SECTIE 4 — Toelichting per categorie (sectietype 1: gecentreerd, 1-koloms) */}
      <section className="page-section section-white section-centered">
        <div className="container">
          <p className="heading-overline mb-text">Wat betekent dit voor jou</p>
          <h2 className="heading-h2 accent-moss mb-heading">Toelichting op je abonnement</h2>

          <div className="toelichting-blok">
            {TOELICHTING.map((categorie) => (
              <div key={categorie.titel} id={slugify(categorie.titel)} className="mb-section toelichting-anker">
                <h3 className="heading-h3 mb-heading">{categorie.titel}</h3>
                {categorie.items.map((item) => (
                  <div key={item.naam} className="mb-heading">
                    <h5 className="heading-h5 mb-text">{item.naam}</h5>
                    <p className="text-body">{item.tekst}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIE 5 — CTA-sectie (sectietype 3: gekleurd blok, gecentreerd — achtergrond #484f47, witte tekst) */}
      <section className="page-section section-moss section-centered">
        <div className="container">
          <p className="heading-overline on-dark mb-text">Klaar om aan te sluiten?</p>
          <h2 className="heading-h2 on-dark mb-heading">Meld je aan als privé yogadocent</h2>
          <p className="text-body on-dark mb-cta">
            Ben je benieuwd of Startend of Ervaren bij jou past? <br />
            Meld je aan en we nemen snel contact met je op voor een kennismakingsgesprek.
          </p>
          <div className="btn-row">
            <Link className="btn-dark-a" href="/voor-docenten/aanmelden">Meld je aan</Link>
            <Link className="btn-dark-a" href="/voor-docenten/tarieven">Bekijk de tarieven</Link>
          </div>
        </div>
      </section>
    </>
  );
}
