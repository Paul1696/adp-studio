import { MOCK_AGENTS } from '../../mock-data'
import { ok, err } from '../base'
import type { IAgentService } from '../base'

export const agentService: IAgentService = {
  async getAll() {
    return ok(MOCK_AGENTS)
  },
  async getById(id: string) {
    const agent = MOCK_AGENTS.find((a) => a.id === id)
    if (!agent) return err(`Agent introuvable : ${id}`)
    return ok(agent)
  },
}
