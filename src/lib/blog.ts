import fm from "front-matter"

export type Post = {
  slug: string
  title: string
  date: string
  description: string
  body: string
}

type Attributes = {
  title: string
  date: string
  description: string
}

export function getPosts(): Post[] {
  const modules = import.meta.glob("/src/content/blog/*.md", {
    query: "?raw",
    eager: true,
    import: "default",
  })
  const posts: Post[] = []

  for (const path in modules) {
    const content = modules[path] as string
    const parsed = fm<Attributes>(content)
    const slug = path.split("/").pop()?.replace(".md", "") || ""

    posts.push({
      slug,
      title: parsed.attributes.title,
      date: new Date(parsed.attributes.date).toISOString().split("T")[0],
      description: parsed.attributes.description,
      body: parsed.body,
    })
  }

  return posts.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
}

export function getPost(slug: string): Post | undefined {
  const posts = getPosts()
  return posts.find((post) => post.slug === slug)
}

export function getAdjacentPosts(slug: string): { prev?: Post; next?: Post } {
  const posts = getPosts()
  const index = posts.findIndex((post) => post.slug === slug)

  if (index === -1) {
    return {}
  }

  // index 0 is the newest post
  const next = index > 0 ? posts[index - 1] : undefined
  const prev = index < posts.length - 1 ? posts[index + 1] : undefined

  return { prev, next }
}
