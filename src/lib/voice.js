import { isMuted } from './sound'

// One subtitle per sentence. Each sentence is spoken separately, so the subtitle stays in sync.
export const GREETING = [
  'Hello, visitor.',
  "Welcome to Adnan Sami Srijon's portfolio.",
  'You can find all the details of Srijon here.',
  'Click the desktop icons for the information.',
]

const synth =
  typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null

// Ask the browser to load its voice list early
if (synth) synth.getVoices()

let session = 0
let timers = []

function pickVoice() {
  if (!synth) return null
  const voices = synth.getVoices()
  if (!voices.length) return null
  const en = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'))
  const prefer = ['Google UK English Male', 'Microsoft Guy', 'Microsoft Ryan', 'Microsoft David', 'Daniel', 'Alex']
  for (const p of prefer) {
    const v = en.find((x) => x.name.includes(p))
    if (v) return v
  }
  return en.find((v) => v.default) || en[0] || null
}

// Stops the voice immediately and cancels everything that is still queued
export function stopGreeting() {
  session++
  timers.forEach(clearTimeout)
  timers = []
  if (synth) synth.cancel()
}

// onLine(text) is called with each subtitle; onLine('') when finished or stopped
export function startGreeting(onLine, onDone) {
  stopGreeting()
  const mine = session
  const alive = () => mine === session
  const speak = Boolean(synth) && !isMuted() // effects muted: subtitles only

  const later = (fn, ms) => {
    timers.push(
      setTimeout(() => {
        if (alive()) fn()
      }, ms)
    )
  }

  let i = 0
  const next = () => {
    if (!alive()) return
    if (i >= GREETING.length) {
      onLine('')
      if (onDone) onDone()
      return
    }
    const text = GREETING[i++]

    // No sound (muted or unsupported): just show the subtitle for a while
    if (!speak) {
      onLine(text)
      later(next, 900 + text.length * 55)
      return
    }

    const u = new SpeechSynthesisUtterance(text)
    const v = pickVoice()
    if (v) {
      u.voice = v
      u.lang = v.lang
    } else {
      u.lang = 'en-US'
    }
    u.rate = 0.95
    u.pitch = 0.9

    // The subtitle appears only when this sentence's audio really starts
    let shown = false
    const show = () => {
      if (shown || !alive()) return
      shown = true
      onLine(text)
    }

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      show() // in case the browser never reported the start
      later(next, 150)
    }

    u.onstart = show
    u.onend = finish
    u.onerror = finish

    later(show, 2500) // safety net: a browser that never fires onstart
    later(finish, 6000 + text.length * 130) // safety net: a browser that never fires onend
    synth.speak(u)
  }

  later(next, 800) // let the startup chime finish first
}