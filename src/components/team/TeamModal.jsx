import { useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MonogramAvatar } from '../ui/MonogramAvatar'
import { Icon } from '../ui/IconBox'
import { useScrollLock } from '../../lib/useScrollLock'
import { useFocusTrap } from '../../lib/useFocusTrap'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { site } from '../../data/site'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Full team member profile.
 *
 * Accessibility: rendered as a labelled modal dialog, scroll is locked behind
 * it, Tab focus is trapped, Escape and backdrop clicks close it, and focus is
 * returned to the originating card on close. On small screens it presents as a
 * bottom sheet with its own internal scrolling.
 */
export function TeamModal({ member, onClose }) {
  const panelRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const open = Boolean(member)

  useScrollLock(open)
  useFocusTrap(panelRef, open, onClose)

  const handleBackdrop = useCallback(
    (event) => {
      if (event.target === event.currentTarget) onClose()
    },
    [onClose],
  )

  return (
    <AnimatePresence>
      {member ? (
        <div
          className="fixed inset-0 z-100 flex items-end justify-center sm:items-center sm:p-6"
          onMouseDown={handleBackdrop}
        >
          <motion.div
            className="absolute inset-0 bg-ink-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.99 }}
            transition={{ duration: 0.26, ease: EASE }}
            className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-line bg-ink-900/95 backdrop-blur-xl sm:max-h-[88dvh] sm:rounded-2xl"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-400/50 to-transparent"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close profile"
              data-autofocus
              className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-lg border border-line bg-ink-950/70 text-fog-300 transition-colors hover:border-fog-600 hover:text-fog-50"
            >
              <Icon name="X" className="size-4" strokeWidth={2} />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="relative h-40 shrink-0 border-b border-line sm:h-48">
                <MonogramAvatar
                  name={member.name}
                  initials={member.initials}
                  image={member.image}
                  rounded="rounded-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent"
                />
              </div>

              <div className="p-6 sm:p-8">
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-signal-300 uppercase">
                  {member.role}
                </p>
                <h2
                  id="team-modal-title"
                  className="mt-2.5 text-2xl font-semibold text-fog-50 sm:text-3xl"
                >
                  {member.name}
                </h2>

                {member.location ? (
                  <p className="mt-2.5 flex items-center gap-1.5 text-sm text-fog-500">
                    <Icon name="MapPin" className="size-3.5" strokeWidth={1.75} />
                    {member.location}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-ink-800 px-3.5 text-[0.8125rem] font-medium text-fog-50 transition-colors hover:border-signal-400/50 hover:text-signal-300"
                    >
                      <Icon name="Linkedin" className="size-3.5" strokeWidth={1.75} />
                      LinkedIn
                    </a>
                  ) : null}

                  {member.github ? (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-ink-800 px-3.5 text-[0.8125rem] font-medium text-fog-50 transition-colors hover:border-signal-400/50 hover:text-signal-300"
                    >
                      <Icon name="Github" className="size-3.5" strokeWidth={1.75} />
                      GitHub
                    </a>
                  ) : null}

                  <Link
                    to={`/contact?member=${member.id}`}
                    onClick={onClose}
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-signal-400 px-3.5 text-[0.8125rem] font-medium text-ink-950 transition-colors hover:bg-signal-300"
                  >
                    Start a Project
                    <Icon name="ArrowRight" className="size-3.5" strokeWidth={2} />
                  </Link>
                </div>

                <div className="mt-8 space-y-8">
                  <section>
                    <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600 uppercase">
                      About
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-fog-300">
                      {member.bio}
                    </p>
                  </section>

                  {member.responsibilities?.length ? (
                    <section>
                      <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600 uppercase">
                        Responsibilities
                      </h3>
                      <ul className="mt-3 space-y-2.5">
                        {member.responsibilities.map((item) => (
                          <li key={item} className="flex gap-3 text-[0.9375rem] text-fog-300">
                            <Icon
                              name="CircleCheck"
                              className="mt-0.5 size-4 shrink-0 text-signal-400"
                              strokeWidth={1.75}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {member.skills?.length ? (
                    <section>
                      <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600 uppercase">
                        Core Skills
                      </h3>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-md border border-signal-400/20 bg-signal-400/8 px-2.5 py-1 text-xs text-signal-200"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {member.technologies?.length ? (
                    <section>
                      <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600 uppercase">
                        Technologies
                      </h3>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {member.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-line bg-ink-850 px-2.5 py-1 text-xs text-fog-300"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-line bg-ink-950/60 px-6 py-4 sm:px-8">
              <p className="text-center text-xs text-fog-600">
                Working with {site.name}?{' '}
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="text-signal-400 transition-colors hover:text-signal-300"
                >
                  Start a project enquiry
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}

export default TeamModal
