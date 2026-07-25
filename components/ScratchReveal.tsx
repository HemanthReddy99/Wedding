'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ScratchRevealProps {
  children: React.ReactNode
  onRevealed?: () => void
}

const CLEAR_THRESHOLD = 0.42
const BRUSH_RADIUS = 30

export default function ScratchReveal({ children, onRevealed }: ScratchRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingRef = useRef(false)
  const revealedRef = useRef(false)
  const [revealed, setRevealed] = useState(false)

  const paintSurface = useCallback((width: number, height: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, width, height)

    const r = 16
    const roundedRectPath = () => {
      ctx.beginPath()
      ctx.moveTo(r, 0)
      ctx.arcTo(width, 0, width, height, r)
      ctx.arcTo(width, height, 0, height, r)
      ctx.arcTo(0, height, 0, 0, r)
      ctx.arcTo(0, 0, width, 0, r)
      ctx.closePath()
    }

    roundedRectPath()
    const bg = ctx.createLinearGradient(0, 0, width, height)
    bg.addColorStop(0, '#eec89a')
    bg.addColorStop(0.5, '#d29c56')
    bg.addColorStop(1, '#b9793a')
    ctx.fillStyle = bg
    ctx.fill()

    ctx.save()
    roundedRectPath()
    ctx.clip()

    // Soft foil speckle texture
    const speckleCount = Math.floor((width * height) / 700)
    for (let i = 0; i < speckleCount; i++) {
      const sx = Math.random() * width
      const sy = Math.random() * height
      ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.09})`
      ctx.beginPath()
      ctx.arc(sx, sy, Math.random() * 1.3, 0, Math.PI * 2)
      ctx.fill()
    }

    // Delicate lotus/mandala motif
    const cx = width / 2
    const cy = height / 2 - Math.min(height * 0.1, 10)
    const petalR = Math.min(width, height) * 0.16
    ctx.strokeStyle = 'rgba(253, 248, 243, 0.55)'
    ctx.lineWidth = 1.1
    for (let p = 0; p < 8; p++) {
      const a = (p / 8) * Math.PI * 2
      ctx.beginPath()
      ctx.ellipse(
        cx + Math.cos(a) * petalR * 0.55,
        cy + Math.sin(a) * petalR * 0.55,
        petalR * 0.5,
        petalR * 0.24,
        a,
        0,
        Math.PI * 2
      )
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(cx, cy, petalR * 0.2, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(253, 248, 243, 0.75)'
    ctx.stroke()

    ctx.fillStyle = 'rgba(74, 51, 40, 0.8)'
    ctx.font = '600 10px Jost, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('S C R A T C H   T O   R E V E A L', cx, height - 14)

    ctx.restore()

    roundedRectPath()
    ctx.strokeStyle = 'rgba(253, 248, 243, 0.45)'
    ctx.lineWidth = 1.5
    ctx.stroke()
  }, [])

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const { width, height } = container.getBoundingClientRect()
    if (width === 0 || height === 0) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext('2d')
    ctx?.scale(dpr, dpr)
    paintSurface(width, height)
  }, [paintSurface])

  useEffect(() => {
    setupCanvas()
    window.addEventListener('resize', setupCanvas)
    return () => window.removeEventListener('resize', setupCanvas)
  }, [setupCanvas])

  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, BRUSH_RADIUS)
    gradient.addColorStop(0, 'rgba(0,0,0,1)')
    gradient.addColorStop(0.72, 'rgba(0,0,0,0.95)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2)
    ctx.fill()
  }

  const checkCleared = useCallback(() => {
    if (revealedRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const { width, height } = canvas
    if (width === 0 || height === 0) return
    const data = ctx.getImageData(0, 0, width, height).data
    let cleared = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 8) {
      total++
      if (data[i] < 40) cleared++
    }
    if (total > 0 && cleared / total > CLEAR_THRESHOLD) {
      revealedRef.current = true
      setRevealed(true)
      onRevealed?.()
    }
  }, [onRevealed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const posFromEvent = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    let moveCount = 0
    const handlePointerDown = (e: PointerEvent) => {
      if (revealedRef.current) return
      drawingRef.current = true
      const { x, y } = posFromEvent(e)
      scratchAt(x, y)
    }
    const handlePointerMove = (e: PointerEvent) => {
      if (!drawingRef.current || revealedRef.current) return
      const { x, y } = posFromEvent(e)
      scratchAt(x, y)
      moveCount += 1
      if (moveCount % 4 === 0) checkCleared()
    }
    const handlePointerUp = () => {
      if (drawingRef.current) checkCleared()
      drawingRef.current = false
    }

    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [checkCleared])

  return (
    <div ref={containerRef} className="relative inline-block select-none">
      {children}

      <canvas
        ref={canvasRef}
        aria-hidden={revealed}
        className={`absolute inset-0 rounded-2xl shadow-[0_10px_28px_-8px_rgba(120,80,30,0.45)] transition-all duration-700 ease-out ${
          revealed ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100 cursor-pointer'
        }`}
        style={{ touchAction: 'none' }}
      />

      {!revealed && (
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          initial={{ x: '-130%' }}
          animate={{ x: '130%' }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
        >
          <div className="w-1/3 h-full -skew-x-12 bg-gradient-to-r from-transparent via-cream-50/50 to-transparent" />
        </motion.div>
      )}
    </div>
  )
}
