import { prisma } from '@/lib/prisma'
import type { TeamMember } from '@/lib/types'
import { fullName, initials } from './users'

const AVATAR_COLORS = ['bg-adp-blue', 'bg-violet-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-rose-500']

function roleKey(role: string): TeamMember['role'] {
  const r = role.toLowerCase()
  if (r.includes('chef') || r.includes('owner') || r.includes('propriétaire')) return 'owner'
  if (r.includes('admin')) return 'admin'
  if (r.includes('lecteur') || r.includes('viewer')) return 'viewer'
  return 'editor'
}

/** Membres réels d'un projet. */
export async function getProjectTeam(projectId: string): Promise<TeamMember[]> {
  const members = await prisma.projectMember.findMany({
    where: { projectId },
    include: { user: true },
    orderBy: { joinedAt: 'asc' },
  })

  const docCounts = await prisma.document.groupBy({
    by: ['uploadedBy'],
    where: { projectId, uploadedBy: { not: null } },
    _count: true,
  })
  const docsByUser = new Map(docCounts.map((d) => [d.uploadedBy, d._count]))

  return members.map((m, i) => ({
    id: m.id,
    userId: m.user.id,
    projectId,
    fullName: fullName(m.user),
    initials: initials(m.user),
    email: m.user.email,
    role: roleKey(m.role),
    profession: m.role,
    avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length]!,
    status: 'active',
    joinedAt: m.joinedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    lastActive: '—',
    tasksCount: 0,
    documentsCount: docsByUser.get(m.user.id) ?? 0,
  }))
}
