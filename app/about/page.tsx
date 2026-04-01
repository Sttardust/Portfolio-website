'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Constants ───────────────────────────────────────────── */
const PAD  = 'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)'
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/* ── Scroll-reveal ───────────────────────────────────────── */
function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.95) {
      el.classList.add('ap-visible')
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('ap-visible'); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="ap-anim" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── Photo mosaic placeholder ────────────────────────────── */
const MOSAIC_LAYOUTS = [
  // Layout A: 2 tall left, 3 stacked right
  [
    { gridColumn: '1', gridRow: '1 / 3', aspectRatio: '3/4' },
    { gridColumn: '2', gridRow: '1 / 3', aspectRatio: '3/4' },
    { gridColumn: '3', gridRow: '1',     aspectRatio: '4/3' },
    { gridColumn: '3', gridRow: '2',     aspectRatio: '4/3' },
  ],
  // Layout B: wide top, 3 bottom
  [
    { gridColumn: '1 / 3', gridRow: '1', aspectRatio: '16/9' },
    { gridColumn: '3',     gridRow: '1', aspectRatio: '4/3'  },
    { gridColumn: '1',     gridRow: '2', aspectRatio: '4/3'  },
    { gridColumn: '2',     gridRow: '2', aspectRatio: '4/3'  },
    { gridColumn: '3',     gridRow: '2', aspectRatio: '4/3'  },
  ],
  // Layout C: 3 top, wide bottom
  [
    { gridColumn: '1',     gridRow: '1', aspectRatio: '4/3'  },
    { gridColumn: '2',     gridRow: '1', aspectRatio: '4/3'  },
    { gridColumn: '3',     gridRow: '1', aspectRatio: '4/3'  },
    { gridColumn: '1 / 3', gridRow: '2', aspectRatio: '16/9' },
    { gridColumn: '3',     gridRow: '2', aspectRatio: '4/3'  },
  ],
]

function PhotoMosaic({ index = 0, tint = '#5d6067' }: { index?: number; tint?: string }) {
  const layout = MOSAIC_LAYOUTS[index % MOSAIC_LAYOUTS.length]
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap:                 '6px',
    }}>
      {layout.map((cell, i) => (
        <div
          key={i}
          style={{
            gridColumn:  cell.gridColumn,
            gridRow:     cell.gridRow,
            aspectRatio: cell.aspectRatio,
            background:  `linear-gradient(135deg, ${tint}18 0%, ${tint}32 100%)`,
            borderRadius:'4px',
            display:     'flex',
            alignItems:  'center',
            justifyContent:'center',
            overflow:    'hidden',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" opacity={0.3}>
            <rect x="3" y="3" width="18" height="18" rx="2" stroke={tint} strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill={tint}/>
            <path d="M21 15l-5-5L5 21" stroke={tint} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ))}
    </div>
  )
}

/* ── Stats ───────────────────────────────────────────────── */
const STATS = [
  { num: '5+',  label: 'Years of Experience' },
  { num: '20+', label: 'Projects Shipped'    },
  { num: '4',   label: 'Companies'           },
  { num: '3',   label: 'Industries'          },
]

/* ── Sections ────────────────────────────────────────────── */
const SECTIONS = [
  {
    id:      'designer',
    heading: "I'm a Designer.",
    body: [
      "Design, for me, is a discipline of listening. I dig into research, map user journeys, and obsess over the gap between what people say they want and what they actually need.",
      "My background in engineering shaped how I think — methodically, systematically, always with a reason behind every decision. I work end-to-end: from discovery and wireframes all the way through to high-fidelity prototypes and design systems.",
      "Tools are just tools. What I care about is the thinking that comes before them.",
    ],
    mosaic: 0,
    tint:   '#1E3A5F',
    flip:   false,
  },
  {
    id:      'creative',
    heading: "I'm a Creative.",
    body: [
      "Design bleeds into everything. I sketch, make moodboards, obsess over type pairings, and spend embarrassing amounts of time in museums and on Behance at 2am.",
      "I draw inspiration from architecture, editorial design, and film — the way a composition can guide your eye without you noticing it is the same magic I chase in every interface I build.",
      "Creativity isn't a switch I turn on for work. It's just how I see the world.",
    ],
    mosaic: 1,
    tint:   '#4C1D95',
    flip:   true,
  },
  {
    id:      'petowner',
    heading: "I'm a Pet Owner.",
    body: [
      "My dog is genuinely the most important stakeholder in my life. He doesn't care about kerning or conversion rates, and honestly that's very grounding.",
      "Pet ownership teaches you patience, empathy, and the ability to read non-verbal cues — all skills that transfer surprisingly well to UX research.",
      "He also sits next to me during every design critique. His feedback is mostly barking, but the energy is constructive.",
    ],
    mosaic: 2,
    tint:   '#92400E',
    flip:   false,
  },
  {
    id:      'life',
    heading: "This is my life.",
    body: [
      "I'm from Addis Ababa — a city that moves fast, builds fast, and has some of the best coffee on earth. Growing up here shaped my eye for contrast, texture, and the beauty in functional things.",
      "Outside of pixels I hike, read, follow football too closely, and have strong opinions about coffee-to-water ratios. I'm also a chronic notebook buyer who rarely finishes notebooks.",
      "I believe the fullest designers are the ones who live outside their screens.",
    ],
    mosaic: 0,
    tint:   '#065F46',
    flip:   true,
  },
]

