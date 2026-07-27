import ScrollReveal from './ScrollReveal'
import SectionHeader from './SectionHeader'
import { skillPoints } from '../data/skills'

export default function About() {
  return (
    <section id="about-me" className="max-w-[1320px] px-8 mx-auto my-24 max-md:px-4 max-md:my-10 max-sm:px-3 max-sm:my-8">
      <div className="grid grid-cols-[minmax(340px,1.05fr)_minmax(0,0.95fr)] gap-[clamp(18px,2.5vw,32px)] items-stretch min-h-[calc(100vh-180px)] max-[960px]:grid-cols-1 max-[960px]:min-h-auto max-[960px]:gap-[22px]">
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

        <div className="flex flex-col justify-start h-full gap-2 pl-3 max-[960px]:pl-0 max-[960px]:gap-2">
          <ScrollReveal direction="slide-up">
            <SectionHeader
              eyebrow="GET TO KNOW ME"
              title="About"
              highlight="Me"
              className="items-start text-left mb-8"
            />
          </ScrollReveal>

          <ScrollReveal direction="slide-up">
            <div className="grid gap-6 max-w-[60ch] max-[960px]:max-w-[70ch]">
              <p className="m-0 text-text-secondary text-[clamp(1.02rem,1.05vw,1.1rem)] leading-[1.85] tracking-[0.04em]">
                As a Front-End Developer, I specialize in transforming complex logic into intuitive digital experiences. I leverage modern AI tools to streamline my coding process, allowing me to focus on high-level architecture and pixel-perfect responsiveness. With additional expertise in technical troubleshooting and multimedia editing, I build resilient, cross-platform applications where clean code meets professional design.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="slide-up" delay={0.1}>
            <div className="grid grid-cols-2 gap-4 mt-3 max-md:grid-cols-1 max-md:gap-3">
              {skillPoints.map((sp) => (
                <div key={sp.label} className="group bg-surface border border-slate-800 rounded-3xl p-3 flex items-start gap-2 relative overflow-hidden cursor-pointer hover:border-accent/50 hover:bg-surface-elevated/50 transition-[border-color,background-color,transform] duration-500 will-change-transform">
                  <div className="w-10 h-10 rounded-2xl bg-surface-elevated border border-slate-700/50 flex items-center justify-center flex-shrink-0 text-accent">
                    <sp.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-text-primary font-bold text-base transition-colors duration-300 group-hover:text-accent">
                      {sp.label}
                    </span>
                    <span className="h-[2px] w-8 bg-accent rounded-full block scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    <p className="  mb-1 text-text-tertiary text-xs leading-relaxed">
                      {sp.text}
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-accent rounded-full ring-4 ring-accent/20 opacity-0 group-hover:opacity-100 absolute bottom-3 left-3 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
