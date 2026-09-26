import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { cn } from '../../lib/cn'
import { growthStages } from '../../data/process'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Company trajectory: Solo Founder → First Clients → Repeat Business →
 * Small Team → Software House. A horizontal rail from md up, a single column
 * below it.
 */
export function GrowthTimeline({ className }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2 })

  return (
    <div ref={ref} className={cn('relative', className)}>
      <ol className="relative grid gap-8 md:grid-cols-5 md:gap-5">
        {/* Connector rail */}
        <div
          aria-hidden="true"
          className="absolute top-[1.0625rem] right-0 left-0 hidden h-px bg-line md:block"
        >
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-signal-400/70 via-signal-500/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={inView || reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.1, delay: reduceMotion ? 0 : 0.15, ease: EASE }}
          />
        </div>

        {growthStages.map((stage, index) => (
          <li key={stage.id} className="relative md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-56px' }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1, ease: EASE }}
              className="flex gap-4 md:block"
            >
              <div className="relative flex size-9 shrink-0 items-center justify-center md:mb-5">
                <span
                  className={cn(
                    'size-2.5 rounded-full ring-4 ring-ink-950',
                    index === growthStages.length - 1
                      ? 'bg-signal-400 shadow-[0_0_14px_2px_rgba(56,189,248,0.4)]'
                      : 'bg-signal-400/45',
                  )}
                />
              </div>

              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fog-600 uppercase">
                  Stage {String(index + 1).padStart(2, '0')}
                </p>
                <p
                  className={cn(
                    'mt-1.5 text-base font-medium',
                    index === growthStages.length - 1 ? 'text-signal-300' : 'text-fog-50',
                  )}
                >
                  {stage.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fog-400">{stage.description}</p>
              </div>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default GrowthTimeline
