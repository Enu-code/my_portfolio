'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import styles from './Cursor.module.scss'

/**
 * Custom cursor — small dot that follows the mouse.
 * Scales 1×→2× on hover over links and buttons.
 * Entirely disabled on touch devices and mobile (< 768px).
 */
export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true) // default hidden

  useEffect(() => {
    // Detect touch device — don't render cursor on touch
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(max-width: 768px)').matches

    setIsTouchDevice(isTouch)
    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Hide native cursor
    document.documentElement.classList.add('has-custom-cursor')

    const moveCursor = (e: MouseEvent) => {
      if (!visible) setVisible(true)
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const scaleUp = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [data-cursor-hover]')) {
        gsap.to(cursor, { scale: 2, duration: 0.2, ease: 'power2.out' })
      }
    }

    const scaleDown = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [data-cursor-hover]')) {
        gsap.to(cursor, { scale: 1, duration: 0.2, ease: 'power2.out' })
      }
    }

    const hideCursor = () => setVisible(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', scaleUp)
    document.addEventListener('mouseout', scaleDown)
    document.addEventListener('mouseleave', hideCursor)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', scaleUp)
      document.removeEventListener('mouseout', scaleDown)
      document.removeEventListener('mouseleave', hideCursor)
    }
  }, [visible])

  if (isTouchDevice) return null

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${visible ? styles.visible : ''}`}
      aria-hidden="true"
    />
  )
}
