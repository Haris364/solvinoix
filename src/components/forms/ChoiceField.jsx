import { useId } from 'react'
import { cn } from '../../lib/cn'

/**
 * A radio group presented as a set of selectable rows.
 *
 * Used for the two qualification questions on the contact form. A native select
 * would hide the options behind a click, and the whole point of the first
 * question is that the visitor can see the shape of what they are choosing from
 * — including "Not sure yet", which is the option that makes the group safe to
 * answer honestly.
 *
 * A real <fieldset>/<legend> is used so the group is announced correctly, and
 * the inputs stay keyboard reachable in the natural order.
 */
export function ChoiceField({ name, label, hint, options, value, onChange, error, columns = 1 }) {
  const groupId = useId()
  const errorId = `${groupId}-error`
  const hintId = `${groupId}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ')

  return (
    <fieldset
      className="flex min-w-0 flex-col gap-2"
      aria-describedby={describedBy || undefined}
      aria-invalid={error ? 'true' : undefined}
    >
      <legend className="text-sm font-semibold text-fog-200">
        {label}
        <span className="font-semibold ml-1 text-accent" aria-hidden="true">
          *
        </span>
      </legend>

      {hint ? (
        <p id={hintId} className="font-semibold type-support text-fog-500">
          {hint}
        </p>
      ) : null}

      <div
        className={cn(
          'mt-1 grid gap-2',
          columns === 2 && 'sm:grid-cols-2',
          columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {options.map((option, index) => {
          // Option labels contain spaces and slashes, which an id may not, so the
          // ordinal carries the identity and the label stays readable text.
          const optionId = `${groupId}-${name}-${index}`
          const selected = value === option

          return (
            <label
              key={option}
              htmlFor={optionId}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors duration-200',
                selected
                  ? 'border-signal-400/50 bg-signal-400/[0.07]'
                  : 'border-line bg-ink-900/50 hover:border-fog-600',
                error && !selected && 'border-line',
              )}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option}
                checked={selected}
                onChange={onChange}
                className="size-4 shrink-0 accent-signal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-400"
              />
              <span
                className={cn(
                  'type-support',
                  selected ? 'text-fog-50' : 'text-fog-300',
                )}
              >
                {option}
              </span>
            </label>
          )
        })}
      </div>

      {error ? (
        <p id={errorId} className="font-semibold text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </fieldset>
  )
}

export default ChoiceField
