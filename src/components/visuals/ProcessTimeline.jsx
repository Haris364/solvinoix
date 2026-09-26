import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { cn } from '../../lib/cn'
import { processSteps } from '../../data/process'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Seven-step delivery timeline.
 *
 * From md up the steps sit on a central spine with alternating alignment; on
 * smaller screens they collapse to a single left-hand spine. The accent line
 * fills in step with scroll position.
 */
export function ProcessTimeline({ className }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.6'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 })
  const scaleY = useTransform(progress, [0, 1], [0, 1])

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Spine — centre from md, left on mobile */}
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[1.4375rem] w-px bg-line md:left-1/2 md:-translate-x-1/2"
      >
        <motion.div
          className="absolute inset-0 origin-top bg-gradient-to-b from-signal-300 via-signal-500 to-signal-500/25"
          style={{ scaleY: reduceMotion ? 1 : scaleY }}
        />
      </div>

      <ol className="relative">
        {processSteps.map((step, index) => {
          const isRight = index % 2 === 1

          return (
            <li
              key={step.id}
              className={cn(
                'relative pb-12 pl-16 last:pb-0',
                'md:grid md:grid-cols-2 md:items-start md:gap-14 md:pb-16 md:pl-0',
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-72px' }}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.04, ease: EASE }}
                className={cn(
                  isRight
                    ? 'md:col-start-2 md:pl-14 md:text-left'
                    : 'md:col-start-1 md:pr-14 md:text-right',
                )}
              >
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-signal-400">
                  {step.number}
                </p>
                <h3 className="mt-2.5 text-xl font-semibold text-fog-50 sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] font-medium text-fog-200">{step.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-fog-400 sm:text-[0.9375rem]">
                  {step.description}
                </p>
              </motion.div>

              {/* Marker */}
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-72px' }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
                className={cn(
                  'absolute top-0.5 left-[1.0625rem] z-10 flex size-8 items-center justify-center rounded-full border border-line bg-ink-900 md:left-1/2 md:top-1 md:-translate-x-1/2',
                  'after:absolute after:inset-0 after:rounded-full after:border after:border-signal-400/0',
                )}
              >
                <span className="size-1.5 rounded-full bg-signal-400" />
              </motion.span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default ProcessTimeline
