import fs from "fs"
import { fetchContributions } from "./github.js"
import { generateFrame } from "./svg.js"

const username = process.env.GITHUB_USERNAME
const token = process.env.GITHUB_TOKEN

const weeks = await fetchContributions(username, token)

// flatten points
let points = []
weeks.forEach((week, x) => {
  week.contributionDays.forEach((day, y) => {
    if (day.contributionCount > 0) {
      points.push({ x, y })
    }
  })
})

// tạo folder
fs.mkdirSync("frames", { recursive: true })

// generate frames
for (let i = 0; i < points.length; i++) {
  const svg = generateFrame(points, i)
  fs.writeFileSync(`frames/frame_${i}.svg`, svg)
}