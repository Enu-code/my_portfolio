'use client'

import { useState, useRef } from 'react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import FAQ from '@/components/FAQ/FAQ'
import styles from './FAQSection.module.scss'

const FAQS = [
  {
    q: 'Do you take on freelance work?',
    a: "Yes, I'm currently open for select freelance projects. If you have an exciting concept or need a robust technical architecture, let's talk.",
  },
  {
    q: 'What is your typical tech stack?',
    a: 'For most new platforms, I build the frontend heavily relying on Next.js, React, and GSAP/Framer Motion for animations. On the backend, I prefer Node.js with Express or Python with Django, typically paired with PostgreSQL.',
  },
  {
    q: 'How do you handle project timelines?',
    a: 'Every project begins with a clear discovery phase and architectural planning. I communicate continuously and deliver milestones iteratively, ensuring there are no surprises at launch.',
  },
  {
    q: 'What is QuadCore?',
    a: "QuadCore is the agency I founded, focused on bringing enterprise-grade software engineering and premium design to startups. It's the roof under which I've scaled multiple platforms like NQR and NEVERA.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First open by default
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useScrollAnimation(sectionRef, { y: 40, opacity: 0, delay: 0.1 })

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={styles.faqSection} aria-label="Frequently Asked Questions">
      <div className={styles.inner}>
        
        <h2 className={styles.eyebrow}>FAQ</h2>

        <div ref={sectionRef} className={styles.listWrap}>
          {FAQS.map((item, index) => (
            <FAQ
              key={index}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
