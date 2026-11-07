import { useEffect, useState } from 'react'
import { APPS } from './apps'
import PixelIcon from './PixelIcon'
import { isMuted, setMuted, music } from '../lib/sound'

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function Taskbar({ windows, activeId, onTaskClick }) {
  const time = useClock()
  const [muted, setMutedState] = useState(isMuted())
  const [musicOn, setMusicOn] = useState(music.isOn())

  const toggleMute = () => {
    setMuted(!muted)
    setMutedState(!muted)
  }

  const toggleMusic = () => {
    music.setOn(!musicOn)
    setMusicOn(!musicOn)
  }

  return (
    <footer className="absolute inset-x-0 bottom-0 z-30 flex h-12 items-center justify-between gap-2 border-t-2 border-white bg-os-gray px-1 shadow-[0_-1px_0_#999]">
      <div className="flex h-full min-w-0 flex-1 items-center gap-1 py-1">
        <button className="flex h-full shrink-0 items-center gap-2 border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 bg-os-gray px-3 font-pixel font-semibold active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white">
          <span>⚡</span> Start
        </button>

        <div className="flex h-full min-w-0 gap-1 overflow-x-auto">
          {windows.map((w) => {
            const app = APPS[w.id]
            const isActive = w.id === activeId && !w.minimized
            return (
              <button
                key={w.id}
                onClick={() => onTaskClick(w.id)}
                className={`flex h-full shrink-0 items-center gap-2 border-2 px-3 font-pixel text-sm ${
                  isActive
                    ? 'border-t-gray-600 border-l-gray-600 border-b-white border-r-white bg-white/60 font-semibold'
                    : 'border-t-white border-l-white border-b-gray-600 border-r-gray-600 bg-os-gray'
                }`}
              >
                <PixelIcon id={w.id} className="h-5 w-5 shrink-0" />
                <span className="hidden max-w-[9rem] truncate sm:inline">{app.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex h-full shrink-0 items-center gap-3 border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white px-3 py-1 font-pixel">
        <button
          onClick={toggleMusic}
          aria-label={musicOn ? 'Turn music off' : 'Turn music on'}
          title={musicOn ? 'Music on' : 'Music off'}
          className={`text-base leading-none hover:scale-110 ${musicOn ? '' : 'opacity-40 grayscale'}`}
        >
          🎵
        </button>
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
          title={muted ? 'Effects off' : 'Effects on'}
          className="text-base leading-none hover:scale-110"
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <span className="tracking-wider">{time}</span>
      </div>
    </footer>
  )
}