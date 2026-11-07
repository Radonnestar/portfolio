import { useEffect, useState } from 'react'

const BOOT_LINES = [
  'PORTFOLIO BIOS v1.0',
  'Memory test .. 640K OK',
  'Loading creativity.sys',
  'Mounting /projects..',
  'Starting Portfolio OS',
]

const WELCOME = ['Welcome, visitor!', '', 'Click an icon on the', 'left to open a window.']

const W = 200
const H = 222

const INK = '#4a3f33'
const BODY = '#e6dcc4'
const HI = '#f8f1de'
const SH = '#bfb394'
const DK = '#8f8468'

// Rectangle with stepped (pixel) corners
const Nb = ({ x, y, w, h, fill }) => (
  <g fill={fill}>
    <rect x={x + 2} y={y} width={w - 4} height={h} />
    <rect x={x + 1} y={y + 1} width={w - 2} height={h - 2} />
    <rect x={x} y={y + 2} width={w} height={h - 4} />
  </g>
)

const Rc = ({ x, y, w, h, f }) => <rect x={x} y={y} width={w} height={h} fill={f} />

function Keyboard() {
  const rows = 17
  const top = 184
  const outline = []
  const fill = []

  for (let i = 0; i < rows; i++) {
    const y = top + i * 2
    const l = 56 - i
    const w = 88 + 2 * i
    outline.push(<rect key={`o${i}`} x={l - 2} y={y} width={w + 4} height={2} fill={INK} />)
    fill.push(
      <rect
        key={`f${i}`}
        x={l}
        y={y}
        width={w}
        height={2}
        fill={i === 0 ? HI : i >= 14 ? '#cbbfa2' : BODY}
      />
    )
  }

  const keys = []
  for (let r = 0; r < 4; r++) {
    const y = 187 + r * 7
    const i = (y - 184) / 2
    const l = 56 - i
    const rr = 144 + i
    if (r < 3) {
      const span = rr - l - 10
      const n = Math.floor(span / 6)
      const start = l + 5 + Math.round((span - n * 6 + 1) / 2)
      for (let c = 0; c < n; c++) {
        const x = start + c * 6
        keys.push(<rect key={`k${r}-${c}`} x={x} y={y} width={5} height={3} fill="#faf5e6" />)
        keys.push(<rect key={`s${r}-${c}`} x={x} y={y + 3} width={5} height={1} fill={DK} />)
      }
    } else {
      const bars = [
        [100 - 25, 50],
        [100 - 25 - 12, 10],
        [100 - 25 - 24, 10],
        [100 + 25 + 2, 10],
        [100 + 25 + 14, 10],
      ]
      bars.forEach(([x, w], k) => {
        keys.push(<rect key={`b${k}`} x={x} y={y} width={w} height={3} fill="#faf5e6" />)
        keys.push(<rect key={`bs${k}`} x={x} y={y + 3} width={w} height={1} fill={DK} />)
      })
    }
  }

  return (
    <g>
      <rect x={56} y={182} width={88} height={2} fill={INK} />
      {outline}
      <rect x={39} y={218} width={122} height={2} fill={INK} />
      {fill}
      {keys}
    </g>
  )
}

