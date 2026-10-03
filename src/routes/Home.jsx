import { Hero } from '../components/Hero'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Section, Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { DeliveryTimeline } from '../components/common/DeliveryTimeline'
import { SolutionRow } from '../components/solutions/SolutionRow'
import { ProjectCard } from '../components/work/ProjectCard'
import { ProseList } from '../components/common/KeyLines'
import { IndustryRow } from '../components/industries/IndustryRow'
import { CapabilitySection } from '../components/capabilities/CapabilitySection'
import { home } from '../data/content'
import { solutions } from '../data/solutions'
import { industries } from '../data/industries'
import { capabilities } from '../data/capabilities'
import { deliveryPreviewCount, deliveryStages } from '../data/delivery'
import { featuredWork } from '../data/work'
import { teamMembers } from '../data/team'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * The home page.
 *
 * A short overview, in the order a visitor actually asks the questions:
 *
 *   what do you do → what problems → what can you build → do you understand my
 *   industry → can you engineer it → where is the work → how do we start
 *
 * The approved hero sits at the top and is not modified. Everything below it
 * previews a real page and links onward, so the home page never becomes a
 * second copy of the site. Each block shows a representative few items and
 * points at the rest.
 */

/** How many of each the home page previews. */
const SOLUTION_PREVIEW = 3
const INDUSTRY_PREVIEW = 2
const CAPABILITY_PREVIEW = 2

export function Home() {
  usePageTitle()

  const solutionPreview = solutions.slice(0, SOLUTION_PREVIEW)
  const industryPreview = industries.slice(0, INDUSTRY_PREVIEW)
  const capabilityPreview = capabilities.slice(0, CAPABILITY_PREVIEW)
  const deliveryPreview = deliveryStages.slice(0, deliveryPreviewCount)

  return (
    <>
      <Hero />

      {/* 1 — Positioning. Establishes business understanding before technology. */}
      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeader
              eyebrow={home.positioning.eyebrow}
              title={home.positioning.title}
              size="large"
            />

            <Reveal delay={0.1} className="lg:pt-16">
              <p className="font-semibold type-body text-fog-200">{home.positioning.body}</p>

              {/* The method, stated as an order of work rather than a claim. */}
              <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2">
                {home.positioning.method.map((step, index) => (
                  <RevealItem key={step.label} y={12}>
                    <div>
                      <p className="font-semibold index-mark text-fog-600">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="font-semibold type-h3 mt-2 text-fog-50">{step.label}</p>
                      <p className="font-semibold type-support mt-2 text-fog-400">{step.detail}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 2 — Solutions */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow={home.solutions.eyebrow}
            title={home.solutions.title}
            description={home.solutions.description}
            actions={
              <ArrowLink to="/solutions" className="font-semibold text-[1.0625rem]">
                Explore solutions
              </ArrowLink>
            }
          />

          <div className="mt-14 space-y-14">
            {solutionPreview.map((solution) => (
              <SolutionRow key={solution.id} solution={solution} />
            ))}
          </div>
        </div>
      </Section>

      {/* 3 — Selected work */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow={home.work.eyebrow}
            title={home.work.title}
            description={home.work.description}
            actions={
              <ArrowLink to="/work" className="font-semibold text-[1.0625rem]">
                View selected work
              </ArrowLink>
            }
          />

          <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:gap-x-16">
            {featuredWork.map((project) => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        </div>
      </Section>

      {/* 4 — Engineering capability */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow={home.capability.eyebrow}
            title={home.capability.title}
            description={home.capability.description}
            actions={
              <ArrowLink to="/capabilities" className="font-semibold text-[1.0625rem]">
                Explore engineering capabilities
              </ArrowLink>
            }
          />

          <div className="mt-14 space-y-14">
            {capabilityPreview.map((capability) => (
              <CapabilitySection key={capability.id} capability={capability} compact />
            ))}
          </div>
        </div>
      </Section>

      {/* 5 — Industries */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow={home.industries.eyebrow}
            title={home.industries.title}
            description={home.industries.description}
            actions={
              <ArrowLink to="/industries" className="font-semibold text-[1.0625rem]">
                Explore industry solutions
              </ArrowLink>
            }
          />

          <div className="mt-14 space-y-14">
            {industryPreview.map((industry) => (
              <IndustryRow key={industry.id} industry={industry} compact />
            ))}
          </div>
        </div>
      </Section>

      {/* 6 — Delivery approach */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow={home.delivery.eyebrow}
            title={home.delivery.title}
            description={home.delivery.description}
          />

          <div className="mt-12">
            <DeliveryTimeline stages={deliveryPreview} compact />
          </div>

          <div className="mt-10">
            <ArrowLink to="/company">See the full delivery lifecycle</ArrowLink>
          </div>
        </div>
      </Section>

      {/* 7 — Company / team credibility. A compact block, not the team page. */}
      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader
              eyebrow={home.team.eyebrow}
              title={home.team.title}
              description={home.team.description}
            />

            <Reveal delay={0.1} className="lg:pt-16">
              {teamMembers.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="rule-top pt-5">
                      <p className="font-semibold type-h3 text-fog-50">{member.name}</p>
                      <p className="font-semibold type-support mt-1.5 text-fog-500">{member.role}</p>
                      <p className="font-semibold type-support mt-3 text-fog-400">{member.summary}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ArrowLink to="/team">Meet the team</ArrowLink>
                <ArrowLink to="/company">How the company operates</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 8 — Contact. Text only: the floating control is the site's one CTA. */}
      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
            <SectionHeader
              eyebrow={home.contact.eyebrow}
              title={home.contact.title}
              size="large"
            />
            <Reveal delay={0.1}>
              <p className="font-semibold type-body text-fog-200">{home.contact.description}</p>
              <ProseList
                className="mt-8"
                items={[
                  'Tell us what you are looking for and where the project stands.',
                  'Describe the operational problem rather than the feature list.',
                  'We reply with a view, including whether we are the right team for it.',
                ]}
              />
              <div className="mt-8">
                <ArrowLink to="/contact" className="font-semibold text-[1.0625rem]">
                  Discuss your requirements
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Home
