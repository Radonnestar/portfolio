// Tiny retro sound engine using the Web Audio API (no audio files needed)

let ctx = null
let muted = false // sound effects
let musicOn = true // background music (user preference)
let active = false // is the computer on?

try {
  muted = localStorage.getItem('muted') === '1'
  musicOn = localStorage.getItem('music') !== '0'
} catch {
  /* storage not available */
}

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Call from a user gesture so the browser allows audio later
export const unlockAudio = () => {
  audio()
}

/* ---------------- Sound effects ---------------- */

function tone({ freq, to, dur = 0.1, type = 'square', vol = 0.06, delay = 0 }) {
  if (muted) return
  const a = audio()
  if (!a) return
  const t = a.currentTime + delay
  const osc = a.createOscillator()
  const gain = a.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(gain)
  gain.connect(a.destination)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

export const sfx = {
  click: () => tone({ freq: 880, to: 600, dur: 0.04, vol: 0.04 }),

  open: () => {
    tone({ freq: 520, dur: 0.07, vol: 0.05 })
    tone({ freq: 780, dur: 0.09, vol: 0.05, delay: 0.07 })
  },

  close: () => tone({ freq: 700, to: 380, dur: 0.12, vol: 0.05 }),

  minimize: () => tone({ freq: 520, to: 260, dur: 0.1, vol: 0.045 }),

  maximize: () => tone({ freq: 300, to: 620, dur: 0.1, vol: 0.045 }),

  // BIOS beep + low thump when the computer is switched on
  powerOn: () => {
    tone({ freq: 90, to: 50, dur: 0.25, type: 'sawtooth', vol: 0.12 })
    tone({ freq: 1000, dur: 0.1, vol: 0.05, delay: 0.3 })
  },

  // Ascending startup chime when the boot finishes
  startup: () => {
    ;[523, 659, 784, 1047].forEach((f, i) =>
      tone({ freq: f, dur: 0.22, type: 'triangle', vol: 0.09, delay: i * 0.12 })
    )
  },

  powerOff: () => tone({ freq: 420, to: 50, dur: 0.35, type: 'sawtooth', vol: 0.09 }),
}

export const isMuted = () => muted

export const setMuted = (value) => {
  muted = value
  try {
    localStorage.setItem('muted', value ? '1' : '0')
  } catch {
    /* ignore */
  }
}

/* ---------------- Background music (chiptune loop) ---------------- */

const EIGHTH = 0.3 // seconds per eighth note (smaller = faster tempo)
const MASTER_VOLUME = 0.9 // overall music volume (0 to 1)

const midi = (m) => 440 * Math.pow(2, (m - 69) / 12)

// 8 bars: C, G, Am, Em, F, C, F, G
const CHORDS = [
  { r: 48, minor: false },
  { r: 55, minor: false },
  { r: 57, minor: true },
  { r: 52, minor: true },
  { r: 53, minor: false },
  { r: 48, minor: false },
  { r: 53, minor: false },
  { r: 55, minor: false },
]

// Melody: 8 eighth-note slots per bar, null = rest
const MELODY = [
  [76, null, null, 74, 72, null, 67, null],
  [74, null, null, 71, 67, null, 71, null],
  [72, null, null, 76, 81, null, 79, null],
  [76, null, 74, null, 71, null, null, null],
  [77, null, null, 74, 72, null, 69, null],
  [72, null, 76, null, 79, null, 76, null],
  [77, null, 76, null, 74, null, 72, null],
  [74, null, null, 71, 74, null, 67, null],
]

const ARP = [0, 1, 2, 1, 0, 1, 2, 1]
const TOTAL_STEPS = CHORDS.length * 8

let master = null
let bus = null
let noiseBuf = null
let timer = null
let nextTime = 0
let step = 0 // next step to schedule
let savedStep = 0 // where to continue after a pause (tab switch)
let looping = false

function ensureGraph(a) {
  if (master) return
  master = a.createGain()
  master.gain.value = 0.0001
  master.connect(a.destination)

  // soft low-pass for the melodic parts so it sounds warm, not harsh
  bus = a.createBiquadFilter()
  bus.type = 'lowpass'
  bus.frequency.value = 3200
  bus.connect(master)

  noiseBuf = a.createBuffer(1, Math.floor(a.sampleRate * 0.05), a.sampleRate)
  const data = noiseBuf.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
}

function note(a, { freq, dur, type, vol, time, dest }) {
  const osc = a.createOscillator()
  const gain = a.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0.0001, time)
  gain.gain.exponentialRampToValueAtTime(vol, time + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, time + dur)
  osc.connect(gain)
  gain.connect(dest)
  osc.start(time)
  osc.stop(time + dur + 0.02)
}

