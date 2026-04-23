import fs from "fs"
import fetch from "node-fetch"
import { fetchContributions } from "./github.js"
import { generateFrame } from "./svg.js"

const username = process.env.GITHUB_USERNAME
const token = process.env.GITHUB_TOKEN

if (!username || !token) {
  console.error("Missing env: GITHUB_USERNAME / GITHUB_TOKEN")
  process.exit(1)
}

const weeks = await fetchContributions(username, token)

// build grid + points (chỉ lưu 1 lần, không render ở đây)
const cell = 12
const grid = []   // toàn bộ ô (để vẽ nền)
const points = [] // chỉ ô có commit (để Pac-Man ăn)

weeks.forEach((week, x) => {
  week.contributionDays.forEach((day, y) => {
    const cx = x * cell
    const cy = y * cell

    grid.push({
      x: cx,
      y: cy,
      count: day.contributionCount
    })

    if (day.contributionCount > 0) {
      points.push({ x: cx, y: cy })
    }
  })
})

console.log("TOTAL POINTS:", points.length)

fs.mkdirSync("frames", { recursive: true })

// giới hạn frame để build nhanh
const MAX_FRAMES = Math.min(points.length, 40)

for (let i = 0; i < MAX_FRAMES; i++) {
  const svg = generateFrame(grid, points, i)
  fs.writeFileSync(`frames/frame_${i}.svg`, svg)
}