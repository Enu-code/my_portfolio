'use client'

import { useRef } from 'react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import styles from './Services.module.scss'

const SERVICES_LEFT = [
  'React / Next.js',
  'TypeScript',
  'GSAP & Framer Motion',
  'Tailwind CSS & SCSS',
  'WebGL / Three.js',
]

const SERVICES_RIGHT = [
  'Node.js / Express',
  'Django / Python',
  'PostgreSQL & DynamoDB',
  'AWS (EC2, S3, RDS)',
  'RESTful APIs & GraphQL',
]

export default function Services() {
  const leftListRef = useRef<HTMLUListElement>(null)
  const rightListRef = useRef<HTMLUListElement>(null)

  useScrollAnimation(leftListRef, { y: 30, opacity: 0, stagger: 0.1 })
  useScrollAnimation(rightListRef, { y: 30, opacity: 0, stagger: 0.1 })

  return (
    <section className={styles.servicesSection} aria-label="Services & Capabilities">
      <div className={styles.inner}>
        
        <header className={styles.header}>
          <h2 className={styles.eyebrow}>Capabilities</h2>
        </header>

        <div className={styles.listsWrap}>
          
          <div className={styles.column}>
            <h3 className={styles.colTitle}>Frontend Development</h3>
            <ul ref={leftListRef} className={styles.list}>
              {SERVICES_LEFT.map((item, i) => (
                <li key={i} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.colTitle}>Backend & Cloud</h3>
            <ul ref={rightListRef} className={styles.list}>
              {SERVICES_RIGHT.map((item, i) => (
                <li key={i} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  )
}
