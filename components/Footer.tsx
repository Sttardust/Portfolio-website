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
  '#EAB308','#22C55E','#3B82F6','#EF4444',
  '#14B8A6','#D946EF','#F97316','#C2955D',
]

/* ── Animated grid ───────────────────────────────────────── */
function GlyphGrid() {
  const [lit, setLit] = useState<Map<number, string>>(new Map())

  const cycle = useCallback(() => {
    const indices = new Set<number>()
    while (indices.size < 8) indices.add(Math.floor(Math.random() * ALL_CHARS.length))
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5)
    const next = new Map<number, string>()
    let ci = 0
    for (const idx of indices) next.set(idx, shuffled[ci++])
    setLit(next)
  }, [])

  useEffect(() => {
    let clearId: ReturnType<typeof setTimeout>
    const tick = () => {
      cycle()
      clearId = setTimeout(() => setLit(new Map()), 900)
    }
    tick()
    const intervalId = setInterval(tick, 1500)
    return () => { clearInterval(intervalId); clearTimeout(clearId) }
  }, [cycle])

  return (
    <div
      aria-hidden
      style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(20, 1fr)',
        gap:                 '1.2rem',
      }}
    >
      {ALL_CHARS.map((c, i) => {
        const color = lit.get(i)
        return (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-recoleta)',
              fontSize:   'clamp(1.7rem, 4vw, 3rem)',
              lineHeight: 1,
              textAlign:  'center',
              userSelect: 'none',
              display:    'block',
              color:      color ?? '#313642',
              opacity:    1,
              transition: 'color 0.25s ease, opacity 0.25s ease',
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

        {/* Left — branding */}
        <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <p style={{
              fontSize:      '0.7rem',
              fontWeight:    400,
              color:         'var(--dark-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom:  '0.35rem',
            }}>
              design
            </p>
            <p style={{
              fontFamily:    'var(--font-recoleta)',
              fontSize:      'clamp(1.4rem, 2.2vw, 1.875rem)',
              fontWeight:    700,
              color:         '#ffffff',
              lineHeight:    1.2,
              letterSpacing: '-0.01em',
            }}>
              by semere
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

          <div>
            <Link href="mailto:semeredesigner@gmail.com" className="footer-link">Get in touch →</Link>
          </div>

          <div className="footer-year" style={{ fontSize: '0.875rem', color: 'var(--dark-muted)', opacity: 0.5, lineHeight: 1.65 }}>
            <p>© {new Date().getFullYear()} · Made with a lot of typing and planning in Addis Ababa, Ethiopia.</p>
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
