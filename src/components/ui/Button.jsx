import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-signal-400 text-ink-950 hover:bg-signal-300 active:bg-signal-500 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_12px_30px_-12px_rgba(56,189,248,0.55)]',
  secondary:
    'border border-line bg-ink-800/60 text-fog-50 hover:border-fog-600 hover:bg-ink-700/70',
  ghost: 'text-fog-200 hover:text-fog-50 hover:bg-ink-800/70 border border-transparent',
  outlineSignal:
    'border border-signal-400/40 text-signal-300 hover:border-signal-400 hover:bg-signal-400/10',
}

const sizes = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-7 text-[0.9375rem]',
}

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 rounded-lg font-medium tracking-tight transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45'

/**
 * One button component that renders an <a>, a react-router <Link> or a
 * <button>, depending on the props it is given.
 */
export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className,
    to,
    href,
    type = 'button',
    ...props
  },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type={type} className={classes} {...props}>
      {children}
    </button>
  )
})

export default Button
