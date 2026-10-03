import { useParams } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { ArrowLink } from '../components/ui/ArrowLink'
import { ProseList } from '../components/common/KeyLines'
import { CaseStudy } from '../components/work/CaseStudy'
import { ProjectVisual } from '../components/work/ProjectVisual'
import { Section, Reveal } from '../components/ui/Reveal'
import { getWork } from '../data/work'
import { getSolution } from '../data/solutions'
import { getIndustry } from '../data/industries'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFound'

/**
 * /work/:id — one project, read as a system.
 *
 * The label is repeated in the page header, not only on the listing card. A
 * project page is the one most likely to be shared or bookmarked, so it has to
 * state on its own that this is a demonstration or internal build.
 */
export function WorkDetail() {
  const { id } = useParams()
  const project = getWork(id)

  usePageTitle(
    project ? `${project.title} — Solvionix Work` : 'Project not found',
    project?.summary,
  )

  if (!project) return <NotFound />

  const relatedSolutions = (project.relatedSolutions ?? []).map(getSolution).filter(Boolean)
  const relatedIndustries = (project.relatedIndustries ?? []).map(getIndustry).filter(Boolean)

  return (
    <>
      <PageHeader title={project.title} description={project.summary}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-semibold border border-line bg-ink-900 px-2 py-1 font-mono text-[0.75rem] tracking-[0.12em] text-fog-300 uppercase">
            {project.label}
          </span>
          {/* A named client replaces the domain in this slot. On a client project
              the domain is implied by the client, and naming them is the more
              useful of the two. */}
          {project.client ? (
            <p className="font-semibold font-mono text-[0.75rem] tracking-[0.12em] text-fog-600 uppercase">
              {project.client} — {project.domain}
            </p>
          ) : (
            <p className="font-semibold font-mono text-[0.75rem] tracking-[0.12em] text-fog-600 uppercase">
              {project.domain}
            </p>
          )}
        </div>
      </PageHeader>

      <Section>
        <div className="container-page">
          <ProjectVisual
            seed={project.id}
            className="mb-14 overflow-hidden border border-line-soft bg-ink-900"
          />
          <CaseStudy project={project} />
        </div>
      </Section>

      {/* Supporting detail and the onward links, kept below the case study so the
          reasoning is read first. */}
      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Technology</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">
                Supporting detail for the decisions described above.
              </p>
              <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5">
                {project.technology.map((item) => (
                  <span key={item} className="font-semibold font-mono text-sm text-fog-500">
                    {item}
                  </span>
                ))}
              </p>
            </div>

            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Solution areas</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {relatedSolutions.map((solution) => (
                  <li key={solution.id}>
                    <ArrowLink to={`/solutions/${solution.id}`}>{solution.title}</ArrowLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Environments</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">Target areas, not clients.</p>
              <ul className="mt-5 flex flex-col gap-3">
                {relatedIndustries.map((industry) => (
                  <li key={industry.id}>
                    <ArrowLink to={`/industries/${industry.id}`}>{industry.title}</ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Reveal>
            <ProseList
              className="mt-14 max-w-3xl"
              items={[project.status]}
            />
          </Reveal>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            <ArrowLink to="/work">All projects</ArrowLink>
            <ArrowLink to="/work/case-studies">Case study format</ArrowLink>
            <ArrowLink to="/contact">Discuss your requirements</ArrowLink>
          </div>
        </div>
      </Section>
    </>
  )
}

export default WorkDetail
