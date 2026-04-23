export function generateFrame(grid, path, frame) {
  const speed = 1
  const index = frame % (path.length - 1 || 1)

  const current = path[index]
  const next = path[index + 1] || current

  // 👉 smooth movement
  const t = (frame % 2) / 2
  const x = current.x + (next.x - current.x) * t
  const y = current.y + (next.y - current.y) * t

  // 👉 direction
  const dx = next.x - current.x
  const dy = next.y - current.y

  let angle = 0
  if (dx > 0) angle = 0
  else if (dx < 0) angle = 180
  else if (dy > 0) angle = 90
  else if (dy < 0) angle = -90

  // 👉 mouth animation
  const mouth = (frame % 4 < 2) ? 30 : 10

  // 👉 dots còn lại
  let dots = ""
  path.forEach((p, i) => {
    if (i > index) {
      dots += `<circle cx="${p.x}" cy="${p.y}" r="2" fill="#22c55e" />`
    }
  })

  // 👉 pacman rotated
  const pacman = `
    <g transform="translate(${x},${y}) rotate(${angle})">
      <path d="
        M 0 0
        L 6 ${-mouth/2}
        A 6 6 0 1 1 6 ${mouth/2}
        Z" fill="yellow"/>
    </g>
  `

  return `
  <svg viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#020617"/>
    ${dots}
    ${pacman}
  </svg>
  `
}