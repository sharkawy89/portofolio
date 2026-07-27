import { Mail, MessageCircle, MapPin, Linkedin, Github } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import SectionHeader from './SectionHeader'
import ContactForm from './ContactForm'

const iconMap = { Mail, MessageCircle, MapPin, Linkedin, Github }

const contactItems = [
  { value: 'adhamsharkawy185@gmail.com', href: 'mailto:adhamsharkawy185@gmail.com', icon: 'Mail' },
  { value: '01151921862', href: 'tel:01151921862', icon: 'MessageCircle' },
  { value: 'Helwan, Cairo, Egypt', icon: 'MapPin' },
  { value: 'Adham sharkawy', href: 'https://www.linkedin.com/in/adham-sharkawy-25985333b/', icon: 'Linkedin', external: true },
  { value: 'sharkawy89', href: 'https://github.com/sharkawy89', icon: 'Github', external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="max-w-[1320px] mx-auto mt-[200px] px-8 pb-10 max-[960px]:mt-[150px] max-[960px]:px-6 max-[960px]:pb-8 max-sm:mt-[80px] max-sm:px-4 max-sm:pb-6">
      <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-[clamp(28px,4vw,64px)] items-start max-[960px]:grid-cols-1 max-[960px]:gap-6">
        <div className="pt-2.5 max-[960px]:pt-0">
          <ScrollReveal direction="slide-right">
            <SectionHeader
              eyebrow="LET'S CONNECT"
              title="Get In"
              highlight="Touch"
              className="items-start text-left mb-[22px]"
            />
            <p className="text-text-secondary text-[clamp(1rem,1.05vw,1.08rem)] leading-[1.85] m-0 mb-[34px] max-w-[44ch] max-sm:max-w-none max-sm:text-sm">
              Have a project in mind or just want to say hi? Feel free to reach out.
            </p>
          </ScrollReveal>

          <div className="grid gap-4 max-sm:gap-3">
            {contactItems.map((item) => {
              const Icon = item.icon ? iconMap[item.icon] : null
              const content = (
                <div className="flex items-center gap-3.5 text-inherit w-fit max-sm:gap-3">
                  {Icon && (
                    <span className="w-[22px] h-[22px] text-accent flex-shrink-0">
                      <Icon size={22} />
                    </span>
                  )}
                  <span className="text-text-tertiary text-sm font-medium leading-relaxed hover:text-text-primary transition-colors">
                    {item.value}
                  </span>
                </div>
              )

              if (item.href) {
                return (
                  <a
                    key={item.value}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={item.value}
                    className="no-underline w-fit"
                  >
                    {content}
                  </a>
                )
              }
              return <div key={item.value}>{content}</div>
            })}
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
