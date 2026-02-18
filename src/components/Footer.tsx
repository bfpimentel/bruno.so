import SocialButton from "@/components/SocialButton"
import { useTheme } from "@/components/ThemeProvider"

export default function Footer() {
  const { theme, setTheme } = useTheme()

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="mt-auto flex w-full justify-center bg-white p-6 dark:bg-zinc-950">
      <footer className="flex w-full flex-col items-center justify-between gap-6 border-t border-zinc-200 dark:border-zinc-800 md:flex-row md:items-start pt-8">
        <div className="flex gap-4">
          <SocialButton icon="/linkedin.svg" link="https://linkedin.com/in/bfpimentel/" />
          <SocialButton icon="/github.svg" link="https://github.com/bfpimentel/" />
          <SocialButton icon="/rss.svg" link="/rss.xml" />
        </div>

        <button
          onClick={switchTheme}
          className="flex items-center gap-2 border border-zinc-300 bg-zinc-100 px-4 py-2 text-sm font-medium uppercase tracking-wider text-zinc-600 transition-colors hover:border-black hover:text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-white dark:hover:text-white"
        >
          Theme: {theme}
        </button>
      </footer>
    </div>
  )
}
