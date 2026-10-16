import { Link } from "react-router-dom"

import Arrow from "@/components/Arrow"
import Layout from "@/components/Layout"
import Projects from "@/components/Projects"
import Section from "@/components/Section"
import SEO from "@/components/SEO"
import { links } from "@/data/links"
import profile from "@/data/profile.json"
import { getPosts } from "@/lib/blog"

const LATEST_POSTS = 3

const textLink =
  "border-b border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-100 dark:hover:text-zinc-100"

export default function Home() {
  const posts = getPosts().slice(0, LATEST_POSTS)

  return (
    <Layout>
      <SEO title={profile.name} description={profile.bio} />

      <div className="grid grid-cols-[64px_1fr] items-center gap-[18px]">
        <img
          className="size-16 border border-zinc-900 object-cover dark:border-zinc-100"
          fetchPriority="high"
          src="/bruno.jpeg"
          width={64}
          height={64}
          alt={profile.name}
        />
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-0.5 text-zinc-500 dark:text-zinc-400">{profile.bio}</p>
        </div>
      </div>

      <nav aria-label="Links" className="flex flex-wrap gap-x-[18px] gap-y-1 text-sm">
        <a href="/resume.pdf" className={textLink}>
          resume.pdf
        </a>
        <Link to="/blog" className={textLink}>
          blog
        </Link>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
            className={textLink}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {posts.length > 0 && (
        <Section title="writing">
          <ul className="border-b border-zinc-200 dark:border-zinc-800">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-t border-zinc-200 py-2.5 sm:grid-cols-[minmax(0,1fr)_auto_auto] dark:border-zinc-800"
                >
                  <span className="font-semibold group-hover:underline group-hover:underline-offset-[3px]">
                    {post.title}
                  </span>
                  <time
                    dateTime={post.date}
                    className="col-start-1 text-sm text-zinc-500 tabular-nums sm:col-start-auto dark:text-zinc-400"
                  >
                    {post.date}
                  </time>
                  <Arrow symbol="→" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/blog"
            className="mt-2.5 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            all posts →
          </Link>
        </Section>
      )}

      <Section title="projects">
        <Projects projects={profile.projects} />
      </Section>
    </Layout>
  )
}
