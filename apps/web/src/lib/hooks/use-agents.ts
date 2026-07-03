'use client'
import { useQuery } from '@tanstack/react-query'
import { agentService } from '@/lib/services/mock'

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const result = await agentService.getAll()
      if (result.error) throw new Error(result.error)
      return result.data
    },
  })
}

export function useAgent(id: string) {
  return useQuery({
    queryKey: ['agents', id],
    queryFn: async () => {
      const result = await agentService.getById(id)
      if (result.error) throw new Error(result.error)
      return result.data
    },
    enabled: !!id,
  })
}
