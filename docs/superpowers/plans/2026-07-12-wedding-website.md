# Wedding Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully responsive, animated wedding website for Hemanth & Samantha (30 Aug 2026) with 6 sections: Hero, Our Story, Schedule, Venue, Gallery, and FAQ.

**Architecture:** Next.js 14 App Router with static export (`output: 'export'`). All sections are React Server Components by default; only components that need Framer Motion animations are marked `'use client'`. A single `page.tsx` assembles all section components in order.

**Tech Stack:** Next.js 14, Tailwind CSS v3, Framer Motion, Google Fonts (Cormorant Garamond + Jost), yet-another-react-lightbox, TypeScript.

## Global Constraints

- Node.js >= 18
- Next.js 14 with App Router and `output: 'export'` in `next.config.ts`
- Tailwind CSS v3 (not v4)
- Framer Motion v11
- All animated components must be `'use client'`
- Responsive breakpoints: mobile `< 768px`, tablet `768–1024px`, desktop `> 1024px`
- Max content width: `1200px` centered
- Color palette: background `#fdf8f3`, alternate `#f5ede3`, text `#4a3328`, secondary `#7a6458`, accent `#c9a882`
- Fonts: Cormorant Garamond (headings, italic weight 300), Jost (body, weight 300–400)
- All scroll animations: Framer Motion `whileInView`, `once: true`, `amount: 0.2`
- Images: Next.js `<Image>` with `unoptimized: true` (required for static export)
- No backend, no RSVP, no gift registry, no wedding party section
- Couple: Hemanth & Samantha | Date: 30 August 2026

---

## File Map

```
/app
  layout.tsx              — fonts, metadata, global html/body wrapper
  page.tsx                — assembles all section components
  globals.css             — Tailwind directives + CSS custom properties

/components
  Navbar.tsx              — fixed nav, scroll-aware frosted bg, mobile hamburger
  Hero.tsx                — full-screen hero, floating florals, entrance animations
  OurStory.tsx            — two-col layout, slide-in from sides
  Schedule.tsx            — timeline cards, staggered animation
  Venue.tsx               — address, Google Maps iframe, directions button
  Gallery.tsx             — responsive grid, lightbox, scale+fade on scroll
  FAQ.tsx                 — accordion with AnimatePresence height animation
  Footer.tsx              — simple centered footer
  AnimatedSection.tsx     — reusable wrapper: fadeUp on whileInView
  FloatingFlorals.tsx     — floating floral emoji animation layer

/public
  /images
    placeholder-hero.jpg      — 1920×1080 warm gradient placeholder
    placeholder-story.jpg     — 800×600 warm gradient placeholder
    gallery-1.jpg … gallery-6.jpg  — placeholder gallery images

tailwind.config.ts        — custom theme: colors, fontFamily
next.config.ts            — output: 'export', unoptimized images
tsconfig.json             — standard Next.js TS config
```

---

## Task 1: Project Scaffold & Configuration

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx` (shell only)

**Interfaces:**
- Produces: running `npm run dev` serves `http://localhost:3000` with a blank page and correct fonts loaded

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/I539330/Wedding
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted, accept all defaults. This installs Next.js 14, TypeScript, Tailwind CSS, and ESLint.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion yet-another-react-lightbox
```

- [ ] **Step 3: Configure static export in `next.config.ts`**

Replace the entire file with:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

- [ ] **Step 4: Configure Tailwind theme in `tailwind.config.ts`**

Replace the entire file with:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdf8f3',
          100: '#f5ede3',
          200: '#edddd0',
        },
        rose: {
          900: '#4a3328',
          700: '#7a6458',
          500: '#b89678',
        },
        gold: {
          400: '#c9a882',
          300: '#dfc4a0',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Set up global CSS in `app/globals.css`**

Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-cream-50 text-rose-900 font-sans;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    @apply bg-gold-300 text-rose-900;
  }
}

@layer utilities {
  .frosted {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .frosted-nav {
    background: rgba(253, 248, 243, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}
```

- [ ] **Step 6: Set up `app/layout.tsx` with Google Fonts**

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hemanth & Samantha — 30 August 2026',
  description: 'Join us as we celebrate our wedding day.',
  openGraph: {
    title: 'Hemanth & Samantha — 30 August 2026',
    description: 'Join us as we celebrate our wedding day.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 7: Create shell `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main>
      <p className="p-8 font-serif italic text-4xl text-rose-900">Hemanth & Samantha</p>
    </main>
  )
}
```

- [ ] **Step 8: Verify dev server starts and fonts load**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: page shows "Hemanth & Samantha" in Cormorant Garamond italic. No console errors.

- [ ] **Step 9: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 project with Tailwind, Framer Motion, fonts"
```

