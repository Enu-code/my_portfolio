'use client'

import { useRef } from 'react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import styles from './AboutHero.module.scss'

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useScrollAnimation(containerRef, { y: 30, opacity: 0, delay: 0.1 })

  return (
    <section className={styles.hero} aria-label="About Eshaan">
      <div className={styles.inner}>
        
        <header className={styles.header}>
          <h1 className={styles.title}>
            ENGINEERING DIGITAL
            <br />
            PRODUCTS THAT WORK.
          </h1>
        </header>

        {/* Video placeholder - abstract or ambient loop */}
        <div ref={containerRef} className={styles.mediaWrap}>
          <div className={styles.videoPlaceholder}>
            {/* Real video can be mapped here later: <video src="..." autoPlay loop muted playsInline /> */}
            <span className={styles.placeholderText}>
              [ Ambient Video Placeholder ]
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
