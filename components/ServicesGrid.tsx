'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

const services = [
  { id: '01', title: 'Web Application Development', image: '/images/services/web-application-service.avif' },
  { id: '02', title: 'Animation and Transitions in Web Sites', image: '/images/services/animations-service.avif' },
  { id: '03', title: 'UI/UX Designs', image: '/images/services/ui-ux-service.avif' },
  { id: '04', title: 'Mobile Apps', image: '/images/services/mobile-app-service.avif' },
  { id: '05', title: 'Portfolios', image: '/images/services/portfolio-service.avif' },
  { id: '06', title: 'Retail & Inventory Management', image: '/images/services/inventory-service.avif' },
]

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const indexEl = section.querySelector<HTMLElement>('.services-index h1')
      const cardsContainer = section.querySelector<HTMLElement>('.services-cards')
      const cards = section.querySelectorAll<HTMLElement>('.services-card')
      const namesContainer = section.querySelector<HTMLElement>('.services-names')
      const names = section.querySelectorAll<HTMLElement>('.services-names p')
      if (!indexEl || !cardsContainer || !namesContainer || !cards.length) return

      const total = names.length

      const sectionWidth = section.offsetWidth
      const sectionPadding = parseFloat(getComputedStyle(section).padding)
      const indexWidth = indexEl.offsetWidth
      const namesWidth = namesContainer.offsetWidth
      const cardStripWidth = cardsContainer.scrollWidth

      const moveDistanceIndex = sectionWidth - sectionPadding * 2 - indexWidth
      const moveDistanceNames = sectionWidth - sectionPadding * 2 - namesWidth
      // const moveDistanceCards = cardsStripWidth - window.innerWidth
      const moveDistanceCards = cardStripWidth - window.innerWidth

      const cardActivationThreshold = window.innerWidth / 2

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * 3}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const currentIndex = Math.min(Math.floor(progress * total) + 1, total)

          indexEl.textContent = `${String(currentIndex).padStart(2, '0')}/${String(total).padStart(2, '0')}`

          gsap.set(indexEl, { x: progress * moveDistanceIndex })
          gsap.set(cardsContainer, { x: -progress * moveDistanceCards })

          cards.forEach((card) => {
            const rect = card.getBoundingClientRect()
            if (rect.left <= cardActivationThreshold && rect.right >= cardActivationThreshold) {
              gsap.set(card, { opacity: 1 })
            } else {
              gsap.set(card, { opacity: 0.5 })
            }
          })

          names.forEach((p, index) => {
            const startProgress = index / total
            const endProgress = (index + 1) / total
            const projectProgress = Math.max(
              0,
              Math.min(1, (progress - startProgress) / (endProgress - startProgress)),
            )

            gsap.set(p, { x: -projectProgress * moveDistanceNames })

            if (projectProgress > 0 && projectProgress < 1) {
              gsap.set(p, { color: '#ffffff' })
            } else {
              gsap.set(p, { color: '#4a4a4a' })
            }
          })
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="services" className="services-spotlight">
      <div className="services-index">
        <h1>01/06</h1>
      </div>

      <div className="services-cards">
        {services.map(({ id, title, image }) => (
          <div className="services-card" key={id} data-id={id}>
            <div className="services-card-media" aria-hidden>
              {image && (
                <Image src={image} alt="" fill unoptimized style={{ objectFit: 'cover' }} />
              )}
            </div>
            <div className="services-card-meta">
              <span className="services-card-id">{id}</span>
              <p className="services-card-title">{title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="services-names">
        {services.map(({ id, title }) => (
          <p key={id}>{title}</p>
        ))}
      </div>
    </section>
  )
}
