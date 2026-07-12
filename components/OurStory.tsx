import Image from 'next/image'
import AnimatedSection from './AnimatedSection'

export default function OurStory() {
  return (
    <section id="our-story" className="py-24 bg-cream-50">
      <div className="max-w-site mx-auto px-6">

        {/* Section label */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-[10px] tracking-[4px] uppercase text-gold-400">Our Story</span>
          <h2 className="font-serif italic font-light text-rose-900 text-5xl md:text-6xl mt-3">
            How it all began
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
        </AnimatedSection>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Photo — slides in from left */}
          <AnimatedSection direction="left">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg">
              <Image
                src="/images/placeholder-story.jpg"
                alt="Hemanth and Samantha"
                fill
                className="object-cover"
              />
              {/* Decorative border */}
              <div className="absolute inset-0 border border-gold-400/20 rounded-sm pointer-events-none" />
            </div>
          </AnimatedSection>

          {/* Text — slides in from right */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif italic font-light text-rose-900 text-3xl mb-3">
                  A chance encounter
                </h3>
                <p className="text-rose-700 leading-relaxed text-[15px]">
                  Some stories begin with a single glance — ours began with something far more ordinary,
                  and yet more magical. A quiet moment, a shared laugh, and suddenly the world felt
                  different. From that first meeting, something in us both quietly knew.
                </p>
              </div>

              <div>
                <h3 className="font-serif italic font-light text-rose-900 text-3xl mb-3">
                  The proposal
                </h3>
                <p className="text-rose-700 leading-relaxed text-[15px]">
                  After years of adventures, quiet evenings, and building a life together, the moment
                  arrived — surrounded by those who matter most, under a sky that seemed to hold its
                  breath. She said yes.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] tracking-[3px] uppercase text-gold-400">
                  — Together since the day we met
                </span>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
