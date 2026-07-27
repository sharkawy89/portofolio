import { ArrowUp } from 'lucide-react'

const footerNav = [
  { href: '#home', label: 'Home' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-bg-primary border-t border-slate-800/40 px-10 py-14 max-md:px-5 max-md:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-accent font-bold text-xl md:text-2xl uppercase tracking-tight leading-none">
              Adham
            </span>
         
            <span className="text-[9px] uppercase tracking-[0.35em] text-slate-600 mt-2 max-sm:text-[10px]">
              Front-End Developer
            </span>
          </div>

          <div className="text-slate-400 text-xs md:text-sm text-center leading-relaxed">
            &copy; {year} Crafted with{' '}
            <span className="text-red-400 not-italic" aria-label="love">&hearts;</span>
            {' '}and{' '}
            <span className="text-amber-400 not-italic" aria-label="coffee">&#9749;</span>
            {' '}by{' '}
            <span className="text-white font-bold">Adham Sharkawy</span>
          </div>

          <div className="flex items-center gap-5">
            <nav className="flex items-center gap-4 md:gap-5">
              {footerNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-semibold text-slate-500 hover:text-accent transition-colors duration-300 no-underline max-sm:text-[11px]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full border border-slate-700 bg-transparent text-slate-300 flex items-center justify-center hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 cursor-pointer flex-shrink-0"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div className="relative mt-12 pt-8 border-t border-slate-800/20">
          <p className="text-[9px] uppercase tracking-[0.4em] text-slate-700 text-center max-sm:text-[10px]">
            Built With &bull; React &bull; Tailwind CSS &bull; Vite &bull; Framer Motion
          </p>
          <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
        </div>
      </div>
    </footer>
  )
}