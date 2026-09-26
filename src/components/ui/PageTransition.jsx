import { motion } from 'framer-motion'
import { useReducedMotion } from '../../lib/useReducedMotion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Subtle route transition. Wraps each page so navigation reads as a change of
 * scene rather than a hard cut. Kept short so it never delays the content.
 */
export function PageTransition({ children, className }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
