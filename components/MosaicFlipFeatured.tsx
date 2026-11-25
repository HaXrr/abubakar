'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { featuredProjects } from '@/data/projects'
import { useMosaicFlip } from './MosaicFlip/useMosaicFlip'

const DURATION = 5

export default function MosaicFlipFeatured() {
  const stageRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoTweenRef = useRef<gsap.core.Tween | null>(null)
  const isHoveringRef = useRef(false)
  const barFillRefs = useRef<(HTMLDivElement | null)[]>([])
  const advanceRef = useRef<((index: number) => void) | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const images = useMemo(
    () => [featuredProjects[0]?.thumbnail ?? '', ...featuredProjects.map((p) => p.thumbnail)],
    [],
  )

  const { revealProject, previewWidth, previewHeight } = useMosaicFlip({
    previewRef,
    scopeRef: stageRef,
    config: { images, tileClassName: 'mff-tile', faceClassPrefix: 'mff-' },
  })

  useEffect(() => {
    function advance(index: number) {
      autoTweenRef.current?.kill()

      barFillRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { scaleX: i + 1 < index ? 1 : 0 })
      })

      const fillEl = barFillRefs.current[index - 1]
      if (!fillEl) return

      autoTweenRef.current = gsap.to(fillEl, {
        scaleX: 1,
        duration: DURATION,
        ease: 'none',
        onComplete: () => {
          if (isHoveringRef.current) return
          const next = index >= featuredProjects.length ? 1 : index + 1
          setActiveIndex(next)
          revealProject(next)
          advance(next)
        },
      })
    }

    advanceRef.current = advance
    advance(1)

    return () => {
      autoTweenRef.current?.kill()
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      advanceRef.current = null
    }
  }, [revealProject])

  function scheduleReveal(index: number) {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => revealProject(index), 50)
  }

  return (
    <section ref={stageRef} className="mff-section" aria-label="Uitgelichte projecten">
      <div className="mff-stage">
        <div
          ref={previewRef}
          className="mff-preview"
          style={{ width: previewWidth, height: previewHeight }}
        />
      </div>

      <div className="mff-meta">
        <p className="mff-eyebrow">Featured</p>
        <h2 className="mff-heading">Projects you might explore!</h2>
        <p className="mff-sub">move cursor over a project.</p>
        <div className="mff-bars">
          {featuredProjects.map((_, i) => (
            <button
              key={i}
              className="mff-bar"
              aria-label={`Project ${i + 1}`}
              onClick={() => {
                const idx = i + 1
                isHoveringRef.current = false
                setActiveIndex(idx)
                revealProject(idx)
                advanceRef.current?.(idx)
              }}
            >
              <div
                ref={(el) => {
                  barFillRefs.current[i] = el
                }}
                className="mff-bar-fill"
              />
            </button>
          ))}
        </div>
        <ul
          className="mff-list"
          onMouseLeave={() => {
            isHoveringRef.current = false
            setActiveIndex(0)
            scheduleReveal(0)
            advanceRef.current?.(1)
          }}
        >
          {featuredProjects.map((project, i) => {
            const index = i + 1
            return (
              <li key={project.id} className="mff-list-item">
                <Link
                  href={`/project/${project.id}`}
                  className={`mff-link${activeIndex === index ? ' mff-link--active' : ''}`}
                  onMouseEnter={() => {
                    isHoveringRef.current = true
                    autoTweenRef.current?.kill()
                    setActiveIndex(index)
                    scheduleReveal(index)
                  }}
                  onFocus={() => {
                    isHoveringRef.current = true
                    autoTweenRef.current?.kill()
                    setActiveIndex(index)
                    scheduleReveal(index)
                  }}
                >
                  <span className="mff-link-client">{project.client}</span>
                  <span className="mff-link-title">{project.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>{' '}
      </div>
    </section>
  )
}
