import { notFound } from 'next/navigation'
import { projects, getProject, getProjectDetail, getRelatedProjects } from '@/data/projects'
import ProjectDetailClient from '@/components/ProjectDetailClient'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.client} — 360Fabriek`,
    description: `${project.title} voor ${project.client}.`,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  const detail = getProjectDetail(slug)

  if (!project || !detail) {
    notFound()
  }

  const related = getRelatedProjects(slug, 3)

  return <ProjectDetailClient project={project} detail={detail} related={related} />
}
