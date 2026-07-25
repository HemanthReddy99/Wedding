const MOTIF = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='22' height='36'>
    <path d='M2 18 L11 9 L20 18 L11 27 Z' fill='none' stroke='#c9a882' stroke-width='1.3' opacity='0.6'/>
    <circle cx='11' cy='18' r='2' fill='#b9793a' opacity='0.55'/>
    <circle cx='11' cy='0' r='1.8' fill='#c9a882' opacity='0.45'/>
    <circle cx='11' cy='36' r='1.8' fill='#c9a882' opacity='0.45'/>
  </svg>`
)

export default function SideBorderRule({ className = '' }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url("data:image/svg+xml,${MOTIF}")`,
        backgroundRepeat: 'repeat-y',
        backgroundSize: '22px 36px',
        backgroundPosition: 'center',
      }}
    />
  )
}
