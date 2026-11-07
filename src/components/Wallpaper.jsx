import { useEffect, useState } from 'react'

const FRAMES = [1, 2, 3, 4, 5].map((n) => `/frames/frame${n}.jpg`)

// Sleepy loop (computer off). Each step is [frame index, how long to show it in ms]
const SEQUENCE = [
  [0, 3500],
  [1, 1800],
  [2, 700],
  [3, 700],
  [4, 4000],
  [3, 700],
  [2, 700],
  [1, 1500],
]

export default function Wallpaper({ power = 'off' }) {
  const [step, setStep] = useState(0)
  const [failed, setFailed] = useState([])

  // Computer on: eyes stay wide open (frame1). Anything else: the sleepy loop.
  const awake = power === 'on'

  useEffect(() => {
    // Restart the loop from the beginning whenever the computer state changes
    setStep(0)
  }, [awake])

  useEffect(() => {
    if (awake) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const t = setTimeout(() => setStep((s) => (s + 1) % SEQUENCE.length), SEQUENCE[step][1])
    return () => clearTimeout(t)
  }, [step, awake])

  const current = awake ? 0 : SEQUENCE[step][0]

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#3f7a2a]">
      <div className="absolute inset-x-0 top-0 bottom-12">
        {FRAMES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            onError={() => setFailed((f) => (f.includes(src) ? f : [...f, src]))}
            className="absolute inset-0 h-full w-full select-none object-cover object-bottom"
            style={{ imageRendering: 'pixelated', opacity: i === current ? 1 : 0 }}
          />
        ))}
      </div>

      {failed.length > 0 && (
        <div className="absolute bottom-16 right-2 z-50 max-w-xs bg-red-600 p-2 font-pixel text-xs text-white">
          Can't load: {failed.join(', ')}
        </div>
      )}
    </div>
  )
}