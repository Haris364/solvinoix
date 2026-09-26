import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'

/**
 * Persistent chrome for every route: skip link, header, routed content, footer.
 */
export function Layout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col bg-ink-950">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-lg focus:border focus:border-signal-400/50 focus:bg-ink-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-fog-50"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main" className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout
