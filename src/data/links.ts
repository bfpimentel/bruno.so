export type ExternalLink = {
  label: string
  href: string
  external: boolean
}

export const links: ExternalLink[] = [
  { label: "github", href: "https://github.com/bfpimentel/", external: true },
  { label: "linkedin", href: "https://linkedin.com/in/bfpimentel/", external: true },
  { label: "rss", href: "/rss.xml", external: false },
]
