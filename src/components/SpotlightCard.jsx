import { useRef } from 'react'

// A wrapper whose hover effect is a soft glow in the project's color that
// follows the cursor. It also exposes the color as --c and acts as a `group`,
// so children can use group-hover:* and text-[color:var(--c)].
export default function SpotlightCard({ as: Tag = 'div', color = '#38bdf8', className = '', children, ...props }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

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
