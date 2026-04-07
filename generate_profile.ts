import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const GET_PROFILE_URL = "https://api.github.com/users/bfpimentel"

type ProfileResponse = {
  name: string
  avatar_url: string
  bio: string
  company: string
}

interface RepositoryResponse {
  author: string
  name: string
  description: string
  language: string
  languageColor?: string
  stars?: number
  forks?: number
}

interface ProfileModel {
  name: string
  photoUrl: string
  bio: string
  projects: { name: string; description: string; link: string }[]
}

async function getGithubProfile(): Promise<ProfileModel> {
  return fetch(GET_PROFILE_URL).then(async (profileResponse) => {
    const parsedProfile = (await profileResponse.json()) as ProfileResponse
    const pinnedRepositories = await fetch("https://pinned.berrysauce.dev/get/bfpimentel")
    const parsedPinnedRepositories = (await pinnedRepositories.json()) as RepositoryResponse[]

    return {
      name: parsedProfile.name,
      photoUrl: parsedProfile.avatar_url,
      bio: parsedProfile.bio,
      projects: parsedPinnedRepositories.map((repo) => ({
        name: repo.name,
        description: repo.description,
        link: `https://github.com/bfpimentel/${repo.name}`,
      })),
    }
  })
}

async function generate_profile() {
  const profile = await getGithubProfile()

  const outputDir = join(__dirname, "src", "data")
  const outputPath = join(outputDir, "profile.json")

  try {
    readFileSync(outputDir)
  } catch {
    console.log("generate_profile: Directory does not exist. Creating.")
  }

  writeFileSync(outputPath, JSON.stringify(profile, null, 2))

  console.log("generate_profile: Profile generated successfully!")
  console.log(`generate_profile: Output: ${outputPath}`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generate_profile().catch(console.error)
}
