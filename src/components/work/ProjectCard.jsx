import { Link } from 'react-router-dom'
import { ArrowLink } from '../ui/ArrowLink'
import { Reveal } from '../ui/Reveal'
import { ProjectVisual } from './ProjectVisual'
import { cn } from '../../lib/cn'

/**
 * A project, presented as a system.
 *
 * The old version of this card was image, name, stack, button. That format
 * describes a portfolio, and a portfolio is the wrong claim for a company that
 * has not delivered much client work yet. This one leads with the operating
 * context and the approach, and it carries the Internal / Demonstration / Client
 * label in the same position as the title so it cannot be skipped.
 *
 * There is now a visual, which reverses part of that decision — so it is worth
 * being precise about what was added and why it is not the thing it resembles.
 * The plate is a generated abstract diagram (see ProjectVisual), not a product
 * screenshot, because there are no real product images to publish and a faked one
 * would be worse than none: a visitor cannot distinguish a fabricated screenshot
 * from a real one. What the image carries is the project's shape — stations, routes,
 * travelling marks — which is a genuine signal about the work. The label still
 * leads, and the caption still states what the project is, so nothing about the
 * entry depends on recognising the artwork.
 *
 * `compact` is the home-page teaser: label, title, one-line summary and the
 * onward link. The context and status drop away, because on the home page they
 * are detail, and detail belongs on the page that is about the project.
 */
export function ProjectCard({ project, compact = false, className }) {
  return (
    <Reveal className={cn('rule-top pt-8', className)}>
      <article className="flex h-full flex-col">
        <ProjectVisual
          seed={project.id}
          className="mb-7 overflow-hidden border border-line-soft bg-ink-900"
        />

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* The label comes first, deliberately. */}
          <span className="font-semibold border border-line bg-ink-900 px-2 py-1 font-mono text-[0.75rem] tracking-[0.12em] text-fog-400 uppercase">
            {project.label}
          </span>
          <span className="font-semibold font-mono text-[0.75rem] tracking-[0.12em] text-fog-600 uppercase">
            {project.client ?? project.domain}
          </span>
        </div>

        <h3 className="font-semibold type-h3 mt-5 text-fog-50">
          <Link
            to={`/work/${project.id}`}
            className="font-semibold transition-colors duration-200 hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="font-semibold type-body mt-4 text-fog-300">{project.summary}</p>

        {/* Context and approach, so the card shows how we think rather than
            what we shipped. Omitted in the teaser. */}
        {compact ? null : (
          <dl className="mt-7 grid gap-5 border-t border-line-soft pt-6">
            <div>
              <dt className="index-mark text-fog-600">Context</dt>
              <dd className="font-semibold type-support mt-2 text-fog-400">
                {project.caseStudy.context}
              </dd>
            </div>
            <div>
              <dt className="index-mark text-fog-600">Current status</dt>
              <dd className="font-semibold type-support mt-2 text-fog-400">{project.status}</dd>
            </div>
          </dl>
        )}

        <p className="mt-7 pt-1">
          <ArrowLink to={`/work/${project.id}`}>View the solution</ArrowLink>
        </p>
      </article>
    </Reveal>
  )
}

export default ProjectCard
