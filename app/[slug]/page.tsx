import { notFound } from 'next/navigation'
import { PROJECTS, getProject } from '@/lib/projects'
import CaseStudyPage from '@/components/CaseStudyPage'

// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project  = getProject(slug)
  if (!project) return {}
  return {
    title:       project.title,
    description: project.tagline,
    openGraph: {
      title:       `${project.title} — Semere Seifu`,
      description: project.tagline,
      type:        'article',
      images:      [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${project.title} — Semere Seifu`,
      description: project.tagline,
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project  = getProject(slug)
  if (!project) notFound()
  return <CaseStudyPage project={project} />
}
