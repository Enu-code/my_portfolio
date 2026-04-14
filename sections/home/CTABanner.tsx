'use client'

import ArrowLink from '@/components/ArrowLink/ArrowLink'
import styles from './CTABanner.module.scss'

export default function CTABanner() {
  return (
    <section className={styles.ctaSection} aria-label="Call to Action">
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          READY TO BUILD<br />
          SOMETHING GREAT?
        </h2>
        
        <div className={styles.ctaWrap}>
          <ArrowLink text="Let's Talk" href="/contact" className={styles.largeLink} />
        </div>
      </div>
    </section>
  )
}
