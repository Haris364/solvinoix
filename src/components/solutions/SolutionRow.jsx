import { Link } from 'react-router-dom'
import { ArrowLink } from '../ui/ArrowLink'
import { KeyLines } from '../common/KeyLines'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../lib/cn'

/**
 * One solution, presented as an editorial section rather than a card.
 *
 * The reason this is not a card: a card grid makes five solutions look
 * interchangeable, which is exactly the impression this site must not give. A
 * numbered row with a hairline above it reads as a section of a document, and
 * the requirement → approach → value spine stays visible instead of being
 * collapsed behind a click.
 */
export function SolutionRow({ solution, className }) {
  return (
    <Reveal className={cn('rule-top pt-10 lg:pt-12', className)}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        {/* Identity */}
        <div>
          <p className="index-mark">{solution.number}</p>
          <h3 className="font-semibold type-h2 mt-3 text-fog-50">
            <Link
              to={`/solutions/${solution.id}`}
              className="font-semibold transition-colors duration-200 hover:text-accent"
            >
              {solution.title}
            </Link>
          </h3>
          <p className="font-semibold type-body mt-4 text-fog-300">{solution.summary}</p>
          <p className="mt-6">
            <ArrowLink to={`/solutions/${solution.id}`}>Explore solution</ArrowLink>
          </p>
        </div>

        {/* The spine: what the business needs, how we approach it, what it returns. */}
        <KeyLines
          rows={[
            { label: 'Business requirement', body: solution.requirement },
            { label: 'Technology approach', body: solution.approach },
            { label: 'Operational value', body: solution.value },
          ]}
        />
      </div>
    </Reveal>
  )
}

export default SolutionRow
