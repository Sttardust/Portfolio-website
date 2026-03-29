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
  title: 'Semere Seifu — Product Designer',
  description: 'Turning complexity into simple, usable products.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={albertSans.variable}>
      <body suppressHydrationWarning style={{ fontFamily: 'var(--font-albert), Albert Sans, sans-serif' }}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
