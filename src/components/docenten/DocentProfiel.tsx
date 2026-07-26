'use client'

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import NextImage from "next/image"
import { BookOpen, Award, LayoutGrid, MapPin } from "lucide-react"
import type { Docent } from "@/lib/testdata"
import type { RenderSlideProps, SlideImage } from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

const DocentKaart = dynamic(() => import("./DocentKaart"), { ssr: false })
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false })

export default function DocentProfiel({ docent, terug = "" }: { docent: Docent, terug?: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const ervaren = docent.ervaringsniveau === "ervaren"

  const introductielesAltijd75 = docent.tarieven.find((t) => t.naam === "Introductieles")
  const losseMinuten60 = docent.tarieven.find((t) => t.naam === "Losse les" && t.duur_minuten === 60)
  const losseMinuten75 = docent.tarieven.find((t) => t.naam === "Losse les" && t.duur_minuten === 75)

  const fotos = (docent.foto_urls ?? []).slice(0, 6)
  const slides: SlideImage[] = fotos.map((src) => ({ src }))

  const slot0 = fotos[0] ?? null
  const slot1 = fotos[1] ?? null
  const slot2 = fotos[2] ?? null

  function openLightbox(index: number) {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const terugHref = terug ? `/docenten?locatie=${encodeURIComponent(terug)}` : "/docenten"

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-12 py-10">

      {/* Broodkruimel */}
      <div style={{ marginBottom: "20px" }}>
        <Link href={terugHref} className="text-small" style={{ textDecoration: "none" }}>
          ← Terug naar docenten
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 items-start">

        {/* ── LINKER KOLOM ── */}
        <div>

          {/* 1. Fotoblok */}
          <div style={{ aspectRatio: "5/3", display: "grid", gridTemplateColumns: "3fr 2fr", gap: "4px" }}>
            <div
              style={{ background: "#ebe3e0", overflow: "hidden", cursor: slot0 ? "pointer" : "default" }}
              onClick={slot0 ? () => openLightbox(0) : undefined}
            >
              {slot0 && (
                <img src={slot0} alt={docent.naam} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              )}
            </div>
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "4px" }}>
              <div
                style={{ background: slot1 ? "#ebe3e0" : "#d4baad", overflow: "hidden", cursor: slot1 ? "pointer" : "default" }}
                onClick={slot1 ? () => openLightbox(1) : undefined}
              >
                {slot1 && (
                  <img src={slot1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                )}
              </div>
              <div
                style={{ background: slot2 ? "#ebe3e0" : "#d4baad", overflow: "hidden", cursor: slot2 ? "pointer" : "default" }}
                onClick={slot2 ? () => openLightbox(2) : undefined}
              >
                {slot2 && (
                  <img src={slot2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                )}
              </div>
            </div>
          </div>

          {/* Foto's trigger — alleen bij 2+ foto's */}
          {fotos.length > 1 && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <button
                onClick={() => openLightbox(0)}
                style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", padding: "0", color: "#484f47" }}
              >
                <LayoutGrid size={14} />
                <span className="text-small">Foto's</span>
              </button>
            </div>
          )}

          {/* 2. Naam */}
          <h1 className="heading-h2 accent-terracotta" style={{ marginTop: "24px" }}>{docent.naam}</h1>

          {/* 3. Locatie */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
            <MapPin size={14} color="#a66658" />
            <span className="text-small">{docent.locatie}</span>
            <span className="text-small">·</span>
            <span className="text-small">reist tot {docent.reisafstand_km} km</span>
          </div>

          <div style={{ borderTop: "1px solid #d4baad", margin: "24px 0" }} />

          {/* 4. Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <span className={ervaren ? "badge-ervaren" : "badge-startend"}>
              {ervaren ? "Ervaren" : "Startend"}
            </span>
            {docent.yogastijlen.map((s) => (
              <span key={s} className="badge-stijl">{s}</span>
            ))}
            {docent.specialisaties.map((s) => (
              <span key={s} className="badge-stijl">{s}</span>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #d4baad", margin: "24px 0" }} />

          {/* 5. Bio */}
          <p className="heading-h3 mb-action">Over mij</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {docent.bio.split("\n\n").map((p, i) => (
              <p key={i} className="text-body">{p}</p>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #d4baad", margin: "24px 0" }} />

          {/* 6. Opleiding & certificaten */}
          <p className="heading-h3 mb-action">Opleidingen &amp; certificaten</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", background: "#ebe3e0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen size={13} color="#a66658" aria-hidden="true" />
              </div>
              <p className="text-body">{docent.opleiding}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", background: "#ebe3e0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Award size={13} color="#a66658" aria-hidden="true" />
              </div>
              <p className="text-body">{docent.certificering}</p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #d4baad", margin: "24px 0" }} />

          {/* 7. Yogastijlen & specialismen */}
          <p className="heading-h3 mb-action">Yogastijlen</p>
          <div style={{ marginBottom: "16px" }}>
            <p className="text-small mb-text">Stijlen</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {docent.yogastijlen.map((s) => (
                <span key={s} className="badge-stijl">{s}</span>
              ))}
            </div>
          </div>
          {docent.specialisaties.length > 0 && (
            <div>
              <p className="text-small mb-text">Specialismen</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {docent.specialisaties.map((s) => (
                  <span key={s} className="badge-stijl">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ borderTop: "1px solid #d4baad", margin: "24px 0" }} />

          {/* 8. Werkgebied */}
          <p className="heading-h3 mb-action">Werkgebied</p>
          <DocentKaart locatie={docent.locatie} reisafstand_km={docent.reisafstand_km} />
          <p className="text-body" style={{ marginTop: "12px" }}>📍 {docent.locatie} en omgeving</p>
          <p className="text-small" style={{ marginTop: "4px" }}>Reiskosten: niet van toepassing</p>

          <div style={{ borderTop: "1px solid #d4baad", margin: "24px 0" }} />

          {/* 9. Reviews */}
          <p className="heading-h3 mb-action">Reviews</p>
          <p className="text-small" style={{ fontStyle: "italic" }}>
            Na afloop van een les kunnen klanten een review achterlaten. Dit profiel heeft nog geen reviews.
          </p>

        </div>

        {/* ── RECHTER KOLOM (sidebar) ── */}
        <div className="lg:sticky lg:top-24">
          <div style={{ background: "#ebe3e0", padding: "24px" }}>

            <p className="heading-h5 mb-action">Tarieven</p>

            <div>
              {introductielesAltijd75 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid #d4baad" }}>
                  <span className="tarief-rij">Introductieles 75 min.</span>
                  <span className="tarief-rij">€{(introductielesAltijd75.prijs_cent / 100).toFixed(0)}</span>
                </div>
              )}
              {losseMinuten60 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid #d4baad" }}>
                  <span className="tarief-rij">Losse les 60 min.</span>
                  <span className="tarief-rij">€{(losseMinuten60.prijs_cent / 100).toFixed(0)}</span>
                </div>
              )}
              {losseMinuten75 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0" }}>
                  <span className="tarief-rij">Losse les 75 min.</span>
                  <span className="tarief-rij">€{(losseMinuten75.prijs_cent / 100).toFixed(0)}</span>
                </div>
              )}
            </div>

            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light"
              style={{ display: "block", textAlign: "center", marginTop: "20px" }}
            >
              Plan een kennismaking
            </a>
            <p className="text-small" style={{ textAlign: "center", marginTop: "8px" }}>Gratis · vrijblijvend · online</p>

            <div style={{ borderTop: "1px solid #d4baad", margin: "20px 0" }} />

            <p className="heading-h5 mb-text">Locatie</p>
            <p className="text-body">📍 {docent.locatie} · reist tot {docent.reisafstand_km} km</p>
            <p className="text-small" style={{ marginTop: "4px" }}>Reiskosten: niet van toepassing</p>

          </div>

          <Link
            href={terugHref}
            className="btn-light"
            style={{ display: "block", textAlign: "center", marginTop: "12px" }}
          >
            ← Terug naar overzicht
          </Link>
        </div>

      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        render={{
          slide: ({ slide }: RenderSlideProps<SlideImage>) => (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <NextImage
                src={slide.src}
                alt={slide.alt ?? docent.naam}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          ),
        }}
        styles={{
          container: { backgroundColor: "#ebe3e0" },
          button: { color: "#260f09", filter: "none" },
        }}
      />

    </div>
  )
}
