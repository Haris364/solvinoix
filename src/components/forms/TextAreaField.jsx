import { useId } from 'react'
import { cn } from '../../lib/cn'

/**
 * Multi-line message input. Character count is announced politely rather than
 * interrupting, and the description is wired up for screen readers.
 */
export function TextAreaField({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  rows = 5,
  maxLength,
  hint,
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-fog-200">
          {label}
          {required ? (
            <span className="font-semibold ml-1 text-accent" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        {maxLength ? (
          <span className="font-semibold font-mono text-[0.8125rem] text-fog-600">
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>

      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          'w-full resize-y rounded-lg border bg-ink-900/80 px-3.5 py-3 font-semibold text-[0.9375rem] leading-relaxed text-fog-50',
          'placeholder:text-fog-600 transition-colors duration-200',
          'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-400',
          error ? 'border-red-400/60' : 'border-line hover:border-fog-600',
        )}
      />

      {hint && !error ? (
        <p id={hintId} className="font-semibold text-sm text-fog-600">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="font-semibold text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default TextAreaField
