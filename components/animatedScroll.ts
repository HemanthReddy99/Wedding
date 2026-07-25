const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Scrolls to the element matching `hash` (e.g. "#our-story") with a custom
 * eased curve rather than a native instant jump or the browser's linear
 * `scroll-behavior: smooth`.
 */
export function animatedScrollTo(hash: string, duration = 900) {
  if (typeof window === 'undefined') return
  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return

  const startY = window.scrollY
  const navOffset = 64
  const targetY = el.getBoundingClientRect().top + startY - navOffset
  const distance = targetY - startY

  if (Math.abs(distance) < 2) return

  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}
