'use client'
import { useQuery } from '@tanstack/react-query'
import { documentService } from '@/lib/services/mock'

export function useDocuments() {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const result = await documentService.getAll()
      if (result.error) throw new Error(result.error)
      return result.data
    },
  })
}

export function useDocumentsByProject(projectId: string) {
  return useQuery({
    queryKey: ['documents', 'project', projectId],
    queryFn: async () => {
      const result = await documentService.getByProject(projectId)
      if (result.error) throw new Error(result.error)
      return result.data
    },
    enabled: !!projectId,
  })
}
