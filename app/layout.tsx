import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout/ClientLayout'
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll'
import Footer from '@/components/Footer/Footer'
import '@/styles/globals.scss'

// ─────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

// ─────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Eshaan Roy — Frontend Developer & Full Stack Engineer',
    template: '%s | Eshaan Roy',
  },
  description:
    'Frontend Developer and Full Stack Engineer based in Kolkata, India. Building modern, fast, and production-ready web experiences. CEO of QuadCore.',
  keywords: [
    'Eshaan Roy',
    'Frontend Developer',
    'Full Stack Engineer',
    'Next.js',
    'React',
    'Kolkata',
    'India',
  ],
  authors: [{ name: 'Eshaan Roy', url: 'https://eshaanroy.dev' }],
  creator: 'Eshaan Roy',
  metadataBase: new URL('https://eshaanroy.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://eshaanroy.dev',
    siteName: 'Eshaan Roy',
    title: 'Eshaan Roy — Frontend Developer & Full Stack Engineer',
    description:
      'Building modern, fast, and production-ready web experiences. From responsive frontends to scalable full-stack systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eshaan Roy — Frontend Developer & Full Stack Engineer',
    description: 'Building modern, fast, and production-ready web experiences.',
  },
  robots: { index: true, follow: true },
}

// ─────────────────────────────────────────
// ROOT LAYOUT
// ─────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body>
        {/* Minimum width guard — visible only below 320px */}
        <div className="min-width-guard" aria-hidden="true">
          <p>Please use a wider screen to view this site.</p>
        </div>

        <SmoothScroll>
          {/* Interactive global shell: Navbar + Menu + Sidebar */}
          <ClientLayout />

          {/* Page content — route pages render here via template.tsx */}
          <main id="main-content">
            {children}
          </main>

          {/* Footer — Server Component */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
