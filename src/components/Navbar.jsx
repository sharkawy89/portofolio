import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Rocket } from 'lucide-react'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about-me', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setIsOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    // On another page (e.g. /projects): go home, ScrollManager scrolls to the section
    if (pathname !== '/') {
      navigate({ pathname: '/', hash: href })
      return
    }
    const target = document.querySelector(href)
    if (target) {
      window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed left-0 w-full z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isScrolled ? 'top-4' : 'top-0'
        }`}
      >
        <nav
          className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-between border ${
            isScrolled
              ? 'w-[95%] max-w-5xl bg-[#0a0f1c]/80 backdrop-blur-md border-slate-700 rounded-full py-3 px-6 shadow-2xl'
              : 'w-full bg-transparent border-transparent rounded-none py-6 px-8 lg:px-16'
          }`}
        >
          <a
            href="#home"
            onClick={(e) => scrollTo(e, '#home')}
            className="text-white font-bold tracking-wider text-xl no-underline cursor-pointer shrink-0"
          >
            <span className="text-[#38bdf8]">A</span>DHAM
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="text-sm font-medium text-slate-300 hover:text-white px-4 py-1 rounded-full bg-slate-800 transition-colors duration-300 no-underline"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="hidden md:inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#38bdf8] text-slate-900 font-bold text-sm hover:bg-[#0ea5e9] transition-colors duration-300 no-underline"
            >
              <Rocket size={16} />
              HIRE ME
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${
                isOpen
                  ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                  : 'bg-white/5 border-white/20 text-text-primary'
              }`}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed left-0 right-0 z-40 md:hidden overflow-x-hidden transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
        style={{ top: 80 }}
      >
        <div className="mx-4 bg-[#020617] border border-slate-800/70 rounded-b-[2.5rem] shadow-xl overflow-hidden">
          <div className="px-6 pt-8 pb-8 overflow-y-auto overflow-x-hidden max-h-[calc(100dvh-100px)]">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className="group flex items-center justify-between px-4 py-4 rounded-xl text-xl font-semibold text-slate-300 hover:text-sky-400 hover:bg-slate-900/70 no-underline transition-all duration-300"
                  style={{
                    animation: isOpen ? `navItemIn 0.35s ease-out ${index * 0.06}s both` : 'none',
                  }}
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-800/50">
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-sky-400 text-slate-950 font-bold uppercase tracking-wider text-sm transition-colors duration-300 hover:bg-sky-300 no-underline"
              >
                <Rocket size={18} />
                START A PROJECT
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes navItemIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}