'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { featuredProjects } from '@/data/projects'

export default function FeaturedProjects() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const items = rootRef.current!.querySelectorAll<HTMLElement>('.fp-item')

      items.forEach((item, i) => {
        const isRight = i % 2 !== 0
        gsap.set(item, {
          y: 100,
          rotation: isRight ? 6 : -6,
          opacity: 0,
          transformOrigin: isRight ? 'bottom right' : 'bottom left',
        })
      })

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: 'power4.out',
          })
        },
      })

      const imgs = rootRef.current!.querySelectorAll<HTMLElement>('.fp-img')
      const listeners: Array<{ el: HTMLElement; type: string; handler: EventListener }> = []

      imgs.forEach((img) => {
        const onEnter = () => {
          gsap.to(img, { scale: 1.04, duration: 0.5, ease: 'power2.out' })
        }
        const onLeave = () => {
          gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' })
        }
        img.addEventListener('mouseenter', onEnter)
        img.addEventListener('mouseleave', onLeave)
        listeners.push({ el: img, type: 'mouseenter', handler: onEnter })
        listeners.push({ el: img, type: 'mouseleave', handler: onLeave })
      })

      return () => {
        listeners.forEach(({ el, type, handler }) => el.removeEventListener(type, handler))
      }
    },
    { scope: rootRef },
  )

  const rows: (typeof featuredProjects)[] = []
  for (let i = 0; i < featuredProjects.length; i += 2) {
    rows.push(featuredProjects.slice(i, i + 2))
  }

  return (
    <section ref={rootRef} id="portfolio" className="fp-section">
      <div className="fp-header">
        <p className="fp-eyebrow">Cases &amp;a Demo&apos;s</p>
        <h2 className="fp-heading">Geselecteerd werk</h2>
        <Link href="/projects" className="fp-all-link">
          Bekijk alle projecten <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="fp-list">
        {rows.map((row, ri) => (
          <div key={ri} className="fp-row">
            {row.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`} className="fp-item">
                <div className="fp-img-wrap">
                  <img
                    src={project.thumbnail}
                    alt={project.client}
                    className="fp-img"
                    loading="lazy"
                  />
                  <div className="fp-img-overlay">
                    <span className="fp-view-label">Bekijk case →</span>
                  </div>
                </div>
                <div className="fp-meta">
                  <span className="fp-client">{project.client}</span>
                  <div className="fp-tags">
                    {project.tags.slice(0, 3).map((t) => (
                      <span key={t} className="fp-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="fp-title">{project.title}</h3>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
