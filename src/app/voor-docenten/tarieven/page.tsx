import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarieven voor de docenten | Private Yoga at Home",
  description:
    "Bekijk de lestarieven, commissie en vergoeding voor yogadocenten bij Private Yoga at Home — helder en vast.",
};

const LESTARIEVEN = [
  { les: "Introductieles", duur: "75 min.", startend: "€ 80,00", ervaren: "€ 99,00" },
  { les: "Losse les", duur: "60 min.", startend: "€ 80,00", ervaren: "€ 99,00" },
  { les: "Losse les", duur: "75 min.", startend: "€ 97,00", ervaren: "€ 120,00" },
];

const VERGOEDING = [
  { niveau: "Startend", les: "Introductieles / Losse les 60 min.", commissie: "€ 8,00", btwPlichtig: "€ 70,32", kor: "€ 58,12" },
  { niveau: "Startend", les: "Losse les 75 min.", commissie: "€ 9,70", btwPlichtig: "€ 85,26", kor: "€ 70,47" },
  { niveau: "Ervaren", les: "Introductieles / Losse les 60 min.", commissie: "€ 19,80", btwPlichtig: "€ 75,04", kor: "€ 62,02" },
  { niveau: "Ervaren", les: "Losse les 75 min.", commissie: "€ 24,00", btwPlichtig: "€ 90,96", kor: "€ 75,17" },
];

