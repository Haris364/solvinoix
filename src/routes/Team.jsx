import { useState } from 'react'
import { TeamCard } from '../components/team/TeamCard'
import { TeamModal } from '../components/team/TeamModal'
import { PageBackdrop } from '../components/ui/PageBackdrop'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/IconBox'
import { teamMembers } from '../data/team'
import { site } from '../data/site'

/**
 * Team page. The grid renders whatever is in src/data/team.js, so adding or
 * removing a member never requires touching this file.
 */
export function Team() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <PageBackdrop>
        <div className="max-w-3xl">
          <Eyebrow>Our Team</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-fog-50 sm:text-5xl lg:text-6xl">
            Meet the Team Behind <span className="text-gradient">Solvionix</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            People, technology and ideas working together to solve real business problems.
          </p>
        </div>
      </PageBackdrop>

      <Section>
        <div className="container-page">
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <RevealItem key={member.id}>
                <TeamCard member={member} onViewProfile={setSelected} />
              </RevealItem>
            ))}
          </RevealGroup>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fog-600">
            Profiles are published as the team grows. Anyone shown here is a real member of
            Solvionix — no placeholder identities are presented as staff.
          </p>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-900/60 p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-signal-500/10 blur-[100px]"
            />

            <div className="relative max-w-2xl">
              <Eyebrow>Work with us</Eyebrow>
              <h2 className="mt-5 text-2xl font-semibold text-fog-50 sm:text-3xl lg:text-4xl">
                Tell us what is not working in your business.
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-fog-400 sm:text-base">
                {site.name} works directly with the people who build the solution. You get a
                clear point of contact, an honest assessment of the problem, and a plan you can
                read before anything is built.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/contact" size="lg">
                  Start a Project
                  <Icon name="ArrowRight" className="size-4" strokeWidth={2} />
                </Button>
                <Button to="/process" variant="secondary" size="lg">
                  How We Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <TeamModal member={selected} onClose={() => setSelected(null)} />
    </>
  )
}

export default Team
