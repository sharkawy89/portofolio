import { useState } from 'react'
import { Globe, Github, ExternalLink } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import SectionHeader from './SectionHeader'

const projectsData = [
  {
    id: 1,
    category: 'Electron-app',
    title: 'telephony-system',
    description:
      'A full-featured desktop POS and inventory management system built with Electron and React, designed for mobile phone retailers. It combines barcode-based checkout, IMEI-tracked device inventory, repair ticket management, expense tracking, and financial reporting into one secure application.',
    image: 'assets/images/telephony.webp',
    tags: '#react #electronjs #Realm DB #Tailwind',
    hexColor: '#388DF8',
    liveLink: 'https://www.mediafire.com/file/sxfcg1drdgvnuhd/%25D8%25AA%25D9%258A%25D9%2584%25D9%258A%25D9%2581%25D9%2588%25D9%2586%25D9%258A_%25D8%25B1%25D9%2586_Setup_1.0.0.exe/file',
    repoLink: 'https://github.com/sharkawy89'
  },
  {
    id: 2,
    category: 'HEALTHCARE MANAGEMENT',
    title: 'EL3eyada',
    description:
      'A modern, responsive clinic management system built with React, designed to streamline healthcare operations and simplify patient management with an intuitive user experience.',
    image: 'assets/images/el3eyada.webp',
    tags: '#React #Firestore #Tailwind',
    hexColor: '#10b981',
    liveLink: 'https://el3eyada-ucr2.vercel.app/',
    repoLink: 'https://github.com/sharkawy89/health-dashboard'
  },
  {
    id: 3,
    category: 'E-COMMERCE PLATFORM',
    title: 'Sharkawy Store',
    description:
      'A front-end e-commerce web application featuring a product catalog, detailed product pages, shopping cart management, and a complete checkout flow.',
    image: 'assets/images/sharkawy-store.webp',
    tags: '#JavaScript #HTML #CSS',
    hexColor: '#ec4899',
    liveLink: 'https://sharkawy-store.vercel.app/',
    repoLink: 'https://github.com/sharkawy89/sharkawy_store'
  },
  {
    id: 4,
    category: 'LANDING PAGE',
    title: 'The Clinical Sanctuary',
    description:
      'A polished healthcare landing page presenting a warm and modern medical brand with a hero section, services, about section, doctor profiles, testimonials, location details, and a professional footer.',
    image: 'assets/images/landing-page.webp',
    tags: '#JavaScript #HTML #Tailwind',
    hexColor: '#f59e0b',
    liveLink: 'https://sharkawy89.github.io/landing-page-2/',
    repoLink: 'https://github.com/sharkawy89/landing-page-2'
  },
  {
    id: 5,
    category: 'MODERN E-COMMERCE',
    title: 'Next Circuit',
    description:
      'An e-commerce application specializing in technology devices, featuring user authentication, product catalog, shopping cart, and order management. The backend runs on Vercel serverless functions.',
    image: 'assets/images/next-circuit.webp',
    tags: '#Node.js #Express #Firestore #Tailwind',
    hexColor: '#3b82f6',
    liveLink: 'https://next-circuit.vercel.app/',
    repoLink: 'https://github.com/sharkawy89/Next-circuit'
  },
  {
    id: 6,
    category: 'Education-platform',
    title: 'EduMange',
    description:
      'A full-featured student and teacher management dashboard built with React. It includes role-based authentication, course and attendance tracking, interactive data visualizations, and CRUD operations for students and teachers, all wrapped in a responsive sidebar layout with search, filter, and pagination.',
    image: 'assets/images/studentdb.webp',
    tags: '#react #Recharts #Vite #Bootstrap',
    hexColor: '#ec4899',
    liveLink: 'https://depi-projectt.vercel.app/dashboard',
    repoLink: 'https://github.com/sharkawy89/depi-projectt'
  },
  {
    id: 7,
    category: 'marketing agency',
    title: 'touch-media',
    description:
      ' A high-performance corporate website built for TouchMedia, a Cairo-based marketing and production agency. Features immersive GSAP-powered animations',
    image: 'assets/images/touchmedia.webp.png',
    tags: '#react #framer #Vite #Tailwind',
    hexColor: '#10b981',
    liveLink: 'https://touchmediaint.vercel.app/',
    repoLink: 'https://touchmediaint.vercel.app/'
  },
  {
    id: 8,
    category: 'todo list app ',
    title: 'todolist',
    description:
      'A minimal and efficient to-do list app built to manage personal tasks effortlessly. It features task categorization, quick filtering, and real-time up',
    image: 'assets/images/todo list.png',
    tags: '#Html #Css #Javascript',
    hexColor: '#388DF8',
    liveLink: 'https://sharkawy89.github.io/todo-app/',
    repoLink: 'https://github.com/sharkawy89/todo-app'
  },

  {
    id: 9,
    category: 'PORTFOLIO TEMPLATE',
    title: 'omar portfoliio',
    description:
      ' A clean and responsive portfolio template ideal for freelancers to display their services. It includes a modern layout for skills, work experience entries, and a pr...',
    image: 'assets/images/omar sallam.png',
    tags: '#Html #Css #Javascript',
    hexColor: '#f59e0b',
    liveLink: 'https://sharkawy89.github.io/omar_sallam_portfolio/',
    repoLink: 'https://github.com/sharkawy89/omar_sallam_portfolio'
  }

]

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(3)

  return (
    <section id="projects" className="py-20 px-5 bg-bg-secondary max-md:py-16 max-md:px-5">
      <ScrollReveal direction="fade">
        <SectionHeader
          eyebrow="PORTFOLIO SHOWCASE"
          title="Creative"
          highlight="Showcase"
          className="items-center text-center mb-12"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto max-sm:gap-6">
        {projectsData.slice(0, visibleProjects).map((project, index) => (
          <ScrollReveal key={project.id} direction="slide-up" delay={0.1 * (index + 1)}>
            <div
              className="group bg-surface-secondary rounded-3xl border border-slate-800/50 relative overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-500"
              style={{ '--project-color': project.hexColor }}
            >
              <div className="h-64 w-full relative overflow-hidden rounded-t-3xl max-sm:h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300 z-10">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <Globe size={20} />
                  </a>
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow bg-surface-secondary relative z-20 rounded-b-3xl max-sm:p-5">
                <div
                  className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: project.hexColor }}
                />

                <span
                  className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2"
                  style={{ color: project.hexColor }}
                >
                  {project.category}
                </span>

                <div>
                  <h3 className="text-white text-2xl font-bold transition-colors duration-300 group-hover:text-[var(--project-color)]">
                    {project.title}
                  </h3>
                  <span
                    className="h-[2px] w-12 mt-2 block rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    style={{ backgroundColor: project.hexColor }}
                  />
                </div>

                <p className="text-slate-400 text-sm mt-4 leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>

                <div className="mt-auto flex justify-between items-end border-t border-slate-800/50 pt-4">
                  <span className="text-slate-500 text-xs font-mono">{project.tags}</span>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm font-semibold flex items-center gap-1 hover:text-blue-300 transition-colors"
                  >
                    Live <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {projectsData.length > visibleProjects && (
        <button
          onClick={() => setVisibleProjects(projectsData.length)}
          className="px-6 py-3 rounded-full border border-slate-700 bg-surface-secondary text-white text-sm font-semibold hover:bg-surface-elevated transition-colors flex items-center gap-2 mx-auto mt-12"
        >
          Explore All Projects
        </button>
      )}

      {visibleProjects > 3 && (
        <button
          onClick={() => setVisibleProjects(3)}
          className="px-6 py-3 rounded-full border border-slate-700 bg-surface-secondary text-white text-sm font-semibold hover:bg-surface-elevated transition-colors flex items-center gap-2 mx-auto mt-4"
        >
          Show Less
        </button>
      )}
    </section>
  )
}