---

## Task 2: Placeholder Images

**Files:**
- Create: `public/images/placeholder-hero.jpg`
- Create: `public/images/placeholder-story.jpg`
- Create: `public/images/gallery-1.jpg` through `gallery-6.jpg`

**Interfaces:**
- Produces: image files accessible at `/images/placeholder-hero.jpg` etc. in the browser

- [ ] **Step 1: Create placeholder images using sharp or a simple script**

```bash
# Install sharp temporarily for image generation
npm install --save-dev sharp

# Create the generation script
cat > scripts/gen-placeholders.mjs << 'EOF'
import sharp from 'sharp'
import { mkdirSync } from 'fs'

mkdirSync('public/images', { recursive: true })

// Hero: warm gradient 1920x1080
await sharp({
  create: { width: 1920, height: 1080, channels: 3, background: { r: 237, g: 221, b: 208 } }
}).jpeg({ quality: 80 }).toFile('public/images/placeholder-hero.jpg')

// Story: 800x600
await sharp({
  create: { width: 800, height: 600, channels: 3, background: { r: 245, g: 237, b: 227 } }
}).jpeg({ quality: 80 }).toFile('public/images/placeholder-story.jpg')

// Gallery: 6 images at 800x600 with slightly varied warm tones
const galleryColors = [
  { r: 237, g: 221, b: 208 },
  { r: 245, g: 237, b: 227 },
  { r: 229, g: 210, b: 196 },
  { r: 240, g: 228, b: 215 },
  { r: 233, g: 218, b: 204 },
  { r: 248, g: 240, b: 232 },
]
for (let i = 0; i < 6; i++) {
  await sharp({
    create: { width: 800, height: 600, channels: 3, background: galleryColors[i] }
  }).jpeg({ quality: 80 }).toFile(`public/images/gallery-${i + 1}.jpg`)
}

console.log('Placeholder images generated.')
EOF

node scripts/gen-placeholders.mjs
```

- [ ] **Step 2: Verify images exist**

```bash
ls public/images/
```

Expected output:
```
gallery-1.jpg  gallery-2.jpg  gallery-3.jpg
gallery-4.jpg  gallery-5.jpg  gallery-6.jpg
placeholder-hero.jpg  placeholder-story.jpg
```

- [ ] **Step 3: Commit**

```bash
git add public/images/ scripts/
git commit -m "feat: add placeholder images for all sections"
```

---

## Task 3: Reusable Animated Components

**Files:**
- Create: `components/AnimatedSection.tsx`
- Create: `components/FloatingFlorals.tsx`

**Interfaces:**
- Produces:
  - `AnimatedSection` — `'use client'` wrapper that fades+slides children into view on scroll
    ```tsx
    // Props:
    interface AnimatedSectionProps {
      children: React.ReactNode
      className?: string
      delay?: number  // seconds, default 0
      direction?: 'up' | 'left' | 'right'  // default 'up'
    }
    ```
  - `FloatingFlorals` — `'use client'` component rendering 10–14 drifting floral symbols
    ```tsx
    // Props: none
    // Renders absolutely-positioned florals, parent must be position:relative overflow:hidden
    ```

- [ ] **Step 1: Create `components/AnimatedSection.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

const directionMap = {
  up:    { y: 25, x: 0 },
  left:  { y: 0,  x: -40 },
  right: { y: 0,  x: 40 },
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const { x, y } = directionMap[direction]

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `components/FloatingFlorals.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

const FLORALS = ['✿', '❀', '✾', '❁', '꽃', '✦', '◇', '❋']

const positions = [
  { left: '8%',  bottom: '15%', size: 16, duration: 7,  delay: 0   },
  { left: '18%', bottom: '25%', size: 20, duration: 9,  delay: 1.2 },
  { left: '30%', bottom: '10%', size: 14, duration: 6,  delay: 0.5 },
  { left: '42%', bottom: '30%', size: 18, duration: 8,  delay: 2.1 },
  { left: '55%', bottom: '8%',  size: 22, duration: 10, delay: 0.8 },
  { left: '65%', bottom: '20%', size: 15, duration: 7,  delay: 1.7 },
  { left: '75%', bottom: '35%', size: 19, duration: 9,  delay: 0.3 },
  { left: '85%', bottom: '12%', size: 16, duration: 6,  delay: 2.5 },
  { left: '22%', bottom: '45%', size: 13, duration: 8,  delay: 3.0 },
  { left: '60%', bottom: '42%', size: 17, duration: 11, delay: 1.4 },
]

