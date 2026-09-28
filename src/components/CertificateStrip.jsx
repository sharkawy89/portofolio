import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import useMarqueeLoop from './useMarqueeLoop'

// Swap these image paths for wherever the certificate files live in
// /public (e.g. /assets/images/certificates/...), same convention as
// the rest of the site's images.
const certificates = [
  {
    title: 'Business English Track',
    issuer: 'Digital Egypt Pioneers · SYE English Community',
    date: 'Nov 2025 – Jul 2026',
    image: 'public/assets/images/business english.webp',
  },
  {
    title: 'React Frontend Web Developer',
    issuer: 'Digital Egypt Pioneers Program',
    date: 'Nov 2025 – Jul 2026',
    image: 'public/assets/images/certificate_depi.webp',
  },
  {
    title: 'Freelancing Basics',
    issuer: 'Mahara-Tech (ITI)',
    date: 'Feb 11, 2026',
    duration: '3h 8m',
    verification: 'SmVjwVmBrv',
    image: 'public/assets/images/freelance.webp',
  },
  {
    title: 'Learn HTML & CSS',
    issuer: 'Mahara-Tech (ITI)',
    date: 'Jul 14, 2025',
    duration: '7h 42m',
    verification: '8IDWm45HQa',
    image: 'public/assets/images/html&css.webp',
  },
  {
    title: 'JavaScript',
    issuer: 'Mahara-Tech (ITI)',
    date: 'Feb 11, 2026',
    duration: '7h',
    verification: 'JUNTcdCYHr',
    image: 'public/assets/images/js_page-0001.webp',
  },
  {
    title: 'Python Programming Basics',
    issuer: 'Mahara-Tech · AI Academy',
    date: 'Oct 14, 2025',
    duration: '1h 38m',
    verification: 'WK13HaoRKW',
    image: 'public/assets/images/python-basics.webp',
  },
]
// Duplicated 3x so the strip still tiles seamlessly on very wide screens.
const track = [...certificates, ...certificates, ...certificates, ...certificates, ...certificates, ...certificates]

export default function CertificateStrip() {
  const trackRef = useMarqueeLoop(3)
  const [openIndex, setOpenIndex] = useState(null)
  const isOpen = openIndex !== null
  const current = isOpen ? certificates[openIndex] : null

  const close = () => setOpenIndex(null)
  const prev = () => setOpenIndex((i) => (i - 1 + certificates.length) % certificates.length)
  const next = () => setOpenIndex((i) => (i + 1) % certificates.length)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

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