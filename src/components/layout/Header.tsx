"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <header className="site-header">
      <div className="nav-container">
          <Link href="/" className="nav-logo">
            <img
              src="/logo-horizontaal-wit.svg"
              alt="Private Yoga at Home"
            />
          </Link>

          <nav>
            <ul className="nav-menu">
              <li><Link href="/docenten" className="nav-link">Docent zoeken</Link></li>
              <li><Link href="/hoe-werkt-het" className="nav-link">Hoe werkt het?</Link></li>
              <li><Link href="/over" className="nav-link">Over PYAH</Link></li>
              <li><Link href="/tarieven" className="nav-link">Tarieven</Link></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <Link href="/auth/login" className="nav-link-secondary">Inloggen</Link>
            <Link href="/voor-docenten" className="btn-1 on-dark">Docent worden</Link>
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
      <div className={`nav-drawer${menuOpen ? " nav-drawer-open" : ""}`}>
        <Link href="/docenten" className="nav-link" onClick={() => setMenuOpen(false)}>Docent zoeken</Link>
        <Link href="/hoe-werkt-het" className="nav-link" onClick={() => setMenuOpen(false)}>Hoe werkt het?</Link>
        <Link href="/over" className="nav-link" onClick={() => setMenuOpen(false)}>Over PYAH</Link>
        <Link href="/tarieven" className="nav-link" onClick={() => setMenuOpen(false)}>Tarieven</Link>
        <div className="nav-actions">
          <Link href="/auth/login" className="nav-link-secondary" onClick={() => setMenuOpen(false)}>Inloggen</Link>
          <Link href="/voor-docenten" className="btn-1 on-dark" onClick={() => setMenuOpen(false)}>Docent worden</Link>
        </div>
      </div>
    </>
  );
}
