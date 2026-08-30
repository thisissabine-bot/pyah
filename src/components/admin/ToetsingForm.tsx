"use client";

import { useState } from "react";
import { NIVEAU_OPTIES } from "@/lib/aanmeldingenBeoordeling";

type JaNeeTwijfel = "" | "ja" | "nee" | "twijfel";

export interface DocentAntwoorden {
  opleiding: string;
  trainingsuren: string;
  jaren_leservaring: string;
  recente_lespraktijk: string;
  ervaring_privelessen: string;
  yogastijlen: string;
  andere_disciplines: string;
}

export interface ToetsingWaarden {
  niveau_definitief: "" | "startend" | "ervaren";
  datum_gesprek: string;
  geboortedatum: string;
  kvk_nummer: string;
  kor_van_toepassing_per: string;
  kor_verdiend_euro: string;
  verzekering_geldig_tot: string;

  ytt_200u_in_orde: JaNeeTwijfel;
  verzekering_in_orde: JaNeeTwijfel;
  geschikt_1op1: JaNeeTwijfel;
  regio_passend: JaNeeTwijfel;
  houding_passend_pyah: JaNeeTwijfel;
  veiligheid_professionaliteit: JaNeeTwijfel;
  community_gevoel: JaNeeTwijfel;
  intuitieve_match: JaNeeTwijfel;
  checklist_opmerkingen: string;

  vak_intake_ervaring: string;
  vak_werkwijze_verwoorden: string;
  vak_grenzen_doorverwijzing: string;
  vak_rust_aandacht: string;
  vak_veilig_zonder_groep: string;
  vak_flexibiliteit: string;
  vak_certificering_vs_ervaring: string;
  houding_feedback_ontwikkeling: string;
  houding_samenwerkingsstructuur: string;
  houding_community_bereidheid: string;
  houding_respect_platform: string;
  energie_gelijkwaardig_zuiver: string;
  energie_samenwerken_niet_halen: string;
  energie_aanraden_dierbare: string;

  ingevuld_door: string;
  extra_notities: string;
}

interface Props {
  aanmeldingId: string;
  docentAntwoorden: DocentAntwoorden;
  initieel: ToetsingWaarden;
}

const CHECKLIST_ITEMS: { veld: keyof ToetsingWaarden; label: string }[] = [
  { veld: "ytt_200u_in_orde", label: "YTT 200u in orde" },
  { veld: "verzekering_in_orde", label: "Verzekering in orde" },
  { veld: "geschikt_1op1", label: "1-op-1 geschikt" },
  { veld: "regio_passend", label: "Regio passend" },
  { veld: "houding_passend_pyah", label: "Houding passend bij PYAH" },
  { veld: "veiligheid_professionaliteit", label: "Veiligheid & professionaliteit" },
  { veld: "community_gevoel", label: "Community-gevoel" },
  { veld: "intuitieve_match", label: "Intuïtieve match" },
];

const DOCENT_ANTWOORD_VELDEN: { veld: keyof DocentAntwoorden; label: string }[] = [
  { veld: "opleiding", label: "Welk erkend opleidingsinstituut?" },
  { veld: "trainingsuren", label: "Hoeveel trainingsuren?" },
  { veld: "jaren_leservaring", label: "Hoeveel jaar geef je yogales?" },
  { veld: "recente_lespraktijk", label: "Actief lesgegeven laatste 6–12 maanden?" },
  { veld: "ervaring_privelessen", label: "Ervaring met privélessen aan huis?" },
  { veld: "yogastijlen", label: "Welke yogastijlen?" },
  { veld: "andere_disciplines", label: "Extra disciplines?" },
];

const VAKINHOUDELIJK_ITEMS: { veld: keyof ToetsingWaarden; label: string }[] = [
  { veld: "vak_intake_ervaring", label: "Heeft de docent ervaring met intakegesprekken?" },
  { veld: "vak_werkwijze_verwoorden", label: "Kan de docent zijn/haar werkwijze helder verwoorden?" },
  { veld: "vak_grenzen_doorverwijzing", label: "Is er bewustzijn van eigen grenzen en doorverwijzing waar nodig?" },
  { veld: "vak_rust_aandacht", label: "Is er rust, aanwezigheid en aandacht in contact?" },
  { veld: "vak_veilig_zonder_groep", label: "Kan de docent veilig werken zonder vaste groepsstructuur?" },
  { veld: "vak_flexibiliteit", label: "Is er flexibiliteit in het aanpassen van lessen op het moment zelf?" },
  {
    veld: "vak_certificering_vs_ervaring",
    label:
      "Van welke opgegeven yogastijlen heeft de docent een formele certificering, en welke worden gegeven op basis van ervaring/eigen beoefening zonder certificering? Is dat onderscheid besproken en voelt het verantwoord?",
  },
];

