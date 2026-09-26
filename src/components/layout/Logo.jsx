import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { site } from '../../data/site'

/**
 * SOLVIONIX wordmark. The mark is a generated glyph rather than a bitmap so it
 * stays crisp at any size and cannot fail to load.
 */
export function Logo({ className, showTagline = false }) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label={`${site.name} — home`}
    >
      <span
        aria-hidden="true"
        className="relative flex size-9 items-center justify-center rounded-lg border border-line bg-ink-850 transition-colors duration-200 group-hover:border-signal-400/50"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
          <path
            d="M5 6.5 10 12l-5 5.5"
            stroke="#38bdf8"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16.5" cy="8" r="2" fill="#7dd3fc" />
          <circle cx="17.5" cy="16" r="2.5" fill="#38bdf8" fillOpacity="0.55" />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-[0.9375rem] font-semibold tracking-[0.14em] text-fog-50">
          {site.wordmark}
        </span>
        {showTagline ? (
          <span className="mt-1 font-mono text-[0.625rem] tracking-[0.1em] text-fog-600">
            {site.concept}
          </span>
        ) : null}
      </span>
    </Link>
  )
}

export default Logo
