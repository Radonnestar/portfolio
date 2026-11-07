import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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

// A real link: not empty and not the "#" placeholder
const hasLink = (url) => Boolean(url) && url !== '#'

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

      {profile.achievements?.length > 0 && (
        <div className="pt-1">
          <Heading>[Achievements]</Heading>
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            {profile.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

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

/* ---------------- Projects ---------------- */

// Screenshot with a gradient fallback if there is no image (or it fails to load)
function Shot({ src, alt, className = '', whole = false }) {
  const [bad, setBad] = useState(false)
  if (!src || bad) {
    return (
      <div className={`grid aspect-video place-items-center bg-gradient-to-br from-sky-300 to-emerald-300 text-3xl ${className}`}>
        🗂️
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={() => setBad(true)}
      // whole: show the full picture at its own shape. Otherwise fill the frame, anchored to the top.
      className={whole ? `block h-auto w-full ${className}` : `object-cover object-top ${className}`}
    />
  )
}

// The popup with the full details of one project
function ProjectDetail({ project, onClose }) {
  const images = project.images?.length ? project.images : project.image ? [project.image] : []
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const live = hasLink(project.live)
  const code = hasLink(project.code)

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] grid place-items-center bg-black/45 p-3"
      onPointerDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onPointerDown={(e) => e.stopPropagation()}
        className="win-pop flex max-h-[90vh] w-[min(760px,96vw)] flex-col border-2 border-[#1d4fa8] bg-os-gray shadow-[6px_6px_0_rgba(0,0,0,.4)]"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between gap-2 bg-gradient-to-b from-[#3d8cf0] via-[#2b6fd6] to-[#2159b8] px-1.5 py-1">
          <span className="truncate font-pixel text-sm text-white">{project.title}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-6 w-6 shrink-0 place-items-center border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 !bg-os-red font-pixel text-xs leading-none text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="m-1 min-h-0 flex-1 space-y-4 overflow-y-auto border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white bg-white p-4 text-sm text-slate-800">
          {/* Screenshot(s), shown whole and uncropped */}
          <div>
            <div className="overflow-hidden border-2 border-slate-300 bg-slate-100">
              <Shot src={images[idx]} alt={project.title} whole />
            </div>
            {images.length > 1 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIdx(i)}
                    aria-label={`Screenshot ${i + 1}`}
                    className={`h-12 w-20 overflow-hidden border-2 ${
                      i === idx ? 'border-os-blue' : 'border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Shot src={src} alt="" className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-display text-xl font-bold">{project.title}</h2>
            {project.tagline && <p className="mt-0.5 text-slate-600">{project.tagline}</p>}
          </div>

          {project.description && <p className="leading-relaxed text-slate-700">{project.description}</p>}

          {project.details?.length > 0 && (
            <div>
              <Heading>[Highlights]</Heading>
              <ul className="list-disc space-y-1 pl-5 text-slate-700">
                {project.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {project.tags?.length > 0 && (
            <div>
              <Heading>[Tools]</Heading>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          )}

          {(live || code) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-t-[#ff7a70] border-l-[#ff7a70] border-b-[#8f1c14] border-r-[#8f1c14] bg-os-red px-4 py-1.5 font-pixel text-sm font-semibold text-white hover:brightness-110"
                >
                  ▶ Live Demo
                </a>
              )}
              {code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                  className={`${bevel} px-4 py-1.5 font-pixel text-sm hover:brightness-95`}
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="p-4 text-sm text-slate-800">
      <p className="mb-3 font-pixel text-xs text-slate-500">Click a project to see the details.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p) => {
          const cover = p.images?.[0] || p.image
          return (
            <button
              key={p.title}
              onClick={() => setSelected(p)}
              className="group flex flex-col gap-2 border-2 border-slate-300 bg-slate-50 p-3 text-left transition hover:border-os-blue hover:bg-white"
            >
              <Shot src={cover} alt={p.title} className="aspect-video w-full border border-slate-300" />
              <h3 className="font-display text-base font-bold">{p.title}</h3>
              <p className="line-clamp-3 text-slate-600">{p.tagline || p.description}</p>
              <div className="flex flex-wrap gap-1">
                {(p.tags || []).slice(0, 4).map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <span className="mt-auto pt-1 font-pixel text-xs text-os-blue group-hover:underline">
                View details →
              </span>
            </button>
          )
        })}
      </div>

      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

/* ---------------- Skills ---------------- */
function Skills() {
  return (
    <div className="space-y-4 p-4 text-sm text-slate-800">
      {skills.map((g) => (
        <div key={g.group}>
          <Heading>[{g.group}]</Heading>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((name) => (
              <Chip key={name}>{name}</Chip>
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
          {r.link && (
            <a href={r.link} target="_blank" rel="noreferrer" className={`${bevel} mt-2 inline-block px-3 py-1 font-pixel text-xs`}>
              Read
            </a>
          )}
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
  research: { title: 'Research.dir', icon: '📁', w: 520, Content: Research },
  contact: { title: 'Contact.exe', icon: '✉️', w: 440, Content: Contact },
}