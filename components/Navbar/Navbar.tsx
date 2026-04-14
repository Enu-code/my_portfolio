'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.scss'

interface NavbarProps {
  onMenuOpen: () => void
  menuOpen: boolean
}

export default function Navbar({ onMenuOpen, menuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuActive : ''}`}
      role="banner"
    >
      {/* Logo mark */}
      <Link href="/" className={styles.logo} aria-label="Eshaan Roy — Home">
        ER
      </Link>

      {/* Menu trigger */}
      <button
        className={styles.menuBtn}
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-controls="fullscreen-menu"
      >
        <span className={styles.menuBtnText}>Menu</span>
        <span className={styles.menuBtnLines} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
    </header>
  )
}
