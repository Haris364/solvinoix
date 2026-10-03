import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../../data/content'
import { useFocusTrap } from '../../lib/useFocusTrap'
import { useScrollLock } from '../../lib/useScrollLock'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { Icon } from '../ui/Icon'
import { SocialLinks } from '../ui/SocialLinks'

/**
 * Mobile navigation. A single quiet panel: the page links plus the social
 * icons. Escape or a tap outside closes it, and focus is trapped while it is
 * open.
 */
export function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useScrollLock(open)
  useFocusTrap(panelRef, open, onClose)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!panelRef.current?.contains(event.target)) onClose()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 top-full border-b border-line bg-ink-950 px-6 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block border-b border-line-soft py-3.5 font-semibold text-base transition-colors ${
                      isActive ? 'text-accent' : 'text-fog-200 hover:text-fog-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between">
            <SocialLinks tooltip="top" align="center" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="font-semibold flex size-9 items-center justify-center rounded-lg border border-line text-fog-400 transition-colors hover:border-signal-400/50 hover:text-accent"
            >
              <Icon name="X" className="size-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default MobileMenu
