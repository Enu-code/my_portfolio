'use client'

import { useRef } from 'react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import styles from './Skills.module.scss'

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    items: ['React / Next.js', 'TypeScript', 'SCSS Modules', 'Tailwind', 'GSAP', 'Framer Motion', 'Zustand', 'Three.js'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Django', 'Python', 'REST APIs', 'GraphQL', 'WebSockets', 'JWT Auth'],
  },
  {
    title: 'Infrastructure',
    items: ['AWS EC2', 'AWS S3', 'RDS', 'PostgreSQL', 'DynamoDB', 'Nginx', 'Docker', 'Vercel'],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useScrollAnimation(sectionRef, { y: 20, opacity: 0, stagger: 0.1 })

  return (
    <section className={styles.skillsSection} aria-label="Technical Skills">
      <div className={styles.inner}>
        
        <h2 className={styles.eyebrow}>Technical Stack</h2>

        <div ref={sectionRef} className={styles.grid}>
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className={styles.column}>
              <h3 className={styles.colTitle}>{category.title}</h3>
              <ul className={styles.list}>
                {category.items.map((item) => (
                  <li key={item} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
