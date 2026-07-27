import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, Rocket } from 'lucide-react'
import { navSocials } from '../data/social'

const navItems = [
  { href: '#about-me', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#education', label: 'education' },
  { href: '#contact', label: 'contact' },
]

const mobileNavItems = [
  { href: '#home', label: 'Home', number: '/01' },
  { href: '#about-me', label: 'About', number: '/02' },
  { href: '#skills', label: 'Skills', number: '/03' },
  { href: '#projects', label: 'Projects', number: '/04' },
  { href: '#education', label: 'Education', number: '/05' },
  { href: '#contact', label: 'Contact', number: '/06' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [navHeight, setNavHeight] = useState(80)
  const navRef = useRef(null)

  const closeNav = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navItems
        .map((item) => document.querySelector(item.href))
        .filter(Boolean)
      const offset = 98
      let current = ''
      for (const section of sections) {
        if (section.offsetTop <= window.scrollY + offset) {
          current = section.id
        }
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1]?.id || current
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) closeNav() }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [closeNav])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeNav() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [closeNav])

  useEffect(() => {
    const measure = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      window.scrollTo({ top: target.offsetTop - 98, behavior: 'smooth' })
      closeNav()
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-5 py-[18px] transition-all duration-300 border-b ${
          scrolled
            ? 'bg-bg-primary/95 backdrop-blur-xl shadow-md'
            : 'bg-bg-primary/80 backdrop-blur-md'
        } border-border-primary max-sm:px-4 max-sm:py-3`}
      >
        <a
          href="#home"
          onClick={(e) => scrollTo(e, '#home')}
          className="text-accent font-bold text-lg md:text-xl tracking-tight uppercase no-underline cursor-pointer"
        >
          Adham
        </a>

        <div className="hidden md:flex flex-row items-center gap-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className={`text-sm uppercase px-2.5 py-2.5 no-underline transition-colors duration-300 ${
                activeSection === item.href.slice(1)
                  ? 'text-accent font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {navSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-text-primary transition-all duration-300 no-underline hover:brightness-110"
              style={{ '--hover-color': s.hoverColor }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = s.hoverColor; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '' }}
            >
              <s.icon size={18} />
              <span className="sr-only">{s.label}</span>
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 max-sm:w-10 max-sm:h-10 ${
            isOpen
              ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-sky-400 hover:text-sky-400'
              : 'bg-white/5 border-white/20 text-text-primary'
          }`}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={closeNav}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed left-0 right-0 z-40 md:hidden overflow-x-hidden transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
        style={{ top: navHeight }}
      >
        <div className="mx-4 bg-[#020617] border border-slate-800/70 rounded-b-[2.5rem] shadow-xl overflow-hidden max-sm:mx-3">
          <div className="px-6 pt-8 pb-8 overflow-y-auto overflow-x-hidden max-h-[calc(100dvh-100px)] max-sm:px-4 max-sm:pt-6 max-sm:pb-6">
            <nav className="flex flex-col gap-1">
              {mobileNavItems.map((item, index) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className={`group flex items-center justify-between px-4 py-4 rounded-xl text-xl font-semibold no-underline transition-all duration-300 max-sm:text-lg max-sm:px-3 max-sm:py-3 ${
                      isActive
                        ? 'text-sky-400 bg-slate-900/70'
                        : 'text-slate-300 hover:text-sky-400 hover:bg-slate-900/70'
                    }`}
                    style={{
                      animation: isOpen ? `navItemIn 0.35s ease-out ${index * 0.06}s both` : 'none',
                    }}
                  >
                    <span>{item.label}</span>
                    {item.number && (
                      <span
                        className={`text-sm font-mono transition-colors duration-300 ${
                          isActive
                            ? 'text-sky-400'
                            : 'text-slate-500 group-hover:text-sky-400'
                        }`}
                      >
                        {item.number}
                      </span>
                    )}
                  </a>
                )
              })}
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
