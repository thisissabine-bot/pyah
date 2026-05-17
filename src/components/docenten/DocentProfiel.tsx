'use client'

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { BookOpen, Award } from "lucide-react"
import type { Docent } from "@/lib/testdata"

const DocentKaart = dynamic(() => import("./DocentKaart"), { ssr: false })

export default function DocentProfiel({ docent }: { docent: Docent }) {
  const initials = docent.naam.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  const ervaren = docent.ervaringsniveau === "ervaren"

  const introductielesAltijd75 = docent.tarieven.find((t) => t.naam === "Introductieles")
  const losseMinuten60 = docent.tarieven.find((t) => t.naam === "Losse les" && t.duur_minuten === 60)
  const losseMinuten75 = docent.tarieven.find((t) => t.naam === "Losse les" && t.duur_minuten === 75)

  const fotos = docent.foto_url ? [docent.foto_url] : []
  const totalSlots = 6
  const [photoIdx, setPhotoIdx] = useState(0)

  function nextPhoto() {
    setPhotoIdx((i) => (i + 1) % totalSlots)
  }

  function prevPhoto() {
    setPhotoIdx((i) => (i - 1 + totalSlots) % totalSlots)
  }

  const activeIsVideo = photoIdx === 5

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-12 py-10">

      {/* Broodkruimel */}
      <div className="text-xs text-pyah-zacht mb-8 tracking-wide">
        <Link href="/docenten" className="hover:text-pyah-accent transition-colors">← Terug naar docenten</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 items-start [&>*:last-child]:order-first [&>*:last-child]:lg:order-last">

        {/* ── LINKER KOLOM ── */}
        <div>

          {/* 1. Naam + locatie */}
          <h1 className="text-3xl font-bold text-pyah-diep mb-2 leading-tight">{docent.naam}</h1>
          <div className="flex items-center gap-3 text-sm text-pyah-donker/70">
            <span>📍 {docent.locatie}</span>
            <span className="text-pyah-zacht">·</span>
            <span>reist tot {docent.reisafstand_km} km</span>
          </div>

          <hr className="border-t border-pyah-zacht my-7" />

          {/* 2. Fotogalerij */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {[photoIdx, (photoIdx + 1) % totalSlots].map((slot, col) => {
              const isVideo = slot === 5
              return (
                <div
                  key={col}
                  onClick={col === 0 ? prevPhoto : nextPhoto}
                  className="relative aspect-square bg-pyah-licht overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                >
                  {isVideo ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <span className="text-3xl text-pyah-accent">▶</span>
                      <span className="text-xs text-pyah-zacht uppercase tracking-widest">video</span>
                    </div>
                  ) : fotos[slot] ? (
                    <img src={fotos[slot]} alt={docent.naam} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs text-pyah-zacht uppercase tracking-wider">foto {slot + 1}</span>
                    </div>
                  )}
                  <span className="absolute bottom-2 right-2.5 text-[10px] text-pyah-zacht">
                    {slot + 1}/{totalSlots}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Thumbnail strip */}
          <div className="overflow-x-auto pb-1">
            <div className="flex gap-1.5 w-max">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  className={`w-16 h-16 flex-shrink-0 bg-pyah-licht flex items-center justify-center text-[10px] text-pyah-zacht uppercase tracking-wide cursor-pointer hover:opacity-80 transition-opacity border-[1.5px] ${photoIdx === i ? "border-pyah-accent" : "border-transparent"}`}
                >
                  {fotos[i]
                    ? <img src={fotos[i]} alt="" className="w-full h-full object-cover" />
                    : i + 1
                  }
                </div>
              ))}
              <div
                onClick={() => setPhotoIdx(5)}
                className={`w-16 h-16 flex-shrink-0 bg-[#e8e2df] flex items-center justify-center text-lg text-pyah-accent cursor-pointer hover:opacity-80 transition-opacity border-[1.5px] ${photoIdx === 5 ? "border-pyah-accent" : "border-transparent"}`}
              >
                ▶
              </div>
            </div>
          </div>

          <hr className="border-t border-pyah-zacht my-7" />

          {/* 3. Badge + stijlen */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${ervaren ? "bg-pyah-accent text-white" : "bg-pyah-licht text-pyah-donker"}`}>
              {ervaren ? "Ervaren" : "Startend"}
            </span>
            {docent.yogastijlen.map((s) => (
              <span key={s} className="text-xs px-3 py-1 bg-pyah-licht text-pyah-donker rounded-full">{s}</span>
            ))}
            {docent.specialisaties.slice(0, 2).map((s) => (
              <span key={s} className="text-xs px-3 py-1 bg-pyah-licht text-pyah-donker rounded-full">{s}</span>
            ))}
          </div>

          <hr className="border-t border-pyah-zacht my-7" />

          {/* 4. Bio */}
          <p className="text-xs font-semibold uppercase tracking-widest text-pyah-accent mb-4">Over mij</p>
          <div className="text-sm text-pyah-donker/80 leading-relaxed space-y-3">
            {docent.bio.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <hr className="border-t border-pyah-zacht my-7" />

          {/* 5. Opleiding & certificaten */}
          <p className="text-xs font-semibold uppercase tracking-widest text-pyah-accent mb-4">Opleidingen &amp; certificaten</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pyah-licht flex-shrink-0 flex items-center justify-center">
                <BookOpen size={13} className="text-pyah-accent/70" aria-hidden="true" />
              </div>
              <p className="text-sm text-pyah-donker/80">{docent.opleiding}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pyah-licht flex-shrink-0 flex items-center justify-center">
                <Award size={13} className="text-pyah-accent/70" aria-hidden="true" />
              </div>
              <p className="text-sm text-pyah-donker/80">{docent.certificering}</p>
            </div>
          </div>

          <hr className="border-t border-pyah-zacht my-7" />

          {/* 6. Yogastijlen gedetailleerd */}
          <p className="text-xs font-semibold uppercase tracking-widest text-pyah-accent mb-4">Yogastijlen</p>
          <div className="mb-4">
            <p className="text-xs font-medium text-pyah-donker/50 mb-2">Stijlen</p>
            <div className="flex flex-wrap gap-2">
              {docent.yogastijlen.map((s) => (
                <span key={s} className="text-xs px-3 py-1 bg-pyah-licht text-pyah-donker rounded-full">{s}</span>
              ))}
            </div>
          </div>
          {docent.specialisaties.length > 0 && (
            <div>
              <p className="text-xs font-medium text-pyah-donker/50 mb-2">Specialismen</p>
              <div className="flex flex-wrap gap-2">
                {docent.specialisaties.map((s) => (
                  <span key={s} className="text-xs px-3 py-1 bg-pyah-licht text-pyah-donker rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}

          <hr className="border-t border-pyah-zacht my-7" />

          {/* 7. Werkgebied */}
          <p className="text-xs font-semibold uppercase tracking-widest text-pyah-accent mb-4">Werkgebied</p>
          <DocentKaart locatie={docent.locatie} reisafstand_km={docent.reisafstand_km} />
          <p className="text-sm text-pyah-donker/70 mt-3">📍 {docent.locatie} en omgeving</p>
          <p className="text-xs text-pyah-zacht mt-1">Reiskosten: niet van toepassing</p>

          <hr className="border-t border-pyah-zacht my-7" />

          {/* 8. Reviews */}
          <p className="text-xs font-semibold uppercase tracking-widest text-pyah-accent mb-4">Reviews</p>
          <p className="text-sm text-pyah-donker/50 italic">
            Na afloop van een les kunnen klanten een review achterlaten. Dit profiel heeft nog geen reviews.
          </p>

        </div>

        {/* ── RECHTER KOLOM ── */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-pyah-licht p-6">

            <p className="text-sm font-bold text-pyah-diep mb-4">Tarieven</p>

            <div className="flex flex-col">
              {introductielesAltijd75 && (
                <div className="flex justify-between items-baseline py-2 border-b border-pyah-zacht text-sm">
                  <span className="text-pyah-donker/70">Introductieles 75 min.</span>
                  <span className="font-medium text-pyah-donker">€{(introductielesAltijd75.prijs_cent / 100).toFixed(0)}</span>
                </div>
              )}
              {losseMinuten60 && (
                <div className="flex justify-between items-baseline py-2 border-b border-pyah-zacht text-sm">
                  <span className="text-pyah-donker/70">Losse les 60 min.</span>
                  <span className="font-medium text-pyah-donker">€{(losseMinuten60.prijs_cent / 100).toFixed(0)}</span>
                </div>
              )}
              {losseMinuten75 && (
                <div className="flex justify-between items-baseline py-2 text-sm">
                  <span className="text-pyah-donker/70">Losse les 75 min.</span>
                  <span className="font-medium text-pyah-donker">€{(losseMinuten75.prijs_cent / 100).toFixed(0)}</span>
                </div>
              )}
            </div>

            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-5 bg-pyah-accent text-white py-3 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
            >
              Plan een kennismaking
            </a>
            <p className="text-xs text-center text-pyah-donker/50 mt-2 tracking-wide">Gratis · vrijblijvend · online</p>

            <div className="border-t border-pyah-zacht mt-5 pt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-pyah-accent mb-2">Locatie</p>
              <p className="text-sm text-pyah-donker/70">📍 {docent.locatie} · reist tot {docent.reisafstand_km} km</p>
              <p className="text-xs text-pyah-zacht mt-1">Reiskosten: niet van toepassing</p>
            </div>

          </div>

          <Link
            href="/docenten"
            className="block w-full text-center mt-3 border border-pyah-accent text-pyah-accent py-3 text-sm hover:bg-pyah-licht transition-colors"
          >
            ← Terug naar overzicht
          </Link>
        </div>

      </div>
    </div>
  )
}
