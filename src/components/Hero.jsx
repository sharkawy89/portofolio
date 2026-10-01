import { MessageCircle, Linkedin, Github, Mail, Download } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { Link } from 'react-router-dom';

const socialLinks = [
  // wa.me needs the international format: country code, no leading 0
  { href: 'https://wa.me/201151921862', label: 'WhatsApp', icon: MessageCircle },
  { href: 'https://www.linkedin.com/in/adham-sharkawy-25985333b/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/sharkawy89', label: 'GitHub', icon: Github },
  { href: 'mailto:adhamsharkawy185@gmail.com', label: 'Email', icon: Mail },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="flex justify-between items-center px-10 pb-14 pt-28 gap-16 max-w-[1400px] mx-auto min-h-[calc(100vh-90px)] max-md:flex-col max-md:justify-center max-md:min-h-0 max-md:px-6 max-md:pt-20 max-md:pb-10 max-md:gap-6 max-md:text-center max-sm:px-4 max-sm:pt-20 max-sm:gap-6 max-sm:pb-8"
    >
      <div className="flex-1 max-w-[650px] max-md:max-w-full">
        <ScrollReveal direction="fade" duration={0.4}>
          <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full border border-slate-700 bg-surface/60 text-sm text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Available for new projects
          </div>
        </ScrollReveal>

        <ScrollReveal direction="slide-up" delay={0.1}>
          <p className="text-accent-light font-semibold text-lg mb-3 max-md:text-base">
            Hi, I&apos;m Adham Sharkawy
          </p>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] leading-tight text-text-primary mb-6 font-bold max-md:text-[2rem] max-sm:text-[1.6rem]">
            Turning Complex <br />
            <span className="text-accent">Logic into Seamless</span> <br />
            User Experiences.
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="slide-up" delay={0.2}>
          <p className="text-text-secondary text-base leading-relaxed mb-10 max-w-[56ch] max-md:text-sm max-md:mb-6 max-md:mx-auto">
            Front-end developer with three years of advertising experience. I build fast, responsive React apps,
            including AI-powered ones, and I design every screen around one question: what should the visitor do next?
          </p>
        </ScrollReveal>

        <ScrollReveal direction="slide-up" delay={0.3}>
          <div className="flex gap-4 flex-wrap max-md:flex-nowrap max-md:gap-3 max-md:justify-center">
            <Link
              to={'/projects'}
              className="inline-flex items-center max-md:flex-1 max-md:justify-center max-md:px-3 max-md:py-2.5 max-md:text-sm px-6 py-3 rounded-lg font-semibold bg-accent text-black hover:bg-accent-dark hover:shadow-[0_6px_20px_rgba(56,189,248,0.4)] transition-[color,background-color,box-shadow] duration-300 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View my work
            </Link>
            <a
              href="/assets/Adham_sharkawy_Resume.pdf"
              download="Adham_sharkawy_Resume.pdf"
              className="inline-flex items-center gap-2 max-md:flex-1 max-md:justify-center max-md:px-3 max-md:py-2.5 max-md:text-sm px-6 py-3 rounded-lg font-semibold bg-transparent text-text-primary border-2 border-border-secondary hover:bg-surface-elevated hover:border-accent transition-[color,background-color,border-color] duration-300 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Download size={18} className="max-md:w-4 max-md:h-4" />
              <span className="md:hidden">Resume</span>
              <span className="max-md:hidden">Download resume</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="slide-up" delay={0.4}>
          <div className="flex items-center gap-3 pt-6 mt-8 max-md:mt-6 max-md:pt-5 border-t border-slate-800/50 w-full max-w-md max-md:justify-center max-md:mx-auto">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-300 transition-[color,background-color,border-color,transform] duration-300 hover:bg-[#38bdf8] hover:text-slate-900 hover:border-[#38bdf8] hover:-translate-y-1 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="max-md:order-first">
      <ScrollReveal direction="slide-left" delay={0.2}>
        <div className="relative flex-shrink-0">
          {/* soft glow behind the photo */}
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />

          <div className="relative w-[380px] h-[380px] border-[3px] border-accent rounded-full p-3 overflow-hidden flex justify-center items-center shadow-accent transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-accent-lg max-md:w-[150px] max-md:h-[150px] max-md:p-1.5 max-sm:w-[130px] max-sm:h-[130px]">
            <img
              src="/assets/images/photo.webp"
              alt="Adham Sharkawy"
              width={1540}
              height={1540}
              fetchpriority="high"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap max-w-[90vw] px-4 py-2 rounded-full border border-slate-700 bg-[#0a0f1c]/90 text-sm font-semibold text-white shadow-xl max-sm:hidden">
            <span className="text-accent">Web</span> developer in Cairo
          </div>
        </div>
      </ScrollReveal>
      </div>
    </section>
  )
}
