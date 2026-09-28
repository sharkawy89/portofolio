import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import SectionHeader from './SectionHeader'
import SpotlightCard from './SpotlightCard'
import { ProjectTags, ProjectLinks } from './ProjectParts'
import { projects } from '../data/projects'

export default function AllProjects() {
  useEffect(() => {
    const previous = document.title
    document.title = 'All Projects | Adham Sharkawy'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="min-h-screen bg-bg-secondary px-5 pt-32 pb-24 max-md:pt-28 max-md:pb-16">
      <div className="max-w-6xl mx-auto">
        <Link
          to={{ pathname: '/', hash: '#projects' }}
          className="group inline-flex items-center gap-2 mb-10 text-sm font-semibold text-slate-400 hover:text-accent transition-colors no-underline"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to portfolio
        </Link>

        <ScrollReveal direction="fade">
          <SectionHeader eyebrow="FULL ARCHIVE" title="All" highlight="Projects" className="items-start text-left mb-5" />
          <p className="mb-14 text-slate-400 max-w-[56ch] max-md:mb-10">
            Everything I&apos;ve built so far: {projects.length} projects, each with its live version and code.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} direction="slide-up" delay={(index % 2) * 0.1} className="h-full">
              <SpotlightCard
                as="article"
                color={project.hexColor}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-surface/40 transition-[transform,border-color,box-shadow] duration-500 motion-safe:hover:-translate-y-2 hover:border-[color:var(--c)] hover:shadow-[0_30px_60px_-30px_var(--c)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-800/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to top, ${project.hexColor}66, transparent 55%)` }}
                  />
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-700 bg-[#0a0f1c]/85 backdrop-blur-md text-white text-sm font-semibold no-underline opacity-0 translate-y-3 transition-[transform,opacity] duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    {project.liveLabel || 'View live'} <ArrowUpRight size={14} />
                  </a>
                </div>

                <div className="flex flex-1 flex-col p-6 max-sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: project.hexColor }} />
                    <span className="text-sm text-slate-400">{project.category}</span>
                  </div>

                  <h2 className="text-white text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[color:var(--c)]">
                    {project.title}
                  </h2>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

                  <div className="mb-6">
                    <ProjectTags tags={project.tags} color={project.hexColor} />
                  </div>

                  <div className="mt-auto">
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  )
}
