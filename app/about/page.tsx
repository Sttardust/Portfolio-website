'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
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

/* ── Photos ──────────────────────────────────────────────────────────────────
   To add a photo: drop the file in /public/about/ and set its `src` below.
   While `src` is empty, a styled placeholder shows — so the page never breaks
   and you can fill these in one at a time. Update `alt` to match each photo.
─────────────────────────────────────────────────────────────────────────── */
type Photo = { src: string; alt: string }

// Hero cover — recommended ≈2000px wide.  File: /public/about/cover.jpg
const COVER: Photo = { src: '/about/cover.jpg', alt: 'Semere walking among marabou storks in a park in Addis Ababa' }

/* ── Photo pair (two images per section) ─────────────────── */
const PLACEHOLDER_ICON = (tint: string) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" opacity={0.3} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={tint} strokeWidth="1.5"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill={tint}/>
    <path d="M21 15l-5-5L5 21" stroke={tint} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function PhotoPair({ photos, tint }: { photos: Photo[]; tint: string }) {
  return (
    <div className="ap-mosaic" style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap:                 '12px',
    }}>
      {[0, 1].map((i) => {
        const photo = photos[i]
        return (
          <div
            key={i}
            style={{
              position:       'relative',
              aspectRatio:    '4 / 5',
              borderRadius:   '4px',
              overflow:       'hidden',
              background:     `linear-gradient(135deg, ${tint}18 0%, ${tint}32 100%)`,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            {photo?.src
              ? <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1023px) 45vw, 340px" style={{ objectFit: 'cover' }} />
              : PLACEHOLDER_ICON(tint)}
          </div>
        )
      })}
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
      "Most of design is listening. I dig into research, map how people actually move through a product, and pay attention to the gap between what they say they want and what they really need.",
      "My engineering background shaped how I think. I work in an orderly way, with a reason behind each decision, and I stay involved end to end: discovery, wireframes, high-fidelity prototypes, and the design system that holds it together.",
      "The tools matter less than the thinking that happens before I open them.",
    ],
    // Files: /public/about/designer-1.jpg, /public/about/designer-2.jpg
    photos: [
      { src: '/about/designer-1.jpg', alt: "Semere's design workspace, with a landing page and Photoshop open" },
      { src: '/about/designer-2.jpg', alt: 'A hand-sketched UI wireframe' },
    ] as Photo[],
    tint:   '#1E3A5F',
    flip:   false,
  },
  {
    id:      'petowner',
    heading: "I'm a Pet Owner.",
    body: [
      "I have two dogs and a cat at home, and between them they run the place. None of them care about kerning or conversion rates, which keeps me honest.",
      "Looking after them is decent training for the job: patience, reading body language, and noticing what someone needs before they can say it.",
      "They keep me company through most of my work. The feedback is mostly barking and the odd walk across the keyboard, but I'll take it.",
    ],
    // Files: /public/about/pet-1.jpg, /public/about/pet-2.jpg
    photos: [
      { src: '/about/pet-1.jpg', alt: 'Semere greeting one of his dogs in the sun' },
      { src: '/about/pet-2.jpg', alt: 'One of the dogs resting next to the cat at home' },
    ] as Photo[],
    tint:   '#92400E',
    flip:   true,
  },
  {
    id:      'life',
    heading: "This is my life.",
    body: [
      "I'm from Addis Ababa, a city that moves fast, builds fast, and makes some of the best coffee anywhere. Growing up here shaped how I see contrast, texture, and the quiet appeal of things that simply work.",
      "Away from the screen I hike, read, follow football a little too closely, and hold firm opinions about coffee-to-water ratios. I also buy notebooks far faster than I finish them.",
      "The best designers I know spend a good amount of their time living outside their screens.",
    ],
    // Files: /public/about/life-1.jpg, /public/about/life-2.jpg
    photos: [
      { src: '/about/life-1.jpg', alt: 'Semere pouring coffee at a traditional Ethiopian coffee ceremony' },
      { src: '/about/life-2.jpg', alt: 'A cup of Ethiopian coffee' },
    ] as Photo[],
    tint:   '#065F46',
    flip:   false,
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

          {/* Hero cover */}
          <Reveal delay={80}>
            <div className="ap-hero-img" style={{
              position:     'relative',
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
              {COVER.src ? (
                <Image
                  src={COVER.src}
                  alt={COVER.alt}
                  fill
                  priority
                  sizes="(min-width: 1400px) 1400px, 100vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
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
              )}
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
              Also known as Semere
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {[
                'I take complex problems and turn them into clear, usable interfaces. I work closely with product managers and developers, from the first round of research through to launch.',
                "My route into design wasn't a straight line. I studied Chemical and Bio Engineering before moving into UX, and that background still shapes how I work: carefully, with a reason behind every decision and the user kept at the centre.",
                'The best products come from giving research, empathy, and the small details as much weight as the visual craft.',
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
      {SECTIONS.map(({ id, heading, body, photos, tint, flip }) => (
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
            {/* Image pair */}
            <Reveal delay={60}>
              <div style={{ direction: 'ltr' }}>
                <PhotoPair photos={photos} tint={tint} />
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
            className="ap-cta-link"
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
