import { Link } from "react-router-dom"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Logo from "@/components/Logo"
import Projects from "@/components/Projects"
import SEO from "@/components/SEO"
import profile from "@/data/profile.json"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white font-mono text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <SEO title={profile.name} description={profile.bio} />
      <Logo />
      <main className="flex grow w-full max-w-4xl flex-col items-center p-6">
        <Header name={profile.name} photoUrl={profile.photoUrl} bio={profile.bio} />
        <a
          className="text-lg mt-8 font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
          href="/resume.pdf"
        >
          Resume →
        </a>
        <Link
          to="/blog"
          className="text-lg mt-4 font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
        >
          Blog →
        </Link>
        <div className="my-8 w-full border-b border-zinc-200 dark:border-zinc-800 sm:my-8" />
        <Projects projects={profile.projects} />
      </main>
      <Footer />
    </div>
  )
}