export default function Computer({ power, setPower }) {
  const [lines, setLines] = useState([])
  const isOn = power !== 'off'
  const led = isOn ? '#46f08c' : '#2a5a45'

  // Boot sequence
  useEffect(() => {
    if (power !== 'booting') {
      if (power === 'off') setLines([])
      return
    }
    setLines([])
    const timers = BOOT_LINES.map((l, i) =>
      setTimeout(() => setLines((prev) => [...prev, l]), 500 * (i + 1))
    )
    timers.push(setTimeout(() => setPower('on'), 500 * (BOOT_LINES.length + 2)))
    return () => timers.forEach(clearTimeout)
  }, [power, setPower])

  return (
    <div
      className="relative"
      style={{
        // Fit inside the space the parent gives us (width and height), max 520px wide
        width: `min(100cqw, calc(100cqh * ${W / H}), 520px)`,
        aspectRatio: `${W} / ${H}`,
        containerType: 'inline-size',
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" shapeRendering="crispEdges">
        {/* ground shadow */}
        <Rc x={22} y={218} w={156} h={4} f="rgba(0,0,0,.18)" />

        {/* neck */}
        <Nb x={54} y={128} w={92} h={20} fill={INK} />
        <Nb x={56} y={130} w={88} h={16} fill="#d3c9ad" />

        {/* base unit */}
        <Nb x={36} y={142} w={128} h={36} fill={INK} />
        <Nb x={38} y={144} w={124} h={32} fill={BODY} />
        <Rc x={42} y={146} w={116} h={2} f={HI} />
        <Rc x={42} y={172} w={116} h={2} f={SH} />
        <Rc x={110} y={156} w={40} h={8} f={DK} />
        <Rc x={115} y={159} w={30} h={2} f={INK} />
        <Rc x={46} y={156} w={5} h={5} f={INK} />
        <Rc x={47} y={157} w={3} h={3} f={led} />
        {[155, 159, 163].map((y) => (
          <Rc key={y} x={58} y={y} w={22} h={2} f={SH} />
        ))}

        {/* monitor */}
        <Nb x={23} y={4} w={154} h={131} fill={INK} />
        <Nb x={25} y={6} w={150} h={127} fill={BODY} />
        <Rc x={31} y={8} w={138} h={2} f={HI} />
        <Rc x={27} y={12} w={2} h={108} f={HI} />
        <Rc x={171} y={12} w={2} h={108} f={SH} />
        <Rc x={31} y={129} w={138} h={2} f={SH} />

        {/* bezel recess */}
        <Nb x={34} y={15} w={132} h={98} fill={DK} />
        <Nb x={36} y={17} w={128} h={94} fill="#cfc6aa" />
        <Rc x={40} y={19} w={120} h={2} f="#b9ae93" />
        <Rc x={38} y={21} w={2} h={86} f="#b9ae93" />

        {/* screen */}
        <Nb x={43} y={24} w={114} h={80} fill={INK} />
        <Nb x={45} y={26} w={110} h={76} fill={isOn ? '#04222a' : '#171b1f'} />
        {/* subtle glass reflection (only when off) */}
        {!isOn && (
          <>
            <Rc x={50} y={31} w={12} h={1} f="#26343d" />
            <Rc x={50} y={32} w={6} h={1} f="#26343d" />
          </>
        )}

        {/* bottom strip */}
        {[119, 123, 127].map((y) => (
          <Rc key={y} x={42} y={y} w={22} h={2} f={DK} />
        ))}

        {/* power button */}
        <Nb x={136} y={116} w={16} h={16} fill={INK} />
        <Nb x={138} y={118} w={12} h={12} fill={isOn ? SH : HI} />
        {/* power symbol: ring with a gap at the top + stem */}
        <Rc x={143} y={119} w={2} h={5} f={INK} />
        <Rc x={141} y={120} w={2} h={1} f={INK} />
        <Rc x={145} y={120} w={2} h={1} f={INK} />
        <Rc x={140} y={121} w={1} h={6} f={INK} />
        <Rc x={147} y={121} w={1} h={6} f={INK} />
        <Rc x={141} y={127} w={6} h={1} f={INK} />

        {/* LED */}
        <Rc x={156} y={120} w={7} h={7} f={INK} />
        <Rc x={157} y={121} w={5} h={5} f={led} />

        {/* keyboard */}
        <Keyboard />
      </svg>

      {/* Screen text */}
      <div
        className="absolute overflow-hidden font-pixel"
        style={{
          left: `${(45 / W) * 100}%`,
          top: `${(26 / H) * 100}%`,
          width: `${(110 / W) * 100}%`,
          height: `${(76 / H) * 100}%`,
          color: '#8ff5e8',
          fontSize: '3.7cqw',
          lineHeight: 1.25,
          padding: '3cqw',
          boxShadow: isOn ? 'inset 0 0 18px rgba(80,255,230,.3)' : 'none',
        }}
      >
        {isOn && (
          <>
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(0,0,0,.6) 0, rgba(0,0,0,.6) 1px, transparent 1px, transparent 3px)',
              }}
            />
            {power === 'booting' && lines.map((l, i) => <div key={i}>{l}</div>)}
            {power === 'on' && (
              <>
                {WELCOME.map((l, i) => (
                  <div key={i}>{l || '\u00A0'}</div>
                ))}
                <div className="mt-1">
                  C:\&gt; <span className="animate-pulse">_</span>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Tooltip: outer div handles position, inner box handles the bounce */}
      {power === 'off' && (
        <div
          className="pointer-events-none absolute z-20"
          style={{
            left: `${(144 / W) * 100}%`,
            top: `${(112 / H) * 100}%`,
            transform: 'translate(-85%, -100%)',
          }}
        >
          <div className="relative animate-bounce whitespace-nowrap border-2 border-black bg-[#fffbe0] px-3 py-1 font-pixel text-sm text-black shadow-[3px_3px_0_rgba(0,0,0,.4)]">
            Click to turn it on
            <span className="absolute -bottom-[7px] left-[85%] h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-black bg-[#fffbe0]" />
          </div>
        </div>
      )}

      {/* Clickable power button */}
      <button
        onClick={() => setPower(power === 'off' ? 'booting' : 'off')}
        aria-label="Power"
        className="absolute z-30 cursor-pointer"
        style={{
          left: `${(134 / W) * 100}%`,
          top: `${(114 / H) * 100}%`,
          width: `${(20 / W) * 100}%`,
          height: `${(20 / H) * 100}%`,
        }}
      />
    </div>
  )
}