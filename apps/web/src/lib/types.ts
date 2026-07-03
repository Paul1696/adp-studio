// ─────────────────────────────────────────────────────────────
// ADP Studio — Types centralisés
// ─────────────────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════
// MISSION IA
// ══════════════════════════════════════════════════════════════

export type MissionStatus = 'draft' | 'running' | 'completed' | 'failed'
export type MissionStepStatus = 'pending' | 'running' | 'done' | 'error'

export interface MissionStep {
  id: string
  agentId: string
  agentName: string
  title: string
  description: string
  status: MissionStepStatus
  output?: string
  durationSeconds?: number
  startedAt?: string
  completedAt?: string
}

export interface Mission {
  id: string
  projectId: string
  projectName: string
  title: string
  objective: string
  agentIds: string[]
  steps: MissionStep[]
  status: MissionStatus
  createdAt: string
  completedAt?: string
  createdBy: string
  summary?: string
}

// ══════════════════════════════════════════════════════════════
// CONVERSATIONS IA
// ══════════════════════════════════════════════════════════════

export type MessageRole = 'user' | 'agent' | 'system'

export interface Message {
  id: string
  role: MessageRole
  content: string
  agentId?: string
  agentName?: string
  timestamp: string
}

export interface Conversation {
  id: string
  projectId: string
  projectName: string
  missionId?: string
  agentId: string
  agentName: string
  title: string
  summary: string
  messages: Message[]
  createdAt: string
  updatedAt: string
  messageCount: number
}

// ══════════════════════════════════════════════════════════════
// TÂCHES
// ══════════════════════════════════════════════════════════════

export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'blocked'
export type TaskPriority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  projectId: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId?: string
  dueDate?: string
  completedAt?: string
  tags: string[]
}

// ══════════════════════════════════════════════════════════════
// PLANNING
// ══════════════════════════════════════════════════════════════

export type PhaseStatus = 'done' | 'current' | 'upcoming'

export interface PlanningMilestone {
  id: string
  label: string
  date: string
  done: boolean
}

export interface PlanningPhase {
  id: string
  projectId: string
  label: string
  code: string
  startDate: string
  endDate: string
  progress: number
  status: PhaseStatus
  color: string
  milestones: PlanningMilestone[]
}

// ══════════════════════════════════════════════════════════════
// BUDGET
// ══════════════════════════════════════════════════════════════

export type BudgetLineStatus = 'ok' | 'alert' | 'overrun'

export interface BudgetLine {
  id: string
  lot: string
  label: string
  prevue: number
  engagee: number
  realisee: number
  status: BudgetLineStatus
}

export interface Budget {
  id: string
  projectId: string
  currency: string
  total: number
  engaged: number
  spent: number
  lines: BudgetLine[]
  updatedAt: string
}

// ══════════════════════════════════════════════════════════════
// RAPPORTS
// ══════════════════════════════════════════════════════════════

export type ReportType = 'phase' | 'compte_rendu' | 'note_technique' | 'mission_ia' | 'budget'
export type ReportStatus = 'draft' | 'final' | 'shared'

export interface Report {
  id: string
  projectId: string
  projectName: string
  type: ReportType
  typeLabel: string
  title: string
  author: string
  status: ReportStatus
  statusLabel: string
  pages: number
  size: string
  createdAt: string
  missionId?: string
}

// ══════════════════════════════════════════════════════════════
// ÉQUIPE
// ══════════════════════════════════════════════════════════════

export type MemberStatus = 'active' | 'away' | 'offline'

export interface TeamMember {
  id: string
  userId: string
  projectId: string
  fullName: string
  initials: string
  email: string
  role: 'owner' | 'admin' | 'editor' | 'viewer'
  profession: string
  avatarColor: string
  status: MemberStatus
  joinedAt: string
  lastActive: string
  tasksCount: number
  documentsCount: number
}
