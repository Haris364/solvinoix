import { useParams } from 'react-router-dom'
import { ArrowLink } from '../components/ui/ArrowLink'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose, ProseList } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { industries, getIndustry } from '../data/industries'
import { getSolution } from '../data/solutions'
import { targetAreasNote } from '../data/content'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFound'

/**
 * /industries/:id — one environment, in full.
 *
 * Conditions first, requirements second, and the related solutions last. The
 * page never opens by naming a technology, which is the discipline the whole
 * site is built on.
 */
export function IndustryDetail() {
  const { id } = useParams()
  const industry = getIndustry(id)

  usePageTitle(
    industry ? `${industry.title} — Solvionix Industries` : 'Industry not found',
    industry?.summary,
  )

  if (!industry) return <NotFound />

  const index = industries.findIndex((item) => item.id === id)
  const next = industries[(index + 1) % industries.length]
  const related = (industry.relatedSolutions ?? []).map(getSolution).filter(Boolean)

  return (
    <>
      <PageHeader title={industry.title} description={industry.summary}>
        <p className="index-mark">{industry.number} / Industry</p>
      </PageHeader>

      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader eyebrow="Environment" title="Operating conditions" />
              <p className="font-semibold type-support mt-6 border-l-2 border-line pl-4 text-fog-500">
                {targetAreasNote}
              </p>
            </div>

            <Reveal delay={0.1}>
              <ProseList items={industry.conditions} />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHeader
              eyebrow="Requirements"
              title="What follows from those conditions"
              description="Each requirement is a system to design, not a feature to add."
            />
            <Reveal delay={0.1}>
              <ProseList items={industry.requirements} />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Applied solutions"
            title="The solution areas this maps to"
            description="Named so the connection is explicit rather than implied."
          />

          <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {related.map((solution) => (
              <li key={solution.id} className="rule-top pt-7">
                <p className="index-mark">{solution.number}</p>
                <h3 className="font-semibold type-h3 mt-2.5 text-fog-50">{solution.title}</h3>
                <p className="font-semibold type-support mt-3 text-fog-400">{solution.summary}</p>
                <p className="mt-5">
                  <ArrowLink to={`/solutions/${solution.id}`}>Explore solution</ArrowLink>
                </p>
              </li>
            ))}
          </ul>

          <PageClose
            className="mt-16"
            title="Next environment"
            body={next.summary}
            link={
              <ArrowLink to={`/industries/${next.id}`} className="font-semibold text-[1.0625rem]">
                {next.title}
              </ArrowLink>
            }
          />
        </div>
      </Section>
    </>
  )
}

export default IndustryDetail
