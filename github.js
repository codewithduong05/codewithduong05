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
  return data.data.user.contributionsCollection.contributionCalendar.weeks
}
