const MOTIF = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='22'>
    <path d='M18 2 L27 11 L18 20 L9 11 Z' fill='none' stroke='#c9a882' stroke-width='1.3' opacity='0.6'/>
    <circle cx='18' cy='11' r='2' fill='#b9793a' opacity='0.55'/>
    <circle cx='0' cy='11' r='1.8' fill='#c9a882' opacity='0.45'/>
    <circle cx='36' cy='11' r='1.8' fill='#c9a882' opacity='0.45'/>
  </svg>`
)

export default function BorderRule({ className = '' }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url("data:image/svg+xml,${MOTIF}")`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '36px 22px',
        backgroundPosition: 'center',
      }}
    />
  )
}
