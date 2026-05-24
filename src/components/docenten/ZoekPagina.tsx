"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, ChevronDown } from "lucide-react";

const ZoekKaart = dynamic(() => import("./ZoekKaart"), { ssr: false });
import type { Docent } from "@/lib/testdata";
import { getStartprijs } from "@/lib/testdata";

const RUSTIGE_STIJLEN = ["Yin yoga", "Restorative", "Yoga Nidra", "Hatha"];
const ACTIEVE_STIJLEN = ["Vinyasa", "Slow Flow", "Ashtanga", "Power yoga", "Iyengar", "Kundalini"];
const ALLE_SPECIALISMEN = [
  "Stress & herstel", "Burn-out", "Blessures", "Zwangerschap",
  "Postnataal", "Menopauze", "Senioren", "Nek- & rugklachten", "HSP", "Beginners",
];

type ActiveFilter = { label: string; type: "stijl" | "specialisme" | "niveau" };
type OpenDropdown = null | "niveau" | "rustig" | "actief" | "specialisme";

export default function ZoekPagina({ docenten, locatie: initLocatie = "" }: { docenten: Docent[], locatie?: string }) {
  const router = useRouter();
  const [locatieInput, setLocatieInput] = useState(initLocatie);
  const [locatie, setLocatie] = useState(initLocatie);
  const [kaartOpen, setKaartOpen] = useState(false);
  const [niveau, setNiveau] = useState<"" | "startend" | "ervaren">("");
  const [stijlFilter, setStijlFilter] = useState<Set<string>>(new Set());
  const [specialismeFilter, setSpecialismeFilter] = useState<Set<string>>(new Set());
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  function toggleDropdown(name: OpenDropdown) {
    setOpenDropdown(prev => prev === name ? null : name);
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

  const rustigActief = Array.from(stijlFilter).some(s => RUSTIGE_STIJLEN.includes(s));
  const actiefActief = Array.from(stijlFilter).some(s => ACTIEVE_STIJLEN.includes(s));

  return (
    <div className="zoek-pagina-wrapper">

      {/* Titel */}
      <div className="zoek-titel-sectie">
        <div className="container">
          <h1 className="heading-h1">
            {locatie ? `Docenten in ${locatie}` : "Alle docenten in regio Haarlem"}
          </h1>
        </div>
      </div>

      {/* Topbar: postcode + zoek + toon kaart */}
      <div className="zoek-topbar-v2">
        <div className="container">
          <div className="zoek-topbar-inner">
            {/* Postcode + zoek + locatie-pill */}
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
            {locatie && (
              <div className="loc-pill" onClick={clearLocatie}>
                <MapPin size={13} />
                <span>{locatie}</span>
                <span>×</span>
              </div>
            )}

            <div className="zoek-topbar-scheiding" />

            {/* Toon kaart — zelfde stijl als Zoek-knop */}
            <button
              className={`pc-knop${kaartOpen ? " gereed" : ""}`}
              onClick={() => setKaartOpen(!kaartOpen)}
            >
              {kaartOpen ? "Verberg kaart" : "Toon kaart"}
            </button>
          </div>
        </div>
      </div>

      {/* Filter bar: 4 dropdowns gecentreerd */}
      <div className="filter-bar-sectie" ref={filterBarRef}>
        <div className="container">
          <div className="filter-bar-inner">

            {/* ERVARINGSNIVEAU */}
            <div className="filter-dd-wrapper">
              <button
                className={`filter-dd-trigger${niveau ? " filter-dd-actief" : ""}`}
                onClick={() => toggleDropdown("niveau")}
              >
                Ervaringsniveau
                <ChevronDown
                  size={13}
                  className={`filter-dd-chevron${openDropdown === "niveau" ? " open" : ""}`}
                />
              </button>
              {openDropdown === "niveau" && (
                <div className="filter-dd-menu">
                  {(["startend", "ervaren"] as const).map(n => (
                    <button
                      key={n}
                      className={`filter-dd-optie${niveau === n ? " actief" : ""}`}
                      onClick={() => setNiveau(niveau === n ? "" : n)}
                    >
                      {n === "startend" ? "Startend" : "Ervaren"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* YOGASTIJL – RUSTIG */}
            <div className="filter-dd-wrapper">
              <button
                className={`filter-dd-trigger${rustigActief ? " filter-dd-actief" : ""}`}
                onClick={() => toggleDropdown("rustig")}
              >
                Yogastijl – Rustig
                <ChevronDown
                  size={13}
                  className={`filter-dd-chevron${openDropdown === "rustig" ? " open" : ""}`}
                />
              </button>
              {openDropdown === "rustig" && (
                <div className="filter-dd-menu">
                  {RUSTIGE_STIJLEN.map(s => (
                    <label key={s} className="filter-dd-check">
                      <input type="checkbox" checked={stijlFilter.has(s)} onChange={() => toggleStijl(s)} />
                      {s}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* YOGASTIJL – ACTIEF */}
            <div className="filter-dd-wrapper">
              <button
                className={`filter-dd-trigger${actiefActief ? " filter-dd-actief" : ""}`}
                onClick={() => toggleDropdown("actief")}
              >
                Yogastijl – Actief
                <ChevronDown
                  size={13}
                  className={`filter-dd-chevron${openDropdown === "actief" ? " open" : ""}`}
                />
              </button>
              {openDropdown === "actief" && (
                <div className="filter-dd-menu">
                  {ACTIEVE_STIJLEN.map(s => (
                    <label key={s} className="filter-dd-check">
                      <input type="checkbox" checked={stijlFilter.has(s)} onChange={() => toggleStijl(s)} />
                      {s}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* SPECIALISME */}
            <div className="filter-dd-wrapper">
              <button
                className={`filter-dd-trigger${specialismeFilter.size > 0 ? " filter-dd-actief" : ""}`}
                onClick={() => toggleDropdown("specialisme")}
              >
                Specialisme
                <ChevronDown
                  size={13}
                  className={`filter-dd-chevron${openDropdown === "specialisme" ? " open" : ""}`}
                />
              </button>
              {openDropdown === "specialisme" && (
                <div className="filter-dd-menu">
                  {ALLE_SPECIALISMEN.map(s => (
                    <label key={s} className="filter-dd-check">
                      <input type="checkbox" checked={specialismeFilter.has(s)} onChange={() => toggleSpecialisme(s)} />
                      {s}
                    </label>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Kaartpaneel */}
      <div className={`kaart-paneel${kaartOpen ? " open" : ""}`}>
        <ZoekKaart docenten={resultaten} />
      </div>

      {/* Resultaten */}
      <div className="zoek-resultaten-wrapper">
        <div className="container">

          {/* Actieve filter chips */}
          {actieveFilters.length > 0 && (
            <div className="actieve-filters-rij">
              {actieveFilters.map(f => (
                <span key={f.label} className="actieve-chip-v2">
                  {f.label}
                  <button onClick={() => removeFilter(f)}>×</button>
                </span>
              ))}
              <button className="wis-filters-knop" onClick={clearAll}>Wis filters</button>
            </div>
          )}

          {/* Resultaattelling */}
          <p className="text-small" style={{ marginBottom: "16px", color: "#484f47" }}>
            {resultaten.length} gevonden
          </p>

          {resultaten.length > 0 ? (
            <div className="kaartjes-grid-v2">
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
    </div>
  );
}
