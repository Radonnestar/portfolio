import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Wallpaper from './components/Wallpaper'
import TopBar from './components/TopBar'
import DesktopIcons from './components/DesktopIcons'
import Computer from './components/Computer'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import Notice from './components/Notice'
import { APPS } from './components/apps'
import { profile } from './data/portfolio'
import { sfx, music, unlockAudio } from './lib/sound'
import { startGreeting, stopGreeting } from './lib/voice'

/* ---------- Layout settings you can tune ---------- */
const ICON_EDGE = 108 // right edge of the desktop icon column (px)
const GAP = 56 // minimum empty space between the icons and the shifted computer (px)
const TARGET_LEFT = ICON_EDGE + GAP // closest the computer's left edge may get to the screen edge
const WIN_GAP = 28 // space between the computer and the windows (px)
const WIDE = 768 // below this screen width the computer does not shift
const WIN_ESTIMATE = 560 // typical window width, used to center the computer + window pair

// Left edge of the computer when shifted: centers the pair,
// but never closer to the icons than TARGET_LEFT
const shiftedLeft = (vw, cw) => Math.max(TARGET_LEFT, (vw - (cw + WIN_GAP + WIN_ESTIMATE)) / 2)

/* ---------- Title text styling ---------- */
// Hard pixel outline (8 directions) plus a blocky drop shadow, so text never blends into clouds
const OUTLINE = '#1b2347'
const nameShadow = [
  `-3px 0 ${OUTLINE}`,
  `3px 0 ${OUTLINE}`,
  `0 -3px ${OUTLINE}`,
  `0 3px ${OUTLINE}`,
  `-3px -3px ${OUTLINE}`,
  `3px -3px ${OUTLINE}`,
  `-3px 3px ${OUTLINE}`,
  `3px 3px ${OUTLINE}`,
  `0 7px ${OUTLINE}`,
  `3px 7px ${OUTLINE}`,
  `-3px 7px ${OUTLINE}`,
].join(', ')
const taglineShadow = [
  `-2px 0 ${OUTLINE}`,
  `2px 0 ${OUTLINE}`,
  `0 -2px ${OUTLINE}`,
  `0 2px ${OUTLINE}`,
  `-2px -2px ${OUTLINE}`,
  `2px -2px ${OUTLINE}`,
  `-2px 2px ${OUTLINE}`,
  `2px 2px ${OUTLINE}`,
  `0 4px ${OUTLINE}`,
].join(', ')

