import { createContext, useContext, useEffect, useRef, useState } from 'react'

const LenisContext = createContext(null)

/** Access the shared Lenis instance (null when reduced-motion skips smoothing). */
export function useLenis() {
  return useContext(LenisContext)
}

/**
 * Root smooth-scroll provider. Owns a single Lenis instance driving native
 * window scroll via one RAF loop, so Framer Motion's useScroll / whileInView
 * (which read native scroll + IntersectionObserver) keep working unchanged —
 * no double-scroll handling, no custom scroll container.
 */
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    // Respect reduced motion: no smoothing, native scroll only.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId = 0
    let instance = null

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      instance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = instance
      setLenis(instance)

      const raf = (time) => {
        instance.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      instance?.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
