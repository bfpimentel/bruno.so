import { Link } from "react-router-dom"

import Footer from "@/components/Footer"
import Logo from "@/components/Logo"
import SEO from "@/components/SEO"
import { getPosts } from "@/lib/blog"

export default function Blog() {
  const posts = getPosts()

  return (
    <div className="flex min-h-screen flex-col items-center bg-white font-mono text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <SEO title="Blog" description="Bruno Pimentel's Blog" url="https://bruno.so/#/blog" />
      <Logo />
      <main className="flex grow w-full max-w-4xl flex-col items-center p-6 sm:p-8">
        <div className="w-full flex h-max justify-between items-center mb-12">
          <Link
            to="/#"
            className="text-sm font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← Home
          </Link>
        </div>

        <div className="w-full flex-col grow max-w-4xl bg-white dark:bg-zinc-950">
          <h1 className="mb-12 text-4xl font-bold text-zinc-900 dark:text-white">Blog</h1>
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}#`}
                className="group flex flex-col border-b border-zinc-200 pb-8 last:border-0 dark:border-zinc-800"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="mb-2 text-2xl font-bold text-zinc-900 transition-colors group-hover:text-black dark:text-zinc-100 dark:group-hover:text-white">
                    {post.title}
                  </h3>
                  <span className="text-sm font-bold text-zinc-500 dark:text-zinc-500">
                    {post.date}
                  </span>
                </div>
                <p className="text-lg leading-relaxed text-zinc-600 transition-colors group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-300">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
