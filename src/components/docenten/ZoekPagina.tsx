"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import DocentCard from "./DocentCard";
import type { Docent } from "@/lib/testdata";
import { ALLE_YOGASTIJLEN, ALLE_LOCATIES, getStartprijs } from "@/lib/testdata";

interface Props {
  docenten: Docent[];
}

export default function ZoekPagina({ docenten }: Props) {
  const [zoekterm, setZoekterm] = useState("");
  const [stijlFilter, setStijlFilter] = useState<string[]>([]);
  const [locatieFilter, setLocatieFilter] = useState("");
  const [niveauFilter, setNiveauFilter] = useState<"" | "startend" | "ervaren">(
    ""
  );
  const [filterOpen, setFilterOpen] = useState(false);

  const resultaten = useMemo(() => {
    return docenten.filter((d) => {
      if (
        zoekterm &&
        !d.naam.toLowerCase().includes(zoekterm.toLowerCase()) &&
        !d.locatie.toLowerCase().includes(zoekterm.toLowerCase())
      )
        return false;
      if (
        stijlFilter.length > 0 &&
        !stijlFilter.some((s) => d.yogastijlen.includes(s))
      )
        return false;
      if (locatieFilter && d.locatie !== locatieFilter) return false;
      if (niveauFilter && d.ervaringsniveau !== niveauFilter) return false;
      return true;
    });
  }, [docenten, zoekterm, stijlFilter, locatieFilter, niveauFilter]);

  const actieveFilters =
    stijlFilter.length + (locatieFilter ? 1 : 0) + (niveauFilter ? 1 : 0);

  function toggleStijl(stijl: string) {
    setStijlFilter((prev) =>
      prev.includes(stijl) ? prev.filter((s) => s !== stijl) : [...prev, stijl]
    );
  }

  function resetFilters() {
    setStijlFilter([]);
    setLocatieFilter("");
    setNiveauFilter("");
  }

  const alleStijlen = [
    ...new Set([...ALLE_YOGASTIJLEN, ...docenten.flatMap((d) => d.yogastijlen)]),
  ];
  const alleLocaties = [...new Set([...ALLE_LOCATIES, ...docenten.map((d) => d.locatie)])];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-pyah-diep mb-2">
          Vind jouw yogadocent
        </h1>
        <p className="text-pyah-donker/70">
          Zorgvuldig geselecteerde docenten die bij jou thuis komen.
        </p>
      </div>

      {/* Zoekbalk + filterknop */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-pyah-donker/40 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Zoek op naam of stad…"
            value={zoekterm}
            onChange={(e) => setZoekterm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-pyah-zacht rounded-xl text-sm focus:outline-none focus:border-pyah-accent transition-colors bg-white"
          />
          {zoekterm && (
            <button
              onClick={() => setZoekterm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pyah-donker/40 hover:text-pyah-donker"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm transition-colors ${
            actieveFilters > 0
              ? "bg-pyah-accent text-white border-pyah-accent"
              : "border-pyah-zacht text-pyah-donker hover:border-pyah-accent"
          }`}
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
          {actieveFilters > 0 && (
            <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
              {actieveFilters}
            </span>
          )}
        </button>
      </div>

      {/* Filterpaneel */}
      {filterOpen && (
        <div className="bg-pyah-licht rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <p className="text-xs font-medium text-pyah-donker/60 uppercase tracking-wider mb-2">
              Yogastijl
            </p>
            <div className="flex flex-wrap gap-2">
              {alleStijlen.map((stijl) => (
                <button
                  key={stijl}
                  onClick={() => toggleStijl(stijl)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    stijlFilter.includes(stijl)
                      ? "bg-pyah-accent text-white border-pyah-accent"
                      : "bg-white border-pyah-zacht text-pyah-donker hover:border-pyah-accent"
                  }`}
                >
                  {stijl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-pyah-donker/60 uppercase tracking-wider mb-2">
              Stad
            </p>
            <div className="flex flex-col gap-1.5">
              {["", ...alleLocaties].map((loc) => (
                <button
                  key={loc || "alle"}
                  onClick={() => setLocatieFilter(loc)}
                  className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    locatieFilter === loc
                      ? "bg-pyah-accent text-white"
                      : "hover:bg-pyah-zacht/40 text-pyah-donker"
                  }`}
                >
                  {loc || "Alle steden"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-pyah-donker/60 uppercase tracking-wider mb-2">
              Ervaringsniveau
            </p>
            <div className="flex flex-col gap-1.5">
              {(
                [
                  { val: "" as const, label: "Alle niveaus" },
                  { val: "startend" as const, label: "Startend" },
                  { val: "ervaren" as const, label: "Ervaren" },
                ]
              ).map(({ val, label }) => (
                <button
                  key={val || "alle"}
                  onClick={() => setNiveauFilter(val)}
                  className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    niveauFilter === val
                      ? "bg-pyah-accent text-white"
                      : "hover:bg-pyah-zacht/40 text-pyah-donker"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {actieveFilters > 0 && (
              <button
                onClick={resetFilters}
                className="mt-4 text-xs text-pyah-accent hover:underline"
              >
                Filters wissen
              </button>
            )}
          </div>
        </div>
      )}

      {/* Actieve filter-chips */}
      {actieveFilters > 0 && !filterOpen && (
        <div className="flex flex-wrap gap-2 mb-6">
          {stijlFilter.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1.5 text-xs bg-pyah-licht text-pyah-accent px-3 py-1 rounded-full"
            >
              {s}
              <button onClick={() => toggleStijl(s)}>
                <X size={12} />
              </button>
            </span>
          ))}
          {locatieFilter && (
            <span className="flex items-center gap-1.5 text-xs bg-pyah-licht text-pyah-accent px-3 py-1 rounded-full">
              {locatieFilter}
              <button onClick={() => setLocatieFilter("")}>
                <X size={12} />
              </button>
            </span>
          )}
          {niveauFilter && (
            <span className="flex items-center gap-1.5 text-xs bg-pyah-licht text-pyah-accent px-3 py-1 rounded-full">
              {niveauFilter === "startend" ? "Startend" : "Ervaren"}
              <button onClick={() => setNiveauFilter("")}>
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}

      <p className="text-sm text-pyah-donker/60 mb-6">
        {resultaten.length === 0
          ? "Geen docenten gevonden"
          : resultaten.length === 1
          ? "1 docent gevonden"
          : `${resultaten.length} docenten gevonden`}
      </p>

      {resultaten.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultaten.map((docent) => (
            <DocentCard
              key={docent.id}
              naam={docent.naam}
              slug={docent.slug}
              locatie={docent.locatie}
              yogastijlen={docent.yogastijlen}
              startprijs_cent={getStartprijs(docent)}
              foto_url={docent.foto_url}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-pyah-donker/50">
          <p className="text-lg mb-2">Geen resultaten</p>
          <p className="text-sm">Probeer een andere zoekterm of pas de filters aan.</p>
          {actieveFilters > 0 && (
            <button
              onClick={resetFilters}
              className="mt-4 text-sm text-pyah-accent hover:underline"
            >
              Alle filters wissen
            </button>
          )}
        </div>
      )}
    </div>
  );
}
