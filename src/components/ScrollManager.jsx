import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Render once inside <BrowserRouter>. On every navigation it either scrolls to
// the #section in the URL (e.g. "/#projects") or resets to the top of the page.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Wait a tick so the destination page has rendered its sections
    const timer = setTimeout(() => {
      const target = document.querySelector(hash)
      if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' })
    }, 60)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}
