import { MOCK_MISSIONS } from '../../mock-data'
import { ok, err } from '../base'
import type { IMissionService } from '../base'

export const missionService: IMissionService = {
  async getAll() {
    return ok(MOCK_MISSIONS)
  },
  async getById(id: string) {
    const mission = MOCK_MISSIONS.find((m) => m.id === id)
    if (!mission) return err(`Mission introuvable : ${id}`)
    return ok(mission)
  },
  async getByProject(projectId: string) {
    return ok(MOCK_MISSIONS.filter((m) => m.projectId === projectId))
  },
}
