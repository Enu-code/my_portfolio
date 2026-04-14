'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import Clock from '@/components/Clock/Clock'
import ArrowLink from '@/components/ArrowLink/ArrowLink'
import styles from './ContactCard.module.scss'

export default function ContactCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  // Subtly float the card up on mount
  useScrollAnimation(cardRef, { y: 40, opacity: 0, delay: 0.1 })

  return (
    <section className={styles.contactSection} aria-label="Contact Information">
      <div className={styles.inner}>
        
        <div ref={cardRef} className={styles.card}>
          
          {/* Top: Status Bar */}
          <div className={styles.statusBar}>
            <div className={styles.statusIndicator}>
              <span className={styles.pulseDot} aria-hidden="true" />
              <span className={styles.statusText}>Available for freelance</span>
            </div>
            {/* Using the global Clock component */}
            <Clock className={styles.cardClock} />
          </div>

          <div className={styles.cardBody}>
            {/* Left: Identity & Contact Info */}
            <div className={styles.infoCol}>
              
              <div className={styles.identity}>
                {/* Optional profile image placeholder */}
                <div className={styles.avatarWrap}>
                  <div className={styles.avatarBlank}>[ ER ]</div>
                </div>
                <div className={styles.nameBlock}>
                  <h1 className={styles.name}>Eshaan Roy</h1>
                  <p className={styles.title}>Full Stack Developer</p>
                </div>
              </div>

              <div className={styles.actionBlock}>
                <h2 className={styles.ctaHeading}>Let's talk about your next project.</h2>
                <a href="mailto:eshaan.roy@outlook.in" className={styles.primaryEmail}>
                  eshaan.roy@outlook.in
                </a>
              </div>

            </div>

            {/* Right: Social Links List */}
            <div className={styles.socialCol}>
              <h3 className={styles.socialEyebrow}>Digital Presence</h3>
              <ul className={styles.socialList}>
                <li>
                  <ArrowLink text="GitHub" href="https://github.com/Enu-code" external />
                </li>
                <li>
                  <ArrowLink text="LinkedIn" href="https://www.linkedin.com/in/eshaan-roy-772a64252/" external />
                </li>
                <li>
                  <ArrowLink text="Instagram" href="https://instagram.com/eshaanroyy" external />
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
