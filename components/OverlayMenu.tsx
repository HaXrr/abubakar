'use client'

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '#services' },
  { label: 'Add-ons', href: '#about' },
  { label: 'Try Me', href: '#contact' },
]

const secondaryLinks = [
  { label: 'Planing', href: '#' },
  { label: 'Development & Testing', href: '#' },
  { label: 'Ship', href: '#' },
  { label: 'Maintain', href: '#' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hazrr' },
  { label: 'Instagram', href: 'https://www.instagram.com/hazratabubakar/' },
  { label: 'Facebook', href: 'https://www.facebook.com/hazratabubakar/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@hazratabubakar' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@hazratabubakar' },
  { label: 'X / Twitter', href: '#' },
  { label: 'Github', href: 'https://github.com/HaXrr' },
]

const legalLinks = [
  { label: 'Cookiebeleid', href: '#' },
  { label: 'Disclaimer', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'contact', href: '#contact' },
]

export default function OverlayMenu() {
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const togglerRef = useRef<Element | null>(null)
  const omContentRef = useRef<HTMLDivElement | null>(null)
  const selectorRef = useRef<ReturnType<typeof gsap.utils.selector> | null>(null)
  const isOpenRef = useRef(false)
  const isAnimatingRef = useRef(false)
  const isMounted = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    if (!isOpenRef.current || isAnimatingRef.current || !tlRef.current) return
    isAnimatingRef.current = true
    togglerRef.current?.classList.remove('om-toggler--open')
    tlRef.current.reverse()
    isOpenRef.current = false
  }, [pathname])

  useGSAP(
    () => {
      const split = new SplitText('.om-items a', {
        type: 'lines',
        mask: 'lines',
        linesClass: 'om-line',
      })

      togglerRef.current = rootRef.current!.querySelector('.om-toggler')
      omContentRef.current = rootRef.current!.querySelector<HTMLDivElement>('.om-content')
      selectorRef.current = gsap.utils.selector(rootRef)

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          isAnimatingRef.current = false
        },
        onReverseComplete: () => {
          gsap.set('.om-line', { y: '100%' })
          omContentRef.current!.classList.remove('om-content--open')
          isAnimatingRef.current = false
        },
      })

      tl.to('.om-bg', { scaleY: 1, duration: 0.75, stagger: 0.1, ease: 'power3.inOut' })
      tl.to(
        '.om-items',
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.75,
          ease: 'power3.inOut',
        },
        '-=0.6',
      )

      tlRef.current = tl

      return () => {
        split.revert()
      }
    },
    { scope: rootRef },
  )

  const animateLinksIn = useCallback(() => {
    const q = selectorRef.current!
    gsap.fromTo(
      q('.om-socials .om-line, .om-legal .om-line'),
      { y: '100%' },
      { y: '0%', duration: 0.75, stagger: 0.05, ease: 'power3.out', delay: 0.85 },
    )
    gsap.fromTo(
      q('.om-primary-links .om-line'),
      { y: '100%' },
      { y: '0%', duration: 0.75, stagger: 0.05, ease: 'power3.out', delay: 0.85 },
    )
    gsap.fromTo(
      q('.om-secondary-links .om-line'),
      { y: '100%' },
      { y: '0%', duration: 0.75, stagger: 0.05, ease: 'power3.out', delay: 0.85 },
    )
  }, [])

  const handleToggle = useCallback(() => {
    if (isAnimatingRef.current || !tlRef.current) return
    isAnimatingRef.current = true
    togglerRef.current?.classList.toggle('om-toggler--open')
    if (!isOpenRef.current) {
      omContentRef.current?.classList.add('om-content--open')
      tlRef.current.play()
      animateLinksIn()
    } else {
      tlRef.current.reverse()
    }
    isOpenRef.current = !isOpenRef.current
  }, [animateLinksIn])

  return (
    <div ref={rootRef}>
      <button className="om-toggler" onClick={handleToggle} aria-label="Menu openen">
        <span />
        <span />
      </button>

      <div className="om-content" role="dialog" aria-modal="true" aria-label="Navigatie">
        <div className="om-bg" />
        <div className="om-bg" />
        <div className="om-bg" />
        <div className="om-bg" />

        <div className="om-items">
          <div className="om-items-col">
            <div className="om-socials">
              {socialLinks.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="om-legal">
              {legalLinks.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="om-items-col">
            <div className="om-primary-links">
              {primaryLinks.map((l) =>
                l.href.startsWith('/') ? (
                  <Link key={l.label} href={l.href}>
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ),
              )}
            </div>
            <div className="om-secondary-links">
              {secondaryLinks.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
