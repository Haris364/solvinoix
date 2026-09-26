import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { Icon } from '../ui/IconBox'
import { cn } from '../../lib/cn'
import { automationFlow } from '../../data/services'

const EASE = [0.16, 1, 0.3, 1]

const ICONS = [
  'Users',
  'Globe',
  'MessageCircle',
  'Target',
  'Layers',
  'Send',
  'CalendarCheck',
]

/**
 * Visitor → Website → AI Assistant → Lead Qualification → CRM →
 * Automated Follow-up → Appointment.
 *
 * A single spine runs the length of the flow and fills as the visitor scrolls,
 * so the diagram reads as a process in motion rather than a static list.
 */
export function AutomationFlow({ className }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.75'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })
  const fillScale = useTransform(fill, [0, 1], [0, 1])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="absolute inset-0 -z-10 rounded-xl border border-line bg-ink-900/50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-xl bg-[radial-gradient(70%_60%_at_50%_100%,rgba(56,189,248,0.08),transparent_70%)]"
      />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="mb-9 flex items-center justify-between gap-4">
          <p className="eyebrow">Lead flow, end to end</p>
          <span className="hidden font-mono text-[0.6875rem] tracking-[0.12em] text-fog-600 uppercase sm:block">
            7 stages
          </span>
        </div>

        <ol className="relative">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[1.4375rem] w-px bg-line sm:left-[1.9375rem]"
          >
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-signal-300 via-signal-500 to-signal-500/20"
              style={{ scaleY: reduceMotion ? 1 : fillScale }}
            />
          </div>

          {automationFlow.map((step, index) => {
            const isLast = index === automationFlow.length - 1
            return (
              <li key={step.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.06, ease: EASE }}
                  className="flex items-start gap-4 pb-7 last:pb-0 sm:gap-5"
                >
                  <div
                    className={cn(
                      'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border bg-ink-850 sm:size-10',
                      isLast
                        ? 'border-signal-400/60 bg-signal-400/10'
                        : 'border-line',
                    )}
                  >
                    <Icon
                      name={ICONS[index]}
                      className={cn(
                        'size-3.5 sm:size-4',
                        isLast ? 'text-signal-300' : 'text-fog-500',
                      )}
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <p className="flex items-baseline gap-2.5">
                      <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-fog-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.9375rem] font-medium text-fog-50 sm:text-base">
                        {step.label}
                      </span>
                    </p>
                    <p className="mt-1 pl-[2.125rem] text-sm leading-relaxed text-fog-500">
                      {step.caption}
                    </p>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>

      {inView && !reduceMotion ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-10 left-[1.4375rem] w-px sm:left-[1.9375rem]"
        >
          <motion.div
            className="absolute -left-[3px] size-[7px] rounded-full bg-signal-200 shadow-[0_0_10px_2px_rgba(125,211,252,0.55)]"
            initial={{ top: '0%', opacity: 0 }}
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'linear', delay: 0.4 }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default AutomationFlow
