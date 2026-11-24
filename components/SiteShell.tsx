import SmoothScroll from '@/components/SmoothScroll'
import OverlayMenu from '@/components/OverlayMenu'
import SiteShellClient from '@/components/SiteShellClient'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <OverlayMenu />
      <SiteShellClient>{children}</SiteShellClient>
    </>
  )
}
