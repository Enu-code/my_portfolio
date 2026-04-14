'use client'

import { useRef } from 'react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import styles from './Strategy.module.scss'

const STRATEGIES = [
  {
    num: '01',
    title: 'Product Strategy',
    desc: 'Translating complex business requirements into intuitive, scalable digital products and system architectures.',
  },
  {
    num: '02',
    title: 'Interaction Design',
    desc: 'Crafting premium, fluid user experiences using modern animation libraries, micro-interactions, and spatial layouts.',
  },
  {
    num: '03',
    title: 'Full Stack Dev',
    desc: 'Building robust, secure backend architectures and connecting them seamlessly with lightning-fast frontend interfaces.',
  },
]

export default function Strategy() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Use custom hook for GSAP scroll reveal
  useScrollAnimation(sectionRef, { y: 40, opacity: 0, stagger: 0.1, delay: 0 })

  return (
    <section className={styles.strategySection} aria-label="Strategy & Approach">
      <div className={styles.inner}>
        
        {/* Header */}
        <header className={styles.header}>
          <h2 className={styles.eyebrow}>Approach</h2>
          <p className={styles.headline}>
            Focusing on performance, aesthetics, and robust engineering to build solutions that scale.
          </p>
        </header>

        {/* Cards Grid */}
        <div ref={sectionRef} className={styles.grid}>
          {STRATEGIES.map((item) => (
            <div key={item.num} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.num}>{item.num}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
