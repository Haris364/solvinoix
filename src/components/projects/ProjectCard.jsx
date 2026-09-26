import { GeneratedCover } from '../visuals/GeneratedCover'
import { Badge } from '../ui/Badge'
import { Icon } from '../ui/IconBox'
import { cn } from '../../lib/cn'

/**
 * A demonstration or internal prototype. The disclosure badge is always shown,
 * and the Live Demo / Case Study buttons only appear when a real URL has been
 * published — never as dead links.
 */
export function ProjectCard({ project, image }) {
  const { id, title, category, badge, problem, solution, technology = [], liveUrl, caseStudyUrl } =
    project

  const hasActions = Boolean(liveUrl || caseStudyUrl)

  return (
    <article className="group surface-card flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-signal-400/35">
      <div className="relative overflow-hidden border-b border-line">
        <GeneratedCover
          seed={id}
          title={title}
          image={image}
          className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
        />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge tone="signal">{badge}</Badge>
        </div>

        <div className="absolute top-4 right-4">
          <span className="rounded-md border border-line bg-ink-950/80 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-fog-300 uppercase backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-lg font-semibold text-fog-50">{title}</h3>

        <div className="mt-5 space-y-4">
          <div>
            <p className="font-mono text-[0.625rem] tracking-[0.16em] text-fog-600 uppercase">
              Problem
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-fog-400">{problem}</p>
          </div>

          <div>
            <p className="font-mono text-[0.625rem] tracking-[0.16em] text-fog-600 uppercase">
              Approach
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-fog-400">{solution}</p>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {technology.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-ink-850/80 px-2.5 py-1 text-xs text-fog-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        {hasActions ? (
          <div className="mt-auto flex flex-wrap gap-2.5 pt-7">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-ink-800 px-3.5 text-[0.8125rem] font-medium text-fog-50 transition-colors hover:border-signal-400/50 hover:text-signal-300"
              >
                Live Demo
                <Icon name="ArrowUpRight" className="size-3.5" strokeWidth={2} />
              </a>
            ) : null}

            {caseStudyUrl ? (
              <a
                href={caseStudyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-ink-800 px-3.5 text-[0.8125rem] font-medium text-fog-50 transition-colors hover:border-signal-400/50 hover:text-signal-300"
              >
                Case Study
                <Icon name="FileText" className="size-3.5" strokeWidth={2} />
              </a>
            ) : null}
          </div>
        ) : (
          <p className={cn('mt-auto pt-7 text-xs leading-relaxed text-fog-600')}>
            A walkthrough is available on request during a project conversation.
          </p>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
