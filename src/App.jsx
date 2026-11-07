import { useCallback, useEffect, useRef, useState } from 'react'
import Wallpaper from './components/Wallpaper'
import Character from './components/Character'
import TopBar from './components/TopBar'
import DesktopIcons from './components/DesktopIcons'
import Computer from './components/Computer'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import { APPS } from './components/apps'
import { sfx, music, unlockAudio } from './lib/sound'

export default function App() {
  // 'off' | 'booting' | 'on'
  const [power, setPower] = useState('off')
  const [wins, setWins] = useState([])
  const zRef = useRef(10)
  const nextZ = () => ++zRef.current

  // Power changes play their own sounds (stable function so the boot timers aren't reset)
  const changePower = useCallback((next) => {
    setPower(next)
    if (next === 'booting') sfx.powerOn()
    if (next === 'on') sfx.startup()
    if (next === 'off') sfx.powerOff()
  }, [])

  // Background music plays only while the computer is on
  useEffect(() => {
    music.setActive(power === 'on')
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

  const patch = (id, changes) =>
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, ...changes } : w)))

  const open = (id) => {
    sfx.open()
    setWins((prev) => {
      if (prev.find((w) => w.id === id)) {
        return prev.map((w) => (w.id === id ? { ...w, minimized: false, z: nextZ() } : w))
      }
      const app = APPS[id]
      const vw = window.innerWidth
      const vh = window.innerHeight
      const width = Math.min(app.w, vw * 0.96)
      const n = prev.length
      const x = Math.max(8, Math.min(140 + n * 28, vw - width - 8))
      const y = Math.max(64, Math.min(80 + n * 28, vh - 48 - 120))
      return [...prev, { id, x, y, z: nextZ(), minimized: false, maximized: false }]
    })
  }

  const close = (id) => {
    sfx.close()
    setWins((prev) => prev.filter((w) => w.id !== id))
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
      <Character playing={power === 'on'} />
      <TopBar onOpen={open} />

      {/* Title + computer */}
      <main className="pointer-events-none absolute inset-x-0 top-14 bottom-12 z-10 flex flex-col items-center px-4">
        <div className="shrink-0 pt-3 text-center">
          <h1 className="font-display text-4xl font-bold text-white drop-shadow-[0_3px_0_rgba(0,0,0,.35)] sm:text-6xl">
            Your Name
          </h1>
          <p className="mt-1 font-display text-base font-medium text-white drop-shadow-[0_2px_0_rgba(0,0,0,.35)] sm:text-lg">
            Full-stack developer &amp; creative coder
          </p>
        </div>

        <div
          className="flex min-h-0 w-full flex-1 items-center justify-center py-4"
          style={{ containerType: 'size' }}
        >
          <div className="pointer-events-auto">
            <Computer power={power} setPower={changePower} />
          </div>
        </div>
      </main>

      <DesktopIcons onOpen={open} />

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