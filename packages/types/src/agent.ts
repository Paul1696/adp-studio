import type { BaseEntity, ID, Status } from './common'

export type AgentSpecialty =
  | 'bim_analyst'
  | 'code_compliance'
  | 'cost_estimator'
  | 'document_analyzer'
  | 'project_coordinator'
  | 'revit_expert'
  | 'report_generator'
  | 'general'

export type AgentModel =
  | 'claude-sonnet-4-6'
  | 'claude-opus-4-8'
  | 'claude-haiku-4-5-20251001'

export interface Agent extends BaseEntity {
  name: string
  description: string
  specialty: AgentSpecialty
  model: AgentModel
  status: Status
  systemPrompt: string
  tools: AgentTool[]
  ownerId: ID
  organizationId?: ID
  usageCount: number
  lastUsedAt?: string
}

export interface AgentTool {
  name: string
  description: string
  enabled: boolean
}

export interface AgentSession extends BaseEntity {
  agentId: ID
  userId: ID
  projectId?: ID
  messages: AgentMessage[]
  status: 'active' | 'completed' | 'error'
}

export interface AgentMessage {
  id: ID
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  tokensUsed?: number
}
