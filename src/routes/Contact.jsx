import { ProjectForm } from '../components/contact/ProjectForm'
import { Icon } from '../components/ui/Icon'
import { PageHeader } from '../components/ui/PageHeader'
import { ProseList } from '../components/common/KeyLines'
import { Reveal, Section } from '../components/ui/Reveal'
import { SocialLinks } from '../components/ui/SocialLinks'
import { contactPage } from '../data/content'
import { contact, getWhatsappLink, hasWhatsapp } from '../data/config'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /contact — a project qualification step, not a message box.
 *
 * The form leads, because the form is the point of the page. The sidebar
 * answers the two questions a procurement reader arrives with anyway: is there
 * a person to talk to, and what happens after I send this.
 *
 * A channel with no value in `data/config.js` is not rendered at all, so there
 * are no empty links and no invented contact details.
 */
export function Contact() {
  usePageTitle(contactPage.title, contactPage.lead)

  const channels = [
    hasWhatsapp
      ? {
          key: 'whatsapp',
          label: contactPage.whatsappTitle,
          value: contactPage.whatsappNote,
          icon: 'Whatsapp',
        }
      : null,
    contact.email
      ? {
          key: 'email',
          label: 'Email',
          value: contact.email,
          icon: 'Mail',
          href: `mailto:${contact.email}`,
        }
      : null,
    contact.phone
      ? {
          key: 'phone',
          label: 'Phone',
          value: contact.phone,
          icon: 'Phone',
          href: `tel:${contact.phone}`,
        }
      : null,
  ].filter(Boolean)

  return (
    <>
      <PageHeader title={contactPage.lead} description={contactPage.intro} />

      <Section>
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            {/* The enquiry itself. No card, so it reads as the page rather than
                as a widget dropped into one. */}
            <Reveal>
              <div className="rule-top pt-10">
                <h2 className="font-semibold type-h2 text-fog-50">
                  {contactPage.qualification.title}
                </h2>
                <p className="font-semibold type-body measure mt-4 text-fog-300">
                  {contactPage.qualification.body}
                </p>
              </div>

              <div className="mt-10">
                <ProjectForm />
              </div>
            </Reveal>

            {/* Context: what happens next, and how else to reach us. */}
            <div className="flex flex-col gap-12">
              <Reveal>
                <div>
                  <h2 className="font-semibold type-h3 text-fog-50">{contactPage.response.title}</h2>
                  <ol className="mt-6 space-y-5">
                    {contactPage.response.steps.map((step, index) => (
                      <li key={step.label} className="flex gap-4">
                        <span aria-hidden="true" className="index-mark shrink-0 pt-1">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="type-support font-semibold text-fog-50">{step.label}</p>
                          <p className="font-semibold type-support mt-1 text-fog-400">{step.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              {channels.length > 0 ? (
                <Reveal>
                  <div>
                    <h2 className="font-semibold type-h3 text-fog-50">{contactPage.channelsTitle}</h2>
                    <ul className="mt-5 flex flex-col gap-3">
                      {channels.map((channel) => {
                        const href = channel.href ?? getWhatsappLink()
                        const body = (
                          <>
                            <span className="font-semibold flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-accent">
                              <Icon name={channel.icon} className="size-4" />
                            </span>
                            <span>
                              <span className="block text-[0.9375rem] font-semibold text-fog-50">
                                {channel.label}
                              </span>
                              <span className="font-semibold mt-0.5 block text-[0.9375rem] text-fog-400">
                                {channel.value}
                              </span>
                            </span>
                          </>
                        )

                        return (
                          <li key={channel.key}>
                            {href ? (
                              <a
                                href={href}
                                target={channel.key === 'whatsapp' ? '_blank' : undefined}
                                rel={channel.key === 'whatsapp' ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-3.5 rounded-xl border border-line bg-ink-900/50 p-4 transition-colors duration-200 hover:border-signal-400/40"
                              >
                                {body}
                              </a>
                            ) : (
                              <div className="flex items-center gap-3.5 rounded-xl border border-line bg-ink-900/50 p-4">
                                {body}
                              </div>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              <Reveal>
                <div>
                  <h2 className="font-semibold type-h3 text-fog-50">{contactPage.socialTitle}</h2>
                  <SocialLinks className="mt-4" tooltip="top" align="left" />
                </div>
              </Reveal>

              <Reveal>
                <div className="rule-top pt-8">
                  <h2 className="font-semibold type-h3 text-fog-50">Before you write</h2>
                  <ProseList
                    className="mt-5"
                    items={[
                      'The operational problem is more useful to us than a feature list.',
                      'If you are still deciding whether the project is worth doing, say so — it is a useful answer too.',
                      'If we are not the right team for it, we will say that rather than take the enquiry.',
                    ]}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Contact
