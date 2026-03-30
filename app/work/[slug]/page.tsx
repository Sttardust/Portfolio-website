import { redirect } from 'next/navigation'
import { PROJECTS } from '@/lib/projects'

// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

// ── Redirect /work/[slug] → /[slug] ──────────────────────────────────────────
export default async function WorkRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/${slug}`)
}
