export function generateSVG(grid) {
  let dots = ""

  grid.forEach((week, x) => {
    week.contributionDays.forEach((day, y) => {
      if (day.contributionCount > 0) {
        dots += `<circle cx="${x*12}" cy="${y*12}" r="2" fill="green"/>`
      }
    })
  })

  const pacman = `
  <circle r="5" fill="yellow">
    <animateMotion dur="8s" repeatCount="indefinite"
      path="M0,0 L600,0" />
  </circle>
  `

  return `<svg viewBox="0 0 700 100">
    ${dots}
    ${pacman}
  </svg>`
}
