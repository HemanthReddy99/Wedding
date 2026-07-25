'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Countdown from './Countdown'
import ScratchReveal from './ScratchReveal'
import Confetti from './Confetti'
import { animatedScrollTo } from './animatedScroll'

const WEDDING_DATE = '2026-08-30T09:00:00+05:30'
const CELEBRATION_DURATION = 3000

export default function Hero() {
  const [celebrate, setCelebrate] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleRevealed = () => {
    setCelebrate(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setCelebrate(false), CELEBRATION_DURATION)
  }

  // Stop the celebration early if the visitor scrolls away from the hero.
  useEffect(() => {
    if (!celebrate) return
    const handleScroll = () => {
      setCelebrate(false)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [celebrate])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden py-28"
    >
      <Image
        src="/images/hero.png"
        alt="South Indian temple by the backwaters"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-cream-50/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50/30 via-transparent to-cream-50/70" />
      <Confetti active={celebrate} />

      <div className="relative z-10 px-6 flex flex-col items-center">
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-8 h-px bg-gold-400" />
          <span className="flex items-center justify-center w-14 h-14 rounded-full border border-gold-400 font-serif italic text-lg text-rose-900 bg-cream-50/80">
            H&nbsp;|&nbsp;S
          </span>
          <span className="w-8 h-px bg-gold-400" />
        </motion.div>

        <motion.h1
          className="font-serif font-light text-rose-900 leading-[1.1] mb-2"
          style={{ fontSize: 'clamp(34px, 6vw, 56px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Hemanth <span className="italic text-gold-400" style={{ fontSize: '0.6em' }}>weds</span> Samantha
        </motion.h1>

        <motion.p
          className="text-[11px] tracking-[4px] uppercase text-rose-500 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We are getting married
        </motion.p>

        <motion.div
          className="frosted border border-gold-400/30 rounded-sm px-8 py-4 mb-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <p className="text-[9px] tracking-[3px] uppercase text-gold-400 mb-1">Save the date</p>
          <p className="font-serif italic text-2xl text-rose-900">30th August 2026</p>
          <p className="text-[11px] tracking-[1px] text-rose-500 mt-0.5">City, State</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-[10px] tracking-[3px] uppercase text-rose-500 mb-4">
            The countdown begins
          </p>
          <ScratchReveal onRevealed={handleRevealed}>
            <div className="px-3 py-2">
              <Countdown target={WEDDING_DATE} />
            </div>
          </ScratchReveal>
          <p className="font-serif italic text-rose-700 mt-5 text-sm">
            Until our forever begins
          </p>
        </motion.div>
      </div>

      <motion.a
        href="#our-story"
        onClick={(e) => {
          e.preventDefault()
          animatedScrollTo('#our-story')
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-rose-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4, duration: 0.5 }, y: { delay: 1.4, duration: 2, repeat: Infinity } }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[3px] uppercase">scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  )
}
