import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Banknote, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import { getProject } from '@/lib/data/projects'
import type { Budget, BudgetLine } from '@/lib/types'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'
import { SidebarPanel } from '@/components/ui/sidebar-panel'
import { EmptyState } from '@/components/ui/empty-state'

export const metadata: Metadata = { title: 'Budget' }
export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }> }

const fmt = (n: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' €'

const STATUS_CFG: Record<BudgetLine['status'], { cls: string; label: string }> = {
  ok:      { cls: 'bg-emerald-100 text-emerald-700', label: 'OK' },
  alert:   { cls: 'bg-amber-100 text-amber-700',     label: 'Alerte' },
  overrun: { cls: 'bg-red-100 text-red-700',          label: 'Dépassement' },
}

function BudgetSidebar({ budget, alerts }: { budget: Budget; alerts: BudgetLine[] }) {
  const pctSpent = Math.round((budget.spent / budget.total) * 100)
  return (
    <>
      <SidebarPanel title="Avancement global">
        <div className="p-4 space-y-3">
          {[
            { label: 'Engagé',  value: budget.engaged, color: 'bg-violet-500' },
            { label: 'Dépensé', value: budget.spent,   color: 'bg-adp-blue' },
          ].map(({ label, value, color }) => {
            const pct = Math.round((value / budget.total) * 100)
            return (
              <div key={label}>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="text-adp-muted">{label}</span>
                  <span className="font-semibold text-adp-slate">{pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
          <p className="pt-1 text-[11px] text-adp-muted">Mis à jour le {budget.updatedAt}</p>
        </div>
      </SidebarPanel>

      {alerts.length > 0 && (
        <SidebarPanel title="Lots en écart">
          <div className="divide-y divide-slate-100/80">
            {alerts.map((a) => (
              <div key={a.id} className="flex items-center gap-2.5 px-4 py-2.5">
                <AlertTriangle className={cn('h-3.5 w-3.5 shrink-0', a.status === 'overrun' ? 'text-red-500' : 'text-amber-500')} strokeWidth={1.75} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-adp-slate">{a.label}</p>
                  <p className="text-[10px] text-adp-muted">{a.lot}</p>
                </div>
              </div>
            ))}
          </div>
        </SidebarPanel>
      )}

      <SidebarPanel title="Reste à dépenser">
        <div className="p-4">
          <p className="text-[25px] font-bold leading-none text-adp-slate">
            {fmt(budget.total - budget.spent)}
          </p>
          <p className="mt-1 text-[11px] text-adp-muted">{100 - pctSpent}% du budget total</p>
        </div>
      </SidebarPanel>
    </>
  )
}

function BudgetTable({ lines }: { lines: BudgetLine[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            {['Lot', 'Libellé', 'Consommation', 'Prévu', 'Réalisé', 'Écart', 'Statut'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-adp-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {lines.map((line) => {
            const ecart  = line.engagee - line.prevue
            const cfg    = STATUS_CFG[line.status]
            const pctBar = line.prevue > 0 ? Math.min(100, Math.round((line.realisee / line.prevue) * 100)) : 0
            const barColor = line.status === 'overrun' ? 'bg-red-500' : line.status === 'alert' ? 'bg-amber-400' : 'bg-emerald-500'
            return (
              <tr key={line.id} className="transition-colors duration-100 hover:bg-slate-50/80">
                <td className="px-4 py-3 text-[12px] font-semibold text-adp-muted">{line.lot}</td>
                <td className="px-4 py-3 text-[13px] font-medium text-adp-slate">{line.label}</td>
                <td className="px-4 py-3 w-36">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div className={cn('h-full rounded-full transition-all duration-500', barColor)} style={{ width: `${pctBar}%` }} />
                    </div>
                    <span className="w-8 shrink-0 text-right text-[11px] font-semibold text-adp-slate">{pctBar}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[12px] text-adp-muted">{fmt(line.prevue)}</td>
                <td className="px-4 py-3 text-[12px] text-adp-slate">{line.realisee > 0 ? fmt(line.realisee) : <span className="text-slate-300">—</span>}</td>
                <td className={cn('px-4 py-3 text-[12px] font-semibold', ecart > 0 ? 'text-red-600' : ecart < 0 ? 'text-emerald-600' : 'text-slate-300')}>
                  {ecart !== 0 ? (ecart > 0 ? '+' : '') + fmt(ecart) : '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={cn('rounded-md px-2 py-0.5 text-[11px] font-semibold', cfg.cls)}>{cfg.label}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default async function BudgetPage({ params }: Props) {
  const { id } = await params
  const result = await getProject(id)
  if (!result) notFound()
  const project = result.ui

  // Budget réel du projet — pas de lignes par lot en base pour l'instant
  const db = result.db
  const budget: Budget | undefined = db.budget != null
    ? {
        id: db.id,
        projectId: db.id,
        currency: '€',
        total: db.budget,
        engaged: db.budgetSpent ?? 0,
        spent: db.budgetSpent ?? 0,
        lines: [],
        updatedAt: db.updatedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      }
    : undefined

  const pctEngaged = budget ? Math.round((budget.engaged / budget.total) * 100) : 0
  const pctSpent   = budget ? Math.round((budget.spent   / budget.total) * 100) : 0
  const alerts     = budget?.lines.filter((l) => l.status !== 'ok') ?? []

  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Budget"
          description={`Suivi budgétaire — ${project.name}`}
        />

        {budget ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              <StatCard icon={Banknote}      label="Budget total"   value={fmt(budget.total)}   sub={`${budget.currency}`}           iconColor="text-adp-blue"    iconBg="bg-blue-50" />
              <StatCard icon={TrendingUp}    label="Engagé"         value={fmt(budget.engaged)} sub={`${pctEngaged}% du budget`}     iconColor="text-violet-600"  iconBg="bg-violet-50" />
              <StatCard icon={TrendingDown}  label="Dépensé"        value={fmt(budget.spent)}   sub={`${pctSpent}% du budget`}       iconColor="text-emerald-600" iconBg="bg-emerald-50" />
              <StatCard icon={AlertTriangle} label="Alertes"        value={String(alerts.length)} sub="Lots en écart"                iconColor="text-amber-600"   iconBg="bg-amber-50" />
            </div>

            {/* Table */}
            {budget.lines.length > 0 ? (
              <BudgetTable lines={budget.lines} />
            ) : (
              <EmptyState
                icon={Banknote}
                title="Aucune ligne budgétaire"
                description="Le détail par lot n'a pas encore été renseigné pour ce projet."
              />
            )}
          </>
        ) : (
          <EmptyState
            icon={Banknote}
            title="Aucun budget renseigné"
            description="Le budget de ce projet n'a pas encore été configuré."
          />
        )}
      </div>

      {/* Sidebar */}
      <div className="w-56 shrink-0 space-y-3">
        {budget && <BudgetSidebar budget={budget} alerts={alerts} />}
      </div>
    </div>
  )
}
