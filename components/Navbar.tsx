'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { animatedScrollTo } from './animatedScroll'

const LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Venue', href: '#venue' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    animatedScrollTo(href)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'frosted-nav shadow-sm border-b border-gold-300/30' : 'bg-transparent'
        }`}
      >
        <div className="max-w-site mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNavigate(e, '#hero')}
            className="font-serif italic text-xl text-rose-900 tracking-wide hover:text-gold-400 transition-colors"
          >
            H &amp; S
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavigate(e, link.href)}
                className="text-xs tracking-widest uppercase text-rose-700 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-px bg-rose-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`block w-6 h-px bg-rose-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-rose-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-cream-50 flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavigate(e, link.href)}
                className="font-serif italic text-4xl text-rose-900 hover:text-gold-400 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
