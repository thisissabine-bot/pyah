import Link from "next/link";
import { MapPin } from "lucide-react";

interface DocentCardProps {
  naam: string;
  slug: string;
  locatie: string;
  yogastijlen: string[];
  startprijs_cent: number;
  foto_url: string | null;
}

export default function DocentCard({
  naam,
  slug,
  locatie,
  yogastijlen,
  startprijs_cent,
  foto_url,
}: DocentCardProps) {
  const initials = naam
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden border border-pyah-zacht/40">
      <div className="h-48 bg-pyah-licht flex items-center justify-center">
        {foto_url ? (
          <img src={foto_url} alt={naam} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl font-semibold text-pyah-accent/60">{initials}</span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-pyah-diep text-lg mb-1">{naam}</h3>

        <div className="flex items-center gap-1 text-pyah-donker/60 text-sm mb-3">
          <MapPin size={13} />
          <span>{locatie}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {yogastijlen.map((stijl) => (
            <span
              key={stijl}
              className="text-xs bg-pyah-licht text-pyah-accent border border-pyah-zacht px-2.5 py-0.5 rounded-full"
            >
              {stijl}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-pyah-donker/70">
            Vanaf{" "}
            <span className="font-semibold text-pyah-donker">
              €{(startprijs_cent / 100).toFixed(0)}
            </span>
          </span>
          <Link
            href={`/docenten/${slug}`}
            className="text-sm bg-pyah-accent text-white px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Bekijk profiel
          </Link>
        </div>
      </div>
    </div>
  );
}
