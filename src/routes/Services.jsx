import { PageBackdrop } from '../components/ui/PageBackdrop'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ServiceCard } from '../components/services/ServiceCard'
import { CTABand } from '../components/sections/CTABand'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/IconBox'
import { services } from '../data/services'

export function Services() {
  return (
    <>
      <PageBackdrop>
        <div className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-fog-50 sm:text-5xl lg:text-6xl">
            What We <span className="text-gradient">Build</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            Technology solutions designed around real business needs. Every engagement starts with
            the same question: what is actually costing you time, money or leads?
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" size="lg" className="w-full sm:w-auto">
              Start a Project
              <Icon name="ArrowRight" className="size-4" strokeWidth={2} />
            </Button>
            <Button to="/process" variant="secondary" size="lg" className="w-full sm:w-auto">
              How We Work
            </Button>
          </div>
        </div>
      </PageBackdrop>

      <Section>
        <div className="container-page">
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.id}>
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CTABand
        title="Not sure which one you need?"
        description="That is the normal starting point. Describe the problem and we will tell you honestly whether a technology solution is the right answer."
      />
    </>
  )
}

export default Services
