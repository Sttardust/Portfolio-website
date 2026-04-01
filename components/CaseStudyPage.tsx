'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/projects'

/* ── Constants ─────────────────────────────────────────────────────────────── */
const PAD  = 'clamp(1.5rem, calc((1500px - 100vw) / 10), 5rem)'
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/* ── Scroll-reveal ─────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Trigger immediately if already in view
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.95) {
      el.classList.add('csp-visible')
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('csp-visible'); obs.disconnect() } },
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
    <div ref={ref} className="csp-anim" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── Eyebrow ────────────────────────────────────────────────────────────────── */
function Eyebrow({ label, accent }: { label: string; accent: string }) {
  return (
    <p style={{
      fontSize:      '0.6875rem',
      fontWeight:    700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color:         accent,
      marginBottom:  '0.875rem',
      margin:        0,
    }}>
      {label}
    </p>
  )
}

/* ── Section heading ────────────────────────────────────────────────────────── */
function H2({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{
      fontFamily:    'var(--font-recoleta)',
      fontSize:      'clamp(1.75rem, 3vw, 2.625rem)',
      fontWeight:    700,
      lineHeight:    1.1,
      letterSpacing: '-0.02em',
      color:         'var(--fg)',
      marginBottom:  '1.5rem',
      ...style,
    }}>
      {children}
    </h2>
  )
}

/* ── Body text ──────────────────────────────────────────────────────────────── */
function Body({ text }: { text: string }) {
  return (
    <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>
      {text}
    </p>
  )
}

