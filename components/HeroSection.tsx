'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import HeroGlyph from '@/components/HeroGlyph'

export default function HeroSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('semeredesigner@gmail.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return (
    <section
      style={{
        position:  'relative',
        width:     '100%',
        height:    '100svh',
        minHeight: '600px',
        background:'var(--bg)',
        overflow:  'hidden',
      }}
    >
      {/* ── Hero SVG — top-left ── */}
      <div
        className="anim-fade-in delay-0 hero-amharic-wrap"
        style={{
          position:      'absolute',
          top:           '5%',
          left:          'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)',
          pointerEvents: 'none',
          userSelect:    'none',
        }}
      >
        <img
          src="/hero.svg"
          alt=""
          aria-hidden
          className="hero-amharic-text"
          style={{ height: '350px', width: 'auto', display: 'block' }}
        />
      </div>

      {/* ── Animated glyph — dead center ── */}
      <HeroGlyph />

      {/* ── Bottom bar ── */}
      <div
        className="hero-bottom"
        style={{
          position:       'absolute',
          bottom:         'clamp(2.25rem, 5vh, 4.25rem)',
          left:           0,
          right:          0,
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-end',
          paddingLeft:    'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)',
          paddingRight:   'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)',
        }}
      >
        {/* Tagline */}
        <div>
          {[
            "I'm Semere Seifu.",
            'Product Designer.',
            'Turning complexity into simple,',
            'usable products.',
          ].map((line, i) => (
            <p
              key={line}
              className={`anim-fade-up delay-${i + 1}`}
              style={{
                fontFamily:    i < 2 ? 'var(--font-recoleta)' : 'inherit',
                fontSize:      'clamp(1rem, 1.4vw, 1.25rem)',
                fontWeight:    i < 2 ? 700 : 400,
                lineHeight:    1.4,
                color:         i < 2 ? 'var(--fg)' : 'var(--muted)',
                letterSpacing: i < 2 ? '0em' : '-0.01em',
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div
          className="hero-ctas hero-ctas-desktop"
          style={{
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'flex-end',
            gap:           '0.6rem',
          }}
        >
          <NavCTA href="/#about" className="anim-fade-up delay-3" arrow="right">
            About Me
          </NavCTA>
          <NavCTA href="/#work" className="anim-fade-up delay-4" arrow="down">
            Browse My Work
          </NavCTA>
        </div>

        {/* Mobile CTA — "Get in touch" */}
        <button
          onClick={copyEmail}
          className="hero-cta hero-cta-mobile anim-fade-up delay-3"
          style={{
            display:       'none', // shown via CSS on mobile
            alignItems:    'center',
            gap:           '0.4rem',
            fontSize:      'clamp(0.78rem, 1vw, 0.9rem)',
            fontWeight:    400,
            color:         'var(--fg)',
            letterSpacing: '0.01em',
            background:    'none',
            border:        'none',
            padding:       0,
            cursor:        'pointer',
          }}
        >
          {copied ? 'Copied!' : 'Get in touch'}
          {!copied && (
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    </section>
  )
}

function NavCTA({
  href,
  children,
  arrow,
  className,
}: {
  href:      string
  children:  React.ReactNode
  arrow?:    'right' | 'down'
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`hero-cta ${className ?? ''}`}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '0.4rem',
        fontSize:       'clamp(0.78rem, 1vw, 0.9rem)',
        fontWeight:     400,
        color:          'var(--fg)',
        letterSpacing:  '0.01em',
        textDecoration: 'none',
        transition:     'color 0.2s ease',
      }}
    >
      {children}
      {arrow === 'right' && (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {arrow === 'down' && (
        <span className="arrow-drop-wrap">
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M5 1V13M1 9L5 13L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </Link>
  )
}
