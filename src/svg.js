// src/svg.js

export function generateFrame(grid, points, frame) {
  let dots = ""

  // 1. render full grid (luôn có nền)
  grid.forEach((cell) => {
    let color = "#0f172a"

    if (cell.count > 0) color = "#22c55e"
    if (cell.count > 5) color = "#4ade80"
    if (cell.count > 10) color = "#86efac"

    dots += `<circle cx="${cell.x}" cy="${cell.y}" r="2" fill="${color}" />`
  })

  // 2. xoá dot đã bị ăn
  const currentIndex = frame % (points.length || 1)

  let remainingDots = ""
  points.forEach((p, i) => {
    if (i > currentIndex) {
      remainingDots += `<circle cx="${p.x}" cy="${p.y}" r="2" fill="#22c55e" />`
    }
  })

  // 3. pacman
  const current = points[currentIndex] || { x: 0, y: 0 }
  const mouthOpen = frame % 2 === 0

  const pacman = mouthOpen
    ? `<path d="
        M ${current.x} ${current.y}
        L ${current.x + 6} ${current.y - 4}
        A 6 6 0 1 1 ${current.x + 6} ${current.y + 4}
        Z" fill="yellow" />`
    : `<circle cx="${current.x}" cy="${current.y}" r="5" fill="yellow" />`

  return `
  <svg viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#020617"/>
    ${dots}
    ${remainingDots}
    ${pacman}
  </svg>
  `
}