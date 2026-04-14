import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for eshaanroy.dev.',
}

export default function PrivacyPage() {
  return (
    <main style={{ padding: '8rem clamp(1.5rem, 5vw, 5rem)', maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(40px, 6vw, 72px)' }}>
        Privacy Policy
      </h1>
      <p style={{ marginTop: '2rem', lineHeight: 1.65, color: '#1A1A1A' }}>
        This site does not collect personal data. No cookies, no trackers.
        Contact: eshaan.roy@outlook.in
      </p>
    </main>
  )
}
