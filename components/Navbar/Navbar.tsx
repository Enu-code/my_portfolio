'use client'

import Link from 'next/link'
import Magnetic from '@/components/Magnetic/Magnetic'
import styles from './Navbar.module.scss'

interface NavbarProps {
  onMenuOpen: () => void
  menuOpen: boolean
}

export default function Navbar({ onMenuOpen, menuOpen }: NavbarProps) {
  return (
    <header className={styles.navbar} role="banner">
      {/* 1. Logo mark (Magnetic) */}
      <Magnetic strength={0.15}>
        <Link href="/" className={styles.logo} aria-label="Eshaan Roy — Home">
          ER
        </Link>
      </Magnetic>

      {/* 2. Menu trigger (Magnetic) */}
      <Magnetic strength={0.2}>
        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
          onClick={onMenuOpen}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="fullscreen-menu"
        >
          <span className={styles.menuBtnText}>Menu</span>
          <div className={styles.dot} aria-hidden="true" />
        </button>
      </Magnetic>
    </header>
  )
}
