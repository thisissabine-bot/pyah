"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin } from "lucide-react";

const ZoekKaart = dynamic(() => import("./ZoekKaart"), { ssr: false });
import type { Docent } from "@/lib/testdata";
import { getStartprijs } from "@/lib/testdata";

const RUSTIGE_STIJLEN = ["Yin yoga", "Restorative", "Yoga Nidra", "Hatha"];
const ACTIEVE_STIJLEN = ["Vinyasa", "Slow Flow"];
const MEER_STIJLEN = ["Ashtanga", "Power yoga", "Iyengar", "Kundalini"];
const BASIS_SPECIALISMEN = ["Stress & herstel", "Burn-out", "Blessures", "Zwangerschap"];
const MEER_SPECIALISMEN = ["Postnataal", "Menopauze", "Senioren", "Nek- & rugklachten", "HSP", "Beginners"];

type ActiveFilter = { label: string; type: "stijl" | "specialisme" | "niveau" };

export default function ZoekPagina({ docenten, locatie: initLocatie = "" }: { docenten: Docent[], locatie?: string }) {
  const router = useRouter();
  const [locatieInput, setLocatieInput] = useState(initLocatie);
  const [locatie, setLocatie] = useState(initLocatie);
  const [kaartOpen, setKaartOpen] = useState(false);
  const [niveau, setNiveau] = useState<"" | "startend" | "ervaren">("");
  const [stijlFilter, setStijlFilter] = useState<Set<string>>(new Set());
  const [specialismeFilter, setSpecialismeFilter] = useState<Set<string>>(new Set());
  const [meerStijlen, setMeerStijlen] = useState(false);
  const [meerSpecialismen, setMeerSpecialismen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [gridCols, setGridCols] = useState(5);

  useEffect(() => {
    function updateCols() {
      const w = window.innerWidth;
      if (w < 640) setGridCols(2);
      else if (w < 1280) setGridCols(3);
      else setGridCols(5);
    }
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  function applyLocatie(value: string) {
    setLocatie(value);
    const params = value ? `?locatie=${encodeURIComponent(value)}` : "";
    router.push(`/docenten${params}`);
  }

  function clearLocatie() {
    setLocatieInput("");
    applyLocatie("");
  }

  function toggleStijl(s: string) {
    setStijlFilter(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });
  }

  function toggleSpecialisme(s: string) {
    setSpecialismeFilter(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });
  }

  function removeFilter(f: ActiveFilter) {
    if (f.type === "stijl") toggleStijl(f.label);
    if (f.type === "specialisme") toggleSpecialisme(f.label);
    if (f.type === "niveau") setNiveau("");
  }

  function clearAll() {
    setStijlFilter(new Set());
    setSpecialismeFilter(new Set());
    setNiveau("");
  }

  const actieveFilters = useMemo<ActiveFilter[]>(() => {
    const tags: ActiveFilter[] = [];
    stijlFilter.forEach(s => tags.push({ label: s, type: "stijl" }));
    specialismeFilter.forEach(s => tags.push({ label: s, type: "specialisme" }));
    if (niveau) tags.push({ label: niveau === "startend" ? "Startend" : "Ervaren", type: "niveau" });
    return tags;
  }, [stijlFilter, specialismeFilter, niveau]);

  const resultaten = useMemo(() => {
    const filtered = docenten.filter(d => {
      if (locatie && !d.locatie.toLowerCase().includes(locatie.toLowerCase())) return false;
      if (niveau && d.ervaringsniveau !== niveau) return false;
      if (stijlFilter.size > 0 && !Array.from(stijlFilter).some(s => d.yogastijlen.includes(s))) return false;
      if (specialismeFilter.size > 0 && !Array.from(specialismeFilter).some(s => d.specialisaties.includes(s))) return false;
      return true;
    });
    return [...filtered].sort((a, b) =>
      a.ervaringsniveau === "ervaren" && b.ervaringsniveau !== "ervaren" ? -1 :
      b.ervaringsniveau === "ervaren" && a.ervaringsniveau !== "ervaren" ? 1 : 0
    );
  }, [docenten, locatie, niveau, stijlFilter, specialismeFilter]);

  return (
    <div className="zoek-pagina-wrapper">

      {/* Titel */}
      <div className="text-center px-4 sm:px-8 xl:px-16" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
        <h1 className="heading-h1">
          {locatie ? `Docenten in ${locatie}` : "Alle docenten in regio Haarlem"}
        </h1>
      </div>

      {/* Balk: locatie + filters + kaart-toggle */}
      <div className="zoek-topbar px-4 sm:px-8 xl:px-16" style={{ borderTop: "1px solid #d4baad", borderBottom: "1px solid #d4baad", paddingTop: "10px", paddingBottom: "10px" }}>

        {/* Links: Locatie-invoer + actieve filters */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                className="pc-invoer"
                type="text"
                placeholder="Stad of postcode"
                value={locatieInput}
                onChange={e => setLocatieInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && applyLocatie(locatieInput)}
                style={{ width: "140px" }}
              />
              <button
                className={`pc-knop${locatieInput ? " gereed" : ""}`}
                onClick={() => applyLocatie(locatieInput)}
              >
                Zoek
              </button>
            </div>
            {locatie && (
              <div className="loc-pill" onClick={clearLocatie}>
                <MapPin size={13} />
                <span>{locatie}</span>
                <span>×</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn-light" onClick={() => setFilterPanelOpen(!filterPanelOpen)}>
              {filterPanelOpen ? "Minder filters" : "Filters"}
            </button>
            {actieveFilters.map(f => (
              <span key={f.label} className="actieve-chip">
                {f.label}
                <button onClick={() => removeFilter(f)}>×</button>
              </span>
            ))}
            {actieveFilters.length > 0 && (
              <button className="meer-knop" style={{ marginTop: 0 }} onClick={clearAll}>Wis alles</button>
            )}
          </div>
        </div>

        {/* Midden: intro-tekst (tablet/desktop) */}
        {gridCols > 2 && (
          <p className="heading-h3 accent-moss" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
            Zoek op de yogastijl of specialisme die jij op dit moment nodig hebt en vind jouw docent.
          </p>
        )}
        {gridCols <= 2 && <div />}

        {/* Rechts: Toon kaart */}
        <label className="kaart-toggle">
          <div
            className={`toggle-track${kaartOpen ? " aan" : ""}`}
            onClick={() => setKaartOpen(!kaartOpen)}
          >
            <div className="toggle-knop" />
          </div>
          Toon kaart
        </label>
      </div>

      {/* Uitklapbaar filterpaneel */}
      {filterPanelOpen && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #ebe3e0" }}>
          <div>
            <p className="sb-titel">Ervaringsniveau</p>
            <label className="filter-rij">
              <input type="checkbox" checked={niveau === "startend"} onChange={() => setNiveau(niveau === "startend" ? "" : "startend")} />
              Startend
            </label>
            <label className="filter-rij">
              <input type="checkbox" checked={niveau === "ervaren"} onChange={() => setNiveau(niveau === "ervaren" ? "" : "ervaren")} />
              Ervaren
            </label>
          </div>
          <div>
            <p className="sb-titel">Yogastijl — rustig</p>
            {RUSTIGE_STIJLEN.map(s => (
              <label key={s} className="filter-rij">
                <input type="checkbox" checked={stijlFilter.has(s)} onChange={() => toggleStijl(s)} />
                {s}
              </label>
            ))}
          </div>
          <div>
            <p className="sb-titel">Yogastijl — actief</p>
            {ACTIEVE_STIJLEN.map(s => (
              <label key={s} className="filter-rij">
                <input type="checkbox" checked={stijlFilter.has(s)} onChange={() => toggleStijl(s)} />
                {s}
              </label>
            ))}
            {meerStijlen && MEER_STIJLEN.map(s => (
              <label key={s} className="filter-rij">
                <input type="checkbox" checked={stijlFilter.has(s)} onChange={() => toggleStijl(s)} />
                {s}
              </label>
            ))}
            <button className="meer-knop" onClick={() => setMeerStijlen(!meerStijlen)}>
              {meerStijlen ? "– minder" : "+ meer stijlen"}
            </button>
          </div>
          <div>
            <p className="sb-titel">Specialisme</p>
            {BASIS_SPECIALISMEN.map(s => (
              <label key={s} className="filter-rij">
                <input type="checkbox" checked={specialismeFilter.has(s)} onChange={() => toggleSpecialisme(s)} />
                {s}
              </label>
            ))}
            {meerSpecialismen && MEER_SPECIALISMEN.map(s => (
              <label key={s} className="filter-rij">
                <input type="checkbox" checked={specialismeFilter.has(s)} onChange={() => toggleSpecialisme(s)} />
                {s}
              </label>
            ))}
            <button className="meer-knop" onClick={() => setMeerSpecialismen(!meerSpecialismen)}>
              {meerSpecialismen ? "– minder" : "+ meer specialismen"}
            </button>
          </div>
        </div>
      )}

      {/* Kaartpaneel */}
      <div className={`kaart-paneel${kaartOpen ? " open" : ""}`}>
        <ZoekKaart docenten={resultaten} />
      </div>

      {/* Resultaten */}
      <div className="px-4 py-6 sm:px-8 sm:py-8 xl:px-16 xl:py-12">
        <div className="resultaten-kop">
          <span className="text-small">{resultaten.length} gevonden</span>
        </div>

        {resultaten.length > 0 ? (
          <div className="kaartjes-grid">
            {resultaten.map(docent => {
              const initials = docent.naam.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
              const ervaren = docent.ervaringsniveau === "ervaren";
              return (
                <Link
                  key={docent.id}
                  href={`/docenten/${docent.slug}?terug=${encodeURIComponent(locatie)}`}
                  className={`kaartje${ervaren ? " kaartje-ervaren" : ""}`}
                >
                  <div className="kaartje-foto">
                    {docent.foto_url
                      ? <img src={docent.foto_url} alt={docent.naam} />
                      : <div className="kaartje-initialen">{initials}</div>
                    }
                    {ervaren && (
                      <div className="kaartje-badge">Ervaren</div>
                    )}
                  </div>
                  <div className="kaartje-body">
                    <p className="kaartje-naam">{docent.naam}</p>
                    <p className="kaartje-stijl">{docent.yogastijlen.slice(0, 2).join(" · ")}</p>
                    <div className="kaartje-footer">
                      <span className="kaartje-prijs">
                        v.a. <strong>€{(getStartprijs(docent) / 100).toFixed(0)}</strong>
                      </span>
                      <span className={docent.reisafstand_km <= 10 ? "afstand-ok" : "afstand-ver"}>
                        {docent.reisafstand_km} km
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ paddingTop: "32px" }}>
            <p className="heading-h3 mb-text">Geen resultaten</p>
            <p className="text-body mb-cta">Probeer andere filters.</p>
            <button className="btn-light" onClick={clearAll}>Filters wissen</button>
          </div>
        )}
      </div>
    </div>
  );
}
