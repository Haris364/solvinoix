import { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../../data/content'
import { cn } from '../../lib/cn'
import { Icon } from '../ui/Icon'
import { SocialLinks } from '../ui/SocialLinks'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

/**
 * Minimal sticky navbar: wordmark on the left, six page links in the middle,
 * social icons on the right. No call-to-action lives here — the only
 * "Start a Project" control on the site is the floating one, and duplicating it
 * here would dilute it.
 *
 * The bar is transparent over the hero on a first load and turns solid as soon
 * as the page scrolls, or whenever the mobile menu is open.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Choosing a link closes the menu — every link in the panel and the wordmark
  // do it on click, so no effect is needed to watch the route.
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        solid ? 'border-line bg-ink-950/85 backdrop-blur-md' : 'border-transparent',
      )}
    >
      <div className="container-page relative flex h-16 items-center justify-between gap-6">
        <Logo onClick={closeMenu} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-md px-2.5 py-2 font-semibold text-[0.9375rem] transition-colors duration-200 xl:px-3',
                      isActive
                        ? 'text-fog-50'
                        : 'hover-surface text-fog-400 hover:text-fog-100',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Six links plus four icons fit at the lg breakpoint, so the social
              row is available on every desktop width rather than hiding until
              xl. The mobile menu carries the same icons below lg. */}
          <SocialLinks className="hidden lg:flex" tooltip="bottom" />

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={cn(
              'flex size-9 items-center justify-center rounded-lg border transition-colors lg:hidden',
              solid
                ? 'border-line text-fog-100'
                : 'border-[var(--overlay-border)] text-[var(--on-hero)]',
              !solid && 'bg-[var(--overlay-surface)]',
            )}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} className="size-4" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  )
}

export default Navbar
