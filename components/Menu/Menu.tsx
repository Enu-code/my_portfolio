'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Marquee from '@/components/Marquee/Marquee'
import styles from './Menu.module.scss'

interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_LINKS = [
  {
    number: '01',
    label: 'About',
    href: '/about',
    subtitle: 'B.Tech CSE · QuadCore CEO · Full Stack Dev · Kolkata India ·',
  },
  {
    number: '02',
    label: 'Projects',
    href: '/projects',
    subtitle: 'NEVERA · NQR · Production Apps · Live Platforms · SaaS ·',
  },
  {
    number: '03',
    label: 'Contact',
    href: '/contact',
    subtitle: 'Available for Freelance · Let\'s Build · eshaan.roy@outlook.in ·',
  },
]

export default function Menu({ isOpen, onClose }: MenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLAnchorElement[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const firstRun = useRef(true)

  // Set initial hidden state on mount
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    gsap.set(overlay, { clipPath: 'inset(0 0 100% 0)' })
    overlay.style.pointerEvents = 'none'
  }, [])

  // Handle open / close animation
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    // Skip the very first render (already set above)
    if (firstRun.current) {
      firstRun.current = false
      return
    }

    if (isOpen) {
      overlay.style.pointerEvents = 'auto'

      const tl = gsap.timeline()
      tl.fromTo(
        overlay,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'power4.inOut' }
      )
      .fromTo(
        linksRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out' },
        0.3
      )
      .fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.55
      )
    } else {
      gsap.to(overlay, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.55,
        ease: 'power4.inOut',
        onComplete: () => {
          overlay.style.pointerEvents = 'none'
        },
      })
    }
  }, [isOpen])

  return (
    <div
      id="fullscreen-menu"
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-label="Navigation menu"
      aria-modal="true"
    >
      {/* Top Bar */}
      <div className={styles.topBar}>
        <span className={styles.overlayLogo} aria-hidden="true">ER</span>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <span className={styles.closeBtnText}>Close</span>
          <span className={styles.closeX} aria-hidden="true">✕</span>
        </button>
      </div>

      {/* Nav Links */}
      <nav className={styles.nav} aria-label="Main navigation">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => { if (el) linksRef.current[i] = el }}
            className={styles.navItem}
            onClick={onClose}
            data-menu-link
          >
            <span className={styles.navNumber} aria-hidden="true">{link.number}</span>
            <span className={styles.navLabel}>{link.label}</span>
            <Marquee
              text={link.subtitle}
              speed={25}
              className={styles.marqueeWrapper}
            />
          </Link>
        ))}
      </nav>

      {/* Bottom Info Strip */}
      <div ref={bottomRef} className={styles.bottomStrip} data-menu-bottom>
        <a
          href="mailto:eshaan.roy@outlook.in"
          className={styles.bottomEmail}
        >
          eshaan.roy@outlook.in
        </a>
        <span className={styles.bottomSep} aria-hidden="true">·</span>
        <span className={styles.bottomLocation}>Kolkata, India</span>
        <div className={styles.bottomSocials}>
          <a href="https://github.com/Enu-code" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/eshaan-roy-772a64252/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://instagram.com/eshaanroyy" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  )
}