export default function FloatingFlorals() {
  return (
    <>
      {positions.map((pos, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none text-gold-400 opacity-40"
          style={{ left: pos.left, bottom: pos.bottom, fontSize: pos.size }}
          animate={{
            y: [0, -70, 0],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 15, -10, 0],
          }}
          transition={{
            duration: pos.duration,
            delay: pos.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {FLORALS[i % FLORALS.length]}
        </motion.span>
      ))}
    </>
  )
}
```

- [ ] **Step 3: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no output (no errors).

- [ ] **Step 4: Commit**

```bash
git add components/AnimatedSection.tsx components/FloatingFlorals.tsx
git commit -m "feat: add AnimatedSection and FloatingFlorals reusable components"
```

---

## Task 4: Navbar

**Files:**
- Create: `components/Navbar.tsx`

**Interfaces:**
- Consumes: section IDs `hero`, `our-story`, `schedule`, `venue`, `gallery`, `faq`
- Produces: fixed navbar rendered at top of page; transparent over hero, frosted on scroll; hamburger on mobile

- [ ] **Step 1: Create `components/Navbar.tsx`**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Schedule',  href: '#schedule'  },
  { label: 'Venue',     href: '#venue'     },
  { label: 'Gallery',   href: '#gallery'   },
  { label: 'FAQ',       href: '#faq'       },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'frosted-nav shadow-sm border-b border-gold-300/30' : 'bg-transparent'
        }`}
      >
        <div className="max-w-site mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / couple name */}
          <a
            href="#hero"
            className="font-serif italic text-xl text-rose-900 tracking-wide hover:text-gold-400 transition-colors"
          >
            H &amp; S
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase text-rose-700 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-rose-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`block w-6 h-px bg-rose-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-rose-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-cream-50 flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
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
```

- [ ] **Step 2: Add Navbar to `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div id="hero" className="h-screen bg-cream-100 flex items-center justify-center">
        <p className="font-serif italic text-5xl text-rose-900">Hemanth &amp; Samantha</p>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- Navbar is transparent at top
- Scroll down → navbar becomes frosted white
- Resize to mobile → hamburger button appears
- Tap hamburger → full-screen overlay opens with animated links

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/page.tsx
git commit -m "feat: add responsive Navbar with scroll-aware frosted background and mobile overlay"
```

---

## Task 5: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `FloatingFlorals` from Task 3, `public/images/placeholder-hero.jpg` from Task 2
- Produces: full-screen hero with `id="hero"`, animated name/date entrance, floating florals, scroll-down arrow

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
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
```

- [ ] **Step 2: Update `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- Full-screen hero with warm background
- "30 August 2026" pill fades in, then names, then tagline
- Floating floral symbols drift upward continuously
- Animated scroll arrow at bottom
- No layout shift or console errors

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with floating florals and entrance animations"
```

---

## Task 6: Our Story Section

**Files:**
- Create: `components/OurStory.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `AnimatedSection` from Task 3, `public/images/placeholder-story.jpg` from Task 2
- Produces: section with `id="our-story"`, two-col on desktop, stacked on mobile, slide-in from sides

- [ ] **Step 1: Create `components/OurStory.tsx`**

```tsx
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
```

- [ ] **Step 2: Add OurStory to `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurStory />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll to the Our Story section. Expected:
- Section label and heading fade up as they enter viewport
- Photo slides in from the left, text slides in from the right
- On mobile (resize browser to < 768px): single column, photo on top, text below
- No overflow or layout issues

- [ ] **Step 4: Commit**

```bash
git add components/OurStory.tsx app/page.tsx
git commit -m "feat: add Our Story section with slide-in animations"
```

---

## Task 7: Schedule Section

**Files:**
- Create: `components/Schedule.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `AnimatedSection` from Task 3
- Produces: section with `id="schedule"`, staggered timeline cards for Muhurtham + Lunch + placeholder events

- [ ] **Step 1: Create `components/Schedule.tsx`**

```tsx
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
```

- [ ] **Step 2: Add Schedule to `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Schedule from '@/components/Schedule'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurStory />
      <Schedule />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Schedule. Expected:
- Three event cards stagger in (each 120ms after the previous)
- Cards have frosted glass appearance with gold border
- On mobile: time label stacks below event title

- [ ] **Step 4: Commit**

```bash
git add components/Schedule.tsx app/page.tsx
git commit -m "feat: add Schedule section with staggered timeline cards"
```

---

## Task 8: Venue Section

**Files:**
- Create: `components/Venue.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `AnimatedSection` from Task 3
- Produces: section with `id="venue"`, venue details, Google Maps embed, directions button

