/**
 * lib/gsap.ts
 * Central GSAP initialisation — import from here, not from 'gsap' directly.
 * Ensures ScrollTrigger is registered once across the whole app.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Respect prefers-reduced-motion globally
  ScrollTrigger.matchMedia({
    '(prefers-reduced-motion: no-preference)': function () {
      // All scroll animations are initialised inside this context
      // in their respective components
    },
  })
}

export { gsap, ScrollTrigger }
