'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { MockProject } from '@/lib/mock-data'

type ApiProject = {
  id: string
  name: string
  description: string | null
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED'
  phase: string
  progress: number
  budget: number | null
  location: string | null
  surface: number | null
  startDate: string | null
  endDate: string | null
  members: { user: { id: string; firstName: string | null; lastName: string | null } }[]
  _count: { documents: number; missions: number }
}

const STATUS_MAP: Record<ApiProject['status'], MockProject['status']> = {
  ACTIVE:   'en_cours',
  PAUSED:   'en_pause',
  COMPLETED:'termine',
  ARCHIVED: 'archive',
}
const STATUS_LABEL: Record<ApiProject['status'], string> = {
  ACTIVE:   'En cours',
  PAUSED:   'En pause',
  COMPLETED:'Terminé',
  ARCHIVED: 'Archivé',
}

function toMockProject(p: ApiProject): MockProject {
  return {
    id:          p.id,
    name:        p.name,
    type:        'Construction',
    phase:       p.phase,
    status:      STATUS_MAP[p.status],
    statusLabel: STATUS_LABEL[p.status],
    surface:     p.surface ?? 0,
    budget:      p.budget ? `${(p.budget / 1_000_000).toFixed(1)} M€` : '—',
    progress:    p.progress,
    startDate:   p.startDate ? new Date(p.startDate).toLocaleDateString('fr-FR') : '—',
    endDate:     p.endDate   ? new Date(p.endDate).toLocaleDateString('fr-FR')   : '—',
    location:    p.location ?? '—',
    reference:   p.id.slice(0, 8).toUpperCase(),
    description: p.description ?? '',
    image:       '',
    members:     p.members.map((m) => `${m.user.firstName ?? ''} ${m.user.lastName ?? ''}`.trim()),
    bimEnabled:  false,
    apdStage:    p.phase,
  }
}

async function fetchProjects(): Promise<MockProject[]> {
  const res = await fetch('/api/projects')
  if (!res.ok) throw new Error('Erreur chargement projets')
  const { projects } = await res.json()
  return (projects as ApiProject[]).map(toMockProject)
}

export function useProjects() {
  return useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
}

export function useCreateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: Partial<MockProject> & { name: string }) => {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Erreur création projet')
      return res.json()
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  })
}
