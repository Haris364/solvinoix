import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../ui/IconBox'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { useScrollLock } from '../../lib/useScrollLock'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { navLinks, site } from '../../data/site'
import { cn } from '../../lib/cn'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Slide-in navigation for small screens. Traps nothing but closes on Escape
 * and on navigation, and locks the page behind it while open.
 */
export function MobileMenu({ open, onClose }) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  useScrollLock(open)

  useEffect(() => {
    if (!open) return undefined
    closeButtonRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-100 lg:hidden">
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink-950/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            ref={panelRef}
            id="mobile-menu"            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b border-line bg-ink-900/95 backdrop-blur-xl"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: EASE }}
          >
            <div className="container-page flex items-center justify-between py-4">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex size-10 items-center justify-center rounded-lg border border-line text-fog-200 transition-colors hover:border-fog-600 hover:text-fog-50"
              >
                <Icon name="X" className="size-4" strokeWidth={2} />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-page pb-8">
              <ul className="flex flex-col border-t border-line-soft">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to
                  return (
                    <li key={link.to} className="border-b border-line-soft">
                      <Link
                        to={link.to}
                        onClick={onClose}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between py-4 text-lg font-medium transition-colors',
                          isActive ? 'text-signal-300' : 'text-fog-200 hover:text-fog-50',
                        )}
                      >
                        {link.label}
                        {isActive ? (
                          <Icon name="CircleDot" className="size-4" strokeWidth={2} />
                        ) : (
                          <Icon name="ArrowRight" className="size-4 text-fog-600" strokeWidth={1.75} />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-7 flex flex-col gap-3">
                <Button to="/contact" size="lg" onClick={onClose} className="w-full">
                  Start a Project
                </Button>
                <p className="pt-1 text-center font-mono text-[0.6875rem] tracking-[0.1em] text-fog-600 uppercase">
                  {site.positioning}
                </p>
              </div>
            </nav>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}

export default MobileMenu
