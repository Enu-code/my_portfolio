'use client'

import { useRef } from 'react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import ProjectRow from './ProjectRow'

interface ProjectListProps {
  projects: Array<{
    title: string;
    roles: string[];
    year: string;
    link: string;
    imageSrc: string;
  }>
}

export default function ProjectList({ projects }: ProjectListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  
  // Stagger the entrance of the rows
  useScrollAnimation(listRef, { y: 40, opacity: 0, stagger: 0.15, delay: 0.2 })

  return (
    <div ref={listRef} style={{ paddingBottom: '8rem' }}>
      {projects.map((p, i) => (
        <ProjectRow 
          key={i} 
          title={p.title} 
          roles={p.roles} 
          year={p.year} 
          link={p.link} 
          imageSrc={p.imageSrc} 
        />
      ))}
    </div>
  )
}
