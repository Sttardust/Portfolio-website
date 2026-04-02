'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
]

const CASE_STUDIES = [
  { label: 'Novalut Fintech App',      href: '/novalut' },
  { label: 'AiQEM AdTech Dashboard',   href: '/aiqem'   },
  { label: 'FEMA LMS',                 href: '/fema'    },
  { label: 'Cache Menu App',           href: '/cache'   },
]

export default function Nav() {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [dropdownOpen,   setDropdownOpen]   = useState(false)
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false)
  const [copied,         setCopied]         = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('semeredesigner@gmail.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

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

  /* ── Escape key closes menus ─────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setDropdownOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ── Click outside closes dropdown ──────────────────── */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  /* ── Close menu on route change ─────────────────────── */
  useEffect(() => { setMenuOpen(false); setDropdownOpen(false) }, [pathname])

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
            justifyContent: pathname === '/' ? 'flex-end' : 'space-between',
          }}
        >
          {/* Logo — shown on all pages except homepage */}
          {pathname !== '/' && (
            <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <img
                src="/logo.svg"
                alt="Smre. — Home"
                style={{ height: '22px', width: 'auto', display: 'block' }}
              />
            </Link>
          )}

          {/* Desktop links */}
          <nav
            className="nav-desktop-links"
            style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}
          >
            {/* Case Studies dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                style={{
                  fontSize:      '0.82rem',
                  fontWeight:    400,
                  color:         'var(--fg)',
                  letterSpacing: '0.01em',
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '0.3rem',
                  opacity:       0,
                  animation:     'slideDown 0.5s ease 100ms forwards',
                  cursor:        'pointer',
                  background:    'none',
                  border:        'none',
                  padding:       0,
                }}
                className="nav-link"
                aria-expanded={dropdownOpen}
              >
                Case Studies
                <svg
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                  style={{ transition: 'transform 0.2s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div style={{
                  position:     'absolute',
                  top:          'calc(100% + 0.75rem)',
                  left:         0,
                  background:   'rgba(248,245,241,0.98)',
                  backdropFilter: 'blur(12px)',
                  border:       '1px solid var(--border)',
                  borderRadius: '8px',
                  padding:      '0.5rem',
                  minWidth:     '220px',
                  boxShadow:    '0 8px 32px rgba(6,13,25,0.08)',
                  animation:    'fadeIn 0.18s ease forwards',
                  zIndex:       101,
                }}>
                  {CASE_STUDIES.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      style={{
                        display:      'block',
                        padding:      '0.6rem 0.875rem',
                        fontSize:     '0.8125rem',
                        fontWeight:   400,
                        color:        'var(--fg)',
                        borderRadius: '5px',
                        transition:   'background 0.15s ease',
                        whiteSpace:   'nowrap',
                      }}
                      className="nav-dropdown-item"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Regular links */}
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
                  animation:     `slideDown 0.5s ease ${(i + 1) * 60 + 100}ms forwards`,
                }}
                className="nav-link"
              >
                {label}
              </Link>
            ))}

            {/* Resume download */}
            <a
              href="/semere-seifu-resume.pdf"
              download
              style={{
                fontSize:      '0.82rem',
                fontWeight:    400,
                color:         'var(--muted)',
                letterSpacing: '0.01em',
                opacity:       0,
                animation:     'slideDown 0.5s ease 200ms forwards',
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '0.3rem',
                transition:    'color 0.2s ease',
              }}
              className="nav-link"
            >
              Résumé
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v6M2 7l3 3 3-3M1 9h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Spacer + Get in touch button */}
            <div style={{ width: '1px', height: '1.1rem', background: 'var(--border)', opacity: 0, animation: 'slideDown 0.5s ease 240ms forwards' }} />
            <button
              onClick={copyEmail}
              className="nav-cta-btn"
              style={{
                fontSize:      '0.82rem',
                fontWeight:    500,
                letterSpacing: '0.01em',
                color:         copied ? 'var(--bg)' : 'var(--fg)',
                background:    copied ? 'var(--fg)' : 'transparent',
                border:        '1px solid var(--fg)',
                borderRadius:  '100px',
                padding:       '0.4rem 1rem',
                cursor:        'pointer',
                transition:    'background 0.2s ease, color 0.2s ease',
                opacity:       0,
                animation:     'slideDown 0.5s ease 260ms forwards',
                whiteSpace:    'nowrap',
              }}
            >
              {copied ? 'Copied!' : 'Get in touch'}
            </button>
          </nav>

          {/* Hamburger */}
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            ) : (
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
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}>

            {/* Case Studies accordion */}
            <div>
              <button
                onClick={() => setMobileWorkOpen(o => !o)}
                style={{
                  fontFamily:    'var(--font-recoleta)',
                  fontSize:      'clamp(2rem, 8vw, 3rem)',
                  fontWeight:    400,
                  color:         'var(--fg)',
                  letterSpacing: '-0.02em',
                  lineHeight:    1,
                  opacity:       0,
                  animation:     'fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) 40ms forwards',
                  background:    'none',
                  border:        'none',
                  padding:       0,
                  cursor:        'pointer',
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '0.5rem',
                }}
              >
                Case Studies
                <svg
                  width="14" height="9" viewBox="0 0 10 6" fill="none"
                  style={{ transition: 'transform 0.2s ease', transform: mobileWorkOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {mobileWorkOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.25rem', paddingLeft: '1rem' }}>
                  {CASE_STUDIES.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontSize:   '1rem',
                        fontWeight: 400,
                        color:      'var(--muted)',
                        lineHeight: 1.3,
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Regular links */}
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
                  animation:     `fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) ${(i + 1) * 60 + 40}ms forwards`,
                }}
              >
                {label}
              </Link>
            ))}

            {/* Get in touch */}
            <button
              onClick={() => { copyEmail(); setMenuOpen(false) }}
              style={{
                fontFamily:    'var(--font-recoleta)',
                fontSize:      'clamp(2rem, 8vw, 3rem)',
                fontWeight:    400,
                color:         'var(--fg)',
                letterSpacing: '-0.02em',
                lineHeight:    1,
                opacity:       0,
                animation:     `fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) ${(NAV_LINKS.length + 1) * 60 + 40}ms forwards`,
                background:    'none',
                border:        'none',
                padding:       0,
                cursor:        'pointer',
                textAlign:     'left',
              }}
            >
              {copied ? 'Copied!' : 'Get in touch'}
            </button>
          </nav>

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
