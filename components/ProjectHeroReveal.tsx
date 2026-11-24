'use client'

import { useRef } from 'react'
import { gsap, SplitText, CustomEase, useGSAP } from '@/lib/gsap'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
  liveUrl?: string
}

export default function ProjectHeroReveal({ project, liveUrl }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const tags = project.tags.slice(0, 3)

  useGSAP(
    () => {
      if (!CustomEase.get('hop')) CustomEase.create('hop', '0.9, 0, 0.1, 1')

      const root = rootRef.current!
      const splits: SplitText[] = []

      const splitChars = (selector: string) => {
        const s = SplitText.create(root.querySelectorAll(selector), {
          type: 'chars',
          charsClass: 'char',
          mask: 'chars',
        })
        splits.push(s)
        return s
      }
      const splitWords = (selector: string) => {
        const s = SplitText.create(root.querySelectorAll(selector), {
          type: 'words',
          wordsClass: 'word',
          mask: 'words',
        })
        splits.push(s)
        return s
      }

      splitChars('.pdhr-header h1')
      splitWords('.pdhr-footer p')

      const tl = gsap.timeline()

      tl.to(
        '.pdhr-bg',
        {
          clipPath: 'polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)',
          duration: 1.5,
          ease: 'hop',
        },
        0,
      )

      tl.to('.pdhr-bg img', { scale: 1.5, duration: 1.5, ease: 'hop' }, '<')

      tl.to(
        '.pdhr-bg',
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 2,
          ease: 'hop',
        },
        1.5,
      )

      tl.to('.pdhr-bg img', { scale: 1, duration: 2, ease: 'hop' }, 1.5)

      tl.to('.pdhr-progress', { scaleX: 1, duration: 2, ease: 'hop' }, 1.5)

      tl.call(() => gsap.set(h1Ref.current, { opacity: 1 }), [], 2.5)

      tl.to(
        '.pdhr-header h1 .char',
        { x: '0%', opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.075 },
        2.5,
      )

      tl.to(
        '.pdhr-footer p .word',
        { y: '0%', duration: 1, ease: 'power4.out', stagger: 0.075 },
        3,
      )

      tl.fromTo(
        '.pdhr-eyebrow, .pdhr-live',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
        3,
      )

      return () => {
        splits.forEach((s) => s.revert())
      }
    },
    { scope: rootRef, dependencies: [project.id] },
  )

  return (
    <div ref={rootRef}>
      <section className="pdhr-hero">
        <div className="pdhr-bg">
          <img src={project.thumbnail} alt={project.client} />
        </div>

        <div className="pdhr-eyebrow">
          <p>{project.client}</p>
        </div>

        {liveUrl && (
          <a className="pdhr-live" href={liveUrl} target="_blank" rel="noopener noreferrer">
            Live project bekijken ↗
          </a>
        )}

        <div className="pdhr-header">
          <h1 ref={h1Ref} className="opacity-0">
            {project.title}
          </h1>
        </div>

        <div className="pdhr-footer">
          {tags.map((tag) => (
            <p key={tag}>{tag}</p>
          ))}
        </div>

        <div className="pdhr-progress-bar">
          <div className="pdhr-progress" />
        </div>
      </section>
    </div>
  )
}
