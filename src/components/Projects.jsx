import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Globe, Github, ArrowRight, ArrowUpRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import SectionHeader from './SectionHeader'
import SpotlightCard from './SpotlightCard'
import { ProjectTags, ProjectLinks } from './ProjectParts'
import { projects } from '../data/projects'

const featured = projects.filter((p) => p.home === 'featured')
const archive = projects.filter((p) => p.home === 'archive')

// Single shared observer for the whole archive list: one whileInView on the
// parent, rows orchestrate via staggerChildren. Opacity-only rows (no x/y
// offset) so text never re-rasterizes mid-scroll.
const archiveListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}
const archiveRowVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
}

// The image drifts slightly as you scroll past it (parallax).
// Three isolated layers so measurement, hover zoom, and scroll drift never
// fight on the same element (that feedback loop was the scroll flicker):
//   outer (ref target, never transforms) > hover-zoom div > motion.img (y only).
// Reads Framer's useScroll, which composes cleanly with Lenis: Lenis writes
// real native scroll positions, so target measurement needs no Lenis wiring.
function ParallaxImage({ src, alt }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
    // Don't force a synchronous layout read on every scroll frame; measure
    // inside rAF instead. This is the main layout-thrashing fix.
    layoutEffect: false,
  })
  // Pixel range (not %) so the compositor doesn't need the box size each frame.
  const y = useTransform(scrollYProgress, [0, 1], [-14, 14])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden isolate">
      <div className="absolute -inset-[7%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04] transform-gpu">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          style={reduceMotion ? undefined : { y }}
          className="w-full h-full object-cover will-change-transform [backface-visibility:hidden] transform-gpu"
        />
      </div>
    </div>
  )
}

export default function Projects() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="projects" className="py-20 px-5 bg-bg-secondary max-md:py-16 max-md:px-5">
      <ScrollReveal direction="fade">
        <SectionHeader
          eyebrow="PORTFOLIO SHOWCASE"
          title="Creative"
          highlight="Showcase"
          className="items-center text-center mb-16"
        />
      </ScrollReveal>

      <div className="max-w-6xl mx-auto flex flex-col gap-20 max-md:gap-14">
        {featured.map((project, index) => (
          <ScrollReveal key={project.id} direction="slide-up" delay={0.1 * (index + 1)}>
            <div
              className="group grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              style={{ '--c': project.hexColor }}
            >
              <div
                className={`relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-800/60 transition-[border-color,box-shadow] duration-500 group-hover:border-[color:var(--c)] group-hover:shadow-[0_30px_70px_-30px_var(--c)] ${
                  index % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <ParallaxImage src={project.image} alt={project.title} />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(to top, ${project.hexColor}66, transparent 55%)` }}
                />

                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-700 bg-[#0a0f1c]/90 text-white text-sm font-semibold no-underline opacity-0 translate-y-3 transition-[transform,opacity] duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  {project.liveLabel || 'View live'} <ArrowUpRight size={14} />
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: project.hexColor }} />
                  <span className="text-sm text-slate-400">{project.category}</span>
                </div>

                <h3 className="text-white text-3xl font-bold mb-3 max-sm:text-2xl transition-colors duration-300 group-hover:text-[color:var(--c)]">
                  {project.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="block h-[3px] w-24 rounded-full mb-5 origin-left scale-x-[0.42] transition-transform duration-500 group-hover:scale-x-100 transform-gpu"
                  style={{ backgroundColor: project.hexColor }}
                />

                <p className="text-slate-400 leading-relaxed mb-6 max-w-[52ch]">{project.description}</p>

                <div className="mb-6">
                  <ProjectTags tags={project.tags} color={project.hexColor} />
                </div>

                <ProjectLinks project={project} />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {archive.length > 0 && (
        <div className="max-w-4xl mx-auto mt-24 max-md:mt-16">
          <ScrollReveal direction="fade">
            <h4 className="text-slate-500 text-sm font-semibold mb-3 px-2">More projects</h4>
          </ScrollReveal>

          <motion.div
            variants={archiveListVariants}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px 160px 0px', amount: 0.1 }}
            className="flex flex-col divide-y divide-slate-800/60 border-t border-b border-slate-800/60"
          >
            {archive.map((project) => (
              <motion.div key={project.id} variants={archiveRowVariants}>
                <SpotlightCard
                  color={project.hexColor}
                  className="flex items-center gap-4 py-4 px-4 transition-colors duration-300 hover:bg-surface-secondary/50"
                >
                  {/* accent bar that grows in on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[3px] origin-center scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                    style={{ backgroundColor: project.hexColor }}
                  />
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-[transform,box-shadow] duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_var(--c)]"
                    style={{ backgroundColor: project.hexColor }}
                  />
                  <div className="flex-1 min-w-0 transition-transform duration-300 motion-safe:group-hover:translate-x-1">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-white font-semibold transition-colors duration-300 group-hover:text-[color:var(--c)]">
                        {project.title}
                      </span>
                      <span className="text-slate-500 text-xs">{project.category}</span>
                    </div>
                    <span className="text-slate-600 text-xs font-mono hidden sm:inline transition-colors duration-300 group-hover:text-slate-400">
                      {project.tags}
                    </span>
                  </div>
                  <div className="relative z-10 flex items-center gap-1 flex-shrink-0">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title}: view live`}
                      className="p-2 rounded-full text-slate-500 transition-[color,background-color,transform] duration-300 hover:bg-slate-800 hover:text-[color:var(--c)] hover:scale-110"
                    >
                      <Globe size={16} />
                    </a>
                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title}: view code`}
                        className="p-2 rounded-full text-slate-500 transition-[color,background-color,transform] duration-300 hover:bg-slate-800 hover:text-[color:var(--c)] hover:scale-110"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      <div className="max-w-6xl mx-auto mt-16 flex justify-center">
        <ScrollReveal direction="fade">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-text-primary border-2 border-border-secondary hover:bg-surface-elevated hover:border-accent transition-[color,background-color,border-color] duration-300 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View all {projects.length} projects
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}