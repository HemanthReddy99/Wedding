import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div id="hero" className="h-screen bg-cream-100 flex items-center justify-center">
        <p className="font-serif italic text-5xl text-rose-900">Hemanth &amp; Samantha</p>
      </div>
    </main>
  )
}
