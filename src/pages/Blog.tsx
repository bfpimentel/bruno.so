import { Link } from "react-router-dom"

import Layout from "@/components/Layout"
import SEO from "@/components/SEO"
import { getPosts, groupPostsByYear } from "@/lib/blog"

export default function Blog() {
  const years = groupPostsByYear(getPosts())

  return (
    <Layout crumbs={[{ label: "blog" }]}>
      <SEO title="Blog" description="Bruno Pimentel's Blog" url="https://bruno.so/blog" />

      <div>
        <h1 className="text-[1.375rem] lg:text-2xl font-bold">Writing</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Random thoughts, mostly about tech. Follow along via{" "}
          <a
            href="/rss.xml"
            className="border-b border-zinc-200 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
          >
            rss
          </a>
          .
        </p>
      </div>

      {years.map(([year, posts]) => (
        <section key={year} className="grid gap-1 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-4">
          <h2 className="text-sm text-zinc-500 tabular-nums sm:pt-2.5 dark:text-zinc-400">
            {year}
          </h2>
          <ul className="border-b border-zinc-200 dark:border-zinc-800">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 border-t border-zinc-200 py-2.5 dark:border-zinc-800"
                >
                  <time
                    dateTime={post.date}
                    className="text-zinc-500 tabular-nums dark:text-zinc-400"
                  >
                    {post.date.slice(5)}
                  </time>
                  <div>
                    <span className="font-semibold group-hover:underline group-hover:underline-offset-[3px]">
                      {post.title}
                    </span>
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Layout>
  )
}
