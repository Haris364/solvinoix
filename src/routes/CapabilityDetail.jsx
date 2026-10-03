import { useParams } from 'react-router-dom'
import { ArrowLink } from '../components/ui/ArrowLink'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose, ProseList } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { capabilities, getCapability } from '../data/capabilities'
import { getSolution } from '../data/solutions'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFound'

/**
 * /capabilities/:id — one discipline, in full.
 *
 * Practice, deliverables, standards, then tools. The tools are last and smallest
 * on purpose: a capability defined by its framework is one framework away from
 * being obsolete.
 */
export function CapabilityDetail() {
  const { id } = useParams()
  const capability = getCapability(id)

  usePageTitle(
    capability ? `${capability.title} — Solvionix Capabilities` : 'Capability not found',
    capability?.summary,
  )

  if (!capability) return <NotFound />

  const index = capabilities.findIndex((item) => item.id === id)
  const next = capabilities[(index + 1) % capabilities.length]
  const related = (capability.relatedSolutions ?? []).map(getSolution).filter(Boolean)

  return (
    <>
      <PageHeader title={capability.title} description={capability.summary}>
        <p className="index-mark">{capability.number} / Capability</p>
      </PageHeader>

      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader eyebrow="Practice" title="What the discipline covers" />
            <Reveal delay={0.1}>
              <ProseList items={capability.practice} />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Deliverables</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">
                What the client actually receives, stated so it can be checked at handover.
              </p>
              <ProseList className="mt-6" items={capability.deliverables} />
            </div>

            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Standards</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">
                The commitments that keep the work maintainable after handover.
              </p>
              <ProseList className="mt-6" items={capability.standards} />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <h2 className="font-semibold type-h3 text-fog-50">Tools</h2>
            <div>
              <p className="font-semibold type-support text-fog-400">
                Chosen per requirement. The capability above is the argument; these are the
                instruments.
              </p>
              <p className="mt-6 flex flex-wrap gap-x-2 gap-y-2">
                {capability.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="font-semibold border border-line bg-ink-900/50 px-2.5 py-1 font-mono text-sm text-fog-400"
                  >
                    {technology}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {related.length > 0 ? (
            <div className="mt-16">
              <h2 className="font-semibold type-h3 text-fog-50">Where this is applied</h2>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {related.map((solution) => (
                  <li key={solution.id}>
                    <ArrowLink to={`/solutions/${solution.id}`}>{solution.title}</ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <PageClose
            className="mt-16"
            title="Next discipline"
            body={next.summary}
            link={
              <ArrowLink to={`/capabilities/${next.id}`} className="font-semibold text-[1.0625rem]">
                {next.title}
              </ArrowLink>
            }
          />
        </div>
      </Section>
    </>
  )
}

export default CapabilityDetail
