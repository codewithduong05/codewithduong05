import fs from "fs"
import { fetchContributions } from "./github.js"
import { generateSVG } from "./svg.js"

const username = process.env.GITHUB_USERNAME
const token = process.env.GITHUB_TOKEN

if (!username || !token) {
  throw new Error("Missing GITHUB_USERNAME or GITHUB_TOKEN")
}

console.log("Fetching contributions...")
const weeks = await fetchContributions(username, token)

console.log("Generating SVG...")
console.log("Weeks:", weeks.length)

const outputDir = "dist"
const outputFile = `${outputDir}/pacman.svg`

// 🔑 đảm bảo thư mục tồn tại (CI không có sẵn)
fs.mkdirSync(outputDir, { recursive: true })

const svg = generateSVG(weeks)
fs.writeFileSync(outputFile, svg)

console.log("SVG created at:", outputFile)