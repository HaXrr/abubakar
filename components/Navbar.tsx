'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

export default function Navbar() {
  const logoRef = useRef<HTMLAnchorElement>(null)

  useGSAP(() => {
    gsap.set(logoRef.current, { clipPath: 'inset(0% 0% 0% 0%)' })

    let lastDir = 0

    ScrollTrigger.create({
      start: '80px top',
      end: 'max',
      onUpdate(self) {
        if (self.direction === lastDir) return
        lastDir = self.direction
        if (self.direction === 1) {
          gsap.to(logoRef.current, {
            clipPath: 'inset(105% 0% 0% 0%)',
            duration: 0.35,
            ease: 'power3.out',
          })
        } else {
          gsap.to(logoRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.55,
            ease: 'power3.in',
          })
        }
      },
    })
  }, [])

  return (
    <nav className="site-nav">
      <div className="nav-logo">
        <Link ref={logoRef} href="/" className="bg-black -mt-4! p-2!">
          <span className="font-bold! text-lg">Hazrat Abu Bakar</span>
          <br />
          <span className="font-thin!">Full Stack Engineer</span>
        </Link>
      </div>
      <div className="nav-items">
        <Link href="/#services">Services</Link>
        <Link href="/#portfolio">Work</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </nav>
  )
}
