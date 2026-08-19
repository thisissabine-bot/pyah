"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/voor-docenten/hoe-werkt-het", label: "Hoe werkt het?" },
  { href: "/voor-docenten/over", label: "Over PYAH" },
  { href: "/voor-docenten/tarieven", label: "Tarieven" },
  { href: "/voor-docenten/abonnement", label: "Abonnement" },
  { href: "/voor-docenten/aanmelden", label: "Aanmelden/Inloggen" },
];

export default function DocentHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? "docent-nav-link-active" : "docent-nav-link"}>
                    {item.label}
                  </Link>
                </li>
              ))}
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
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "docent-nav-link-active" : "docent-nav-link"}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div className="nav-actions">
          <Link href="/" className="btn-dark-a" onClick={() => setMenuOpen(false)}>Op zoek naar een yogadocent?</Link>
        </div>
      </div>
    </>
  );
}
