import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import useMarqueeLoop from './useMarqueeLoop'
import { useLenis } from './SmoothScroll'

// Paths must start with "/" and must NOT include "public": Vite serves the
// public/ folder from the site root. encodeURIComponent keeps names with
// spaces or "&" working.
const img = (file) => `/assets/images/${encodeURIComponent(file)}`

// Swap these image paths for wherever the certificate files live in
// /public (e.g. /assets/images/certificates/...), same convention as
// the rest of the site's images.
const certificates = [
  {
    title: 'Business English Track',
    issuer: 'Digital Egypt Pioneers · SYE English Community',
    date: 'Nov 2025 – Jul 2026',
    image: img('business english.webp'),
  },
  {
    title: 'React Frontend Web Developer',
    issuer: 'Digital Egypt Pioneers Program',
    date: 'Nov 2025 – Jul 2026',
    image: img('certificate_depi.webp'),
  },
  {
    title: 'Freelancing Basics',
    issuer: 'Mahara-Tech (ITI)',
    date: 'Feb 11, 2026',
    duration: '3h 8m',
    verification: 'SmVjwVmBrv',
    image: img('freelance.webp'),
  },
  {
    title: 'Learn HTML & CSS',
    issuer: 'Mahara-Tech (ITI)',
    date: 'Jul 14, 2025',
    duration: '7h 42m',
    verification: '8IDWm45HQa',
    image: img('html css.webp'),
  },
  {
    title: 'JavaScript',
    issuer: 'Mahara-Tech (ITI)',
    date: 'Feb 11, 2026',
    duration: '7h',
    verification: 'JUNTcdCYHr',
    image: img('js_page-0001.webp'),
  },
  {
    title: 'Python Programming Basics',
    issuer: 'Mahara-Tech · AI Academy',
    date: 'Oct 14, 2025',
    duration: '1h 38m',
    verification: 'WK13HaoRKW',
    image: img('python-basics.webp'),
  },
  {
    title: 'AI for Business Professionals',
    issuer: 'hp LIFE',
    date: 'Oct 3, 2026',
    duration: '',
    verification: ': 7f311b13-16c1-40bc-853e-4c1839b51072',
    image: img('AI for Business Professionals.webp'),
  },
  {
    title: 'Business Communications',
    issuer: 'hp LIFE',
    date: 'Oct 3, 2026',
    duration: '',
    verification: ': 833949f9-f034-4c9a-9ef7-e8f852144f06',
    image: img('Business Communications.webp'),
  },

  {
    title: 'Business Email',
    issuer: 'hp LIFE',
    date: 'Oct 3, 2026',
    duration: '',
    verification: ': b34b727e-4171-4c5c-b331-82fa04ff4ded',
    image: img('Business Email.webp'),
  },
  {
    title: 'gemini for SDLC',
    issuer: 'Google Cloud',
    date: 'Oct 2, 2026',
    duration: '',
    verification: ': https://www.skills.google/public_profiles/407d3c4b-749e-4830-b219-a7ac85079b39/badges/28619591',
    image: img('gemini for SDLC.webp'),
  },
  {
    title: 'Generative AI',
    issuer: 'Google Cloud',
    date: 'Oct 2, 2026',
    duration: '',
    verification: ': https://www.skills.google/public_profiles/407d3c4b-749e-4830-b219-a7ac85079b39/badges/28619502',
    image: img('gen ai.webp'),
  },
]
// The strip needs enough copies to always fill the screen. The hook must be
// told the same number so it can measure one full lap.
const COPIES = 6
const track = Array.from({ length: COPIES }, () => certificates).flat()

export default function CertificateStrip() {
  const trackRef = useMarqueeLoop(COPIES)
  const lenis = useLenis()
  const [openIndex, setOpenIndex] = useState(null)
  const isOpen = openIndex !== null
  const current = isOpen ? certificates[openIndex] : null

  const close = () => setOpenIndex(null)
  const prev = () => setOpenIndex((i) => (i - 1 + certificates.length) % certificates.length)
  const next = () => setOpenIndex((i) => (i + 1) % certificates.length)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, lenis])

  return (
    <section className="mt-4 mb-24 max-md:mb-16">
      <div className="cert-marquee marquee-bleed relative overflow-hidden py-5">
        <div ref={trackRef} className="cert-marquee-track flex items-center gap-8 w-max max-sm:gap-5">
          {track.map((cert, index) => (
            <button
              key={`${cert.title}-${index}`}
              onClick={() => setOpenIndex(index % certificates.length)}
              aria-label={`View certificate: ${cert.title}`}
              className="flex-shrink-0 w-72 aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:border-accent hover:scale-[1.02] transition-[filter,opacity,transform,border-color] duration-500 max-sm:w-56"
            >
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 max-sm:p-3"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={close}
        >
          <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={close}
              aria-label="Close"
              className="absolute -top-11 right-0 w-9 h-9 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-accent flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>

            <img
              src={current.image}
              alt={current.title}
              className="w-full rounded-2xl border border-slate-700 shadow-2xl"
            />

            <div className="mt-4 flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h4 className="text-white font-bold text-lg">{current.title}</h4>
                <p className="text-slate-400 text-sm mt-1">
                  {current.issuer} · {current.date}
                  {current.duration && ` · ${current.duration}`}
                </p>
              </div>
              {current.verification && (
                <span className="text-slate-500 text-xs font-mono mt-1">
                  Verify: {current.verification}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prev}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-accent transition-colors"
              >
                <ChevronLeft size={18} /> Prev
              </button>
              <span className="text-slate-500 text-xs font-mono">
                {openIndex + 1} / {certificates.length}
              </span>
              <button
                onClick={next}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-accent transition-colors"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .marquee-bleed {
          width: 100vw;
          margin-left: calc(50% - 50vw);
        }
        .cert-marquee {
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
        }
        .cert-marquee-track {
          animation: cert-marquee-scroll 42s linear infinite;
        }
        .cert-marquee:hover .cert-marquee-track {
          animation-play-state: paused;
        }
        @keyframes cert-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * var(--marquee-distance, 33.333%))); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  )
}