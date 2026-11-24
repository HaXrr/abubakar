'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { name: 'Prototype A — Mobility', image: '/images/portfolio/project-1.jpg' },
  { name: 'Product Launch — Branding', image: '/images/portfolio/project-2.jpg' },
  { name: 'Industrial Series', image: '/images/portfolio/project-3.jpg' },
  { name: 'Custom Fabrication', image: '/images/portfolio/project-4.jpg' },
  { name: '360° Campaign', image: '/images/portfolio/project-5.jpg' },
]

export default function PortfolioIndex() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const projectIndex = section.querySelector<HTMLElement>('.project-index h1')
    const projectImgsContainer = section.querySelector<HTMLElement>('.project-images')
    const projectImgs = section.querySelectorAll<HTMLElement>('.project-img')
    const projectNamesContainer = section.querySelector<HTMLElement>('.project-names')
    const projectNames = section.querySelectorAll<HTMLElement>('.project-names p')
    const totalCount = projectNames.length

    if (!projectIndex || !projectImgsContainer || !projectNamesContainer) return

    const sectionHeight = section.offsetHeight
    const sectionPadding = parseFloat(getComputedStyle(section).padding || '0')
    const indexHeight = projectIndex.offsetHeight
    const containerHeight = projectNamesContainer.offsetHeight
    const imagesHeight = projectImgsContainer.offsetHeight

    const moveDistanceIndex = sectionHeight - sectionPadding * 2 - indexHeight
    const moveDistanceNames = sectionHeight - sectionPadding * 2 - containerHeight
    const moveDistanceImages = window.innerHeight - imagesHeight
    const imgThreshold = window.innerHeight / 2

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const currentNum = Math.min(Math.floor(progress * totalCount) + 1, totalCount)

        projectIndex.textContent = `${String(currentNum).padStart(2, '0')}/${String(totalCount).padStart(2, '0')}`
        gsap.set(projectIndex, { y: progress * moveDistanceIndex })
        gsap.set(projectImgsContainer, { y: progress * moveDistanceImages })

        projectImgs.forEach((img) => {
          const rect = img.getBoundingClientRect()
          gsap.set(img, {
            opacity: rect.top <= imgThreshold && rect.bottom >= imgThreshold ? 1 : 0.5,
          })
        })

        projectNames.forEach((p, index) => {
          const start = index / totalCount
          const end = (index + 1) / totalCount
          const projectProgress = Math.max(0, Math.min(1, (progress - start) / (end - start)))

          gsap.set(p, { y: -projectProgress * moveDistanceNames })
          gsap.set(p, { color: projectProgress > 0 && projectProgress < 1 ? '#f0ece4' : '#4a4a4a' })
        })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="portfolio-section">
      <div className="project-index">
        <h1>01/{String(projects.length).padStart(2, '0')}</h1>
      </div>

      <div className="project-images">
        {projects.map((project, i) => (
          <div key={i} className="project-img">
            <img src={project.image} alt={project.name} />
          </div>
        ))}
      </div>

      <div className="project-names">
        {projects.map((project, i) => (
          <p key={i}>{project.name}</p>
        ))}
      </div>
    </section>
  )
}
