import { prisma } from '@/lib/prisma'
import type { MockProject } from '@/lib/mock-data'
import { getCurrentDbUser, fullName } from './users'

const STATUS_MAP = {
  ACTIVE: 'en_cours',
  PAUSED: 'en_pause',
  COMPLETED: 'termine',
  ARCHIVED: 'archive',
} as const

const STATUS_LABEL = {
  ACTIVE: 'En cours',
  PAUSED: 'En pause',
  COMPLETED: 'Terminé',
  ARCHIVED: 'Archivé',
} as const

export function formatBudget(budget: number | null): string {
  if (budget == null) return '—'
  if (budget >= 1_000_000) return `${(budget / 1_000_000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M€`
  if (budget >= 1_000) return `${(budget / 1_000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k€`
  return `${budget.toLocaleString('fr-FR')} €`
}

function formatDate(d: Date | null): string {
  return d ? d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
}

type DbProject = Awaited<ReturnType<typeof queryProjects>>[number]

function queryProjects(userId: string) {
  return prisma.project.findMany({
    where: { members: { some: { userId } } },
    include: {
      members: { include: { user: true } },
      _count: { select: { documents: true, missions: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })
}

export function toUiProject(p: DbProject): MockProject {
  return {
    id: p.id,
    name: p.name,
    type: 'Construction',
    phase: p.phase,
    status: STATUS_MAP[p.status],
    statusLabel: STATUS_LABEL[p.status],
    surface: p.surface ?? 0,
    budget: formatBudget(p.budget),
    progress: p.progress,
    startDate: formatDate(p.startDate),
    endDate: formatDate(p.endDate),
    location: p.location ?? '—',
    reference: p.id.slice(-8).toUpperCase(),
    description: p.description ?? '',
    image: '',
    members: p.members.map((m) => fullName(m.user)),
    bimEnabled: false,
    apdStage: p.phase,
  }
}

/** Projets de l'utilisateur connecté, au format UI. */
export async function getUserProjects(): Promise<MockProject[]> {
  const user = await getCurrentDbUser()
  if (!user) return []
  const rows = await queryProjects(user.id)
  return rows.map(toUiProject)
}

/** Un projet par id (si l'utilisateur en est membre), avec données brutes + format UI. */
export async function getProject(id: string) {
  const user = await getCurrentDbUser()
  if (!user) return null
  const p = await prisma.project.findFirst({
    where: { id, members: { some: { userId: user.id } } },
    include: {
      members: { include: { user: true } },
      _count: { select: { documents: true, missions: true } },
    },
  })
  return p ? { db: p, ui: toUiProject(p) } : null
}
