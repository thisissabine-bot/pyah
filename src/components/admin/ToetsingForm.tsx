"use client";

import { useState } from "react";
import { NIVEAU_OPTIES } from "@/lib/aanmeldingenBeoordeling";

type JaNee = "" | "ja" | "nee";
type JaNeeTwijfel = "" | "ja" | "nee" | "twijfel";

export interface ToetsingWaarden {
  opleiding: string;
  yogastijlen: string;
  andere_disciplines: string;
  niveau_definitief: "" | "startend" | "ervaren";
  datum_gesprek: string;
  geboortedatum: string;
  kvk_nummer: string;
  verzekering_geldig_tot: string;
  opleiding_in_orde: JaNee;
  verzekering_in_orde: JaNee;
  certificaten_besproken: JaNee;
  ytt_200u_in_orde: JaNeeTwijfel;
  geschikt_1op1: JaNeeTwijfel;
  regio_passend: JaNeeTwijfel;
  houding_passend_pyah: JaNeeTwijfel;
  veiligheid_professionaliteit: JaNeeTwijfel;
  community_gevoel: JaNeeTwijfel;
  intuitieve_match: JaNeeTwijfel;
  checklist_opmerkingen: string;
  praktisch_professioneel: string;
  vakinhoudelijk: string;
  geschiktheid_1op1_toelichting: string;
  houding_cultuur: string;
  energie_intuitie: string;
  ingevuld_door: string;
  extra_notities: string;
}

interface Props {
  aanmeldingId: string;
  initieel: ToetsingWaarden;
}

const CHECKLIST_ITEMS: { veld: keyof ToetsingWaarden; label: string }[] = [
  { veld: "ytt_200u_in_orde", label: "YTT 200u in orde" },
  { veld: "geschikt_1op1", label: "1-op-1 geschikt" },
  { veld: "regio_passend", label: "Regio passend" },
  { veld: "houding_passend_pyah", label: "Houding passend bij PYAH" },
  { veld: "veiligheid_professionaliteit", label: "Veiligheid & professionaliteit" },
  { veld: "community_gevoel", label: "Community-gevoel" },
  { veld: "intuitieve_match", label: "Intuïtieve match" },
];

const VERDIEPING_ITEMS: { veld: keyof ToetsingWaarden; label: string; placeholder: string }[] = [
  {
    veld: "praktisch_professioneel",
    label: "Praktisch & professioneel",
    placeholder:
      "Komt de docent administratief betrouwbaar over (reactietijd, volledigheid, helderheid in communicatie)? Is de beschikbaarheid realistisch en passend bij de regio?",
  },
  {
    veld: "vakinhoudelijk",
    label: "Vakinhoudelijk",
    placeholder:
      "Van welke opgegeven yogastijlen heeft de docent een formele certificering, en welke worden gegeven op basis van ervaring/eigen beoefening zonder certificering? Is dat onderscheid besproken en voelt het verantwoord?",
  },
  {
    veld: "geschiktheid_1op1_toelichting",
    label: "1-op-1 geschiktheid",
    placeholder:
      "Is er rust, aanwezigheid en aandacht in het contact? Kan de docent veilig werken zonder vaste groepsstructuur? Is er flexibiliteit om lessen op het moment zelf aan te passen?",
  },
  {
    veld: "houding_cultuur",
    label: "Houding & cultuur",
    placeholder:
      "Staat de docent open voor feedback en ontwikkeling? Voelt de docent zich comfortabel in een samenwerkingsstructuur? Is er bereidheid om onderdeel te zijn van een community, en respect voor het platform, de afspraken en de gezamenlijke visie?",
  },
  {
    veld: "energie_intuitie",
    label: "Energie/intuïtieve check",
    placeholder:
      "Voelt het gesprek gelijkwaardig en zuiver, als samenwerken in plaats van 'iets halen'? Zou ik deze docent met vertrouwen bij een dierbare aanraden?",
  },
];

