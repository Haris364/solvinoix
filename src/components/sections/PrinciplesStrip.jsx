import { Link } from 'react-router-dom'
import { Section } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { Icon } from '../ui/IconBox'
import { principles } from '../../data/site'

const ICONS = { understand: 'Target', build: 'Braces', improve: 'TrendingUp' }
const TONES = {
  understand: 'border-signal-400/30 bg-signal-400/8',
  build: 'border-line bg-ink-800/80',
  improve: 'border-line bg-ink-800/80',
}

/**
 * The three-part method: understand the problem, build the solution, improve
 * the result. Used directly below the hero on the home page.
 */
export function PrinciplesStrip() {
  return (
    <Section tone="raised">
      <div className="container-page">
        <SectionHeading
          eyebrow="How We Approach It"
          title="Technology Built Around Your Business"
          description="Solvionix starts with the business problem, not with a programming language. Choosing the stack is a decision that comes after the process is understood."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {principles.map((principle, index) => (
            <RevealItem key={principle.id}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-ink-900/60 p-7 transition-colors duration-300 hover:border-signal-400/35">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-400 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />

                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className={`inline-flex size-11 items-center justify-center rounded-lg border ${TONES[principle.id]}`}
                  >
                    <Icon
                      name={ICONS[principle.id]}
                      className="size-5 text-signal-300"
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-fog-50">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog-400">
                  {principle.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <Link
            to="/process"
            className="group inline-flex items-center gap-2 text-sm font-medium text-signal-300 transition-colors hover:text-signal-200"
          >
            See the full delivery process
            <Icon
              name="ArrowRight"
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </Section>
  )
}

export default PrinciplesStrip
