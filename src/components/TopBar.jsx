const links = [
  ['About', 'about'],
  ['Projects', 'projects'],
  ['Experience', 'experience'],
]

// Small pixel-art lightning bolt (instead of the emoji)
function Bolt() {
  return (
    <svg viewBox="0 0 8 12" className="h-6 w-4" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M5 0h2v1H6v2h1v1H6v1h2v1H5v1H4v1H3v1H2v1H1v1H0V9h1V8h1V7h1V6H1V5h1V4h1V3h1V2h1z" fill="#3b2f45" />
      <path d="M5 1h1v2h1v1H5v1h2v1H4v1H3v1H2v1H1V9h1V8h1V7h1V6H2V5h1V4h1V3h1z" fill="#ff8a3d" />
    </svg>
  )
}

export default function TopBar({ onOpen }) {
  return (
    <header className="absolute inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b-2 border-black/30 bg-os-gray px-5 shadow">
      <div className="flex items-center gap-2 font-pixel text-xl font-bold uppercase tracking-wide text-slate-900">
        <Bolt />
        <span>Adnan Sami Srijon</span>
      </div>
      <nav className="flex items-center gap-5 font-pixel text-base">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => onOpen(id)} className="hidden hover:underline sm:block">
            {label}
          </button>
        ))}
        <button
          onClick={() => onOpen('contact')}
          className="border-2 border-t-[#ff7a70] border-l-[#ff7a70] border-b-[#8f1c14] border-r-[#8f1c14] bg-os-red px-4 py-1 font-semibold text-white hover:brightness-110 active:border-t-[#8f1c14] active:border-l-[#8f1c14] active:border-b-[#ff7a70] active:border-r-[#ff7a70]"
        >
          Contact
        </button>
      </nav>
    </header>
  )
}