import { prisma } from '@/lib/prisma'
import type { Mission } from '@/lib/types'
import { getCurrentDbUser } from './users'

const STATUS_MAP = {
  PENDING: 'draft',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'failed',
} as const

function formatDateTime(d: Date | null): string {
  if (!d) return '—'
  return `${d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })} à ${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
}

const MISSION_INCLUDE = {
  project: { select: { id: true, name: true } },
  agents: { include: { agent: { select: { id: true, name: true } } } },
} as const

type DbMission = Awaited<ReturnType<typeof prisma.mission.findMany<{ include: typeof MISSION_INCLUDE }>>>[number]

export function toUiMission(m: DbMission): Mission {
  return {
    id: m.id,
    projectId: m.project?.id ?? '',
    projectName: m.project?.name ?? 'Sans projet',
    title: m.objectif.length > 80 ? `${m.objectif.slice(0, 80)}…` : m.objectif,
    objective: m.objectif,
    agentIds: m.agents.map((a) => a.agent.id),
    steps: [],
    status: STATUS_MAP[m.status],
    createdAt: formatDateTime(m.createdAt),
    completedAt: m.endedAt ? formatDateTime(m.endedAt) : undefined,
    createdBy: m.userId ?? '',
  }
}

/** Missions de l'utilisateur connecté (tous projets confondus). */
export async function getUserMissions(): Promise<Mission[]> {
  const user = await getCurrentDbUser()
  if (!user) return []
  const rows = await prisma.mission.findMany({
    where: { OR: [{ userId: user.id }, { project: { members: { some: { userId: user.id } } } }] },
    include: MISSION_INCLUDE,
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toUiMission)
}

/** Une mission par id. */
export async function getMission(id: string): Promise<Mission | null> {
  const m = await prisma.mission.findUnique({ where: { id }, include: MISSION_INCLUDE })
  return m ? toUiMission(m) : null
}

/** Missions impliquant un agent donné. */
export async function getAgentMissions(agentId: string): Promise<Mission[]> {
  const rows = await prisma.mission.findMany({
    where: { agents: { some: { agentId } } },
    include: MISSION_INCLUDE,
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toUiMission)
}

/** Missions d'un projet. */
export async function getProjectMissions(projectId: string): Promise<Mission[]> {
  const rows = await prisma.mission.findMany({
    where: { projectId },
    include: MISSION_INCLUDE,
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toUiMission)
}
