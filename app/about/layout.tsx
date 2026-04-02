import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:       'About',
  description: 'UI/UX & Product Designer based in Addis Ababa, Ethiopia. Background in engineering, obsessed with detail, driven by empathy.',
  openGraph: {
    title:       'About — Semere Seifu',
    description: 'UI/UX & Product Designer based in Addis Ababa. Background in engineering, obsessed with detail, driven by empathy.',
    images:      [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'About — Semere Seifu',
    description: 'UI/UX & Product Designer based in Addis Ababa, Ethiopia.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
