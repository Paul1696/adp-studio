import { prisma } from '@/lib/prisma'
import type { MockActivity } from '@/lib/mock-data'
import { getCurrentDbUser, fullName } from './users'

const TYPE_MAP: Record<string, MockActivity['type']> = {
  DOCUMENT_UPLOAD: 'upload',
  MISSION_LAUNCH: 'agent',
  MISSION_COMPLETE: 'agent',
  MEMBER_ADD: 'member',
  PROJECT_UPDATE: 'validation',
  COMMENT: 'comment',
}

const ACTIVITY_INCLUDE = {
  project: { select: { id: true, name: true } },
  user: true,
} as const

type DbActivity = Awaited<ReturnType<typeof prisma.activity.findMany<{ include: typeof ACTIVITY_INCLUDE }>>>[number]

export function toUiActivity(a: DbActivity): MockActivity {
  return {
    id: a.id,
    type: TYPE_MAP[a.type] ?? 'comment',
    label: a.label,
    detail: a.detail ?? '',
    projectId: a.project?.id ?? '',
    projectName: a.project?.name ?? 'Sans projet',
    userId: a.user?.id ?? '',
    userName: a.user ? fullName(a.user) : '—',
    date: a.createdAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: a.createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    priority: 'normale',
    status: 'termine',
  }
}

/** Activités visibles par l'utilisateur connecté. */
export async function getUserActivities(limit = 50): Promise<MockActivity[]> {
  const user = await getCurrentDbUser()
  if (!user) return []
  const rows = await prisma.activity.findMany({
    where: {
      OR: [{ userId: user.id }, { project: { members: { some: { userId: user.id } } } }],
    },
    include: ACTIVITY_INCLUDE,
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
  return rows.map(toUiActivity)
}

/** Activités d'un projet. */
export async function getProjectActivities(projectId: string): Promise<MockActivity[]> {
  const rows = await prisma.activity.findMany({
    where: { projectId },
    include: ACTIVITY_INCLUDE,
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toUiActivity)
}
