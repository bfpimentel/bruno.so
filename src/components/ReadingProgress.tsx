import { useEffect, useRef } from "react"

type ReadingProgressProps = {
  target: React.RefObject<HTMLElement | null>
}

export default function ReadingProgress({ target }: ReadingProgressProps) {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (!target.current || !bar.current) return
      const { top, height } = target.current.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -top / Math.max(1, height - window.innerHeight)))
      bar.current.style.transform = `scaleX(${progress})`
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [target])

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-zinc-900 dark:bg-zinc-100"
    />
  )
}
