import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import { DataTransferVisual } from './visuals/network/DataTransferVisual'
import { useReducedMotion } from '../lib/useReducedMotion'
import { hero } from '../data/content'
import { solutions } from '../data/solutions'

const EASE = [0.16, 1, 0.3, 1]

/** Splits the headline so each line can rise into place on load. */
const HEADLINE = hero.headline

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
    <section id="top" className="relative isolate overflow-hidden">
      {/* Backdrop
          The two washes are kept faint on purpose. The visual beside this carries its
          own halo, so at the strength they were previously running the two stacked
          and the whole right half of the hero read as a glow rather than as a
          drawing — which is the exact failure this composition is trying to avoid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline-grid mask-fade-b-scene absolute inset-0 opacity-60" />
        <div className="absolute -top-56 left-1/3 size-[38rem] -translate-x-1/2 rounded-full bg-signal-500/6 blur-[150px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      {/*
        Padding and tracking are tightened as the column narrows.

        The hero is meant to be one screen, and the left column is the taller of the
        two at every desktop size — not the visual. A 42% column holding a 68px
        headline wraps to six lines, and by 1024 that column alone is taller than the
        viewport, which pushes the whole section past the fold. So the vertical rhythm
        compresses with the measure: the space above the copy goes first, because it
        is the part that is not content.
      */}
      <div className="container-hero hero-shell flex flex-col justify-center pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-14 lg:pb-16 xl:pt-20 xl:pb-24">
        {/*
          Two columns from `lg`. The split is 42/58 rather than 50/50 because the
          network is the argument and the copy is the annotation — but the copy keeps
          its own max-width, so giving the visual more of the grid does not stretch
          the measure. Below `lg` it stacks, and the order is copy, then call to
          action, then visual, which is the same order the DOM is in.
        */}
        <div className="grid items-center gap-10 lg:grid-cols-[42fr_58fr] lg:gap-6 xl:gap-12">
          {/* Copy
              No wordmark here. The company name is the identity of the visual on the
              right, where it is the largest and most prominent thing on the screen,
              and printing it a second time above the headline would put the brand in
              the position the brief ranks last. The eyebrow carries the positioning
              line instead, which is what it was already doing. */}
          <div className="max-w-2xl">
            <motion.div {...fade(0.05)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-900/70 px-3.5 py-1.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-signal-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-signal-400" />
                </span>
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-fog-300 uppercase">
                  {hero.positioning}
                </span>
              </span>
            </motion.div>

            {/* The headline steps up with the measure rather than at a fixed
                breakpoint: at 1024 the column is around 370px wide, and a 60px
                headline there is six lines of nothing but size. */}
            <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] text-fog-50 sm:text-[3.25rem] lg:text-[2.9rem] lg:leading-[1.06] xl:text-[3.5rem] xl:leading-[1.04] 2xl:text-[4rem]">
              {HEADLINE.map((line, index) => (
                <HeroLine key={line} delay={0.12 + index * 0.09} reduceMotion={reduceMotion}>
                  {index === 2 ? <span className="text-gradient">{line}</span> : line}
                </HeroLine>
              ))}
            </h1>

            <motion.p
              {...fade(0.42)}
              className="mt-5 max-w-xl text-base leading-relaxed text-fog-400 sm:text-lg"
            >
              {hero.description}
            </motion.p>

            {/* The one primary "Start a Project" CTA lives in the floating
                action bar, so the hero keeps only a secondary way through to
                the team. The team is a real page now, so this is a route rather
                than the section anchor the single-page version used. Nothing
                else about the hero is changed. */}
            <motion.div {...fade(0.52)} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                to="/team"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Meet Our Team
              </Button>
            </motion.div>

            <motion.ul
              {...fade(0.62)}
              className="mt-8 flex flex-wrap gap-x-2 gap-y-2 border-t border-line-soft pt-5 lg:mt-6"
            >
              {hero.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="font-mono text-[0.6875rem] tracking-[0.06em] text-fog-600 uppercase"
                >
                  {capability}
                </li>
              ))}
            </motion.ul>
          </div>

          {/*
            The visualisation.

            No wrapper sizing and no entrance transform here on purpose. The visual
            owns its own aspect ratio, because the drawing, the five labels and the
            name are all positioned as percentages of one frame — hand it a second
            aspect ratio from this side and those three drift apart from the geometry
            they are anchored to. Its reveal is CSS, sequenced inside the component.

            Its width is also capped against viewport height rather than given a
            fixed height, so a tall composition can never push the fold down on a
            short screen.
          */}
          <div className="relative w-full">
            <DataTransferVisual />
          </div>
        </div>

        {/*
          The services, as a real list.

          The five labels inside the visual are real text and fully readable, but
          they are a drawing: they are positioned absolutely, they arrive on a delay,
          and they carry a number rather than a description. Reading the same five
          names twice is worse than either extreme, so the label layer is hidden from
          the tree and this is the accessible version — the same five records, in the
          same order, each with its summary, always present and never animated.

          Visually hidden rather than removed, because the summaries are genuinely
          useful and hiding them from the sighted keyboard user would only be
          pretending the problem did not exist.
        */}
        <h2 className="sr-only">Services</h2>
        <ol className="sr-only">
          {solutions.map((solution) => (
            <li key={solution.id}>
              {solution.title} — {solution.summary}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Hero
