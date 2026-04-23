export function generateSVG(weeks) {
  const cell = 12

  let dots = ""
  let path = ""
  let points = []

  // 1. build grid + path
  weeks.forEach((week, x) => {
    week.contributionDays.forEach((day, y) => {
      if (day.contributionCount > 0) {
        const cx = x * cell
        const cy = y * cell

        // lưu điểm để pacman đi
        points.push({ x: cx, y: cy })

        // dot có animation biến mất
        dots += `
        <circle cx="${cx}" cy="${cy}" r="2" fill="#22c55e">
          <animate attributeName="opacity"
            values="1;1;1;0"
            keyTimes="0;0.7;0.9;1"
            dur="8s"
            repeatCount="indefinite"/>
        </circle>
        `
      }
    })
  })

  // 2. tạo path zigzag
  if (points.length > 0) {
    path = `M ${points[0].x} ${points[0].y} `
    for (let i = 1; i < points.length; i++) {
      path += `L ${points[i].x} ${points[i].y} `
    }
  }

  // 3. Pac-Man (miệng mở/đóng bằng path)
  const pacman = `
  <g>
    <path fill="yellow">
      <animate attributeName="d"
        dur="0.3s"
        repeatCount="indefinite"
        values="
          M0,0 L10,-6 A10,10 0 1,1 10,6 Z;
          M0,0 L10,-2 A10,10 0 1,1 10,2 Z;
          M0,0 L10,-6 A10,10 0 1,1 10,6 Z
        "
      />
      <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
        <mpath href="#path"/>
      </animateMotion>
    </path>
  </g>
  `

  return `
  <svg viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#020617"/>

    <!-- dots -->
    ${dots}

    <!-- path (ẩn) -->
    <path id="path" d="${path}" fill="none" stroke="none"/>

    <!-- pacman -->
    ${pacman}
  </svg>
  `
}