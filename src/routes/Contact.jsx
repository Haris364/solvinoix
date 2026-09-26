import { useState } from 'react'
import { PageBackdrop } from '../components/ui/PageBackdrop'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Icon } from '../components/ui/IconBox'
import { Button } from '../components/ui/Button'
import { Field } from '../components/forms/Field'
import { SelectField } from '../components/forms/SelectField'
import { TextAreaField } from '../components/forms/TextAreaField'
import { FORM_ENDPOINT, budgetRanges, contactChannels, projectTypes, site } from '../data/site'

const EMPTY = {
  name: '',
  company: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.message.trim()) {
    errors.message = 'Please tell us briefly about your project.'
  }

  return errors
}

export function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed | demo
  const [serverMessage, setServerMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear a field's error as soon as it is edited.
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setStatus('idle')
      // Move focus to the first invalid control for keyboard and screen readers.
      const firstInvalid = event.currentTarget.querySelector('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    // No endpoint configured yet: state it plainly rather than pretending to
    // deliver the message somewhere.
    if (!FORM_ENDPOINT) {
      setStatus('demo')
      return
    }

    setStatus('sending')
    setServerMessage('')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      })

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

      setValues(EMPTY)
      setStatus('sent')
    } catch {
      setStatus('failed')
      setServerMessage(
        'Something went wrong while sending your message. Please try again in a moment.',
      )
    }
  }

  const hasErrors = Object.keys(errors).length > 0
  const isSending = status === 'sending'

  return (
    <>
      <PageBackdrop>
        <div className="max-w-3xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-fog-50 sm:text-5xl lg:text-6xl">
            Let&apos;s Solve <span className="text-gradient">Something</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            Tell us what is not working. The more concrete the problem, the more useful our first
            reply will be.
          </p>
        </div>
      </PageBackdrop>

      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                {hasErrors ? (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-400/40 bg-red-500/8 p-4"
                  >
                    <p className="text-sm font-medium text-red-200">
                      Please check the highlighted fields.
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-red-300/90">
                      {Object.entries(errors).map(([field, message]) => (
                        <li key={field}>{message}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {status === 'sent' ? (
                  <div
                    role="status"
                    className="rounded-lg border border-signal-400/40 bg-signal-400/8 p-4"
                  >
                    <p className="flex items-center gap-2 text-sm font-medium text-signal-200">
                      <Icon name="CircleCheck" className="size-4" strokeWidth={1.75} />
                      Message sent. We will reply as soon as we can.
                    </p>
                  </div>
                ) : null}

                {status === 'demo' ? (
                  <div role="status" className="rounded-lg border border-line bg-ink-900 p-4">
                    <p className="text-sm font-medium text-fog-50">
                      Your message is written, but email delivery is not switched on yet.
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fog-400">
                      {site.name} has not published a live enquiry inbox, so this form cannot send
                      anywhere yet. Nothing has been transmitted. Once an endpoint is added, this
                      same form submits straight through — and your text below is unchanged.
                    </p>
                  </div>
                ) : null}

                {status === 'failed' ? (
                  <div role="alert" className="rounded-lg border border-red-400/40 bg-red-500/8 p-4">
                    <p className="text-sm text-red-200">{serverMessage}</p>
                  </div>
                ) : null}

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    name="name"
                    label="Name"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Field
                    name="company"
                    label="Company"
                    autoComplete="organization"
                    placeholder="Company name"
                    value={values.company}
                    onChange={handleChange}
                    error={errors.company}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <Field
                    name="phone"
                    type="tel"
                    label="Phone"
                    autoComplete="tel"
                    placeholder="Include country code"
                    value={values.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <SelectField
                    name="projectType"
                    label="Project Type"
                    placeholder="Select a project type"
                    options={projectTypes}
                    value={values.projectType}
                    onChange={handleChange}
                    error={errors.projectType}
                  />
                  <SelectField
                    name="budget"
                    label="Budget"
                    placeholder="Select a range"
                    options={budgetRanges}
                    value={values.budget}
                    onChange={handleChange}
                    error={errors.budget}
                  />
                </div>

                <TextAreaField
                  name="message"
                  label="Message"
                  required
                  maxLength={1500}
                  rows={6}
                  placeholder="What is the problem, who is affected, and what would a good outcome look like?"
                  hint="A rough description is enough. We will ask the clarifying questions."
                  value={values.message}
                  onChange={handleChange}
                  error={errors.message}
                />

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" size="lg" disabled={isSending}>
                    {isSending ? 'Sending…' : 'Send Enquiry'}
                    <Icon name="Send" className="size-4" strokeWidth={1.75} />
                  </Button>

                  <p className="text-xs leading-relaxed text-fog-600">
                    We use your details only to reply to this enquiry.
                  </p>
                </div>
              </form>
            </div>

            {/* Channels */}
            <aside className="lg:pt-2">
              <SectionHeading
                eyebrow="Direct Channels"
                title="Other ways to reach us"
                as="h2"
              />

              <ul className="mt-8 space-y-3">
                {contactChannels.map((channel) => (
                  <li
                    key={channel.id}
                    className="flex items-center justify-between gap-4 rounded-lg border border-line bg-ink-900/60 px-5 py-4"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-fog-300"
                      >
                        <Icon name={channel.icon} className="size-4" strokeWidth={1.75} />
                      </span>
                      <span className="text-sm font-medium text-fog-100">{channel.label}</span>
                    </span>

                    {channel.href ? (
                      <a
                        href={channel.href}
                        target={channel.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer noopener"
                        className="truncate text-sm text-signal-300 transition-colors hover:text-signal-200"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <span className="shrink-0 text-right font-mono text-[0.625rem] tracking-[0.1em] text-fog-600 uppercase">
                        To be confirmed
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm leading-relaxed text-fog-600">
                Direct contact details are published as soon as they are confirmed. The form above
                is the fastest route to reach us in the meantime.
              </p>

              <div className="mt-8 rounded-xl border border-line bg-ink-900/60 p-6">
                <h3 className="text-sm font-medium text-fog-50">What to include</h3>
                <ul className="mt-4 space-y-2.5">
                  {[
                    'The process that is not working',
                    'How often it happens, and to whom',
                    'Any systems involved today',
                    'What success would look like',
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-fog-400">
                      <Icon
                        name="CircleCheck"
                        className="mt-0.5 size-4 shrink-0 text-signal-400/80"
                        strokeWidth={1.75}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Contact
