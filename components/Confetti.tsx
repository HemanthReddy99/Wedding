'use client'

import { motion, type Easing } from 'framer-motion'

const GOLD_COLORS = ['#c9a882', '#e8b976', '#f0c04a', '#d97b3f', '#f3ddb8', '#b9793a', '#e0a53c', '#f6d37a']

type Shape = 'rect' | 'circle' | 'flower'
type Edge = 'top' | 'left' | 'right'

function makePieces(count: number, spanSeconds: number) {
  return Array.from({ length: count }, (_, i) => {
    const zone = i % 3
    const fromEdge: Edge = zone === 0 ? 'top' : zone === 1 ? 'left' : 'right'
    const shapeRoll = i % 6
    const shape: Shape = shapeRoll === 0 ? 'flower' : shapeRoll % 2 === 0 ? 'circle' : 'rect'

    let originXPercent = 0
    let originYPercent = 0
    let travelXvw = 0
    let riseVh = 0

    if (fromEdge === 'top') {
      originXPercent = (i * 7.3) % 100
      originYPercent = -6
      travelXvw = ((i * 13) % 22) - 11 // gentle side drift while raining down
      riseVh = -(1 + (i % 3))
    } else if (fromEdge === 'left') {
      originXPercent = -4
      originYPercent = 1 + ((i * 12.7) % 94)
      travelXvw = 26 + ((i * 11) % 58) // sweeps well past the midpoint of the screen
      riseVh = -(6 + ((i * 9) % 9))
    } else {
      originXPercent = 104
      originYPercent = 1 + ((i * 12.7) % 94)
      travelXvw = -(26 + ((i * 11) % 58))
      riseVh = -(6 + ((i * 9) % 9))
    }

    return {
      originXPercent,
      originYPercent,
      travelXvw,
      riseVh,
      wobbleVw: 3 + ((i * 5) % 7),
      fallVh: 78 + ((i * 17) % 60),
      size: shape === 'flower' ? 14 + (i % 3) * 4 : 5 + ((i * 7) % 5) * 1.5,
      color: GOLD_COLORS[i % GOLD_COLORS.length],
      delay: (i / count) * spanSeconds,
      duration: 2.4 + ((i * 3) % 12) * 0.18,
      spin: 220 + (i % 7) * 70,
      spinDir: i % 3 === 0 ? -1 : 1,
      shape,
    }
  })
}

const RISE_EASE: Easing = [0.22, 0.7, 0.35, 1]
const FALL_EASE: Easing = [0.55, 0, 0.85, 0.25]

export default function Confetti({
  active,
  count = 220,
  spanSeconds = 2.2,
}: {
  active: boolean
  count?: number
  spanSeconds?: number
}) {
  if (!active) return null
  const pieces = makePieces(count, spanSeconds)

  return (
    <div className="pointer-events-none fixed inset-0 z-[110] overflow-hidden">
      {pieces.map((p, i) => {
        const sign = p.travelXvw >= 0 ? 1 : -1
        return (
          <motion.span
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              left: `${p.originXPercent}%`,
              top: `${p.originYPercent}%`,
              width: p.size,
              height: p.shape === 'rect' ? p.size * 1.8 : p.size,
              borderRadius: p.shape === 'circle' ? '9999px' : p.shape === 'rect' ? '1px' : '0',
              backgroundColor: p.shape === 'flower' ? 'transparent' : p.color,
              color: p.color,
              fontSize: p.shape === 'flower' ? p.size : undefined,
              lineHeight: 1,
            }}
            initial={{ x: '0vw', y: '0vh', opacity: 0, rotate: 0, scale: 0.5 }}
            animate={{
              x: [
                '0vw',
                `${p.travelXvw * 0.7}vw`,
                `${p.travelXvw - sign * p.wobbleVw * 0.5}vw`,
                `${p.travelXvw + sign * p.wobbleVw}vw`,
                `${p.travelXvw - sign * p.wobbleVw * 0.3}vw`,
              ],
              y: ['0vh', `${p.riseVh}vh`, `${p.fallVh * 0.3}vh`, `${p.fallVh * 0.65}vh`, `${p.fallVh}vh`],
              opacity: [0, 1, 1, 1, 0.9],
              rotate: [0, p.spinDir * p.spin * 0.25, p.spinDir * p.spin * 0.55, p.spinDir * p.spin * 0.8, p.spinDir * p.spin],
              scale: [0.5, 1, 1, 1, 0.95],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              times: [0, 0.2, 0.45, 0.72, 1],
              ease: [RISE_EASE, FALL_EASE, FALL_EASE, FALL_EASE],
              opacity: { duration: 0.25, delay: p.delay },
            }}
          >
            {p.shape === 'flower' ? '❀' : null}
          </motion.span>
        )
      })}
    </div>
  )
}
