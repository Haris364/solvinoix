import { useLocation, Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/IconBox'
import { navLinks } from '../data/site'

/** 404. Offers the main routes so a mistyped URL is a dead end for nobody. */
export function NotFound() {
  const location = useLocation()

  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline-grid mask-fade-b absolute inset-0 opacity-50" />
        <div className="absolute top-0 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-500/10 blur-[130px]" />
      </div>

      <div className="container-page py-20">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-signal-400 uppercase">
          Error 404
        </p>

        <h1 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.1] text-fog-50 sm:text-4xl lg:text-5xl">
          This page does not exist.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-fog-400">
          The address you followed is not part of the site. Nothing is broken on your side — try
          one of the routes below.
        </p>

        <p className="mt-6 font-mono text-xs break-all text-fog-600">{location.pathname}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button to="/" size="lg" className="w-full sm:w-auto">
            Back to Home
            <Icon name="ArrowRight" className="size-4" strokeWidth={2} />
          </Button>
          <Button to="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
            Contact Us
          </Button>
        </div>

        <nav aria-label="Suggested pages" className="mt-14 border-t border-line-soft pt-7">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600 uppercase">
            Suggested pages
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {navLinks
              .filter((link) => link.to !== '/')
              .map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-fog-300 transition-colors hover:text-signal-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default NotFound
