import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { PageTransition } from './components/ui/PageTransition'
import { Home } from './routes/Home'

// Home ships in the main bundle; every other route is loaded on demand.
const About = lazy(() => import('./routes/About').then((m) => ({ default: m.About })))
const Services = lazy(() => import('./routes/Services').then((m) => ({ default: m.Services })))
const ServicesAI = lazy(() =>
  import('./routes/ServicesAI').then((m) => ({ default: m.ServicesAI })),
)
const ServicesAutomation = lazy(() =>
  import('./routes/ServicesAutomation').then((m) => ({ default: m.ServicesAutomation })),
)
const Team = lazy(() => import('./routes/Team').then((m) => ({ default: m.Team })))
const Projects = lazy(() => import('./routes/Projects').then((m) => ({ default: m.Projects })))
const Process = lazy(() => import('./routes/Process').then((m) => ({ default: m.Process })))
const Contact = lazy(() => import('./routes/Contact').then((m) => ({ default: m.Contact })))
const LegalPage = lazy(() => import('./routes/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFound = lazy(() => import('./routes/NotFound').then((m) => ({ default: m.NotFound })))

/** Keeps chunk navigation from flashing an empty page. */
function RouteFallback() {
  return (
    <div
      className="flex min-h-[70dvh] items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <span aria-hidden="true" className="flex items-center gap-2">
        <span className="size-1.5 animate-pulse rounded-full bg-signal-400" />
        <span className="size-1.5 animate-pulse rounded-full bg-signal-400 [animation-delay:150ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-signal-400 [animation-delay:300ms]" />
      </span>
    </div>
  )
}

export function App() {
  const location = useLocation()

  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/services"
              element={
                <PageTransition>
                  <Services />
                </PageTransition>
              }
            />
            <Route
              path="/services/ai"
              element={
                <PageTransition>
                  <ServicesAI />
                </PageTransition>
              }
            />
            <Route
              path="/services/automation"
              element={
                <PageTransition>
                  <ServicesAutomation />
                </PageTransition>
              }
            />
            <Route
              path="/team"
              element={
                <PageTransition>
                  <Team />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              }
            />
            <Route
              path="/process"
              element={
                <PageTransition>
                  <Process />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/privacy"
              element={
                <PageTransition>
                  <LegalPage kind="privacy" />
                </PageTransition>
              }
            />
            <Route
              path="/terms"
              element={
                <PageTransition>
                  <LegalPage kind="terms" />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}

export default App
