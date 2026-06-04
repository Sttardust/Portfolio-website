'use client'

import { useEffect, useRef } from 'react'

const GLYPH_POOL = [
  'ሀ','ሁ','ሂ','ሃ','ሄ','ህ','ሆ',
  'ለ','ሉ','ሊ','ላ','ሌ','ል','ሎ',
  'ሐ','ሑ','ሒ','ሓ','ሔ','ሕ','ሖ',
  'መ','ሙ','ሚ','ማ','ሜ','ም','ሞ',
  'ሠ','ሡ','ሢ','ሣ','ሤ','ሥ','ሦ',
  'ረ','ሩ','ሪ','ራ','ሬ','ር','ሮ',
  'ሰ','ሱ','ሲ','ሳ','ሴ','ስ','ሶ',
  'ቀ','ቁ','ቂ','ቃ','ቄ','ቅ','ቆ',
  'በ','ቡ','ቢ','ባ','ቤ','ብ','ቦ',
  'ተ','ቱ','ቲ','ታ','ቴ','ት','ቶ',
  'ነ','ኑ','ኒ','ና','ኔ','ን','ኖ',
  'ከ','ኩ','ኪ','ካ','ኬ','ክ','ኮ',
  'ወ','ዉ','ዊ','ዋ','ዌ','ው','ዎ',
  'ዘ','ዙ','ዚ','ዛ','ዜ','ዝ','ዞ',
  'የ','ዩ','ዪ','ያ','ዬ','ይ','ዮ',
  'ደ','ዱ','ዲ','ዳ','ዴ','ድ','ዶ',
  'ጀ','ጁ','ጂ','ጃ','ጄ','ጅ','ጆ',
  'ገ','ጉ','ጊ','ጋ','ጌ','ግ','ጎ',
  'ጠ','ጡ','ጢ','ጣ','ጤ','ጥ','ጦ',
  'ፈ','ፉ','ፊ','ፋ','ፌ','ፍ','ፎ',
]

// ── Constants ────────────────────────────────────────────
const CANVAS_PX      = 1440   // canvas size (square)
const RADIUS         = 495    // circle radius
const STEP           = 27.5   // px between glyph centers
const FONT_PX        = 18
const BASE_ALPHA     = 0.3
const HOVER_ALPHA    = 1.0
const HOVER_R        = 18     // hit radius for single-glyph scale hover
const EDGE_REVEAL_R  = 90     // px radius for edge-zone dissolve on hover
const CYCLE_MS       = 700
const CYCLE_PCT      = 0.015
const LERP           = 0.08
const LERP_SCALE     = 0.08
const GLYPH_COLOR    = '#060d19'
const HOVER_SCALE    = 3.0
const MOBILE_QUERY   = '(max-width: 1023px)'  // matches the CSS that hides this canvas

// ── Types ─────────────────────────────────────────────────
interface Glyph {
  x:            number
  y:            number
  char:         string
  opacity:      number
  target:       number
  cycling:      boolean
  insideCircle: boolean
  scale:        number
  scaleTarget:  number
}

// ── Grid builder ──────────────────────────────────────────
function buildGlyphs(): Glyph[] {
  const cx = CANVAS_PX / 2
  const cy = CANVAS_PX / 2
  const r2 = (RADIUS - 1) ** 2
  const glyphs: Glyph[] = []

  for (let x = STEP / 2; x <= CANVAS_PX; x += STEP) {
    for (let y = STEP / 2; y <= CANVAS_PX; y += STEP) {
      const insideCircle = (x - cx) ** 2 + (y - cy) ** 2 <= r2
      glyphs.push({
        x, y,
        char:         GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)],
        opacity:      insideCircle ? Math.random() * BASE_ALPHA : 0,
        target:       insideCircle ? BASE_ALPHA : 0,
        cycling:      false,
        insideCircle,
        scale:        1,
        scaleTarget:  1,
      })
    }
  }
  return glyphs
}

