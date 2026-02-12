import { useEffect, useState } from "react"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Projects from "@/components/Projects"
import type ProfileModel from "@/data/model/ProfileModel"
import { getGithubProfile } from "@/data/repository/GithubRepository"

export default function Home() {
  const [profile, setProfile] = useState<ProfileModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getGithubProfile()
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch profile", err)
        setError("Failed to load profile data")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white font-mono text-zinc-900 dark:bg-zinc-950 dark:text-white">
        <div className="animate-pulse">Loading_</div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white font-mono text-zinc-900 dark:bg-zinc-950 dark:text-white">
        <div>Error loading data.</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white font-mono text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <main className="flex flex-grow w-full max-w-4xl flex-col items-center p-6 sm:p-8">
        <Header name={profile.name} photoUrl={profile.photoUrl} bio={profile.bio} role={profile.role} />
        <div className="my-8 w-full border-b border-zinc-200 dark:border-zinc-800 sm:my-12" />
        <Projects projects={profile.projects} />
      </main>
      <Footer />
    </div>
  )
}
