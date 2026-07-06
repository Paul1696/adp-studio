import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Plus, CheckCircle, Clock, Bot, BarChart3 } from 'lucide-react'
import { getUserMissions } from '@/lib/data/missions'
import { getAgents } from '@/lib/data/agents'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'
import { SidebarPanel } from '@/components/ui/sidebar-panel'
import { EmptyState } from '@/components/ui/empty-state'

export const metadata: Metadata = { title: 'Missions IA' }
export const dynamic = 'force-dynamic'

const STATUS_CFG = {
  draft:     { label: 'Brouillon', cls: 'bg-slate-100 text-slate-600' },
  running:   { label: 'En cours',  cls: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Terminée',  cls: 'bg-emerald-100 text-emerald-700' },
  failed:    { label: 'Échouée',   cls: 'bg-red-100 text-red-700' },
}

export default async function MissionsPage() {
  const [missions, agents] = await Promise.all([getUserMissions(), getAgents()])
  const total     = missions.length
  const completed = missions.filter((m) => m.status === 'completed').length
  const running   = missions.filter((m) => m.status === 'running').length
  const draft     = missions.filter((m) => m.status === 'draft').length
  const topAgents = [...agents].sort((a, b) => b.usageCount - a.usageCount).slice(0, 5)

  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Missions IA"
          description="Toutes vos missions IA — analyse, estimation, coordination."
          action={
            <Link
              href="/missions/new"
              className="flex items-center gap-2 rounded-xl bg-adp-blue px-4 py-2 text-[14px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-md"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Nouvelle mission
            </Link>
          }
        />

        <div className="grid grid-cols-4 gap-3">
          <StatCard icon={Zap}         label="Total missions"  value={String(total)}     sub="Tous projets"       iconColor="text-adp-blue"    iconBg="bg-blue-50" />
          <StatCard icon={CheckCircle} label="Terminées"       value={String(completed)} sub="Résultats disponibles" iconColor="text-emerald-600" iconBg="bg-emerald-50" />
          <StatCard icon={Clock}       label="En cours"        value={String(running)}   sub="Analyse active"     iconColor="text-violet-600"  iconBg="bg-violet-50" />
          <StatCard icon={BarChart3}   label="Brouillons"      value={String(draft)}     sub="Non lancées"        iconColor="text-amber-600"   iconBg="bg-amber-50" />
        </div>

        {missions.length === 0 ? (
          <EmptyState
            icon={Zap}
            title="Aucune mission pour l'instant"
            description="Lancez votre première mission IA pour analyser, estimer ou coordonner."
            action={
              <Link href="/missions/new" className="flex items-center gap-2 rounded-xl bg-adp-blue px-4 py-2 text-[14px] font-semibold text-white shadow-sm hover:bg-adp-blue-dark">
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                Nouvelle mission
              </Link>
            }
          />
        ) : (
        <div className="space-y-3">
          {missions.map((mission) => {
            const cfg = STATUS_CFG[mission.status]
            const missionAgents = agents.filter((a) => mission.agentIds.includes(a.id))
            const done = mission.steps.filter((s) => s.status === 'done').length
            return (
              <Link
                key={mission.id}
                href={`/missions/${mission.id}`}
                className="group flex gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-adp-blue/20 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-adp-blue/10">
                  <Zap className="h-5 w-5 text-adp-blue" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[15px] font-semibold text-adp-slate transition-colors duration-150 group-hover:text-adp-blue">{mission.title}</p>
                      <p className="mt-0.5 text-[13px] text-adp-muted">{mission.projectName}</p>
                    </div>
                    <span className={cn('shrink-0 rounded-md px-2 py-0.5 text-[12px] font-semibold', cfg.cls)}>{cfg.label}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-snug text-adp-muted line-clamp-1">{mission.objective}</p>
                  <div className="mt-2 flex items-center gap-4 text-[12px] text-adp-muted">
                    <span className="flex items-center gap-1"><Bot className="h-3 w-3" strokeWidth={1.75} />{missionAgents.map((a) => a.name).join(', ') || '—'}</span>
                    <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" strokeWidth={1.75} />{done}/{mission.steps.length} étapes</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={1.75} />{mission.completedAt ?? mission.createdAt}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        )}
      </div>

      <div className="w-56 shrink-0 space-y-3">
        <SidebarPanel title="Agents les plus utilisés">
          <div className="divide-y divide-slate-100/80">
            {topAgents.map((a) => {
              const count = a.usageCount
              return (
                <div key={a.id} className="flex items-center gap-2.5 px-4 py-2.5">
                  <div className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[12px] font-bold', a.colorBg, a.color)}>{a.icon}</div>
                  <span className="flex-1 truncate text-[13px] text-adp-muted">{a.name}</span>
                  <span className="text-[13px] font-semibold text-adp-slate">{count}</span>
                </div>
              )
            })}
          </div>
        </SidebarPanel>
      </div>
    </div>
  )
}
