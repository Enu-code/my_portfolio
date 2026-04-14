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
    const isTouch = !window.matchMedia('(pointer: fine)').matches
    if (isTouch) return

    const el = rootRef.current
    if (!el) return

    let isWithinRadius = false

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const rect = el.getBoundingClientRect()
      
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distX = clientX - centerX
      const distY = clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)
      const radius = 150

      if (distance < radius) {
        isWithinRadius = true
        
        // Calculate intensity based on distance (closer = stronger pull)
        // Map 0-150 distance to 1-0 mapping
        const proximity = (radius - distance) / radius 
        
        // Premium Movement: max 20px offset
        const moveX = distX * strength * proximity
        const moveY = distY * strength * proximity
        
        // Subtle Rotation: max 5 degrees based on direction
        const rotate = (distX / radius) * 5
        
        gsap.to(el, {
          x: moveX,
          y: moveY,
          scale: 1 + 0.05 * proximity,
          rotate: rotate,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto'
        })
      } else if (isWithinRadius) {
        // Just left the radius
        isWithinRadius = false
        resetPosition()
      }
    }

    const resetPosition = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [strength])

  return React.cloneElement(children, { ref: rootRef })
}
