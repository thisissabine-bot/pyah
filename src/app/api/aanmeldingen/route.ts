import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'E-mailadres ontbreekt' }, { status: 400 })
  }

  await resend.emails.send({
    from: 'Private Yoga at Home <noreply@privateyogaathome.nl>',
    to: 'info@privateyogaathome.nl',
    subject: 'Nieuwe aanmelding — coming soon pagina',
    text: `Nieuw e-mailadres aangemeld via de coming-soon pagina:\n\n${email}`,
  })

  return NextResponse.json({ ok: true })
}
