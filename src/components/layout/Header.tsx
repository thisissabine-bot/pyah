"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/docenten", label: "Docent zoeken" },
  { href: "/hoe-werkt-het", label: "Hoe werkt het?" },
  { href: "/over", label: "Over PYAH" },
  { href: "/tarieven", label: "Tarieven" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? "nav-link-active" : "nav-link"}>
                    {item.label}
                  </Link>
                </li>
              ))}
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
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "nav-link-active" : "nav-link"}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div className="nav-actions">
          <Link href="/auth/login" className="nav-link-secondary" onClick={() => setMenuOpen(false)}>Inloggen</Link>
          <Link href="/voor-docenten" className="btn-1 on-dark" onClick={() => setMenuOpen(false)}>Docent worden</Link>
        </div>
      </div>
    </>
  );
}
