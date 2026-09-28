import { useCallback, useEffect, useRef } from 'react'

// A wrapper whose hover effect is a soft glow in the project's color that
// follows the cursor. It also exposes the color as --c and acts as a `group`,
// so children can use group-hover:* and text-[color:var(--c)].
// Mousemove is coalesced into one rAF write per frame: without this every
// mousemove forces a style recalc + radial-gradient repaint that stutters
// while the parent ScrollReveal is also animating.
export default function SpotlightCard({ as: Tag = 'div', color = '#38bdf8', className = '', children, ...props }) {
  const ref = useRef(null)
  const pending = useRef(null)
  const raf = useRef(0)

  const handleMove = useCallback((e) => {
    pending.current = { x: e.clientX, y: e.clientY }
    if (raf.current) return
    raf.current = requestAnimationFrame(() => {
      raf.current = 0
      const el = ref.current
      const p = pending.current
      pending.current = null
      if (!el || !p) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--x', `${p.x - rect.left}px`)
      el.style.setProperty('--y', `${p.y - rect.top}px`)
    })
  }, [])

  useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    },
    []
  )

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      style={{ '--c': color }}
      className={`group relative ${className}`}
      {...props}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${color}26, transparent 70%)` }}
      />
    </Tag>
  )
}
