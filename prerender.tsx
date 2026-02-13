import he from "he"
import fs from "node:fs/promises"
import path from "node:path"
import satori from "satori"

import { Resvg } from "@resvg/resvg-js"

// @ts-expect-error
import { render } from "./dist/server/entry-server.js"

const __dirname = path.resolve()
const template = await fs.readFile(path.resolve(__dirname, "dist/index.html"), "utf-8")

const contentDir = path.resolve(__dirname, "src/content/blog")
const files = await fs.readdir(contentDir)

const regularFontData = await fs.readFile(
  path.resolve(__dirname, "public/fonts/VictorMono/VictorMono-Regular.ttf")
)
const boldFontData = await fs.readFile(
  path.resolve(__dirname, "public/fonts/VictorMono/VictorMono-Bold.ttf")
)

const logoData = await fs.readFile(path.resolve(__dirname, "public/bfmp.svg"))
const logoBase64 = `data:image/svg+xml;base64,${logoData.toString("base64")}`

const blogRoutes = files
  .filter((file) => file.endsWith(".md"))
  .map((file) => `/blog/${file.replace(".md", "")}`)

const routes = ["/", "/blog"]
const allRoutes = [...routes, ...blogRoutes]

for (const url of allRoutes) {
  const helmetContext: any = {}

  const appHtml = await render(url, helmetContext)
  const { helmet } = helmetContext

  const title = helmet?.title?.toString().replace(/<[^>]*>/g, "") || "Bruno Pimentel"
  const description = helmet?.meta
    ? he.decode(
        helmet.meta.toString().match(/name="description" content="([^"]*)"/)?.[1] ||
          "Software Engineer"
      )
    : "Software Engineer"

  const svg = await satori(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#09090b", // zinc-950
        color: "white",
        fontFamily: "Victor Mono",
        padding: "80px",
        textAlign: "left",
      }}
    >
      <img
        src={logoBase64}
        width={120}
        height={120}
        style={{
          marginLeft: "-28px",
          marginBottom: "60px",
          filter: "invert(1)",
        }}
      />
      <div
        style={{
          fontSize: 60,
          fontWeight: "bold",
          marginBottom: "30px",
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 30,
          color: "#a1a1aa", // zinc-400
          fontFamily: "Victor Mono Regular",
          marginBottom: "auto",
        }}
      >
        {description}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          fontSize: 24,
          color: "#52525b", // zinc-600
          fontFamily: "Victor Mono Regular",
          marginTop: "40px",
        }}
      >
        <span>by Bruno Pimentel</span>
        <span>https://bruno.so</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Victor Mono",
          data: boldFontData,
          weight: 700,
          style: "normal",
        },
        {
          name: "Victor Mono Regular",
          data: regularFontData,
          weight: 400,
          style: "normal",
        },
      ],
    }
  )

  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  const ogImageName =
    url === "/" ? "og-home.png" : `og-${url.replace(/\//g, "-").replace(/^-|-$/g, "")}.png`
  const ogImagePath = `dist/${ogImageName}`
  await fs.writeFile(ogImagePath, pngBuffer)

  console.log(`Generated OG Image: ${ogImagePath}`)

  const deployedUrl = "https://bruno.so"
  const ogImageUrl = `${deployedUrl}/${ogImageName}`

  const headTags = `
      ${helmet?.title?.toString() || ""}
      ${helmet?.meta?.toString() || ""}
      ${helmet?.link?.toString() || ""}
      ${helmet?.script?.toString() || ""}
      <meta property="og:image" content="${ogImageUrl}" />
      <meta property="twitter:image" content="${ogImageUrl}" />
      <meta name="twitter:card" content="summary_large_image" />
    `

  const html = template.replace("<!--app-html-->", appHtml).replace("<!--head-tags-->", headTags)

  const filePath =
    url === "/" ? "dist/index.html" : `dist${url === "/blog" ? "/blog/index.html" : `${url}.html`}`

  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filePath, html)

  console.log(`Pre-rendered: ${filePath}`)
}
