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
    <div className="docent-card">
      <div className="docent-card-foto">
        {foto_url ? (
          <img src={foto_url} alt={naam} />
        ) : (
          <span className="heading-h2" style={{ color: "rgba(166,102,88,0.4)" }}>{initials}</span>
        )}
      </div>

      <div className="docent-card-body">
        <h3 className="heading-h3">{naam}</h3>

        <div className="docent-card-locatie">
          <MapPin size={13} color="#d4baad" />
          <span className="text-small">{locatie}</span>
        </div>

        <div className="docent-card-badges">
          {yogastijlen.map((stijl) => (
            <span key={stijl} className="badge">{stijl}</span>
          ))}
        </div>

        <div className="docent-card-footer">
          <p className="text-body">
            Vanaf <strong>€{(startprijs_cent / 100).toFixed(0)}</strong>
          </p>
          <Link href={`/docenten/${slug}`} className="btn-3">
            Bekijk profiel
          </Link>
        </div>
      </div>
    </div>
  );
}
