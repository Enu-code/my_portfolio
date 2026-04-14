'use client'

import { motion, AnimatePresence } from 'framer-motion'

/**
 * app/template.tsx
 * Re-mounts on every route change (unlike layout.tsx).
 * This is the correct Next.js App Router pattern for page transitions.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        duration: 0.4,
        ease: [0.215, 0.61, 0.355, 1], // power3.out equivalent
      }}
    >
      {children}
    </motion.div>
  )
}
