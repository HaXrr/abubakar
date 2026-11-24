'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'

const slideData = [
  { title: '3D Printing & Prototyping' },
  { title: 'Product Design' },
  { title: 'Manufacturing Solutions' },
  { title: 'Brand Identity' },
  { title: 'Creative Direction' },
]

export default function ServicesSlider() {
  const sectionRef = useRef<HTMLElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section || !sliderRef.current) return
      const slider = sliderRef.current

      const splits: SplitText[] = []

      function createSplit(el: Element) {
        const split = new SplitText(el, { type: 'words', mask: 'words' })
        splits.push(split)
        return split
      }

      function createSlide(data: (typeof slideData)[0], position: number): HTMLDivElement {
        const slide = document.createElement('div')
        slide.className = 'service-slide'
        const h1 = document.createElement('h1')
        h1.className = 'service-slide-title'
        h1.textContent = data.title
        slide.appendChild(h1)
        slider.appendChild(slide)

        createSplit(h1)

        gsap.set(slide, {
          y: `${-15 + 15 * position}%`,
          z: 15 * position,
          opacity: 1,
        })

        return slide
      }

      slideData.forEach((data, i) => createSlide(data, i))

      function handleScrollDown() {
        if (isAnimatingRef.current) return
        isAnimatingRef.current = true

        const slides = Array.from(slider.querySelectorAll<HTMLDivElement>('.service-slide'))
        const firstSlide = slides[0]

        currentIndexRef.current = (currentIndexRef.current + 1) % slideData.length
        const newBackIndex = (currentIndexRef.current + 4) % slideData.length
        const nextData = slideData[newBackIndex]

        const newSlide = document.createElement('div')
        newSlide.className = 'service-slide'
        const h1 = document.createElement('h1')
        h1.className = 'service-slide-title'
        h1.textContent = nextData.title
        newSlide.appendChild(h1)
        slider.appendChild(newSlide)

        const newSplit = createSplit(h1)

        gsap.set(newSplit.words, { yPercent: 100 })
        gsap.set(newSlide, { y: `${-15 + 15 * 5}%`, z: 15 * 5, opacity: 0 })

        const allSlides = Array.from(slider.querySelectorAll<HTMLDivElement>('.service-slide'))

        allSlides.forEach((slide, i) => {
          const targetPos = i - 1
          gsap.to(slide, {
            y: `${-15 + 15 * targetPos}%`,
            z: 15 * targetPos,
            opacity: targetPos < 0 ? 0 : 1,
            duration: 1,
            ease: 'power3.inOut',
            onComplete: () => {
              if (i === 0) {
                firstSlide.remove()
                isAnimatingRef.current = false
              }
            },
          })
        })

        gsap.to(newSplit.words, {
          yPercent: 0,
          duration: 0.75,
          ease: 'power4.out',
          stagger: 0.15,
          delay: 0.5,
        })
      }

      function handleScrollUp() {
        if (isAnimatingRef.current) return
        isAnimatingRef.current = true

        const slides = Array.from(slider.querySelectorAll<HTMLDivElement>('.service-slide'))
        const lastSlide = slides[slides.length - 1]

        currentIndexRef.current =
          (currentIndexRef.current - 1 + slideData.length) % slideData.length
        const prevData = slideData[currentIndexRef.current]

        const newSlide = document.createElement('div')
        newSlide.className = 'service-slide'
        const h1 = document.createElement('h1')
        h1.className = 'service-slide-title'
        h1.textContent = prevData.title
        newSlide.appendChild(h1)
        slider.prepend(newSlide)

        createSplit(h1)

        gsap.set(newSlide, { y: `${-15 + 15 * -1}%`, z: 15 * -1, opacity: 0 })

        const slideQueue = Array.from(slider.querySelectorAll<HTMLDivElement>('.service-slide'))

        slideQueue.forEach((slide, i) => {
          gsap.to(slide, {
            y: `${-15 + 15 * i}%`,
            z: 15 * i,
            opacity: i > 4 ? 0 : 1,
            duration: 1,
            ease: 'power3.inOut',
            onComplete: () => {
              if (i === slideQueue.length - 1) {
                lastSlide.remove()
                isAnimatingRef.current = false
              }
            },
          })
        })
      }

      const NUM = slideData.length
      let lastTargetIndex = 0

      ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: `+=${NUM * window.innerHeight * 1.1}`,
        scrub: 1,
        onUpdate: (self) => {
          const raw = self.progress * NUM
          const targetIndex = Math.min(Math.floor(raw), NUM - 1)

          if (targetIndex !== lastTargetIndex && !isAnimatingRef.current) {
            const dir = targetIndex > lastTargetIndex ? 'down' : 'up'
            lastTargetIndex = targetIndex
            if (dir === 'down') handleScrollDown()
            else handleScrollUp()
          }
        },
      })

      return () => {
        splits.forEach((s) => s.revert())
        while (slider.firstChild) slider.removeChild(slider.firstChild)
      }
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="services" className="services-section">
      <span className="services-label">Onze diensten</span>
      <div className="slider-wrap">
        <div ref={sliderRef} className="slider-inner" />
      </div>
    </section>
  )
}
