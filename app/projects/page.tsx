import Footer from '@/components/Footer'
import MosaicFlipFeatured from '@/components/MosaicFlipFeatured'
import ProjectsClient from '@/components/ProjectsClient'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  return (
    <>
      <main className="pp-main">
        <header className="pp-hero">
          <p className="pp-eyebrow">Cases &amp; Demo&apos;s</p>
          <h1 className="pp-heading">Projects Did</h1>
          <p className="pp-sub">
            {projects.length} project build, deployed and maintained.
          </p>
        </header>

        <MosaicFlipFeatured />

        <ProjectsClient projects={projects} />
      </main>

      <Footer />
    </>
  )
}
