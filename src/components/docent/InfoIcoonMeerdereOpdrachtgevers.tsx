"use client";

import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";

interface Props {
  docentId: string;
  bevestigdOp: string | null;
}

export default function InfoIcoonMeerdereOpdrachtgevers({ docentId, bevestigdOp: bevestigdOpInitieel }: Props) {
  const [open, setOpen] = useState(false);
  const [bevestigdOp, setBevestigdOp] = useState(bevestigdOpInitieel);
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState("");

  const openen = () => {
    setOpen(true);
    // Geen enkele actie van de Docent vereist voor deze registratie — puur logging
    // dat de content zichtbaar is geweest. Blokkeert het openen niet bij een fout.
    fetch(`/api/docent/${docentId}/info-meerdere-opdrachtgevers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actie: "geopend" }),
    }).catch((error) => console.error("[info-meerdere-opdrachtgevers] Loggen mislukt:", error));
  };

  const bevestigen = async () => {
    setFout("");
    setBezig(true);
    try {
      const res = await fetch(`/api/docent/${docentId}/info-meerdere-opdrachtgevers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actie: "bevestigd" }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setFout(data?.error ?? "Er ging iets mis. Probeer het opnieuw.");
        setBezig(false);
        return;
      }

      setBevestigdOp(data?.bevestigd_op ?? new Date().toISOString());
      setBezig(false);
    } catch {
      setFout("Er ging iets mis. Probeer het opnieuw.");
      setBezig(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="info-icoon-knop"
        onClick={openen}
        aria-label="Meer informatie over werken voor meerdere opdrachtgevers"
      >
        <Info size={20} strokeWidth={2} />
      </button>

      {open && (
        <div className="info-modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="info-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-meerdere-opdrachtgevers-titel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="info-modal-sluiten"
              onClick={() => setOpen(false)}
              aria-label="Sluiten"
            >
              <X size={20} strokeWidth={2} />
            </button>

            <h3 id="info-meerdere-opdrachtgevers-titel" className="heading-h3 mb-heading">
              Werken voor meerdere opdrachtgevers: waarom dit ook voor jou belangrijk is
            </h3>

            <p className="text-body mb-text">
              Als zelfstandig yogadocent is het belangrijk dat je ook in de praktijk als ondernemer werkzaam bent.
              Dat betekent onder andere dat je vrij bent om naast PYAH voor eigen klanten, andere opdrachtgevers of
              andere platforms te werken.
            </p>

            <p className="text-body mb-text">
              Bij de beoordeling van een arbeidsrelatie wordt gekeken naar alle omstandigheden van de samenwerking.
              Daarnaast kan onder bepaalde voorwaarden sprake zijn van een zogenoemde fictieve dienstbetrekking voor
              gelijkgestelden. Daarbij speelt onder meer een grens van gemiddeld ten minste twee werkdagen per week
              voor dezelfde opdrachtgever een rol. Deze grens staat niet op zichzelf: ook andere wettelijke
              voorwaarden en jouw positie als zelfstandig ondernemer worden meegenomen.
            </p>

            <p className="text-body mb-text">Om jouw zelfstandige positie te ondersteunen, adviseren we je om:</p>

            <ul className="text-body mb-text">
              <li>ook buiten PYAH actief te blijven als zelfstandig yogadocent;</li>
              <li>waar mogelijk voor verschillende klanten of opdrachtgevers te werken;</li>
              <li>jezelf zelfstandig te presenteren en eigen klanten te blijven werven;</li>
              <li>je bedrijfsgegevens en administratie actueel te houden;</li>
              <li>zelf in de gaten te houden hoe structureel en hoe vaak je via PYAH werkt.</li>
            </ul>

            <p className="text-body mb-text">
              Het hebben van meerdere opdrachtgevers vormt op zichzelf geen garantie dat je als zelfstandig
              ondernemer wordt aangemerkt. Uiteindelijk is vooral bepalend hoe je onderneming en de samenwerking in
              de praktijk zijn ingericht.
            </p>

            <p className="text-body">
              Twijfel je over jouw persoonlijke situatie? Bespreek dit dan met je eigen juridisch of fiscaal
              adviseur. PYAH kan jouw individuele positie niet beoordelen, maar vindt het belangrijk je hierover
              tijdig te informeren.
            </p>

            {!bevestigdOp && (
              <div className="info-modal-footer">
                {fout && <p className="form-error mb-text">{fout}</p>}
                <button type="button" className="btn-light" disabled={bezig} onClick={bevestigen}>
                  {bezig ? "Bezig…" : "Ik heb dit gelezen"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
