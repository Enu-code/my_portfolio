'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import styles from './Counter.module.scss'

interface CounterProps {
  /** The target number to count up to */
  target: number
  /** Suffix to append to the number (e.g. '+') */
  suffix?: string
  /** The text label below the counter */
  label: string
}

/**
 * Counter Component — Animated count-up on scroll.
 * Uses GSAP ScrollTrigger to count from 0 to target over 1.6s.
 * Used in the Overview page stats section.
 */
export default function Counter({ target, suffix = '', label }: CounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = numberRef.current
    const container = containerRef.current
    if (!el || !container) return

    const obj = { val: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        delay: 0.5,
        snap: { val: 1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.innerText = obj.val + suffix
        },
      })
    }, container)

    return () => ctx.revert()
  }, [target, suffix])

  return (
    <div ref={containerRef} className={styles.counter}>
      <span ref={numberRef} className={styles.number}>
        0{suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
