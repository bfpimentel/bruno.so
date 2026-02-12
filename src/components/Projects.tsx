import type Project from "@/entity/Project"

type ProjectsProps = {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="mb-10 text-center text-xl font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
        / Projects
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col border border-zinc-200 bg-white p-6 transition-all duration-200 hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-white dark:hover:bg-zinc-900 dark:hover:shadow-[4px_4px_0px_0px_white]"
          >
            <h3 className="mb-3 text-lg font-bold text-zinc-900 group-hover:text-black dark:text-zinc-100 dark:group-hover:text-white">
              {project.name}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-600 group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-300">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
