'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import CornerFlourish from './CornerFlourish'
import BorderRule from './BorderRule'
import SideBorderRule from './SideBorderRule'

function LampIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v3M9 8h6l-1 3H10l-1-3Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 21h10l-1.5-8h-7L7 21Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 11 12 6l2.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeastIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 3v8a3 3 0 0 0 3 3v7M6 3H4M6 8H4M9 3h2M9 8H8M18 3v18M18 3c2 0 3 2 3 4.5S20 12 18 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

const EVENTS = [
  {
    date: '30 AUG',
    time: '09:00 AM',
    title: 'Muhurtham',
    venue: 'Venue Name Placeholder, City',
    description: 'The sacred moment when Hemanth and Samantha are united in the presence of family and tradition.',
    Icon: LampIcon,
  },
  {
    date: '30 AUG',
    time: '11:30 AM',
    title: 'Wedding Lunch',
    venue: 'Venue Name Placeholder, City',
    description: 'A celebratory feast for all our guests — a time to eat, laugh, and share in the joy of the day.',
    Icon: FeastIcon,
  },
  {
    date: '30 AUG',
    time: '01:00 PM',
    title: 'Blessings & Farewells',
    venue: 'Venue Name Placeholder, City',
    description: 'An intimate time for family blessings, photographs, and a joyful send-off for the newlyweds.',
    Icon: StarIcon,
  },
]

export default function Schedule() {
  return (
    <section id="schedule" className="relative bg-cream-100 overflow-hidden">
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
          <span className="text-[10px] tracking-[4px] uppercase text-gold-400">The Day</span>
          <h2 className="font-serif italic font-light text-rose-900 text-4xl md:text-5xl mt-3">
            Schedule of Events
          </h2>
          <p className="text-[13px] tracking-[1px] uppercase text-rose-500 mt-3">
            A celebration of tradition, love &amp; family
          </p>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
        </AnimatedSection>

        <AnimatedSection className="relative max-w-2xl mx-auto aspect-[16/8] rounded-xl overflow-hidden border border-gold-400/25 shadow-md mb-14">
          <Image
            src="/images/schedule-banner.png"
            alt="South Indian temple by the backwaters"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream-50/15 via-transparent to-transparent" />
        </AnimatedSection>

        <div className="max-w-2xl mx-auto space-y-6">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              className="relative flex bg-cream-50 border border-gold-400/25 shadow-sm rounded-sm overflow-hidden"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
            >
              <div className="flex flex-col items-center justify-center bg-rose-900 text-cream-50 w-20 flex-shrink-0 py-6 text-center">
                <span className="text-[10px] tracking-[2px] uppercase opacity-80">{event.date}</span>
                <span className="font-serif italic text-base mt-1 leading-tight">{event.time}</span>
              </div>

              <div className="flex-1 flex items-start gap-4 p-6 border-l border-dashed border-gold-400/25">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-400/15 flex items-center justify-center text-gold-400">
                  <event.Icon />
                </div>
                <div>
                  <h3 className="font-serif italic font-light text-rose-900 text-2xl">{event.title}</h3>
                  <p className="text-[11px] tracking-[1px] uppercase text-rose-500 mt-1 mb-2">{event.venue}</p>
                  <p className="text-rose-700 leading-relaxed text-[14px]">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
