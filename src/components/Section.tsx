type SectionProps = {
  title: string
  children: React.ReactNode
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2 className="mb-2.5 text-sm font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
        / {title}
      </h2>
      {children}
    </section>
  )
}
