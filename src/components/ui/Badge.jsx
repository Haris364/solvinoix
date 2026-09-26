import { cn } from '../../lib/cn'

const tones = {
  neutral: 'border-line bg-ink-800/70 text-fog-400',
  signal: 'border-signal-400/30 bg-signal-400/10 text-signal-300',
  outline: 'border-line bg-transparent text-fog-500',
}

/**
 * Small monospace label. Used for project disclosure badges, unconfirmed
 * contact states, and inline metadata.
 */
export function Badge({ children, tone = 'neutral', icon: Icon, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[0.6875rem] font-medium tracking-[0.08em] uppercase',
        tones[tone],
        className,
      )}
    >
      {Icon ? <Icon className="size-3" strokeWidth={2} aria-hidden="true" /> : null}
      {children}
    </span>
  )
}

export default Badge
