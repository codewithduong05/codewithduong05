import { buildPath } from "./path.js"

const path = buildPath(grid)

console.log("PATH LENGTH:", path.length)

const MAX_FRAMES = Math.min(path.length, 60)

for (let i = 0; i < MAX_FRAMES; i++) {
  const svg = generateFrame(grid, path, i)
  fs.writeFileSync(`frames/frame_${i}.svg`, svg)
}