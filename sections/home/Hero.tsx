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
  const titleInnerRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLHeadingElement>(null)
  const title2Ref = useRef<HTMLHeadingElement>(null)
  const introWrapRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const bgInnerRef = useRef<HTMLDivElement>(null)


  // GSAP reveal on mount
  useEffect(() => {
    // Anticipation delay before starting sequence
    const revealTimer = setTimeout(() => {
      // Add a 'playing' state to body so CSS animations can start AFTER GSAP
      document.body.classList.add('hero-revealed')
      playAnimation()
    }, 800)

    function playAnimation() {
      // Create a timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Stats Reveal (Top-down)
      if (statsRef.current) {
        tl.fromTo(
          statsRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1 }
        )
      }

      // 2. Cinematic Mask Reveal for Headlines (Sequential Rhythm)
      if (title1Ref.current && title2Ref.current) {
        tl.fromTo(
          [title1Ref.current, title2Ref.current],
          { yPercent: 100 },
          { 
            yPercent: 0, 
            duration: 1.4, 
            stagger: 0.25, 
            ease: 'expo.out' 
          },
          '-=0.4' // Overlap slightly with stats for fluidity
        )
      }

      // 3. Intro & CTA Reveal (Bottom-up)
      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.8' // Start while titles are finishing
        )
      }

      // 4. Multi-Layered Parallax Scrubbing with Scale
      if (heroRef.current) {
        // Background (Slowest + Scale)
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            y: -100,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        // Heading Wrapper (Slower + Slight Scale)
        if (titleWrapRef.current) {
          gsap.to(titleWrapRef.current, {
            y: -180,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        // Stats & Intro (Faster for depth)
        if (statsRef.current) {
          gsap.to(statsRef.current, {
            y: -200,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        if (introWrapRef.current) {
          gsap.to(introWrapRef.current, {
            y: -260,
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
    }

    // 5. Cursor-Reactive Interaction (Background + Headline)
    let bgXTo: any, bgYTo: any;
    let headXTo: any, headYTo: any;
    
    if (bgInnerRef.current) {
      bgXTo = gsap.quickTo(bgInnerRef.current, 'x', { duration: 0.8, ease: 'power3' })
      bgYTo = gsap.quickTo(bgInnerRef.current, 'y', { duration: 0.8, ease: 'power3' })
    }
    
    if (titleInnerRef.current) {
      headXTo = gsap.quickTo(titleInnerRef.current, 'x', { duration: 0.6, ease: 'power2.out' })
      headYTo = gsap.quickTo(titleInnerRef.current, 'y', { duration: 0.6, ease: 'power2.out' })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Calculate normalized position (-0.5 to 0.5)
      const xPos = (clientX / innerWidth) - 0.5
      const yPos = (clientY / innerHeight) - 0.5
      
      if (bgXTo && bgYTo) {
        bgXTo(xPos * 60) // max 30px drift
        bgYTo(yPos * 60)
      }
      
      if (headXTo && headYTo) {
        headXTo(xPos * 16) // max 8px drift for heading
        headYTo(yPos * 16)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(revealTimer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  return (
    <section ref={heroRef} className={styles.hero} aria-label="Introduction">
      {/* Decorative Parallax Background Element */}
      <div ref={bgRef} className={styles.heroBg} aria-hidden="true">
        <div ref={bgInnerRef} className={styles.bgInner}>
          <span>ER</span>
        </div>
      </div>

      <div className={styles.content}>
        
        {/* 1. Stats counter strip at the TOP horizontal strip */}
        <div ref={statsRef} className={styles.statsStrip}>
          <Counter target={50} suffix="+" label="Projects Completed" />
          <Counter target={3} suffix="+" label="Years of Experience" />
          <Counter target={98.3} suffix="/100" label="Average Performance Score" />
        </div>

        {/* 2. Main Display Headlines */}
        <div ref={titleWrapRef} className={styles.titleWrap}>
          <div ref={titleInnerRef} className={styles.titleInner}>
            <div className={styles.lineWrap}>
              <h1 ref={title1Ref} className={styles.titleTop}>
                I BUILD MODERN <span className={styles.letterFloat}>W</span><span>E</span><span className={styles.letterFloat}>B</span><span>S</span><span>I</span><span className={styles.letterFloat}>T</span><span>E</span><span>S</span>
              </h1>
            </div>
            <div className={styles.lineWrap}>
              <h1 ref={title2Ref} className={styles.titleBottom}>
                THAT WORK
              </h1>
            </div>
          </div>
        </div>

        {/* 3. Intro text — Bottom area */}
        <div ref={introWrapRef} className={styles.introWrap}>
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