/* ── Divider ────────────────────────────────────────────────────────────────── */
function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)', margin: 0 }} />
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function CaseStudyPage({ project }: { project: Project }) {
  return (
    <div className="csp-page">
      {/* ══════════════════════════════════════════════════════
          HERO — cream background, large editorial title
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background:   'var(--bg)',
        paddingTop:   'clamp(7rem, 10vw, 9rem)',
        paddingLeft:  PAD,
        paddingRight: PAD,
        paddingBottom:0,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>


          {/* Large title */}
          <Reveal delay={60}>
            <h1 style={{
              fontFamily:    'var(--font-recoleta)',
              fontSize:      'clamp(1.6rem, 4vw, 4rem)',
              fontWeight:    700,
              letterSpacing: '-0.03em',
              lineHeight:    1.0,
              color:         'var(--fg)',
              marginBottom:  project.subtitle ? '0.2rem' : '1.25rem',
            }}>
              {project.title}
            </h1>
            {project.subtitle && (
              <p style={{
                fontFamily:    'var(--font-recoleta)',
                fontSize:      'clamp(1rem, 2.4vw, 2.4rem)',
                fontWeight:    400,
                fontStyle:     'italic',
                letterSpacing: '-0.02em',
                color:         'var(--muted)',
                marginBottom:  '1.25rem',
                lineHeight:    1.1,
              }}>
                {project.subtitle}
              </p>
            )}
          </Reveal>

          {/* Tagline only — meta removed (lives in Overview section) */}
          <Reveal delay={120}>
            <p style={{
              fontSize:     'clamp(0.9375rem, 1.5vw, 1.0625rem)',
              lineHeight:   1.75,
              color:        'var(--muted)',
              maxWidth:     '52ch',
              margin:       0,
              paddingBottom:'clamp(2.5rem, 4vw, 4rem)',
            }}>
              {project.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Hero image placeholder ─────────────────────────────────────────── */}
      <div style={{
        paddingLeft:  PAD,
        paddingRight: PAD,
        background:   'var(--bg)',
        paddingTop:   'clamp(2rem, 3vw, 3rem)',
        paddingBottom:'clamp(2rem, 3vw, 3rem)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Reveal>
            <div style={{
              width:         '100%',
              aspectRatio:   '16 / 8',
              borderRadius:  '8px',
              overflow:      'hidden',
              background:    `linear-gradient(160deg, ${project.accent}22 0%, ${project.accent}44 100%)`,
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              position:      'relative',
            }}>
              {/* Subtle abstract shapes */}
              <div style={{
                position:   'absolute',
                inset:      0,
                background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${project.accent}18 0%, transparent 70%)`,
              }} />
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <p style={{
                  fontSize:      '0.6875rem',
                  fontWeight:    700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         project.accent,
                  opacity:       0.6,
                  margin:        0,
                }}>
                  Project screens coming soon
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background:    'var(--bg)',
        paddingTop:    'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(4rem, 7vw, 7rem)',
        paddingLeft:   PAD,
        paddingRight:  PAD,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Reveal>
            <div className="csp-overview-grid">
              {/* Left: text */}
              <div>
                <Eyebrow label="Overview" accent={project.accent} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.25rem' }}>
                  {project.overview.map((para, i) => (
                    <Body key={i} text={para} />
                  ))}
                </div>
              </div>
              {/* Right: sidebar */}
              <aside className="csp-meta-sidebar">
                {project.meta.map(({ label, value }) => (
                  <div key={label} style={{ padding: '1rem 0' }}>
                    <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--fg)', margin: 0 }}>
                      {value}
                    </p>
                  </div>
                ))}
              </aside>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={80}>
            <div className="csp-stats-row" style={{ marginTop: 'clamp(3rem, 5vw, 5rem)' }}>
              {project.stats.map(({ num, label }) => (
                <div key={label} className="csp-stat">
                  <p style={{
                    fontFamily:    'var(--font-recoleta)',
                    fontSize:      'clamp(2rem, 4vw, 3.25rem)',
                    fontWeight:    700,
                    color:         project.accent,
                    lineHeight:    1,
                    marginBottom:  '0.5rem',
                  }}>
                    {num}
                  </p>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROBLEM
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background:    'var(--fg)',
        paddingTop:    'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(4rem, 7vw, 7rem)',
        paddingLeft:   PAD,
        paddingRight:  PAD,
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal>
            <p style={{
              fontSize:      '0.6875rem',
              fontWeight:    700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         `${project.accentBg}`,
              opacity:       0.6,
              marginBottom:  '1.25rem',
            }}>
              The Problem
            </p>
            <h2 style={{
              fontFamily:    'var(--font-recoleta)',
              fontSize:      'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
              color:         'var(--dark-fg)',
              marginBottom:  '2rem',
            }}>
              {project.problem.heading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {project.problem.body.map((para, i) => (
                <p key={i} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(248,245,241,0.55)', margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>
            {project.problem.quote && (
              <blockquote style={{
                borderLeft:   `3px solid ${project.accent}`,
                padding:      '1.5rem 2rem',
                background:   'rgba(248,245,241,0.04)',
                borderRadius: '0 6px 6px 0',
                marginTop:    '2.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-recoleta)',
                  fontSize:   'clamp(1.1rem, 2vw, 1.35rem)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  color:      'rgba(248,245,241,0.8)',
                  margin:     0,
                }}>
                  &ldquo;{project.problem.quote}&rdquo;
                </p>
              </blockquote>
            )}
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          USERS (optional)
      ══════════════════════════════════════════════════════ */}
      {project.users && (
        <section style={{
          background:    'var(--bg)',
          paddingTop:    'clamp(4rem, 7vw, 7rem)',
          paddingBottom: 'clamp(4rem, 7vw, 7rem)',
          paddingLeft:   PAD,
          paddingRight:  PAD,
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Reveal>
              <Eyebrow label="Understanding the Users" accent={project.accent} />
              <H2 style={{ marginTop: '1.25rem' }}>{project.users.heading}</H2>
              {project.users.body && (
                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '58ch', marginBottom: '2.5rem', marginTop: 0 }}>
                  {project.users.body}
                </p>
              )}
            </Reveal>
            <div className="csp-roles-grid">
              {project.users.roles.map((role, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="csp-role-card">
                    <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{role.icon}</div>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: project.accent, marginBottom: '0.25rem', margin: '0 0 0.25rem' }}>
                      {role.subtitle}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-recoleta)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.75rem', letterSpacing: '-0.01em' }}>
                      {role.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--muted)', margin: '0 0 1rem' }}>
                      {role.body}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {role.flows.map((f, j) => (
                        <div key={j} style={{
                          fontSize:   '0.8125rem',
                          color:      'var(--muted)',
                          padding:    '0.35rem 0.75rem',
                          background: 'var(--bg)',
                          borderLeft: `2px solid ${project.accent}`,
                          lineHeight: 1.5,
                        }}>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background:    'var(--bg)',
        paddingTop:    'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(4rem, 7vw, 7rem)',
        paddingLeft:   PAD,
        paddingRight:  PAD,
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <Eyebrow label="Design Process" accent={project.accent} />
            <H2 style={{ marginTop: '1.25rem' }}>{project.process.heading}</H2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '0.5rem' }}>
            {project.process.steps.map((step, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="csp-process-item">
                  <div style={{
                    fontFamily:    'var(--font-recoleta)',
                    fontSize:      'clamp(1.25rem, 2vw, 1.75rem)',
                    fontWeight:    700,
                    color:         project.accent,
                    opacity:       0.3,
                    lineHeight:    1,
                    flexShrink:    0,
                    minWidth:      '3rem',
                    paddingTop:    '0.15rem',
                  }}>
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.5rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', margin: 0 }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DESIGN DECISIONS
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background:    'var(--bg)',
        paddingTop:    'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(4rem, 7vw, 7rem)',
        paddingLeft:   PAD,
        paddingRight:  PAD,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Reveal>
            <Eyebrow label="Design Decisions" accent={project.accent} />
            <H2 style={{ marginTop: '1.25rem' }}>{project.decisions.heading}</H2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '0.5rem' }}>
            {project.decisions.items.map((item, i) => (
              <Reveal key={i} delay={i * 45}>
                <div className="csp-decision-item">
                  <div className="csp-decision-label">
                    <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: project.accent, margin: 0 }}>
                      {item.label}
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg)', margin: '0 0 0.5rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OUTCOME
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background:    'var(--fg)',
        paddingTop:    'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(4rem, 7vw, 7rem)',
        paddingLeft:   PAD,
        paddingRight:  PAD,
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal>
            <p style={{
              fontSize:      '0.6875rem',
              fontWeight:    700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         project.accentBg,
              opacity:       0.6,
              marginBottom:  '1.25rem',
            }}>
              Outcome
            </p>
            <h2 style={{
              fontFamily:    'var(--font-recoleta)',
              fontSize:      'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
              color:         'var(--dark-fg)',
              marginBottom:  '2rem',
            }}>
              {project.outcome.heading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {project.outcome.body.map((para, i) => (
                <p key={i} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(248,245,241,0.55)', margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>
            {project.outcome.points && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {project.outcome.points.map((pt, i) => (
                  <div key={i} style={{
                    display:    'flex',
                    gap:        '0.875rem',
                    fontSize:   '0.9375rem',
                    color:      'rgba(248,245,241,0.75)',
                    lineHeight: 1.55,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ color: project.accent, flexShrink: 0, marginTop: '0.15rem', fontSize: '0.875rem' }}>→</span>
                    {pt}
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PREV / NEXT NAV
      ══════════════════════════════════════════════════════ */}
      <nav
        aria-label="Project navigation"
        style={{
          background:          'var(--bg)',
          display:             'grid',
          gridTemplateColumns: project.prev && project.next ? '1fr 1fr' : '1fr',
        }}
      >
        {project.prev && (
          <Link
            href={`/${project.prev.slug}`}
            className="csp-nav-link"
            style={{
              display:     'block',
              padding:     'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 0.5rem' }}>← Previous</p>
            <p style={{ fontFamily: 'var(--font-recoleta)', fontSize: 'clamp(1rem, 2vw, 1.375rem)', fontWeight: 700, color: 'var(--fg)', margin: 0, letterSpacing: '-0.01em' }}>
              {project.prev.title}
            </p>
          </Link>
        )}
        {project.next && (
          <Link
            href={`/${project.next.slug}`}
            className="csp-nav-link"
            style={{
              display:   'block',
              padding:   'clamp(2rem, 4vw, 3.5rem)',
              textAlign: 'right',
            }}
          >
            <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 0.5rem' }}>Next →</p>
            <p style={{ fontFamily: 'var(--font-recoleta)', fontSize: 'clamp(1rem, 2vw, 1.375rem)', fontWeight: 700, color: 'var(--fg)', margin: 0, letterSpacing: '-0.01em' }}>
              {project.next.title}
            </p>
          </Link>
        )}
      </nav>
    </div>
  )
}
