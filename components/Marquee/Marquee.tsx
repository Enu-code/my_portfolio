'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import styles from './Marquee.module.scss'

interface MarqueeProps {
  /** Text content — rendered twice to create seamless loop */
  text: string
  /** Seconds for one full loop — default 20 */
  speed?: number
  /** Scroll direction — default 'left' */
  direction?: 'left' | 'right'
  /** Additional wrapper class */
  className?: string
}

/**
 * Marquee — infinite horizontal scroll strip.
 * GSAP: x to -50% (left) or +50% (right), repeat -1, ease none.
 * Pauses on mouseenter, resumes on mouseleave.
 * Used in: homepage strip, Projects closing section, Menu subtitles (upgrade).
 */
export default function Marquee({
  text,
  speed = 20,
  direction = 'left',
  className,
}: MarqueeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    const xTarget = direction === 'right' ? '50%' : '-50%'

    const tl = gsap.to(track, {
      x: xTarget,
      repeat: -1,
      ease: 'none',
      duration: speed,
    })

    const pause = () => tl.pause()
    const resume = () => tl.resume()

    wrapper.addEventListener('mouseenter', pause)
    wrapper.addEventListener('mouseleave', resume)

    return () => {
      tl.kill()
      wrapper.removeEventListener('mouseenter', pause)
      wrapper.removeEventListener('mouseleave', resume)
    }
  }, [speed, direction])

  // Render 4 copies so there's always content visible at any speed
  const repeated = `${text}\u00A0\u00A0\u00A0\u00A0`

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${className ?? ''}`}
      aria-hidden="true" // Decorative — screen readers skip
    >
      <div ref={trackRef} className={styles.track}>
        <span>{repeated}</span>
        <span>{repeated}</span>
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  )
}
