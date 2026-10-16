import { Fragment } from "react"
import { Link } from "react-router-dom"

import Footer from "@/components/Footer"
import Logo from "@/components/Logo"
import { useTheme } from "@/components/ThemeProvider"

type Crumb = {
  label: string
  to?: string
}

type LayoutProps = {
  crumbs?: Crumb[]
  children: React.ReactNode
}

export default function Layout({ crumbs = [], children }: LayoutProps) {
  const { theme, cycleTheme } = useTheme()

  return (
    <div className="mx-auto flex w-full max-w-2xl grow flex-col gap-11 px-6 pt-10 pb-8 lg:max-w-3xl lg:gap-14 lg:pt-16">
      <header className="flex items-center justify-between gap-4">
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400"
        >
          <Logo />
          {crumbs.map((crumb) => (
            <Fragment key={crumb.label}>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
        <button
          onClick={cycleTheme}
          aria-label={`Theme: ${theme}. Switch theme`}
          className="cursor-pointer py-1 text-sm whitespace-nowrap text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ◐ {theme}
        </button>
      </header>
      <main className="flex grow flex-col gap-11">{children}</main>
      <Footer />
    </div>
  )
}
