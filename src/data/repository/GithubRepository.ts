import type ProfileModel from "@/data/model/ProfileModel"

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

export async function getGithubProfile(): Promise<ProfileModel> {
  return fetch(GET_PROFILE_URL).then(async (profileResponse) => {
    const parsedProfile = (await profileResponse.json()) as ProfileResponse
    const pinnedRepositories = await fetch("https://pinned.berrysauce.dev/get/bfpimentel")
    const parsedPinnedRepositories = (await pinnedRepositories.json()) as RepositoryResponse[]

    return {
      name: parsedProfile.name,
      photoUrl: parsedProfile.avatar_url,
      bio: parsedProfile.bio,
      role: parsedProfile.company,
      projects: parsedPinnedRepositories.map((repo) => ({
        name: repo.name,
        description: repo.description,
        link: `https://github.com/bfpimentel/${repo.name}`,
      })),
    }
  })
}
