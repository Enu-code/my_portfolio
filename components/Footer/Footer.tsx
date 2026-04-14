import Link from 'next/link'
import Clock from '@/components/Clock/Clock'
import styles from './Footer.module.scss'

/**
 * Footer — Server Component (no client interactivity needed here).
 * Layout:
 *   Top section: logo + contact details (left) | nav links + socials (right)
 *   Bottom: full-width 'ESHAAN ROY' display wordmark
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* ── Top section ── */}
        <div className={styles.top}>
          {/* Top left: identity */}
          <div className={styles.topLeft}>
            <Link href="/" className={styles.footerLogo} aria-label="Eshaan Roy — Home">
              ER
            </Link>
            <div className={styles.footerDetails}>
              <a href="mailto:eshaan.roy@outlook.in" className={styles.footerEmail}>
                eshaan.roy@outlook.in
              </a>
              <span className={styles.footerLocation}>Kolkata, India</span>
              <Clock className={styles.footerClock} />
            </div>
          </div>

          {/* Top right: navigation */}
          <div className={styles.topRight}>
            <nav className={styles.footerNav} aria-label="Footer navigation">
              <Link href="/about" className={styles.footerNavLink}>About</Link>
              <Link href="/projects" className={styles.footerNavLink}>Projects</Link>
              <Link href="/contact" className={styles.footerNavLink}>Contact</Link>
              <Link href="/privacy" className={styles.footerNavLink}>Privacy</Link>
            </nav>
            <div className={styles.footerSocials}>
              <a
                href="https://github.com/Enu-code"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/eshaan-roy-772a64252/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/eshaanroyy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
              >
                Instagram
              </a>
            </div>
            <p className={styles.footerCopyright}>© {year} Eshaan Roy. All rights reserved.</p>
          </div>
        </div>

        {/* ── Wordmark ── */}
        <div className={styles.wordmarkWrapper} aria-hidden="true">
          <span className={styles.wordmark}>ESHAAN ROY</span>
        </div>
      </div>
    </footer>
  )
}
