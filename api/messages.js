import { ready, db, json, isAdmin } from '../backend/db.js'

export async function GET(request) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401)
  await ready()
  const q = db()
  const rows = await q`
    SELECT id, name, email, message, created_at FROM messages
    ORDER BY created_at DESC LIMIT 100`
  return json(rows)
}

// DELETE /api/messages?id=5
export async function DELETE(request) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401)
  const id = Number(new URL(request.url).searchParams.get('id'))
  if (!Number.isInteger(id)) return json({ error: 'Missing or invalid id.' }, 400)

  await ready()
  const q = db()
  await q`DELETE FROM messages WHERE id = ${id}`
  return json({ ok: true })
}