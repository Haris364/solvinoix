import { Button } from '../ui/Button'
import { Icon } from '../ui/IconBox'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal } from '../ui/Reveal'
import { site } from '../../data/site'

/**
 * Closing call to action, used on the home page and as the tail of the About,
 * Services and Projects pages.
 */
export function CTABand({
  eyebrow = 'Start a Project',
  title = 'Have A Business Problem To Solve?',
  description = "Let's turn your idea, process or business challenge into a practical technology solution.",
}) {
  return (
    <section className="border-y border-line bg-ink-900/50">
      <div className="container-page py-20 sm:py-24 lg:py-28">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-900/70 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-signal-500/12 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hairline-grid opacity-30 mask-fade-b"
          />

          <Reveal className="relative mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>

            <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-fog-50 sm:text-4xl lg:text-[2.875rem]">
              {title}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fog-400 sm:text-[1.0625rem]">
              {description}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/contact" size="lg" className="w-full sm:w-auto">
                Start a Project
                <Icon name="ArrowRight" className="size-4" strokeWidth={2} />
              </Button>
              <Button
                to="/team"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Talk to Our Team
              </Button>
            </div>

            <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.14em] text-fog-600 uppercase">
              {site.brandPhrase}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default CTABand
