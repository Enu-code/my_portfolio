'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * SmoothScroll component powered by Lenis and GSAP Ticker.
 * Provides high-performance interpolation synced with animation frames.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis with editorial-grade lerp
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      lerp: 0.08, // Slightly more weighted for that high-end "heavy" feel
    })

    // 2. Sync ScrollTrigger with Lenis
    // This ensures all scroll-based reveals/parallax stay in sync with momentum
    lenis.on('scroll', ScrollTrigger.update)

    // 3. Connect Lenis to the GSAP Ticker for frame-perfect sync
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)

    // Optional: Reset scroll position on page refresh for cleaner entry
    window.scrollTo(0, 0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
