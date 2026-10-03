import { ArrowLink } from '../components/ui/ArrowLink'
import { PageHeader } from '../components/ui/PageHeader'
import { DeliveryTimeline } from '../components/common/DeliveryTimeline'
import { KeyLines, PageClose } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { companyPage } from '../data/content'
import { deliveryStages } from '../data/delivery'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /company — who Solvionix is and how it operates.
 *
 * Not a "welcome to our company" page. Four questions in order: why we exist,
 * how we think about technology, how we work with an organisation, and where
 * we are going. The delivery lifecycle is the proof of the third one, so it
 * gets the largest block on the page.
 *
 * Nothing here states a date, a headcount, a location or a client. Where the
 * company structure is described, it is described as a structure.
 */
export function Company() {
  usePageTitle(companyPage.title, companyPage.description)

  const narrative = [
    { ...companyPage.exists, eyebrow: 'Why' },
    { ...companyPage.thinks, eyebrow: 'Thinking' },
    { ...companyPage.works, eyebrow: 'Working' },
    { ...companyPage.going, eyebrow: 'Direction' },
  ]

  return (
    <>
      <PageHeader title={companyPage.title} description={companyPage.description} />

      <Section>
        <div className="container-page">
          <div className="space-y-16 lg:space-y-20">
            {narrative.map((block, index) => (
              <Reveal key={block.title}>
                <article
                  className={`grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16 ${
                    index > 0 ? 'rule-top pt-14' : ''
                  }`}
                >
                  <div>
                    <p className="index-mark">{block.eyebrow}</p>
                    <h2 className="font-semibold type-h2 mt-3 text-fog-50">{block.title}</h2>
                  </div>

                  <div className="space-y-5">
                    {block.body.map((paragraph) => (
                      <p key={paragraph} className="font-semibold type-body max-w-3xl text-fog-200">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* The delivery lifecycle. The largest single block on the page, because
          this is the answer to "can they actually deliver". */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="Delivery"
            title="The software delivery lifecycle"
            description="Nine stages, the same on every engagement. Each one produces a written output, so a client is never asked to take a decision on trust alone."
          />

          <div className="mt-14">
            <DeliveryTimeline stages={deliveryStages} />
          </div>
        </div>
      </Section>

      {/* How the company is set up, stated as structure rather than as size. */}
      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader eyebrow="Structure" title={companyPage.structure.title} />
            <Reveal delay={0.1} className="lg:pt-16">
              <KeyLines
                rows={companyPage.structure.rows.map((row) => ({
                  label: row.label,
                  body: row.value,
                  mono: true,
                }))}
              />
            </Reveal>
          </div>

          <PageClose
            className="mt-16"
            title={companyPage.teamLink.title}
            body={companyPage.teamLink.body}
            link={
              <ArrowLink to="/team" className="font-semibold text-[1.0625rem]">
                Meet the team
              </ArrowLink>
            }
          />
        </div>
      </Section>
    </>
  )
}

export default Company
