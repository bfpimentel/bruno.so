import { Link } from "react-router-dom"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Logo from "@/components/Logo"
import Projects from "@/components/Projects"
import SEO from "@/components/SEO"

const profile = {
  name: "Bruno Pimentel",
  photoUrl: "https://avatars.githubusercontent.com/u/40500313?v=4",
  bio: "Generalist. I adapt to anything.",
  role: "Senior Software Engineer",
  projects: [
    {
      name: "dotfiles",
      description: "Personal dotfiles.",
      link: "https://github.com/bfpimentel/dotfiles",
    },
    {
      name: "bruno.so",
      description: "Personal portfolio using Vite.",
      link: "https://github.com/bfpimentel/bruno.so",
    },
    {
      name: "bitwarden-mxroute",
      description: "Fake Addy.io Server for creating aliases inside Bitwarden using MXRoute API",
      link: "https://github.com/bfpimentel/bitwarden-mxroute",
    },
    {
      name: "ad-aeternum",
      description:
        "Interactive Rosary and Liturgy app for Android and iOS. Using Kotlin Multiplatform for Mobile and Typescript + Next.js for the Backend.",
      link: "https://github.com/bfpimentel/ad-aeternum",
    },
  ],
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white font-mono text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <SEO title={profile.name} description={profile.bio} />
      <Logo />
      <main className="flex grow w-full max-w-4xl flex-col items-center p-6">
        <Header
          name={profile.name}
          photoUrl={profile.photoUrl}
          bio={profile.bio}
          role={profile.role}
        />
        <div className="mt-8 flex w-full justify-center">
          <Link
            to="/blog"
            className="text-lg font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
          >
            Read my Blog →
          </Link>
        </div>
        <div className="my-8 w-full border-b border-zinc-200 dark:border-zinc-800 sm:my-8" />
        <Projects projects={profile.projects} />
      </main>
      <Footer />
    </div>
  )
}
