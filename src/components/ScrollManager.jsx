import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from './SmoothScroll'

// Render once inside <BrowserRouter>. On every navigation it either scrolls to
// the #section in the URL (e.g. "/#projects") or resets to the top of the page.
// All movement goes through Lenis so anchor jumps use the same RAF-interpolated
// scroll as wheel/touch instead of fighting it via window.scrollTo.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
      return
    }
    // Wait a tick so the destination page has rendered its sections
    const timer = setTimeout(() => {
      const target = document.querySelector(hash)
      if (!target) return
      if (lenis) lenis.scrollTo(target, { offset: -100 })
      else {
        const top = target.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top, behavior: 'auto' })
      }
    }, 60)
    return () => clearTimeout(timer)
  }, [pathname, hash, lenis])

  return null
}