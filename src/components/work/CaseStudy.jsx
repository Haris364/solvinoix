import { SystemFlow, UserFlow } from '../common/SystemFlow'
import { ProseList } from '../common/KeyLines'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

/**
 * The nine-part case study.
 *
 * A fixed structure, used identically for every project, because the point of
 * publishing a case study is to show the reasoning rather than the result. Each
 * section is numbered and titled from the same list, so two case studies can be
 * read side by side.
 *
 * Section 08 is deliberately the weakest section on the page. It reports what
 * was implemented and what state the build is in, and it has no room for a
 * number, because no measurement exists. That is stated in the data file and
 * repeated in the section heading here.
 */

const SECTION_MAP = [
  { key: 'context', number: '01', title: 'Business Context' },
  { key: 'challenge', number: '02', title: 'The Challenge' },
  { key: 'strategy', number: '03', title: 'Solution Strategy' },
  { key: 'design', number: '04', title: 'Product / System Design' },
  { key: 'architecture', number: '05', title: 'Architecture' },
  { key: 'implementation', number: '06', title: 'Implementation' },
  { key: 'integrations', number: '07', title: 'Integrations' },
  { key: 'outcome', number: '08', title: 'Outcome & Current Status' },
  { key: 'next', number: '09', title: 'Next Evolution' },
]

export function CaseStudy({ project }) {
  const { caseStudy, architecture, userFlow, capabilitiesImplemented } = project

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* All nine sections in one list, in order, so the numbering is the reading
          order. The architecture diagram is section 05 like any other rather than
          an illustration pulled out of the sequence. */}
      <RevealGroup className="space-y-14 lg:space-y-16">
        {SECTION_MAP.map((section) => {
          if (section.key === 'architecture') {
            if (!architecture?.length) return null

            return (
              <RevealItem key={section.key} y={16}>
                <section>
                  <p className="index-mark">{section.number}</p>
                  <h3 className="font-semibold type-h3 mt-2.5 text-fog-50">{section.title}</h3>
                  <p className="font-semibold type-body mt-4 text-fog-200">
                    The layers below run in the order shown. Each one has one job, and
                    the boundary between them is where the interfaces live.
                  </p>
                  <SystemFlow
                    layers={architecture}
                    className="mt-8"
                    caption="Read top to bottom: source, transformation, decision, persistence, integration."
                  />
                </section>
              </RevealItem>
            )
          }

          const body = caseStudy[section.key]
          if (!body) return null

          return (
            <RevealItem key={section.key} y={16}>
              <section>
                <p className="index-mark">{section.number}</p>
                <h3 className="font-semibold type-h3 mt-2.5 text-fog-50">{section.title}</h3>
                <p className="font-semibold type-body mt-4 text-fog-200">{body}</p>
              </section>
            </RevealItem>
          )
        })}
      </RevealGroup>

      {/* The path through the system, kept alongside the architecture. */}
      {userFlow?.length ? (
        <Reveal>
          <section className="grid gap-8 border-t border-line pt-12 lg:pt-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <h3 className="font-semibold type-h3 text-fog-50">Primary user flow</h3>
              <p className="font-semibold type-support mt-4 text-fog-400">
                What actually happens, in order, from the point of entry to the
                record being written.
              </p>
            </div>
            <UserFlow steps={userFlow} />
          </section>
        </Reveal>
      ) : null}

      {/* Implemented capabilities, listed so the section above is backed by
          something enumerable rather than a claim. */}
      {capabilitiesImplemented?.length ? (
        <Reveal className="rule-top pt-12 lg:pt-14">
          <section className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <h3 className="font-semibold type-h3 text-fog-50">Implemented capabilities</h3>
              <p className="font-semibold type-support mt-4 text-fog-400">
                What the build demonstrably does. Anything not on this list is not
                part of the system.
              </p>
            </div>
            <ProseList items={capabilitiesImplemented} />
          </section>
        </Reveal>
      ) : null}
    </div>
  )
}

export default CaseStudy
