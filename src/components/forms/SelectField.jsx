import { useId } from 'react'
import { Icon } from '../ui/IconBox'
import { cn } from '../../lib/cn'

/**
 * Select control with the same label, error and aria wiring as Field.
 */
export function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  placeholder = 'Select an option',
}) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.8125rem] font-medium text-fog-200">
        {label}
        {required ? (
          <span className="ml-1 text-signal-400" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'h-11 w-full appearance-none rounded-lg border bg-ink-900/80 pr-10 pl-3.5 text-sm',
            'transition-colors duration-200 focus:outline-none',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-400',
            error ? 'border-red-400/60 text-red-200' : 'border-line text-fog-50 hover:border-fog-600',
            !value && 'text-fog-600',
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-ink-900 text-fog-50">
              {option}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-fog-500"
        >
          <Icon name="ChevronDown" className="size-4" strokeWidth={2} />
        </span>
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default SelectField
