import type { Metadata } from 'next'
import AboutHero from '@/sections/about/AboutHero'
import AboutStatement from '@/sections/about/AboutStatement'
import Skills from '@/sections/about/Skills'
import Vision from '@/sections/about/Vision'
import FAQSection from '@/sections/about/FAQSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'B.Tech CSE student, CEO of QuadCore, and Full Stack Developer based in Kolkata, India. Skills, vision, and philosophy.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStatement />
      <Skills />
      <Vision />
      <FAQSection />
    </>
  )
}
