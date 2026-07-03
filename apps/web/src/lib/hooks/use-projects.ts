'use client'
import { useQuery } from '@tanstack/react-query'
import { projectService } from '@/lib/services/mock'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const result = await projectService.getAll()
      if (result.error) throw new Error(result.error)
      return result.data
    },
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const result = await projectService.getById(id)
      if (result.error) throw new Error(result.error)
      return result.data
    },
    enabled: !!id,
  })
}
