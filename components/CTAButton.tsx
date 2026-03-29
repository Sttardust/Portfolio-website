'use client'

import Link from 'next/link'

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 7H13M7 1L13 7L7 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CTAButton({
  href,
  children,
  variant = 'dark',
}: {
  href: string
  children: React.ReactNode
  variant?: 'dark' | 'light'
}) {
  const isDark = variant === 'dark'

  return (
    <Link href={href} className={`cta-btn cta-btn--${variant}`}>
      {children}
      <Arrow />
    </Link>
  )
}
