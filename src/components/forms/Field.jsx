import { useId } from 'react'
import { cn } from '../../lib/cn'

/**
 * Text input with label, inline validation state and an accessible error
 * message wired through aria-describedby / aria-invalid.
 */
export function Field({
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  autoComplete,
  hint,
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-fog-200">
        {label}
        {required ? (
          <span className="font-semibold ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          'h-11 w-full rounded-lg border bg-ink-900/80 px-3.5 font-semibold text-[0.9375rem] text-fog-50',
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

export default Field
