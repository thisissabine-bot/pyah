import Link from "next/link";
import { Search, Home, Star, Shield, Heart } from "lucide-react";
import DocentCard from "@/components/docenten/DocentCard";
import { DOCENTEN_TESTDATA } from "@/lib/testdata";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-pyah-licht">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-pyah-diep leading-tight mb-6">
              Yoga in de rust
              <br />
              van je eigen huis
            </h1>
            <p className="text-lg text-pyah-donker/80 mb-8 leading-relaxed">
              Ontdek een zorgvuldig geselecteerde yogadocent die bij jou
              thuiskomt. Persoonlijk, professioneel en helemaal op jouw tempo.
            </p>
            <Link
              href="/docenten"
              className="inline-flex items-center gap-2 bg-pyah-accent text-white px-7 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity"
            >
              <Search size={18} />
              Vind jouw yogadocent
            </Link>
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold text-pyah-diep mb-12 text-center">
          Zo werkt het
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              stap: "1",
              icon: <Search size={24} className="text-pyah-accent" />,
              titel: "Zoek een docent",
              omschrijving:
                "Blader door onze geselecteerde yogadocenten en filter op stijl, locatie of niveau.",
            },
            {
              stap: "2",
              icon: <Heart size={24} className="text-pyah-accent" />,
              titel: "Boek een kennismakingsles",
              omschrijving:
                "Maak kennis via een introductieles van 75 minuten. Zo weet je of de docent bij je past.",
            },
            {
              stap: "3",
              icon: <Home size={24} className="text-pyah-accent" />,
              titel: "Les aan huis",
              omschrijving:
                "De docent komt bij jou thuis. Geen reistijd, geen gedoe — gewoon yoga in jouw vertrouwde omgeving.",
            },
          ].map(({ stap, icon, titel, omschrijving }) => (
            <div key={stap} className="text-center">
              <div className="w-14 h-14 bg-pyah-licht rounded-2xl flex items-center justify-center mx-auto mb-4">
                {icon}
              </div>
              <h3 className="font-semibold text-pyah-diep text-lg mb-2">{titel}</h3>
              <p className="text-pyah-donker/70 text-sm leading-relaxed">{omschrijving}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured docenten */}
      <section className="bg-white border-t border-pyah-zacht/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-pyah-diep">
              Maak kennis met onze docenten
            </h2>
            <Link
              href="/docenten"
              className="hidden sm:block text-sm text-pyah-accent hover:underline"
            >
              Alle docenten bekijken →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCENTEN_TESTDATA.map((docent) => (
              <DocentCard
                key={docent.id}
                naam={docent.naam}
                slug={docent.slug}
                locatie={docent.locatie}
                yogastijlen={docent.yogastijlen}
                startprijs_cent={docent.startprijs_cent}
                foto_url={docent.foto_url}
              />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/docenten" className="text-sm text-pyah-accent hover:underline">
              Alle docenten bekijken →
            </Link>
          </div>
        </div>
      </section>

      {/* Waarom PYAH */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold text-pyah-diep mb-12 text-center">
          Waarom Private Yoga at Home?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield size={24} className="text-pyah-accent" />,
              titel: "Zorgvuldig geselecteerd",
              omschrijving:
                "Elke docent is persoonlijk beoordeeld op opleiding, ervaring en aanpak. Geen onbekenden aan je deur.",
            },
            {
              icon: <Star size={24} className="text-pyah-accent" />,
              titel: "Volledig persoonlijk",
              omschrijving:
                "Een privéles is helemaal afgestemd op jou — jouw lichaam, jouw doelen, jouw tempo.",
            },
            {
              icon: <Home size={24} className="text-pyah-accent" />,
              titel: "In je eigen omgeving",
              omschrijving:
                "Geen reistijd, geen kleedkamers. Gewoon yoga in de ruimte waar jij je het prettigst voelt.",
            },
          ].map(({ icon, titel, omschrijving }) => (
            <div key={titel} className="bg-pyah-licht rounded-2xl p-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                {icon}
              </div>
              <h3 className="font-semibold text-pyah-diep text-lg mb-2">{titel}</h3>
              <p className="text-pyah-donker/70 text-sm leading-relaxed">{omschrijving}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA voor docenten */}
      <section className="bg-pyah-diep text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Ben jij yogadocent?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
            Sluit je aan bij PYAH en bereik klanten die écht op zoek zijn naar
            privélessen aan huis. Wij regelen de boekingen, jij geeft de les.
          </p>
          <Link
            href="/voor-docenten"
            className="inline-block bg-pyah-accent text-white px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Meer over aansluiten
          </Link>
        </div>
      </section>
    </>
  );
}
