'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/#about' },
  { label: 'Case Studies', href: '/#work' },
  { label: 'Contact',      href: '/#contact' },
]

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const pathname = usePathname()

  /* ── Scroll listener ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Body scroll lock when menu is open ──────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Escape key closes menu ──────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ── Close menu on route change ─────────────────────── */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <header
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          right:      0,
          zIndex:     100,
          transition: 'background 0.3s ease, border-color 0.3s ease',
          background: scrolled ? 'rgba(248,245,241,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        {/* Inner wrapper — mirrors the page max-width + padding */}
        <div
          style={{
            maxWidth:       '1536px',
            margin:         '0 auto',
            paddingTop:     '1.4rem',
            paddingBottom:  '1.4rem',
            paddingLeft:    'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)',
            paddingRight:   'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'flex-end',
          }}
        >
          {/* Desktop links */}
          <nav
            className="nav-desktop-links"
            style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize:      '0.82rem',
                  fontWeight:    400,
                  color:         'var(--fg)',
                  letterSpacing: '0.01em',
                  position:      'relative',
                  opacity:       0,
                  animation:     `slideDown 0.5s ease ${i * 60 + 100}ms forwards`,
                }}
                className="nav-link"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Hamburger button — CSS controls display (none on desktop, flex on tablet/mobile) */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              alignItems:     'center',
              justifyContent: 'center',
              width:          '2.25rem',
              height:         '2.25rem',
              color:          'var(--fg)',
              flexShrink:     0,
            }}
          >
            {menuOpen ? (
              /* X icon */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
                <path d="M1 1H21M1 8H21M1 15H21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen overlay menu ───────────────── */}
      {menuOpen && (
        <div
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          99,
            background:      'var(--bg)',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'center',
            alignItems:      'flex-start',
            paddingLeft:     '1.5rem',
            paddingRight:    '1.5rem',
            paddingTop:      '5rem',
            paddingBottom:   '3rem',
            animation:       'fadeIn 0.22s ease forwards',
          }}
        >
          <nav
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '2.5rem',
              width:         '100%',
            }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily:    'var(--font-recoleta)',
                  fontSize:      'clamp(2rem, 8vw, 3rem)',
                  fontWeight:    400,
                  color:         'var(--fg)',
                  letterSpacing: '-0.02em',
                  lineHeight:    1,
                  opacity:       0,
                  animation:     `fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 60 + 40}ms forwards`,
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Footer hint */}
          <p
            style={{
              position:      'absolute',
              bottom:        '2.5rem',
              left:          '1.5rem',
              fontSize:      '0.75rem',
              color:         'var(--muted)',
              letterSpacing: '0.03em',
            }}
          >
            Product Designer
          </p>
        </div>
      )}
    </>
  )
}
