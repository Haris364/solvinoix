import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon, IconBox } from '../ui/IconBox'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { cn } from '../../lib/cn'

const EASE = [0.16, 1, 0.3, 1]

const VISIBLE_CAPABILITIES = 3

/**
 * A single practice area. The first three capabilities stay visible; the rest
 * reveal in place so the grid does not turn into a wall of bullet points.
 */
export function ServiceCard({ service }) {
  const [expanded, setExpanded] = useState(false)
  const reduceMotion = useReducedMotion()
  const panelId = useId()

  const { id, title, icon, summary, capabilities = [], page } = service
  const primary = capabilities.slice(0, VISIBLE_CAPABILITIES)
  const rest = capabilities.slice(VISIBLE_CAPABILITIES)
  const expandable = rest.length > 0

  // Deep link: a dedicated page when one exists, otherwise an anchor on /services.
  const linkTo = page ?? `/services#${id}`

  return (
    <article
      id={id}
      className={cn(
        'group surface-card relative flex scroll-mt-24 flex-col p-6 transition-colors duration-300 sm:p-7',
        'hover:border-signal-400/35',
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-400 via-signal-400/40 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <IconBox icon={icon} size="md" />
        {page ? (
          <span className="rounded-md border border-signal-400/25 bg-signal-400/8 px-2 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-signal-300 uppercase">
            Dedicated page
          </span>
        ) : null}
      </div>

      <h3 className="mt-6 text-lg font-semibold text-fog-50">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-fog-400">{summary}</p>

      <ul className="mt-6 space-y-2.5">
        {primary.map((capability) => (
          <li key={capability} className="flex gap-2.5 text-sm text-fog-300">
            <Icon
              name="CircleCheck"
              className="mt-0.5 size-4 shrink-0 text-signal-400/80"
              strokeWidth={1.75}
            />
            {capability}
          </li>
        ))}

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.li
              key="extra"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="overflow-hidden"
            >
              <ul className="space-y-2.5 pt-1">
                {rest.map((capability) => (
                  <li key={capability} className="flex gap-2.5 text-sm text-fog-300">
                    <Icon
                      name="CircleCheck"
                      className="mt-0.5 size-4 shrink-0 text-signal-400/80"
                      strokeWidth={1.75}
                    />
                    {capability}
                  </li>
                ))}
              </ul>
            </motion.li>
          ) : null}
        </AnimatePresence>
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-7">
        <Link
          to={linkTo}
          className="group/link inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-300 transition-colors hover:text-signal-200"
        >
          Explore {title}
          <Icon
            name="ArrowUpRight"
            className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            strokeWidth={2}
          />
        </Link>

        {expandable ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="inline-flex items-center gap-1.5 text-[0.8125rem] text-fog-500 transition-colors hover:text-fog-200"
          >
            {expanded ? 'Show less' : `+${rest.length} more`}
            <Icon
              name="ChevronDown"
              className={cn(
                'size-3.5 transition-transform duration-200',
                expanded && 'rotate-180',
              )}
              strokeWidth={2}
            />
          </button>
        ) : null}
      </div>

      {expandable ? <span id={panelId} className="sr-only" aria-live="polite" /> : null}
    </article>
  )
}

export default ServiceCard
