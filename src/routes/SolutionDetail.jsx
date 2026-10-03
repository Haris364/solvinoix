import { useParams } from 'react-router-dom'
import { ArrowLink } from '../components/ui/ArrowLink'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose, ProseList } from '../components/common/KeyLines'
import { SystemFlow } from '../components/common/SystemFlow'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { solutions, getSolution } from '../data/solutions'
import { getIndustry } from '../data/industries'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFound'

/**
 * /solutions/:id — one solution, in full.
 *
 * The requirement → approach → value spine is stated first and at length,
 * because everything after it is a consequence of those three answers. The
 * architecture diagram then shows what the approach actually looks like, which
 * is the part a technical evaluator is really reading for.
 */
export function SolutionDetail() {
  const { id } = useParams()
  const solution = getSolution(id)

  usePageTitle(
    solution ? `${solution.title} — Solvionix Solutions` : 'Solution not found',
    solution?.summary,
  )

  if (!solution) return <NotFound />

  const index = solutions.findIndex((item) => item.id === id)
  const next = solutions[(index + 1) % solutions.length]

  const relatedIndustries = (solution.relatedIndustries ?? []).map(getIndustry).filter(Boolean)

  return (
    <>
      <PageHeader title={solution.title} description={solution.summary}>
        <p className="index-mark">{solution.number} / Solution</p>
      </PageHeader>

      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <SectionHeader eyebrow="The requirement" title="What the business needs" />

            <Reveal delay={0.1} className="lg:pt-16">
              <ProseList
                items={[
                  solution.requirement,
                  solution.approach,
                  solution.value,
                ]}
              />

              <h2 className="font-semibold type-h3 mt-14 text-fog-50">Typical scope</h2>
              <ProseList className="mt-5" items={solution.scope} />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="System shape"
            title="How the approach is put together"
            description="The layers below run in the order shown. The boundary between them is where the interfaces live, and where the integration risk sits."
          />

          <div className="mt-12">
            <SystemFlow
              layers={solution.flow}
              caption="Each layer has one job. Anything that needs to know about two layers talks through the boundary rather than around it."
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Applied in</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">
                Target areas we design for, not a client list.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {relatedIndustries.map((industry) => (
                  <li key={industry.id}>
                    <ArrowLink to={`/industries/${industry.id}`}>
                      {industry.title}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Built with</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">
                Supporting detail. The capability that delivers this is the point, not the
                tool.
              </p>
              <p className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5">
                {solution.technologies.map((technology) => (
                  <span key={technology} className="font-semibold font-mono text-sm text-fog-500">
                    {technology}
                  </span>
                ))}
              </p>
              <p className="mt-8">
                <ArrowLink to="/capabilities">Explore engineering capabilities</ArrowLink>
              </p>
            </div>
          </div>

          <PageClose
            className="mt-16"
            title="Next in this area"
            body={next.summary}
            link={
              <ArrowLink to={`/solutions/${next.id}`} className="font-semibold text-[1.0625rem]">
                {next.title}
              </ArrowLink>
            }
          />
        </div>
      </Section>
    </>
  )
}

export default SolutionDetail
