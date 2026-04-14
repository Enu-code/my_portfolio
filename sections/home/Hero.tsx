'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Counter from '@/components/Counter/Counter'
import ArrowLink from '@/components/ArrowLink/ArrowLink'
import styles from './Hero.module.scss'

/**
 * Overview Hero Section
 * Primary headline with staggered GSAP reveal (split lines).
 * Counters at the bottom right.
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLHeadingElement>(null)
  const title2Ref = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)


  // GSAP reveal on mount
  useEffect(() => {
    // Direct reveal after a short delay to allow preloader to start its thing
    const revealTimer = setTimeout(() => {
      playAnimation()
    }, 700)

    function playAnimation() {
      // Create a timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Animate lines if they exist
      if (title1Ref.current && title2Ref.current) {
        tl.fromTo(
          [title1Ref.current, title2Ref.current],
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 1.2 }
        )
      }

      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1 },
          '-=0.8'
        )
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.6'
        )
      }

      // 4. Parallax scrub effect on the title wrapper
      if (titleWrapRef.current && heroRef.current) {
        gsap.to(titleWrapRef.current, {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }

    return () => {
      clearTimeout(revealTimer)
    }
  }, [])
  return (
    <section ref={heroRef} className={styles.hero} aria-label="Introduction">
      <div className={styles.content}>
        
        {/* 1. Stats counter strip at the TOP horizontal strip */}
        <div ref={statsRef} className={styles.statsStrip}>
          <Counter target={50} suffix="+" label="Projects Completed" />
          <Counter target={3} suffix="+" label="Years of Experience" />
          <Counter target={98.3} suffix="/100" label="Average Performance Score" />
        </div>

        {/* 2. Main Display Headlines */}
        <div ref={titleWrapRef} className={styles.titleWrap}>
          <div className={styles.lineWrap}>
            <h1 ref={title1Ref} className={styles.titleTop}>
              I BUILD MODERN WEBSITES
            </h1>
          </div>
          <div className={styles.lineWrap}>
            <h1 ref={title2Ref} className={styles.titleBottom}>
              THAT WORK
            </h1>
          </div>
        </div>

        {/* 3. Intro text — Bottom area */}
        <div className={styles.introWrap}>
          <p ref={introRef} className={styles.introText}>
            I'm a web developer focused on building modern, fast, and<br />
            reliable websites. I care not only about how a site looks, but<br />
            also about how it performs, scales, and feels for real users.
          </p>
          <div className={styles.ctaWrap}>
            <ArrowLink text="Learn more" href="/about" />
          </div>
        </div>

      </div>
    </section>
  )
}
