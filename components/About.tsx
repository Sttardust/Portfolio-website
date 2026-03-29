'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Data ────────────────────────────────────────────────── */
const EXPERIENCE = [
  { company: 'AiQEM Tech',            role: 'UI/UX & Graphic Designer',    years: '2023 — 2025' },
  { company: '10 Academy',            role: 'Part-time Design Accelerator', years: '2023 — 2024' },
  { company: 'Platform Technologies', role: 'UI/UX Designer',               years: '2022 — 2023' },
  { company: 'BeeZ Social ERP',       role: 'UI/UX Designer',               years: '2020 — 2021' },
]

const FREELANCE = [
  { company: 'Client TBD',  role: 'Brand Identity Design',    years: '2025' },
  { company: 'Client TBD',  role: 'Mobile App UX Audit',      years: '2024' },
  { company: 'Client TBD',  role: 'E-commerce UI Redesign',   years: '2023' },
]

const EDUCATION = [
  { company: 'Google / Coursera',                  role: 'UX Design Professional Certificate', years: '2021 — 2022' },
  { company: 'Addis Ababa Inst. of Technology',    role: 'BSc Chemical & Bio Engineering',     years: '2018' },
]

const PRINCIPLES = [
  {
    title: ['Curious,', 'yet Critical.'],
    body: 'Good design starts long before the first frame. I dig into the problem space, question assumptions, and let research lead — so every decision has a clear reason behind it.',
  },
  {
    title: ['Purpose over', 'Aesthetics.'],
    body: "A beautiful interface that confuses people is an expensive mistake. Every visual choice I make serves the user's goal first. Clarity and usability always come before style.",
  },
  {
    title: ['Details', 'Matter.'],
    body: 'The gap between good and great lives in the small things — the spacing, the micro-interaction, the edge case nobody planned for. I care about every pixel because users feel it.',
  },
]

/* ── Scroll-reveal hook ──────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Fire as soon as 2% of the element enters the viewport
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('about-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.02 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ── Helpers ─────────────────────────────────────────────── */
const PAD = 'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)'

