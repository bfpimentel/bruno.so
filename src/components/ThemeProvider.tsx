import { createContext, useContext, useEffect, useState } from "react"

export type Theme = "system" | "light" | "dark"

const themes: Theme[] = ["system", "light", "dark"]

type ThemeProviderProps = {
  children: React.ReactNode
  storageKey: string
}

type ThemeProviderState = {
  theme: Theme
  cycleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

function readStoredTheme(storageKey: string): Theme {
  try {
    const stored = localStorage.getItem(storageKey) as Theme | null
    return stored && themes.includes(stored) ? stored : "system"
  } catch {
    return "system"
  }
}

function storeTheme(storageKey: string, theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem(storageKey)
    else localStorage.setItem(storageKey, theme)
  } catch (error) {
    console.warn("Could not persist theme preference", error)
  }
}

export function ThemeProvider({ children, storageKey }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => setTheme(readStoredTheme(storageKey)), [storageKey])

  useEffect(() => {
    if (theme === null) return

    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const apply = () => {
      const resolved = theme === "system" ? (media.matches ? "dark" : "light") : theme
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(resolved)
    }

    apply()

    if (theme !== "system") return
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [theme])

  const cycleTheme = () => {
    const next = themes[(themes.indexOf(theme ?? "system") + 1) % themes.length]
    storeTheme(storageKey, next)
    setTheme(next)
  }

  return (
    <ThemeProviderContext.Provider value={{ theme: theme ?? "system", cycleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
