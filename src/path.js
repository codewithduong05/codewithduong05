export function buildPath(grid) {
  const map = new Map()

  grid.forEach(c => {
    map.set(`${c.x},${c.y}`, c)
  })

  // lấy max size
  const xs = [...new Set(grid.map(c => c.x))].sort((a,b)=>a-b)
  const ys = [...new Set(grid.map(c => c.y))].sort((a,b)=>a-b)

  const path = []

  xs.forEach((x, xi) => {
    if (xi % 2 === 0) {
      ys.forEach(y => {
        const cell = map.get(`${x},${y}`)
        if (cell && cell.count > 0) path.push(cell)
      })
    } else {
      [...ys].reverse().forEach(y => {
        const cell = map.get(`${x},${y}`)
        if (cell && cell.count > 0) path.push(cell)
      })
    }
  })

  return path
}