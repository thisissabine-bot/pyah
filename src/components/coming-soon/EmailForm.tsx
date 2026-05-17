'use client'

import { useState } from 'react'
import styles from '@/app/coming-soon.module.css'

export default function EmailForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: verbind met Supabase — supabase.from('aanmeldingen').insert({ email, type: 'klant' })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.formSuccess}>
        Gelukt! We laten je weten zodra we live gaan.
      </div>
    )
  }

  return (
    <form className={styles.emailForm} onSubmit={handleSubmit}>
      <input
        className={styles.emailInput}
        type="email"
        placeholder="Jouw e-mailadres"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <button type="submit" className="btn-1 on-dark">
        Houd me op de hoogte
      </button>
    </form>
  )
}
