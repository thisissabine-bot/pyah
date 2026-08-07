import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function DocentzoneHoeWerktHetPage() {
  return (
    <>
      {/* SECTIE 1 — Hero (sectietype 1: gecentreerd, 1-koloms) */}
      <section className="page-section-hero hero-with-image">
        <div className="hero-placeholder" />
        <div className="container hero-content">
          <p className="heading-overline on-dark mb-text">Van aanmelding tot livegang</p>
          <h1 className="heading-h1 on-dark mb-subtitle">
            Yogadocent worden<br />
            bij Private Yoga at Home<br />
            zo werkt het
          </h1>
          <p className="text-intro on-dark mb-text">
            Bij Private Yoga at Home geloven we dat goede yogadocenten de ruimte moeten krijgen<br />
            om les te geven op een manier die bij hen past. Daarom zorgen wij voor zichtbaarheid,<br />
            aanvragen en een professioneel platform, zodat jij je kunt richten op waar je goed in bent:<br />
            mensen begeleiden.<br />
          </p>
          <p className="text-intro on-dark mb-text">
            In zes stappen word je yogadocent bij Private Yoga at Home:<br />
            aanmelden, kennismaken, profiel maken en live gaan.
          </p>
          <p className="text-intro on-dark">
            Ook leggen we uit hoe we werken met de twee ervaringsniveaus<br />
            Startend en Ervaren docent, zodat je weet wat je kunt verwachten.
          </p>
        </div>
      </section>

      {/* SECTIE 2 — Zo werkt het (sectietype 1: gecentreerd) */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Stap voor stap</p>
          <h2 className="heading-h2 mb-heading">Zo werkt het</h2>
          <p className="text-body mb-section">
            Van aanmelding tot je eerste klant begeleiden we je stap voor stap door het proces.
          </p>

          <div className="stappen-lijst">
            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 1</p>
              <h3 className="heading-h3 mb-text">Meld je aan</h3>
              <p className="text-body mb-text">
                Vul het aanmeldformulier in en vertel ons welke opleiding(en) je hebt gedaan, welke ervaringen je meebrengt en hoelang je al lesgeeft.
              </p>
              <p className="text-body mb-cta">
                Na je aanmelding ontvang je direct een bevestigingsmail. Daarin leggen we uit hoe het verdere proces verloopt en wanneer je een reactie van ons kunt verwachten.
              </p>
              <Link className="btn-light" href="/voor-docenten/aanmelden">Direct het aanmeldformulier invullen</Link>
            </div>

            <div className="stap-divider" />

            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 2</p>
              <h3 className="heading-h3 mb-text">We bekijken je aanmelding</h3>
              <p className="text-body mb-text">
                We nemen iedere aanmelding persoonlijk door.
              </p>
              <p className="text-body mb-text">
                Daarbij kijken we onder andere naar je opleiding, leservaring, specialisaties en of jouw manier van lesgeven aansluit bij de visie van Private Yoga at Home.
              </p>
              <p className="text-body mb-text">
                Niet iedere docent wordt automatisch toegelaten. We kiezen bewust voor kwaliteit en een goede persoonlijke match.
              </p>
              <p className="text-body">
                Wanneer we voldoende aansluiting zien, nodigen we je uit voor een online kennismakingsgesprek.
              </p>
            </div>

            <div className="stap-divider" />

            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 3</p>
              <h3 className="heading-h3 mb-text">Online kennismaking</h3>
              <p className="text-body mb-text">
                Tijdens een online gesprek maken we graag persoonlijk kennis met je.
              </p>
              <p className="text-body mb-text">We bespreken onder andere:</p>
              <p className="text-body mb-text">- jouw ervaring als docent</p>
              <p className="text-body mb-text">- jouw manier van lesgeven</p>
              <p className="text-body mb-text">- hoe samenwerken via Private Yoga at Home werkt</p>
              <p className="text-body mb-text">- welk ervaringsniveau (Startend of Ervaren docent) je krijgt toegewezen</p>
              <p className="text-body mb-text">- welk abonnement daarbij hoort</p>
              <p className="text-body mb-text">- en natuurlijk is er alle ruimte om vragen te stellen</p>
            </div>

            <div className="stap-divider" />

            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 4</p>
              <h3 className="heading-h3 mb-text">Maak je profiel compleet</h3>
              <p className="text-body mb-text">
                Is er een goede match? Dan ontvang je een mail met de vervolgstappen én een welkomstpakket met de benodigde documenten, zoals de Platformovereenkomst, de Algemene Voorwaarden voor Docenten en de Kwaliteits- en veiligheidsrichtlijnen.
              </p>
              <p className="text-body mb-text">Je maakt vervolgens je profiel aan op het platform en vult dit aan met onder andere:</p>
              <p className="text-body mb-text">- een profielfoto</p>
              <p className="text-body mb-text">- een persoonlijke introductie</p>
              <p className="text-body mb-text">- jouw yogastijl(en)</p>
              <p className="text-body mb-text">- eventuele specialisaties</p>
              <p className="text-body mb-text">- je werkgebied (tijdens de pilotfase is dit Haarlem en omgeving)</p>
              <p className="text-body">
                Zo kunnen toekomstige klanten een goed beeld krijgen van wie jij bent en hoe je lesgeeft.
              </p>
            </div>

            <div className="stap-divider" />

            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 5</p>
              <h3 className="heading-h3 mb-text">Controle &amp; livegang</h3>
              <p className="text-body mb-text">
                Voordat je profiel online komt, controleren we of alles compleet is en aansluit bij de uitstraling van Private Yoga at Home.
              </p>
              <p className="text-body">
                Daarna zetten we je profiel live en ben je zichtbaar voor potentiële klanten die op zoek zijn naar een privé yogadocent.
              </p>
            </div>

            <div className="stap-divider" />

            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 6</p>
              <h3 className="heading-h3 mb-text">Je profiel staat live!</h3>
              <p className="text-body mb-text">
                Zodra je profiel live staat, ben je officieel onderdeel van Private Yoga at Home en kunnen potentiële klanten jouw profiel vinden. Gefeliciteerd!
              </p>
              <p className="text-body mb-text">
                We begrijpen dat er op dat moment nog veel vragen kunnen zijn. Daarom ontvang je een uitgebreid welkomstpakket met alle praktische informatie die je nodig hebt om prettig en professioneel via het platform te werken. Denk aan het plannen van kennismakingsgesprekken, het gebruik van het platform, facturatie, betalingen, waar je profiel aan moet voldoen en andere praktische richtlijnen.
              </p>
              <p className="text-body">
                Zo kun jij je met vertrouwen voorbereiden op je eerste klant en weet je precies wat je kunt verwachten.
              </p>
            </div>
          </div>

          <h3 className="heading-h3 mt-section mb-text">Zie jij jezelf al lesgeven via Private Yoga at Home?</h3>
          <p className="text-body mb-cta">
            We maken graag kennis met je. Vul het aanmeldformulier in en wie weet verwelkomen we je binnenkort als docent op ons platform.
          </p>
          <Link className="btn-light" href="/voor-docenten/aanmelden">Ja, ik vul het aanmeldformulier in</Link>
        </div>
      </section>

      {/* SECTIE 3A — Twee ervaringsniveaus: intro (sectietype 3: gekleurd blok, gecentreerd) */}
      <section id="ervaringsniveaus" className="page-section section-terracotta section-centered">
        <div className="container-narrow">
          <p className="heading-overline on-dark mb-text">Startend of ervaren</p>
          <h2 className="heading-h2 on-dark mb-heading">
            Twee ervaringsniveaus:<br />
            Startend &amp; Ervaren
          </h2>
          <p className="text-body on-dark mb-text">
            Private Yoga at Home werkt met twee ervaringsniveaus: Startend en Ervaren.<br />
          </p>
          <p className="text-body on-dark mb-text">
            Zo kunnen we beter aansluiten bij de ervaring van iedere docent én zorgen we voor een eerlijk systeem<br />
            voor tarieven, commissies en doorgroeimogelijkheden.<br />
          </p>
          <p className="text-body on-dark">
            De twee ervaringsniveaus helpen niet alleen docenten, maar geven ook klanten<br />
            een duidelijk beeld van de ervaring en expertise die zij kunnen verwachten.
          </p>
        </div>
      </section>

      {/* Tussenblok — gecentreerd (tussen intro en de 2-koloms blokken) */}
      <section className="page-section-top section-white section-centered">
        <div className="container-narrow">
          <p className="text-body">
            Tijdens de kennismaking beoordelen we op basis van je opleiding,<br />
            leservaring en eventuele specialisaties welk ervaringsniveau het beste aansluit bij jouw achtergrond.<br />
            Daarna bespreken we samen de vervolgstappen.
          </p>
        </div>
      </section>

      {/* SECTIE 3B — Startend docent (sectietype 2: foto links, tekst rechts) */}
      <section className="page-section section-white">
        <div className="container">
          <div className="grid-2col-40-60-foto-links">
            <div className="text-intro">
              <h3 className="heading-h3 mb-text">Startend docent:</h3>
              <p className="heading-h5 mb-text">Toelatingsvoorwaarden — dit past bij jou als je:</p>
              <ul className="mb-text">
                <li className="text-body">een erkende yogaopleiding hebt afgerond en nog relatief weinig vlieguren hebt als docent</li>
                <li className="text-body">minimaal 1 jaar leservaring óf minimaal 50 uur aantoonbare leservaring hebt</li>
                <li className="text-body">je lessenpraktijk nog aan het opbouwen bent</li>
                <li className="text-body">graag meer ervaring wilt opdoen met privélessen aan huis</li>
              </ul>
              <p className="heading-h5 mb-text mt-heading">Wat betekent dit:</p>
              <ul className="mb-text">
                <li className="text-body">je werkt met een toegankelijk tarief voor klanten</li>
                <li className="text-body">je betaalt een lagere platformcommissie</li>
                <li className="text-body">je bouwt praktijkervaring en reviews op</li>
                <li className="text-body">je krijgt de ruimte om stap voor stap door te groeien binnen het platform</li>
              </ul>
              <p className="heading-h5 mb-text mt-heading">We helpen je groeien door:</p>
              <ul>
                <li className="text-body">een professioneel profiel op het platform</li>
                <li className="text-body">zichtbaarheid voor potentiële klanten</li>
                <li className="text-body">de mogelijkheid om praktijkervaring en reviews op te bouwen</li>
                <li className="text-body">duidelijke richtlijnen en ondersteuning bij de samenwerking</li>
                <li className="text-body">onderdeel van een netwerk van betrokken yogadocenten</li>
              </ul>
            </div>
            <div className="image-col-inner">
              <div className="hero-placeholder" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 3C — Ervaren docent (sectietype 2: foto rechts, tekst links) */}
      <section className="page-section section-white">
        <div className="container">
          <div className="grid-2col-40-60-foto-rechts">
            <div className="text-intro">
              <h3 className="heading-h3 mb-text">Ervaren docent:</h3>
              <p className="heading-h5 mb-text">Toelatingsvoorwaarden — dit past bij jou als je:</p>
              <ul className="mb-text">
                <li className="text-body">minimaal 2 jaar actieve leservaring hebt als yogadocent (studio, privé of bedrijven)</li>
                <li className="text-body">aantoonbaar zelfstandig en professioneel privélessen kunt verzorgen</li>
                <li className="text-body">aanvullende opleidingen of specialisaties hebt gevolgd</li>
                <li className="text-body">ervaring hebt met verschillende doelgroepen en het aanpassen van lessen aan individuele behoeften</li>
                <li className="text-body">zelfstandig privétrajecten kunt begeleiden</li>
                <li className="text-body">klaar bent om trajecten op maat te bieden aan klanten met specifieke wensen</li>
              </ul>
              <p className="heading-h5 mb-text mt-heading">Wat dit voor jou betekent:</p>
              <ul className="mb-text">
                <li className="text-body">je werkt met de vaste tarieven die horen bij het Ervaren-niveau</li>
                <li className="text-body">het platform rekent een vaste commissie van 20% per les</li>
                <li className="text-body">je profiteert maximaal van de zichtbaarheid, het vertrouwen en de marketing van Private Yoga at Home</li>
              </ul>
              <p className="text-body mb-text">
                In een latere fase willen we Ervaren docenten ook de mogelijkheid bieden om workshops en trajecten op maat aan te bieden, met een eigen prijsstelling. Tijdens de pilotfase werken we uitsluitend met de vaste tarieven hierboven.
              </p>
              <p className="heading-h5 mb-text mt-heading">Een ervaren docent past vaak goed bij klanten die:</p>
              <ul>
                <li className="text-body">duidelijke doelen of klachten hebben (zonder medische claim)</li>
                <li className="text-body">weinig tijd hebben en snel resultaat willen behalen</li>
                <li className="text-body">een langer of diepgaander traject willen aangaan</li>
              </ul>
            </div>
            <div className="image-col-inner">
              <div className="hero-placeholder" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 4 — Hoe bepalen we jouw ervaringsniveau? (sectietype 3: gekleurd blok, gecentreerd) */}
      <section className="page-section section-moss section-centered">
        <div className="container-narrow">
          <p className="heading-overline on-dark mb-text">Geen aannames, wel aandacht</p>
          <h2 className="heading-h2 on-dark mb-heading">Hoe bepalen we jouw ervaringsniveau?</h2>
          <p className="text-body on-dark mb-text">
            We kijken naar het totaalplaatje. Daarbij nemen we onder andere mee:
          </p>
          <p className="text-body on-dark mb-text">- je opleiding</p>
          <p className="text-body on-dark mb-text">- je leservaring</p>
          <p className="text-body on-dark mb-text">- ervaring met privélessen</p>
          <p className="text-body on-dark mb-text">- eventuele specialisaties</p>
          <p className="text-body on-dark mb-text">- de indruk uit onze kennismaking</p>
          <p className="text-body on-dark">
            Op basis hiervan delen we je in als Startend of Ervaren docent.
          </p>
        </div>
      </section>

      {/* SECTIE 5 — Groeipad (sectietype 2: foto rechts, tekst links) */}
      <section className="page-section section-white">
        <div className="container">
          <div className="grid-2col-40-60-foto-rechts">
            <div className="text-intro">
              <p className="heading-overline mb-text">Ruimte om te groeien</p>
              <h2 className="heading-h2 mb-heading">Groeipad: van Startend naar Ervaren docent</h2>
              <p className="text-body mb-text">
                We willen dat docenten in en mét het platform groeien.
              </p>
              <p className="text-body mb-text">
                Daarom kun je als Startend docent na verloop van tijd doorstromen naar Ervaren docent.
              </p>
              <p className="text-body mb-text">We kijken dan bijvoorbeeld naar:</p>
              <ul className="mb-text">
                <li className="text-body">aantal gegeven lessen via het platform</li>
                <li className="text-body">gemiddelde reviewscore van klanten</li>
                <li className="text-body">professionele ontwikkeling (bijscholing, extra trainingen)</li>
                <li className="text-body">onze eigen ervaring in de samenwerking met jou</li>
              </ul>
              <p className="text-body">
                Wanneer je voldoet aan de criteria, kun je doorgroeien en passen we je profiel aan naar Ervaren docent.
              </p>
            </div>
            <div className="image-col-inner">
              <div className="hero-placeholder" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 6 — Waarom werken we met verschillende commissies? (sectietype 1: gecentreerd) */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Eerlijk en transparant</p>
          <h2 className="heading-h2 mb-heading">
            Waarom werken we<br />
            met verschillende commissies?
          </h2>
          <p className="text-body mb-text">
            De commissie stelt ons in staat om te investeren in de verdere ontwikkeling van het platform, marketing en<br />
            de zichtbaarheid van onze docenten.<br />
            Zo kun jij je focussen op het geven van persoonlijke yogalessen.
          </p>
          <p className="text-body mb-text">We willen een eerlijk model voor alle partijen:</p>

          <p className="heading-h5 mb-text mt-heading">Startend docent:</p>
          <p className="text-body mb-text">- lager tarief voor de klant</p>
          <p className="text-body mb-text">- lagere commissie voor jou</p>
          <p className="text-body mb-text">- een toegankelijke manier om ervaring op te bouwen via het platform</p>

          <p className="heading-h5 mb-text mt-heading">Ervaren docent:</p>
          <p className="text-body mb-text">- hoger tarief, passend bij jouw expertise</p>
          <p className="text-body mb-text">
            - hogere commissie, omdat je meer profiteert van het merk,<br />
            de marketing en het vertrouwen van het platform
          </p>
          <p className="text-body mb-text">- klanten die bewust voor jouw ervaring en verdieping kiezen</p>

          <p className="text-body mb-text mt-heading">
            We communiceren altijd transparant over de tarieven en de commissie,<br />
            zodat je vooraf precies weet welk bedrag je per les ontvangt.
          </p>
          <p className="text-body mb-cta">
            Naast de commissie werk je als docent met een maandelijks abonnement.<br />
            Welk abonnement bij jouw ervaringsniveau hoort en wat daarbij is inbegrepen,<br />
            lees je op de pagina <Link href="/voor-docenten/abonnement">Abonnementen</Link>.
          </p>
          <Link className="btn-light" href="/voor-docenten/abonnement">Ja, ik ben benieuwd naar de abonnementen</Link>
        </div>
      </section>

      {/* SECTIE 7 — CTA-sectie (sectietype 3: gekleurd blok, gecentreerd — achtergrond #484f47, witte tekst) */}
      <section className="page-section section-moss section-centered">
        <div className="container">
          <p className="heading-overline on-dark mb-text">Maak een begin</p>
          <h2 className="heading-h2 on-dark mb-heading">Word jij één van onze docenten?</h2>
          <p className="text-body on-dark mb-text">
            Denk je dat jouw manier van lesgeven past bij Private Yoga at Home? Dan maken we graag kennis met je.
          </p>
          <p className="text-body on-dark mb-cta">
            Vul het aanmeldformulier in. Na ontvangst beoordelen we je aanmelding. Is er een goede match? Dan nodigen we je uit voor een online kennismakingsgesprek.
          </p>
          <Link className="btn-dark-a" href="/voor-docenten/aanmelden">Meld je aan als yogadocent</Link>
        </div>
      </section>

      {/* SECTIE 8 — Veelgestelde vragen (sectietype 1: gecentreerd) */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Nog vragen?</p>
          <h2 className="heading-h2 accent-terracotta mb-heading">Veelgestelde vragen</h2>
          <div className="faq-lijst">

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Wat verdien ik als Startend of Ervaren docent?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Dit hangt af van je ervaringsniveau en het lestype. Bekijk de volledige tarieven en uitbetalingen op de pagina Tarieven.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Hoe snel kan ik na aanmelding starten met lesgeven?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Dat verschilt per persoon en hangt af van de planning van het kennismakingsgesprek en hoe snel je profiel compleet is. Gemiddeld duurt het proces enkele weken.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Moet ik zelf klanten werven, of doet Private Yoga at Home dat?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Private Yoga at Home zorgt voor zichtbaarheid en aanvragen via het platform. Jij focust je op het geven van goede lessen.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Bepaal ik zelf mijn tarieven?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Nee, Private Yoga at Home werkt met vaste tarieven per ervaringsniveau. Zo weten klanten en docenten vooraf precies waar ze aan toe zijn.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Kan ik doorgroeien van Startend naar Ervaren, en hoe lang duurt dat gemiddeld?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Ja, dat kan. We kijken daarbij onder andere naar aantal gegeven lessen, reviewscore en professionele ontwikkeling. Een vaste termijn hanteren we niet — het is maatwerk per docent.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Is een AVB-verzekering verplicht?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Ja, een AVB-verzekering (aansprakelijkheidsverzekering bedrijven) is verplicht voordat je profiel live kan gaan.
              </p>
            </details>

          </div>
        </div>
      </section>
    </>
  );
}
