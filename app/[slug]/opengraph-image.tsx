import { renderOgImage, OG_SIZE } from '@/lib/ogImage'
import { PROJECTS, getProject } from '@/lib/projects'

export const alt         = 'Case study — Semere Seifu'
export const size        = OG_SIZE
export const contentType = 'image/png'

// Prerender one card per case study (matches the page's static params).
export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project  = getProject(slug)
  return renderOgImage({
    title:    project?.title   ?? 'Semere Seifu',
    subtitle: project?.tagline ?? 'UI/UX & Product Designer',
  })
}
