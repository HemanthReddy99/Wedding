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
