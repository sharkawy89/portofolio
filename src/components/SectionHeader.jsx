export default function SectionHeader({ eyebrow, title, highlight, className = '' }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-[11px] font-semibold tracking-[0.2em] uppercase mb-5 w-fit">
        {eyebrow}
      </span>
      <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
        {title}{' '}
        <span className="text-accent italic">{highlight}</span>
      </h2>
      <div className="w-[90px] h-[3px] bg-gradient-to-r from-accent to-accent-light rounded-full mt-4 shadow-[0_0_12px_rgba(56,189,248,0.4)] max-sm:w-[60px]" />
    </div>
  )
}