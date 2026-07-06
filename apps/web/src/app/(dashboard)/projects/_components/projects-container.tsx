'use client'

import { useState } from 'react'
import { Loader2, Plus } from 'lucide-react'
import { useProjects } from '@/hooks/use-projects'
import { PageHeader } from '@/components/ui/page-header'
import { ProjectsClient } from './projects-client'
import { NewProjectModal } from './new-project-modal'

export function ProjectsContainer() {
  const { data: projects, isLoading, error } = useProjects()
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)

  return (
    <>
      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <PageHeader
        title="Projets"
        description="Gérez et suivez l'ensemble de vos projets en un endroit."
        action={
          <button
            onClick={openModal}
            className="flex items-center gap-2 rounded-xl bg-adp-blue px-4 py-2 text-[14px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-md"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Nouveau projet
          </button>
        }
      />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-adp-blue" />
        </div>
      ) : error ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-red-200 bg-red-50">
          <p className="text-sm text-red-600">Impossible de charger les projets.</p>
        </div>
      ) : (
        <ProjectsClient projects={projects ?? []} onNewProject={openModal} />
      )}
    </>
  )
}
