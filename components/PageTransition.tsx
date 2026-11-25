'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

export default function PageTransition({
  children,
  pathname,
}: {
  children: React.ReactNode
  pathname: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const wipeRef = useRef<HTMLDivElement>(null)
  const didMountRef = useRef(false)

  useGSAP(
    () => {
      if (!didMountRef.current) {
        didMountRef.current = true
        return
      }

      const wipe = wipeRef.current
      if (!wipe) return

      gsap.killTweensOf(wipe)
      gsap.set(wipe, { scaleY: 1, transformOrigin: 'bottom' })

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(wipe, { scaleY: 0 })
        return
      }

      gsap.to(wipe, {
        scaleY: 0,
        duration: 1,
        ease: 'power3.inOut',
      })
    },
    { scope: rootRef, dependencies: [pathname] },
  )

  return (
    <div ref={rootRef}>
      {children}
      <div ref={wipeRef} className="pt-wipe" aria-hidden="true" />
    </div>
  )
}
