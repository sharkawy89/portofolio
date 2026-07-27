import { ArrowUpRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import SectionHeader from './SectionHeader'
import { educationEntries, certificates } from '../data/education'

export default function Education() {
  return (
    <section id="education" className="max-w-[1320px] mx-auto my-[220px] mb-[150px] px-8 max-md:my-[160px] max-md:mb-[120px] max-md:px-6 max-sm:my-[80px] max-sm:mb-[80px] max-sm:px-4">
      <ScrollReveal direction="fade">
        <SectionHeader
          eyebrow="ACADEMIC BACKGROUND"
          title="My"
          highlight="Education"
          className="items-center text-center mb-[70px] max-md:mb-7 max-sm:mb-[14px]"
        />
      </ScrollReveal>

      <div className="grid grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] gap-[clamp(24px,4vw,56px)] items-start max-[960px]:grid-cols-1 max-[960px]:gap-6">
        <div className="sticky top-[120px] max-[960px]:static">
          <ScrollReveal direction="slide-right">
            <h3 className="text-5xl font-extrabold leading-[1.1] tracking-tight max-w-[600px] p-[9px] text-white max-[960px]:max-w-[14ch] max-sm:text-3xl max-sm:leading-tight">
              Academic Journey &amp; Certifications
            </h3>
          </ScrollReveal>
        </div>

        <div className="grid gap-7 max-sm:gap-[22px]">
          <div className="grid gap-6 max-sm:gap-[18px]">
            {educationEntries.map((entry, index) => (
              <ScrollReveal key={index} direction="slide-up" delay={0.1 * (index + 1)}>
                <div className="relative pl-[22px] mb-2.5 max-sm:pl-[18px] max-sm:mb-2 before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-[2px] before:h-[calc(100%-6px)] before:bg-gradient-to-b before:from-accent before:to-accent/15 before:rounded-full">
                  <h4 className="text-text-primary text-[clamp(1.1rem,1.4vw,1.45rem)] font-extrabold leading-tight mb-2 max-sm:text-[1.05rem]">
                    {entry.title}
                  </h4>
                  <p className="text-text-tertiary text-sm leading-relaxed">
                    {entry.meta}
                  </p>
                  <p className="mt-1 text-text-muted text-sm leading-relaxed">
                    {entry.date}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="slide-up" delay={0.3}>
            <div className="flex flex-wrap gap-3 mt-2 max-sm:gap-2.5">
              {certificates.map((cert) => (
                <a
                  key={cert.label}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2.5 border border-border-secondary rounded-full bg-accent/6 text-text-primary text-sm font-semibold no-underline transition-all duration-250 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/12 hover:text-accent max-sm:w-full max-sm:justify-center"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/14 text-accent text-xs flex-shrink-0">
                    <ArrowUpRight size={14} />
                  </span>
                  {cert.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
