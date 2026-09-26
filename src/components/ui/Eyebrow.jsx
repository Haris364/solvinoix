import { cn } from '../../lib/cn'

/** Small labelled rule used above section headings and page titles. */
export function Eyebrow({ children, className }) {
  return (
    <p className={cn('eyebrow flex items-center gap-2.5', className)}>
      <span aria-hidden="true" className="h-px w-6 bg-signal-400/50" />
      {children}
    </p>
  )
}

export default Eyebrow
