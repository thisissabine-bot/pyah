"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NIVEAU_OPTIES } from "@/lib/aanmeldingenBeoordeling";

interface Props {
  id: string;
  naam: string;
}

export default function BeoordelingForm({ id, naam }: Props) {
  const router = useRouter();
  const [niveau, setNiveau] = useState<"startend" | "ervaren" | "">("");
  const [fout, setFout] = useState("");
  const [bezig, setBezig] = useState(false);

  const TOAST_PER_BESLISSING = {
    ja: "uitgenodigd",
    nee: "afgewezen",
    wachtlijst: "wachtlijst",
  } as const;

  const beslis = async (matchBeslissing: "ja" | "nee" | "wachtlijst") => {
    setFout("");
    if (matchBeslissing === "ja" && !niveau) {
      setFout("Kies eerst een niveau-inschatting voordat je een uitnodiging verstuurt.");
      return;
    }

    setBezig(true);
    try {
      const res = await fetch(`/api/admin/aanmeldingen/${id}/beslissing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niveau_inschatting: niveau || undefined,
          match_beslissing: matchBeslissing,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setFout(data?.error ?? "Er ging iets mis. Probeer het opnieuw.");
        setBezig(false);
        return;
      }

      const toast = TOAST_PER_BESLISSING[matchBeslissing];
      const mail = data?.mail_verzonden ? "ok" : "mislukt";
      router.push(`/dashboard/admin/aanmeldingen?toast=${toast}&mail=${mail}&naam=${encodeURIComponent(naam)}`);
    } catch {
      setFout("Er ging iets mis. Probeer het opnieuw.");
      setBezig(false);
    }
  };

  return (
    <div className="form-fieldset">
      <h3 className="heading-h3 mb-text">Beoordeling</h3>

      <div className="form-group">
        <p className="form-label">Niveau-inschatting <span className="form-required">*</span></p>
        {NIVEAU_OPTIES.map((optie) => (
          <label className="form-radio-row" key={optie.value}>
            <input
              type="radio"
              name="niveau_inschatting"
              value={optie.value}
              checked={niveau === optie.value}
              onChange={() => setNiveau(optie.value)}
            />
            <span className="text-body">{optie.label}</span>
          </label>
        ))}
      </div>

      {fout && <p className="form-error mb-text">{fout}</p>}

      <div className="btn-row">
        <button type="button" className="btn-light" disabled={bezig} onClick={() => beslis("ja")}>
          {bezig ? "Bezig…" : "Match — uitnodigen"}
        </button>
        <button type="button" className="btn-dark-a" disabled={bezig} onClick={() => beslis("nee")}>
          {bezig ? "Bezig…" : "Geen match — afwijzen"}
        </button>
        <button type="button" className="btn-dark-b" disabled={bezig} onClick={() => beslis("wachtlijst")}>
          {bezig ? "Bezig…" : "Wachtlijst"}
        </button>
      </div>
    </div>
  );
}
