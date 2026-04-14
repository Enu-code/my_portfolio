'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

interface MagneticProps {
  children: React.ReactElement
  strength?: number
}

/**
 * Magnetic Component
 * Wraps an element and makes it "stick" to the cursor within a radius.
 * Uses GSAP for high-performance smooth snapping and return.
 */
export default function Magnetic({ children, strength = 0.2 }: MagneticProps) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Disable magnetic effect on touch devices
    const isTouch = !window.matchMedia('(pointer: fine)').matches
    if (isTouch) return

    const el = rootRef.current
    if (!el) return

    // On mouse move, move the element towards the cursor based on strength
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = el.getBoundingClientRect()
      
      const centerX = left + width / 2
      const centerY = top + height / 2
      
      const x = (clientX - centerX) * strength
      const y = (clientY - centerY) * strength

      gsap.to(el, {
        x,
        y,
        duration: 1,
        ease: 'power3.out'
      })
    }

    // On mouse leave, reset the element position with a smooth snap
    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return React.cloneElement(children, { ref: rootRef })
}
