import { renderOgImage, OG_SIZE } from '@/lib/ogImage'

export const alt         = 'Semere Seifu — UI/UX & Product Designer'
export const size        = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderOgImage({
    title:    'UI/UX & Product Designer',
    subtitle: 'Turning complexity into simple, usable products.',
  })
}
