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
  const titleWrapRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLHeadingElement>(null)
  const title2Ref = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  // GSAP reveal on mount
  useEffect(() => {
    // Only animate after preloader is done (indicated by .loaded on body)
    // For simplicity locally, we add a short delay.
    // robust way: wait for document.body.classList.contains('loaded')
    
    const checkLoaded = setInterval(() => {
      if (document.body.classList.contains('loaded')) {
        clearInterval(checkLoaded)
        playAnimation()
      }
    }, 100)

    // Fallback if preloader disabled
    const fallbackTimeout = setTimeout(() => {
      clearInterval(checkLoaded)
      playAnimation()
    }, 2000)

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
      clearInterval(checkLoaded)
      clearTimeout(fallbackTimeout)
    }
  }, [])

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Introduction">
      <div className={styles.content}>
        
        {/* Main Display Headlines */}
        <div ref={titleWrapRef} className={styles.titleWrap}>
          <div className={styles.lineWrap}>
            <h1 ref={title1Ref} className={styles.titleTop}>
              I BUILD MODERN
            </h1>
          </div>
          <div className={styles.lineWrap}>
            <h1 ref={title2Ref} className={styles.titleBottom}>
              WEB EXPERIENCES
            </h1>
          </div>
        </div>

        {/* Intro text — Bottom area */}
        <div className={styles.introWrap}>
          <p ref={introRef} className={styles.introText}>
            Delivering high-performance digital<br />
            experiences with a focus on<br />
            editorial design & rigorous engineering.
          </p>
          <div className={styles.ctaWrap}>
            <ArrowLink text="Explore Projects" href="#recent-work" />
          </div>
        </div>

      </div>

      {/* Stats counter strip at bottom */}
      <div ref={statsRef} className={styles.statsStrip}>
        <Counter target={3} suffix="+" label="Years Experience" />
        <Counter target={15} suffix="+" label="Projects Shipped" />
        <Counter target={2} label="Live Startups" />
      </div>
    </section>
  )
}
