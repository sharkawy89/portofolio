import ScrollReveal from './ScrollReveal'

export default function Hero() {
  return (
    <section id="home" className="flex justify-between items-center px-10 pb-14 pt-28 gap-16 max-w-[1400px] mx-auto min-h-[calc(100vh-90px)] max-md:flex-col max-md:px-6 max-md:pt-24 max-md:pb-10 max-md:gap-10 max-md:text-center max-sm:px-4 max-sm:pt-20 max-sm:gap-6 max-sm:pb-8">
      <div className="flex-1 max-w-[650px] max-md:max-w-full">
        <div>
          <ScrollReveal direction="fade" duration={0.4}>
            <p className="text-accent-light font-semibold text-lg mb-5 max-md:text-base">
              👋 Hello, I&apos;m Adham Sharkawy
            </p>
          </ScrollReveal>
          <ScrollReveal direction="slide-up" delay={0.1}>
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] leading-tight text-text-primary mb-6 font-bold max-md:text-[2rem] max-sm:text-[1.6rem]">
              Turning Complex <br />
              <span className="text-accent">Logic into Seamless</span> <br />
              User Experiences.
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="slide-up" delay={0.2}>
            <p className="text-text-secondary text-base leading-relaxed mb-10 max-md:text-sm max-md:mb-8">
              A talented Front-End Developer with a 3-year edge in Advertising. I engineer high-performance, AI-powered React applications by merging technical mastery with strategic communication. I don&apos;t just build pixel-perfect interfaces; I create responsive digital experiences designed to engage and convert.
            </p>
          </ScrollReveal>
        </div>
        <ScrollReveal direction="slide-up" delay={0.3}>
          <div className="flex gap-5 flex-wrap max-md:justify-center max-md:gap-4">
            <a href="#projects-section" className="inline-block px-6 py-3 rounded-lg font-semibold bg-accent text-white shadow-accent hover:bg-accent-dark hover:shadow-[0_6px_20px_rgba(56,189,248,0.4)] transition-all duration-300 no-underline">
              View My Work &rarr;
            </a>
            <a
              href="assets/Adham_Sharkawy_Front_end_Developer.pdf"
              download="Adham-Sharkawy-Resume.pdf"
              className="inline-block px-6 py-3 rounded-lg font-semibold bg-transparent text-text-primary border-2 border-border-secondary shadow-[0_4px_15px_rgba(30,41,59,0.3)] hover:bg-surface-elevated hover:border-accent hover:shadow-accent transition-all duration-300 no-underline"
            >
              Download Resume
            </a>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal direction="slide-left" delay={0.2}>
        <div className="flex-shrink-0">
          <div className="w-[380px] h-[380px] border-[3px] border-accent rounded-full p-3 overflow-hidden flex justify-center items-center shadow-accent transition-all duration-300 hover:scale-105 hover:shadow-accent-lg max-md:w-[280px] max-md:h-[280px] max-sm:w-[220px] max-sm:h-[220px]">
            <img
              src="assets/images/photo.webp"
              alt="Adham Sharkawy"
              width={1540}
              height={1540}
              fetchpriority="high"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