// ── Component ─────────────────────────────────────────────
export default function HeroGlyph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Skip entirely on mobile — the canvas is `display:none` there, so running
    // the RAF loop would only burn CPU/battery drawing nothing visible.
    if (window.matchMedia(MOBILE_QUERY).matches) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const cx = CANVAS_PX / 2
    const cy = CANVAS_PX / 2
    const glyphs = buildGlyphs()

    let mouse: { mx: number; my: number } | null = null
    let raf = 0
    let lastCycle = 0
    let ready = false
    let visible = true

    // ── Render the current glyph state (no state advancement) ──
    const render = () => {
      ctx.clearRect(0, 0, CANVAS_PX, CANVAS_PX)
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'

      for (const g of glyphs) {
        if (!g.insideCircle) continue

        const dist  = Math.sqrt((g.x - cx) ** 2 + (g.y - cy) ** 2)
        const ratio = dist / RADIUS
        let mask    = ratio < 0.6 ? 1 : Math.max(0, 1 - (ratio - 0.6) / 0.32)

        if (ratio >= 0.6 && mouse) {
          const { mx, my } = mouse
          const d2 = (g.x - mx) ** 2 + (g.y - my) ** 2
          if (d2 < EDGE_REVEAL_R ** 2) {
            const proximity = 1 - Math.sqrt(d2) / EDGE_REVEAL_R
            mask = Math.min(1, mask + proximity * (1 - mask))
          }
        }

        const alpha = g.opacity * mask
        if (alpha < 0.01) continue

        ctx.globalAlpha = alpha
        ctx.font        = `500 ${FONT_PX * g.scale}px "GeezManuscript", serif`
        ctx.fillStyle   = GLYPH_COLOR
        ctx.fillText(g.char, g.x, g.y)
      }
      ctx.globalAlpha = 1
    }

    // ── One animation frame: advance state, render, schedule next ──
    const tick = (ts: number) => {
      for (const g of glyphs) {
        if (!g.insideCircle) continue
        g.opacity += (g.target      - g.opacity) * LERP
        g.scale   += (g.scaleTarget - g.scale)   * LERP_SCALE
      }

      render()

      if (ts - lastCycle > CYCLE_MS) {
        lastCycle = ts
        const pool = glyphs.filter(g => g.insideCircle && !g.cycling)
        const n    = Math.max(4, Math.floor(pool.length * CYCLE_PCT))

        for (let i = 0; i < n; i++) {
          const idx = Math.floor(Math.random() * pool.length)
          const g   = pool.splice(idx, 1)[0]
          if (!g) continue
          g.cycling = true
          g.target  = 0

          setTimeout(() => {
            let next = g.char
            while (next === g.char) next = GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)]
            g.char    = next
            g.target  = BASE_ALPHA
            g.cycling = false
          }, 450)
        }
      }

      raf = visible ? requestAnimationFrame(tick) : 0
    }

    const ensureRunning = () => {
      if (ready && !reduceMotion && visible && raf === 0) {
        raf = requestAnimationFrame(tick)
      }
    }

    // ── Hover — single closest glyph scales up ──
    const onMove = (e: MouseEvent) => {
      const rect  = canvas.getBoundingClientRect()
      const scale = CANVAS_PX / rect.width
      const mx    = (e.clientX - rect.left) * scale
      const my    = (e.clientY - rect.top)  * scale
      mouse = { mx, my }

      let closestG: Glyph | null = null
      let closestDist2 = HOVER_R ** 2
      for (const g of glyphs) {
        if (!g.insideCircle || g.cycling) continue
        const dist2 = (g.x - mx) ** 2 + (g.y - my) ** 2
        if (dist2 < closestDist2) { closestDist2 = dist2; closestG = g }
      }

      for (const g of glyphs) {
        if (!g.insideCircle) continue
        if (g === closestG) {
          g.target      = HOVER_ALPHA
          g.scaleTarget = HOVER_SCALE
        } else if (g.target === HOVER_ALPHA) {
          g.target      = BASE_ALPHA
          g.scaleTarget = 1
        }
      }
    }

    const onLeave = () => {
      mouse = null
      for (const g of glyphs) {
        if (!g.insideCircle) continue
        if (g.target === HOVER_ALPHA) g.target = BASE_ALPHA
        g.scaleTarget = 1
      }
    }

    // Pause the loop when the hero is scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) ensureRunning()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    if (!reduceMotion) {
      canvas.addEventListener('mousemove', onMove)
      canvas.addEventListener('mouseleave', onLeave)
    }

    // Load the Ge'ez font, then start (or paint a single static frame).
    let cancelled = false
    const start = async () => {
      try {
        const font = new FontFace(
          'GeezManuscript',
          "url('/fonts/Geez-Manuscript-Zemen-COLR.ttf') format('truetype')",
        )
        document.fonts.add(await font.load())
      } catch {
        // fall back to serif
      }
      if (cancelled) return
      ready = true
      if (reduceMotion) {
        for (const g of glyphs) { g.opacity = g.target; g.scale = g.scaleTarget }
        render()
      } else {
        ensureRunning()
      }
    }
    start()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      io.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-glyph-canvas"
      width={CANVAS_PX}
      height={CANVAS_PX}
      style={{
        position:  'absolute',
        top:       '50%',
        left:      '50%',
        transform: 'translate(-50%, -50%)',
        width:     'min(1440px, 100vw)',
        height:    'min(1440px, 100vw)',
        cursor:    'default',
      }}
    />
  )
}
