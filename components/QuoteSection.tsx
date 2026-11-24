'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'

export default function QuoteSection() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const quoteEl = rootRef.current!.querySelector<HTMLElement>('.qs-quote')!
      const eyebrow = rootRef.current!.querySelector<HTMLElement>('.qs-eyebrow')!

      const split = new SplitText(quoteEl, {
        type: 'words',
        wordsClass: 'qs-word',
      })

      gsap.set(split.words, { opacity: 0.12 })
      gsap.set(eyebrow, { opacity: 0 })

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(eyebrow, { opacity: 1, duration: 0.6, ease: 'power3.out' })
        },
      })

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 55%',
        end: 'bottom 65%',
        scrub: 1.2,
        onUpdate: (self) => {
          const total = split.words.length
          const lit = Math.round(self.progress * total)
          split.words.forEach((w, i) => {
            gsap.set(w, { opacity: i < lit ? 1 : 0.12 })
          })
        },
      })

      return () => {
        split.revert()
      }
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} className="qs-section">
      <p className="qs-eyebrow">my philosophy</p>
      <blockquote className="qs-quote">
        Curious by nature, driven by technology, and passionate about building for the web. I transform ideas into functional, scalable, and engaging digital experiences while continuously learning, experimenting, and pushing the boundaries of what's possible.
      </blockquote>
      <div className="qs-deco" aria-hidden>
        <span>360°</span>
      </div>
    </section>
  )
}
