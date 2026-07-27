import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";

export default function DocentFooter() {
  return (
    <footer className="bg-pyah-accent text-white/80 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          <div>
            <img
              src="/logo-verticaal-wit.svg"
              alt="Private Yoga at Home"
              style={{ height: '100px', width: 'auto', display: 'block' }}
              className="mb-3"
            />
            <p className="text-sm leading-relaxed">
              Professionele yogadocenten die bij jou thuis komen. Persoonlijk,
              zorgvuldig geselecteerd.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-white mb-3">Navigatie</p>
            <ul className="flex flex-col gap-2 list-none pl-0">
              <li>
                <Link href="/voor-docenten/hoe-werkt-het" className="text-sm hover:text-white transition-colors">
                  Hoe werkt het?
                </Link>
              </li>
              <li>
                <Link href="/voor-docenten/over" className="text-sm hover:text-white transition-colors">
                  Over PYAH
                </Link>
              </li>
              <li>
                <Link href="/voor-docenten/abonnement" className="text-sm hover:text-white transition-colors">
                  Abonnement
                </Link>
              </li>
              <li>
                <Link href="/voor-docenten/aanmelden" className="text-sm hover:text-white transition-colors">
                  Aanmelden
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-white mb-3">Contact</p>
            <ul className="flex flex-col gap-2 list-none pl-0">
              <li>
                <a
                  href="mailto:docenten@privateyogaathome.nl"
                  className="text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail size={14} />
                  docenten@privateyogaathome.nl
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

        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-white/40 text-center">
          © {new Date().getFullYear()} Private Yoga at Home · privateyogaathome.nl
        </div>
      </div>
    </footer>
  );
}
