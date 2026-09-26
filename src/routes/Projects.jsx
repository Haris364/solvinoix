import { PageBackdrop } from '../components/ui/PageBackdrop'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Icon } from '../components/ui/IconBox'
import { ProjectCard } from '../components/projects/ProjectCard'
import { CTABand } from '../components/sections/CTABand'
import { projects, disclosureNote } from '../data/projects'

export function Projects() {
  return (
    <>
      <PageBackdrop>
        <div className="max-w-3xl">
          <Eyebrow>Projects</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-fog-50 sm:text-5xl lg:text-6xl">
            Solutions We <span className="text-gradient">Have Built</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            A working sample of each practice area. These are the problems we chose to build
            against so the capability is demonstrable rather than claimed.
          </p>
        </div>
      </PageBackdrop>

      <Section>
        <div className="container-page">
          <div
            className="flex items-start gap-4 rounded-xl border border-line bg-ink-900/60 p-5 sm:p-6"
            role="note"
          >
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-signal-300"
            >
              <Icon name="ShieldCheck" className="size-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-medium text-fog-50">How to read this page</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fog-400">{disclosureNote}</p>
            </div>
          </div>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <RevealItem key={project.id}>
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CTABand
        title="Want something like this built for your business?"
        description="The next step is a conversation about the problem, not a demo. Bring the messy version."
      />
    </>
  )
}

export default Projects
