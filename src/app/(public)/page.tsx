import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Home, Shield, Star, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="page-section-hero hero-with-image">
        <Image
          src="/Sabine yogadocent 1920x1080.jpg"
          alt="Sabine, yogadocent aan huis"
          fill
          priority
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="heading-overline on-dark mb-text">Haarlem & omgeving</p>
          <h1 className="heading-h1 on-dark mb-subtitle">
            Privé yoga aan huis in Haarlem —<br /><span className="hero-h1-light">afgestemd op jouw lichaam en behoeften</span>
          </h1>
          <Link className="btn-1 on-dark" href="/docenten">
            Bekijk de docenten
          </Link>
        </div>
      </section>

      {/* SECTIE 1 — Intro */}
      <section className="page-section section-white">
        <div className="container-narrow">
          <p className="text-intro mb-text">
            Je agenda is vol. Je hoofd staat zelden stil. En toch voel je dat je lichaam iets anders nodig heeft dan nog een to-do.
          </p>
          <p className="text-intro mb-cta">
            Met privé yoga aan huis in Haarlem hoef je nergens heen. Een zorgvuldig geselecteerde yogadocent komt naar jou toe op jouw tijd, in jouw tempo, afgestemd op wat jij nodig hebt.
          </p>
          <p className="text-intro">
            Geen groepsles waar je je aan moet aanpassen.<br />
            Geen reistijd. Gewoon rust, ruimte en echte aandacht bij jou thuis.
          </p>
        </div>
      </section>

      {/* SECTIE 2 — Zo werkt het */}
      <section className="page-section section-creme section-centered">
        <div className="container">
          <p className="heading-overline mb-text">In drie stappen</p>
          <h2 className="heading-h2 mb-subtitle">Zo werkt het</h2>
          <p className="text-intro mb-section">
            Van zoeken naar jouw eigen privé yogadocent aan huis, volg je de stappen:
          </p>
          <div className="grid-3col mb-section">
            <div>
              <div className="stap-icon mb-icon">
                <Search size={24} className="text-pyah-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-h3 mb-text">1. Kies een docent</h3>
              <p className="text-body">
                Bekijk profielen van gecertificeerde yogadocenten in Haarlem. Filter op yogastijl, specialisme en ervaring. Zo vind je iemand die echt bij jou past.
              </p>
            </div>
            <div>
              <div className="stap-icon mb-icon">
                <Calendar size={24} className="text-pyah-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-h3 mb-text">2. Plan een kennismaking</h3>
              <p className="text-body">
                Begin met een vrijblijvend online kennismakingsgesprek. Je stemt wensen, verwachtingen en planning af en voelt of er een klik is.
              </p>
            </div>
            <div>
              <div className="stap-icon mb-icon">
                <Home size={24} className="text-pyah-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-h3 mb-text">3. Eerste les bij jou thuis</h3>
              <p className="text-body">
                Is het een match? Dan plant de docent een introductieles in bij jou thuis, op een moment dat past. Boeken en betalen regel je veilig via het platform.
              </p>
            </div>
          </div>
          <p className="text-body mb-cta">
            Wil je graag meer informatie hoe het werkt, klik dan op onderstaande knop:
          </p>
          <Link className="btn-3" href="/hoe-werkt-het">
            Hoe werkt het?
          </Link>
        </div>
      </section>

      {/* SECTIE 3 — Waarom privé yoga */}
      <section className="page-section section-white">
        <div className="container">
          <div className="grid-2col-image">
            <div>
              <p className="heading-overline mb-text">Persoonlijk & afgestemd</p>
              <h2 className="heading-h2 mb-subtitle">Waarom privé yoga aan huis?</h2>
              <p className="text-intro mb-text">
                Groepslessen zijn voor veel mensen een prima start. Maar als je merkt dat de les net niet aansluit op jouw lijf, je tempo of je situatie, dan mis je iets.
              </p>
              <p className="text-body mb-section">
                Bij een groepsles volg je het ritme van de groep. Bij privé yoga aan huis volgt de docent jóuw ritme.
              </p>
              <h3 className="heading-h3 mb-text">Dat maakt het verschil voor mensen die:</h3>
              <ul className="check-list">
                <li>herstellende zijn van een blessure of burn-out en veilige, rustige begeleiding zoeken</li>
                <li>weinig tijd hebben en yoga in hun drukke leven willen passen, zonder reistijd</li>
                <li>zich niet prettig voelen in een groep, of behoefte hebben aan echt persoonlijke aandacht</li>
                <li>zwanger zijn of net bevallen en yoga willen die helemaal is afgestemd op hun lichaam</li>
              </ul>
            </div>
            <div className="image-col-inner">
              <Image
                src="/PYAH waarom privé yoga aan huis_.jpg"
                alt="Privé yogales aan huis"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>
          <blockquote className="text-quote mt-section">
            Yoga werkt het beste als het aansluit bij waar je nu bent.<br />Privé yoga aan huis maakt dat mogelijk.
          </blockquote>
        </div>
      </section>

      {/* SECTIE 4 — Feature cards */}
      <section className="page-section section-pearl">
        <div className="container">
          <p className="heading-overline mb-text">Voor yoga die echt bij je past.</p>
          <h2 className="heading-h2 mb-section">Yoga thuis, professioneel geregeld</h2>
          <div className="grid-3col">
            <div className="feature-card">
              <div className="feature-icon mb-icon">
                <Shield size={24} className="text-pyah-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-h3 mb-text">Docenten die met aandacht<br />zijn geselecteerd</h3>
              <p className="text-body">
                We werken alleen met yogadocenten die we zorgvuldig selecteren op opleiding, ervaring en manier van lesgeven. Zo vind je met vertrouwen een docent die past bij jouw wensen, niveau en persoonlijkheid.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon mb-icon">
                <Star size={24} className="text-pyah-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-h3 mb-text">Privé yoga afgestemd<br />op jouw lichaam en leven</h3>
              <p className="text-body">
                Geen standaard les, maar yoga die aansluit op wat jij nodig hebt. Of je nu meer rust zoekt, wilt herstellen van stress of juist sterker en soepeler wilt worden, de lessen worden afgestemd op jouw tempo en doelen.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon mb-icon">
                <CheckCircle size={24} className="text-pyah-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-h3 mb-text">Alles makkelijk<br />& veilig geregeld</h3>
              <p className="text-body">
                Bekijk docentprofielen, kies een docent die bij je past, plan je les en betaal veilig online. Alles overzichtelijk op één plek geregeld.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 5 — Kwaliteitseisen */}
      <section className="page-section section-white">
        <div className="container">
          <h4 className="heading-h4 mb-text">
            Niet iedere yogadocent is zomaar toegelaten tot het platform
          </h4>
          <p className="text-body mb-text">
            Bij Private Yoga at Home werken we alleen met docenten die voldoen aan heldere kwaliteitseisen:
          </p>
          <ul className="mb-section">
            <li className="text-body">Aantoonbare opleiding: minimaal een erkende 200-urige Yoga Teacher Training</li>
            <li className="text-body">Recente leservaring en een duidelijk specialisme</li>
            <li className="text-body">Ingeschreven bij de Kamer van Koophandel</li>
            <li className="text-body">Aansprakelijkheidsverzekering afgesloten</li>
            <li className="text-body">Persoonlijk gescreend — want kwaliteit staat boven schaal</li>
          </ul>
          <p className="text-body">
            Elke docent heeft een helder profiel met yogastijl, specialisaties en ervaring. Zo kies je met vertrouwen.
          </p>
        </div>
      </section>

      {/* SECTIE 6 — Founder */}
      <section className="page-section section-terracotta">
        <div className="container">
          <div className="grid-2col-image">
            <div>
              <p className="heading-overline on-dark mb-text">Over de founder</p>
              <h2 className="heading-h2 on-dark mb-subtitle">Waarom Private Yoga at Home bestaat</h2>
              <p className="text-intro on-dark mb-section">
                Private Yoga at Home is opgericht door Sabine Blok, founder van Private Yoga Amsterdam.
              </p>
              <blockquote className="mb-text">
                <p className="text-body on-dark mb-text">
                  &ldquo;Na vijf jaar lang mensen thuis begeleiden weet ik hoe groot het verschil is tussen een les in een studio en een les in je eigen vertrouwde omgeving. Mensen ontspannen dieper. Ze durven meer te vragen. En ze gaan echt vooruit, omdat elke les is afgestemd op hún situatie.
                </p>
                <p className="text-body on-dark">
                  Vanuit die ervaring bouw ik Private Yoga at Home: een platform waar iedereen die dat wil, een goede yogadocent aan huis kan vinden — met de kwaliteit, het vertrouwen en het gemak dat daarbij hoort.&rdquo;
                </p>
              </blockquote>
              <p className="text-small on-dark">— Sabine Blok, founder Private Yoga at Home</p>
            </div>
            <div className="image-col-inner">
              <Image
                src="/PYAH Sabine Blok founder.jpg"
                alt="Sabine Blok, founder Private Yoga at Home"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 7 — CTA */}
      <section className="page-section footer-margin section-moss section-centered">
        <div className="container">
          <p className="heading-overline on-dark mb-text">Maak een begin</p>
          <h3 className="heading-h2 on-dark mb-subtitle">Benieuwd welke docent bij jou past?</h3>
          <p className="text-body on-dark mb-cta">
            Bekijk de profielen van onze yogadocenten in Haarlem en voel of er iemand is die bij jou aansluit.<br />
            Begin vrijblijvend met een kennismakingsgesprek en ervaar zelf wat persoonlijke yoga aan huis voor jou kan betekenen.
          </p>
          <div className="btn-row">
            <Link className="btn-1 on-dark" href="/docenten">Bekijk de docenten</Link>
            <Link className="btn-3" href="/hoe-werkt-het">Hoe werkt het?</Link>
          </div>
        </div>
      </section>
    </>
  );
}
