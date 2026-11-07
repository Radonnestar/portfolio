const links = [
  ['About', 'about'],
  ['Projects', 'projects'],
  ['Experience', 'experience'],
]

export default function TopBar({ onOpen }) {
  return (
    <header className="absolute inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-black/20 bg-os-gray/95 px-5 shadow">
      <div className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
        <span className="text-2xl">⚡</span> YOUR NAME
      </div>
      <nav className="flex items-center gap-5 text-sm font-medium">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => onOpen(id)} className="hidden hover:underline sm:block">
            {label}
          </button>
        ))}
        <button
          onClick={() => onOpen('contact')}
          className="rounded-full bg-os-red px-4 py-1.5 font-semibold text-white hover:brightness-110"
        >
          Contact
        </button>
      </nav>
    </header>
  )
}