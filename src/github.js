import fetch from "node-fetch"

export async function fetchContributions(username, token) {
  const query = `
  {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
            }
          }
        }
      }
    }
  }`

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  })

  const data = await res.json()

  if (!data?.data?.user) {
    console.error("GitHub API error:", JSON.stringify(data))
    return []
  }

  return data.data.user.contributionsCollection.contributionCalendar.weeks
}