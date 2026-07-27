import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1, 'Full name is required').regex(/^[a-zA-Z]{3,20}\s+[a-zA-Z]{3,20}$/i, 'Enter your full name (first & last, each 3-20 letters)'),
  email: z.string().min(1, 'Email is required').regex(/^[a-zA-Z0-9.-_]+@(gmail)+\.(com|org|eg|edu)$/, 'Enter a valid Gmail address (e.g. name@gmail.com)'),
  phone: z.string().min(1, 'Phone number is required').regex(/^(0)?1[0125][0-9]{8}$/, 'Enter a valid Egyptian number (e.g. 010XXXXXXXX)'),
  subject: z.string().min(1, 'Subject is required').regex(/^[a-zA-Z\s.,!?'-]{4,}$/, 'Subject must be at least 4 letters (no numbers)'),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
})

export default function ContactForm() {
  const [submitState, setSubmitState] = useState('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    setSubmitState('sending')
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('subject', data.subject)
      formData.append('message', data.message)

      const res = await fetch('https://formspree.io/f/mpqjdzpd', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setSubmitState('success')
        reset()
        setTimeout(() => setSubmitState('idle'), 4000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch {
      setSubmitState('error')
      setError('root', { message: 'Something went wrong. Please try again.' })
      setTimeout(() => setSubmitState('idle'), 4000)
    }
  }

  const fieldClass = (field) =>
    `w-full bg-surface border border-border-primary border-[rgba(26,71,157,0.16)] px-4 py-[15px] rounded-[14px] text-text-primary text-sm transition-all duration-200 focus:outline-none focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_rgba(56,189,248,0.18)] placeholder:text-text-secondary placeholder:text-muted ${
      errors[field] ? '!border-red-500 !shadow-[0_0_0_3px_rgba(239,68,68,0.14)]' : ''
    }`

  return (
    <div className="p-[18px] rounded-[28px] bg-surface/60 border border-slate-700 shadow-[0_24px_60px_rgba(56,189,248,0.18)] backdrop-blur-lg max-sm:p-3 max-sm:rounded-[22px]">
      {submitState === 'success' && (
        <div className="mb-4 p-3.5 rounded-xl text-sm font-medium bg-green-500/10 border border-green-500 text-green-500">
          Message sent successfully! I&apos;ll get back to you soon.
        </div>
      )}
      {submitState === 'error' && (
        <div className="mb-4 p-3.5 rounded-xl text-sm font-medium bg-red-500/10 border border-red-500 text-red-500">
          {errors.root?.message || 'Something went wrong. Please try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3.5 m-0 max-w-none text-left">
        <div className="m-0">
          <label htmlFor="name" className="sr-only">Full Name</label>
          <input id="name" type="text" placeholder="Full Name" {...register('name')} className={fieldClass('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-500 ml-1">{errors.name.message}</p>}
        </div>
        <div className="m-0">
          <label htmlFor="email" className="sr-only">Email</label>
          <input id="email" type="email" placeholder="Email" {...register('email')} className={fieldClass('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-500 ml-1">{errors.email.message}</p>}
        </div>
        <div className="m-0">
          <label htmlFor="phone" className="sr-only">Phone</label>
          <input id="phone" type="tel" placeholder="Phone" {...register('phone')} className={fieldClass('phone')} />
          {errors.phone && <p className="mt-1 text-xs text-red-500 ml-1">{errors.phone.message}</p>}
        </div>
        <div className="m-0">
          <label htmlFor="subject" className="sr-only">Subject</label>
          <input id="subject" type="text" placeholder="Subject" {...register('subject')} className={fieldClass('subject')} />
          {errors.subject && <p className="mt-1 text-xs text-red-500 ml-1">{errors.subject.message}</p>}
        </div>
        <div className="m-0">
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea id="message" placeholder="Message" rows={6} {...register('message')} className={`${fieldClass('message')} resize-y h-[195px] max-sm:h-[130px] max-sm:resize-none`} />
          {errors.message && <p className="mt-1 text-xs text-red-500 ml-1">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          disabled={submitState === 'sending'}
          className="w-full border-0 bg-accent text-bg-primary text-base font-bold px-5 py-4 rounded-[14px] cursor-pointer transition-all duration-250 hover:bg-accent-dark hover:shadow-[0_16px_30px_rgba(56,189,248,0.18)] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed max-sm:rounded-xl"
        >
          {submitState === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
