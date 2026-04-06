'use client'

import { useEffect, useRef, useCallback } from 'react'

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
const HOVER_R        = 18     // hit radius for center-circle hover
const REVEAL_R       = 25     // hit radius for outside-circle reveal (50px diameter)
const CYCLE_MS       = 700
const CYCLE_PCT      = 0.015
const LERP           = 0.08
const LERP_SCALE     = 0.08
const GLYPH_COLOR    = '#060d19'
const HOVER_SCALE    = 3.0

// ── Types ─────────────────────────────────────────────────
interface Glyph {
  x:            number
  y:            number
  char:         string
  opacity:      number
  target:       number
  cycling:      boolean
  insideCircle: boolean
  scale:        number   // current font scale multiplier
  scaleTarget:  number   // desired scale multiplier
}

// ── Grid builder ──────────────────────────────────────────
// Fills the entire canvas with glyphs; marks each as inside or outside the circle
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
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const glyphsRef    = useRef<Glyph[]>([])
  const rafRef       = useRef<number>(0)
  const lastCycleRef = useRef<number>(0)

  // ── Draw loop ──────────────────────────────────────────
  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cx = CANVAS_PX / 2
    const cy = CANVAS_PX / 2

    ctx.clearRect(0, 0, CANVAS_PX, CANVAS_PX)
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'

    for (const g of glyphsRef.current) {
      // Lerp opacity
      g.opacity += (g.target - g.opacity) * LERP
      // Lerp scale
      g.scale   += (g.scaleTarget - g.scale) * LERP_SCALE

      if (g.insideCircle) {
        // Radial mask: fully opaque inside 60% radius, fade to 0 at 92%
        const dist  = Math.sqrt((g.x - cx) ** 2 + (g.y - cy) ** 2)
        const ratio = dist / RADIUS
        const mask  = ratio < 0.6 ? 1 : Math.max(0, 1 - (ratio - 0.6) / 0.32)
        const alpha = g.opacity * mask
        if (alpha < 0.01) continue

        ctx.globalAlpha = alpha
        ctx.font        = `500 ${FONT_PX * g.scale}px "GeezManuscript", serif`
        ctx.fillStyle   = GLYPH_COLOR
        ctx.fillText(g.char, g.x, g.y)
      } else {
        // Outside circle — only draw when being revealed
        if (g.opacity < 0.01) continue

        ctx.globalAlpha = g.opacity
        ctx.font        = `500 ${FONT_PX}px "GeezManuscript", serif`
        ctx.fillStyle   = GLYPH_COLOR
        ctx.fillText(g.char, g.x, g.y)
      }
    }
    ctx.globalAlpha = 1

    // ── Cycle random inside-circle glyphs ─────────────────
    if (ts - lastCycleRef.current > CYCLE_MS) {
      lastCycleRef.current = ts
      const pool = glyphsRef.current.filter(g => g.insideCircle && !g.cycling)
      const n    = Math.max(4, Math.floor(pool.length * CYCLE_PCT))

      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * pool.length)
        const g   = pool.splice(idx, 1)[0]
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

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  // ── Init ───────────────────────────────────────────────
  useEffect(() => {
    glyphsRef.current = buildGlyphs()

    const loadAndStart = async () => {
      try {
        const font = new FontFace(
          'GeezManuscript',
          "url('/fonts/Geez-Manuscript-Zemen-COLR.ttf') format('truetype')"
        )
        const loaded = await font.load()
        document.fonts.add(loaded)
      } catch {
        // fall back to serif
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    loadAndStart()
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw])

  // ── Hover ──────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect  = canvas.getBoundingClientRect()
    const scale = CANVAS_PX / rect.width
    const mx    = (e.clientX - rect.left) * scale
    const my    = (e.clientY - rect.top)  * scale

    const hoverR2  = HOVER_R  ** 2
    const revealR2 = REVEAL_R ** 2

    for (const g of glyphsRef.current) {
      const dist2 = (g.x - mx) ** 2 + (g.y - my) ** 2

      if (g.insideCircle) {
        const close = dist2 < hoverR2
        if (close && !g.cycling) {
          g.target      = HOVER_ALPHA
          g.scaleTarget = HOVER_SCALE
        } else if (!close && g.target === HOVER_ALPHA) {
          g.target      = BASE_ALPHA
          g.scaleTarget = 1
        }
      } else {
        const close = dist2 < revealR2
        if (close)       g.target = HOVER_ALPHA
        else if (!close && g.target === HOVER_ALPHA) g.target = 0
      }
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    for (const g of glyphsRef.current) {
      if (g.insideCircle) {
        if (g.target === HOVER_ALPHA) g.target = BASE_ALPHA
        g.scaleTarget = 1
      } else {
        g.target = 0
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-glyph-canvas"
      width={CANVAS_PX}
      height={CANVAS_PX}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
