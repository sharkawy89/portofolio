// All portfolio projects live here. The home page and /projects both read this file.
//
// `home` controls where a project shows up:
//   'featured' -> big card on the home page, and on /projects
//   'archive'  -> compact row under "More projects" on the home page, and on /projects
//   false      -> only on the /projects page
//
// To add a project: copy an entry, give it a new unique id, and set `home`.
// Order in this array = order on the page.
// repoLink: null hides the Code button. liveLabel changes the "View live" button text.

export const projects = [
  {
    id: 1,
    home: 'featured',
    category: 'Electron app',
    title: 'Telephony POS',
    description:
      'A full-featured desktop POS and inventory management system built with Electron and React, designed for mobile phone retailers. It combines barcode-based checkout, IMEI-tracked device inventory, repair ticket management, expense tracking, and financial reporting into one secure application.',
    image: '/assets/images/telephony.webp',
    liveLabel: 'Download app',
    tags: '#react #electronjs #Realm DB #Tailwind',
    hexColor: '#388DF8',
    liveLink: 'https://www.mediafire.com/file/sxfcg1drdgvnuhd/%25D8%25AA%25D9%258A%25D9%2584%25D9%258A%25D9%2581%25D9%2588%25D9%2586%25D9%258A_%25D8%25B1%25D9%2586_Setup_1.0.0.exe/file',
    repoLink: 'https://github.com/sharkawy89'
  },
  {
    id: 2,
    home: 'archive',
    category: 'Healthcare management',
    title: 'EL3eyada',
    description:
      'A modern, responsive clinic management system built with React, designed to streamline healthcare operations and simplify patient management with an intuitive user experience.',
    image: '/assets/images/el3eyada.webp',
    tags: '#React #Firestore #Tailwind',
    hexColor: '#10b981',
    liveLink: 'https://el3eyada-ucr2.vercel.app/',
    repoLink: 'https://github.com/sharkawy89/health-dashboard'
  },
  {
    id: 3,
    home: 'archive',
    category: 'E-commerce platform',
    title: 'Sharkawy Store',
    description:
      'A front-end e-commerce web application featuring a product catalog, detailed product pages, shopping cart management, and a complete checkout flow.',
    image: '/assets/images/sharkawy-store.webp',
    tags: '#JavaScript #HTML #CSS',
    hexColor: '#ec4899',
    liveLink: 'https://sharkawy-store.vercel.app/',
    repoLink: 'https://github.com/sharkawy89/sharkawy_store'
  },
  {
    id: 4,
    home: 'archive',
    category: 'Landing page',
    title: 'The Clinical Sanctuary',
    description:
      'A polished healthcare landing page presenting a warm and modern medical brand with a hero section, services, about section, doctor profiles, testimonials, location details, and a professional footer.',
    image: '/assets/images/landing-page.webp',
    tags: '#JavaScript #HTML #Tailwind',
    hexColor: '#f59e0b',
    liveLink: 'https://sharkawy89.github.io/landing-page-2/',
    repoLink: 'https://github.com/sharkawy89/landing-page-2'
  },
  {
    id: 7,
    home: 'featured',
    category: 'Marketing agency',
    title: 'TouchMedia',
    description:
      'A high-performance corporate website built for TouchMedia, a Cairo-based marketing and production agency. Features immersive GSAP-powered animations.',
    image: '/assets/images/touchmedia.webp',
    tags: '#react #framer #Vite #Tailwind',
    hexColor: '#f97316',
    liveLink: 'https://touchmediaint.vercel.app/',
    repoLink: 'https://github.com/sharkawy89'
  },
  {
    id: 5,
    home: 'featured',
    category: 'Modern e-commerce',
    title: 'Next Circuit',
    description:
      'An e-commerce application specializing in technology devices, featuring user authentication, product catalog, shopping cart, and order management. The backend runs on Vercel serverless functions.',
    image: '/assets/images/next-circuit.webp',
    tags: '#Node.js #Express #Firestore #Tailwind',
    hexColor: '#8b5cf6',
    liveLink: 'https://next-circuit.vercel.app/',
    repoLink: 'https://github.com/sharkawy89/Next-circuit'
  },
  {
    id: 6,
    home: 'archive',
    category: 'Education platform',
    title: 'EduMange',
    description:
      'A full-featured student and teacher management dashboard built with React. It includes role-based authentication, course and attendance tracking, interactive data visualizations, and CRUD operations for students and teachers, all wrapped in a responsive sidebar layout with search, filter, and pagination.',
    image: '/assets/images/studentdb.webp',
    tags: '#react #Recharts #Vite #Bootstrap',
    hexColor: '#06b6d4',
    liveLink: 'https://depi-projectt.vercel.app/dashboard',
    repoLink: 'https://github.com/sharkawy89/depi-projectt'
  },
  {
    id: 8,
    home: 'archive',
    category: 'Todo list app',
    title: 'Todo List',
    description:
      'A minimal and efficient to-do list app built to manage personal tasks effortlessly. It features task categorization, quick filtering, and real-time updates.',
    image: '/assets/images/todo list.webp',
    tags: '#Html #Css #Javascript',
    hexColor: '#f43f5e',
    liveLink: 'https://sharkawy89.github.io/todo-app/',
    repoLink: 'https://github.com/sharkawy89/todo-app'
  },
  {
    id: 9,
    home: 'archive',
    category: 'Portfolio template',
    title: 'Freelancer Portfolio',
    description:
      'A clean and responsive portfolio template ideal for freelancers to display their services. It includes a modern layout for skills, work experience entries, and a project gallery.',
    image: '/assets/images/omar sallam.webp',
    tags: '#Html #Css #Javascript',
    hexColor: '#14b8a6',
    liveLink: 'https://sharkawy89.github.io/omar_sallam_portfolio/',
    repoLink: 'https://github.com/sharkawy89/omar_sallam_portfolio'
  },
  {
    id: 10,
    home: 'featured',
    category: 'electron app',
    title: 'Pharmacy management System',
    description:
      'An offline-first desktop Point-of-Sale application engineered to manage comprehensive pharmacy operations securely and efficiently. Built on an Electron and React architecture, it leverages a robust local Realm database to guarantee zero-latency operations without relying on an active internet connection. The system is designed with a heavy emphasis on architectural security, strict data isolation, and enterprise-grade reliability.',
    image: '/assets/images/pharmacy.webp',
    liveLabel: 'Download app',
    tags: '#React #Electron #JavaScript #RealmDB #Tailwind',
    hexColor: '#800020',
    liveLink: 'https://github.com/sharkawy89/',
    repoLink: 'https://github.com/sharkawy89/'
  }
]
