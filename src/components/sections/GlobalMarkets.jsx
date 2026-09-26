import { Globe } from 'lucide-react'
import { Section } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { markets } from '../../data/site'

/**
 * Where we work. Deliberately worded as markets we are *designed to serve*
 * rather than implying offices, clients or a presence we cannot evidence.
 */
export function GlobalMarkets() {
  return (
    <Section tone="sunken">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Global Reach"
            title="Serving Businesses Globally"
            description="Solvionix is designed to work with businesses anywhere. We collaborate remotely, communicate in writing, and build systems that hold up across time zones and markets."
          >
            <p className="pt-1 text-sm leading-relaxed text-fog-500">
              These are the markets we are initially targeting. We are not claiming offices,
              registrations or existing clients in any of them.
            </p>
          </SectionHeading>

          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600 uppercase">
              Initial Target Markets
            </p>

            <RevealGroup className="mt-5 grid grid-cols-2 gap-3">
              {markets.map((market) => (
                <RevealItem key={market.id}>
                  <div className="group flex h-full flex-col justify-between gap-6 rounded-xl border border-line bg-ink-900/60 p-5 transition-colors duration-300 hover:border-signal-400/30">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="flex size-8 items-center justify-center rounded-md border border-line bg-ink-850 text-fog-400 transition-colors group-hover:border-signal-400/40 group-hover:text-signal-300"
                      >
                        <Globe className="size-4" strokeWidth={1.75} />
                      </span>
                      <p className="text-[0.9375rem] font-medium text-fog-50">{market.name}</p>
                    </div>
                    <p className="font-mono text-[0.625rem] tracking-[0.1em] text-fog-600 uppercase">
                      {market.flagNote}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default GlobalMarkets
