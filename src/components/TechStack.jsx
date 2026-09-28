import SectionHeader from './SectionHeader'
import ScrollReveal from './ScrollReveal'
import useMarqueeLoop from './useMarqueeLoop'
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
  { title: 'React', Icon: SiReact, iconColor: 'text-accent' },
  { title: 'Bootstrap 5', Icon: SiBootstrap, iconColor: 'text-purple-500' },
  { title: 'TypeScript', Icon: SiTypescript, iconColor: 'text-blue-500' },
  { title: 'JavaScript', Icon: SiJavascript, iconColor: 'text-yellow-400' },
  { title: 'Tailwind CSS', Icon: SiTailwindcss, iconColor: 'text-teal-400' },
  { title: 'Git', Icon: SiGit, iconColor: 'text-red-500' },
  { title: 'HTML5', Icon: SiHtml5, iconColor: 'text-orange-500' },
  { title: 'CSS3', Icon: SiCss, iconColor: 'text-blue-400' },
  { title: 'GitHub', Icon: SiGithub, iconColor: 'text-white' },
]

// Duplicated 3x so the strip still tiles seamlessly on very wide screens.
const track = [...techData, ...techData, ...techData, ...techData, ...techData, ...techData]

export default function TechStack() {
  const trackRef = useMarqueeLoop(3)

  return (
    <section id="skills" className="mt-[200px] mb-[100px] max-md:mt-[100px] max-sm:mt-[60px] max-sm:mb-[60px]">
      <div className="px-5">
        <ScrollReveal direction="fade">
          <SectionHeader
            eyebrow="MY EXPERTISE"
            title="Tech"
            highlight="Stack"
            className="items-center text-center mb-12"
          />
        </ScrollReveal>
      </div>

      <div className="tech-marquee marquee-bleed relative overflow-hidden py-6">
        <div ref={trackRef} className="tech-marquee-track flex items-center gap-16 w-max">
          {track.map(({ title, Icon, iconColor }, index) => (
            <div key={`${title}-${index}`} className="flex items-center gap-3 flex-shrink-0">
              <Icon className={`text-3xl ${iconColor}`} />
              <span className="text-slate-300 font-semibold text-lg whitespace-nowrap">
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-bleed {
          width: 100vw;
          margin-left: calc(50% - 50vw);
        }
        .tech-marquee {
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .tech-marquee-track {
          animation: tech-marquee-scroll 34s linear infinite;
        }
        .tech-marquee:hover .tech-marquee-track {
          animation-play-state: paused;
        }
        @keyframes tech-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * var(--marquee-distance, 33.333%))); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  )
}