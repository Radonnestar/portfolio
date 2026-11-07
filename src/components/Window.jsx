import { useRef } from 'react'
import PixelIcon from './PixelIcon'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export default function Window({
  win,
  app,
  active,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  children,
}) {
  const drag = useRef(null)

  const down = (e) => {
    onFocus()
    if (win.maximized || e.target.closest('button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y }
  }

  const move = (e) => {
    if (!drag.current) return
    onMove(
      clamp(e.clientX - drag.current.dx, -150, window.innerWidth - 80),
      clamp(e.clientY - drag.current.dy, 56, window.innerHeight - 48 - 32)
    )
  }

  const up = () => {
    drag.current = null
  }

  const style = win.maximized
    ? { top: 56, left: 0, right: 0, bottom: 48, zIndex: win.z }
    : {
        top: win.y,
        left: win.x,
        width: `min(${app.w}px, 96vw)`,
        // never taller than the space between the window's top and the taskbar
        maxHeight: `calc(100vh - ${win.y}px - 60px)`,
        zIndex: win.z,
      }

  const ctrl =
    'grid h-6 w-6 place-items-center border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 bg-os-gray font-pixel text-xs leading-none text-black active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white'

  return (
    <div
      onPointerDown={onFocus}
      style={style}
      className={`win-pop pointer-events-auto absolute flex flex-col border-2 border-[#1d4fa8] bg-os-gray shadow-[5px_5px_0_rgba(0,0,0,.35)] ${
        win.minimized ? 'hidden' : ''
      }`}
    >
      {/* Title bar */}
      <div
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onDoubleClick={onMaximize}
        className={`flex touch-none select-none items-center justify-between gap-2 px-1.5 py-1 ${
          win.maximized ? '' : 'cursor-move'
        } ${
          active
            ? 'bg-gradient-to-b from-[#3d8cf0] via-[#2b6fd6] to-[#2159b8]'
            : 'bg-gradient-to-b from-[#9db4d8] to-[#7a96c4]'
        }`}
      >
        <div className="flex min-w-0 items-center gap-2 font-pixel text-sm text-white">
          <PixelIcon id={win.id} className="h-5 w-5 shrink-0" />
          <span className="truncate">{app.title}</span>
        </div>
        <div className="flex shrink-0 gap-1">
          <button className={ctrl} onClick={onMinimize} aria-label="Minimize">
            _
          </button>
          <button className={ctrl} onClick={onMaximize} aria-label="Maximize">
            □
          </button>
          <button className={`${ctrl} !bg-os-red !text-white`} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="m-1 min-h-0 flex-1 overflow-y-auto border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white bg-white">
        {children}
      </div>
    </div>
  )
}