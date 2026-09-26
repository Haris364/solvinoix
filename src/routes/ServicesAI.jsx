import { Link } from 'react-router-dom'
import { PageBackdrop } from '../components/ui/PageBackdrop'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { AIFlow } from '../components/visuals/AIFlow'
import { Icon } from '../components/ui/IconBox'
import { CTABand } from '../components/sections/CTABand'
import { aiCapabilities } from '../data/services'

const GLYPHS = [
  'MessageSquare',
  'MessageCircle',
  'Bot',
  'FileText',
  'Layers',
  'Network',
  'Zap',
  'Plug',
]

/** Back link shared by both sub-routes. */
function ParentLink() {
  return (
    <Link
      to="/services"
      className="group mb-8 inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-fog-500 uppercase transition-colors hover:text-signal-300"
    >
      <Icon
        name="ArrowRight"
        className="size-3 rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5"
        strokeWidth={2}
      />
      All services
    </Link>
  )
}

export function ServicesAI() {
  return (
    <>
      <PageBackdrop>
        <div className="max-w-3xl">
          <ParentLink />
          <Eyebrow>AI Solutions</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-fog-50 sm:text-5xl lg:text-6xl">
            Intelligence That Works For <span className="text-gradient">Your Business</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            AI is only useful when it produces a result someone can act on. We build systems that
            are grounded in your data, connected to your tools, and constrained to tasks they can
            be trusted with.
          </p>
        </div>
      </PageBackdrop>

      <Section>
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="How it fits together"
            title="From a question to a completed action"
            description="The value is not in the answer. It is in the answer reaching the system that does something with it."
          />

          <AIFlow className="mt-14" />
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow="Capabilities"
            title="What we build with AI"
            description="Eight areas where applied AI removes real work from a business day."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {aiCapabilities.map((capability, index) => (
              <RevealItem key={capability.id}>
                <div className="group h-full bg-ink-900/70 p-6 transition-colors duration-300 hover:bg-ink-800/80">
                  <span
                    aria-hidden="true"
                    className="flex size-10 items-center justify-center rounded-lg border border-line bg-ink-850 text-signal-300 transition-colors group-hover:border-signal-400/40"
                  >
                    <Icon name={GLYPHS[index]} className="size-4.5" strokeWidth={1.75} />
                  </span>

                  <h3 className="mt-5 text-[0.9375rem] font-medium text-fog-50">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog-500">
                    {capability.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CTABand
        title="Have a process AI could take off your team?"
        description="Tell us what your team does repeatedly. We will tell you what is realistic to automate, and what is not worth automating."
      />
    </>
  )
}

export default ServicesAI