function hat(a, time) {
  const src = a.createBufferSource()
  src.buffer = noiseBuf
  const hp = a.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 7000
  const gain = a.createGain()
  gain.gain.setValueAtTime(0.025, time)
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04)
  src.connect(hp)
  hp.connect(gain)
  gain.connect(master)
  src.start(time)
}

function playStep(a, s, time) {
  const bar = Math.floor(s / 8) % CHORDS.length
  const i = s % 8
  const chord = CHORDS[bar]
  const tones = [0, chord.minor ? 3 : 4, 7]

  // bass (one octave higher so laptop speakers can play it)
  if (i === 0) note(a, { freq: midi(chord.r), dur: EIGHTH * 3.6, type: 'triangle', vol: 0.16, time, dest: master })
  if (i === 4) note(a, { freq: midi(chord.r + 7), dur: EIGHTH * 3.6, type: 'triangle', vol: 0.12, time, dest: master })

  // arpeggio
  note(a, { freq: midi(chord.r + 12 + tones[ARP[i]]), dur: EIGHTH * 0.8, type: 'square', vol: 0.03, time, dest: bus })

  // melody
  const m = MELODY[bar][i]
  if (m != null) note(a, { freq: midi(m), dur: EIGHTH * 1.8, type: 'square', vol: 0.07, time, dest: bus })

  // hi-hat on the off-beats
  if (i % 2 === 1) hat(a, time)
}

function schedule() {
  const a = ctx
  if (!a) return
  while (nextTime < a.currentTime + 0.4) {
    playStep(a, step, nextTime)
    nextTime += EIGHTH
    step = (step + 1) % TOTAL_STEPS
  }
}

function startLoop() {
  if (looping) return
  const a = audio()
  if (!a) return
  ensureGraph(a)
  looping = true
  const t = a.currentTime
  master.gain.cancelScheduledValues(t)
  master.gain.setValueAtTime(0.0001, t)
  master.gain.exponentialRampToValueAtTime(MASTER_VOLUME, t + 1.2)
  nextTime = t + 0.1
  step = savedStep // continue where we left off (0 = from the beginning)
  schedule()
  timer = setInterval(schedule, 100)
}

// keepPosition = true when only pausing (tab hidden), false for a real stop
function stopLoop(keepPosition) {
  if (looping) {
    looping = false
    clearInterval(timer)
    timer = null
    if (keepPosition) savedStep = step
    if (ctx && master) {
      const t = ctx.currentTime
      master.gain.cancelScheduledValues(t)
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), t)
      master.gain.exponentialRampToValueAtTime(0.0001, t + 0.4)
    }
  }
  if (!keepPosition) savedStep = 0
}

function refresh(fromVisibility = false) {
  if (active && musicOn && !document.hidden) startLoop()
  else stopLoop(fromVisibility)
}

// Pause when the tab is in the background, continue when it comes back
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => refresh(true))
}

export const music = {
  // true while the computer is switched on
  setActive: (v) => {
    active = v
    refresh()
  },
  isOn: () => musicOn,
  setOn: (v) => {
    musicOn = v
    try {
      localStorage.setItem('music', v ? '1' : '0')
    } catch {
      /* ignore */
    }
    refresh()
  },
}