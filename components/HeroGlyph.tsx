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
const CANVAS_PX   = 1440   // fixed reference diagonal in px
const RADIUS      = 495    // circle radius within the canvas (3/4 of original 660)
const STEP        = 27.5   // px between glyph centers (1.25× of previous 22)
const FONT_PX     = 18
const BASE_ALPHA  = 0.3
const HOVER_ALPHA = 1.0
const HOVER_R     = 18     // px hit radius for hover
const CYCLE_MS    = 700
const CYCLE_PCT   = 0.015  // fraction of glyphs to swap per tick
const LERP        = 0.08   // opacity lerp speed per frame
const GLYPH_COLOR = '#060d19'

// ── Types ─────────────────────────────────────────────────
interface Glyph {
  x:       number
  y:       number
  char:    string
  opacity: number   // current rendered opacity
  target:  number   // desired opacity
  cycling: boolean  // true while fading out before char swap
}

// ── Grid builder ──────────────────────────────────────────
function buildGlyphs(): Glyph[] {
  const cx = CANVAS_PX / 2
  const cy = CANVAS_PX / 2
  const r2 = (RADIUS - 1) ** 2
  const glyphs: Glyph[] = []

  for (let x = cx - RADIUS; x <= cx + RADIUS; x += STEP) {
    for (let y = cy - RADIUS; y <= cy + RADIUS; y += STEP) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r2) {
        glyphs.push({
          x, y,
          char:    GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)],
          opacity: Math.random() * 0.3,
          target:  BASE_ALPHA,
          cycling: false,
        })
      }
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
    ctx.font      = `500 ${FONT_PX}px "Albert Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (const g of glyphsRef.current) {
      // Lerp opacity toward target
      g.opacity += (g.target - g.opacity) * LERP

      // Radial mask: fully opaque inside 60% radius, fade to 0 at 92%
      const dist  = Math.sqrt((g.x - cx) ** 2 + (g.y - cy) ** 2)
      const ratio = dist / RADIUS
      const mask  = ratio < 0.6 ? 1 : Math.max(0, 1 - (ratio - 0.6) / 0.32)

      const alpha = g.opacity * mask
      if (alpha < 0.01) continue

      ctx.globalAlpha = alpha
      ctx.fillStyle   = GLYPH_COLOR
      ctx.fillText(g.char, g.x, g.y)
    }
    ctx.globalAlpha = 1

    // ── Cycle random glyphs ───────────────────────────────
    if (ts - lastCycleRef.current > CYCLE_MS) {
      lastCycleRef.current = ts
      const pool = glyphsRef.current.filter(g => !g.cycling)
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
    rafRef.current    = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw])

  // ── Hover ──────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect  = canvas.getBoundingClientRect()
    // Scale from CSS px → canvas px
    const scale = CANVAS_PX / rect.width
    const mx    = (e.clientX - rect.left) * scale
    const my    = (e.clientY - rect.top)  * scale
    const r2    = HOVER_R ** 2

    for (const g of glyphsRef.current) {
      const close = (g.x - mx) ** 2 + (g.y - my) ** 2 < r2
      if (close && !g.cycling) g.target = HOVER_ALPHA
      else if (!close && g.target === HOVER_ALPHA) g.target = BASE_ALPHA
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    for (const g of glyphsRef.current) {
      if (g.target === HOVER_ALPHA) g.target = BASE_ALPHA
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_PX}
      height={CANVAS_PX}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position:  'absolute',
        top:       '50%',
        left:      '50%',
        transform: 'translate(-50%, -50%)',
        // CSS display size = 1440px or 100vw whichever is smaller
        width:     'min(1440px, 100vw)',
        height:    'min(1440px, 100vw)',
        cursor:    'default',
      }}
    />
  )
}
