/**
 * lib/gsap.ts
 * Central GSAP initialisation — import from here, not from 'gsap' directly.
 * Ensures ScrollTrigger is registered once across the whole app.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Ensure markers and triggers are correct after everything mounts
  ScrollTrigger.refresh()

  // Optional: Reset scroll position on page refresh for cleaner entry
  window.scrollTo(0, 0)

  // Respect prefers-reduced-motion globally
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  })

  ScrollTrigger.matchMedia({
    '(prefers-reduced-motion: no-preference)': function () {
      // All scroll animations are initialised inside this context
      // in their respective components
    },
  })
}

export { gsap, ScrollTrigger }
