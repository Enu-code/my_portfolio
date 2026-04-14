'use client'

import { useRef } from 'react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import styles from './ProjectsHero.module.scss'

export default function ProjectsHero() {
  const headerRef = useRef<HTMLHeadingElement>(null)
  
  // Basic fade up on load
  useScrollAnimation(headerRef, { y: 40, opacity: 0, delay: 0.1 })

  return (
    <section className={styles.hero} aria-label="Projects Intro">
      <div className={styles.inner}>
        <h1 ref={headerRef} className={styles.title}>
          SELECTED <br />
          <span className={styles.indent}>WORKS.</span>
        </h1>
        
        <div className={styles.meta}>
          <span className={styles.metaItem}>2024–2026</span>
          <span className={styles.metaItem}>Architecture</span>
          <span className={styles.metaItem}>Frontend</span>
        </div>
      </div>
    </section>
  )
}
