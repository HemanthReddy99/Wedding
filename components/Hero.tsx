'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import FloatingFlorals from './FloatingFlorals'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/placeholder-hero.jpg"
        alt="Hemanth and Samantha"
        fill
        className="object-cover"
        priority
      />

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50/60 via-cream-100/40 to-cream-200/70" />

      {/* Floating florals */}
      <FloatingFlorals />

      {/* Content */}
      <div className="relative z-10 px-6">
        <motion.span
          className="inline-block text-[10px] tracking-[4px] uppercase text-gold-400 border border-gold-400 px-4 py-1.5 rounded-full mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          30 August 2026
        </motion.span>

        <motion.h1
          className="font-serif italic font-light text-rose-900 leading-[1.05] mb-4"
          style={{ fontSize: 'clamp(52px, 9vw, 96px)' }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.6 }}
        >
          Hemanth
          <span className="block text-gold-400" style={{ fontSize: '0.7em' }}>
            &amp;
          </span>
          Samantha
        </motion.h1>

        <motion.p
          className="text-xs tracking-[3px] uppercase text-rose-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          We&rsquo;re getting married
        </motion.p>
      </div>

      {/* Scroll arrow */}
      <motion.a
        href="#our-story"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-rose-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5, duration: 0.5 }, y: { delay: 1.5, duration: 2, repeat: Infinity } }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[3px] uppercase">scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.a>
    </section>
  )
}