/* ═══════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <div className="ap-page">
      {/* ── Global styles for this page ─────────────────── */}
      <style>{`
        .ap-anim {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.75s ${EASE}, transform 0.75s ${EASE};
        }
        .ap-anim.ap-visible {
          opacity: 1;
          transform: none;
        }
      `}</style>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section style={{
        background:    'var(--bg)',
        paddingTop:    'clamp(7rem, 10vw, 9rem)',
        paddingLeft:   PAD,
        paddingRight:  PAD,
        paddingBottom: 0,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* Name + meta */}
          <Reveal>
            <h1 style={{
              fontFamily:    'var(--font-recoleta)',
              fontSize:      'clamp(1.25rem, 3vw, 2.75rem)',
              fontWeight:    700,
              letterSpacing: '-0.03em',
              lineHeight:    1.0,
              color:         'var(--fg)',
              marginBottom:  '1rem',
            }}>
              Semere Seifu
            </h1>
            <p style={{
              fontSize:   '1rem',
              color:      'var(--muted)',
              lineHeight: 1.6,
              marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
            }}>
              UI/UX & Product Designer · Addis Ababa, Ethiopia
            </p>
          </Reveal>

          {/* Hero image placeholder */}
          <Reveal delay={80}>
            <div style={{
              width:        '100%',
              aspectRatio:  '21 / 9',
              borderRadius: '6px',
              overflow:     'hidden',
              background:   'linear-gradient(160deg, #5d606718 0%, #5d606732 100%)',
              display:      'flex',
              alignItems:   'center',
              justifyContent:'center',
              marginBottom: 0,
            }}>
              <p style={{
                fontSize:      '0.6875rem',
                fontWeight:    700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         'var(--muted)',
                opacity:       0.5,
              }}>
                Cover photo coming soon
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATEMENT + BIO
      ══════════════════════════════════════════════════ */}
      <section style={{
        background:    'var(--bg)',
        paddingTop:    'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(4rem, 7vw, 7rem)',
        paddingLeft:   PAD,
        paddingRight:  PAD,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin:   '0 auto',
          display:  'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:      'clamp(3rem, 6vw, 8rem)',
          alignItems:'start',
        }}
          className="ap-statement-grid"
        >
          {/* Left: big editorial statement */}
          <Reveal>
            <h2 style={{
              fontFamily:    'var(--font-recoleta)',
              fontSize:      'clamp(2rem, 4vw, 3.75rem)',
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: '-0.025em',
              color:         'var(--fg)',
            }}>
              Ethiopian.<br />
              Product Designer.<br />
              Detail-obsessed<br />
              problem solver.
            </h2>
          </Reveal>

          {/* Right: bio + CTA */}
          <Reveal delay={100}>
            <p style={{
              fontSize:      '0.6875rem',
              fontWeight:    700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         'var(--muted)',
              marginBottom:  '1.5rem',
            }}>
              — Also known as Semere
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {[
                'I specialise in turning complex problems into clear, intuitive interfaces — working closely with product managers and developers from research all the way through to shipped product.',
                "My path into design wasn't linear. I studied Chemical and Bio Engineering before following my curiosity into UX. That engineering mindset still shapes how I work: methodically, systematically, and always with the end-user at the centre.",
                'I believe the best products emerge when research, empathy, and attention to detail are given equal weight alongside the visual craft.',
              ].map((p, i) => (
                <p key={i} style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
            <Link
              href="mailto:semeredesigner@gmail.com"
              style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        '0.4rem',
                fontSize:   '0.875rem',
                fontWeight: 500,
                color:      'var(--fg)',
              }}
            >
              Get in touch
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS ROW
      ══════════════════════════════════════════════════ */}
      <section style={{
        background:    'var(--bg)',
        paddingTop:    'clamp(3rem, 5vw, 5rem)',
        paddingBottom: 'clamp(3rem, 5vw, 5rem)',
        paddingLeft:   PAD,
        paddingRight:  PAD,
      }}>
        <div style={{
          maxWidth:            '1400px',
          margin:              '0 auto',
          display:             'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap:                 '2rem',
        }}
          className="ap-stats-grid"
        >
          {STATS.map(({ num, label }, i) => (
            <Reveal key={label} delay={i * 60}>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily:    'var(--font-recoleta)',
                  fontSize:      'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight:    700,
                  color:         'var(--fg)',
                  lineHeight:    1,
                  marginBottom:  '0.5rem',
                }}>
                  {num}
                </p>
                <p style={{
                  fontSize:      '0.6875rem',
                  fontWeight:    600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         'var(--muted)',
                  margin:        0,
                }}>
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PERSONAL SECTIONS
      ══════════════════════════════════════════════════ */}
      {SECTIONS.map(({ id, heading, body, mosaic, tint, flip }) => (
        <section
          key={id}
          style={{
            background:    'var(--bg)',
            paddingTop:    'clamp(5rem, 9vw, 9rem)',
            paddingBottom: 'clamp(5rem, 9vw, 9rem)',
            paddingLeft:   PAD,
            paddingRight:  PAD,
          }}
        >
          <div style={{
            maxWidth:            '1400px',
            margin:              '0 auto',
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 'clamp(3rem, 6vw, 7rem)',
            alignItems:          'center',
            direction:           flip ? 'rtl' : 'ltr',
          }}
            className="ap-section-grid"
          >
            {/* Image mosaic */}
            <Reveal delay={60}>
              <div style={{ direction: 'ltr' }}>
                <PhotoMosaic index={mosaic} tint={tint} />
              </div>
            </Reveal>

            {/* Text */}
            <Reveal delay={120}>
              <div style={{ direction: 'ltr' }}>
                <h2 style={{
                  fontFamily:    'var(--font-recoleta)',
                  fontSize:      'clamp(2rem, 3.5vw, 3.5rem)',
                  fontWeight:    700,
                  lineHeight:    1.05,
                  letterSpacing: '-0.025em',
                  color:         'var(--fg)',
                  marginBottom:  '1.75rem',
                }}>
                  {heading}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {body.map((p, i) => (
                    <p key={i} style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ══════════════════════════════════════════════════
          CTA FOOTER STRIP
      ══════════════════════════════════════════════════ */}
      <section style={{
        background:    'var(--fg)',
        paddingTop:    'clamp(5rem, 8vw, 8rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
        paddingLeft:   PAD,
        paddingRight:  PAD,
        textAlign:     'center',
      }}>
        <Reveal>
          <p style={{
            fontSize:      '0.6875rem',
            fontWeight:    700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'rgba(248,245,241,0.4)',
            marginBottom:  '1.5rem',
          }}>
            Let&apos;s work together
          </p>
          <h2 style={{
            fontFamily:    'var(--font-recoleta)',
            fontSize:      'clamp(2rem, 5vw, 4.5rem)',
            fontWeight:    700,
            lineHeight:    1.1,
            letterSpacing: '-0.025em',
            color:         'var(--dark-fg)',
            marginBottom:  '2.5rem',
            maxWidth:      '18ch',
            margin:        '0 auto 2.5rem',
          }}>
            Have a project in mind?
          </h2>
          <Link
            href="mailto:semeredesigner@gmail.com"
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '0.5rem',
              fontSize:      '0.875rem',
              fontWeight:    600,
              letterSpacing: '0.04em',
              color:         'var(--fg)',
              background:    'var(--dark-fg)',
              padding:       '0.875rem 2rem',
              borderRadius:  '100px',
            }}
          >
            semeredesigner@gmail.com
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
