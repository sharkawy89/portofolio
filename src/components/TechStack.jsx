import ScrollReveal from './ScrollReveal'
import SectionHeader from './SectionHeader'
import {
  SiReact,
  SiBootstrap,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGit,
  SiHtml5,
SiCss,
  SiGithub,
} from 'react-icons/si'

const techData = [
  { category: 'FRONTEND', title: 'React', Icon: SiReact, iconColor: 'text-accent', glowColor: 'bg-accent' },
  { category: 'FRAMEWORK', title: 'Bootstrap 5', Icon: SiBootstrap, iconColor: 'text-purple-500', glowColor: 'bg-purple-500' },
  { category: 'LANGUAGE', title: 'TypeScript', Icon: SiTypescript, iconColor: 'text-blue-500', glowColor: 'bg-blue-500' },
  { category: 'LANGUAGE', title: 'JavaScript', Icon: SiJavascript, iconColor: 'text-yellow-400', glowColor: 'bg-yellow-400' },
  { category: 'FRAMEWORK', title: 'Tailwind CSS', Icon: SiTailwindcss, iconColor: 'text-teal-400', glowColor: 'bg-teal-400' },
  { category: 'TOOLS', title: 'Git', Icon: SiGit, iconColor: 'text-red-500', glowColor: 'bg-red-500' },
  { category: 'FUNDAMENTALS', title: 'HTML5', Icon: SiHtml5, iconColor: 'text-orange-500', glowColor: 'bg-orange-500' },
  { category: 'FUNDAMENTALS', title: 'CSS3', Icon: SiCss, iconColor: 'text-blue-400', glowColor: 'bg-blue-400' },
  { category: 'TOOLS', title: 'GitHub', Icon: SiGithub, iconColor: 'text-white', glowColor: 'bg-white' },
]

export default function TechStack() {
  return (
    <section id="skills" className="mt-[200px] mb-[100px] px-5 max-md:mt-[100px] max-md:px-5 max-sm:mt-[60px] max-sm:mb-[60px]">
      <ScrollReveal direction="fade">
        <SectionHeader
          eyebrow="MY EXPERTISE"
          title="Tech"
          highlight="Stack"
          className="items-center text-center mb-12"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto max-sm:gap-4">
        {techData.map(({ category, title, Icon, iconColor, glowColor }, index) => (
          <ScrollReveal key={title} direction="slide-up" delay={0.1 * (index + 1)}>
            <div className="group bg-surface border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:-translate-y-2 hover:border-accent/50 hover:bg-surface-elevated/50 transition-[border-color,background-color,transform] duration-500 will-change-transform h-full max-sm:p-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold mb-6">
                {category}
              </span>

              <div className="relative flex items-center justify-center">
                <div className={`w-12 h-12 blur-xl opacity-30 rounded-full absolute ${glowColor}`} />
                <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-slate-700/50 flex items-center justify-center relative z-10">
                  <Icon className={`text-3xl ${iconColor}`} />
                </div>
              </div>

              <div className="flex flex-col items-center mt-6">
                <span className="text-text-primary font-bold text-lg transition-colors duration-300 group-hover:text-accent">
                  {title}
                </span>
                <span className="h-[2px] w-8 bg-accent mt-2 rounded-full mx-auto scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300" />
              </div>

              <div className="w-2 h-2 bg-accent rounded-full ring-4 ring-accent/20 opacity-0 group-hover:opacity-100 absolute bottom-4 left-4 transition-opacity duration-500" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}