import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Education from './components/Education'
import CertificateStrip from './components/CertificateStrip'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AllProjects from './components/AllProjects'
import ScrollManager from './components/ScrollManager'
import SmoothScroll from './components/SmoothScroll'

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Education />
      <CertificateStrip />
      <Contact />
    </main>
  )
}

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-full flex flex-col bg-bg-primary star-bg overflow-x-clip transition-colors duration-300">
        <ScrollManager />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* AllProjects renders its own <main> */}
          <Route path="/projects" element={<AllProjects />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </SmoothScroll>
  )
}