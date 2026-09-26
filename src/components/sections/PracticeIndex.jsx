import { Link } from 'react-router-dom'
import { Section } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { IconBox, Icon } from '../ui/IconBox'
import { services } from '../../data/services'

/**
 * Compact index of every practice area. Each entry deep-links to its dedicated
 * page where one exists, and to its section on /services otherwise.
 */
export function PracticeIndex({ heading = true }) {
  return (
    <Section tone={heading ? 'base' : 'sunken'}>
      <div className="container-page">
        {heading ? (
          <SectionHeading
            eyebrow="What We Build"
            title="Technology solutions designed around real business needs"
            description="Nine practice areas, one approach: find the problem, then build the smallest reliable system that solves it."
          />
        ) : null}

        <RevealGroup className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const to = service.page ?? `/services#${service.id}`

            return (
              <RevealItem key={service.id}>
                <Link
                  to={to}
                  className="group flex h-full items-start gap-4 bg-ink-900/70 p-6 transition-colors duration-300 hover:bg-ink-800/80"
                >
                  <IconBox icon={service.icon} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.9375rem] font-medium text-fog-50 transition-colors group-hover:text-signal-300">
                      {service.title}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-fog-500">
                      {service.summary}
                    </p>
                  </div>
                  <Icon
                    name="ArrowUpRight"
                    className="mt-0.5 size-4 shrink-0 text-fog-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-300"
                    strokeWidth={2}
                  />
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </Section>
  )
}

export default PracticeIndex
