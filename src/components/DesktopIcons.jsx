import PixelIcon from './PixelIcon'

const icons = [
  { id: 'about', label: 'About_Me.txt' },
  { id: 'projects', label: 'Projects.exe' },
  { id: 'skills', label: 'Skills.config' },
  { id: 'experience', label: 'Experience.log' },
  { id: 'education', label: 'Education.doc' },
  { id: 'research', label: 'Research.folder' },
  { id: 'contact', label: 'Contact.exe' },
]

export default function DesktopIcons({ onOpen = () => {} }) {
  return (
    <div className="absolute left-2 top-20 bottom-16 z-10 flex flex-col flex-wrap content-start gap-3">
      {icons.map((i) => (
        <button
          key={i.id}
          onClick={() => onOpen(i.id)}
          className="group flex w-[96px] flex-col items-center gap-1.5 rounded p-1 focus:outline-none"
        >
          <PixelIcon
            id={i.id}
            className="h-12 w-12 drop-shadow-[0_2px_0_rgba(0,0,0,.35)] transition-transform group-active:translate-y-px"
          />
          <span className="bg-os-blue/70 px-1.5 py-0.5 font-pixel text-sm leading-tight text-white group-focus:bg-os-blue group-hover:bg-os-blue/90">
            {i.label}
          </span>
        </button>
      ))}
    </div>
  )
}