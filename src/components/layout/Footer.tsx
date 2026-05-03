import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pyah-diep text-white/80 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <img
              src="/logo-verticaal-wit.svg"
              alt="Private Yoga at Home"
              style={{ height: '64px', width: 'auto' }}
              className="mb-3"
            />
            <p className="text-sm leading-relaxed">
              Professionele yogadocenten die bij jou thuis komen. Persoonlijk,
              zorgvuldig geselecteerd.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-white mb-3">Navigatie</p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/docenten" className="text-sm hover:text-white transition-colors">
                  Docenten zoeken
                </Link>
              </li>
              <li>
                <Link href="/voor-docenten" className="text-sm hover:text-white transition-colors">
                  Voor docenten
                </Link>
              </li>
              <li>
                <Link href="/over" className="text-sm hover:text-white transition-colors">
                  Over PYAH
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-white mb-3">Contact</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:info@privateyogaathome.nl"
                  className="text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail size={14} />
                  info@privateyogaathome.nl
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/privateyogaathome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <ExternalLink size={14} />
                  @privateyogaathome
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Private Yoga at Home · privateyogaathome.nl
        </div>
      </div>
    </footer>
  );
}
