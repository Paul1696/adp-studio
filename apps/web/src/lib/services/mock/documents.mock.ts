import { MOCK_DOCUMENTS } from '../../mock-data'
import { ok } from '../base'
import type { IDocumentService } from '../base'

export const documentService: IDocumentService = {
  async getAll() {
    return ok(MOCK_DOCUMENTS)
  },
  async getByProject(projectId: string) {
    return ok(MOCK_DOCUMENTS.filter((d) => d.projectId === projectId))
  },
}
