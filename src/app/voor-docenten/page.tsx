import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Yogadocent worden in Haarlem | Private Yoga at Home",
  description:
    "Op zoek naar meer vrijheid als yogadocent? Geef privélessen aan huis in Haarlem, op jouw eigen manier. Ontdek Private Yoga at Home en meld je aan voor de pilot.",
};

export default function VoorDocentenPage() {
  return (
    <>
      {/* SECTIE 1 — Hero */}
      <section className="page-section-hero hero-with-image">
        <div className="hero-placeholder" />
        <div className="container hero-content">
          <p className="heading-overline on-dark mb-text">Ruimte om te groeien op jouw manier</p>
          <h1 className="heading-h1 on-dark mb-subtitle">
            Geef les op een manier die bij jou past.
          </h1>
          <p className="heading-h2 on-dark mb-heading">
            Voor yogadocenten die willen groeien, samenwerken en met aandacht privélessen aan huis willen geven.
          </p>
          <p className="text-intro on-dark mb-cta">
            Of je nu net bent gestart of al jarenlang lesgeeft: bij Private Yoga at Home krijg je de ruimte om jezelf verder te ontwikkelen en onderdeel te worden van een nieuw platform waar jouw eigen stijl als docent centraal staat.
          </p>
          <Link className="btn-light" href="/voor-docenten/aanmelden">
            Meld je aan voor de pilot in Haarlem
          </Link>
        </div>
      </section>

      {/* SECTIE 2 — Misschien herken je dit... */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Herkenning van twijfel en werkdruk</p>
          <h2 className="heading-h2 accent-moss mb-heading">Misschien herken je dit...</h2>
          <p className="text-body mb-text">
            Je bent yogadocent geworden omdat je zelf hebt ervaren wat yoga kan betekenen. Die ervaring gun je ook anderen.
          </p>
          <p className="text-body mb-text">
            De rust die ontstaat na een les. Het vertrouwen dat langzaam groeit. De glimlach van iemand die zich weer vrijer kan bewegen of eindelijk weer even adem kan halen.
          </p>
          <p className="text-body mb-text">
            Maar misschien merk je ook dat de manier waarop je nu werkt niet helemaal meer past.
          </p>
          <p className="text-body mb-text">
            Je geeft les bij één of meerdere studio&apos;s, maar voelt weinig ruimte om echt je eigen stijl te ontwikkelen. Je past je aan aan het rooster, het tempo of de verwachtingen van anderen. Of je bent net gestart en vraagt je af hoe je ervaring kunt opbouwen zonder alles zelf vanaf het begin te hoeven uitzoeken.
          </p>
          <p className="text-body mb-text">
            Misschien twijfel je soms aan jezelf.
          </p>
          <p className="text-body mb-text">
            Hoe kom ik aan mijn eigen klanten?<br />
            Ben ik wel goed genoeg?<br />
            Wat is een eerlijk tarief?<br />
            Hoe bouw ik dit op zonder mezelf voorbij te lopen?
          </p>
          <p className="text-body mb-text">Je bent niet de enige.</p>
          <p className="text-body">
            Wat je ervaring ook is — net gestart, of alweer jaren actief en toe aan meer vrijheid en diepgang — als je met aandacht werkt en gelooft in de kracht van persoonlijke begeleiding, dan voel je je waarschijnlijk thuis bij Private Yoga at Home.
          </p>
        </div>
      </section>

      {/* SECTIE 3 — Er is ook een andere manier. */}
      <section className="page-section section-terracotta">
        <div className="container">
          <div className="grid-2col-40-60-foto-rechts">
            <div className="text-intro">
              <p className="heading-overline on-dark mb-text">Onze visie: match boven standaard</p>
              <h2 className="heading-h2 on-dark mb-heading">Er is ook een andere manier.</h2>
              <p className="text-body on-dark mb-text">
                Private Yoga at Home is ontstaan vanuit de overtuiging dat yoga persoonlijker mag.
              </p>
              <p className="text-body on-dark mb-text">
                Wanneer een docent en een klant echt bij elkaar passen, ontstaat er ruimte voor aandacht, vertrouwen en verdieping. Precies daar gebeurt vaak de grootste groei.
              </p>
              <p className="text-body on-dark mb-text">
                Daarom bouwen we aan een netwerk van yogadocenten die met plezier en op hun eigen manier privélessen aan huis willen geven.
              </p>
              <p className="text-body on-dark mb-text">
                Geen standaardformule.<br />
                Geen prestatiedruk.<br />
                Geen race om zoveel mogelijk lessen.
              </p>
              <p className="text-body on-dark">
                Maar een samenwerking waarin kwaliteit altijd belangrijker is dan kwantiteit.
              </p>
            </div>
            <div className="image-col-inner">
              <div className="hero-placeholder" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 4 — Je staat er niet alleen voor */}
      <section className="page-section section-white">
        <div className="container">
          {/* Blok 1 — tekst rechts / foto links */}
          <div className="grid-2col-40-60-foto-links">
            <div className="text-intro">
              <p className="heading-overline mb-text">Steun bij alles rondom het lesgeven</p>
              <h2 className="heading-h2 accent-moss mb-heading">Je staat er niet alleen voor</h2>
              <p className="text-body mb-text">
                Veel yogadocenten vinden het heerlijk om les te geven.
              </p>
              <p className="text-body mb-text">
                Maar alles daaromheen voelt soms als een tweede baan.
              </p>
              <p className="text-body mb-text">
                Klanten vinden.<br />
                Zichtbaar zijn.<br />
                Jezelf presenteren.<br />
                Tarieven bepalen.<br />
                Administratie regelen.<br />
                Twijfelen of je wel de juiste keuzes maakt.
              </p>
              <p className="text-body">
                Wij geloven dat je niet alles alleen hoeft te doen.
              </p>
            </div>
            <div className="image-col-inner">
              <div className="hero-placeholder" />
            </div>
          </div>

          {/* Blok 2 — volle breedte, gecentreerd */}
          <blockquote className="text-quote mt-section mb-section">
            We ondersteunen je bij een professionele uitstraling en zorgen ervoor dat klanten een docent vinden die echt bij hen past.
          </blockquote>

          {/* Blok 3 — tekst links / foto rechts — vinkjeslijst */}
          <div className="grid-2col-40-60-foto-rechts">
            <div className="text-intro">
              <ul className="check-list">
                <li>Meer vrijheid om op jouw eigen manier les te geven.</li>
                <li>Een professionele profielpagina die vertrouwen uitstraalt.</li>
                <li>Passende privéklanten die bewust kiezen voor yoga aan huis.</li>
                <li>Onderdeel van een groeiend netwerk van yogadocenten.</li>
                <li>Ruimte om jezelf verder te ontwikkelen.</li>
                <li>Samenwerken in plaats van alles alleen doen.</li>
                <li>Kwaliteit boven kwantiteit.</li>
                <li>Persoonlijke aandacht voor zowel docent als klant.</li>
              </ul>
            </div>
            <div className="image-col-inner">
              <div className="hero-placeholder" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 5 — Hoe werkt het? */}
      <section className="page-section section-moss section-centered">
        <div className="container">
          <p className="heading-overline on-dark mb-text">De stappen van kennismaking tot start</p>
          <h2 className="heading-h2 on-dark mb-heading">Hoe werkt het?</h2>
          <div className="stappen-lijst">
            <div className="stap-item">
              <h3 className="heading-h3 on-dark mb-text">1. Kennismaken</h3>
              <p className="text-body on-dark">
                We leren je graag kennen als docent en kijken of Private Yoga at Home bij je past. Dit doen we tijdens een online kennismakingsgesprek.
              </p>
            </div>
            <div className="stap-divider" />
            <div className="stap-item">
              <h3 className="heading-h3 on-dark mb-text">2. Maak je profiel aan</h3>
              <p className="text-body on-dark">
                Is er een match? Dan maak je een persoonlijk profiel aan waarin je jouw ervaring, specialisaties en manier van lesgeven laat zien. Zo kunnen klanten ontdekken wie jij bent als docent.
              </p>
            </div>
            <div className="stap-divider" />
            <div className="stap-item">
              <h3 className="heading-h3 on-dark mb-text">3. Ontvang aanvragen</h3>
              <p className="text-body on-dark">
                Wanneer een klant interesse heeft in jouw profiel, kan deze direct zien wanneer je beschikbaar bent voor een online of telefonische kennismaking.
              </p>
            </div>
            <div className="stap-divider" />
            <div className="stap-item">
              <h3 className="heading-h3 on-dark mb-text">4. Onderdeel van het platform</h3>
              <p className="text-body on-dark">
                Je bent onderdeel van een platform waarin kwaliteit, samenwerking en persoonlijke ontwikkeling centraal staan. Samen bouwen we stap voor stap aan Private Yoga at Home.
              </p>
            </div>
          </div>
          <Link className="btn-dark-a mt-section" href="/voor-docenten/hoe-werkt-het">
            Lees meer over hoe het werkt
          </Link>
        </div>
      </section>

      {/* SECTIE 6 — Samen bouwen aan de toekomst van privé yoga aan huis */}
      <section className="page-section section-white">
        <div className="container">
          <div className="grid-2col-40-60-foto-links">
            <div className="text-intro">
              <p className="heading-overline mb-text">Klein beginnen, samen groeien</p>
              <h2 className="heading-h2 accent-moss mb-heading">
                Samen bouwen aan de toekomst van privé yoga aan huis
              </h2>
              <p className="text-body mb-text">
                Private Yoga at Home staat nog aan het begin van een bijzonder avontuur.
              </p>
              <p className="text-body mb-text">
                We starten bewust klein, met een eerste pilot in Haarlem. Niet omdat we klein willen blijven, maar omdat we geloven dat kwaliteit begint met aandacht.
              </p>
              <p className="text-body mb-text">
                We willen iedere docent persoonlijk leren kennen. We begrijpen graag waar jouw kracht ligt, welke manier van lesgeven bij jou past en welke klanten daar het beste bij aansluiten.
              </p>
              <p className="text-body mb-text">
                We geloven dat de mooiste dingen ontstaan wanneer je kennis, ervaringen en ideeën met elkaar deelt. Daarom bouwen we niet alleen aan een platform, maar ook aan een community van yogadocenten die elkaar inspireren, ondersteunen en samen groeien.
              </p>
              <p className="text-body mb-text">
                Iedere docent die zich aansluit, draagt bij aan een plek waar kwaliteit, vertrouwen en persoonlijke aandacht altijd op de eerste plaats staan.
              </p>
              <p className="text-body">
                Misschien is dat wel precies waar jij al een tijd naar op zoek bent.
              </p>
            </div>
            <div className="image-col-inner">
              <div className="hero-placeholder" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 7 — Klaar voor de volgende stap? */}
      <section className="page-section section-pearl section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Uitnodiging om aan te melden</p>
          <h2 className="heading-h2 accent-moss mb-heading">Klaar voor de volgende stap?</h2>
          <p className="text-body mb-text">
            Lijkt het je mooi om onderdeel te worden van een professioneel netwerk waarin jij als docent centraal staat?
          </p>
          <p className="text-body mb-text">
            Waar je op jouw eigen manier les kunt geven, passende klanten ontmoet en samen bouwt aan de toekomst van privé yoga aan huis?
          </p>
          <p className="text-body mb-cta">Dan maken we graag kennis met je.</p>
          <Link className="btn-light" href="/voor-docenten/aanmelden">
            Word één van de eerste privé yogadocenten in Haarlem.
          </Link>
        </div>
      </section>

      {/* SECTIE 8 — Veelgestelde vragen (FAQ) */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Praktische antwoorden voor twijfelaars</p>
          <h2 className="heading-h2 accent-moss mb-heading">Veelgestelde vragen</h2>
          <div className="faq-lijst">

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Waar geef ik les als docent bij Private Yoga at Home?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Je geeft privélessen bij klanten thuis, in de regio Haarlem en omgeving. We starten bewust met een pilot in deze regio.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Wat verdien ik als docent?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Je ontvangt een vast percentage van de lesprijs. Het exacte percentage hangt af van je niveau (Startend of Ervaren) — <Link href="/voor-docenten/hoe-werkt-het">hier lees je meer over hoe het werkt</Link>.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Wat heb ik nodig om je aan te melden?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Een erkende yoga-opleiding (minimaal 200-urige Yoga Teacher Training), recente leservaring, een inschrijving bij de KvK en een verzekering als zzp&apos;er.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Wat is het verschil tussen Startend en Ervaren?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Dit bepalen we samen tijdens het kennismakingsgesprek, op basis van je opleiding, ervaring en specialisaties. Meer hierover lees je op <Link href="/voor-docenten/hoe-werkt-het">Hoe werkt het?</Link>.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Hoe meld ik mij aan?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Via een kort aanmeldformulier. Daarna volgt een vrijblijvend kennismakingsgesprek om te voelen of het klikt.
              </p>
            </details>

          </div>
        </div>
      </section>
    </>
  );
}
