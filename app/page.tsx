import HeroSection from '@/components/HeroSection'
import CaseStudies from '@/components/CaseStudies'
import About from '@/components/About'

export default function Home() {
  return (
    <main style={{ maxWidth: '1536px', margin: '0 auto' }}>
      <HeroSection />
      <CaseStudies />
      <About />
    </main>
  )
}
