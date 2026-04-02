'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

/* ── Glyph data (4 rows × 20 = 80 chars) ─────────────────── */
const ALL_CHARS = [
  // row 1
  'ሀ','ለ','ሐ','ሠ','ረ','ሰ','ሸ','ቀ','ቐ','በ','ቨ','ተ','ቸ','ኀ','ነ','ኘ','አ','ከ','ኸ','ወ',
  // row 2
  'ዐ','ዘ','ዠ','የ','ደ','ዸ','ጀ','ጐ','ጠ','ጨ','ጰ','ጸ','ፀ','ፈ','ፐ','ሁ','ሉ','ሑ','ሙ','ሡ',
  // row 3
  'ሩ','ሱ','ሹ','ቁ','ቑ','ቡ','ቩ','ቱ','ቹ','ኁ','ኑ','ኙ','ኡ','ኩ','ኹ','ዉ','ዙ','ዡ','ዩ','ዱ',
  // row 4
  'ዹ','ጁ','ጡ','ጩ','ጱ','ጹ','ፁ','ፉ','ፑ','ሂ','ሊ','ሒ','ሚ','ሢ','ሪ','ሲ','ሺ','ቂ','ቒ','ቢ',
]

const COLORS = [
  '#EAB308', // yellow
  '#22C55E', // green
  '#3B82F6', // blue
  '#EF4444', // red
  '#14B8A6', // teal
  '#D946EF', // magenta
  '#F97316', // orange
  '#C2955D', // wood
]

/* ── Animated grid ───────────────────────────────────────── */
function GlyphGrid() {
  // Map of char-index → color string
  const [lit, setLit] = useState<Map<number, string>>(new Map())

  const cycle = useCallback(() => {
    // Pick 8 unique random indices
    const indices = new Set<number>()
    while (indices.size < 8) {
      indices.add(Math.floor(Math.random() * ALL_CHARS.length))
    }
    // Shuffle colors so each lit char gets a different one
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5)
    const next = new Map<number, string>()
    let ci = 0
    for (const idx of indices) next.set(idx, shuffled[ci++])
    setLit(next)
  }, [])

  useEffect(() => {
    let clearId: ReturnType<typeof setTimeout>

    const tick = () => {
      cycle()                                          // light up 8 glyphs
      clearId = setTimeout(() => setLit(new Map()), 900) // dim them after 900 ms
    }

    tick()
    const intervalId = setInterval(tick, 1500)         // new batch every 1.5 s
    return () => { clearInterval(intervalId); clearTimeout(clearId) }
  }, [cycle])

  return (
    <div
      aria-hidden
      style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(20, 1fr)',
        gap:                 '1.2rem',   /* 0.8rem + half (0.4rem) = 1.2rem */
      }}
    >
      {ALL_CHARS.map((c, i) => {
        const color = lit.get(i)
        return (
          <span
            key={i}
            style={{
              fontFamily:  'var(--font-recoleta)',
              fontSize:    'clamp(1.7rem, 4vw, 3rem)',   /* 2× the original clamp */
              lineHeight:  1,
              textAlign:   'center',
              userSelect:  'none',
              display:     'block',
              color:       color ?? '#313642',
              opacity:     1,
              transition:  'color 0.25s ease, opacity 0.25s ease',
            }}
          >
            {c}
          </span>
        )
      })}
    </div>
  )
}

/* ── Link data ───────────────────────────────────────────── */
const WORK_LINKS = [
  { label: 'Novalut Fintech App',    href: '/novalut' },
  { label: 'AiQEM AdTech Dashboard', href: '/aiqem'   },
  { label: 'FEMA LMS',               href: '/fema'    },
  { label: 'Cache Menu App',         href: '/cache'   },
]

const CONTACT_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/semere-seifu-stardust', external: true  },
  { label: 'Behance',  href: 'https://www.behance.net/semereseifu',                external: true  },
  { label: 'Telegram', href: 'https://t.me/Pipsquick',                             external: true  },
  { label: 'Résumé',   href: '/semere-seifu-resume.pdf',                           external: false, download: true },
]

const PAD = 'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)'

/* ── Brand logos ─────────────────────────────────────────── */

