'use client'

import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { featuredProjects } from '@/data/projects'
import { useMosaicFlip } from './MosaicFlip/useMosaicFlip'

export default function MosaicFlipProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const images = useMemo(
    () => [featuredProjects[0].thumbnail, ...featuredProjects.map((p) => p.thumbnail)],
    [],
  )

  const { revealProject } = useMosaicFlip({
    previewRef,
    scopeRef: sectionRef,
    config: { images, tileClassName: 'mosaic-tile', faceClassPrefix: 'mosaic-' },
  })

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    }
  }, [])

  function scheduleReveal(idx: number) {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => revealProject(idx), 50)
  }

  function handleEnter(idx: number, el: HTMLAnchorElement) {
    el.parentElement
      ?.querySelectorAll<HTMLAnchorElement>('.mosaic-list-item')
      .forEach((a) => a.classList.remove('mosaic-active'))
    el.classList.add('mosaic-active')
    scheduleReveal(idx)
  }

  function handleListLeave(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget
      .querySelectorAll<HTMLAnchorElement>('.mosaic-list-item')
      .forEach((a) => a.classList.remove('mosaic-active'))
    scheduleReveal(0)
  }

  return (
    <section ref={sectionRef} id="portfolio" className="mosaic-section">
      <div className="mosaic-header">
        <p className="mosaic-eyebrow">Cases &amp; Demo&apos;s</p>
        <h2 className="mosaic-heading">Geselecteerd werk</h2>
        <Link href="/projects" className="mosaic-all-link">
          Bekijk alle projecten <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mosaic-spotlight">
        <div className="mosaic-preview" ref={previewRef} />

        <nav className="mosaic-list" onMouseLeave={handleListLeave}>
          {featuredProjects.map((p, i) => (
            <Link
              key={p.id}
              href={`/project/${p.id}`}
              className="mosaic-list-item"
              data-project-index={i + 1}
              onMouseEnter={(e) => handleEnter(i + 1, e.currentTarget)}
              onFocus={(e) => handleEnter(i + 1, e.currentTarget)}
            >
              {p.client}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
