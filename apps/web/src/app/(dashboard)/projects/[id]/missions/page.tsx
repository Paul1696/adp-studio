import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Zap, Plus, CheckCircle, Clock, Bot } from 'lucide-react'
import { MOCK_PROJECTS, MOCK_MISSIONS, MOCK_AGENTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { SidebarPanel } from '@/components/ui/sidebar-panel'
import { EmptyState } from '@/components/ui/empty-state'
import { StatusDot } from '@/components/ui/status-dot'

export const metadata: Metadata = { title: 'Missions IA' }

interface Props { params: Promise<{ id: string }> }

const STATUS_CFG = {
  draft:     { label: 'Brouillon',  cls: 'bg-slate-100 text-slate-600',    dot: 'offline' as const },
  running:   { label: 'En cours',   cls: 'bg-blue-100 text-blue-700',      dot: 'running' as const },
  completed: { label: 'Terminée',   cls: 'bg-emerald-100 text-emerald-700', dot: 'active' as const },
  failed:    { label: 'Échouée',    cls: 'bg-red-100 text-red-700',        dot: 'error' as const },
}

export default async function ProjectMissionsPage({ params }: Props) {
  const { id } = await params
  const project = MOCK_PROJECTS.find((p) => p.id === id)
  if (!project) notFound()

  const missions = MOCK_MISSIONS.filter((m) => m.projectId === id)
  const completed = missions.filter((m) => m.status === 'completed').length
  const running   = missions.filter((m) => m.status === 'running').length

  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Missions IA"
          description={`Missions lancées sur ce projet — ${project.name}`}
          action={
            <Link
              href={`/missions/new?projectId=${id}`}
              className="flex items-center gap-2 rounded-xl bg-adp-blue px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-md"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Nouvelle mission
            </Link>
          }
        />

        {missions.length === 0 ? (
          <EmptyState
            icon={Zap}
            title="Aucune mission"
            description="Lancez votre première mission IA sur ce projet."
            action={
              <Link href={`/missions/new?projectId=${id}`} className="rounded-lg bg-adp-blue px-4 py-2 text-[13px] font-semibold text-white hover:bg-adp-blue-dark">
                Lancer une mission
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {missions.map((mission) => {
              const cfg = STATUS_CFG[mission.status]
              const agents = MOCK_AGENTS.filter((a) => mission.agentIds.includes(a.id))
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
                      <p className="text-[14px] font-semibold text-adp-slate transition-colors duration-150 group-hover:text-adp-blue">
                        {mission.title}
                      </p>
                      <span className={cn('shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold', cfg.cls)}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] leading-snug text-adp-muted line-clamp-2">{mission.objective}</p>
                    <div className="mt-2.5 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[11px] text-adp-muted">
                        <Bot className="h-3 w-3" strokeWidth={1.75} />
                        {agents.map((a) => a.name).join(', ')}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-adp-muted">
                        <CheckCircle className="h-3 w-3" strokeWidth={1.75} />
                        {done}/{mission.steps.length} étapes
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-adp-muted">
                        <Clock className="h-3 w-3" strokeWidth={1.75} />
                        {mission.completedAt ?? mission.createdAt}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <div className="w-56 shrink-0 space-y-3">
        <SidebarPanel title="Résumé">
          <div className="divide-y divide-slate-100/80">
            {[
              { label: 'Total missions', value: missions.length },
              { label: 'Terminées',      value: completed },
              { label: 'En cours',       value: running },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-[12px] text-adp-muted">{label}</span>
                <span className="text-[12px] font-semibold text-adp-slate">{value}</span>
              </div>
            ))}
          </div>
        </SidebarPanel>
      </div>
    </div>
  )
}
