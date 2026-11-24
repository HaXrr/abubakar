'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { gsap, useGSAP } from '@/lib/gsap'
import { CATEGORIES, type Category, type Project } from '@/data/projects'

interface Props {
  projects: Project[]
}

export default function ProjectsClient({ projects }: Props) {
  const [active, setActive] = useState<Category>('all')
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.category === active)

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll('.pp-card')
      if (!cards) return
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform',
        },
      )
    },
    { dependencies: [active], scope: gridRef },
  )

  return (
    <>
      <div className="pp-filters" role="tablist" aria-label="Filter projecten">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            className={`pp-filter${active === cat ? ' pp-filter--active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat === 'all' ? 'Alles' : cat}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="pp-grid">
        {filtered.map((project) => (
          <Link key={project.id} href={`/project/${project.id}`} className="pp-card">
            <div className="pp-card-img-wrap">
              <img
                src={project.thumbnail}
                alt={project.client}
                className="pp-card-img"
                loading="lazy"
              />
              <div className="pp-card-overlay">
                <span className="pp-view">Bekijk case →</span>
              </div>
            </div>
            <div className="pp-card-body">
              <p className="pp-card-client">{project.client}</p>
              <h3 className="pp-card-title">{project.title}</h3>
              <div className="pp-card-tags">
                {project.tags.slice(0, 3).map((t) => (
                  <span key={t} className="pp-card-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="pp-empty">Geen projecten gevonden in deze categorie.</p>
      )}
    </>
  )
}
