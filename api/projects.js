import { z } from 'zod'
import { ready, db, json, isAdmin } from '../backend/db.js'

const schema = z.object({
  title: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(500),
  tags: z.array(z.string().trim().min(1).max(30)).max(10).default([]),
  live: z.string().trim().max(300).default('#'),
  code: z.string().trim().max(300).default('#'),
})

// Public: list all projects (cached briefly at the edge)
export async function GET() {
  try {
    await ready()
    const q = db()
    const rows = await q`SELECT id, title, description, tags, live, code FROM projects ORDER BY sort, id`
    return json(rows, 200, {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    })
  } catch (err) {
    console.error('projects: GET failed', err)
    return json({ error: 'Could not load projects.' }, 500)
  }
}

// Admin: add a project
export async function POST(request) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401)

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON.' }, 400)
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) return json({ error: parsed.error.issues[0].message }, 400)
  const p = parsed.data

  await ready()
  const q = db()
  const [{ next }] = await q`SELECT COALESCE(MAX(sort), -1) + 1 AS next FROM projects`
  const [row] = await q`
    INSERT INTO projects (title, description, tags, live, code, sort)
    VALUES (${p.title}, ${p.description}, ${JSON.stringify(p.tags)}::jsonb, ${p.live}, ${p.code}, ${next})
    RETURNING id, title, description, tags, live, code`
  return json(row, 201)
}

// Admin: delete a project   (DELETE /api/projects?id=3)
export async function DELETE(request) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401)
  const id = Number(new URL(request.url).searchParams.get('id'))
  if (!Number.isInteger(id)) return json({ error: 'Missing or invalid id.' }, 400)

  await ready()
  const q = db()
  await q`DELETE FROM projects WHERE id = ${id}`
  return json({ ok: true })
}