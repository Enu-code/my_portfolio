'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import styles from './Preloader.module.scss'

/**
 * Preloader — Full viewport white overlay.
 * GSAP counts 0 → 100 with progress bar fill.
 * At 100: short pause → fade out → adds 'loaded' to <body> → scroll unlocked.
 */
export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const counter = counterRef.current
    const progress = progressRef.current
    if (!overlay || !counter || !progress) return

    // Initial state
    gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })

    const obj = { val: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          const rounded = Math.round(obj.val)
          counter.innerText = String(rounded)
          gsap.set(progress, { scaleX: rounded / 100 })
        },
        onComplete: () => {
          // Short pause then fade out
          gsap.to(overlay, {
            opacity: 0,
            y: -12,
            duration: 0.55,
            delay: 0.25,
            ease: 'power3.in',
            onComplete: () => {
              document.body.classList.add('loaded')
              overlay.style.display = 'none'
            },
          })
        },
      })
    }, overlayRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      {/* ER Logo */}
      <span className={styles.logo}>ER</span>

      {/* Counter */}
      <div className={styles.counterWrap}>
        <span ref={counterRef} className={styles.count}>0</span>
        <span className={styles.percent}>%</span>
      </div>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        <div ref={progressRef} className={styles.progressFill} />
      </div>
    </div>
  )
}
