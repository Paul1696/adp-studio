import { prisma } from '@/lib/prisma'
import type { MockAgent } from '@/lib/mock-data'

// Présentation (icône/couleurs) par slug — purement visuel, pas des données métier
const AGENT_STYLE: Record<string, { icon: string; color: string; colorBg: string }> = {
  'adp-architecte':      { icon: 'A', color: 'text-blue-600',    colorBg: 'bg-blue-50' },
  'adp-bim-manager':     { icon: 'B', color: 'text-violet-600',  colorBg: 'bg-violet-50' },
  'adp-quantbim':        { icon: 'Q', color: 'text-emerald-600', colorBg: 'bg-emerald-50' },
  'adp-reduction':       { icon: 'R', color: 'text-orange-600',  colorBg: 'bg-orange-50' },
  'adp-controleur':      { icon: 'C', color: 'text-red-600',     colorBg: 'bg-red-50' },
  'adp-eco-conception':  { icon: 'E', color: 'text-green-600',   colorBg: 'bg-green-50' },
  'adp-fluides':         { icon: 'F', color: 'text-cyan-600',    colorBg: 'bg-cyan-50' },
  'adp-controle-metres': { icon: 'M', color: 'text-pink-600',    colorBg: 'bg-pink-50' },
  'adp-urbain':          { icon: 'U', color: 'text-teal-600',    colorBg: 'bg-teal-50' },
}

const DEFAULT_STYLE = { icon: '•', color: 'text-slate-600', colorBg: 'bg-slate-50' }

type DbAgent = {
  id: string
  name: string
  slug: string
  description: string | null
  category: string
  model: string | null
  competences: string[]
  tags: string[]
  _count: { missions: number }
}

export function toUiAgent(a: DbAgent): MockAgent {
  const style = AGENT_STYLE[a.slug] ?? DEFAULT_STYLE
  return {
    id: a.id,
    name: a.name,
    specialty: a.category,
    description: a.description ?? '',
    model: a.model ?? '—',
    icon: style.icon,
    color: style.color,
    colorBg: style.colorBg,
    usageCount: a._count.missions,
    isAdp: a.slug.startsWith('adp-'),
    competences: a.competences,
    tags: a.tags,
  }
}

/** Tous les agents actifs, au format UI, avec compte réel de missions. */
export async function getAgents(): Promise<MockAgent[]> {
  const rows = await prisma.agent.findMany({
    where: { status: 'ACTIVE' },
    include: { _count: { select: { missions: true } } },
    orderBy: { createdAt: 'asc' },
  })
  return rows.map(toUiAgent)
}

/** Un agent par id, au format UI (null si introuvable). */
export async function getAgent(id: string): Promise<MockAgent | null> {
  const a = await prisma.agent.findUnique({
    where: { id },
    include: { _count: { select: { missions: true } } },
  })
  return a ? toUiAgent(a) : null
}
