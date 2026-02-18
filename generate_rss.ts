import { Feed } from "feed"
import fm from "front-matter"
import { marked } from "marked"
import fs from "node:fs/promises"
import path from "node:path"

interface FrontMatter {
  title: string
  date: string
  description: string
}

const __dirname = path.resolve()
const contentDir = path.resolve(__dirname, "src/content/blog")
const publicDir = path.resolve(__dirname, "dist")

async function generateRss() {
  const files = await fs.readdir(contentDir)
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(contentDir, file)
        const content = await fs.readFile(filePath, "utf-8")
        const { attributes, body } = fm<FrontMatter>(content)
        const slug = file.replace(".md", "")

        return {
          ...attributes,
          body,
          slug,
          date: new Date(attributes.date),
        }
      })
  )

  posts.sort((a, b) => b.date.getTime() - a.date.getTime())

  const feed = new Feed({
    title: "Bruno Pimentel",
    description: "Software Engineer",
    id: "https://bruno.so/",
    link: "https://bruno.so/",
    language: "en",
    image: "https://bruno.so/bfmp.svg",
    favicon: "https://bruno.so/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Bruno Pimentel`,
    updated: posts.length > 0 ? posts[0].date : new Date(),
    feedLinks: {
      rss2: "https://bruno.so/rss.xml",
    },
    author: {
      name: "Bruno Pimentel",
      email: "hello@bruno.so",
      link: "https://bruno.so",
    },
  })

  for (const post of posts) {
    const body = await marked.parse(post.body)

    feed.addItem({
      title: post.title,
      id: `https://bruno.so/blog/${post.slug}`,
      link: `https://bruno.so/blog/${post.slug}`,
      description: post.description,
      content: body,
      author: [
        {
          name: "Bruno Pimentel",
          email: "hello@bruno.so",
          link: "https://bruno.so",
        },
      ],
      date: post.date,
    })
  }

  await fs.writeFile(path.join(publicDir, "rss.xml"), feed.rss2())

  console.log("RSS Feed generated successfully at dist/rss.xml")
}

generateRss().catch(console.error)
