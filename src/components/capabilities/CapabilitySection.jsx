import { Link } from 'react-router-dom'
import { ArrowLink } from '../ui/ArrowLink'
import { ProseList } from '../common/KeyLines'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../lib/cn'

/**
 * One capability, laid out as practice, deliverables, standards, technology.
 *
 * The order is the argument: what the discipline is, what the client receives,
 * what we commit to, and only then the tools. Technology sits last and in the
 * smallest type on the page, because a capability defined by its framework is a
 * capability that is one framework away from obsolete.
 *
 * `compact` is the home-page teaser: number, title, one-line summary and the
 * onward link. The practice, deliverables, standards and tools are detail, and
 * detail belongs on /capabilities where the argument is actually made.
 */
export function CapabilitySection({ capability, compact = false, className }) {
  return (
    <Reveal className={cn('rule-top pt-10 lg:pt-14', className)}>
      <article
        className={cn(
          'grid gap-8',
          compact ? 'lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16' : 'lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16',
        )}
      >
        <div>
          <p className="index-mark">{capability.number}</p>
          <h3 className="font-semibold type-h2 mt-3 text-fog-50">
            <Link
              to={`/capabilities/${capability.id}`}
              className="font-semibold transition-colors duration-200 hover:text-accent"
            >
              {capability.title}
            </Link>
          </h3>
          <p className="font-semibold type-body mt-4 text-fog-300">{capability.summary}</p>
          <p className="mt-6">
            <ArrowLink to={`/capabilities/${capability.id}`}>
              Explore engineering capability
            </ArrowLink>
          </p>
        </div>

        {compact ? null : (
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            <div>
              <h4 className="font-bold text-[0.9375rem] text-fog-50">Practice</h4>
              <ProseList items={capability.practice} className="mt-4" />
            </div>

            <div className="grid gap-8">
              <div>
                <h4 className="font-bold text-[0.9375rem] text-fog-50">Deliverables</h4>
                <ProseList items={capability.deliverables} className="mt-4" />
              </div>

              <div>
                <h4 className="font-bold text-[0.9375rem] text-fog-50">Standards</h4>
                <ProseList items={capability.standards} className="mt-4" />
              </div>
            </div>
          </div>
        )}
      </article>

      {compact || !capability.technologies?.length ? null : (
        <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-line-soft pt-5">
          <span className="font-semibold index-mark mr-1 text-fog-600">Tools</span>
          {capability.technologies.map((technology) => (
            <span key={technology} className="font-semibold font-mono text-sm text-fog-500">
              {technology}
            </span>
          ))}
        </p>
      )}
    </Reveal>
  )
}

export default CapabilitySection
