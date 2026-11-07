import { createHash, timingSafeEqual } from 'node:crypto'
import { neon } from '@neondatabase/serverless'
import { projects as seedProjects } from '../src/data/portfolio.js'

let sql = null

export function db() {
  if (!sql) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set')
    sql = neon(process.env.DATABASE_URL)
  }
  return sql
}

// Create tables once per server instance, and seed projects on first run
let readyPromise = null

export function ready() {
  if (!readyPromise) {
    readyPromise = init().catch((err) => {
      readyPromise = null
      throw err
    })
  }
  return readyPromise
}

async function init() {
  const q = db()

  await q`CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`

  await q`CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags JSONB NOT NULL DEFAULT '[]',
    live TEXT,
    code TEXT,
    sort INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`

  const [{ count }] = await q`SELECT COUNT(*)::int AS count FROM projects`
  if (count === 0) {
    for (const [i, p] of seedProjects.entries()) {
      await q`INSERT INTO projects (title, description, tags, live, code, sort)
              VALUES (${p.title}, ${p.description}, ${JSON.stringify(p.tags)}::jsonb, ${p.live}, ${p.code}, ${i})`
    }
  }
}

/* ---------- small helpers ---------- */

export function json(data, status = 200, headers = {}) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })
}

function safeEqual(a, b) {
  const A = Buffer.from(a)
  const B = Buffer.from(b)
  return A.length === B.length && timingSafeEqual(A, B)
}

// Admin routes need:  Authorization: Bearer <ADMIN_TOKEN>
export function isAdmin(request) {
  const token = process.env.ADMIN_TOKEN
  if (!token) return false
  return safeEqual(request.headers.get('authorization') || '', `Bearer ${token}`)
}

export function clientIp(request) {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
}

// We store only a hash of the IP (used for rate limiting), never the IP itself
export function hashIp(ip) {
  return createHash('sha256')
    .update(ip + (process.env.IP_SALT || 'portfolio'))
    .digest('hex')
    .slice(0, 32)
}