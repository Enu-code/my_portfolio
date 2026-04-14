import Link from 'next/link'
import styles from './ArrowLink.module.scss'

interface ArrowLinkProps {
  text: string
  href: string
  /** Use <a> for external links, <Link> for internal — default 'internal' */
  external?: boolean
  className?: string
}

/**
 * ArrowLink — CTA link with dual arrow swap animation on hover.
 * Arrow1 exits: translateX(20px) + opacity 0.
 * Arrow2 enters from: translateX(-10px) → 0 + opacity 1.
 * Used across all CTAs: See my work, Let's talk, See Live, More projects.
 */
const ArrowSVG = () => (
  <svg
    width="18"
    height="10"
    viewBox="0 0 18 10"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M0 5H16M12 1L16 5L12 9"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ArrowLink({
  text,
  href,
  external = false,
  className,
}: ArrowLinkProps) {
  const inner = (
    <>
      <span className={styles.text}>{text}</span>
      <span className={styles.arrows} aria-hidden="true">
        <span className={styles.arrow1}>
          <ArrowSVG />
        </span>
        <span className={styles.arrow2}>
          <ArrowSVG />
        </span>
      </span>
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.link} ${className ?? ''}`}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={`${styles.link} ${className ?? ''}`}>
      {inner}
    </Link>
  )
}
