import { useEffect, useState } from 'react'
import { profile, skills, experience, education, projects, research } from '../data/portfolio'

const bevel =
  'border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 bg-os-gray'

const Chip = ({ children }) => (
  <span className="inline-block border border-os-blue/40 bg-os-blue/10 px-2 py-0.5 font-pixel text-xs text-os-blue">
    {children}
  </span>
)

const Heading = ({ children }) => (
  <h2 className="mb-2 font-pixel text-lg font-semibold text-slate-900">{children}</h2>
)

/* ---------------- About ---------------- */
function About() {
  return (
    <div className="space-y-3 p-4 text-sm leading-relaxed text-slate-800">
      <div className="flex items-center gap-3">
        <div className="grid h-16 w-16 shrink-0 place-items-center border-2 border-slate-700 bg-sky-200 text-3xl">
          🧑‍💻
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">{profile.name}</h2>
          <p className="text-slate-600">{profile.role}</p>
          <p className="text-slate-500">📍 {profile.location}</p>
        </div>
      </div>
      {profile.bio.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <div className="flex flex-wrap gap-2 pt-1">
        {profile.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className={`${bevel} px-3 py-1 font-pixel text-xs hover:brightness-95`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Projects (loaded from the API) ---------------- */
function Projects() {
  // Start with the saved copy so the window is never empty, then swap in live data
  const [items, setItems] = useState(projects)
  const [state, setState] = useState('loading') // 'loading' | 'live' | 'offline'

  useEffect(() => {
    let cancelled = false
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Bad response')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        if (Array.isArray(data) && data.length) {
          setItems(data)
          setState('live')
        } else {
          setState('offline')
        }
      })
      .catch(() => {
        if (!cancelled) setState('offline')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="p-4 text-sm text-slate-800">
      {/* Status line, only visible while developing locally */}
      {import.meta.env.DEV && (
        <p className="mb-2 font-pixel text-xs text-slate-400">
          {state === 'loading' && 'Loading projects...'}
          {state === 'live' && 'Loaded from the database'}
          {state === 'offline' && 'API not reachable, showing the saved copy'}
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((p) => (
          <div key={p.id ?? p.title} className="flex flex-col gap-2 border-2 border-slate-300 bg-slate-50 p-3">
            <div className="grid h-20 place-items-center bg-gradient-to-br from-sky-300 to-emerald-300 text-3xl">
              🗂️
            </div>
            <h3 className="font-display text-base font-bold">{p.title}</h3>
            <p className="text-slate-600">{p.description}</p>
            <div className="flex flex-wrap gap-1">
              {(p.tags || []).map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <div className="mt-auto flex gap-2 pt-1">
              <a href={p.live} target="_blank" rel="noreferrer" className={`${bevel} px-3 py-1 font-pixel text-xs`}>
                Live
              </a>
              <a href={p.code} target="_blank" rel="noreferrer" className={`${bevel} px-3 py-1 font-pixel text-xs`}>
                Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Skills ---------------- */
function Bar({ level }) {
  const filled = Math.round(level / 10)
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className={`h-2.5 w-3 ${i < filled ? 'bg-os-blue' : 'bg-slate-200'}`} />
      ))}
    </div>
  )
}

function Skills() {
  return (
    <div className="space-y-4 p-4 text-sm text-slate-800">
      {skills.map((g) => (
        <div key={g.group}>
          <Heading>[{g.group}]</Heading>
          <div className="space-y-1.5">
            {g.items.map(([name, level]) => (
              <div key={name} className="flex items-center justify-between gap-3">
                <span className="font-pixel">{name}</span>
                <Bar level={level} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Experience ---------------- */
function Experience() {
  return (
    <div className="space-y-4 p-4 text-sm text-slate-800">
      {experience.map((e, i) => (
        <div key={i} className="border-l-4 border-os-blue pl-3">
          <h3 className="font-display text-base font-bold">{e.role}</h3>
          <p className="text-slate-600">
            {e.company} · <span className="font-pixel">{e.period}</span>
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-slate-700">
            {e.points.map((p, k) => (
              <li key={k}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Education ---------------- */
function Education() {
  return (
    <div className="space-y-4 p-4 text-sm text-slate-800">
      {education.map((e, i) => (
        <div key={i} className="flex gap-3">
          <div className="text-2xl">🎓</div>
          <div>
            <h3 className="font-display text-base font-bold">{e.degree}</h3>
            <p className="text-slate-600">
              {e.school} · <span className="font-pixel">{e.period}</span>
            </p>
            {e.note && <p className="mt-1 text-slate-700">{e.note}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Research ---------------- */
function Research() {
  return (
    <div className="space-y-3 p-4 text-sm text-slate-800">
      {research.map((r, i) => (
        <div key={i} className="border-2 border-slate-300 bg-slate-50 p-3">
          <h3 className="font-display text-base font-bold">{r.title}</h3>
          <p className="font-pixel text-xs text-slate-500">
            {r.venue} · {r.year}
          </p>
          <p className="mt-1 text-slate-700">{r.summary}</p>
          <a href={r.link} target="_blank" rel="noreferrer" className={`${bevel} mt-2 inline-block px-3 py-1 font-pixel text-xs`}>
            Read
          </a>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ state: 'idle', text: '' })

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'sending', text: 'Sending...' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus({ state: 'sent', text: 'Message sent. Thank you!' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({
        state: 'error',
        text: err.message === 'Failed to fetch' ? 'Could not reach the server.' : err.message,
      })
    }
  }

  const input =
    'w-full border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white bg-white px-2 py-1 text-sm outline-none focus:bg-sky-50'

  return (
    <form onSubmit={submit} className="space-y-3 p-4 text-sm text-slate-800">
      <p className="text-slate-600">Send me a message and I will get back to you.</p>
      <label className="block">
        <span className="font-pixel text-xs">Name</span>
        <input className={input} value={form.name} onChange={set('name')} required maxLength={80} />
      </label>
      <label className="block">
        <span className="font-pixel text-xs">Email</span>
        <input className={input} type="email" value={form.email} onChange={set('email')} required maxLength={120} />
      </label>
      <label className="block">
        <span className="font-pixel text-xs">Message</span>
        <textarea className={`${input} h-28 resize-none`} value={form.message} onChange={set('message')} required maxLength={2000} />
      </label>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status.state === 'sending'}
          className={`${bevel} px-4 py-1 font-pixel text-sm active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white disabled:opacity-60`}
        >
          Send
        </button>
        {status.text && (
          <span className={status.state === 'error' ? 'text-red-600' : status.state === 'sent' ? 'text-green-700' : 'text-slate-500'}>
            {status.text}
          </span>
        )}
      </div>
    </form>
  )
}

/* ---------------- Window registry ---------------- */
export const APPS = {
  about: { title: 'About_Me.txt', icon: '📄', w: 480, Content: About },
  projects: { title: 'Projects.exe', icon: '🗂️', w: 640, Content: Projects },
  skills: { title: 'Skills.config', icon: '⚙️', w: 420, Content: Skills },
  experience: { title: 'Experience.log', icon: '💼', w: 500, Content: Experience },
  education: { title: 'Education.doc', icon: '🎓', w: 460, Content: Education },
  research: { title: 'Research.folder', icon: '📁', w: 520, Content: Research },
  contact: { title: 'Contact.exe', icon: '✉️', w: 440, Content: Contact },
}