// Shared easing curve
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function About() {
  const introRef = useReveal()
  const colsRef  = useReveal()

  return (
    <section
      id="about"
      style={{
        background:    'var(--bg)',
        paddingTop:    'clamp(5rem, 10vw, 9rem)',
        paddingBottom: 'clamp(5rem, 10vw, 9rem)',
      }}
    >

      {/* ── Bio intro block ───────────────────────────────── */}
      <div
        ref={introRef}
        className="about-intro"
        style={{ paddingLeft: PAD, paddingRight: PAD, maxWidth: '1536px', margin: '0 auto' }}
      >
        {/* Headline — full width */}
        <h2
          className="about-anim"
          style={{
            fontFamily:     'var(--font-recoleta)',
            fontSize:       'clamp(2rem, 4.5vw, 4rem)',
            fontWeight:     700,
            lineHeight:     1.1,
            letterSpacing:  '-0.02em',
            color:          'var(--fg)',
            width:          '100%',
            marginBottom:   '2.5rem',
            transition:     `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
            transitionDelay:'0ms',
          }}
        >
          I&apos;m Semere Seifu. UI/UX & Product Designer based in Addis Ababa, Ethiopia.
        </h2>

        {/* Bio paragraphs */}
        <div
          className="about-anim"
          style={{
            display:        'flex',
            flexDirection:  'column',
            gap:            '1.25rem',
            maxWidth:       '560px',
            marginBottom:   '2.5rem',
            transition:     `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
            transitionDelay:'100ms',
          }}
        >
          {[
            'I specialise in turning complex problems into clear, intuitive interfaces — working closely with product managers and developers from research all the way through to shipped product.',
            "My path into design wasn't linear. I studied Chemical and Bio Engineering before following my curiosity into UX. That engineering mindset still shapes how I work: methodically, systematically, and always with the end-user at the centre.",
            'I believe the best products emerge when research, empathy, and attention to detail are given equal weight alongside the visual craft.',
          ].map((p, i) => (
            <p key={i} style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--muted)' }}>
              {p}
            </p>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="mailto:semeredesigner@gmail.com"
          className="about-anim"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '0.4rem',
            fontSize:       '0.875rem',
            color:          'var(--fg)',
            letterSpacing:  '0.01em',
            marginBottom:   'clamp(3rem, 6vw, 5rem)',
            transition:     `opacity 0.8s ${EASE}, transform 0.8s ${EASE}, color 0.2s ease`,
            transitionDelay:'180ms',
          }}
        >
          Get in touch
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>

      {/* ── Two-column: Principles + Experience ─────────────── */}
      <div
        ref={colsRef}
        className="about-cols"
        style={{
          paddingLeft:  PAD,
          paddingRight: PAD,
          maxWidth:     '1536px',
          margin:       '0 auto',
          display:      'flex',
          gap:          'clamp(2rem, 5vw, 6rem)',
          paddingTop:   'clamp(2.5rem, 4vw, 4rem)',
        }}
      >

        {/* Left — Principles ───────────────────────────────── */}
        <div className="about-principles-col" style={{ flex: '0 0 42%', minWidth: 0 }}>

          <p
            className="about-anim"
            style={{
              fontSize:       '0.75rem',
              letterSpacing:  '0.08em',
              textTransform:  'uppercase',
              color:          'var(--muted)',
              marginBottom:   '2rem',
              transition:     `opacity 0.6s ease, transform 0.6s ease`,
              transitionDelay:'60ms',
            }}
          >
            Principles
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {PRINCIPLES.map(({ title, body }, i) => (
              <div
                key={i}
                className="about-anim"
                style={{
                  transition:     `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
                  transitionDelay:`${i * 100 + 120}ms`,
                }}
              >
                <h3
                  style={{
                    fontFamily:    'var(--font-recoleta)',
                    fontSize:      'clamp(1.5rem, 2.5vw, 2.25rem)',
                    fontWeight:    700,
                    lineHeight:    1.1,
                    letterSpacing: '-0.02em',
                    color:         'var(--fg)',
                    marginBottom:  '0.875rem',
                  }}
                >
                  {title[0]}<br />{title[1]}
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', maxWidth: '38ch' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Experience + Education ─────────────────── */}
        <div className="about-experience-col" style={{ flex: 1, minWidth: 0 }}>

          {/* Section label: Experience */}
          <p
            className="about-anim"
            style={{
              fontSize:       '0.75rem',
              letterSpacing:  '0.08em',
              textTransform:  'uppercase',
              color:          'var(--muted)',
              transition:     `opacity 0.6s ease, transform 0.6s ease`,
              transitionDelay:'60ms',
            }}
          >
            Experience
          </p>

          <div style={{ marginTop: '1.25rem' }}>
            {EXPERIENCE.map(({ company, role, years }, i) => (
              <div key={company}>
                <div
                  className="about-anim"
                  style={{
                    display:        'flex',
                    justifyContent: 'space-between',
                    alignItems:     'baseline',
                    paddingTop:     '1rem',
                    paddingBottom:  '1rem',
                    gap:            '1rem',
                    transition:     `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
                    transitionDelay:`${i * 70 + 100}ms`,
                  }}
                >
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--fg)' }}>{company}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--muted)', display: 'block', marginTop: '0.2rem' }}>{role}</span>
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{years}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border)' }} />
              </div>
            ))}
          </div>

          {/* Section label: Freelance */}
          <p
            className="about-anim"
            style={{
              fontSize:       '0.75rem',
              letterSpacing:  '0.08em',
              textTransform:  'uppercase',
              color:          'var(--muted)',
              marginTop:      '2.5rem',
              transition:     `opacity 0.6s ease, transform 0.6s ease`,
              transitionDelay:'280ms',
            }}
          >
            Freelance
          </p>

          <div style={{ marginTop: '1.25rem' }}>
            {FREELANCE.map(({ company, role, years }, i) => (
              <div key={`${company}-${i}`}>
                <div
                  className="about-anim"
                  style={{
                    display:        'flex',
                    justifyContent: 'space-between',
                    alignItems:     'baseline',
                    paddingTop:     '1rem',
                    paddingBottom:  '1rem',
                    gap:            '1rem',
                    transition:     `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
                    transitionDelay:`${i * 70 + 300}ms`,
                  }}
                >
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--fg)' }}>{role}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--muted)', display: 'block', marginTop: '0.2rem', fontStyle: 'italic' }}>
                      {company}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{years}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border)' }} />
              </div>
            ))}
          </div>

          {/* Section label: Education */}
          <p
            className="about-anim"
            style={{
              fontSize:       '0.75rem',
              letterSpacing:  '0.08em',
              textTransform:  'uppercase',
              color:          'var(--muted)',
              marginTop:      '2.5rem',
              transition:     `opacity 0.6s ease, transform 0.6s ease`,
              transitionDelay:'420ms',
            }}
          >
            Education
          </p>

          <div style={{ marginTop: '1.25rem' }}>
            {EDUCATION.map(({ company, role, years }, i) => (
              <div key={company}>
                <div
                  className="about-anim"
                  style={{
                    display:        'flex',
                    justifyContent: 'space-between',
                    alignItems:     'baseline',
                    paddingTop:     '1rem',
                    paddingBottom:  '1rem',
                    gap:            '1rem',
                    transition:     `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
                    transitionDelay:`${i * 70 + 480}ms`,
                  }}
                >
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--fg)' }}>{company}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--muted)', display: 'block', marginTop: '0.2rem' }}>{role}</span>
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{years}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border)' }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
