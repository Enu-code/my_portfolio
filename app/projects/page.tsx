import type { Metadata } from 'next'
import ProjectsHero from '@/sections/projects/ProjectsHero'
import ProjectList from '@/sections/projects/ProjectList'
import ClosingMarquee from '@/sections/projects/ClosingMarquee'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'NEVERA and NQR — production projects shipped by Eshaan Roy. SaaS platforms, QR management systems, and more.',
}

const PROJECTS = [
  {
    title: 'NEVERA',
    roles: ['Architecture', 'Full Stack', 'Design'],
    year: '2025',
    link: '#', 
    imageSrc: '', 
  },
  {
    title: 'NQR',
    roles: ['Backend', 'Operations API'],
    year: '2026',
    link: '#',
    imageSrc: '', 
  },
]

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectList projects={PROJECTS} />
      <ClosingMarquee />
    </>
  )
}
