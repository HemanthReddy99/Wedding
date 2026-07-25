'use client'

import { useEffect, useState } from 'react'

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

export default function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState(() => getTimeLeft(new Date(target)))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(getTimeLeft(new Date(target))), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Mins', value: time.minutes },
    { label: 'Secs', value: time.seconds },
  ]

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-4">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-sm bg-cream-50/95 border border-gold-400/40 flex items-center justify-center font-serif text-2xl sm:text-3xl text-rose-900 tabular-nums">
            {mounted ? String(u.value).padStart(2, '0') : '00'}
          </div>
          <span className="mt-2 text-[9px] tracking-[2px] uppercase text-rose-500">{u.label}</span>
        </div>
      ))}
    </div>
  )
}