- [ ] **Step 1: Create `components/Venue.tsx`**

```tsx
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
```

- [ ] **Step 2: Add Venue to `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Schedule from '@/components/Schedule'
import Venue from '@/components/Venue'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurStory />
      <Schedule />
      <Venue />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Venue. Expected:
- Venue details card and How to Reach card slide in from left
- Map iframe slides in from right
- Get Directions button has hover effect (gold fill)
- On mobile: single column stacked layout

- [ ] **Step 4: Commit**

```bash
git add components/Venue.tsx app/page.tsx
git commit -m "feat: add Venue section with Google Maps embed and transport directions"
```

---

## Task 9: Photo Gallery Section

**Files:**
- Create: `components/Gallery.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `AnimatedSection` from Task 3, `public/images/gallery-1.jpg` through `gallery-6.jpg` from Task 2, `yet-another-react-lightbox`
- Produces: section with `id="gallery"`, responsive 3-col grid, scale+fade on scroll, lightbox on click

- [ ] **Step 1: Create `components/Gallery.tsx`**

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import AnimatedSection from './AnimatedSection'

const IMAGES = [
  { src: '/images/gallery-1.jpg', alt: 'Hemanth and Samantha' },
  { src: '/images/gallery-2.jpg', alt: 'Hemanth and Samantha' },
  { src: '/images/gallery-3.jpg', alt: 'Hemanth and Samantha' },
  { src: '/images/gallery-4.jpg', alt: 'Hemanth and Samantha' },
  { src: '/images/gallery-5.jpg', alt: 'Hemanth and Samantha' },
  { src: '/images/gallery-6.jpg', alt: 'Hemanth and Samantha' },
]

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  return (
    <section id="gallery" className="py-24 bg-cream-100">
      <div className="max-w-site mx-auto px-6">

        {/* Section label */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-[10px] tracking-[4px] uppercase text-gold-400">Memories</span>
          <h2 className="font-serif italic font-light text-rose-900 text-5xl md:text-6xl mt-3">
            Photo Gallery
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-rose-900/0 group-hover:bg-rose-900/15 transition-colors duration-300" />
              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-gold-400/0 group-hover:border-gold-400/40 transition-colors duration-300 rounded-sm pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={IMAGES.map((img) => ({ src: img.src, alt: img.alt }))}
        styles={{ container: { backgroundColor: 'rgba(74, 51, 40, 0.95)' } }}
      />
    </section>
  )
}
```

- [ ] **Step 2: Add Gallery to `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Schedule from '@/components/Schedule'
import Venue from '@/components/Venue'
import Gallery from '@/components/Gallery'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurStory />
      <Schedule />
      <Venue />
      <Gallery />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Gallery. Expected:
- 3-column grid on desktop, 2-column on tablet, 1-column on mobile
- Images scale+fade in as they enter viewport (staggered)
- Hover: image zooms slightly, gold border appears
- Click any image: lightbox opens with dark rose background, arrow navigation, close button
- Lightbox swipe works on touch (mobile)

- [ ] **Step 4: Commit**

```bash
git add components/Gallery.tsx app/page.tsx
git commit -m "feat: add Gallery section with lightbox and scroll animations"
```

---

## Task 10: FAQ Section

**Files:**
- Create: `components/FAQ.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `AnimatedSection` from Task 3, Framer Motion `AnimatePresence`
- Produces: section with `id="faq"`, accordion with smooth height animation

- [ ] **Step 1: Create `components/FAQ.tsx`**

```tsx
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
```

- [ ] **Step 2: Add FAQ to `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Schedule from '@/components/Schedule'
import Venue from '@/components/Venue'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurStory />
      <Schedule />
      <Venue />
      <Gallery />
      <FAQ />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll to FAQ. Expected:
- 6 accordion items fade in staggered
- Click item: answer expands with smooth height animation, `+` rotates to `×`
- Click again: collapses smoothly
- Only one item open at a time

- [ ] **Step 4: Commit**

```bash
git add components/FAQ.tsx app/page.tsx
git commit -m "feat: add FAQ section with animated accordion"
```

---

