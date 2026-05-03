"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-pyah-zacht sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-pyah-diep">
              PYAH
            </span>
            <span className="hidden sm:block text-sm text-pyah-donker/60">
              Private Yoga at Home
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/docenten"
              className="text-sm text-pyah-donker hover:text-pyah-accent transition-colors"
            >
              Docenten
            </Link>
            <Link
              href="/over"
              className="text-sm text-pyah-donker hover:text-pyah-accent transition-colors"
            >
              Over PYAH
            </Link>
            <Link
              href="/voor-docenten"
              className="text-sm text-pyah-donker hover:text-pyah-accent transition-colors"
            >
              Voor docenten
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-pyah-donker hover:text-pyah-accent transition-colors"
            >
              Inloggen
            </Link>
            <Link
              href="/voor-docenten"
              className="text-sm bg-pyah-accent text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Docent worden
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-pyah-donker"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu openen"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-pyah-zacht">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/docenten"
              className="text-sm text-pyah-donker hover:text-pyah-accent"
              onClick={() => setMenuOpen(false)}
            >
              Docenten
            </Link>
            <Link
              href="/over"
              className="text-sm text-pyah-donker hover:text-pyah-accent"
              onClick={() => setMenuOpen(false)}
            >
              Over PYAH
            </Link>
            <Link
              href="/voor-docenten"
              className="text-sm text-pyah-donker hover:text-pyah-accent"
              onClick={() => setMenuOpen(false)}
            >
              Voor docenten
            </Link>
            <Link
              href="/auth/login"
              className="text-sm text-pyah-donker hover:text-pyah-accent"
              onClick={() => setMenuOpen(false)}
            >
              Inloggen
            </Link>
            <Link
              href="/voor-docenten"
              className="text-sm bg-pyah-accent text-white px-4 py-2 rounded-full text-center hover:opacity-90"
              onClick={() => setMenuOpen(false)}
            >
              Docent worden
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
