"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

const ZoekKaart = dynamic(() => import("./ZoekKaart"), { ssr: false });
import type { Docent } from "@/lib/testdata";
import { getStartprijs } from "@/lib/testdata";

const RUSTIGE_STIJLEN = ["Yin yoga", "Restorative", "Yoga Nidra", "Hatha"];
const ACTIEVE_STIJLEN = ["Vinyasa", "Slow Flow"];
const MEER_STIJLEN = ["Ashtanga", "Power yoga", "Iyengar", "Kundalini"];
const BASIS_SPECIALISMEN = ["Stress & herstel", "Burn-out", "Blessures", "Zwangerschap"];
const MEER_SPECIALISMEN = ["Postnataal", "Menopauze", "Senioren", "Nek- & rugklachten", "HSP", "Beginners"];

function isValidPostcode(v: string): boolean {
  return /^\d{4}\s?[A-Za-z]{2}$/.test(v.trim());
}

function formatPostcode(raw: string): string {
  const cleaned = raw.replace(/\s/g, "");
  const digits = cleaned.slice(0, 4).replace(/\D/g, "");
  const letters = cleaned.slice(4).replace(/[^A-Za-z]/g, "").slice(0, 2);
  return (digits + (letters.length ? " " + letters : "")).toUpperCase();
}

type ActiveFilter = { label: string; type: "stijl" | "specialisme" | "niveau" };

