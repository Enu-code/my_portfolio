'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import ArrowLink from '@/components/ArrowLink/ArrowLink'
import styles from './ProjectRow.module.scss'

interface ProjectRowProps {
  title: string
  roles: string[]
  year: string
  link: string
  /** Path to the image in /public folder */
  imageSrc: string
}

export default function ProjectRow({ title, roles, year, link, imageSrc }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imagePreviewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row = rowRef.current
    const preview = imagePreviewRef.current
    if (!row || !preview) return

    // Create extremely performant quickTo setters for the preview element
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.4, ease: 'power3' })

    const moveImage = (e: MouseEvent) => {
      // Get bounding box so coordinates are relative to the row
      const rect = row.getBoundingClientRect()
      // Center the image on the cursor (image is typically 300px wide -> offset by 150)
      xTo(e.clientX - rect.left - 150)
      yTo(e.clientY - rect.top - 100) // Offset y depending on image height
    }

    const showImage = () => {
      gsap.to(preview, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    const hideImage = () => {
      gsap.to(preview, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.out' })
    }

    row.addEventListener('mousemove', moveImage)
    row.addEventListener('mouseenter', showImage)
    row.addEventListener('mouseleave', hideImage)

    return () => {
      row.removeEventListener('mousemove', moveImage)
      row.removeEventListener('mouseenter', showImage)
      row.removeEventListener('mouseleave', hideImage)
    }
  }, [])

  return (
    <div ref={rowRef} className={styles.projectRow}>
      
      {/* Grid Content */}
      <div className={styles.grid}>
        <div className={styles.colName}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        
        <div className={styles.colRoles}>
          {roles.map((role, i) => (
            <span key={i} className={styles.tag}>{role}</span>
          ))}
        </div>

        <div className={styles.colYear}>
          <span className={styles.tag}>{year}</span>
        </div>

        <div className={styles.colLink}>
          <ArrowLink text="View Case" href={link} external className={styles.link} />
        </div>
      </div>

      {/* Floating Preview Image */}
      <div ref={imagePreviewRef} className={styles.previewWrap} aria-hidden="true">
        {/* We use a standard image tag here or next/image. 
            No placeholders defined yet, so we'll leave src driven by props. */}
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={`${title} snippet`}
            fill
            className={styles.image}
            sizes="300px" // explicitly declare standard tracking size
          />
        ) : (
          <div className={styles.blankFallback}>[ Image ]</div>
        )}
      </div>

    </div>
  )
}