export default function DocentTarievenPage() {
  return (
    <>
      {/* SECTIE 1 — Hero (sectietype 1: gecentreerd, 1-koloms) */}
      <section className="page-section-hero hero-with-image">
        <Image
          src="/images/voor-docenten/tarieven/docent-sophie-warrior2-anneke-landscape-01.png"
          alt="Yogadocent in kraakhouding tijdens een privéles"
          fill
          priority
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="heading-overline on-dark mb-text">Wat je verdient, helder en vast</p>
          <h1 className="heading-h1 on-dark">Tarieven voor de docenten</h1>
        </div>
      </section>

      {/* SECTIE 2 — Lestarieven (sectietype 1, gestripete tabel) */}
      <section className="page-section section-white section-centered">
        <div className="container">
          <p className="text-body mb-text">
            Je werkt als Startend of Ervaren docent. <br />
            Elk niveau heeft een eigen klantprijs en commissie.
          </p>
          <p className="text-body mb-text">
            Wil je weten wat het verschil tussen deze twee niveaus precies inhoudt, dan lees je dat op de pagina{" "}
            <Link className="accent-terracotta" href="/voor-docenten/hoe-werkt-het">Hoe werkt het</Link>.
          </p>
          <p className="text-body mb-section">
            Bij je niveau hoort ook een abonnement; wat dat inhoudt vind je op de{" "}
            <Link className="accent-terracotta" href="/voor-docenten/abonnement">Abonnement-pagina</Link>.
          </p>

          <h3 className="heading-h3 mb-text">Val je onder de KOR-regeling?</h3>
          <p className="text-body mb-text">
            Dan reken je geen btw over je vergoeding; dat geef je aan wanneer je je profiel aanmaakt.
          </p>
          <p className="text-body mb-section">
            Hieronder vind je precies wat een klant betaalt, wat PYAH inhoudt, en wat jij overhoudt.
          </p>

          <p className="heading-overline mb-text">Wat betaalt de klant</p>
          <h2 className="heading-h2 accent-moss mb-heading">Lestarieven</h2>

          <div className="docent-tarief-tabel-wrapper">
            <table className="docent-tarief-tabel">
              <thead>
                <tr className="docent-tarief-tabel-koprij">
                  <th scope="col">Les</th>
                  <th scope="col">Duur</th>
                  <th scope="col">Klantprijs Startend</th>
                  <th scope="col">Klantprijs Ervaren</th>
                </tr>
              </thead>
              <tbody>
                {LESTARIEVEN.map((rij, i) => (
                  <tr key={`${rij.les}-${rij.duur}`} className={`docent-tarief-tabel-rij ${i === 1 ? "docent-tarief-rij-b" : "docent-tarief-rij-medium"}`}>
                    <td>{rij.les}</td>
                    <td>{rij.duur}</td>
                    <td>{rij.startend}</td>
                    <td>{rij.ervaren}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-small docent-tarief-tabel-voetnoot">
            Klantprijzen zijn inclusief 21% btw. Jij hebt geen invloed op de klantprijs — dat is een bewuste keuze van PYAH,
            zodat klanten altijd weten waar ze aan toe zijn.
          </p>
        </div>
      </section>

      {/* SECTIE 3 — Commissie & jouw vergoeding (sectietype 1, gestripete tabel, achtergrond #ebe3e0) */}
      <section className="page-section section-pearl section-centered">
        <div className="container">
          <p className="heading-overline mb-text">Jouw vergoeding</p>
          <h2 className="heading-h2 accent-moss mb-heading">Commissie &amp; jouw vergoeding</h2>

          <div className="docent-tarief-tabel-wrapper">
            <table className="docent-tarief-tabel docent-tarief-tabel--commissie">
              <thead>
                <tr>
                  <th scope="col">Niveau</th>
                  <th scope="col">Les</th>
                  <th scope="col">Commissie PYAH</th>
                  <th scope="col">Jij ontvangt (btw-plichtig)</th>
                  <th scope="col">Jij ontvangt (KOR)</th>
                </tr>
              </thead>
              <tbody>
                {VERGOEDING.map((rij, i) => (
                  <tr key={`${rij.niveau}-${rij.les}`} className={`docent-tarief-tabel-rij ${i % 2 === 0 ? "docent-tarief-rij-a" : "docent-tarief-rij-b"}`}>
                    <td>{rij.niveau}</td>
                    <td>{rij.les}</td>
                    <td>{rij.commissie}</td>
                    <td>{rij.btwPlichtig}</td>
                    <td>{rij.kor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-small docent-tarief-tabel-voetnoot">
            Ben je btw-plichtig, dan breng je zelf 21% btw in rekening over je vergoeding. Val je onder de KOR,
            dan ontvang je dit bedrag zonder btw-component.
          </p>
        </div>
      </section>

      {/* SECTIE 4 — Reiskosten & extra persoon (sectietype 2b: tekst/tekst naast elkaar) */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Aanvullende tarieven</p>
          <h2 className="heading-h2 accent-moss mb-heading">Reiskosten &amp; extra persoon</h2>

          <div className="grid-2col-equal">
            <div className="text-intro">
              <h3 className="heading-h3 mb-text">Reiskosten</h3>
              {/* Bedrag is nu statische tekst; wordt bij de backend-fase een door Sabine beheerbaar
                  admin-veld conform AV Docenten art. 7.7.5, zodat het op één plek te wijzigen is. */}
              <p className="text-body">
                Jij bepaalt zelf of je reiskosten in rekening brengt boven 10 kilometer. Het tarief is € 0,25 per
                kilometer, exclusief 21% btw. Reiskosten vallen buiten de commissie — het volledige bedrag is voor jou.
              </p>
            </div>
            <div className="text-intro">
              <h3 className="heading-h3 mb-text">Extra persoon</h3>
              <p className="text-body">
                Geef je les aan meerdere personen tegelijk? Dan geldt een toeslag van 25% per extra persoon op de
                basislesprijs. Je geeft het aantal personen aan bij het registreren van de les; het dashboard
                berekent de toeslag automatisch en toont de totaalprijs voordat je de factuur aanmaakt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 5 — CTA (sectietype 3: gekleurd blok, gecentreerd — achtergrond #d4baad) */}
      <section className="page-section section-creme section-centered">
        <div className="container">
          <p className="heading-overline mb-text">Aan de slag</p>
          <h2 className="heading-h2 mb-heading">Wil jij starten met privé yogalessen te geven?</h2>
          <p className="text-body mb-text">
            Denk je dat jouw manier van lesgeven past bij Private Yoga at Home? <br />
            Dan maken we graag kennis met je.
          </p>
          <p className="text-body mb-cta">
            Vul het aanmeldformulier in. Na ontvangst beoordelen we je aanmelding. <br />
            Is er een goede match? Dan nodigen we je uit voor een online kennismakingsgesprek.
          </p>
          <Link className="btn-light" href="/voor-docenten/aanmelden">Meld je aan</Link>
        </div>
      </section>

      {/* SECTIE 6 — Veelgestelde vragen */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Veelgestelde vragen</p>
          <h2 className="heading-h2 accent-terracotta mb-heading">Nog vragen?</h2>
          <div className="faq-lijst">

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Wat is het verschil in tarief tussen Startend en Ervaren?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Als Startend docent betaal je 10% commissie, als Ervaren docent 20% over elke les. Op de{" "}
                <Link className="accent-terracotta" href="/voor-docenten/abonnement">Abonnement-pagina</Link> lees je
                precies wat het maandelijks abonnement per niveau inhoudt.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Hoe en wanneer word ik uitbetaald?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Uitbetaling vindt twee keer per maand plaats, rond de 1e en de 15e.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Wat verandert er als ik van Startend naar Ervaren ga?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p className="text-body mb-text">
                  Je niveau wordt toegekend naar aanleiding van je opleiding, ervaring en eventuele specialisaties.
                  Lees er meer over op de pagina{" "}
                  <Link className="accent-terracotta" href="/voor-docenten/hoe-werkt-het">Hoe werkt het</Link>.
                </p>
                <p className="text-body">
                  Zodra je meer privélessen geeft via het platform, en bij professionele ontwikkeling (bijscholing,
                  extra trainingen), kunnen we je niveau wijzigen. Dit bespreken we altijd persoonlijk met je, en
                  passen we eventueel je tarieven en commissie aan.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Hoe werkt de KOR-regeling binnen PYAH precies?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Val je onder de KOR? Dan geef je dat aan wanneer je je profiel aanmaakt. Je ontvangt je vergoeding dan
                zonder btw-component. PYAH houdt hier automatisch rekening mee bij elke uitbetaling.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Mag ik zelf bepalen of ik reiskosten in rekening breng?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Ja. Reiskosten gelden boven de 10 kilometer, tegen € 0,25 per kilometer, exclusief 21% btw. Jij bepaalt
                zelf of je dit toepast. Het volledige bedrag is voor jou, los van de commissie.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Hoe verstuur ik de factuur naar de klant?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Via je dashboard maak je de factuur voor je klant aan; deze wordt via het Platform verstuurd en de
                klant betaalt via Mollie. Meer hierover ontvang je zodra je bent aangenomen.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Hoe gaat de facturatie tussen Private Yoga at Home en mij?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                De facturatie gaat via self-billing: PYAH stelt automatisch een uitbetalingsspecificatie op die geldt
                als jouw factuur aan PYAH. Je geeft hiervoor bij het aanmaken van je profiel een machtiging af — je
                hoeft zelf dus geen factuur op te stellen of te versturen.
              </p>
            </details>

          </div>
        </div>
      </section>
    </>
  );
}
