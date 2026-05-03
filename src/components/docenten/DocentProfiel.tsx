import Link from "next/link";
import { MapPin, Clock, Award, BookOpen, ChevronRight } from "lucide-react";
import type { Docent } from "@/lib/testdata";

interface Props {
  docent: Docent;
}

export default function DocentProfiel({ docent }: Props) {
  const initials = docent.naam
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const introductielesAltijd75 = docent.tarieven.find(
    (t) => t.naam === "Introductieles"
  );
  const losseMinuten60 = docent.tarieven.find(
    (t) => t.naam === "Losse les" && t.duur_minuten === 60
  );
  const losseMinuten75 = docent.tarieven.find(
    (t) => t.naam === "Losse les" && t.duur_minuten === 75
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Broodkruimel */}
      <nav className="flex items-center gap-2 text-sm text-pyah-donker/50 mb-8">
        <Link href="/docenten" className="hover:text-pyah-accent transition-colors">
          Docenten
        </Link>
        <ChevronRight size={14} />
        <span className="text-pyah-donker">{docent.naam}</span>
      </nav>

      {/* Hero kaart */}
      <div className="bg-white rounded-3xl border border-pyah-zacht/40 shadow-sm overflow-hidden mb-8">
        <div className="flex flex-col sm:flex-row">
          {/* Foto */}
          <div className="w-full sm:w-64 h-64 sm:h-auto bg-pyah-licht flex-shrink-0 flex items-center justify-center">
            {docent.foto_url ? (
              <img
                src={docent.foto_url}
                alt={docent.naam}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl font-semibold text-pyah-accent/40">
                {initials}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-pyah-diep mb-1">
                {docent.naam}
              </h1>
              <div className="flex items-center gap-1.5 text-pyah-donker/60 text-sm mb-4">
                <MapPin size={14} />
                <span>
                  {docent.locatie} · reist tot {docent.reisafstand_km} km
                </span>
              </div>

              {/* Stijlen */}
              <div className="flex flex-wrap gap-2 mb-4">
                {docent.yogastijlen.map((stijl) => (
                  <span
                    key={stijl}
                    className="text-xs bg-pyah-licht text-pyah-accent border border-pyah-zacht px-3 py-1 rounded-full"
                  >
                    {stijl}
                  </span>
                ))}
              </div>

              {/* Kwalificaties */}
              <div className="flex flex-wrap gap-4 text-sm text-pyah-donker/70">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-pyah-accent/70" />
                  {docent.jaren_ervaring} jaar ervaring
                </span>
                <span className="flex items-center gap-1.5">
                  <Award size={14} className="text-pyah-accent/70" />
                  {docent.certificering}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-pyah-accent text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Plan een kennismakingsgesprek
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Linkerkolom: bio + details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Bio */}
          <section className="bg-white rounded-2xl border border-pyah-zacht/40 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-pyah-diep mb-4">Over {docent.naam.split(" ")[0]}</h2>
            <div className="text-pyah-donker/80 text-sm leading-relaxed space-y-3">
              {docent.bio.split("\n\n").map((alinea, i) => (
                <p key={i}>{alinea}</p>
              ))}
            </div>
          </section>

          {/* Specialisaties */}
          {docent.specialisaties.length > 0 && (
            <section className="bg-white rounded-2xl border border-pyah-zacht/40 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-pyah-diep mb-4">Specialisaties</h2>
              <div className="flex flex-wrap gap-2">
                {docent.specialisaties.map((spec) => (
                  <span
                    key={spec}
                    className="text-sm bg-pyah-licht text-pyah-donker border border-pyah-zacht px-3 py-1.5 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Opleiding */}
          <section className="bg-white rounded-2xl border border-pyah-zacht/40 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-pyah-diep mb-4">
              Opleiding &amp; certificering
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <BookOpen size={16} className="text-pyah-accent/70 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-pyah-donker">Opleiding</p>
                  <p className="text-sm text-pyah-donker/70">{docent.opleiding}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award size={16} className="text-pyah-accent/70 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-pyah-donker">Certificering</p>
                  <p className="text-sm text-pyah-donker/70">{docent.certificering}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews placeholder */}
          <section className="bg-white rounded-2xl border border-pyah-zacht/40 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-pyah-diep mb-4">Ervaringen</h2>
            <p className="text-sm text-pyah-donker/50 italic">
              Na afloop van een les kunnen klanten een review achterlaten. Dit profiel heeft nog
              geen reviews.
            </p>
          </section>
        </div>

        {/* Rechterkolom: tarieven + boeking */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-pyah-zacht/40 shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-pyah-diep mb-5">Tarieven</h2>

            <div className="flex flex-col gap-3">
              {/* Introductieles */}
              {introductielesAltijd75 && (
                <div className="rounded-xl border border-pyah-zacht bg-pyah-licht/50 p-4">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm font-semibold text-pyah-diep">Introductieles</span>
                    <span className="text-sm font-semibold text-pyah-accent">
                      €{(introductielesAltijd75.prijs_cent / 100).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-xs text-pyah-donker/60">
                    75 minuten · eenmalig kennismaken
                  </p>
                </div>
              )}

              {/* Losse lessen */}
              <div className="rounded-xl border border-pyah-zacht p-4">
                <p className="text-sm font-semibold text-pyah-diep mb-3">Losse les</p>
                <div className="flex flex-col gap-2">
                  {losseMinuten60 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pyah-donker/70">60 minuten</span>
                      <span className="text-sm font-medium text-pyah-donker">
                        €{(losseMinuten60.prijs_cent / 100).toFixed(0)}
                      </span>
                    </div>
                  )}
                  {losseMinuten75 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pyah-donker/70">75 minuten</span>
                      <span className="text-sm font-medium text-pyah-donker">
                        €{(losseMinuten75.prijs_cent / 100).toFixed(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Uitleg commissie */}
            <p className="text-xs text-pyah-donker/40 mt-4 leading-relaxed">
              Betaling verloopt veilig via PYAH. Je ontvangt een bevestiging per e-mail.
            </p>

            {/* CTA */}
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-5 bg-pyah-accent text-white py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              Boek een kennismakingsgesprek
            </a>
            <Link
              href="/docenten"
              className="block w-full text-center mt-3 border border-pyah-zacht text-pyah-donker py-3 rounded-full text-sm hover:bg-pyah-licht transition-colors"
            >
              ← Terug naar overzicht
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
