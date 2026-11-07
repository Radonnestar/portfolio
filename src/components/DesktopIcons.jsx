import PixelIcon from './PixelIcon'

const icons = [
  { id: 'about', label: 'About_Me.txt' },
  { id: 'projects', label: 'Projects.exe' },
  { id: 'skills', label: 'Skills.config' },
  { id: 'experience', label: 'Experience.log' },
  { id: 'education', label: 'Education.doc' },
  { id: 'research', label: 'Research.dir' },
  { id: 'contact', label: 'Contact.exe' },
]

export default function DesktopIcons({ onOpen = () => {} }) {
  return (
    // Fills the space between the top bar and the taskbar; icons are spread evenly
    <div className="absolute left-2 top-[68px] bottom-14 z-10 flex flex-col flex-wrap content-start justify-between">
      {icons.map((i) => (
        <button
          key={i.id}
          onClick={() => onOpen(i.id)}
          className="group flex w-[100px] flex-col items-center gap-1 rounded p-0.5 focus:outline-none"
        >
          <PixelIcon
            id={i.id}
            className="h-[clamp(36px,6.4vh,68px)] w-[clamp(36px,6.4vh,68px)] drop-shadow-[0_2px_0_rgba(0,0,0,.35)] transition-transform group-active:translate-y-px"
          />
          <span className="bg-os-blue/70 px-1.5 py-0.5 font-pixel text-[clamp(11px,1.7vh,15px)] leading-tight text-white group-focus:bg-os-blue group-hover:bg-os-blue/90">
            {i.label}
          </span>
        </button>
      ))}
    </div>
  )
}