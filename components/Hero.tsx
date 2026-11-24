'use client'

import { useRef } from 'react'
import { gsap, SplitText, CustomEase, useGSAP } from '@/lib/gsap'
import Navbar from '@/components/Navbar'

const introImages = [
  'https://360fabriek.nl/assets/Brandweer_VR_Banner-C53oJvrA.avif',
  'https://360fabriek.nl/assets/vtwonen_thumb-cRpJPe-l.avif',
  '/images/hero/abu-bakar-2.jpg',
  'https://360fabriek.nl/assets/CA-thumbnail-COpyOzgi.avif',
  'https://360fabriek.nl/assets/I-KOOK-thumbnail-B-t_VUHh.avif',
]

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!CustomEase.get('hop')) CustomEase.create('hop', '0.9, 0, 0.1, 1')
      if (!CustomEase.get('glide')) CustomEase.create('glide', '0.8, 0, 0.2, 1')

      const splits: SplitText[] = []

      document.fonts.ready.then(() => {
        const introImagesEls = gsap.utils.toArray<HTMLElement>('.intro-img')
        const introImgScale = 0.2
        const introImgGap = 40
        const introImgRotations = [-15, 5, -7.5, 10, -2.5]

        const introImgScaledWidth = window.innerWidth * introImgScale
        const introImgRowWidth = introImgScaledWidth * 5 + introImgGap * 4
        const introImgCenteredX = (window.innerWidth - introImgRowWidth) / 2
        const introImgOffScreenX = introImgCenteredX - window.innerWidth * 1.3

        introImagesEls.forEach((img, i) => {
          const centeredX =
            introImgCenteredX +
            i * (introImgScaledWidth + introImgGap) +
            introImgScaledWidth / 2 -
            window.innerWidth / 2

          const offScreenX =
            introImgOffScreenX +
            i * (introImgScaledWidth + introImgGap) +
            introImgScaledWidth / 2 -
            window.innerWidth / 2

          gsap.set(img, {
            scale: introImgScale,
            x: offScreenX,
            rotation: introImgRotations[i],
            borderRadius: '2.5rem',
          })

          img.dataset.centeredX = String(centeredX)
        })

        const split = new SplitText(
          '.site-nav a, .hero-header h1, .hero-social p, .hero-social a',
          {
            type: 'lines',
            linesClass: 'line',
            mask: 'lines',
            autoSplit: true,
          },
        )
        splits.push(split)

        gsap.set('.line', { y: '125%' })

        const tl = gsap.timeline({ delay: 1 })

        tl.to('.preloader', {
          scaleX: 1,
          duration: 1.5,
          ease: 'glide',
          onComplete: () => gsap.set('.preloader', { transformOrigin: 'right' }),
        })

        tl.to('.preloader', { scaleX: 0, duration: 1.25, ease: 'hop' })

        tl.to(
          '.preloader-overlay',
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 1,
            ease: 'hop',
          },
          '<0.75',
        )

        introImagesEls.forEach((img) => {
          tl.to(
            img,
            {
              x: parseFloat(img.dataset.centeredX!),
              duration: 1.5,
              ease: 'glide',
            },
            '<0.025',
          )
        })

        tl.to(
          '.intro-img:nth-child(1), .intro-img:nth-child(2)',
          { x: '-100vw', duration: 1.5, ease: 'glide' },
          'spread',
        )
        tl.to(
          '.intro-img:nth-child(4), .intro-img:nth-child(5)',
          { x: '100vw', duration: 1.5, ease: 'glide' },
          'spread',
        )
        tl.to(
          '.hero-img',
          {
            scale: 1,
            x: 0,
            rotation: 0,
            borderRadius: 0,
            duration: 1.5,
            ease: 'glide',
          },
          '<',
        )

        tl.to(
          '.site-nav .line',
          { y: '0%', duration: 1, stagger: 0.1, ease: 'power3.out' },
          'spread+=1.75',
        )
        tl.to(
          '.hero-header .line',
          { y: '0%', duration: 1, stagger: 0.1, ease: 'power3.out' },
          '<',
        )
        tl.to(
          '.hero-social .line',
          { y: '0%', duration: 1, stagger: 0.1, ease: 'power3.out' },
          '<0.25',
        )
      })

      return () => {
        splits.forEach((s) => s.revert())
      }
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef}>
      <div className="preloader-overlay">
        <div className="preloader" />
      </div>

      <Navbar />

      <section className="hero-section">
        {introImages.map((src, i) => (
          <div key={i} className={`intro-img${i === 2 ? ' hero-img' : ''}`}>
            <img src={src} alt="" />
          </div>
        ))}

        <div className="hero-content">
          <div className="hero-header">
            <h1>
              Hazrat Abu Bakar.
            </h1>
          </div>

          <div className="hero-social">
            <p>Contact me</p>
            <a href="mailto:hazratabubakar91@gmail.com">hazratabubakar91@</a>
            <a href="#contact">Contact →</a>
          </div>
        </div>
      </section>
    </div>
  )
}
