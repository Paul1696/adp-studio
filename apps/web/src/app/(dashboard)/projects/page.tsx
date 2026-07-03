import type { Metadata } from 'next'
import { ProjectsContainer } from './_components/projects-container'

export const metadata: Metadata = { title: 'Projets' }

export default function ProjectsPage() {
  return (
    <div className="space-y-5">
      <ProjectsContainer />
    </div>
  )
}
