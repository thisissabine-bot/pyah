import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AanmeldFormulier from "@/components/aanmelden/AanmeldFormulier";

export const metadata: Metadata = {
  title: "Meld je aan als yogadocent | Private Yoga at Home",
  description:
    "Wil je privélessen yoga aan huis geven in Haarlem e.o.? Meld je aan bij Private Yoga at Home en maak kennis met ons platform voor yogadocenten.",
};

export default function AanmeldenPage() {
  return (
    <>
      {/* SECTIE 1 — Hero (sectietype 1: gecentreerd, 1-koloms) */}
      <section className="page-section-hero hero-with-image">
        <Image
          src="/images/voor-docenten/aanmelden/docent-sophie-laptop-landscape-01.png"
          alt="Yogadocent geconcentreerd achter laptop"
          fill
          priority
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="heading-overline on-dark mb-text">Voor yogadocenten</p>
          <h1 className="heading-h1 on-dark">Meld je aan als privé yogadocent</h1>
        </div>
      </section>

      {/* SECTIE 2 (sectietype 1: gecentreerd) */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Doe je mee?</p>
          <h2 className="heading-h2 mb-heading">Wil je privélessen aan huis geven via Private Yoga at Home?</h2>
          <p className="text-body mb-text">
            Wat leuk dat je interesse hebt om je aan te sluiten bij ons platform. We zijn benieuwd naar wie je bent, welke yogastijl(en) je geeft en welke ervaring je meebrengt. Of je nu een startende of ervaren yogadocent bent, we maken graag kennis met je.
          </p>
          <p className="text-body">
            Of je nu startend bent of al jarenlang ervaring hebt, je bent van harte welkom om je aan te melden. Wel werken we met een aantal toelatingsvoorwaarden om de kwaliteit van het platform te waarborgen. Je kunt de voorwaarden per niveau <Link className="accent-terracotta" href="/voor-docenten/hoe-werkt-het#ervaringsniveaus">hier</Link> bekijken.
          </p>
        </div>
      </section>

      {/* SECTIE 3 (sectietype 3: gekleurd blok, gecentreerd — achtergrond #484f47, witte tekst) */}
      <section className="page-section section-moss section-centered">
        <div className="container-narrow">
          <p className="heading-overline on-dark mb-text">Pilotregio</p>
          <h2 className="heading-h2 on-dark mb-heading">We starten in Haarlem</h2>
          <p className="text-body on-dark mb-text">
            Private Yoga at Home start met een pilot in Haarlem. Daarom nemen we op dit moment alleen aanmeldingen in behandeling van yogadocenten die in Haarlem of directe omgeving wonen.
          </p>
          <p className="text-body on-dark">
            Woon je ergens anders? Dan kun je je alsnog aanmelden. We plaatsen je graag op de wachtlijst voor een volgende regio.
          </p>
        </div>
      </section>

      {/* SECTIE 4 — Aanmeldformulier */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Vertel ons over jezelf</p>
          <h2 className="heading-h2 mb-heading">Aanmeldformulier</h2>

          <AanmeldFormulier />
        </div>
      </section>

      {/* SECTIE 5 (achtergrond #d4baad, zwarte tekst #260f09) */}
      <section className="page-section section-creme section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">In vier stappen</p>
          <h2 className="heading-h2 mb-heading">Wat gebeurt er na je aanmelding?</h2>

          <div className="stappen-lijst">
            <div className="stap-item">
              <h3 className="heading-h3 mb-text">1. Bevestiging</h3>
              <p className="text-body mb-text">
                Je ontvangt automatisch een e-mail waarin we je bedanken voor je aanmelding. Hierin lees je ook hoe de selectieprocedure eruitziet.
              </p>
              <p className="text-body">
                Je hoort meestal binnen 5 werkdagen van ons.
              </p>
            </div>

            <div className="stap-divider" />

            <div className="stap-item">
              <h3 className="heading-h3 mb-text">2. Beoordeling</h3>
              <p className="text-body">
                We bekijken je opleiding, leservaring en of jouw achtergrond aansluit bij Private Yoga at Home.
              </p>
            </div>

            <div className="stap-divider" />

            <div className="stap-item">
              <h3 className="heading-h3 mb-text">3. Kennismakingsgesprek</h3>
              <p className="text-body">
                Zien we een mogelijke match? Dan nodigen we je uit voor een online kennismakingsgesprek.
              </p>
            </div>

            <div className="stap-divider" />

            <div className="stap-item">
              <h3 className="heading-h3 mb-text">4. Profiel aanmaken</h3>
              <p className="text-body">
                Na een positieve kennismaking ontvang je een uitnodiging om je docentprofiel aan te maken. Let op: een AVB-verzekering is hierbij verplicht. Zodra alles is gecontroleerd, wordt je profiel zichtbaar op het platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA-sectie (sectietype 1: gecentreerd) */}
      <section className="page-section section-white section-centered">
        <div className="container">
          <p className="heading-overline mb-text">Nog vragen?</p>
          <h2 className="heading-h2 mb-subtitle">Benieuwd naar tarief en commissie?</h2>
          <p className="text-body mb-cta">
            Bekijk de tarieven met uitleg over commissie voor Startend en Ervaren docenten, en maandelijkse abonnement kosten.
          </p>
          <div className="btn-row">
            <Link className="btn-light" href="/voor-docenten/tarieven">Tarieven</Link>
            <Link className="btn-dark-b" href="/voor-docenten/abonnement">Abonnement</Link>
          </div>
        </div>
      </section>
    </>
  );
}
