'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import styles from './Vision.module.scss'

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image) return

    // Parallax effect on the image container inside the section
    const ctx = gsap.context(() => {
      gsap.to(image, {
        y: -100, // Move image up as we scroll down
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className={styles.visionSection} aria-label="Vision">
      <div className={styles.inner}>
        
        {/* Left Parallax Image Placeholder */}
        <div className={styles.imageWrap}>
          <div ref={imageRef} className={styles.imageInner}>
            <span className={styles.placeholderText}>[ Concept Art / Photo ]</span>
          </div>
        </div>

        {/* Right Text Block */}
        <div className={styles.textWrap}>
          <h2 className={styles.title}>
            BEYOND JUST CODE.
          </h2>
          <p className={styles.desc}>
            True engineering isn't just writing scripts that execute without errors. 
            It's about architecting scalable systems that endure over time, wrapping 
            them in interfaces that people actually want to use, and delivering 
            performance that feels instantaneous. The intersection of design precision 
            and backend reliability is where great products live.
          </p>
        </div>

      </div>
    </section>
  )
}
