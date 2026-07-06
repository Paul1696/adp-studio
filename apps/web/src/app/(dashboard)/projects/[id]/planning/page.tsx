import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, CheckCircle, Clock, Flag, Diamond } from 'lucide-react'
import { getProject } from '@/lib/data/projects'
import type { PlanningPhase } from '@/lib/types'
import { EmptyState } from '@/components/ui/empty-state'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'
import { SidebarPanel } from '@/components/ui/sidebar-panel'

const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

function GanttRow({ phase, isLast }: { phase: PlanningPhase; isLast: boolean }) {
  // Calcul position/largeur approximative par mois (simplifié pour le mock)
  const monthIndex: Record<string, number> = {
    'Jan': 0, 'Fév': 1, 'Mar': 2, 'Avr': 3, 'Mai': 4, 'Jui': 5,
    'Jul': 6, 'Aoû': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Déc': 11,
  }
  const parseMonth = (dateStr: string) => {
    const parts = dateStr.split(' ')
    const mon = parts[1]?.slice(0, 3) ?? 'Jan'
    return monthIndex[mon] ?? 0
  }
  const startCol = parseMonth(phase.startDate)
  const endCol   = Math.max(startCol + 1, parseMonth(phase.endDate))
  const span     = endCol - startCol + 1

  return (
    <div className={cn('flex items-center py-2 pl-0', !isLast && '')}>
      {/* Label phase */}
      <div className="w-28 shrink-0 px-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-adp-muted">{phase.code}</span>
        <p className="truncate text-[11px] text-adp-slate">{phase.label}</p>
      </div>

      {/* Grille 12 mois */}
      <div className="relative flex flex-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 border-l border-slate-100/60 py-1.5" />
        ))}
        {/* Barre de phase */}
        <div
          className="absolute top-1 h-5 rounded-md flex items-center px-2 overflow-hidden"
          style={{
            left: `${(startCol / 12) * 100}%`,
            width: `${(span / 12) * 100}%`,
          }}
        >
          <div className={cn('absolute inset-0 rounded-md opacity-20', phase.color)} />
          <div
            className={cn('absolute left-0 top-0 h-full rounded-md', phase.color)}
            style={{ width: `${phase.progress}%`, opacity: phase.status === 'upcoming' ? 0.15 : 0.85 }}
          />
          {phase.progress > 20 && (
            <span className="relative z-10 text-[10px] font-bold text-white drop-shadow">
              {phase.progress}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function GanttChart({ phases }: { phases: PlanningPhase[] }) {
  if (phases.length === 0) return null
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-[14px] font-semibold tracking-tight text-adp-slate">Diagramme de phases</h2>
      </div>

      {/* En-tête mois */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="flex border-b border-slate-100 bg-slate-50 pl-28">
            {MONTHS.map((m) => (
              <div key={m} className="flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-adp-muted">
                {m}
              </div>
            ))}
          </div>

          {/* Lignes phases */}
          <div className="divide-y divide-slate-100/80">
            {phases.map((phase, i) => (
              <GanttRow key={phase.id} phase={phase} isLast={i === phases.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = { title: 'Planning' }
export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }> }

export default async function PlanningPage({ params }: Props) {
  const { id } = await params
  const result = await getProject(id)
  if (!result) notFound()
  const project = result.ui

  // Pas de modèle planning en base — seules la phase courante et la
  // progression réelles du projet sont affichées.
  const phases: PlanningPhase[] = []

  const STATS = [
    { icon: Clock,        label: 'Phase en cours',   value: project.phase,               sub: 'Phase actuelle du projet', iconColor: 'text-violet-600',  iconBg: 'bg-violet-50' },
    { icon: CheckCircle,  label: 'Progression',      value: `${project.progress}%`,      sub: 'Avancement global',        iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
    { icon: Calendar,     label: 'Début',            value: project.startDate,           sub: 'Date de démarrage',        iconColor: 'text-adp-blue',    iconBg: 'bg-blue-50' },
    { icon: Flag,         label: 'Fin prévue',       value: project.endDate,             sub: 'Échéance',                 iconColor: 'text-amber-600',   iconBg: 'bg-amber-50' },
  ]

  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Planning"
          description={`Suivi des phases et jalons — ${project.name}`}
        />

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Gantt */}
        {phases.length > 0 ? (
          <GanttChart phases={phases} />
        ) : (
          <EmptyState
            icon={Calendar}
            title="Aucun planning détaillé"
            description="Le découpage en phases et jalons n'a pas encore été renseigné pour ce projet."
          />
        )}
      </div>


      {/* Sidebar */}
      <div className="w-56 shrink-0 space-y-3">
        <PhaseSummary phases={phases} />
        <NextMilestones phases={phases} />
      </div>
    </div>
  )
}

// ── Composants sidebar ──────────────────────────────────────

function PhaseSummary({ phases }: { phases: PlanningPhase[] }) {
  if (phases.length === 0) return null
  return (
    <SidebarPanel title="Phases">
      <div className="divide-y divide-slate-100/80">
        {phases.map((phase) => (
          <div key={phase.id} className="flex items-center gap-2.5 px-4 py-2.5">
            <div className={cn('h-2 w-2 shrink-0 rounded-full', phase.color)} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-adp-slate">{phase.label}</p>
            </div>
            <span className={cn(
              'shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold',
              phase.status === 'done'     && 'bg-emerald-100 text-emerald-700',
              phase.status === 'current'  && 'bg-adp-blue/10 text-adp-blue',
              phase.status === 'upcoming' && 'bg-slate-100 text-slate-500',
            )}>
              {phase.status === 'done' ? '✓' : phase.status === 'current' ? `${phase.progress}%` : '—'}
            </span>
          </div>
        ))}
      </div>
    </SidebarPanel>
  )
}

function NextMilestones({ phases }: { phases: PlanningPhase[] }) {
  const milestones = phases
    .flatMap((p) => p.milestones.map((m) => ({ ...m, phase: p.code })))
    .filter((m) => !m.done)
    .slice(0, 4)

  if (milestones.length === 0) return null
  return (
    <SidebarPanel title="Jalons à venir">
      <div className="divide-y divide-slate-100/80">
        {milestones.map((m) => (
          <div key={m.id} className="flex items-center gap-2.5 px-4 py-2.5">
            <Diamond className="h-3 w-3 shrink-0 text-amber-400" strokeWidth={1.75} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-adp-slate">{m.label}</p>
              <p className="text-[10px] text-adp-muted">{m.date} · {m.phase}</p>
            </div>
          </div>
        ))}
      </div>
    </SidebarPanel>
  )
}
