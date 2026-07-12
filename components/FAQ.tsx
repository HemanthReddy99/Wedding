'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const FAQS = [
  {
    q: 'What is the dress code?',
    a: 'Smart traditional or semi-formal attire is encouraged. Ladies are welcome to wear sarees or salwar suits; gentlemen may wear kurtas or formal trousers. Please avoid white.',
  },
  {
    q: 'Is parking available at the venue?',
    a: 'Yes, ample parking is available on-site at the venue. Detailed parking instructions will be shared closer to the date.',
  },
  {
    q: 'Are children welcome?',
    a: 'Absolutely! Children are warmly welcome. The venue has open spaces for little ones to enjoy.',
  },
  {
    q: 'What time should I arrive?',
    a: 'We recommend arriving by 8:45 AM so you are comfortably seated before the Muhurtham begins at 9:00 AM.',
  },
  {
    q: 'Will food be served? Are dietary options available?',
    a: 'A full traditional vegetarian wedding lunch will be served. Please let us know in advance if you have any specific dietary requirements.',
  },
  {
    q: 'How do I get to the venue?',
    a: 'Please refer to the Venue section above for directions, transport options, and a map link. More details will be added soon.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="py-24 bg-cream-50">
      <div className="max-w-site mx-auto px-6">

        {/* Section label */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-[10px] tracking-[4px] uppercase text-gold-400">Questions</span>
          <h2 className="font-serif italic font-light text-rose-900 text-5xl md:text-6xl mt-3">
            Frequently Asked
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
        </AnimatedSection>

        {/* Accordion */}
        <div className="max-w-2xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <AnimatedSection key={faq.q} delay={i * 0.06}>
              <div className="frosted border border-gold-400/25 rounded-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-sans text-[14px] text-rose-900 pr-4 leading-snug">
                    {faq.q}
                  </span>
                  <motion.span
                    className="flex-shrink-0 text-gold-400 text-xl leading-none"
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-rose-700 text-[14px] leading-relaxed border-t border-gold-400/15 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
