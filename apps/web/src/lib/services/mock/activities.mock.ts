import { MOCK_ACTIVITIES } from '../../mock-data'
import { ok } from '../base'
import type { IActivityService } from '../base'

export const activityService: IActivityService = {
  async getAll() {
    return ok(MOCK_ACTIVITIES)
  },
  async getByProject(projectId: string) {
    return ok(MOCK_ACTIVITIES.filter((a) => a.projectId === projectId))
  },
}
