import { PageBackdrop } from '../components/ui/PageBackdrop'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Icon } from '../components/ui/IconBox'
import { GrowthTimeline } from '../components/visuals/GrowthTimeline'
import { CTABand } from '../components/sections/CTABand'
import { missionVision } from '../data/process'
import { site } from '../data/site'

const PILLARS = [
  {
    id: 'solve',
    word: 'Solve',
    description:
      'A technology decision is only correct if it resolves the problem in front of us. We define success in operational terms before we design anything.',
  },
  {
    id: 'innovate',
    word: 'Innovate',
    description:
      'We choose the approach that fits the problem — not the one that is newest. Novelty is a tool, never the objective.',
  },
  {
    id: 'evolve',
    word: 'Evolve',
    description:
      'Systems are measured after launch and improved against the original goal, so a solution keeps compounding in value instead of quietly decaying.',
  },
]

export function About() {
  return (
    <>
      <PageBackdrop>
        <div className="max-w-3xl">
          <Eyebrow>About Solvionix</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-fog-50 sm:text-5xl lg:text-6xl">
            Built To Solve <span className="text-gradient">Real Problems</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            {site.name} exists to use technology and innovation to solve practical business
            problems.
          </p>
        </div>
      </PageBackdrop>

      {/* Mission, vision, philosophy */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Mission, vision and philosophy"
            description="Three commitments that decide what we take on, how we build it, and when we consider the work finished."
          />

          <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
            {missionVision.map((item) => (
              <RevealItem key={item.id}>
                <div className="flex h-full flex-col rounded-xl border border-line bg-ink-900/60 p-7">
                  <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-signal-400 uppercase">
                    {item.label}
                  </p>
                  <h2 className="mt-3 text-lg font-semibold text-fog-50">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-fog-400">{item.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Solve. Innovate. Evolve. */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow={site.concept}
            title={site.brandPhrase}
            description="The name comes from the way the work actually runs. Three verbs, in order, every time."
            align="center"
          />

          <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <RevealItem key={pillar.id}>
                <div className="relative h-full rounded-xl border border-line bg-ink-900/60 p-7">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-fog-50">
                    {pillar.word}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog-400">
                    {pillar.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Growth trajectory */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Long-Term Vision"
            title="How Solvionix grows"
            description="The plan is deliberate and unhurried. Each stage has to work before the next one begins."
          />

          <GrowthTimeline className="mt-16" />
        </div>
      </Section>

      {/* Honest positioning */}
      <Section tone="sunken">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-ink-900/50 p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-signal-300"
              >
                <Icon name="ShieldCheck" className="size-5" strokeWidth={1.75} />
              </span>
              <h2 className="text-lg font-semibold text-fog-50">Where we are today</h2>
            </div>

            <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-fog-400">
              <p>
                {site.name} is an early-stage technology company. We are building a track record,
                not claiming one. That is why this site makes no mention of client names, revenue,
                team size, awards or results — there is nothing verified to report yet.
              </p>
              <p>
                What we can show you is how we think, what we are capable of building, and the
                people doing it. Judge us on the conversation and the plan, and let the work speak
                for itself once it is live.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}

export default About
