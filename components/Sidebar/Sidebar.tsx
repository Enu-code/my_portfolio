'use client'

/**
 * Sidebar — Persistent right-edge info panel.
 * Always shows a 48px tab strip with rotated 'INFO' label.
 * Hovering slides the full content panel into view (pure CSS transition).
 * Clock component placeholder — upgraded to <Clock /> in Phase 3.
 */

import Link from 'next/link'
import Clock from '@/components/Clock/Clock'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Site information panel">
      {/* Tab strip — always visible */}
      <div className={styles.tab} aria-hidden="true">
        <span className={styles.tabText}>Info</span>
      </div>

      {/* Content panel — revealed on hover */}
      <div className={styles.panel}>
        {/* Tagline */}
        <p className={styles.tagline}>
          Building real products<br />
          with real impact.
        </p>

        <div className={styles.divider} />

        {/* Contact details */}
        <div className={styles.details}>
          <a href="mailto:eshaan.roy@outlook.in" className={styles.detail}>
            <span className={styles.detailLabel}>Email</span>
            <span className={styles.detailValue}>eshaan.roy@outlook.in</span>
          </a>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Based In</span>
            <span className={styles.detailValue}>Kolkata, India</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Local Time</span>
            <Clock className={styles.detailValue} />
          </div>
        </div>

        <div className={styles.divider} />

        {/* Social links */}
        <nav className={styles.socials} aria-label="Social links">
          <a
            href="https://github.com/Enu-code"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/eshaan-roy-772a64252/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/eshaanroyy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            Instagram
          </a>
        </nav>

        {/* Copyright */}
        <p className={styles.copyright}>© 2026 Eshaan Roy</p>
      </div>
    </aside>
  )
}
