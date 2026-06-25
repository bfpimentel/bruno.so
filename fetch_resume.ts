import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const RESUME_ID = "019efea1-0a21-76e0-a9fb-10b11f71c2c3"
const API_BASE_URL = process.env.RX_RESUME_API_URL ?? "https://rxresu.me"

async function fetchResume() {
  const apiKey = process.env.RX_RESUME_API_KEY

  if (!apiKey) {
    throw new Error("Missing RX_RESUME_API_KEY environment variable")
  }

  const url = new URL(`/api/openapi/resumes/${RESUME_ID}/pdf`, API_BASE_URL)
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
  })

  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(
      `Failed to fetch resume PDF: ${response.status} ${response.statusText}${body ? `\n${body}` : ""}`,
    )
  }

  const outputPath = join(__dirname, "public", "resume.pdf")
  const pdf = Buffer.from(await response.arrayBuffer())

  writeFileSync(outputPath, pdf)
  console.log(`✓ Resume fetched: ${outputPath}`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  fetchResume().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