export default function ToetsingForm({ aanmeldingId, initieel }: Props) {
  const [waarden, setWaarden] = useState<ToetsingWaarden>(initieel);
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState("");
  const [opgeslagen, setOpgeslagen] = useState(false);

  const zet = <K extends keyof ToetsingWaarden>(veld: K, waarde: ToetsingWaarden[K]) => {
    setOpgeslagen(false);
    setWaarden((huidig) => ({ ...huidig, [veld]: waarde }));
  };

  const opslaan = async () => {
    setFout("");
    setBezig(true);
    try {
      const res = await fetch(`/api/admin/aanmeldingen/${aanmeldingId}/toetsing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...waarden,
          niveau_definitief: waarden.niveau_definitief || null,
          opleiding_in_orde: waarden.opleiding_in_orde === "" ? null : waarden.opleiding_in_orde === "ja",
          verzekering_in_orde: waarden.verzekering_in_orde === "" ? null : waarden.verzekering_in_orde === "ja",
          certificaten_besproken: waarden.certificaten_besproken === "" ? null : waarden.certificaten_besproken === "ja",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setFout(data?.error ?? "Er ging iets mis bij het opslaan. Probeer het opnieuw.");
        setBezig(false);
        return;
      }

      setOpgeslagen(true);
      setBezig(false);
    } catch {
      setFout("Er ging iets mis bij het opslaan. Probeer het opnieuw.");
      setBezig(false);
    }
  };

  const jaNeeTwijfelRadio = (veld: keyof ToetsingWaarden, huidigeWaarde: string) => (
    <>
      {(["ja", "nee", "twijfel"] as const).map((optie) => (
        <label className="form-radio-row" key={optie}>
          <input
            type="radio"
            name={veld}
            checked={huidigeWaarde === optie}
            onChange={() => zet(veld, optie as never)}
          />
          <span className="text-body">{optie === "ja" ? "Ja" : optie === "nee" ? "Nee" : "Twijfel"}</span>
        </label>
      ))}
    </>
  );

  const jaNeeRadio = (veld: keyof ToetsingWaarden, huidigeWaarde: string) => (
    <>
      {(["ja", "nee"] as const).map((optie) => (
        <label className="form-radio-row" key={optie}>
          <input
            type="radio"
            name={veld}
            checked={huidigeWaarde === optie}
            onChange={() => zet(veld, optie as never)}
          />
          <span className="text-body">{optie === "ja" ? "Ja" : "Nee"}</span>
        </label>
      ))}
    </>
  );

  return (
    <div className="form-body">
      {/* 4.1 Vooraf ingevuld, overschrijfbaar */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Opleiding &amp; niveau</h3>
        <p className="form-hint mb-text">
          Vooraf overgenomen uit de aanmelding — vanaf nu een gewoon bewerkbaar veld.
        </p>

        <div className="form-group">
          <label className="form-label" htmlFor="opleiding">Opleiding &amp; discipline</label>
          <textarea
            className="form-textarea"
            id="opleiding"
            value={waarden.opleiding}
            onChange={(e) => zet("opleiding", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="yogastijlen">Yogastijlen</label>
          <textarea
            className="form-textarea"
            id="yogastijlen"
            value={waarden.yogastijlen}
            onChange={(e) => zet("yogastijlen", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="andere_disciplines">Extra specialisaties</label>
          <textarea
            className="form-textarea"
            id="andere_disciplines"
            value={waarden.andere_disciplines}
            onChange={(e) => zet("andere_disciplines", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="niveau_definitief">Niveau (definitief)</label>
          <select
            className="form-select"
            id="niveau_definitief"
            value={waarden.niveau_definitief}
            onChange={(e) => zet("niveau_definitief", e.target.value as ToetsingWaarden["niveau_definitief"])}
          >
            <option value="">Nog niet bepaald</option>
            {NIVEAU_OPTIES.map((optie) => (
              <option key={optie.value} value={optie.value}>{optie.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 4.2 Live in te vullen — basisgegevens */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Basisgegevens</h3>

        <div className="form-group">
          <label className="form-label" htmlFor="datum_gesprek">Datum gesprek</label>
          <input
            className="form-input"
            type="date"
            id="datum_gesprek"
            value={waarden.datum_gesprek}
            onChange={(e) => zet("datum_gesprek", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="geboortedatum">Geboortedatum</label>
          <input
            className="form-input"
            type="date"
            id="geboortedatum"
            value={waarden.geboortedatum}
            onChange={(e) => zet("geboortedatum", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="kvk_nummer">KvK-nummer</label>
          <input
            className="form-input"
            type="text"
            id="kvk_nummer"
            value={waarden.kvk_nummer}
            onChange={(e) => zet("kvk_nummer", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="verzekering_geldig_tot">Verzekering geldig tot</label>
          <input
            className="form-input"
            type="date"
            id="verzekering_geldig_tot"
            value={waarden.verzekering_geldig_tot}
            onChange={(e) => zet("verzekering_geldig_tot", e.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="form-label">Opleiding in orde</p>
          {jaNeeRadio("opleiding_in_orde", waarden.opleiding_in_orde)}
        </div>

        <div className="form-group">
          <p className="form-label">Verzekering in orde</p>
          {jaNeeRadio("verzekering_in_orde", waarden.verzekering_in_orde)}
        </div>

        <div className="form-group">
          <p className="form-label">Certificaten besproken</p>
          <p className="form-hint mb-text">
            Gaat niet over een daadwerkelijke upload/controle — alleen of is besproken dat certificaten bij het
            aanmaken van het profiel geüpload moeten worden.
          </p>
          {jaNeeRadio("certificaten_besproken", waarden.certificaten_besproken)}
        </div>
      </div>

      {/* Checklist */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Checklist</h3>

        {CHECKLIST_ITEMS.map((item) => (
          <div className="form-group" key={item.veld}>
            <p className="form-label">{item.label}</p>
            {jaNeeTwijfelRadio(item.veld, waarden[item.veld] as string)}
          </div>
        ))}

        <div className="form-group">
          <label className="form-label" htmlFor="checklist_opmerkingen">Opmerkingen/aandachtspunten</label>
          <textarea
            className="form-textarea"
            id="checklist_opmerkingen"
            value={waarden.checklist_opmerkingen}
            onChange={(e) => zet("checklist_opmerkingen", e.target.value)}
          />
        </div>
      </div>

      {/* Verdieping */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Verdieping</h3>

        {VERDIEPING_ITEMS.map((item) => (
          <div className="form-group" key={item.veld}>
            <label className="form-label" htmlFor={item.veld}>{item.label}</label>
            <textarea
              className="form-textarea"
              id={item.veld}
              placeholder={item.placeholder}
              value={waarden[item.veld] as string}
              onChange={(e) => zet(item.veld, e.target.value as never)}
            />
          </div>
        ))}
      </div>

      {/* 4.3 Vaste referentietekst */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Referentie — Startend / Ervaren</h3>
        <div className="admin-samenvatting">
          <p className="form-label">Startend</p>
          <ul className="text-body">
            <li>Heeft een afgeronde 200u YTT</li>
            <li>Opgeleid binnen minimaal één yoga discipline</li>
            <li>Heeft minimaal 1 jaar leservaring óf minimaal 100 uur aantoonbare leservaring</li>
            <li>Actieve leservaring (opgedaan in de afgelopen 6–12 maanden)</li>
            <li>Heeft een stevige basis, maar is nog in ontwikkeling</li>
            <li>Wil graag privé yogales aan huis geven</li>
            <li>Is lerend en nieuwsgierig</li>
            <li>Staat open voor feedback en begeleiding</li>
            <li>Wil groeien in het geven van 1-op-1 lessen en het werken met maatwerk</li>
          </ul>

          <p className="form-label" style={{ marginTop: 24 }}>Ervaren</p>
          <ul className="text-body">
            <li>Heeft meer dan 200u YTT gevolgd</li>
            <li>Is opgeleid binnen meerdere yoga disciplines</li>
            <li>Heeft minimaal 2 jaar actieve leservaring (in studio&rsquo;s, privé of bij bedrijven)</li>
            <li>Beschikt over belichaamde ervaring en werkt autonoom</li>
            <li>Verzorgt aantoonbaar zelfstandig en professioneel privélessen</li>
            <li>Heeft meerdere specialisaties, zoals bijvoorbeeld burn-out, zwangerschap, rug/nekklachten of kracht</li>
            <li>Heeft meer routine, een dieper repertoire en een verfijnde manier van &ldquo;lezen&rdquo; van het lichaam</li>
            <li>Heeft ruime ervaring met het aanpassen van lessen aan verschillende niveaus en behoeften</li>
            <li>Heeft aanvullende opleidingen of specialisaties gevolgd</li>
            <li>Beschikt over voldoende zelfvertrouwen om zelfstandig trajecten te begeleiden</li>
            <li>Heeft ervaring met verschillende doelgroepen en uiteenlopende situaties</li>
            <li>Is in staat om maatwerktrajecten te bieden aan klanten met specifieke wensen</li>
          </ul>
        </div>
      </div>

      {/* 4.4 Afsluiting */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Afsluiting</h3>

        <div className="form-group">
          <label className="form-label" htmlFor="ingevuld_door">Ingevuld door</label>
          <input
            className="form-input"
            type="text"
            id="ingevuld_door"
            value={waarden.ingevuld_door}
            onChange={(e) => zet("ingevuld_door", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="extra_notities">Extra notities</label>
          <textarea
            className="form-textarea"
            id="extra_notities"
            value={waarden.extra_notities}
            onChange={(e) => zet("extra_notities", e.target.value)}
          />
        </div>
      </div>

      {fout && <p className="form-error mb-text">{fout}</p>}
      {opgeslagen && <p className="admin-toast mb-text">Toetsing opgeslagen.</p>}

      <button type="button" className="btn-light" disabled={bezig} onClick={opslaan}>
        {bezig ? "Bezig…" : "Opslaan"}
      </button>
    </div>
  );
}
