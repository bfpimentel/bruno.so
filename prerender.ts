import fs from "node:fs/promises"
import path from "node:path"

// @ts-expect-error - no types for built file
import { render } from "./dist/server/entry-server.js"

const __dirname = path.resolve()
const template = await fs.readFile(path.resolve(__dirname, "dist/index.html"), "utf-8")

const routes = ["/", "/blog"]

const contentDir = path.resolve(__dirname, "src/content/blog")
const files = await fs.readdir(contentDir)
const blogRoutes = files
  .filter((file) => file.endsWith(".md"))
  .map((file) => `/blog/${file.replace(".md", "")}`)

const allRoutes = [...routes, ...blogRoutes]

for (const url of allRoutes) {
  const helmetContext: any = {}
  const appHtml = render(url, helmetContext)
  const { helmet } = helmetContext

  const html = template.replace("<!--app-html-->", appHtml).replace(
    "<!--head-tags-->",
    `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
    `
  )

  const filePath =
    url === "/" ? "dist/index.html" : `dist${url === "/blog" ? "/blog/index.html" : `${url}.html`}`

  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filePath, html)
  console.log(`Pre-rendered: ${filePath}`)
}
