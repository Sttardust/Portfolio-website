import { ImageResponse } from 'next/og'

// Shared Open Graph / Twitter card renderer used by every `opengraph-image`
// route (home, about, and each case study). Keeps one design in one place.
export const OG_SIZE = { width: 1200, height: 630 }

export function renderOgImage({ title, subtitle }: { title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          height:         '100%',
          width:          '100%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'space-between',
          padding:        '72px 80px',
          backgroundColor:'#f8f5f1',
          color:          '#060d19',
          fontFamily:     'sans-serif',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, fontWeight: 600 }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, backgroundColor: '#e5342a' }} />
          Semere Seifu
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ fontSize: 34, color: '#5d6067', letterSpacing: '-0.01em', maxWidth: 900 }}>
            {subtitle}
          </div>
        </div>

        {/* Footer line */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, color: '#5d6067' }}>
          <div style={{ display: 'flex' }}>Addis Ababa, Ethiopia</div>
          <div style={{ display: 'flex' }}>semere-portfolio.vercel.app</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
