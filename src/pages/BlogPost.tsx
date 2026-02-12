import Markdown from "react-markdown"
import { Link, useParams } from "react-router-dom"

import Footer from "@/components/Footer"
import { getAdjacentPosts, getPost } from "@/lib/blog"

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug || "")
  const { prev, next } = getAdjacentPosts(slug || "")

  if (!post) {
    return (
      <div className="flex h-screen grow w-full items-center justify-center bg-white font-mono text-zinc-900 dark:bg-zinc-950 dark:text-white">
        <div className="flex-col h-full bg-white dark:bg-zinc-950 content-center">
          <p>Post not found.</p>
          <Link
            to="/blog#"
            className="text-sm font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white font-mono text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <main className="flex grow w-full max-w-4xl flex-col items-center p-6 sm:p-8 bg-white dark:bg-zinc-950">
        <div className="w-full flex justify-between items-center mb-12">
          <Link
            to="/blog#"
            className="text-sm font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← Back to Blog
          </Link>
        </div>

        <article className="w-full max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">{post.title}</h1>
            <time className="text-sm font-bold text-zinc-500 dark:text-zinc-500">{post.date}</time>
          </div>

          <div className="markdown-content text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
            <Markdown
              components={{
                h1: ({ ...props }) => (
                  <h1 className="mb-4 mt-8 text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="mb-4 mt-8 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="mb-3 mt-6 text-lg font-bold text-zinc-900 dark:text-white sm:text-xl" {...props} />
                ),
                p: ({ ...props }) => <p className="mb-4" {...props} />,
                ul: ({ ...props }) => <ul className="mb-4 list-disc pl-5" {...props} />,
                ol: ({ ...props }) => <ol className="mb-4 list-decimal pl-5" {...props} />,
                li: ({ ...props }) => <li className="mb-1" {...props} />,
                a: ({ ...props }) => <a className="text-blue-600 hover:underline dark:text-blue-400" {...props} />,
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-4 border-zinc-300 pl-4 italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                    {...props}
                  />
                ),
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "")
                  return match ? (
                    <pre className="mb-4 overflow-x-auto rounded bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code
                      className="rounded bg-zinc-100 px-1 py-0.5 text-sm font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                      {...props}
                    >
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => <>{children}</>,
              }}
            >
              {post.body}
            </Markdown>
          </div>
        </article>

        {(prev || next) && (
          <div className="mt-16 w-full max-w-3xl border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <div className="flex justify-between">
              {prev ? (
                <Link to={`/blog/${prev.slug}#`} className="flex flex-col items-start text-sm hover:underline">
                  <span className="mb-1 text-zinc-500 dark:text-zinc-500">← Previous</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{prev.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link to={`/blog/${next.slug}#`} className="flex flex-col items-end text-sm hover:underline">
                  <span className="mb-1 text-zinc-500 dark:text-zinc-500">Next →</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{next.title}</span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
