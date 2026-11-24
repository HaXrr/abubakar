'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const headline = section.querySelector<HTMLElement>('.cta-headline')
      const eyebrow = section.querySelector<HTMLElement>('.cta-eyebrow')
      const form = section.querySelector<HTMLElement>('.cta-form')

      if (!headline || !eyebrow || !form) return

      const split = new SplitText(headline, { type: 'lines', linesClass: 'line', mask: 'lines' })
      gsap.set(split.lines, { y: '110%' })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(eyebrow, { opacity: 1, duration: 0.6, ease: 'power3.out' })
          gsap.to(split.lines, {
            y: '0%',
            duration: 1.1,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.1,
          })
          gsap.to(form, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.4,
          })
        },
        once: true,
      })

      return () => {
        split.revert()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="contact" className="cta-section">
      <p className="cta-eyebrow">Lets do Project</p>

      <h2 className="cta-headline">
        Ready to
        <br />
        start?
      </h2>

      <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
  <div className="cta-row">
    <input className="cta-input" type="text" placeholder="Your name" required />
    <input className="cta-input" type="email" placeholder="Email address" required />
  </div>
  <input className="cta-input" type="text" placeholder="Company (optional)" />
  <textarea className="cta-textarea" placeholder="Tell us about your project…" required />
  <button type="submit" className="cta-submit">
    Send message
  </button>
</form>
    </section>
  )
}
