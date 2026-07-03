import type { ID } from '@adp-studio/types'

export type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'

export type WorkflowTrigger = 'manual' | 'scheduled' | 'webhook' | 'event'

export interface WorkflowDefinition {
  id: ID
  name: string
  description: string
  trigger: WorkflowTrigger
  steps: WorkflowStep[]
  variables: Record<string, unknown>
}

export interface WorkflowStep {
  id: ID
  name: string
  type: 'agent' | 'condition' | 'action' | 'delay'
  agentId?: ID
  config: Record<string, unknown>
  onSuccess?: ID
  onFailure?: ID
}

export interface WorkflowRun {
  id: ID
  workflowId: ID
  status: WorkflowStatus
  startedAt: string
  completedAt?: string
  triggeredBy: ID
  logs: WorkflowLog[]
  output?: unknown
}

export interface WorkflowLog {
  timestamp: string
  stepId: ID
  level: 'info' | 'warn' | 'error'
  message: string
}
