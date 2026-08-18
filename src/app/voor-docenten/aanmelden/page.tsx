import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

          <form className="form-body">
            {/* Persoonlijke gegevens */}
            <div className="form-fieldset">
              <h3 className="heading-h3 mb-section">Persoonlijke gegevens</h3>

              <div className="form-group">
                <label className="form-label" htmlFor="naam">Naam <span className="form-required">*</span></label>
                <input className="form-input" type="text" id="naam" name="naam" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">E-mailadres <span className="form-required">*</span></label>
                <input className="form-input" type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="woonplaats">Woonplaats <span className="form-required">*</span></label>
                <input className="form-input" type="text" id="woonplaats" name="woonplaats" required />
              </div>
            </div>

            {/* Opleiding & ervaring */}
            <div className="form-fieldset">
              <h3 className="heading-h3 mb-section">Opleiding &amp; ervaring</h3>

              <div className="form-group">
                <label className="form-label" htmlFor="opleiding">Welke yogaopleiding(en) heb je gevolgd? <span className="form-required">*</span></label>
                <textarea className="form-textarea" id="opleiding" name="opleiding" required />
                <p className="form-hint">Vermeld bij voorkeur de naam van de opleiding, opleider en het aantal trainingsuren.</p>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="jaren-leservaring">Hoeveel jaar geef je yogales? <span className="form-required">*</span></label>
                <select className="form-select" id="jaren-leservaring" name="jaren_leservaring" required defaultValue="">
                  <option value="" disabled>Maak een keuze</option>
                  <option value="minder-dan-1">Minder dan 1 jaar</option>
                  <option value="1-2">1–2 jaar</option>
                  <option value="3-5">3–5 jaar</option>
                  <option value="6-10">6–10 jaar</option>
                  <option value="meer-dan-10">Meer dan 10 jaar</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="recente-lespraktijk">Heb je in de afgelopen 6–12 maanden actief lesgegeven? <span className="form-required">*</span></label>
                <select className="form-select" id="recente-lespraktijk" name="recente_lespraktijk" required defaultValue="">
                  <option value="" disabled>Maak een keuze</option>
                  <option value="wekelijks">Ja, wekelijks</option>
                  <option value="regelmatig">Ja, regelmatig</option>
                  <option value="af-en-toe">Af en toe</option>
                  <option value="nee">Nee</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ervaring-privelessen">Heb je ervaring met privélessen aan huis? <span className="form-required">*</span></label>
                <select className="form-select" id="ervaring-privelessen" name="ervaring_privelessen" required defaultValue="">
                  <option value="" disabled>Maak een keuze</option>
                  <option value="regelmatig">Ja, regelmatig</option>
                  <option value="af-en-toe">Ja, af en toe</option>
                  <option value="nog-niet">Nog niet</option>
                </select>
              </div>
            </div>

            {/* Specialisaties */}
            <div className="form-fieldset">
              <h3 className="heading-h3 mb-section">Specialisaties</h3>

              <div className="form-group">
                <label className="form-label" htmlFor="yogastijlen">Welke yogastijlen geef je?</label>
                <textarea className="form-textarea" id="yogastijlen" name="yogastijlen" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="andere-disciplines">Bied je daarnaast nog andere disciplines aan?</label>
                <textarea className="form-textarea" id="andere-disciplines" name="andere_disciplines" />
                <p className="form-hint">Denk bijvoorbeeld aan ademwerk, meditatie, sound healing, coaching of workshops.</p>
              </div>
            </div>

            {/* Kennismaking */}
            <div className="form-fieldset">
              <h3 className="heading-h3 mb-section">Kennismaking</h3>

              <div className="form-group">
                <label className="form-label" htmlFor="motivatie">Waarom wil je je aansluiten bij Private Yoga at Home? <span className="form-required">*</span></label>
                <textarea className="form-textarea" id="motivatie" name="motivatie" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="toelichting">Is er nog iets dat je met ons wilt delen?</label>
                <textarea className="form-textarea" id="toelichting" name="toelichting" />
                <p className="form-hint">Bijvoorbeeld als je een bijzondere situatie hebt of iets wilt toelichten.</p>
              </div>
            </div>

            {/* Verklaringen */}
            <div className="form-fieldset">
              <h3 className="heading-h3 mb-section">Verklaringen</h3>

              <label className="form-checkbox-row">
                <input type="checkbox" name="akkoord_opleiding" required />
                <span className="text-body">Ik heb een erkende yogaopleiding afgerond.</span>
              </label>

              <label className="form-checkbox-row">
                <input type="checkbox" name="akkoord_pilotregio" />
                <span className="text-body">Ik woon in Haarlem of directe omgeving en meld mij aan voor de pilot.</span>
              </label>

              <label className="form-checkbox-row">
                <input type="checkbox" name="akkoord_wachtlijst" />
                <span className="text-body">Ik woon buiten Haarlem en wil graag op de wachtlijst voor een volgende regio.</span>
              </label>

              <label className="form-checkbox-row">
                <input type="checkbox" name="akkoord_geen_garantie" required />
                <span className="text-body">Ik begrijp dat het insturen van dit formulier geen garantie geeft op toelating tot het platform.</span>
              </label>

              <label className="form-checkbox-row">
                <input type="checkbox" name="akkoord_avb" required />
                <span className="text-body">Ik heb al een AVB-verzekering (aansprakelijkheidsverzekering bedrijven), of ik begrijp dat ik deze moet afsluiten voordat mijn profiel live kan gaan.</span>
              </label>

              <label className="form-checkbox-row">
                <input type="checkbox" name="akkoord_privacy" required />
                <span className="text-body">Ik ga akkoord met de verwerking van mijn persoonsgegevens zoals beschreven in de Privacyverklaring.</span>
              </label>
            </div>

            <button type="submit" className="btn-light">Verstuur mijn aanmelding</button>
          </form>
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
            Bekijk de abonnementen voor Startend en Ervaren docenten, met uitleg over commissie en maandelijkse kosten.
          </p>
          <div className="btn-row">
            <Link className="btn-light" href="/voor-docenten/abonnement">Bekijk de abonnementen</Link>
            <Link className="btn-dark-b" href="/voor-docenten/hoe-werkt-het">Hoe werkt het?</Link>
          </div>
        </div>
      </section>
    </>
  );
}
