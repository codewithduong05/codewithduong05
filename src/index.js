import fs from "fs"
import { fetchContributions } from "./github.js"
import { generateSVG } from "./svg.js"

const username = process.env.GITHUB_USERNAME
const token = process.env.GITHUB_TOKEN

const weeks = await fetchContributions(username, token)
const svg = generateSVG(weeks)

fs.writeFileSync("dist/pacman.svg", svg)
