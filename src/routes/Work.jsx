import { ArrowLink } from '../components/ui/ArrowLink'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose, ProseList } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { ProjectCard } from '../components/work/ProjectCard'
import { caseStudySections, work } from '../data/work'
import { workPage } from '../data/content'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /work — evidence of system thinking.
 *
 * The page opens by explaining how a project is presented, because the
 * structure is part of the evidence. Then the projects, then the case study
 * format. The disclosure is stated on this page rather than hidden behind each
 * card: a reader should not have to click to find out that nothing here is
 * client work.
 */
export function Work() {
  usePageTitle(workPage.title, workPage.description)

  return (
    <>
      <PageHeader title={workPage.title} description={workPage.description} />

      {/* How a project is read, stated before the projects themselves. */}
      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader
              eyebrow={workPage.systems.eyebrow}
              title={workPage.systems.title}
            />
            <Reveal delay={0.1} className="lg:pt-16">
              <p className="font-semibold type-body text-fog-200">{workPage.systems.body}</p>

              {/* The nine headings, so the structure is visible without opening
                  a project. */}
              <ProseList
                className="mt-8 max-w-xl"
                columns
                items={caseStudySections.map((section) => `${section.number} ${section.title}`)}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="Systems"
            title="Demonstration and internal projects"
            description="Each one presented as a system rather than a portfolio entry, with the operational problem and the reasoning stated in full."
            actions={
              <ArrowLink to="/work/case-studies" className="font-semibold text-[1.0625rem]">
                Case study format
              </ArrowLink>
            }
          />

          <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:gap-x-16">
            {work.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Section>

      {/* What a client case study will look like, and why there are none yet. */}
      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader
              eyebrow={workPage.caseStudy.eyebrow}
              title={workPage.caseStudy.title}
            />
            <Reveal delay={0.1} className="lg:pt-16">
              <p className="font-semibold type-body text-fog-200">{workPage.caseStudy.body}</p>
              <p className="mt-8">
                <ArrowLink to="/work/case-studies">See the format</ArrowLink>
              </p>
            </Reveal>
          </div>

          <PageClose
            className="mt-16"
            title={workPage.closing.title}
            body={workPage.closing.body}
            link={
              <ArrowLink to="/contact" className="font-semibold text-[1.0625rem]">
                Discuss your requirements
              </ArrowLink>
            }
          />
        </div>
      </Section>
    </>
  )
}

export default Work
