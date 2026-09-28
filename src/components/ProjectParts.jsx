import { Globe, Github } from 'lucide-react'

// "#react #electronjs #Realm DB" -> ['react', 'electronjs', 'Realm DB']
export function ProjectTags({ tags, color }) {
  const list = tags
    .split('#')
    .map((t) => t.trim())
    .filter(Boolean)

  return (
    <div className="flex flex-wrap gap-2" style={{ '--c': color }}>
      {list.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-1 rounded-md border border-slate-800 text-slate-400 text-xs font-mono transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:text-[color:var(--c)] hover:border-[color:var(--c)]"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export function ProjectLinks({ project }) {
  return (
    <div className="flex gap-3 flex-wrap" style={{ '--c': project.hexColor }}>
      <a
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-bg-primary transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_var(--c)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{ backgroundColor: project.hexColor }}
      >
        <Globe size={16} className="transition-transform duration-700 motion-safe:group-hover/btn:rotate-[360deg]" />
        {project.liveLabel || 'View live'}
      </a>
      {project.repoLink && (
        <a
          href={project.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 text-slate-200 font-semibold text-sm transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--c)] hover:text-[color:var(--c)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Github size={16} className="transition-transform duration-300 motion-safe:group-hover/btn:scale-125" />
          Code
        </a>
      )}
    </div>
  )
}
