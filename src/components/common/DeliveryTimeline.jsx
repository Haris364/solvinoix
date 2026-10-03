import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { cn } from '../../lib/cn'

/**
 * The delivery lifecycle, drawn as a timeline rather than a grid of cards.
 *
 * A sequence should look like a sequence. The vertical rail with stage markers
 * reads as one process running top to bottom, where nine identical boxes would
 * read as nine separate services — which is the opposite of what this data is.
 *
 * Each stage shows its output, because a stage that produces nothing is not a
 * stage a client can verify.
 *
 * `compact` is the Home page variant: the stage names on a single rail, for
 * readers who want the shape of the process and will follow the link onward.
 */
export function DeliveryTimeline({ stages, compact = false, className }) {
  if (!stages?.length) return null

  if (compact) {
    return (
      <RevealGroup className={cn('flex flex-wrap items-center gap-x-2 gap-y-3', className)}>
        {stages.map((stage, index) => (
          <RevealItem key={stage.number} y={8}>
            <div className="flex items-center gap-2">
              <span className="font-semibold index-mark text-fog-600">{stage.number}</span>
              <span className="font-semibold type-support text-fog-300">{stage.short}</span>
              {index < stages.length - 1 ? (
                <span aria-hidden="true" className="ml-2 h-px w-4 bg-line" />
              ) : null}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    )
  }

  return (
    <RevealGroup className={cn('relative', className)}>
      {/* The rail. Positioned against the marker column rather than the text
          column, so it stays aligned at every breakpoint. */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-line sm:left-[0.5625rem]"
      />

      <ol className="space-y-10 lg:space-y-12">
        {stages.map((stage) => (
          <RevealItem key={stage.number} as="li" y={14} className="relative flex gap-4 sm:gap-6">
            <span
              aria-hidden="true"
              className="relative mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-signal-400/45 bg-ink-950 sm:size-5"
            >
              <span className="size-1.5 rounded-full bg-signal-400" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <p className="index-mark">{stage.number}</p>
                <h3 className="font-semibold type-h3 text-fog-50">{stage.title}</h3>
              </div>

              <p className="font-semibold type-body mt-3 max-w-3xl text-fog-300">{stage.body}</p>

              <p className="font-semibold type-support mt-4 border-l-2 border-line pl-4 text-fog-500">
                <span className="font-semibold text-fog-400">Output: </span>
                {stage.output}
              </p>
            </div>
          </RevealItem>
        ))}
      </ol>
    </RevealGroup>
  )
}

export default DeliveryTimeline
