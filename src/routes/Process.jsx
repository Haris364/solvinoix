import { PageBackdrop } from '../components/ui/PageBackdrop'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProcessTimeline } from '../components/visuals/ProcessTimeline'
import { CTABand } from '../components/sections/CTABand'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/IconBox'

export function Process() {
  return (
    <>
      <PageBackdrop>
        <div className="max-w-3xl">
          <Eyebrow>Our Process</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-fog-50 sm:text-5xl lg:text-6xl">
            From Problem <span className="text-gradient">To Solution</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            Seven steps, in this order, every time. The sequence matters because most failed
            projects fail in the two steps that were skipped.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" size="lg" className="w-full sm:w-auto">
              Start a Project
              <Icon name="ArrowRight" className="size-4" strokeWidth={2} />
            </Button>
            <Button to="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
              What We Build
            </Button>
          </div>
        </div>
      </PageBackdrop>

      <Section>
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="The Seven Steps"
            title="A process you can hold us to"
            description="Each step has a defined output, so you always know what is being decided and when."
          />

          <ProcessTimeline className="mx-auto mt-20 max-w-5xl" />
        </div>
      </Section>

      <CTABand
        title="Ready for the first step?"
        description="Discovery starts with a conversation about your business. No commitment, no sales script."
      />
    </>
  )
}

export default Process
