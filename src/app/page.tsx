import type { Metadata } from 'next'
import Image from 'next/image'
import EmailForm from '@/components/coming-soon/EmailForm'
import styles from './coming-soon.module.css'

export const metadata: Metadata = {
  title: 'Private Yoga at Home — Binnenkort beschikbaar',
  description:
    'Privé yoga aan huis, afgestemd op jouw lichaam en behoeften. Binnenkort beschikbaar in Haarlem en omgeving.',
}

export default function ComingSoonPage() {
  return (
    <div className={styles.page}>

      {/* ─── LOGO ────────────────────────────────────────────────── */}
      <div className={styles.logoWrap}>
        <Image
          src="/logo-verticaal-wit.svg"
          alt="Private Yoga at Home"
          width={48}
          height={48}
          className={styles.logo}
        />
      </div>

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className={`section-dark ${styles.heroSection}`}>
        <div className="container">
          <div className={styles.heroInner}>

            <h1 className="heading-h1 on-dark mb-subtitle">
              Binnenkort beschikbaar<br />in Haarlem en omgeving
            </h1>

            <p className="text-intro on-dark">
              We zijn druk bezig met het opbouwen van het platform waar je
              een zorgvuldig geselecteerde yogadocent kunt vinden die bij
              jou past — en die bij jou thuis lesgeeft. Op jouw tijd, in
              jouw tempo.
            </p>

          </div>
        </div>
      </section>

      {/* ─── AANMELDEN ─────────────────────────────────────────── */}
      <section className={`section-dark ${styles.aanmeldenSection}`}>
        <div className="container">

          <div className={styles.divider} />

          {/* Klant: e-mailadres achterlaten */}
          <div className={styles.block}>
            <h3 className="heading-h3 on-dark mb-icon">
              Wil je op de hoogte blijven?
            </h3>
            <p className={`text-body on-dark ${styles.blockText}`}>
              Laat je e-mailadres achter en we laten je weten zodra het
              platform live gaat.
            </p>

            <EmailForm />

            <span className={`text-small on-dark ${styles.noSpam}`}>
              Geen spam. Alleen een berichtje wanneer het zover is.
            </span>
          </div>

          {/* Scheiding klant / docent */}
          <div className={styles.orDivider}>
            <span>Ben je yogadocent?</span>
          </div>

          {/* Docent: aanmeldlink */}
          <div className={styles.block}>
            <h3 className="heading-h3 on-dark mb-icon">
              Sluit je aan als docent
            </h3>
            <p className={`text-body on-dark ${styles.blockText}`}>
              We selecteren yogadocenten in de regio Haarlem. Geef je op
              via het aanmeldformulier en we nemen contact met je op.
            </p>
            {/* SABINE — vervang href door jouw Tally-URL, bijv. https://tally.so/r/RG06PQ */}
            <a
              className="btn-dark-b"
              href="https://tally.so/r/RG06PQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aanmelden als docent
            </a>
          </div>

        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className="container">
          <p className={`text-small on-dark ${styles.footerText}`}>
            &copy; 2026 Private Yoga at Home &nbsp;·&nbsp;
            <a href="mailto:info@privateyogaathome.nl" className={styles.footerLink}>
              info@privateyogaathome.nl
            </a>
          </p>
        </div>
      </footer>

    </div>
  )
}
