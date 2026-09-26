import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { Icon } from '../ui/IconBox'
import { cn } from '../../lib/cn'
import { aiFlow } from '../../data/services'

const EASE = [0.16, 1, 0.3, 1]

const ICONS = ['MessageSquare', 'BrainCircuit', 'Database', 'Zap']

/**
 * User message → AI reasoning → business system → automated action.
 *
 * The connector fills progressively as the section scrolls, and a signal
 * packet runs the full path to show the handoff between each system.
 * Below md the four stages stack vertically.
 */
export function AIFlow({ className }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.25 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="absolute inset-0 -z-10 rounded-xl border border-line bg-ink-900/50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-xl bg-[radial-gradient(60%_80%_at_50%_0%,rgba(56,189,248,0.09),transparent_70%)]"
      />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <p className="eyebrow mb-8 text-center">How the handoff works</p>

        <ol className="relative flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
          {/* Track: vertical on mobile, horizontal from md up */}
          <div
            aria-hidden="true"
            className="absolute left-[1.1875rem] top-4 bottom-4 w-px bg-line md:left-10 md:right-10 md:top-[1.1875rem] md:bottom-auto md:h-px md:w-auto"
          >
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-signal-400 to-signal-500/30 md:origin-left md:bg-gradient-to-r"
              style={{ scaleY: reduceMotion ? 1 : lineScale, scaleX: reduceMotion ? 1 : lineScale }}
            />
          </div>

          {aiFlow.map((stage, index) => (
            <li key={stage.id} className="relative flex-1 md:pr-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-48px' }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.12, ease: EASE }}
                className="flex gap-4 md:block"
              >
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-lg border border-signal-400/30 bg-ink-850 md:mb-5">
                  <Icon name={ICONS[index]} className="size-4 text-signal-300" strokeWidth={1.75} />
                </div>

                <div className="md:text-center md:px-1">
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fog-600 uppercase">
                    0{index + 1}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] font-medium text-fog-50">{stage.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fog-500">{stage.caption}</p>
                </div>
              </motion.div>
            </li>
          ))}
        </ol>

        {/* Travelling signal, desktop only */}
        {inView && !reduceMotion ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-[1.1875rem] hidden h-px md:block"
          >
            <motion.div
              className="absolute -top-1 size-2 rounded-full bg-signal-300 shadow-[0_0_12px_2px_rgba(56,189,248,0.5)]"
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AIFlow
