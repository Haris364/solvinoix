import { cn } from '../../lib/cn'

/**
 * A vertical hairline divider used between adjacent stat-like blocks.
 */
export function Divider({ className, orientation = 'vertical' }) {
  if (orientation === 'horizontal') {
    return <hr className={cn('border-line', className)} />
  }

  return (
    <span
      aria-hidden="true"
      className={cn('hidden w-px self-stretch bg-line sm:block', className)}
    />
  )
}

export default Divider
