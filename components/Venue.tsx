import AnimatedSection from './AnimatedSection'

export default function Venue() {
  // Replace VENUE_MAP_URL with an actual Google Maps embed URL for the venue
  // To get one: go to maps.google.com, search the venue, click Share > Embed a map, copy the src URL
  const VENUE_MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmVudWU!5e0!3m2!1sen!2sin!4v1234567890'
  const DIRECTIONS_URL = 'https://maps.google.com/?q=Venue+Address+Here'

  return (
    <section id="venue" className="py-24 bg-cream-50">
      <div className="max-w-site mx-auto px-6">

        {/* Section label */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-[10px] tracking-[4px] uppercase text-gold-400">Join Us</span>
          <h2 className="font-serif italic font-light text-rose-900 text-5xl md:text-6xl mt-3">
            Venue &amp; How to Reach
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Venue details */}
          <AnimatedSection direction="left" className="space-y-8">
            <div className="frosted border border-gold-400/25 rounded-sm p-8">
              <h3 className="font-serif italic font-light text-rose-900 text-3xl mb-4">
                The Venue
              </h3>
              <div className="space-y-3 text-rose-700 text-[15px] leading-relaxed">
                <p className="font-medium text-rose-900">Venue Name Placeholder</p>
                <p>123 Venue Street, City, State — 000000</p>
                <p className="text-[13px] text-rose-500 italic">
                  Full venue details will be added closer to the date.
                </p>
              </div>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 border border-gold-400 text-gold-400 text-[11px] tracking-[2px] uppercase hover:bg-gold-400 hover:text-white transition-all duration-300 rounded-sm"
              >
                Get Directions
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* How to reach */}
            <div className="frosted border border-gold-400/25 rounded-sm p-8">
              <h3 className="font-serif italic font-light text-rose-900 text-2xl mb-4">
                How to Reach
              </h3>
              <div className="space-y-4">
                {[
                  { icon: '🚗', label: 'By Car', desc: 'Ample parking available on-site. Placeholder directions to be added.' },
                  { icon: '🚌', label: 'By Public Transport', desc: 'Nearest bus stop: Placeholder. Auto/cab recommended from the station.' },
                  { icon: '✈️', label: 'Nearest Airport', desc: 'Placeholder Airport — approximately XX km away. Cabs available.' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-[12px] tracking-[1px] uppercase text-gold-400 mb-1">{item.label}</p>
                      <p className="text-rose-700 text-[14px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Map */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="rounded-sm overflow-hidden shadow-lg border border-gold-400/20 aspect-[4/3]">
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
