const css = `
@keyframes notice-in {
  0%   { opacity: 0; transform: translate(-50%, -12px); }
  60%  { opacity: 1; transform: translate(-50%, 3px); }
  100% { opacity: 1; transform: translate(-50%, 0); }
}
@keyframes notice-shake {
  0%, 100% { margin-left: 0; }
  25% { margin-left: -5px; }
  75% { margin-left: 5px; }
}
.notice-box { animation: notice-in .28s ease-out both, notice-shake .3s .28s ease-in-out 2; }
@media (prefers-reduced-motion: reduce) { .notice-box { animation: none; } }
`

export default function Notice({ notice }) {
  if (!notice) return null
  return (
    <div
      key={notice.key}
      role="alert"
      className="notice-box pointer-events-none absolute left-1/2 top-[72px] z-40 w-[min(92vw,340px)] border-2 border-[#1d4fa8] bg-os-gray shadow-[5px_5px_0_rgba(0,0,0,.35)]"
    >
      <style>{css}</style>
      <div className="bg-gradient-to-b from-[#3d8cf0] via-[#2b6fd6] to-[#2159b8] px-2 py-1 font-pixel text-sm text-white">
        System Message
      </div>
      <div className="flex items-center gap-3 p-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center border-2 border-[#3b2f45] bg-[#ffd54a] font-pixel text-xl font-bold text-[#3b2f45]">
          !
        </div>
        <div>
          <p className="font-pixel text-base leading-tight text-slate-900">{notice.text}</p>
          {notice.hint && <p className="mt-0.5 font-pixel text-xs text-slate-600">{notice.hint}</p>}
        </div>
      </div>
    </div>
  )
}