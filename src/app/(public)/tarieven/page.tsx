import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function TarievenPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-section-hero hero-with-image">
        <Image
          src="/images/tarieven/hero-anneke-laptop.png"
          alt="Yogadocent achter haar laptop aan tafel thuis"
          fill
          priority
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="heading-overline on-dark mb-text">Wat kost het?</p>
          <h1 className="heading-h1 on-dark">Tarieven privé yoga aan huis</h1>
        </div>
      </section>

      {/* SECTIE: Persoonlijke begeleiding */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Persoonlijke begeleiding</p>
          <h2 className="heading-h2 accent-moss mb-heading">
            Persoonlijke begeleiding, <br />
            afgestemd op jouw wensen
          </h2>
          <p className="text-body mb-text">
            Bij Private Yoga at Home geloven we dat privé yoga toegankelijk moet zijn voor zoveel mogelijk mensen. <br />
            Daarom werken we met twee ervaringsniveaus: Startende yogadocenten en Ervaren yogadocenten.
          </p>
          <p className="text-body mb-text">
            Welke docent je ook kiest, je kunt rekenen op persoonlijke aandacht, professionele begeleiding en<br />
            lessen die volledig worden afgestemd op jouw lichaam, wensen en doelen.
          </p>
          <p className="text-body mb-text">
            Voordat een docent wordt toegelaten tot het platform, doorloopt hij of zij een zorgvuldige selectie. <br />
            Iedere docent heeft een erkende yogaopleiding afgerond, beschikt over praktijkervaring en <br />
            voldoet aan de kwaliteitsrichtlijnen van Private Yoga at Home.
          </p>
          <p className="text-body">
            Het verschil zit dan ook niet in de kwaliteit, <br />
            maar in de hoeveelheid ervaring en eventuele specialisaties.
          </p>
        </div>
      </section>

      {/* SECTIE: Onze docenten */}
      <section className="page-section section-pearl section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Onze docenten</p>
          <h2 className="heading-h2 accent-terracotta mb-heading">
            Kies de docent die bij jou past
          </h2>
          <p className="text-body mb-text">
            Iedereen heeft andere wensen. Misschien zoek je een toegankelijke manier om kennis te maken met privé yoga. <br />
            Of misschien heb je juist specifieke klachten of doelen waarbij je graag begeleid wordt door iemand met veel praktijkervaring.
          </p>
          <p className="text-body">
            Door te werken met twee ervaringsniveaus kun je een keuze maken <br />
            die past bij jouw persoonlijke situatie én budget.
          </p>

          <div className="divider-accent" />

          <div className="niveau-stack">
            <div>
              <h3 className="heading-h3 accent-moss mb-text">Startende yogadocent</h3>
              <p className="text-body mb-text">
                Een startende yogadocent heeft een erkende yogaopleiding afgerond en beschikt over praktijkervaring. <br />
                Hij of zij bouwt de lessenpraktijk verder uit en begeleidt je met veel aandacht,<br />
                enthousiasme en persoonlijke betrokkenheid.
              </p>
              <p className="text-body">
                Ben je op zoek naar privé yoga aan huis tegen een toegankelijker tarief? <br />
                Dan kan een startende yogadocent een mooie keuze zijn.
              </p>
            </div>
            <div>
              <h3 className="heading-h3 accent-moss mb-text">Ervaren yogadocent</h3>
              <p className="text-body mb-text">
                Een ervaren yogadocent heeft meerdere jaren leservaring en <br />
                begeleidt al langere tijd uiteenlopende mensen <br />
                met verschillende wensen en behoeften.
              </p>
              <p className="text-body mb-text">
                Veel ervaren docenten hebben zich daarnaast verder gespecialiseerd, bijvoorbeeld in yin yoga, <br />
                ademwerk, ontspanning, zwangerschap of rug- en nekklachten. Door hun ervaring kunnen zij lessen <br />
                snel afstemmen op wat jij op dat moment nodig hebt.
              </p>
              <p className="text-body">
                Heb je een specifieke hulpvraag of vind je het prettig om begeleid te worden <br />
                door een docent met veel praktijkervaring? <br />
                Dan past een ervaren yogadocent mogelijk beter bij jou.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE: Tarieven */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Twee niveaus, één zelfde zorg</p>
          <h2 className="heading-h2 accent-moss mb-heading">Tarieven</h2>

          <div className="tarieven-tabel-wrapper">
            <table className="tarieven-tabel">
              <thead>
                <tr>
                  <th className="heading-overline accent-moss">Les</th>
                  <th className="heading-overline accent-terracotta">Startend</th>
                  <th className="heading-overline accent-moss">Ervaren</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className="heading-h4">Introductieles</p>
                    <p className="text-small">75 min. · eenmalig</p>
                  </td>
                  <td className="tarieven-tabel-prijs">€ 80</td>
                  <td className="tarieven-tabel-prijs">€ 99</td>
                </tr>
                <tr>
                  <td>
                    <p className="heading-h4">Losse les</p>
                    <p className="text-small">60 minuten</p>
                  </td>
                  <td className="tarieven-tabel-prijs">€ 80</td>
                  <td className="tarieven-tabel-prijs">€ 99</td>
                </tr>
                <tr>
                  <td>
                    <p className="heading-h4">Losse les</p>
                    <p className="text-small">75 minuten</p>
                  </td>
                  <td className="tarieven-tabel-prijs">€ 97</td>
                  <td className="tarieven-tabel-prijs">€ 120</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-small tarieven-tabel-voetnoot">
            Prijzen zijn inclusief 21% btw. De introductieles duurt 75 minuten en <br />
            is bewust gelijkgeprijsd aan de losse les van 60 minuten, om de drempel te verlagen.
          </p>
        </div>
      </section>

      {/* SECTIE: Benieuwd welke docent bij jou past? */}
      <section className="page-section section-moss section-centered">
        <div className="container">
          <h2 className="heading-h2 on-dark mb-subtitle">
            Benieuwd welke docent bij jou past?
          </h2>
          <p className="text-body on-dark mb-cta">
            Iedere yogadocent heeft een eigen achtergrond, stijl en specialisaties. <br />
            Op de docentenpagina ontdek je meer over hun ervaring en expertise, <br />
            zodat je rustig kunt bekijken wie het beste bij jou past.
          </p>
          <Link className="btn-dark-a" href="/docenten">Bekijk onze docenten →</Link>

          <div className="drieluik-grid mt-section">
            <div className="drieluik-blok">
              <Image
                src="/images/tarieven/docent-marijke-crop.png"
                alt="Yogadocent Marijke, portret"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="drieluik-blok">
              <Image
                src="/images/tarieven/sfeerfoto-3-kaarsen-01-crop.png"
                alt="Sfeerfoto van drie brandende kaarsen met een kralenketting"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="drieluik-blok">
              <Image
                src="/images/tarieven/sfeerfoto-yogamat-opgerold-01-crop.png"
                alt="Sfeerfoto van handen die een yogamat oprollen"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE: FAQ */}
      <section className="page-section section-white section-centered">
        <div className="container-narrow">
          <p className="heading-overline mb-text">Veelgestelde vragen</p>
          <h2 className="heading-h2 accent-terracotta mb-heading">Nog vragen?</h2>
          <div className="faq-lijst">

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Waarom zijn er twee verschillende tarieven?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p className="text-body mb-text">
                  Bij Private Yoga at Home werken we met twee ervaringsniveaus: Startende yogadocenten en Ervaren yogadocenten. Zo kun je een docent kiezen die past bij jouw wensen én budget.
                </p>
                <p className="text-body">
                  Welke docent je ook kiest, iedere docent op Private Yoga at Home voldoet aan dezelfde kwaliteitseisen. Het verschil zit niet in de kwaliteit, maar in de hoeveelheid ervaring en eventuele specialisaties.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Wat is het verschil tussen een startende en een ervaren yogadocent?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p className="text-body mb-text">
                  Een startende yogadocent heeft een erkende yogaopleiding afgerond, beschikt over praktijkervaring en bouwt zijn of haar lessenpraktijk verder uit.
                </p>
                <p className="text-body">
                  Een ervaren yogadocent heeft meerdere jaren leservaring en heeft zich vaak verder gespecialiseerd, bijvoorbeeld in yin yoga, ademwerk, zwangerschap of rug- en nekklachten. Door die ervaring kan de docent lessen nog sneller afstemmen op jouw persoonlijke situatie.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Hoe weet ik dat een startende yogadocent goed genoeg is?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p className="text-body mb-text">
                  Alle docenten op Private Yoga at Home worden zorgvuldig geselecteerd voordat zij zich bij het platform kunnen aansluiten.
                </p>
                <p className="text-body mb-text">
                  Iedere docent heeft een erkende yogaopleiding afgerond, beschikt over praktijkervaring en voldoet aan onze kwaliteitsrichtlijnen. Daarnaast beoordelen we iedere docent op professionaliteit, persoonlijke begeleiding en de manier waarop hij of zij lesgeeft.
                </p>
                <p className="text-body">
                  Zo kun je erop vertrouwen dat je altijd les krijgt van een gekwalificeerde yogadocent.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Waarom kost privé yoga aan huis meer dan een groepsles?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p className="text-body mb-text">
                  Bij een privé yogales betaal je niet alleen voor het uur waarin de les plaatsvindt. Iedere les wordt afgestemd op jouw lichaam, ervaring en persoonlijke doelen, zodat je begeleiding krijgt die echt bij je past.
                </p>
                <p className="text-body mb-text">
                  Daarnaast reist de docent naar jouw huis, wordt er tijd besteed aan de voorbereiding van de les en krijg je tijdens de les de volledige aandacht van één docent. Je hoeft zelf de deur niet uit en kunt yoga beoefenen in je eigen vertrouwde omgeving.
                </p>
                <p className="text-body">
                  Alle genoemde tarieven zijn inclusief 21% btw.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Zijn de tarieven inclusief btw?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <p className="text-body faq-answer">
                Ja. Alle tarieven op onze website zijn inclusief 21% btw. Zo weet je vooraf precies waar je aan toe bent.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h4 className="heading-h4">Welke yogadocent past het beste bij mij?</h4>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p className="text-body mb-text">
                  Dat hangt af van jouw wensen en voorkeuren. Zoek je een toegankelijke manier om kennis te maken met privé yoga? Dan kan een startende yogadocent een mooie keuze zijn.
                </p>
                <p className="text-body mb-text">
                  Heb je een specifieke hulpvraag of geef je de voorkeur aan iemand met veel praktijkervaring en aanvullende specialisaties? Dan past een ervaren yogadocent mogelijk beter bij jou.
                </p>
                <p className="text-body">
                  Op de pagina De Docenten lees je meer over de achtergrond, ervaring en specialisaties van iedere docent, zodat je een keuze kunt maken die bij jou past.
                </p>
              </div>
            </details>

          </div>
        </div>
      </section>
    </>
  );
}
