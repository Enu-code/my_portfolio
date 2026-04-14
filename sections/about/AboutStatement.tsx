'use client'

import { useRef } from 'react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import styles from './AboutStatement.module.scss'

export default function AboutStatement() {
  const statementRef = useRef<HTMLDivElement>(null)
  
  useScrollAnimation(statementRef, { y: 30, opacity: 0 })

  return (
    <section className={styles.statementSection} aria-label="Personal Statement">
      <div className={styles.inner}>
        
        <div className={styles.grid}>
          {/* Left Column: Eyebrow */}
          <div className={styles.left}>
            <h2 className={styles.eyebrow}>The Founder</h2>
          </div>

          {/* Right Column: Statement Paragraph */}
          <div ref={statementRef} className={styles.right}>
            <p className={styles.statement}>
              I'm Eshaan Roy, CEO of QuadCore and a Full Stack Developer.
              My work bridges the gap between high-end digital design and bulletproof 
              scalable architecture. I believe the best applications not only function 
              flawlessly under load, but also feel inherently alive to the user.
            </p>
            <p className={styles.statement}>
              Based in Kolkata, India. Currently pursuing B.Tech in CSE.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
