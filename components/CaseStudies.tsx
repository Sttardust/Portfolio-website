'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, type Project } from '@/lib/projects'

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
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  )
}

// ── Card ────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const { card } = project
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

  const shapeColor = card.dark ? 'rgba(255,255,255,' : 'rgba(0,0,0,'

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

        {/* Title — links directly to case study */}
        <Link href={`/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 className="cs-title">{project.title}</h2>
        </Link>

        {/* Description only — takes half the width */}
        <div className="cs-meta-row">
          <p className="cs-desc">{card.description}</p>
        </div>
      </div>

      {/* ── Image area wrapper ───────────────────────────── */}
      <div className="cs-img-area">

        {/* Timeline — above image */}
        <div className="cs-img-timeline">
          <div className="cs-timeline-left">
            <span className="cs-role">
              {card.role.replace(' (Solo)', '')}
              <span className="cs-role-suffix">{card.role.includes('(Solo)') ? ' (Solo)' : ''}</span>
            </span>
            <span className="cs-sep">·</span>
            <span className="cs-timeline">{card.timeline}</span>
          </div>
          <Link href={`/${project.slug}`} className="cs-learn-more">
            Learn more
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden>
              <path d="M1 4.5H11M7.5 1L11 4.5L7.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Mockup image panel */}
        <Link
          href={`/${project.slug}`}
          className="cs-img-wrap"
          tabIndex={-1}
          aria-hidden
          style={{
            cursor: card.dark
              ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Ccircle cx='22' cy='22' r='20' fill='white'/%3E%3Cpath d='M12 15L32 22L12 29L16 22Z' fill='%23060d19'/%3E%3C/svg%3E") 32 22, default`
              : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Ccircle cx='22' cy='22' r='20' fill='%23060d19'/%3E%3Cpath d='M12 15L32 22L12 29L16 22Z' fill='white'/%3E%3C/svg%3E") 32 22, default`,
          }}
        >

        {/* Gradient base */}
        <div className="cs-img-bg" style={{ background: card.imgBg }} />

        {project.cover ? (
          /* Branded cover image */
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1536px) 1496px, 100vw"
            style={{ objectFit: 'cover' }}
          />
        ) : project.video ? (
          /* Video preview */
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
            }}
          />
        ) : (
          <>
            {/* Browser chrome bar */}
            <div
              className="cs-chrome"
              style={{ background: card.chromeBg }}
            >
              <span className="cs-chrome-dot" />
              <span className="cs-chrome-dot" />
              <span className="cs-chrome-dot" />
              <span
                className="cs-chrome-bar"
                style={{
                  background: card.dark
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.08)',
                }}
              />
            </div>

            {/* Abstract UI shapes */}
            {card.shapes.map(([x, y, w, h, a], i) => (
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
          </>
        )}

        </Link>
      </div>{/* /cs-img-area */}

    </article>
  )
}