export default function App() {
  // 'off' | 'booting' | 'on'
  const [power, setPower] = useState('off')
  const [wins, setWins] = useState([])
  const [shifted, setShifted] = useState(false) // computer slid to the left
  const [caption, setCaption] = useState('') // subtitle shown on the monitor
  const [notice, setNotice] = useState(null)
  const [m, setM] = useState({ vw: 1280, cw: 0, hh: 0 })

  const zRef = useRef(10)
  const nextZ = () => ++zRef.current
  const compRef = useRef(null)
  const headerRef = useRef(null)
  const noticeTimer = useRef(null)
  const pendingOpen = useRef(null)

  /* ---------- Measuring (computer width, header height, screen width) ---------- */
  useLayoutEffect(() => {
    const measure = () => {
      const next = {
        vw: window.innerWidth,
        cw: compRef.current ? compRef.current.offsetWidth : 0,
        hh: headerRef.current ? headerRef.current.offsetHeight : 0,
      }
      setM((p) => (p.vw === next.vw && p.cw === next.cw && p.hh === next.hh ? p : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (compRef.current) ro.observe(compRef.current)
    if (headerRef.current) ro.observe(headerRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const wide = m.vw >= WIDE
  // How far the computer slides: left to the centered-pair position, and up a bit
  // to stay centered now that the title is gone. The computer's size never changes.
  const shiftX = shifted && wide ? Math.min(0, shiftedLeft(m.vw, m.cw) - (m.vw - m.cw) / 2) : 0
  const shiftY = shifted && wide ? -m.hh / 2 : 0

  /* ---------- Notifications ---------- */
  const showNotice = (text, hint) => {
    clearTimeout(noticeTimer.current)
    setNotice({ key: Date.now(), text, hint })
    noticeTimer.current = setTimeout(() => setNotice(null), 2800)
  }

  /* ---------- Power ---------- */
  // Power changes play their own sounds (stable function so the boot timers aren't reset)
  const changePower = useCallback((next) => {
    setPower(next)
    if (next === 'booting') sfx.powerOn()
    if (next === 'on') sfx.startup()
    if (next === 'off') sfx.powerOff()
  }, [])

  useEffect(() => {
    // Background music plays only while the computer is on
    music.setActive(power === 'on')

    if (power === 'on') {
      // Greeting: speaks and shows subtitles every time the computer turns on
      startGreeting(setCaption)
    } else {
      stopGreeting()
      setCaption('')
      // Turning the computer off closes everything and brings the computer back to the middle
      clearTimeout(pendingOpen.current)
      setWins([])
      setShifted(false)
    }
    return () => stopGreeting()
  }, [power])

  // Unlock audio on the first click, and play a click sound for every button / link
  useEffect(() => {
    const onDown = (e) => {
      unlockAudio()
      if (e.target.closest && e.target.closest('button, a')) sfx.click()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [])

  /* ---------- Windows ---------- */
  const patch = (id, changes) =>
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, ...changes } : w)))

  // Where the computer ends up when shifted, measured from the real element
  // (works even while it is still sliding)
  const layoutTarget = () => {
    const el = compRef.current
    if (!el) return null
    const r = el.getBoundingClientRect()
    const tr = getComputedStyle(el).transform
    const t = tr && tr !== 'none' ? new DOMMatrixReadOnly(tr) : { m41: 0, m42: 0 }
    const naturalLeft = r.left - t.m41
    const naturalTop = r.top - t.m42
    const hh = headerRef.current ? headerRef.current.offsetHeight : 0
    const left = Math.min(naturalLeft, shiftedLeft(window.innerWidth, el.offsetWidth))
    return { right: left + el.offsetWidth, top: naturalTop - hh / 2 }
  }

  const open = (id) => {
    // 1) The computer must be on
    if (power !== 'on') {
      if (power === 'booting') showNotice('The computer is still starting up...', 'Give it a second.')
      else showNotice('Turn on the computer first!', 'Click the power button on the monitor.')
      return
    }

    // 2) Any icon press stops the greeting voice immediately
    stopGreeting()
    setCaption('')

    sfx.open()
    setShifted(true) // the computer starts gliding to the left

    const target = wide ? layoutTarget() : null

    const place = () =>
      setWins((prev) => {
        if (prev.find((w) => w.id === id)) {
          return prev.map((w) => (w.id === id ? { ...w, minimized: false, z: nextZ() } : w))
        }
        const app = APPS[id]
        const vw = window.innerWidth
        const vh = window.innerHeight
        const width = Math.min(app.w, vw * 0.96)
        const n = prev.length
        let x
        let y
        if (target) {
          // Next to the monitor, top edge lined up with it
          x = Math.max(8, Math.min(target.right + WIN_GAP + n * 28, vw - width - 8))
          y = Math.max(64, Math.min(target.top + n * 28, vh - 48 - 160))
        } else {
          x = Math.max(8, Math.min(140 + n * 28, vw - width - 8))
          y = Math.max(64, Math.min(80 + n * 28, vh - 48 - 120))
        }
        return [...prev, { id, x, y, z: nextZ(), minimized: false, maximized: false }]
      })

    // The very first window waits a moment so the computer is already on its way
    if (wins.length === 0 && wide) {
      clearTimeout(pendingOpen.current)
      pendingOpen.current = setTimeout(place, 420)
    } else {
      place()
    }
  }

  const close = (id) => {
    sfx.close()
    const rest = wins.filter((w) => w.id !== id)
    setWins(rest)
    // Last window closed: the computer glides back to the middle
    if (rest.length === 0) setShifted(false)
  }
  const focus = (id) => patch(id, { minimized: false, z: nextZ() })
  const minimize = (id) => {
    sfx.minimize()
    patch(id, { minimized: true })
  }
  const toggleMax = (id) => {
    sfx.maximize()
    setWins((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized, z: nextZ() } : w))
    )
  }
  const move = (id, x, y) => patch(id, { x, y })

  // The active window is the visible one with the highest z
  const visible = wins.filter((w) => !w.minimized)
  const activeId = visible.length ? visible.reduce((a, b) => (a.z > b.z ? a : b)).id : null

  const onTaskClick = (id) => {
    const w = wins.find((x) => x.id === id)
    if (w.minimized || id !== activeId) focus(id)
    else minimize(id)
  }

  return (
    <div className="fixed inset-0 overflow-hidden select-none">
      <Wallpaper power={power} />
      <TopBar onOpen={open} />

      {/* Title + computer */}
      <main className="pointer-events-none absolute inset-x-0 top-14 bottom-12 z-10 flex flex-col items-center px-4">
        {/* Fades out (but keeps its space, so the computer never changes size) */}
        <div
          ref={headerRef}
          aria-hidden={shifted}
          className={`shrink-0 pt-4 text-center transition-all duration-500 ease-out motion-reduce:transition-none ${
            shifted ? '-translate-y-4 opacity-0' : 'opacity-100'
          }`}
        >
          <h1
            className="font-pixel text-4xl font-bold uppercase leading-none tracking-wider text-white sm:text-6xl"
            style={{ textShadow: nameShadow }}
          >
            {profile.name}
          </h1>
          <p
            className="mt-2 font-pixel text-sm font-medium leading-none tracking-wide text-[#ffe27a] sm:text-xl"
            style={{ textShadow: taglineShadow }}
          >
            {profile.role}
          </p>
        </div>

        <div
          className="flex min-h-0 w-full flex-1 items-center justify-center py-4"
          style={{ containerType: 'size' }}
        >
          {/* This box slides left when a window is open */}
          <div
            ref={compRef}
            className="pointer-events-auto relative transition-transform duration-[900ms] ease-[cubic-bezier(.65,.05,.25,1)] motion-reduce:transition-none"
            style={{ transform: `translate(${shiftX}px, ${shiftY}px)` }}
          >
            <Computer power={power} setPower={changePower} caption={caption} />
          </div>
        </div>
      </main>

      <DesktopIcons onOpen={open} />
      <Notice notice={notice} />

      {/* Windows layer */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {wins.map((w) => {
          const app = APPS[w.id]
          return (
            <Window
              key={w.id}
              win={w}
              app={app}
              active={w.id === activeId}
              onFocus={() => focus(w.id)}
              onClose={() => close(w.id)}
              onMinimize={() => minimize(w.id)}
              onMaximize={() => toggleMax(w.id)}
              onMove={(x, y) => move(w.id, x, y)}
            >
              <app.Content />
            </Window>
          )
        })}
      </div>

      <Taskbar windows={wins} activeId={activeId} onTaskClick={onTaskClick} />
    </div>
  )
}