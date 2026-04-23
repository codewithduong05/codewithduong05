export function generateFrame(points, frame) {
  const cell = 12

  const current = points[frame]

  let dots = ""

  // chỉ render dot CHƯA bị ăn
  points.forEach((p, i) => {
    if (i > frame) {
      dots += `<circle cx="${p.x * cell}" cy="${p.y * cell}" r="2" fill="#22c55e" />`
    }
  })

  // pacman (có miệng)
  const mouthOpen = frame % 2 === 0

  const pacman = mouthOpen
    ? `<path d="
        M ${current.x * cell} ${current.y * cell}
        L ${current.x * cell + 6} ${current.y * cell - 4}
        A 6 6 0 1 1 ${current.x * cell + 6} ${current.y * cell + 4}
        Z" fill="yellow" />`
    : `<circle cx="${current.x * cell}" cy="${current.y * cell}" r="5" fill="yellow" />`

  return `
  <svg viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#020617"/>
    ${dots}
    ${pacman}
  </svg>
  `
}