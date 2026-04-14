/**
 * lib/useScrollAnimation.ts
 * Custom hook — attaches a GSAP ScrollTrigger reveal animation to a ref element.
 * Cleans up on unmount to prevent memory leaks.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null)
 *   useScrollAnimation(ref)
 *   return <div ref={ref}>...</div>
 */
'use client'

import { useEffect, RefObject } from 'react'
import { gsap, ScrollTrigger } from './gsap'

interface ScrollAnimationOptions {
  /** Starting Y offset in px — default 50 */
  y?: number
  /** Starting opacity — default 0 */
  opacity?: number
  /** Animation duration in seconds — default 0.7 */
  duration?: number
  /** GSAP ease string — default 'power3.out' */
  ease?: string
  /** ScrollTrigger start value — default 'top 82%' */
  start?: string
  /** Delay before animation starts — default 0 */
  delay?: number
  /** Stagger time string or number — default 0 */
  stagger?: number
}

export function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  options: ScrollAnimationOptions = {}
) {
  const {
    y = 50,
    opacity = 0,
    duration = 0.7,
    ease = 'power3.out',
    start = 'top 82%',
    delay = 0,
    stagger = 0,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      // If stagger is provided, we animate the children instead
      const target = stagger ? Array.from(el.children) : el
      
      gsap.fromTo(
        target,
        { y, opacity, willChange: 'transform' },
        {
          y: 0,
          opacity: 1,
          duration,
          ease,
          delay,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [ref, y, opacity, duration, ease, start, delay, stagger])
}
