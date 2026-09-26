import { Link } from 'react-router-dom'
import { PageBackdrop } from '../components/ui/PageBackdrop'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { AutomationFlow } from '../components/visuals/AutomationFlow'
import { Icon } from '../components/ui/IconBox'
import { CTABand } from '../components/sections/CTABand'
import { automationSystems } from '../data/services'

const SYSTEM_ICONS = {
  website: 'Globe',
  leads: 'Users',
  crm: 'Layers',
  email: 'Send',
  ai: 'BrainCircuit',
  database: 'Database',
  appointments: 'CalendarCheck',
  analytics: 'BarChart3',
}

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

export function ServicesAutomation() {
  return (
    <>
      <PageBackdrop>
        <div className="max-w-3xl">
          <ParentLink />
          <Eyebrow>Business Automation</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-fog-50 sm:text-5xl lg:text-6xl">
            Automate The Work That <span className="text-gradient">Slows You Down</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            Most business delay is not a hard problem. It is the same information being re-typed
            between five tools by a person who has better things to do. We connect those steps so
            the work moves on its own.
          </p>
        </div>
      </PageBackdrop>

      {/* Systems we connect */}
      <Section>
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="What we connect"
            title="One flow, across the systems you already use"
            description="Automation only pays off when the systems talk to each other. These are the ones we connect most often."
          />

          <RevealGroup className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {automationSystems.map((system) => (
              <RevealItem key={system.id}>
                <div className="group flex h-full flex-col items-center gap-3 rounded-xl border border-line bg-ink-900/60 p-6 text-center transition-colors duration-300 hover:border-signal-400/35">
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-lg border border-line bg-ink-850 text-fog-300 transition-colors group-hover:border-signal-400/40 group-hover:text-signal-300"
                  >
                    <Icon name={SYSTEM_ICONS[system.id]} className="size-5" strokeWidth={1.75} />
                  </span>
                  <p className="text-sm font-medium text-fog-50">{system.label}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Workflow diagram */}
      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Worked example"
                title="A lead, from first visit to booked appointment"
                description="This is a representative flow. Every stage is configurable — the qualification rules, the follow-up sequence and the hand-off points are all defined with you."
              />

              <ul className="mt-9 space-y-3.5">
                {[
                  'Nothing is re-typed between systems',
                  'Every action is logged and reviewable',
                  'Your team sees qualified leads, not noise',
                  'Handover points stay human by design',
                ].map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-fog-400">
                    <Icon
                      name="CircleCheck"
                      className="mt-0.5 size-4 shrink-0 text-signal-400"
                      strokeWidth={1.75}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <AutomationFlow />
          </div>
        </div>
      </Section>

      <CTABand
        title="Where does work get stuck in your business?"
        description="Describe the manual step nobody wants to own. We will map it out and show you what automating it would actually change."
      />
    </>
  )
}

export default ServicesAutomation
