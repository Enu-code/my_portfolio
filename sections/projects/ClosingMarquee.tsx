'use client'

import Marquee from '@/components/Marquee/Marquee'
import styles from './ClosingMarquee.module.scss'
import Link from 'next/link'

export default function ClosingMarquee() {
  return (
    <section className={styles.closingSection} aria-label="Closing Projects Marquee">
      <Link href="/contact" className={styles.linkWrap}>
        <Marquee 
          text="LET'S BUILD SOMETHING TOGETHER" 
          speed={40} 
          className={styles.hugeMarquee} 
        />
      </Link>
    </section>
  )
}
