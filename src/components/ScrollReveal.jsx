import { motion, useReducedMotion } from 'framer-motion'

// Lenis-compatible by design: Lenis drives native window scroll (no custom
// container), so whileInView / IntersectionObserver triggers work unchanged —
// no Lenis event wiring needed here. Short travel distances keep the reveal
// smooth; a permanent `will-change` on every block would create dozens of GPU
// layers and cause flicker on scroll.
const directions = {
  fade: { opacity: 0 },
  'slide-up': { opacity: 0, y: 24 },
  'slide-left': { opacity: 0, x: 24 },
  'slide-right': { opacity: 0, x: -24 },
}

export default function ScrollReveal({
  children,
  direction = 'fade',
  delay = 0,
  duration = 0.6,
  className = '',
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const hidden = reduceMotion ? directions.fade : directions[direction] || directions.fade

  // `margin` expands the viewport downward (+160px) so the reveal fires
  // *before* the block scrolls into view and is mostly finished on arrival,
  // instead of animating (and re-rasterizing text) right under the user's eyes.
  // `amount: 0.15` also avoids waiting for the whole block to enter.
  return (
    <motion.div
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 160px 0px', amount: 0.15 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}