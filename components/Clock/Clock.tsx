'use client'

import { useEffect, useState } from 'react'
import styles from './Clock.module.scss'

interface ClockProps {
  /** Additional class for styling overrides */
  className?: string
}

/**
 * Live IST clock — updates every second.
 * Format: HH:MM:SS IST (24-hour, Asia/Kolkata timezone)
 * Used in Sidebar and Contact page.
 */
export default function Clock({ className }: ClockProps) {
  const [time, setTime] = useState<string>('--:--:--')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }

    // Run immediately to avoid 1s delay on mount
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <time
      className={`${styles.clock} ${className ?? ''}`}
      dateTime={time}
      aria-label={`Current time in Kolkata, India: ${time}`}
    >
      {time} IST
    </time>
  )
}
