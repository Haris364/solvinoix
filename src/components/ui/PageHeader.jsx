import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

/**
 * The heading at the top of every inner page. Deliberately quieter than the
 * home hero: this is an introduction, not a first impression, so it is a
 * single column of text with a hairline underneath.
 *
 * Every page uses the same component, which is what keeps the secondary pages
 * looking like one site.
 */
export function PageHeader({ title, description, children, className }) {
  return (
    <div className={cn('border-b border-line-soft bg-ink-950', className)}>
      <div className="container-page pt-16 pb-12 sm:pt-20 sm:pb-14">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-fog-50 sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {description ? (
            <p className="font-semibold mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-fog-300 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </Reveal>
      </div>
    </div>
  )
}

export default PageHeader
