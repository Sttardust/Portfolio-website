import { renderOgImage, OG_SIZE } from '@/lib/ogImage'

export const alt         = 'About — Semere Seifu'
export const size        = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderOgImage({
    title:    'About Semere',
    subtitle: 'UI/UX & Product Designer · Addis Ababa, Ethiopia',
  })
}
