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
