import { cn } from '../../lib/cn'

/**
 * Full-bleed dark backdrop used at the top of inner pages: hairline grid,
 * a single soft accent bloom, and a fade into the page body.
 */
export function PageBackdrop({ children, className, bloom = true }) {
  return (
    <div className="relative isolate overflow-hidden border-b border-line-soft">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline-grid mask-fade-b absolute inset-0 opacity-[0.55]" />
        {bloom ? (
          <div className="absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-signal-500/10 blur-[140px]" />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>
      <div className={cn('container-page relative py-20 sm:py-24 lg:py-28', className)}>
        {children}
      </div>
    </div>
  )
}

export default PageBackdrop
