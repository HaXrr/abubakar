import { projectDetails, type ProjectDetail } from './project-details.generated'

export type Category =
  | 'all'
  | 'Web Applications'
  | 'Full-Stack Development'
  | 'Interactive Experiences'
  | 'UI/UX & Animation'

export interface Project {
  id: string
  title: string
  client: string
  category: Exclude<Category, 'all'>
  tags: string[]
  thumbnail: string
  href: string
  featured: boolean
}


export const CATEGORIES: Category[] = [
  'all',
  'Web Applications',
  'Full-Stack Development',
  'Interactive Experiences',
  'UI/UX & Animation',
]

export const projects: Project[] = [
  {
    id: 'showroom-management',
    title: 'Showroom Management System',
    client: 'Fayaz & Bilal',
    category: 'Web Applications',
    tags: ['nextjs', 'mongodb', 'management-system', 'full-stack'],
    thumbnail: '/images/projects/showroom-management.avif',
    href: '/projects/showroom-management',
    featured: true,
  },
  {
    id: 'isp-management',
    title: 'Internet Service Provider Platform',
    client: 'AYK Company',
    category: 'Full-Stack Development',
    tags: ['web-app', 'backend', 'database', 'automation'],
    thumbnail: '/images/projects/isp-management.avif',
    href: '/projects/isp-management',
    featured: true,
  },
  {
    id: 'multiplayer-maze',
    title: 'Multiplayer Maze Game',
    client: 'Personal Project',
    category: 'Interactive Experiences',
    tags: ['nextjs', 'multiplayer', 'real-time', 'game-development'],
    thumbnail: '/images/projects/multiplayer-maze.avif',
    href: '/projects/multiplayer-maze',
    featured: true,
  },
  {
    id: 'developer-portfolio',
    title: 'Interactive Developer Portfolio',
    client: 'Personal Project',
    category: 'UI/UX & Animation',
    tags: ['nextjs', 'gsap', 'animation', 'responsive-design'],
    thumbnail: '/images/projects/developer-portfolio.avif',
    href: '/projects/developer-portfolio',
    featured: true,
  },
]


export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug)
}

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug]
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug)
  if (!current) return []
  const sameCategory = projects.filter((p) => p.id !== slug && p.category === current.category)
  const others = projects.filter((p) => p.id !== slug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, limit)
}

export type { ProjectDetail }
