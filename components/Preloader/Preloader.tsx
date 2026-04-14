'use client'

import { useEffect, useState } from 'react'
import styles from './Preloader.module.scss'

/**
 * Preloader — Hardened implementation.
 * Uses simple JS interval and React state to ensure it ALWAYS unmounts.
 * Does not depend on external animation libraries for the core "unlock" logic.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  useEffect(() => {
    // 1. Lock scroll on mount
    document.body.style.overflow = 'hidden'

    // 2. Fast counter for progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2 // Faster for better UX
      })
    }, 20)

    // 3. Safety net: force reveal after 3 seconds regardless of progress
    const safetyTimeout = setTimeout(() => {
      handleComplete()
    }, 3000)

    function handleComplete() {
      setIsFading(true)
      // Allow time for CSS transition
      setTimeout(() => {
        setIsRemoved(true)
        document.body.classList.add('loaded')
        document.body.style.overflow = ''
      }, 800)
    }

    if (progress === 100) {
      handleComplete()
    }

    return () => {
      clearInterval(timer)
      clearTimeout(safetyTimeout)
    }
  }, [progress])

  if (isRemoved) return null

  return (
    <div 
      className={`
        ${styles.overlay} 
        ${isFading ? styles.faded : ''}
      `} 
      aria-hidden="true"
    >
      <span className={styles.logo}>ER</span>

      <div className={styles.counterWrap}>
        <span className={styles.count}>{progress}</span>
        <span className={styles.percent}>%</span>
      </div>

      <div className={styles.progressTrack}>
        <div 
          className={styles.progressFill} 
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  )
}
