'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import styles from './Cursor.module.scss'

/**
 * Custom cursor — dot + trailing outer ring.
 * Scales and glows when hovering over interactive elements.
 * Entirely disabled on touch devices and mobile (< 768px).
 */
export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // 1. Detect touch device
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(max-width: 768px)').matches

    setIsTouchDevice(isTouch)
    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    // 2. Setup highly optimized movement with gsap.quickTo
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3' })

    // Hide native cursor
    document.documentElement.classList.add('has-custom-cursor')

    const moveCursor = (e: MouseEvent) => {
      if (!visible) setVisible(true)
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      const isInteractive = target.closest('a, button, [data-cursor-hover], .magnetic')
      if (isInteractive) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element
      const isInteractive = target.closest('a, button, [data-cursor-hover], .magnetic')
      if (isInteractive) {
        setIsHovering(false)
      }
    }

    const hideCursor = () => setVisible(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', hideCursor)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', hideCursor)
    }
  }, [visible])

  if (isTouchDevice) return null

  return (
    <div
      ref={cursorRef}
      className={`
        ${styles.cursor} 
        ${visible ? styles.visible : ''} 
        ${isHovering ? styles.cursorScale : ''}
      `}
      aria-hidden="true"
    />
  )
}
