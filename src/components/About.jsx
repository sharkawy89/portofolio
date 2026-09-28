import ScrollReveal from './ScrollReveal'
import SectionHeader from './SectionHeader'
import { skillPoints } from '../data/skills'
import { label } from 'framer-motion/client'

// Update these numbers when you add projects / certificates.
const highlights = [
  { value: '10+', label: 'Projects built' },
  { value: '3 yrs', label: 'event attendant' },
  { value: '1 yrs+', label: 'freelancing' },
]

export default function About() {
  return (
    <section id="about-me" className="max-w-[1320px] px-8 mx-auto my-24 max-md:px-4 max-md:my-10 max-sm:px-3 max-sm:my-8">
      <div className="grid grid-cols-[minmax(340px,1.05fr)_minmax(0,0.95fr)] gap-[clamp(18px,2.5vw,32px)] items-stretch min-h-[calc(100vh-180px)] max-[960px]:grid-cols-1 max-[960px]:min-h-0 max-[960px]:gap-[22px]">
        <ScrollReveal direction="slide-right">
          <div className="relative overflow-hidden rounded-[28px] aspect-square max-h-[min(68vh,620px)] bg-gradient-to-b from-[rgba(8,17,33,0.75)] to-[rgba(8,17,33,0.95)] max-[960px]:aspect-[16/9] max-[960px]:max-h-[360px] max-md:aspect-[4/3] max-md:max-h-[280px] max-md:rounded-[22px] max-sm:max-h-[220px] max-sm:rounded-[18px]">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,8,18,0.14)] to-[rgba(3,8,18,0.34)] pointer-events-none z-[1]" />
            <img
              src="/assets/images/about.webp"
              alt="Workspace with code on a monitor and notebook"
              loading="lazy"
              width={1600}
              height={1600}
              className="block w-full h-full object-cover object-center transition-transform duration-[600ms] hover:scale-105"
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col justify-start h-full gap-6 pl-3 max-[960px]:pl-0">
          <ScrollReveal direction="slide-up">
            <SectionHeader
              eyebrow="GET TO KNOW ME"
              title="About"
              highlight="Me"
              className="items-start text-left"
            />
          </ScrollReveal>

          <ScrollReveal direction="slide-up">
            <div className="grid gap-4 max-w-[60ch] text-text-secondary text-[clamp(1rem,1.05vw,1.08rem)] leading-[1.8]">
              <p className="m-0">
                I&apos;m a front-end developer based in Cairo. Three years in advertising taught me how to hold an
                audience&apos;s attention, and I now apply that to interfaces that are clear, fast, and easy to act on.
              </p>
              <p className="m-0">
                My recent work includes a clinic management system, an Electron POS for phone retailers, and a
                corporate site for a Cairo marketing agency. I use AI tools for the repetitive parts so I can spend my
                time on architecture, responsiveness, and the small details people notice. I also handle technical
                troubleshooting and multimedia editing.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="slide-up" delay={0.05}>
            <dl className="grid grid-cols-3 gap-4 max-w-[60ch] m-0 pt-5 border-t border-slate-800 max-sm:gap-2">
              {highlights.map((h) => (
                <div key={h.label}>
                  <dt className="sr-only">{h.label}</dt>
                  <dd className="m-0 text-accent text-3xl font-extrabold leading-none max-sm:text-2xl">{h.value}</dd>
                  <p className="m-0 mt-1.5 text-text-tertiary text-xs">{h.label}</p>
                </div>
              ))}
            </dl>
          </ScrollReveal>

          <ScrollReveal direction="slide-up" delay={0.1}>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 max-md:gap-3">
              {skillPoints.map((sp) => (
                <div
                  key={sp.label}
                  className="group bg-surface border border-slate-800 rounded-3xl p-4 flex items-start gap-3 hover:border-accent/50 hover:bg-surface-elevated/50 hover:-translate-y-0.5 transition-[border-color,background-color,transform] duration-300"
                >
                  <div className="w-10 h-10 rounded-2xl bg-surface-elevated border border-slate-700/50 flex items-center justify-center flex-shrink-0 text-accent">
                    <sp.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-text-primary font-bold text-base group-hover:text-accent transition-colors duration-300">
                      {sp.label}
                    </span>
                    <p className="mt-1 mb-0 text-text-tertiary text-xs leading-relaxed">{sp.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}