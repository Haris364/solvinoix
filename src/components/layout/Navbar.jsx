import { useCallback, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../ui/IconBox'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { navLinks, site } from '../../data/site'
import { cn } from '../../lib/cn'

/**
 * Sticky site header. Transparent over the page backdrop, then gains a
 * backdrop blur and a hairline border once the visitor scrolls.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  // The drawer is derived from the route rather than cleared in an effect, so a
  // navigation (including browser back/forward) dismisses it automatically.
  const [openedAt, setOpenedAt] = useState(null)
  const location = useLocation()

  const menuOpen = openedAt !== null && openedAt === location.pathname

  const closeMenu = useCallback(() => setOpenedAt(null), [])
  const openMenu = useCallback(() => setOpenedAt(location.pathname), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-90 transition-colors duration-300',
          scrolled
            ? 'border-b border-line bg-ink-950/80 backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <nav
          aria-label="Primary"
          className="container-page flex h-16 items-center justify-between gap-6 lg:h-20"
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.to)
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                      active ? 'text-fog-50' : 'text-fog-400 hover:text-fog-50',
                    )}
                  >
                    {link.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-px h-px bg-signal-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button to="/contact" size="sm" className="hidden sm:inline-flex">
              Start a Project
              <Icon name="ArrowRight" className="size-3.5" strokeWidth={2} />
            </Button>

            <button
              type="button"
              onClick={openMenu}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex size-10 items-center justify-center rounded-lg border border-line text-fog-200 transition-colors hover:border-fog-600 hover:text-fog-50 lg:hidden"
            >
              <Icon name="Menu" className="size-4.5" strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />

      {/* Announce the brand once for assistive tech without repeating it visually */}
      <p className="sr-only">{site.positioning}</p>
    </>
  )
}

export default Navbar
