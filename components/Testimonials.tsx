'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

const reviews = [
  {
    client: 'Northbridge Digital',
    role: 'Product Director',
    quote:
      'Abu Bakar delivered a prototype that captured our vision from day one. From initial concept to final product, everything was executed seamlessly.',
  },
  {
    client: 'Studio Halcyon',
    role: 'Creative Lead',
    quote:
      'Exceptional craft and thoughtful problem-solving. Abu Bakar brings real foresight to the table and consistently exceeds expectations.',
  },
  {
    client: 'Kestrel Systems',
    role: 'Managing Director',
    quote:
      'From idea to production in record time without compromising on quality. Abu Bakar is a reliable partner we count on.',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const cards = section.querySelectorAll<HTMLElement>('.testimonial-card')

      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: 'power3.out',
          })
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="testimonials-section">
      <h2 className="testimonials-heading">
        What my clients
        <br />
        say
      </h2>

      <div className="testimonial-grid">
        {reviews.map((review, i) => (
          <div key={i} className="testimonial-card">
            <p className="testimonial-quote">{review.quote}</p>
            <div className="testimonial-meta">
              <span className="testimonial-client">{review.client}</span>
              <span className="testimonial-role">{review.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
