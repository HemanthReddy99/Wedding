import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import CornerFlourish from './CornerFlourish'
import BorderRule from './BorderRule'
import SideBorderRule from './SideBorderRule'

export default function Venue() {
  const VENUE_MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmVudWU!5e0!3m2!1sen!2sin!4v1234567890'
  const DIRECTIONS_URL = 'https://maps.google.com/?q=Venue+Address+Here'

  return (
    <section id="venue" className="relative bg-cream-50 overflow-hidden">
      <BorderRule className="absolute top-0 inset-x-0 h-6 opacity-95 z-10" />
      <BorderRule className="absolute bottom-0 inset-x-0 h-6 opacity-95 z-10" />
      <SideBorderRule className="absolute top-0 bottom-0 left-0 w-6 opacity-95 z-10" />
      <SideBorderRule className="absolute top-0 bottom-0 right-0 w-6 opacity-95 z-10" />

      <CornerFlourish className="absolute -top-3 -left-3 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 text-gold-400 pointer-events-none z-10" />
      <CornerFlourish className="absolute -top-3 -right-3 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 text-gold-400 -scale-x-100 pointer-events-none z-10" />
      <CornerFlourish className="absolute -bottom-3 -left-3 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 text-gold-400 -scale-y-100 pointer-events-none z-10" />
      <CornerFlourish className="absolute -bottom-3 -right-3 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 text-gold-400 -scale-x-100 -scale-y-100 pointer-events-none z-10" />

      <div className="relative max-w-site mx-auto px-8 sm:px-10 py-24">
        <AnimatedSection className="text-center mb-14">
          <span className="text-[10px] tracking-[4px] uppercase text-gold-400">Join Us</span>
          <h2 className="font-serif italic font-light text-rose-900 text-4xl md:text-5xl mt-3">
            Venue
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
        </AnimatedSection>

        <AnimatedSection className="max-w-xl mx-auto text-center mb-16">
          <p className="font-serif italic text-rose-900 text-xl sm:text-2xl leading-relaxed">
            &ldquo;With these seven sacred steps, may we walk together as friends for life —
            in joy, in faith, and in love, now and always.&rdquo;
          </p>
          <p className="text-[11px] tracking-[2px] uppercase text-rose-500 mt-4">The Saptapadi Vow</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <AnimatedSection direction="left" className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-gold-400/25 shadow-sm">
              <Image
                src="/images/schedule-banner.png"
                alt="South Indian temple illustration"
                fill
                className="object-cover"
                style={{ objectPosition: '50% 30%' }}
              />
            </div>
            <div className="bg-cream-50 border border-gold-400/25 rounded-sm p-7">
              <h3 className="font-serif italic font-light text-rose-900 text-2xl mb-3">
                Venue Name Placeholder
              </h3>
              <div className="space-y-2 text-rose-700 text-[15px] leading-relaxed">
                <p>123 Venue Street, City, State — 000000</p>
                <p className="text-[13px] text-rose-500 italic">
                  Full venue details will be added closer to the date.
                </p>
              </div>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-6 py-3 border border-gold-400 text-gold-400 text-[11px] tracking-[2px] uppercase hover:bg-gold-400 hover:text-white transition-all duration-300 rounded-sm"
              >
                Get Directions
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="rounded-sm overflow-hidden shadow-sm border border-gold-400/20 aspect-[4/3]">
              <iframe
                src={VENUE_MAP_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Map"
              />
            </div>
            <p className="text-[11px] text-rose-500 text-center mt-3 italic">
              Map will be updated with the exact venue location.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
