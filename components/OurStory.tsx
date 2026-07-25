'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const CHAPTERS = [
  {
    title: 'Connection',
    caption: 'Our best adventure begins',
    text: 'A quiet conversation that turned into hours — two strangers who somehow already felt familiar.',
  },
  {
    title: 'Trust & Love',
    caption: 'Every high and low, together',
    text: 'Through every ordinary day and every big leap, we kept choosing each other, again and again.',
  },
  {
    title: 'Forever & Always',
    caption: 'Our vows, our promise',
    text: 'What started as a chance meeting became a lifetime we get to build, one day at a time.',
  },
]

export default function OurStory() {
  const [index, setIndex] = useState(0)

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + CHAPTERS.length) % CHAPTERS.length)
  const chapter = CHAPTERS[index]

  return (
    <section id="our-story" className="relative py-24 bg-cream-50 overflow-hidden">
      <div className="max-w-site mx-auto px-6">
        <AnimatedSection className="relative text-center mb-14">
          <span className="text-[10px] tracking-[4px] uppercase text-gold-400">Our Story</span>
          <h2 className="font-serif italic font-light text-rose-900 text-4xl md:text-5xl mt-3">
            Some chapters are written by destiny
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />

          {/* Postal stamp motif */}
          <div className="hidden sm:flex absolute right-0 top-0 flex-col items-center justify-center w-20 h-24 border-2 border-dashed border-gold-400/50 rounded-sm rotate-6 text-gold-400">
            <span className="text-[8px] tracking-[1px] uppercase leading-tight">Forever</span>
            <span className="font-serif italic text-sm">H &amp; S</span>
            <span className="text-[8px] tracking-[1px] uppercase leading-tight">Stamped</span>
          </div>
        </AnimatedSection>

        <div className="max-w-xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="bg-cream-50 border border-gold-400/25 shadow-lg p-4 pb-6">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/placeholder-story.jpg"
                      alt="Hemanth and Samantha"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-serif italic text-rose-900 text-center text-lg mt-4">
                    {chapter.caption}
                  </p>
                </div>

                <div className="text-center mt-6 px-4">
                  <h3 className="text-[10px] tracking-[3px] uppercase text-gold-400 mb-2">
                    {chapter.title}
                  </h3>
                  <p className="text-rose-700 leading-relaxed text-[15px]">{chapter.text}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => go(-1)}
              aria-label="Previous chapter"
              className="w-9 h-9 rounded-full border border-gold-400/40 flex items-center justify-center text-rose-500 hover:bg-gold-400/10 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2 3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.title}
                  aria-label={`Go to ${c.title}`}
                  onClick={() => setIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? 'bg-gold-400 w-4' : 'bg-gold-400/30'}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next chapter"
              className="w-9 h-9 rounded-full border border-gold-400/40 flex items-center justify-center text-rose-500 hover:bg-gold-400/10 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className="text-center font-serif italic text-rose-700 text-sm mt-10">
            &ldquo;From that first conversation to a lifetime of adventure.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
