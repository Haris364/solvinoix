import { useEffect, useRef } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Traps Tab focus inside `containerRef` while `active`, closes on Escape, and
 * restores focus to the previously focused element on close.
 */
export function useFocusTrap(containerRef, active, onClose) {
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!active) return undefined

    previouslyFocused.current = document.activeElement

    const container = containerRef.current
    if (container) {
      const focusables = container.querySelectorAll(FOCUSABLE)
      const first = container.querySelector('[data-autofocus]') || focusables[0]
      first?.focus()
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose?.()
        return
      }

      if (event.key !== 'Tab') return

      const node = containerRef.current
      if (!node) return

      const focusables = Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !node.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      const target = previouslyFocused.current
      if (target && typeof target.focus === 'function') target.focus()
    }
  }, [active, containerRef, onClose])
}

export default useFocusTrap
