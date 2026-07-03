'use client'
import { useQuery } from '@tanstack/react-query'
import { missionService } from '@/lib/services/mock'

export function useMissions() {
  return useQuery({
    queryKey: ['missions'],
    queryFn: async () => {
      const result = await missionService.getAll()
      if (result.error) throw new Error(result.error)
      return result.data
    },
  })
}

export function useMission(id: string) {
  return useQuery({
    queryKey: ['missions', id],
    queryFn: async () => {
      const result = await missionService.getById(id)
      if (result.error) throw new Error(result.error)
      return result.data
    },
    enabled: !!id,
  })
}

export function useMissionsByProject(projectId: string) {
  return useQuery({
    queryKey: ['missions', 'project', projectId],
    queryFn: async () => {
      const result = await missionService.getByProject(projectId)
      if (result.error) throw new Error(result.error)
      return result.data
    },
    enabled: !!projectId,
  })
}
