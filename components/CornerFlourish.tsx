function petalRing(
  n: number,
  size: number,
  cx: number,
  cy: number,
  opacity: number,
  rFactor: number,
  key: string
) {
  return Array.from({ length: n }).map((_, i) => {
    const angle = (360 / n) * i
    const rad = (angle * Math.PI) / 180
    const dist = size * rFactor
    const px = cx + Math.cos(rad) * dist
    const py = cy + Math.sin(rad) * dist
    return (
      <ellipse
        key={`${key}-${i}`}
        cx={px}
        cy={py}
        rx={size * 0.42}
        ry={size * 0.19}
        transform={`rotate(${angle} ${px} ${py})`}
        fill="currentColor"
        opacity={opacity}
      />
    )
  })
}

export default function CornerFlourish({ className = '' }: { className?: string }) {
  const bigCx = 152
  const bigCy = 156
  const bigSize = 52
  const budCx = 64
  const budCy = 58
  const budSize = 24
  const tinyCx = 108
  const tinyCy = 100
  const tinySize = 15

  return (
    <svg viewBox="0 0 210 210" className={className} fill="none" aria-hidden="true">
      {/* main curling vine */}
      <path
        d="M0 0 C 46 8, 58 40, 38 62 C 66 54, 92 74, 84 104 C 116 96, 140 116, 148 152"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
      <path
        d="M0 0 C 26 20, 18 38, 40 44"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.4"
        fill="none"
      />
      <path
        d="M38 62 C 30 82, 44 92, 62 84"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.35"
        fill="none"
      />

      {/* leaves along the vine */}
      <ellipse cx="52" cy="26" rx="13" ry="5.4" transform="rotate(-35 52 26)" fill="currentColor" opacity="0.3" />
      <ellipse cx="26" cy="50" rx="12" ry="5" transform="rotate(42 26 50)" fill="currentColor" opacity="0.28" />
      <ellipse cx="98" cy="86" rx="14" ry="5.6" transform="rotate(-22 98 86)" fill="currentColor" opacity="0.28" />
      <ellipse cx="66" cy="108" rx="12" ry="5" transform="rotate(38 66 108)" fill="currentColor" opacity="0.26" />
      <ellipse cx="122" cy="128" rx="13" ry="5.2" transform="rotate(-18 122 128)" fill="currentColor" opacity="0.26" />

      {/* tiny bud */}
      <g opacity="0.7">
        {petalRing(6, tinySize, tinyCx, tinyCy, 0.4, 0.4, 'tiny')}
        <circle cx={tinyCx} cy={tinyCy} r={tinySize * 0.2} fill="currentColor" opacity="0.6" />
      </g>

      {/* mid bud blossom */}
      <g>
        {petalRing(8, budSize, budCx, budCy, 0.42, 0.42, 'bud-outer')}
        {petalRing(8, budSize * 0.58, budCx, budCy, 0.6, 0.34, 'bud-inner')}
        <circle cx={budCx} cy={budCy} r={budSize * 0.2} fill="currentColor" opacity="0.75" />
      </g>

      {/* grand blossom */}
      <g>
        {petalRing(12, bigSize, bigCx, bigCy, 0.4, 0.44, 'big-outer')}
        {petalRing(12, bigSize * 0.64, bigCx, bigCy, 0.55, 0.34, 'big-mid')}
        {petalRing(10, bigSize * 0.34, bigCx, bigCy, 0.7, 0.26, 'big-inner')}
        <circle cx={bigCx} cy={bigCy} r={bigSize * 0.2} fill="currentColor" opacity="0.9" />
      </g>
    </svg>
  )
}
