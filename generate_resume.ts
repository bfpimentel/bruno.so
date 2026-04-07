import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { tmpdir } from "node:os"
import { compile } from "typst"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface Experience {
  company: string
  title: string
  type: string
  startDate: string
  endDate: string
  location: string
  description: string[]
}

interface ResumeData {
  profile: {
    name: string
    location: string
    email: string
    website: string
    github: string
    linkedin: string
  }
  about: string
  experiences: Experience[]
}

function escapeTypst(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/#/g, "\\#")
    .replace(/\*/g, "\\*")
    .replace(/_/g, "\\_")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/@/g, "\\@")
}

function generateTypstContent(data: ResumeData): string {
  const aboutParagraphs = data.about.split("\n\n").map((p) => escapeTypst(p.trim()))

  let experiencesContent = ""
  for (const exp of data.experiences) {
    const descriptionItems = exp.description.map((d) => `    - ${escapeTypst(d)}`).join("\n")
    const dateRange =
      exp.endDate === "Present" ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`

    experiencesContent += `
#exp(
  "${escapeTypst(exp.company)}",
  "${escapeTypst(exp.title)}",
  "${escapeTypst(dateRange)}",
  "${escapeTypst(exp.location)}",
  [
${descriptionItems}
  ]
)`
  }

  const aboutSection = aboutParagraphs.map((p) => `  ${p}\n\n`).join("")

  const photoPath = "bruno.jpeg"

  return `
#set page(
  paper: "a4",
  margin: (top: 1.5cm, bottom: 1.5cm, left: 1.5cm, right: 1.5cm)
)

#set text(
  font: "Libertinus Serif",
  size: 10pt,
  lang: "en"
)

#set par(
  justify: true,
  leading: 0.8em
)

#let photo = box[
  #image("${photoPath}", width: 3cm)
]

#let name = [
  #text(24pt, weight: "bold")[${escapeTypst(data.profile.name)}]
]

#let contact = [
  #text(9pt, style: "italic")[
    #link("mailto:${data.profile.email}")[${escapeTypst(data.profile.email)}]\\
    #link("${data.profile.website}")[${escapeTypst(data.profile.website)}]\\
    #link("${data.profile.github}")[${escapeTypst(data.profile.github)}]\\
    #link("${data.profile.linkedin}")[${escapeTypst(data.profile.linkedin)}]\\
    ${escapeTypst(data.profile.location)}
  ]
]

#let section(title) = [
  #v(0.8em)
  #text(12pt, weight: "bold")[#upper(title)]
  #v(0.2em)
  #line(length: 100%, stroke: 0.5pt)
  #v(0.4em)
]

#let exp(company, title, dates, location, items) = block(breakable: false)[
  #text(11pt, weight: "bold")[#company]
  #h(1fr)
  #text(9pt, style: "italic")[#dates]
  #v(-0.3em)
  #text(10pt)[#title]
  #h(1fr)
  #text(9pt, fill: gray)[#location]
  #v(0.2em)
  #items
  #v(0.5em)
]

#grid(
  columns: (1fr, auto),
  gutter: 1em,
  [
    #name
    #v(-2em)
    #contact
  ],
  [
    #align(right + top)[#photo]
  ]
)

#v(1em)

#section("About")

${aboutSection}

#section("Experience")

${experiencesContent}
`
}

async function generateResume() {
  const resumePath = join(__dirname, "public", "resume.json")
  const data: ResumeData = JSON.parse(readFileSync(resumePath, "utf-8"))

  const typstContent = generateTypstContent(data)

  const tmpDir = mkdtempSync(join(tmpdir(), "resume-"))
  const typstFile = join(tmpDir, "resume.typ")

  const photoSrc = join(__dirname, "public", "bruno.jpeg")
  const photoDst = join(tmpDir, "bruno.jpeg")
  const photoContent = readFileSync(photoSrc)

  writeFileSync(photoDst, photoContent)
  writeFileSync(typstFile, typstContent)

  const outputPath = join(__dirname, "public", "resume.pdf")
  try {
    await compile(typstFile, outputPath)
    console.log(`✓ Resume generated: ${outputPath}`)
  } catch (error) {
    console.error("Failed to compile resume:", error)
    process.exit(1)
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateResume().catch(console.error)
}
