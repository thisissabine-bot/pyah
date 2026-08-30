"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  aanmeldingId: string;
}

export default function EindbeslissingForm({ aanmeldingId }: Props) {
  const router = useRouter();
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState("");

  const beslis = async (eindbeslissing: "match" | "geen_match") => {
    setFout("");
    setBezig(true);
    try {
      const res = await fetch(`/api/admin/aanmeldingen/${aanmeldingId}/eindbeslissing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eindbeslissing }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setFout(data?.error ?? "Er ging iets mis. Probeer het opnieuw.");
        setBezig(false);
        return;
      }

      // Blijft op deze pagina (geen redirect) — een verse server-render toont daarna de
      // samenvatting i.p.v. deze knoppen, zelfde principe als "Opslaan" hierboven.
      router.refresh();
    } catch {
      setFout("Er ging iets mis. Probeer het opnieuw.");
      setBezig(false);
    }
  };

  return (
    <div className="form-fieldset">
      <h3 className="heading-h3 mb-text">Eindbeslissing na het gesprek</h3>

      {fout && <p className="form-error mb-text">{fout}</p>}

      <div className="btn-row">
        <button type="button" className="btn-dark-b" disabled={bezig} onClick={() => beslis("match")}>
          {bezig ? "Bezig…" : "Match — welkomstmail versturen"}
        </button>
        <button type="button" className="btn-light" disabled={bezig} onClick={() => beslis("geen_match")}>
          {bezig ? "Bezig…" : "Geen match — afwijzen"}
        </button>
      </div>
    </div>
  );
}
