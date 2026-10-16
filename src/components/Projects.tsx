import Arrow from "@/components/Arrow"
import type Project from "@/entity/Project"

type ProjectsProps = {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <ul className="border-b border-zinc-200 dark:border-zinc-800">
      {projects.map((project) => (
        <li key={project.name}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-t border-zinc-200 py-2.5 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] dark:border-zinc-800"
          >
            <span className="font-semibold group-hover:underline group-hover:underline-offset-[3px]">
              {project.name}
            </span>
            <span className="col-start-1 text-sm text-zinc-500 sm:col-start-auto dark:text-zinc-400">
              {project.description}
            </span>
            <Arrow symbol="↗" />
          </a>
        </li>
      ))}
    </ul>
  )
}
