import type { Metadata } from 'next'
import { Bot, BarChart3, CheckCircle2, FolderKanban } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getAgents } from '@/lib/data/agents'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'
import { AgentsClient } from './_components/agents-client'

export const metadata: Metadata = { title: 'Agents IA' }
export const dynamic = 'force-dynamic'

export default async function AgentsPage() {
  const [agents, missionsTotal, missionsCompleted, projectsCount] = await Promise.all([
    getAgents(),
    prisma.mission.count(),
    prisma.mission.count({ where: { status: 'COMPLETED' } }),
    prisma.project.count(),
  ])

  const stats = [
    { icon: Bot,          label: 'Agents disponibles', value: String(agents.length),      sub: 'Tous actifs',        iconColor: 'text-adp-blue',    iconBg: 'bg-blue-50' },
    { icon: BarChart3,    label: 'Missions lancées',   value: String(missionsTotal),      sub: 'Cumul total',        iconColor: 'text-violet-600',  iconBg: 'bg-violet-50' },
    { icon: CheckCircle2, label: 'Missions terminées', value: String(missionsCompleted),  sub: 'Cumul total',        iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
    { icon: FolderKanban, label: 'Projets couverts',   value: String(projectsCount),      sub: 'Projets en base',    iconColor: 'text-amber-600',   iconBg: 'bg-amber-50' },
  ]

  return (
    <div className="space-y-5">
      <PageHeader
        title="Agents IA"
        description="Agents spécialisés pour l'architecture, le BIM et la construction."
      />
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <AgentsClient agents={agents} />
    </div>
  )
}
