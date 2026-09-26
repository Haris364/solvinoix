import { cn } from '../../lib/cn'

/**
 * Consistent section header: mono eyebrow, display heading, supporting copy.
 * `align` controls whether the block is centred (used on inner pages) or left
 * aligned against the page gutter (used on the home page).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
  children,
  as: Heading = 'h2',
}) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        centered ? 'mx-auto max-w-2xl items-center text-center' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

      <Heading
        className={cn(
          'text-balance text-3xl font-semibold leading-[1.08] text-fog-50 sm:text-4xl lg:text-[2.875rem]',
          titleClassName,
        )}
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={cn(
            'text-base leading-relaxed text-fog-400 sm:text-[1.0625rem]',
            centered && 'max-w-xl',
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </div>
  )
}

export default SectionHeading
