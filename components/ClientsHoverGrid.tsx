'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, CustomEase, useGSAP } from '@/lib/gsap'

const clients = [
  'Chinar Creative',
  'Khushal Showroom',
  'Humsafar Network',
  'AYK Internet Service',
  'Pehchan Studio',
  'Margalla Digital',
  'Khyber Construction',
  'Coke Studio Live',
  'Rescue & Safety Solutions',
  'Sadaf Decor',
  'Indus Logistics',
  'Mehran Traders',
]

const images = [
  '/images/services/animations-service.avif',
  '/images/services/inventory-service.avif',
  '/images/services/mobile-app-development.avif',
  '/images/services/mobile-app-service.avif',
  '/images/services/portfolio-service.avif',
  '/images/services/portfolio-web-site-development.avif',
  '/images/services/service-3d-visualisatie.png',
  '/images/services/service-immersive-marketing.png',
  '/images/services/service-vr-training.png',
  '/images/services/ui-ux-service.avif',
  '/images/services/web-application-development.avif',
  '/images/services/web-application-service.avif',
]

export default function ClientsHoverGrid() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!CustomEase.get('hop')) CustomEase.create('hop', '0.9, 0, 0.1, 1')

      const root = rootRef.current!
      const preview = root.querySelector<HTMLDivElement>('.chg-preview')!
      const items = root.querySelectorAll<HTMLDivElement>('.chg-item')

      let activeIndex = -1
      const listeners: Array<{ el: HTMLElement; type: string; handler: EventListener }> = []

      items.forEach((item, index) => {
        let wrapper: HTMLDivElement | null = null
        let img: HTMLImageElement | null = null

        const onOver = () => {
          if (activeIndex === index) return
          if (activeIndex !== -1) {
            items[activeIndex].dispatchEvent(new Event('mouseout'))
          }
          activeIndex = index

          const newWrapper = document.createElement('div')
          newWrapper.className = 'chg-img-wrapper'
          const newImg = document.createElement('img')
          newImg.src = images[index % images.length]
          newImg.alt = ''
          gsap.set(newImg, { scale: 1.25, opacity: 0 })
          newWrapper.appendChild(newImg)
          preview.appendChild(newWrapper)
          wrapper = newWrapper
          img = newImg

          gsap.to(newWrapper, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 0.5,
            ease: 'hop',
          })
          gsap.to(newImg, { opacity: 1, duration: 0.25, ease: 'power2.out' })
          gsap.to(newImg, { scale: 1, duration: 1.25, ease: 'hop' })
        }

        const onOut = (e: Event) => {
          const ev = e as MouseEvent
          if (ev.relatedTarget && item.contains(ev.relatedTarget as Node)) return
          if (activeIndex === index) activeIndex = -1
          if (img && wrapper) {
            const imgToRemove = img
            const wrapperToRemove = wrapper
            img = null
            wrapper = null
            gsap.to(imgToRemove, {
              opacity: 0,
              duration: 0.5,
              ease: 'power1.out',
              onComplete: () => wrapperToRemove.remove(),
            })
          }
        }

        item.addEventListener('mouseover', onOver)
        item.addEventListener('mouseout', onOut)
        listeners.push({ el: item, type: 'mouseover', handler: onOver as EventListener })
        listeners.push({ el: item, type: 'mouseout', handler: onOut as EventListener })
      })

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.chg-label', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out',
            delay: 0.2,
          })
        },
      })

      return () => {
        listeners.forEach(({ el, type, handler }) => el.removeEventListener(type, handler))
      }
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} className="chg-section">
      <div className="chg-preview" />
      <p className="chg-label">Worked with</p>
      <div className="chg-list">
        {clients.map((name, i) => (
          <div key={i} className="chg-item">
            <h2>
              {name}
              {i < clients.length - 1 ? ',' : '.'}
            </h2>
          </div>
        ))}
      </div>
    </section>
  )
}