## Task 11: Footer

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: simple centered footer with couple names, date, and a small floral motif

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="py-16 bg-cream-100 text-center border-t border-gold-400/20">
      <div className="space-y-3">
        <div className="text-gold-400 text-xl tracking-widest">✦ ❁ ✦</div>
        <p className="font-serif italic font-light text-rose-900 text-2xl">
          Hemanth &amp; Samantha
        </p>
        <p className="text-[11px] tracking-[3px] uppercase text-rose-500">
          30 August 2026
        </p>
        <p className="text-[12px] text-rose-500 italic mt-4">
          Made with love, for love.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add Footer to `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Schedule from '@/components/Schedule'
import Venue from '@/components/Venue'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurStory />
      <Schedule />
      <Venue />
      <Gallery />
      <FAQ />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Verify full page in browser**

Scroll the entire page top to bottom. Expected:
- All 6 sections plus footer render correctly
- No broken layouts, no console errors
- All animations trigger as sections enter viewport

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer — complete all page sections"
```

---

## Task 12: Mobile Polish & Final QA

**Files:**
- Modify: `components/Hero.tsx` — verify mobile font sizes
- Modify: `components/OurStory.tsx` — verify mobile stacking
- Modify: `components/Schedule.tsx` — verify card layout on small screens
- Modify: `components/Gallery.tsx` — verify grid columns

**Interfaces:**
- Produces: verified responsive experience at 375px, 768px, and 1280px

- [ ] **Step 1: Test at mobile (375px)**

In Chrome DevTools (F12 → Toggle Device Toolbar → iPhone SE):
- Hero: names should not overflow, floating florals should not cause horizontal scroll
- Our Story: photo and text should stack vertically
- Schedule: cards should be full width, time label stacks below title
- Venue: venue cards and map should be full width and stacked
- Gallery: 1 column grid
- FAQ: accordion items full width
- Navbar: hamburger visible, links hidden

Fix any overflow issues. For each fix, the change is: add `overflow-x-hidden` to the `<main>` tag in `app/page.tsx`:

```tsx
<main className="overflow-x-hidden">
```

- [ ] **Step 2: Test at tablet (768px)**

Resize to 768px width. Expected:
- Our Story: two columns kick in
- Gallery: 2 columns
- Venue: 2 columns

- [ ] **Step 3: Test at desktop (1280px)**

Full desktop. Expected:
- All sections max out at 1200px centered
- Gallery: 3 columns
- Venue: 2 columns

- [ ] **Step 4: Check `prefers-reduced-motion`**

In Chrome DevTools → Rendering → Emulate CSS media feature → `prefers-reduced-motion: reduce`. Expected: animations still complete (Framer Motion reduces to instant transitions, not broken layouts).

- [ ] **Step 5: Run build to verify no errors**

```bash
npm run build
```

Expected: build completes with no errors. Output folder `out/` is created.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: mobile polish and final QA — all breakpoints verified"
```

---

## Task 13: Static Export & Deployment

**Files:**
- No new files — `next.config.ts` already has `output: 'export'`

**Interfaces:**
- Produces: `out/` directory deployable to Vercel, Netlify, or GitHub Pages

- [ ] **Step 1: Build static export**

```bash
npm run build
ls out/
```

Expected: `out/` directory exists with `index.html` and `_next/` subdirectory.

- [ ] **Step 2: Deploy to Vercel (optional but recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts: link to your account, accept defaults. Vercel auto-detects Next.js. Expected: a live URL like `https://wedding-xyz.vercel.app`.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete wedding website — all sections, animations, responsive"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Hero (full-screen, floating florals, entrance animations) — Task 5
- [x] Our Story (two-col, slide-in from sides) — Task 6
- [x] Schedule (Muhurtham + Lunch, staggered cards) — Task 7
- [x] Venue & How to Reach (map embed, directions) — Task 8
- [x] Photo Gallery (grid, lightbox, scale+fade) — Task 9
- [x] FAQ (accordion, AnimatePresence) — Task 10
- [x] Navbar (fixed, scroll-aware, mobile hamburger) — Task 4
- [x] Footer — Task 11
- [x] Fully responsive (mobile/tablet/desktop) — Task 12
- [x] Static export, Vercel deploy — Task 13
- [x] Style C (Balanced) animations throughout
- [x] No RSVP, no gift registry, no wedding party — confirmed out of scope

**Placeholder scan:** None found — all steps contain complete code.

**Type consistency:**
- `AnimatedSection` props (`direction`, `delay`, `className`) used consistently across Tasks 6–10
- `FloatingFlorals` used in Hero only — no props needed
- `IMAGES` array shape `{ src, alt }` matches `yet-another-react-lightbox` slides format `{ src, alt }`
