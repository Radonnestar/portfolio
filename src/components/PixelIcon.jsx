// Tiny pixel-art icons, drawn on a 16 x 16 grid.
// Each entry is a list of rectangles: [x, y, width, height, color]
const O = '#3b2f45'

const ICONS = {
  // About_Me.txt: a text document
  about: [
    [3, 1, 10, 14, O],
    [4, 2, 8, 12, '#ffffff'],
    [9, 2, 3, 3, '#cfd6e4'],
    [9, 2, 1, 3, '#9aa3b2'],
    [9, 4, 3, 1, '#9aa3b2'],
    [5, 6, 6, 1, '#2b6fd6'],
    [5, 8, 6, 1, '#2b6fd6'],
    [5, 10, 4, 1, '#2b6fd6'],
    [5, 12, 5, 1, '#2b6fd6'],
  ],

  // Projects.exe: a small app window
  projects: [
    [1, 2, 14, 12, O],
    [2, 3, 12, 10, '#ffffff'],
    [2, 3, 12, 3, '#2b6fd6'],
    [3, 4, 1, 1, '#ffffff'],
    [5, 4, 1, 1, '#ffffff'],
    [3, 7, 4, 5, '#ff8a3d'],
    [8, 7, 5, 2, '#6fb7ff'],
    [8, 10, 5, 1, '#cfd6e4'],
    [8, 12, 3, 1, '#cfd6e4'],
  ],

  // Skills.config: a gear
  skills: [
    [7, 1, 2, 3, '#9aa3b2'],
    [7, 12, 2, 3, '#9aa3b2'],
    [1, 7, 3, 2, '#9aa3b2'],
    [12, 7, 3, 2, '#9aa3b2'],
    [2, 2, 3, 3, '#9aa3b2'],
    [11, 2, 3, 3, '#9aa3b2'],
    [2, 11, 3, 3, '#9aa3b2'],
    [11, 11, 3, 3, '#9aa3b2'],
    [3, 5, 10, 6, '#b8c0d0'],
    [5, 3, 6, 10, '#b8c0d0'],
    [4, 4, 8, 8, '#b8c0d0'],
    [5, 4, 6, 1, '#dfe5f0'],
    [4, 11, 8, 1, '#8791a6'],
    [6, 6, 4, 4, O],
    [7, 7, 2, 2, '#6b7385'],
  ],

  // Experience.log: a briefcase
  experience: [
    [6, 2, 4, 1, O],
    [5, 3, 1, 3, O],
    [10, 3, 1, 3, O],
    [1, 5, 14, 10, O],
    [2, 6, 12, 8, '#a8683a'],
    [2, 6, 12, 1, '#c98a55'],
    [2, 9, 12, 1, '#7d4a26'],
    [2, 13, 12, 1, '#7d4a26'],
    [7, 8, 2, 3, '#ffd54a'],
  ],

  // Education.doc: a graduation cap
  education: [
    [4, 8, 8, 5, '#2d3050'],
    [5, 13, 6, 1, '#2d3050'],
    [7, 3, 2, 1, '#4a4f7a'],
    [5, 4, 6, 1, '#4a4f7a'],
    [3, 5, 10, 1, '#4a4f7a'],
    [1, 6, 14, 1, '#3b3f66'],
    [3, 7, 10, 1, '#3b3f66'],
    [5, 8, 6, 1, '#2d3050'],
    [7, 9, 2, 1, '#2d3050'],
    [7, 6, 2, 1, '#ffd54a'],
    [13, 7, 1, 4, '#ffd54a'],
    [12, 11, 3, 2, '#ffd54a'],
  ],

  // Research.folder: a folder with a paper sticking out
  research: [
    [1, 3, 6, 2, O],
    [1, 4, 14, 11, O],
    [2, 5, 12, 9, '#e0a82a'],
    [4, 3, 8, 5, '#ffffff'],
    [5, 4, 6, 1, '#9aa3b2'],
    [5, 6, 4, 1, '#9aa3b2'],
    [2, 8, 12, 6, '#ffd54a'],
    [2, 8, 12, 1, '#ffe88a'],
    [2, 13, 12, 1, '#d9962a'],
  ],

  // Contact.exe: an envelope
  contact: [
    [1, 3, 14, 11, O],
    [2, 4, 12, 9, '#ffffff'],
    [2, 4, 12, 1, '#dfe7f5'],
    [3, 5, 2, 1, '#2b6fd6'],
    [5, 6, 2, 1, '#2b6fd6'],
    [7, 7, 2, 1, '#2b6fd6'],
    [9, 6, 2, 1, '#2b6fd6'],
    [11, 5, 2, 1, '#2b6fd6'],
    [7, 10, 2, 2, '#e0392d'],
  ],
}

export default function PixelIcon({ id, className = 'h-9 w-9' }) {
  const rects = ICONS[id]
  if (!rects) return null
  return (
    <svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {rects.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </svg>
  )
}