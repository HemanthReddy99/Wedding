import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Schedule from '@/components/Schedule'
import Venue from '@/components/Venue'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurStory />
      <Schedule />
      <Venue />
      <Gallery />
      <FAQ />
    </main>
  )
}
