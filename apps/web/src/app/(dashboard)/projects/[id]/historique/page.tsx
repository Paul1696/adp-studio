import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Upload, Bot, MessageSquare, AlertTriangle, CheckCircle, UserPlus } from 'lucide-react'
import { MOCK_PROJECTS, MOCK_ACTIVITIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { TimelineItem } from '@/components/ui/timeline-item'
import { SidebarPanel } from '@/components/ui/sidebar-panel'
import { EmptyState } from '@/components/ui/empty-state'

export const metadata: Metadata = { title: 'Historique' }

interface Props { params: Promise<{ id: string }> }

const TYPE_CFG = {
  upload:     { icon: Upload,        color: 'text-blue-600',    bg: 'bg-blue-50' },
  agent:      { icon: Bot,           color: 'text-violet-600',  bg: 'bg-violet-50' },
  comment:    { icon: MessageSquare, color: 'text-slate-500',   bg: 'bg-slate-100' },
  clash:      { icon: AlertTriangle, color: 'text-red-500',     bg: 'bg-red-50' },
  validation: { icon: CheckCircle,   color: 'text-emerald-600', bg: 'bg-emerald-50' },
  member:     { icon: UserPlus,      color: 'text-amber-600',   bg: 'bg-amber-50' },
} as const

const FILTERS = ['Tout', 'Documents', 'Missions IA', 'Validations', 'Équipe', 'Commentaires']

export default async function HistoriquePage({ params }: Props) {
  const { id } = await params
  const project = MOCK_PROJECTS.find((p) => p.id === id)
  if (!project) notFound()

  const activities = MOCK_ACTIVITIES.filter((a) => a.projectId === id)

  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Historique"
          description={`Tous les événements du projet — ${project.name}`}
        />

        {/* Filtres */}
        <div className="flex items-center gap-2">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all duration-150',
                i === 0
                  ? 'border-adp-blue bg-adp-blue/5 text-adp-blue'
                  : 'border-slate-200 bg-white text-adp-muted hover:border-adp-blue/30 hover:text-adp-slate',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          {activities.length === 0 ? (
            <EmptyState icon={CheckCircle} title="Aucun événement" description="Aucune activité enregistrée pour ce projet." />
          ) : (
            <div>
              {activities.map((a, i) => {
                const cfg = TYPE_CFG[a.type]
                return (
                  <TimelineItem
                    key={a.id}
                    icon={cfg.icon}
                    iconColor={cfg.color}
                    iconBg={cfg.bg}
                    title={a.label}
                    description={a.detail}
                    date={`${a.date} à ${a.time}`}
                    meta={a.userName}
                    isLast={i === activities.length - 1}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="w-56 shrink-0 space-y-3">
        <SidebarPanel title="Répartition">
          <div className="divide-y divide-slate-100/80">
            {Object.entries(TYPE_CFG).map(([type, cfg]) => {
              const count = activities.filter((a) => a.type === type).length
              const Icon = cfg.icon
              return (
                <div key={type} className="flex items-center gap-2.5 px-4 py-2.5">
                  <div className={cn('flex h-6 w-6 items-center justify-center rounded-md', cfg.bg)}>
                    <Icon className={cn('h-3 w-3', cfg.color)} strokeWidth={1.75} />
                  </div>
                  <span className="flex-1 text-[12px] text-adp-muted capitalize">{type}</span>
                  <span className="text-[12px] font-semibold text-adp-slate">{count}</span>
                </div>
              )
            })}
          </div>
        </SidebarPanel>
      </div>
    </div>
  )
}
