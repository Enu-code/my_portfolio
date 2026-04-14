import type { Metadata } from 'next'
import ContactCard from '@/sections/contact/ContactCard'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Eshaan Roy. Available for freelance, startups, and student projects. Based in Kolkata, India.',
}

export default function ContactPage() {
  return (
    <>
      <ContactCard />
    </>
  )
}
