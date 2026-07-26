"use client";

import Link from "next/link";
import { useState } from "react";

export default function DocentHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="docent-header">
        <div className="nav-container">
          <Link href="/voor-docenten" className="nav-logo">
            <img
              src="/logo-horizontaal-wit.svg"
              alt="Private Yoga at Home"
            />
          </Link>

          <nav>
            <ul className="nav-menu">
              <li><Link href="/voor-docenten/hoe-werkt-het" className="docent-nav-link">Hoe werkt het?</Link></li>
              <li><Link href="/voor-docenten/over" className="docent-nav-link">Over PYAH</Link></li>
              <li><Link href="/voor-docenten/abonnement" className="docent-nav-link">Abonnement</Link></li>
              <li><Link href="/voor-docenten/aanmelden" className="docent-nav-link">Aanmelden/Inloggen</Link></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <Link href="/" className="btn-dark-a">Op zoek naar een yogadocent?</Link>
          </div>

          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu openen"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`nav-overlay${menuOpen ? " nav-drawer-open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`docent-nav-drawer${menuOpen ? " nav-drawer-open" : ""}`}>
        <Link href="/voor-docenten/hoe-werkt-het" className="docent-nav-link" onClick={() => setMenuOpen(false)}>Hoe werkt het?</Link>
        <Link href="/voor-docenten/over" className="docent-nav-link" onClick={() => setMenuOpen(false)}>Over PYAH</Link>
        <Link href="/voor-docenten/abonnement" className="docent-nav-link" onClick={() => setMenuOpen(false)}>Abonnement</Link>
        <Link href="/voor-docenten/aanmelden" className="docent-nav-link" onClick={() => setMenuOpen(false)}>Aanmelden/Inloggen</Link>
        <div className="nav-actions">
          <Link href="/" className="btn-dark-a" onClick={() => setMenuOpen(false)}>Op zoek naar een yogadocent?</Link>
        </div>
      </div>
    </>
  );
}
