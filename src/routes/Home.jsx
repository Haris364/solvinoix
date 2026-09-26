import { useState } from 'react'
import { Hero } from '../components/Hero'
import { PrinciplesStrip } from '../components/sections/PrinciplesStrip'
import { PracticeIndex } from '../components/sections/PracticeIndex'
import { GlobalMarkets } from '../components/sections/GlobalMarkets'
import { CTABand } from '../components/sections/CTABand'
import { Section } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/IconBox'
import { ProjectCard } from '../components/projects/ProjectCard'
import { TeamCard } from '../components/team/TeamCard'
import { TeamModal } from '../components/team/TeamModal'
import { projects, featuredProjectIds, disclosureNote } from '../data/projects'
import { teamMembers } from '../data/team'
import { processSteps } from '../data/process'

/**
 * Home page. Each block is a summary of a dedicated page, so the page reads as
 * a complete story while sending visitors to the detail they need.
 */
export function Home() {
  const [selectedMember, setSelectedMember] = useState(null)

  const featured = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean)

  return (
    <>
      <Hero />

      <PrinciplesStrip />
      <PracticeIndex />

      {/* Selected work */}
      <Section tone="raised">
        <div className="container-page">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Selected Work"
              title="Solutions We Have Built"
              description="Demonstrations and internal prototypes that show how we think about problems before writing code."
            />
            <Button to="/projects" variant="secondary" className="shrink-0 self-start sm:self-auto">
              All projects
              <Icon name="ArrowRight" className="size-3.5" strokeWidth={2} />
            </Button>
          </div>

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <RevealItem key={project.id}>
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-fog-600">
            {disclosureNote}
          </p>
        </div>
      </Section>

      {/* Process preview */}
      <Section>
        <div className="container-page">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="How We Work"
              title="From Problem To Solution"
              description="A seven-step process that keeps the work honest, visible and measurable."
            />
            <Button to="/process" variant="secondary" className="shrink-0 self-start sm:self-auto">
              Full process
              <Icon name="ArrowRight" className="size-3.5" strokeWidth={2} />
            </Button>
          </div>

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.slice(0, 4).map((step) => (
              <RevealItem key={step.id}>
                <div className="group h-full bg-ink-900/70 p-6 transition-colors duration-300 hover:bg-ink-800/80">
                  <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-signal-400">
                    {step.number}
                  </p>
                  <p className="mt-3 text-[0.9375rem] font-medium text-fog-50">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-fog-500">{step.summary}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Team teaser */}
      <Section tone="raised">
        <div className="container-page">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Our Team"
              title="Meet the Team Behind Solvionix"
              description="People, technology and ideas working together to solve real business problems."
            />
            <Button to="/team" variant="secondary" className="shrink-0 self-start sm:self-auto">
              Meet our team
              <Icon name="ArrowRight" className="size-3.5" strokeWidth={2} />
            </Button>
          </div>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <RevealItem key={member.id}>
                <TeamCard member={member} onViewProfile={setSelectedMember} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <GlobalMarkets />
      <CTABand />

      <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  )
}

export default Home