// Claude — official logo
function ClaudeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15" height="15"
      viewBox="0 0 512 509.64"
      aria-label="Claude" role="img"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      shapeRendering="geometricPrecision"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path fill="#D77655" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/>
      <path fill="#FCF2EE" fillRule="nonzero" d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"/>
    </svg>
  )
}

// Figma — official logo geometry
function FigmaLogo() {
  return (
    <svg
      width="10" height="15" viewBox="0 0 32 48" fill="none"
      aria-label="Figma" role="img"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      {/* bottom-left: green */}
      <path d="M8 48C12.4 48 16 44.4 16 40V32H8C3.6 32 0 35.6 0 40S3.6 48 8 48Z" fill="#0ACF83"/>
      {/* middle-left: purple */}
      <path d="M0 24C0 19.6 3.6 16 8 16H16V32H8C3.6 32 0 28.4 0 24Z" fill="#A259FF"/>
      {/* top-left: red */}
      <path d="M0 8C0 3.6 3.6 0 8 0H16V16H8C3.6 16 0 12.4 0 8Z" fill="#F24E1E"/>
      {/* top-right: salmon */}
      <path d="M16 0H24C28.4 0 32 3.6 32 8S28.4 16 24 16H16V0Z" fill="#FF7262"/>
      {/* middle-right: blue circle */}
      <path d="M32 24C32 28.4 28.4 32 24 32S16 28.4 16 24 19.6 16 24 16 32 19.6 32 24Z" fill="#1ABCFE"/>
    </svg>
  )
}

/* ── Footer ──────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark-bg)' }}>

      {/* ── Glyph grid ──────────────────────────────────── */}
      <div
        className="footer-glyph-wrap"
        style={{
          paddingTop:   'clamp(3rem, 6vw, 5rem)',
          paddingLeft:  PAD,
          paddingRight: PAD,
          maxWidth:     '1536px',
          margin:       '0 auto',
        }}
      >
        <GlyphGrid />
      </div>

      {/* ── Bottom bar ──────────────────────────────────── */}
      <div
        className="footer-bottom footer-bottom-bar"
        style={{
          maxWidth:       '1536px',
          margin:         '0 auto',
          paddingLeft:    PAD,
          paddingRight:   PAD,
          paddingTop:     'clamp(5rem, 8vw, 7rem)',
          paddingBottom:  'clamp(2.5rem, 4vw, 3.5rem)',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          flexWrap:       'wrap',
          gap:            '3rem',
        }}
      >

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <p style={{
              fontFamily:    'var(--font-recoleta)',
              fontSize:      'clamp(1.4rem, 2.2vw, 1.875rem)',
              fontWeight:    700,
              color:         '#ffffff',
              lineHeight:    1.2,
              letterSpacing: '-0.01em',
            }}>
              Semere<br />Seifu.
            </p>
            <p style={{
              marginTop:  '0.6rem',
              fontSize:   '1rem',
              color:      'var(--dark-muted)',
              lineHeight: 1.65,
              maxWidth:   '26ch',
            }}>
              Turning complexity into simple,<br />
              usable products — one decision at a time.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/#about"                         className="footer-link">About Me →</Link>
            <Link href="mailto:semeredesigner@gmail.com" className="footer-link">Get in touch →</Link>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--dark-muted)', opacity: 0.5, lineHeight: 1.65 }}>
            <p>© {new Date().getFullYear()} · Made with a lot of typing and planning in Addis Ababa, Ethiopia.</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
              Crafted by <ClaudeLogo /> <FigmaLogo />
            </p>
          </div>
        </div>

        {/* Right — Work + Contact */}
        <div
          className="footer-nav-columns"
          style={{ display: 'flex', gap: 'clamp(2.5rem, 5vw, 5rem)', alignItems: 'flex-start' }}
        >
          <div>
            <p className="footer-col-label" style={{ marginBottom: '1rem' }}>Work</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
              {WORK_LINKS.map(({ label, href }) => (
                <Link key={label} href={href} className="footer-nav-link">{label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="footer-col-label" style={{ marginBottom: '1rem' }}>Contact</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
              {CONTACT_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="footer-nav-link"
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  download={'download' in item && item.download ? true : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

      </div>
    </footer>
  )
}
