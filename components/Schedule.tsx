'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const EVENTS = [
  {
    time: '09:00 AM',
    title: 'Muhurtham',
    description: 'The auspicious wedding ceremony — the sacred moment when Hemanth and Samantha are united in the presence of family, tradition, and love.',
    icon: '🕊️',
  },
  {
    time: '11:30 AM',
    title: 'Wedding Lunch',
    description: 'A celebratory feast for all our guests — a time to eat, laugh, and share in the joy of the day.',
    icon: '🌸',
  },
  {
    time: '01:00 PM',
    title: 'Blessings & Farewells',
    description: 'An intimate time for family blessings, photographs, and bidding the newlyweds a joyful send-off.',
    icon: '✦',
  },
]

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 bg-cream-100">
      <div className="max-w-site mx-auto px-6">

        {/* Section label */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-[10px] tracking-[4px] uppercase text-gold-400">The Day</span>
          <h2 className="font-serif italic font-light text-rose-900 text-5xl md:text-6xl mt-3">
            Schedule of Events
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
        </AnimatedSection>

        {/* Timeline cards */}
        <div className="max-w-2xl mx-auto space-y-6">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              className="frosted border border-gold-400/25 rounded-sm p-8 shadow-sm"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-400/15 flex items-center justify-center text-xl">
                  {event.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-serif italic font-light text-rose-900 text-2xl">
                      {event.title}
                    </h3>
                    <span className="text-[11px] tracking-[2px] uppercase text-gold-400 flex-shrink-0">
                      {event.time}
                    </span>
                  </div>
                  <p className="text-rose-700 leading-relaxed text-[14px]">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
