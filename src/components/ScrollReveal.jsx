import { motion } from 'framer-motion'

const directions = {
  fade: { opacity: 0 },
  'slide-up': { opacity: 0, y: 60 },
  'slide-left': { opacity: 0, x: 60 },
  'slide-right': { opacity: 0, x: -60 },
}

export default function ScrollReveal({
  children,
  direction = 'fade',
  delay = 0,
  duration = 0.6,
  className = '',
  ...props
}) {
  return (
    <motion.div
      initial={directions[direction] || directions.fade}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
