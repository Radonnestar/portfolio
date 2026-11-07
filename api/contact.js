import { z } from 'zod'
import { ready, db, json, clientIp, hashIp } from '../backend/db.js'

const schema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(80, 'Name is too long.'),
  email: z.string().trim().email('Please enter a valid email.').max(120),
  message: z.string().trim().min(5, 'Message is too short.').max(2000, 'Message is too long.'),
})

const esc = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// Show technical details only when running locally (never on the deployed site)
const showDetails = !['production', 'preview'].includes(process.env.VERCEL_ENV)

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) return json({ error: parsed.error.issues[0].message }, 400)
  const { name, email, message } = parsed.data

  // Save to the database, with a simple rate limit (5 messages per hour per visitor)
  try {
    await ready()
    const q = db()
    const ipHash = hashIp(clientIp(request))

    const [{ count }] = await q`
      SELECT COUNT(*)::int AS count FROM messages
      WHERE ip_hash = ${ipHash} AND created_at > now() - interval '1 hour'`
    if (count >= 5) return json({ error: 'Too many messages. Please try again later.' }, 429)

    await q`INSERT INTO messages (name, email, message, ip_hash)
            VALUES (${name}, ${email}, ${message}, ${ipHash})`
  } catch (err) {
    console.error('contact: database error', err)
    const detail = showDetails ? ` [${err?.message || err}]` : ''
    return json({ error: `Could not save your message. Please try again.${detail}` }, 500)
  }

  // Optional email notification (only if configured). A failure here never breaks the form.
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
          to: [process.env.CONTACT_TO_EMAIL],
          reply_to: email,
          subject: `New portfolio message from ${name.replace(/\s+/g, ' ')}`,
          html: `<p><strong>${esc(name)}</strong> (${esc(email)})</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`,
        }),
      })
    } catch (err) {
      console.error('contact: email failed', err)
    }
  }

  return json({ ok: true }, 201)
}