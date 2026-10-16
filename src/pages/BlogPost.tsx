import { useRef } from "react"
import Markdown from "react-markdown"
import { Link, useParams } from "react-router-dom"
import remarkGfm from "remark-gfm"

import Layout from "@/components/Layout"
import ReadingProgress from "@/components/ReadingProgress"
import SEO from "@/components/SEO"
import { getAdjacentPosts, getPost, getReadingTime } from "@/lib/blog"

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug || "")
  const { prev, next } = getAdjacentPosts(slug || "")
  const article = useRef<HTMLElement>(null)

  if (!post) {
    return (
      <Layout crumbs={[{ label: "blog", to: "/blog" }]}>
        <SEO title="Post Not Found" />
        <div>
          <h1 className="text-[22px] font-bold">Post not found</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            It may have moved. See{" "}
            <Link to="/blog" className="underline underline-offset-[3px]">
              all posts
            </Link>
            .
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout crumbs={[{ label: "blog", to: "/blog" }]}>
      <SEO
        title={post.title}
        description={post.description}
        url={`https://bruno.so/blog/${post.slug}`}
      />
      <ReadingProgress target={article} />

      <article ref={article}>
        <header className="grid gap-2.5">
          <h1 className="text-2xl leading-tight font-bold tracking-tight text-balance sm:text-[28px]">
            {post.title}
          </h1>
          <p className="text-zinc-500 italic dark:text-zinc-400">{post.description}</p>
          <p className="flex flex-wrap gap-x-3.5 text-sm text-zinc-500 tabular-nums dark:text-zinc-400">
            <time dateTime={post.date}>{post.date}</time>
            <span>{getReadingTime(post)} min read</span>
          </p>
        </header>

        <div className="prose mt-9">
          <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
        </div>
      </article>

      {(prev || next) && (
        <nav
          aria-label="More posts"
          className="grid grid-cols-2 border-y border-zinc-200 text-sm dark:border-zinc-800"
        >
          {prev ? <AdjacentPost label="← older" slug={prev.slug} title={prev.title} /> : <span />}
          {next && (
            <AdjacentPost
              label="newer →"
              slug={next.slug}
              title={next.title}
              className="border-l border-zinc-200 pl-4 dark:border-zinc-800"
            />
          )}
        </nav>
      )}
    </Layout>
  )
}

type AdjacentPostProps = {
  label: string
  slug: string
  title: string
  className?: string
}

function AdjacentPost({ label, slug, title, className = "" }: AdjacentPostProps) {
  return (
    <Link to={`/blog/${slug}`} className={`group grid gap-0.5 py-3.5 ${className}`}>
      <small className="text-xs text-zinc-500 dark:text-zinc-400">{label}</small>
      <span className="font-semibold group-hover:underline group-hover:underline-offset-[3px]">
        {title}
      </span>
    </Link>
  )
}
