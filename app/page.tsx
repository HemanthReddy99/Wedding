import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Schedule from '@/components/Schedule'
import Venue from '@/components/Venue'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Hemanth & Samantha — Save the Date',
  description: 'An invitation to celebrate our wedding day.',
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <OurStory />
      <Schedule />
      <Venue />
      <FAQ />
      <Footer />
    </main>
  )
}
