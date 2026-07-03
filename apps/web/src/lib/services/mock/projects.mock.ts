import { MOCK_PROJECTS } from '../../mock-data'
import { ok, err } from '../base'
import type { IProjectService } from '../base'

export const projectService: IProjectService = {
  async getAll() {
    return ok(MOCK_PROJECTS)
  },
  async getById(id: string) {
    const project = MOCK_PROJECTS.find((p) => p.id === id)
    if (!project) return err(`Projet introuvable : ${id}`)
    return ok(project)
  },
}
