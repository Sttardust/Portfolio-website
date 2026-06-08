import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:       'About',
  description: 'UI/UX & Product Designer in Addis Ababa, with an engineering background and a research-led way of working.',
  openGraph: {
    title:       'About · Semere Seifu',
    description: 'UI/UX & Product Designer in Addis Ababa, with an engineering background and a research-led way of working.',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'About · Semere Seifu',
    description: 'UI/UX & Product Designer based in Addis Ababa, Ethiopia.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
