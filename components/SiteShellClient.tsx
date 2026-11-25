'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'

export default function SiteShellClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <>
      {pathname !== '/' && <Navbar />}
      <PageTransition pathname={pathname}>{children}</PageTransition>
    </>
  )
}
