import { links } from "@/data/links"

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-2 border-t border-zinc-200 pt-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
      <span>© {new Date().getFullYear()} Bruno Pimentel</span>
      <nav aria-label="Elsewhere" className="flex gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
            className="hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
