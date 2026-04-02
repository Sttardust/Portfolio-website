import type { Metadata } from 'next'
import { Albert_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-albert',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default:  'Semere Seifu — UI/UX & Product Designer',
    template: '%s — Semere Seifu',
  },
  description: 'UI/UX & Product Designer based in Addis Ababa, Ethiopia. Turning complexity into simple, usable products — one decision at a time.',
  keywords:    ['UI/UX Designer', 'Product Designer', 'Addis Ababa', 'Ethiopia', 'Semere Seifu', 'Fintech', 'Mobile Design', 'Design Systems'],
  authors:     [{ name: 'Semere Seifu', url: 'https://semere-portfolio.vercel.app' }],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://semere-portfolio.vercel.app',
    siteName:    'Semere Seifu',
    title:       'Semere Seifu — UI/UX & Product Designer',
    description: 'UI/UX & Product Designer based in Addis Ababa, Ethiopia. Turning complexity into simple, usable products.',
    images: [{
      url:    '/og-image.png',
      width:  1200,
      height: 630,
      alt:    'Semere Seifu — UI/UX & Product Designer',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Semere Seifu — UI/UX & Product Designer',
    description: 'UI/UX & Product Designer based in Addis Ababa, Ethiopia.',
    images:      ['/og-image.png'],
  },
  robots: {
    index:  true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={albertSans.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/Geez-Manuscript-Zemen-COLR.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning style={{ fontFamily: 'var(--font-albert), Albert Sans, sans-serif' }}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
