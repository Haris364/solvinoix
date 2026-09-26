import { Link } from 'react-router-dom'
import { Icon } from '../ui/IconBox'
import { Logo } from './Logo'
import { footerColumns, site, socialLinks } from '../../data/site'
import { cn } from '../../lib/cn'

/**
 * Site footer. Social channels with no confirmed URL render as muted,
 * non-interactive labels rather than dead links.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo showTagline />
            <p className="mt-6 font-mono text-[0.6875rem] leading-relaxed tracking-[0.1em] text-fog-500 uppercase">
              {site.disciplineLine}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-fog-500">
              {site.description}
            </p>

            <div className="mt-7 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const iconBox = (
                  <>
                    <Icon name={social.icon} className="size-4" strokeWidth={1.75} />
                    <span className="sr-only">
                      {social.href ? `${social.label} — opens in a new tab` : social.label}
                    </span>
                  </>
                )

                const shared = cn(
                  'flex size-10 items-center justify-center rounded-lg border border-line text-fog-400 transition-colors',
                  social.href && 'hover:border-signal-400/50 hover:text-signal-300',
                  !social.href && 'cursor-not-allowed text-fog-600 opacity-60',
                )

                return social.href ? (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={shared}
                    title={social.label}
                  >
                    {iconBox}
                  </a>
                ) : (
                  <span
                    key={social.id}
                    className={shared}
                    title={`${social.label} — link to be confirmed`}
                    aria-label={`${social.label} — link to be confirmed`}
                  >
                    {iconBox}
                  </span>
                )
              })}
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600 uppercase">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-fog-400 transition-colors hover:text-signal-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-start gap-5 border-t border-line-soft pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fog-600">
            &copy; {year} {site.wordmark}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs text-fog-500 transition-colors hover:text-signal-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-fog-500 transition-colors hover:text-signal-300"
            >
              Terms
            </Link>
            <Link
              to="/contact"
              className="text-xs text-signal-400 transition-colors hover:text-signal-300"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
