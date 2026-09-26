import { PageBackdrop } from '../components/ui/PageBackdrop'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section } from '../components/ui/Reveal'
import { Icon } from '../components/ui/IconBox'
import { site } from '../data/site'
import { legalMeta, legalSections } from '../data/legal'

/**
 * Shared renderer for the privacy and terms pages. Content lives in
 * src/data/legal.js.
 */
export function LegalPage({ kind }) {
  const meta = legalMeta[kind]
  const sections = legalSections[kind]
  const otherKind = kind === 'privacy' ? 'terms' : 'privacy'
  const otherLabel = otherKind === 'privacy' ? 'Privacy Policy' : 'Terms of Use'

  return (
    <>
      <PageBackdrop bloom={false}>
        <div className="max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-5 text-3xl font-semibold leading-[1.1] text-fog-50 sm:text-4xl lg:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.12em] text-fog-600 uppercase">
            {meta.updated}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400">{meta.intro}</p>
        </div>
      </PageBackdrop>

      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16">
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600 uppercase">
                On this page
              </p>
              <ul className="mt-4 space-y-2.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block text-sm text-fog-400 transition-colors hover:text-signal-300"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-w-2xl">
              <div
                className="flex items-start gap-4 rounded-xl border border-line bg-ink-900/60 p-5"
                role="note"
              >
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-signal-300"
                >
                  <Icon name="ShieldCheck" className="size-4" strokeWidth={1.75} />
                </span>
                <p className="text-sm leading-relaxed text-fog-400">
                  This is a plain-language starting point, not legal advice. It should be reviewed
                  and adapted to the registered entity and jurisdiction before {site.name} relies
                  on it commercially.
                </p>
              </div>

              <div className="mt-12 space-y-11">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="text-lg font-semibold text-fog-50 sm:text-xl">
                      {section.title}
                    </h2>
                    <div className="mt-3 space-y-4">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="text-[0.9375rem] leading-relaxed text-fog-400"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-14 border-t border-line pt-7">
                <a
                  href={`/${otherKind}`}
                  className="inline-flex items-center gap-2 text-sm text-signal-300 transition-colors hover:text-signal-200"
                >
                  Read the {otherLabel}
                  <Icon name="ArrowRight" className="size-3.5" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default LegalPage
