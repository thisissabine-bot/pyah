"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  aanmeldformulierFormSchema,
  type AanmeldformulierValues,
  type AanmeldformulierFormValues,
  JAREN_LESERVARING_OPTIES,
  RECENTE_LESPRAKTIJK_OPTIES,
  ERVARING_PRIVELESSEN_OPTIES,
  TRAININGSUREN_OPTIES,
  REGIO_OPTIES,
} from "@/lib/aanmeldformulier";

export default function AanmeldFormulier() {
  const [verzonden, setVerzonden] = useState(false);
  const [serverFout, setServerFout] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AanmeldformulierFormValues>({
    resolver: zodResolver(aanmeldformulierFormSchema),
    defaultValues: {
      naam: "",
      email: "",
      woonplaats: "",
      opleiding: "",
      yogastijlen: "",
      heeft_andere_disciplines: undefined,
      andere_disciplines: "",
      motivatie: "",
      heeft_toelichting: undefined,
      toelichting: "",
      akkoord_erkende_opleiding: false,
      akkoord_geen_garantie: false,
      akkoord_avb: false,
      akkoord_privacyverklaring: false,
    },
  });

  const heeftAndereDisciplines = watch("heeft_andere_disciplines");
  const heeftToelichting = watch("heeft_toelichting");

  const onSubmit = async (values: AanmeldformulierFormValues) => {
    setServerFout("");

    const payload: AanmeldformulierValues = {
      naam: values.naam,
      email: values.email,
      woonplaats: values.woonplaats,
      opleiding: values.opleiding,
      trainingsuren: values.trainingsuren,
      jaren_leservaring: values.jaren_leservaring,
      recente_lespraktijk: values.recente_lespraktijk,
      ervaring_privelessen: values.ervaring_privelessen,
      yogastijlen: values.yogastijlen,
      andere_disciplines: values.heeft_andere_disciplines === "ja" ? values.andere_disciplines : "",
      motivatie: values.motivatie,
      toelichting: values.heeft_toelichting === "ja" ? values.toelichting : "",
      regio: values.regio,
      akkoord_erkende_opleiding: values.akkoord_erkende_opleiding,
      akkoord_geen_garantie: values.akkoord_geen_garantie,
      akkoord_avb: values.akkoord_avb,
      akkoord_privacyverklaring: values.akkoord_privacyverklaring,
    };

    try {
      const res = await fetch("/api/voor-docenten/aanmelden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setServerFout("Er ging iets mis bij het versturen. Probeer het later opnieuw.");
        return;
      }
      setVerzonden(true);
    } catch {
      setServerFout("Er ging iets mis bij het versturen. Probeer het later opnieuw.");
    }
  };

  if (verzonden) {
    return (
      <div>
        <h3 className="heading-h3 mb-text">Bedankt voor je aanmelding!</h3>
        <p className="text-body">
          We hebben je aanmelding ontvangen en sturen je zo een bevestiging per e-mail. Je hoort meestal binnen 5 werkdagen van ons.
        </p>
      </div>
    );
  }

  return (
    <form className="form-body" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Persoonlijke gegevens */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Persoonlijke gegevens</h3>

        <div className="form-group">
          <label className="form-label" htmlFor="naam">Naam <span className="form-required">*</span></label>
          <input className="form-input" type="text" id="naam" {...register("naam")} />
          {errors.naam && <p className="form-error">{errors.naam.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">E-mailadres <span className="form-required">*</span></label>
          <input className="form-input" type="email" id="email" {...register("email")} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="woonplaats">Woonplaats <span className="form-required">*</span></label>
          <input className="form-input" type="text" id="woonplaats" {...register("woonplaats")} />
          {errors.woonplaats && <p className="form-error">{errors.woonplaats.message}</p>}
        </div>
      </div>

      {/* Opleiding & ervaring */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Opleiding &amp; ervaring</h3>

        <div className="form-group">
          <label className="form-label" htmlFor="opleiding">Bij welk (internationaal) erkend instituut zoals Yoga Alliance of gelijkwaardig heb je je opleiding gevolgd? <span className="form-required">*</span></label>
          <textarea className="form-textarea" id="opleiding" {...register("opleiding")} />
          {errors.opleiding && <p className="form-error">{errors.opleiding.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="trainingsuren">Hoeveel trainingsuren heeft je yogaopleiding omvat? <span className="form-required">*</span></label>
          <select className="form-select" id="trainingsuren" defaultValue="" {...register("trainingsuren")}>
            <option value="" disabled>Maak een keuze</option>
            {TRAININGSUREN_OPTIES.map((optie) => (
              <option key={optie} value={optie}>{optie}</option>
            ))}
          </select>
          {errors.trainingsuren && <p className="form-error">{errors.trainingsuren.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="jaren-leservaring">Hoeveel jaar geef je yogales? <span className="form-required">*</span></label>
          <select className="form-select" id="jaren-leservaring" defaultValue="" {...register("jaren_leservaring")}>
            <option value="" disabled>Maak een keuze</option>
            {JAREN_LESERVARING_OPTIES.map((optie) => (
              <option key={optie} value={optie}>{optie}</option>
            ))}
          </select>
          {errors.jaren_leservaring && <p className="form-error">{errors.jaren_leservaring.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="recente-lespraktijk">Heb je in de afgelopen 6–12 maanden actief lesgegeven? <span className="form-required">*</span></label>
          <select className="form-select" id="recente-lespraktijk" defaultValue="" {...register("recente_lespraktijk")}>
            <option value="" disabled>Maak een keuze</option>
            {RECENTE_LESPRAKTIJK_OPTIES.map((optie) => (
              <option key={optie} value={optie}>{optie}</option>
            ))}
          </select>
          {errors.recente_lespraktijk && <p className="form-error">{errors.recente_lespraktijk.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="ervaring-privelessen">Heb je ervaring met privélessen aan huis? <span className="form-required">*</span></label>
          <select className="form-select" id="ervaring-privelessen" defaultValue="" {...register("ervaring_privelessen")}>
            <option value="" disabled>Maak een keuze</option>
            {ERVARING_PRIVELESSEN_OPTIES.map((optie) => (
              <option key={optie} value={optie}>{optie}</option>
            ))}
          </select>
          {errors.ervaring_privelessen && <p className="form-error">{errors.ervaring_privelessen.message}</p>}
        </div>
      </div>

      {/* Specialisaties */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Specialisaties</h3>

        <div className="form-group">
          <label className="form-label" htmlFor="yogastijlen">Welke yogastijlen geef je les? <span className="form-required">*</span></label>
          <textarea className="form-textarea" id="yogastijlen" {...register("yogastijlen")} />
          {errors.yogastijlen && <p className="form-error">{errors.yogastijlen.message}</p>}
        </div>

        <div className="form-group">
          <p className="form-label">Bied je daarnaast nog andere disciplines aan? <span className="form-required">*</span></p>
          <p className="form-hint">Denk bijvoorbeeld aan ademwerk, meditatie, sound healing, coaching of workshops.</p>
          <label className="form-radio-row">
            <input type="radio" value="nee" {...register("heeft_andere_disciplines")} />
            <span className="text-body">Nee</span>
          </label>
          <label className="form-radio-row">
            <input type="radio" value="ja" {...register("heeft_andere_disciplines")} />
            <span className="text-body">Ja</span>
          </label>
          {errors.heeft_andere_disciplines && <p className="form-error">{errors.heeft_andere_disciplines.message}</p>}
        </div>

        {heeftAndereDisciplines === "ja" && (
          <div className="form-group">
            <label className="form-label" htmlFor="andere-disciplines">Zo ja, welke? <span className="form-required">*</span></label>
            <textarea className="form-textarea" id="andere-disciplines" {...register("andere_disciplines")} />
            {errors.andere_disciplines && <p className="form-error">{errors.andere_disciplines.message}</p>}
          </div>
        )}
      </div>

      {/* Kennismaking */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Kennismaking</h3>

        <div className="form-group">
          <label className="form-label" htmlFor="motivatie">Waarom wil je je aansluiten bij Private Yoga at Home? <span className="form-required">*</span></label>
          <textarea className="form-textarea" id="motivatie" {...register("motivatie")} />
          {errors.motivatie && <p className="form-error">{errors.motivatie.message}</p>}
        </div>

        <div className="form-group">
          <p className="form-label">Is er nog iets dat je met ons wilt delen? <span className="form-required">*</span></p>
          <p className="form-hint">Bijvoorbeeld als je een bijzondere situatie hebt of iets wilt toelichten.</p>
          <label className="form-radio-row">
            <input type="radio" value="nee" {...register("heeft_toelichting")} />
            <span className="text-body">Nee</span>
          </label>
          <label className="form-radio-row">
            <input type="radio" value="ja" {...register("heeft_toelichting")} />
            <span className="text-body">Ja</span>
          </label>
          {errors.heeft_toelichting && <p className="form-error">{errors.heeft_toelichting.message}</p>}
        </div>

        {heeftToelichting === "ja" && (
          <div className="form-group">
            <label className="form-label" htmlFor="toelichting">Zo ja, licht toe: <span className="form-required">*</span></label>
            <textarea className="form-textarea" id="toelichting" {...register("toelichting")} />
            {errors.toelichting && <p className="form-error">{errors.toelichting.message}</p>}
          </div>
        )}
      </div>

      {/* Regio */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Regio</h3>
        <p className="form-hint mb-text">Kies één van de twee.</p>

        {REGIO_OPTIES.map((optie) => (
          <label className="form-radio-row" key={optie.value}>
            <input type="radio" value={optie.value} {...register("regio")} />
            <span className="text-body">{optie.label}</span>
          </label>
        ))}
        {errors.regio && <p className="form-error">{errors.regio.message}</p>}
      </div>

      {/* Verklaringen */}
      <div className="form-fieldset">
        <h3 className="heading-h3 mb-text">Verklaringen</h3>
        <p className="form-hint mb-text">Vink alle vier de onderdelen aan om je aanmelding te kunnen versturen.</p>

        <label className="form-checkbox-row">
          <input type="checkbox" {...register("akkoord_erkende_opleiding")} />
          <span className="text-body">Ik heb een erkende yogaopleiding afgerond.</span>
        </label>
        {errors.akkoord_erkende_opleiding && <p className="form-error">{errors.akkoord_erkende_opleiding.message}</p>}

        <label className="form-checkbox-row">
          <input type="checkbox" {...register("akkoord_geen_garantie")} />
          <span className="text-body">Ik begrijp dat het insturen van dit formulier geen garantie geeft op toelating tot het platform.</span>
        </label>
        {errors.akkoord_geen_garantie && <p className="form-error">{errors.akkoord_geen_garantie.message}</p>}

        <label className="form-checkbox-row">
          <input type="checkbox" {...register("akkoord_avb")} />
          <span className="text-body">Ik heb al een AVB-verzekering (aansprakelijkheidsverzekering bedrijven), of ik begrijp dat ik deze moet afsluiten voordat mijn profiel live kan gaan.</span>
        </label>
        {errors.akkoord_avb && <p className="form-error">{errors.akkoord_avb.message}</p>}

        <label className="form-checkbox-row">
          <input type="checkbox" {...register("akkoord_privacyverklaring")} />
          <span className="text-body">
            Ik ga akkoord met de verwerking van mijn persoonsgegevens zoals beschreven in het{" "}
            <Link className="accent-terracotta" href="/privacybeleid" target="_blank" rel="noopener noreferrer">Privacybeleid</Link>.
          </span>
        </label>
        {errors.akkoord_privacyverklaring && <p className="form-error">{errors.akkoord_privacyverklaring.message}</p>}
      </div>

      {serverFout && <p className="form-error mb-text">{serverFout}</p>}

      <button type="submit" className="btn-light" disabled={isSubmitting}>
        {isSubmitting ? "Bezig met versturen…" : "Verstuur mijn aanmelding"}
      </button>
    </form>
  );
}
