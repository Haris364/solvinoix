import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import { Icon } from './ui/IconBox'
import { HeroNetwork } from './visuals/HeroNetwork'
import { useReducedMotion } from '../lib/useReducedMotion'
import { site, capabilities } from '../data/site'

const EASE = [0.16, 1, 0.3, 1]

/** Splits the headline so each line can rise into place on load. */
const HEADLINE = ['Turning Business', 'Problems Into', 'Technology Solutions.']

function HeroLine({ children, delay, reduceMotion }) {
  if (reduceMotion) {
    return <span className="block">{children}</span>
  }

  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  const fade = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        }

  return (
    <section className="relative isolate overflow-hidden">
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline-grid mask-fade-b absolute inset-0 opacity-60" />
        <div className="absolute -top-48 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-signal-500/12 blur-[150px]" />
        <div className="absolute top-40 -right-40 size-[30rem] rounded-full bg-signal-600/8 blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-page pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.div {...fade(0.05)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-900/70 px-3.5 py-1.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-signal-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-signal-400" />
                </span>
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-fog-300 uppercase">
                  {site.positioning}
                </span>
              </span>
            </motion.div>

            <h1 className="mt-7 text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] text-fog-50 sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]">
              {HEADLINE.map((line, index) => (
                <HeroLine key={line} delay={0.12 + index * 0.09} reduceMotion={reduceMotion}>
                  {index === 2 ? <span className="text-gradient">{line}</span> : line}
                </HeroLine>
              ))}
            </h1>

            <motion.p
              {...fade(0.42)}
              className="mt-7 max-w-xl text-base leading-relaxed text-fog-400 sm:text-lg"
            >
              {site.description}
            </motion.p>

            <motion.div {...fade(0.52)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="lg" className="w-full sm:w-auto">
                Start a Project
                <Icon name="ArrowRight" className="size-4" strokeWidth={2} />
              </Button>
              <Button to="/team" variant="secondary" size="lg" className="w-full sm:w-auto">
                Meet Our Team
              </Button>
            </motion.div>

            <motion.ul
              {...fade(0.62)}
              className="mt-12 flex flex-wrap gap-x-2 gap-y-2.5 border-t border-line-soft pt-7"
            >
              {capabilities.map((capability) => (
                <li
                  key={capability}
                  className="font-mono text-[0.6875rem] tracking-[0.06em] text-fog-600 uppercase"
                >
                  {capability}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visualisation */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <HeroNetwork className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
