import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function HoeWerktHetPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-section-hero hero-with-image">
        <Image
          src="/images/hoe-werkt-het/hero-sophie-voor-de-deur-02.png"
          alt="Yogadocent aan de voordeur bij een klant thuis, klaar voor de les"
          fill
          priority
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="heading-overline on-dark mb-text">Haarlem &amp; omgeving</p>
          <h1 className="heading-h1 on-dark mb-subtitle">
            Hoe werkt privé yoga aan huis?
          </h1>
          <p className="text-intro on-dark">
            Je bent benieuwd naar yoga aan huis, maar hoe gaat dat precies in zijn werk? <br />
            Op deze pagina leggen we je stap voor stap uit wat je kunt verwachten. <br />
            Van het zoeken naar een docent tot de eerste les bij jou thuis.
          </p>
        </div>
      </section>

      {/* SECTIE: voor-wie */}
      <section className="page-section section-white section-centered">
        <div className="container">
          <p className="heading-overline mb-text">Herken jij jezelf?</p>
          <h2 className="heading-h2 mb-heading">Voor wie is privé yoga aan huis?</h2>
          <div className="voor-wie-grid">
            <p className="text-body">Voor mensen met een volle agenda die geen reistijd willen.</p>
            <p className="text-body">Voor wie herstellende is en rustige, veilige begeleiding zoekt.</p>
            <p className="text-body">Voor wie zwanger is of net bevallen.</p>
            <p className="text-body">Voor wie de verdieping mist in een groepsles.</p>
          </div>
        </div>
      </section>

      {/* FOTO LIGGEND BEELD */}
      <div className="image-placeholder-liggend image-placeholder-liggend-quote">
        <Image
          src="/images/hoe-werkt-het/sfeerfoto-bloemen-roze-liggend-01.jpg"
          alt="Sfeerfoto van bloemen, een rustig en natuurlijk beeld passend bij de yogasfeer"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <blockquote className="text-quote">
          Thuis is niet alleen een plek.<br />
          Het is ook een gevoel dat je in je lijf mag terugvinden.
        </blockquote>
      </div>

      {/* SECTIE: stappen */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <div className="stappen-lijst">

            {/* STAP 1 */}
            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 1</p>
              <h3 className="heading-h3 mb-text">Zoek een docent die bij je past</h3>
              <p className="text-body mb-text">
                Blader door de profielen van onze yogadocenten in Haarlem en omgeving. 
                Filter op wat voor jou belangrijk is: zoek je iets actiefs of juist iets rustigs? 
                Heb je een specifieke wens, zoals begeleiding bij herstel, zwangerschap of stress? 
                Of wil je gewoon iemand in jouw buurt, in Heemstede, Zandvoort, Aerdenhout, Hoofddorp of Bloemendaal?
              </p>
              <p className="text-body mb-cta">
                Elk profiel geeft je een eerlijk beeld van de docent: 
                achtergrond, yogastijl, specialisaties en ervaring. 
                Zo kies je met vertrouwen.
              </p>
              <Link className="btn-light" href="/docenten">Bekijk de docenten →</Link>
            </div>

            <div className="stap-divider" />

            {/* STAP 2 */}
            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 2</p>
              <h3 className="heading-h3 mb-text">Plan een vrijblijvend kennismakingsgesprek</h3>
              <p className="text-body mb-text">
                Heb je een docent gevonden die je aanspreekt? Dan begin je met een kort kennismakingsgesprek via Zoom, of telefonisch als je dat prettiger vindt.
              </p>
              <p className="text-body mb-text">
                Via Calendly zie je direct de beschikbaarheid van de docent en 
                plan je het gesprek in op een moment dat jou uitkomt. 
                Kies je voor Zoom? Dan ontvang je automatisch een bevestiging met de link.
              </p>
              <p className="text-body">
                Geen verplichting, geen kosten. Je stemt wensen, verwachtingen en planning af, 
                en voelt of er een klik is. 
                Pas als het voor jullie allebei goed voelt, ga je verder.
              </p>
            </div>

            <div className="stap-divider" />

            {/* STAP 3 */}
            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 3</p>
              <h3 className="heading-h3 mb-text">De introductieles — bij jou thuis</h3>
              <p className="text-body mb-text">
                Is er een match? Dan plant de docent een introductieles in bij jou thuis. 
                De introductieles duurt altijd 75 minuten en is eenmalig per docent.
              </p>
              <p className="text-body">
                Dit is de les waarin de docent jouw lichaam, wensen en grenzen leert kennen.
                Geen standaard les, maar een echte kennismaking — afgestemd op waar jij nu staat.
              </p>
            </div>

            <div className="stap-divider" />

            {/* STAP 4 */}
            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 4</p>
              <h3 className="heading-h3 mb-text">Plan de vervolgafspraken</h3>
              <p className="text-body mb-text">
                Bevalt de introductieles? Dan stemmen jij en de docent samen af hoe jullie verder gaan. 
                Je kiest of je losse lessen wilt of liever een pakket van vier en of je 60 of 75 minuten per les wilt.
              </p>
              <p className="text-body">
                Die afspraken worden ingepland op momenten die passen bij jouw agenda.
              </p>
            </div>

            <div className="stap-divider" />

            {/* STAP 5 */}
            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 5</p>
              <h3 className="heading-h3 mb-text">Factuur via het platform</h3>
              <p className="text-body mb-text">
                De docent maakt de factuur aan via het platform. Je ontvangt hem per e-mail, 
                inclusief een betaallink. 
                Betalen doe je veilig via Mollie — gewoon met iDEAL of creditcard.
              </p>
              <p className="text-body">
                Alles is geregeld op één plek.
              </p>
            </div>

            <div className="stap-divider" />

            {/* STAP 6 */}
            <div className="stap-item">
              <p className="heading-overline mb-text">Stap 6</p>
              <h3 className="heading-h3 mb-text">De docent komt naar jou toe</h3>
              <p className="text-body mb-text">
                Jij hoeft nergens heen. 
                De docent komt op het afgesproken moment 
                naar jouw adres in Haarlem of omgeving.
              </p>
              <p className="text-body mb-text">
                Zorg voor voldoende bewegingsruimte en een schone,
                rustige omgeving. De docent neemt alles mee wat verder nodig is.
              </p>
              <p className="text-body">
                En dan begint het gewoon: 
                yoga, bij jou thuis, volledig afgestemd op jou.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOTO'S DRIELUIK (placeholder, volgt via Cloudinary) */}
      <section className="page-section section-white">
        <div className="container">
          <div className="drieluik-grid">
            <div className="drieluik-blok">
              <Image
                src="/images/hoe-werkt-het/sfeerfoto-yogamat-blokken-01.png"
                alt="Sfeerfoto van een yogamat met yogablokken, klaar voor een privéles"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="drieluik-blok">
              <Image
                src="/images/hoe-werkt-het/suzanne-yin-houding-01.png"
                alt="Yogadocent Suzanne in een yin yoga-houding tijdens een privéles"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="drieluik-blok">
              <Image
                src="/images/hoe-werkt-het/sfeerfoto-yogamat-wollen-deken-01.png"
                alt="Sfeerfoto van een yogamat met een wollen deken, een rustige setting voor een yogales thuis"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE: cta */}
      <section className="page-section section-moss section-centered">
        <div className="container">
          <p className="heading-overline on-dark mb-text">Maak een begin</p>
          <h3 className="heading-h2 on-dark mb-subtitle">Benieuwd welke docent bij jou past?</h3>
          <p className="text-body on-dark mb-cta">
            Bekijk de profielen van onze yogadocenten in Haarlem en voel of er iemand is die bij je aansluit. <br />
            Begin vrijblijvend met een kennismakingsgesprek en <br />
            ervaar zelf wat persoonlijke yoga aan huis voor jou kan betekenen.
          </p>
          <div className="btn-row">
            <Link className="btn-light" href="/docenten">Bekijk de docenten →</Link>
            <Link className="btn-dark-a" href="/voor-docenten">Hoe word ik docent? →</Link>
          </div>
        </div>
      </section>

      {/* SECTIE: faq */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Veelgestelde vragen</p>
          <h2 className="heading-h2 accent-terracotta mb-heading">Nog vragen?</h2>
          <div className="faq-lijst">

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Moet ik yoga-ervaring hebben?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Nee. Onze docenten werken met beginners én met mensen die al jaren op de mat staan. Bij de eerste les stemmen ze altijd af op jouw niveau en achtergrond.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Hoe kies ik de juiste docent?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Bekijk de profielen en let op yogastijl, specialisaties en ervaring. Twijfel je? Begin gewoon met een kennismakingsgesprek — dat is vrijblijvend en kosteloos.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Wat is een introductieles?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                De introductieles is een eenmalige les van 75 minuten waarbij de docent jou en jouw wensen leert kennen. Het is het startpunt van jullie samenwerking.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Wat kost een les?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p className="text-body mb-text">
                  De tarieven verschillen per docentniveau. Een volledig overzicht vind je op de tarieven-pagina.
                </p>
                <Link className="text-body accent-terracotta" href="/tarieven">Bekijk de tarieven →</Link>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">In welke plaatsen zijn docenten beschikbaar?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Onze docenten zijn actief in de regio Haarlem — waaronder Heemstede, Zandvoort, Aerdenhout, Hoofddorp en Bloemendaal. Op de zoekpagina kun je filteren op locatie.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Kan ik een les annuleren?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Ja, buiten 24 uur voor aanvang kun je een les kosteloos verzetten. Bij annulering binnen 24 uur wordt de les in rekening gebracht. Alle voorwaarden staan in onze Algemene Voorwaarden.
              </p>
            </details>

          </div>
        </div>
      </section>
    </>
  );
}