const HOUDING_ITEMS: { veld: keyof ToetsingWaarden; label: string }[] = [
  { veld: "houding_feedback_ontwikkeling", label: "Staat de docent open voor feedback en ontwikkeling?" },
  { veld: "houding_samenwerkingsstructuur", label: "Voelt de docent zich comfortabel in een samenwerkingsstructuur?" },
  { veld: "houding_community_bereidheid", label: "Is er bereidheid om onderdeel te zijn van een community?" },
  { veld: "houding_respect_platform", label: "Is er respect voor het platform, de afspraken en de gezamenlijke visie?" },
];

const ENERGIE_ITEMS: { veld: keyof ToetsingWaarden; label: string }[] = [
  { veld: "energie_gelijkwaardig_zuiver", label: "Voelt het gesprek gelijkwaardig en zuiver?" },
  { veld: "energie_samenwerken_niet_halen", label: "Voelt het als samenwerken, niet als 'iets halen'?" },
  { veld: "energie_aanraden_dierbare", label: "Zou ik deze docent met vertrouwen bij een dierbare aanraden?" },
];

export default function ToetsingForm({ aanmeldingId, docentAntwoorden, initieel }: Props) {
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

    const euroInput = waarden.kor_verdiend_euro.trim().replace(",", ".");
    const koorVerdiendCent = euroInput === "" ? null : Math.round(parseFloat(euroInput) * 100);

    try {
      const res = await fetch(`/api/admin/aanmeldingen/${aanmeldingId}/toetsing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...waarden,
          niveau_definitief: waarden.niveau_definitief || null,
          kor_verdiend_cent: Number.isNaN(koorVerdiendCent) ? null : koorVerdiendCent,
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

  const vrijTekstveld = (veld: keyof ToetsingWaarden, label: string) => (
    <div className="form-group" key={veld}>
      <label className="form-label" htmlFor={veld}>{label}</label>
      <textarea
        className="form-textarea form-textarea--klein"
        id={veld}
        value={waarden[veld] as string}
        onChange={(e) => zet(veld, e.target.value as never)}
      />
    </div>
  );

  return (
    <div className="form-body">
      {/* 1. Basisgegevens */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Basisgegevens</h3>

        <div className="toetsing-basisgegevens-grid">
          <div>
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

          <div>
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
              <label className="form-label" htmlFor="kor_van_toepassing_per">KOR van toepassing per</label>
              <input
                className="form-input"
                type="date"
                id="kor_van_toepassing_per"
                value={waarden.kor_van_toepassing_per}
                onChange={(e) => zet("kor_van_toepassing_per", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="kor_verdiend_euro">KOR verdiend tot nu toe (€)</label>
              <input
                className="form-input"
                type="text"
                inputMode="decimal"
                id="kor_verdiend_euro"
                value={waarden.kor_verdiend_euro}
                onChange={(e) => zet("kor_verdiend_euro", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Docent's eigen antwoorden — read-only, geen opslag in toetsingen */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Docent&rsquo;s eigen antwoorden</h3>
        {DOCENT_ANTWOORD_VELDEN.map((item) => (
          <div className="admin-detail-veld" key={item.veld}>
            <span className="admin-detail-label">{item.label}</span>
            <span className="text-body">
              {docentAntwoorden[item.veld] && docentAntwoorden[item.veld].trim() !== "" ? docentAntwoorden[item.veld] : "—"}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Checklist */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Checklist</h3>

        <div className="admin-aanmeldingen-tabel-wrapper mb-section">
          <table className="admin-aanmeldingen-tabel admin-checklist-tabel">
            <thead>
              <tr>
                <th></th>
                <th>Ja</th>
                <th>Nee</th>
                <th>Twijfel</th>
              </tr>
            </thead>
            <tbody>
              {CHECKLIST_ITEMS.map((item, index) => (
                <tr
                  key={item.veld}
                  className={`admin-aanmeldingen-rij ${index % 2 === 0 ? "admin-aanmeldingen-rij-a" : "admin-aanmeldingen-rij-b"}`}
                >
                  <td>{item.label}</td>
                  {(["ja", "nee", "twijfel"] as const).map((optie) => (
                    <td className="admin-checklist-radio-cel" key={optie}>
                      <input
                        type="radio"
                        name={item.veld}
                        checked={waarden[item.veld] === optie}
                        onChange={() => zet(item.veld, optie as never)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

      {/* 4. Open vragen */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Vakinhoudelijk</h3>
        {VAKINHOUDELIJK_ITEMS.map((item) => vrijTekstveld(item.veld, item.label))}
      </div>

      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Houding &amp; cultuur</h3>
        {HOUDING_ITEMS.map((item) => vrijTekstveld(item.veld, item.label))}
      </div>

      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Energie/intuïtieve check</h3>
        {ENERGIE_ITEMS.map((item) => vrijTekstveld(item.veld, item.label))}
      </div>

      {/* 5. Vaste referentietekst */}
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

      {/* 6. Afsluiting */}
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