export default function ZoekPagina({ docenten }: { docenten: Docent[] }) {
  const [scherm, setScherm] = useState<"postcode" | "resultaten">("postcode");
  const [postcode, setPostcode] = useState("");
  const [postcodeError, setPostcodeError] = useState(false);
  const [kaartOpen, setKaartOpen] = useState(false);
  const [niveau, setNiveau] = useState<"" | "startend" | "ervaren">("");
  const [stijlFilter, setStijlFilter] = useState<Set<string>>(new Set());
  const [specialismeFilter, setSpecialismeFilter] = useState<Set<string>>(new Set());
  const [meerStijlen, setMeerStijlen] = useState(false);
  const [meerSpecialismen, setMeerSpecialismen] = useState(false);
  const [sortering, setSortering] = useState<"dichtstbij" | "ervaren">("dichtstbij");

  function handlePostcodeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setPostcode(formatPostcode(e.target.value));
    setPostcodeError(false);
  }

  function goSearch() {
    if (postcode && !isValidPostcode(postcode)) {
      setPostcodeError(true);
      return;
    }
    setScherm("resultaten");
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
    let filtered = docenten.filter(d => {
      if (niveau && d.ervaringsniveau !== niveau) return false;
      if (stijlFilter.size > 0 && !Array.from(stijlFilter).some(s => d.yogastijlen.includes(s))) return false;
      if (specialismeFilter.size > 0 && !Array.from(specialismeFilter).some(s => d.specialisaties.includes(s))) return false;
      return true;
    });
    if (sortering === "ervaren") {
      filtered = [...filtered].sort((a, b) =>
        a.ervaringsniveau === "ervaren" && b.ervaringsniveau !== "ervaren" ? -1 :
        b.ervaringsniveau === "ervaren" && a.ervaringsniveau !== "ervaren" ? 1 : 0
      );
    }
    return filtered;
  }, [docenten, niveau, stijlFilter, specialismeFilter, sortering]);

  /* ── SCHERM 1: Postcode ─────────────────────────────────── */
  if (scherm === "postcode") {
    return (
      <div className="zoek-stap1-wrapper">
        <div className="zoek-stap1">
          <p className="heading-overline mb-text">Vind jouw docent</p>
          <h2 className="heading-h2 mb-subtitle">Wat is je postcode?</h2>
          <p className="text-body mb-section">
            We laten je zien welke docenten het dichtst bij jou in de buurt zijn.
          </p>
          <div className="pc-rij">
            <input
              className="pc-invoer"
              type="text"
              maxLength={7}
              placeholder="2011 AB"
              value={postcode}
              onChange={handlePostcodeInput}
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
              autoFocus
            />
            <button
              className={`pc-knop${isValidPostcode(postcode) ? " gereed" : ""}`}
              onClick={goSearch}
            >
              Zoek docenten
            </button>
          </div>
          {postcodeError && (
            <p className="pc-fout">Vul een geldige postcode in (bijv. 2011 AB)</p>
          )}
          <p className="pc-overslaan" onClick={() => setScherm("resultaten")}>
            Ik zoek in de hele regio Haarlem
          </p>
        </div>
      </div>
    );
  }

  /* ── SCHERM 2: Resultaten ───────────────────────────────── */
  return (
    <div>
      {/* Topbar */}
      <div className="zoek-topbar">
        <button className="zoek-terug" onClick={() => setScherm("postcode")}>
          <ArrowLeft size={14} />
          Postcode aanpassen
        </button>
        {postcode && (
          <div className="loc-pill" onClick={() => setScherm("postcode")}>
            <MapPin size={13} />
            <span>{postcode.toUpperCase()}</span>
            <span>×</span>
          </div>
        )}
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

      {/* Kaartpaneel */}
      <div className={`kaart-paneel${kaartOpen ? " open" : ""}`}>
        <ZoekKaart docenten={resultaten} />
      </div>

      {/* Sidebar + resultaten */}
      <div className="zoek-layout">

        {/* Sidebar */}
        <div className="zoek-sidebar">
          <p className="sb-titel">Ervaringsniveau</p>
          <div className="niveau-rij">
            {(["", "startend", "ervaren"] as const).map((val, i) => (
              <button
                key={val || "alle"}
                className={`niveau-knop${niveau === val ? " actief" : ""}`}
                onClick={() => setNiveau(val)}
              >
                {["Alle", "Startend", "Ervaren"][i]}
              </button>
            ))}
          </div>

          <div className="sb-divider" />

          <p className="sb-titel">Yogastijl</p>
          <p className="sb-groep">Rustige yoga</p>
          {RUSTIGE_STIJLEN.map(s => (
            <label key={s} className="filter-rij">
              <input type="checkbox" checked={stijlFilter.has(s)} onChange={() => toggleStijl(s)} />
              {s}
            </label>
          ))}
          <p className="sb-groep" style={{ marginTop: "10px" }}>Actieve yoga</p>
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

          <div className="sb-divider" />

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

          <button className="wis-knop" onClick={clearAll}>Filters wissen</button>
        </div>

        {/* Resultaten */}
        <div className="zoek-resultaten">
          <div className="resultaten-kop">
            <h3 className="heading-h3">
              {postcode ? "Docenten bij jou in de buurt" : "Alle docenten in regio Haarlem"}
            </h3>
            <span className="text-small">{resultaten.length} gevonden</span>
          </div>

          <div className="sorteer-rij">
            <span className="text-small">Sorteren:</span>
            <button
              className={`sorteer-knop${sortering === "dichtstbij" ? " actief" : ""}`}
              onClick={() => setSortering("dichtstbij")}
            >
              Dichtstbij
            </button>
            <button
              className={`sorteer-knop${sortering === "ervaren" ? " actief" : ""}`}
              onClick={() => setSortering("ervaren")}
            >
              Ervaren eerst
            </button>
          </div>

          {actieveFilters.length > 0 && (
            <div className="actieve-chips">
              {actieveFilters.map(f => (
                <span key={f.label} className="actieve-chip">
                  {f.label}
                  <button onClick={() => removeFilter(f)}>×</button>
                </span>
              ))}
            </div>
          )}

          {resultaten.length > 0 ? (
            <div className="kaartjes-grid">
              {resultaten.map(docent => {
                const initials = docent.naam.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                const ervaren = docent.ervaringsniveau === "ervaren";
                return (
                  <Link
                    key={docent.id}
                    href={`/docenten/${docent.slug}`}
                    className={`kaartje${ervaren ? " kaartje-ervaren" : ""}`}
                  >
                    <div className="kaartje-foto">
                      {docent.foto_url
                        ? <img src={docent.foto_url} alt={docent.naam} />
                        : <div className="kaartje-initialen">{initials}</div>
                      }
                      <div className={`kaartje-badge${ervaren ? "" : " kaartje-badge-start"}`}>
                        {ervaren ? "✓ Ervaren" : "Startend"}
                      </div>
                    </div>
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
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{ paddingTop: "32px" }}>
              <p className="heading-h3 mb-text">Geen resultaten</p>
              <p className="text-body mb-cta">Probeer andere filters.</p>
              <button className="btn-3" onClick={clearAll}>Filters wissen</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
