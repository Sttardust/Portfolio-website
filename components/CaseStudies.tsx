'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Project data ────────────────────────────────────────────
const PROJECTS = [
  {
    id:          '01',
    title:       'Novalut',
    description: 'A full-featured neo-banking app for Ethiopians worldwide — covering 14 product modules from onboarding and core banking to merchant tools, FX, and AI-assisted lending. Designed for four radically different user personas with one coherent system.',
    role:        'UX Designer (Solo)',
    timeline:    '2025 — 2026',
    slug:        'novalut',
    chromeBg:    'rgba(0,0,0,0.4)',
    imgBg:       'linear-gradient(160deg, #070A13 0%, #0E1220 30%, #14182A 55%, #1E2B4A 80%, #1E3A5F 100%)',
    dark:        true,
    shapes: [
      [30, 10, 40, 60, 0.08],
      [10, 15, 20, 40, 0.07],
      [62, 15, 26, 40, 0.07],
      [10, 60, 80, 5,  0.12],
      [10, 70, 55, 4,  0.09],
    ],
  },
  {
    id:          '02',
    title:       'AiQEM AdTech',
    description: 'An end-to-end advertising analytics dashboard for AiQEM Tech — surfacing five core data types across a modular interface for two distinct user types, built to eliminate the need for manual reporting entirely.',
    role:        'UX Designer (Solo)',
    timeline:    '2023 — 2025',
    slug:        'aiqem',
    chromeBg:    'rgba(255,255,255,0.07)',
    imgBg:       'linear-gradient(160deg, #1E0459 0%, #3B0764 25%, #4C1D95 55%, #5B21B6 80%, #6D28D9 100%)',
    dark:        true,
    shapes: [
      [4,  16, 18, 55, 0.12],
      [26, 16, 70, 22, 0.10],
      [26, 42, 33, 8,  0.10],
      [62, 42, 34, 8,  0.10],
      [26, 55, 70, 14, 0.08],
    ],
  },
  {
    id:          '03',
    title:       'FEMA LMS',
    description: 'A mobile learning management system built from scratch for Ethiopian students — serving four distinct user types (student, teacher, parent, admin) in one cohesive bilingual platform. Designed in 7 weeks at the 10 Academy Accelerator.',
    role:        'UX Designer (Solo)',
    timeline:    '2023 — 2024',
    slug:        'fema',
    chromeBg:    'rgba(255,255,255,0.09)',
    imgBg:       'linear-gradient(160deg, #022C22 0%, #065F46 40%, #0F766E 70%, #14B8A6 100%)',
    dark:        true,
    shapes: [
      [28, 12, 44, 62, 0.09],
      [8,  14, 17, 55, 0.08],
      [75, 14, 17, 55, 0.08],
      [8,  72, 84, 5,  0.12],
      [8,  80, 60, 4,  0.09],
    ],
  },
  {
    id:          '04',
    title:       'Cache',
    description: 'A digital room service and food ordering system for Ethiopian hotels — replacing paper menus, phone calls, and cash-only payment with a seamless mobile experience. Shipped before a competitor entered the market.',
    role:        'UX Designer',
    timeline:    '2022 — 2023',
    slug:        'cache',
    chromeBg:    'rgba(0,0,0,0.35)',
    imgBg:       'linear-gradient(160deg, #1C0A00 0%, #451A03 30%, #78350F 60%, #92400E 80%, #B45309 100%)',
    dark:        true,
    shapes: [
      [30, 10, 40, 60, 0.09],
      [10, 14, 17, 55, 0.08],
      [73, 14, 17, 55, 0.08],
      [10, 72, 80, 5,  0.13],
      [10, 80, 56, 4,  0.10],
    ],
  },
]

// ── Section ─────────────────────────────────────────────────
export default function CaseStudies() {
  return (
    <section
      id="work"
      style={{
        background:  'var(--bg)',
        paddingTop:  'clamp(5rem, 8vw, 8rem)',   // 2× card vertical padding
      }}
    >
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  )
}

// ── Card ────────────────────────────────────────────────────
type Project = (typeof PROJECTS)[number]

function ProjectCard({ project }: { project: Project }) {
  const cardRef   = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    // Reveal immediately if already visible on mount (first card)
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('cs-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('cs-visible') },
      { threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const shapeColor = project.dark ? 'rgba(255,255,255,' : 'rgba(0,0,0,'

  return (
    <article
      ref={cardRef}
      className="cs-card"
      style={{
        paddingTop:    'clamp(5rem, 8vw, 8rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
        paddingLeft:   'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)',
        paddingRight:  'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)',
      }}
    >
      {/* ── Header ──────────────────────────────────────── */}
      <div className="cs-header">

        {/* Title */}
        <h2 className="cs-title">{project.title}</h2>

        {/* Description only — takes half the width */}
        <div className="cs-meta-row">
          <p className="cs-desc">{project.description}</p>
        </div>
      </div>

      {/* ── Image area wrapper ───────────────────────────── */}
      <div className="cs-img-area">

        {/* Timeline — top-right, 8px above image */}
        <div className="cs-img-timeline">
          <span className="cs-role">{project.role}</span>
          <span className="cs-sep">·</span>
          <span className="cs-timeline">{project.timeline}</span>
        </div>

        {/* Mockup image panel */}
        <Link
          href={`/work/${project.slug}`}
          className="cs-img-wrap"
          tabIndex={-1}
          aria-hidden
          style={{
            // Right-pointing arrow, hotspot at tip (26,16) in 32×32 canvas
            cursor: project.dark
              ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M3 8L26 16L3 24L7 16Z' fill='white' stroke='rgba(0,0,0,0.35)' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E") 26 16, default`
              : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M3 8L26 16L3 24L7 16Z' fill='%23060d19' stroke='rgba(255,255,255,0.25)' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E") 26 16, default`,
          }}
        >

        {/* Gradient base */}
        <div className="cs-img-bg" style={{ background: project.imgBg }} />

        {/* Browser chrome bar */}
        <div
          className="cs-chrome"
          style={{ background: project.chromeBg }}
        >
          <span className="cs-chrome-dot" />
          <span className="cs-chrome-dot" />
          <span className="cs-chrome-dot" />
          <span
            className="cs-chrome-bar"
            style={{
              background: project.dark
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.08)',
            }}
          />
        </div>

        {/* Abstract UI shapes */}
        {project.shapes.map(([x, y, w, h, a], i) => (
          <div
            key={i}
            aria-hidden
            style={{
              position:     'absolute',
              left:         `${x}%`,
              top:          `calc(38px + ${y}% * 0.88)`,
              width:        `${w}%`,
              height:       `${h}%`,
              borderRadius: '3px',
              background:   `${shapeColor}${a})`,
              pointerEvents:'none',
            }}
          />
        ))}

        </Link>
      </div>{/* /cs-img-area */}

    </article>
  )
}
