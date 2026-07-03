import type { Metadata } from 'next'
import { Activity, Clock, CheckCircle, BarChart3 } from 'lucide-react'
import { MOCK_ACTIVITIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'
import { ActivitesClient } from './_components/activites-client'

export const metadata: Metadata = { title: 'Activités' }

const STATS = [
  { icon: Activity,    label: 'Total activités', value: '128', sub: 'Toutes périodes',  iconColor: 'text-adp-blue',    iconBg: 'bg-blue-50' },
  { icon: Clock,       label: 'En cours',        value: '46',  sub: 'Cette semaine',    iconColor: 'text-amber-600',   iconBg: 'bg-amber-50' },
  { icon: CheckCircle, label: 'Terminées',       value: '58',  sub: 'À jour',           iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
  { icon: BarChart3,   label: 'Par jour (moy.)', value: '12',  sub: '5 derniers jours', iconColor: 'text-violet-600',  iconBg: 'bg-violet-50' },
]

const PRIORITY_CLS: Record<string, string> = {
  haute:   'bg-red-100 text-red-700',
  normale: 'bg-slate-100 text-slate-600',
  basse:   'bg-green-100 text-green-700',
}

export default function ActivitesPage() {
  return (
    <div className="flex gap-5">
      {/* ── Colonne principale ── */}
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Activités"
          description="Suivez, gérez et filtrez toutes les activités de vos projets."
        />

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <ActivitesClient activities={MOCK_ACTIVITIES} />
      </div>

      {/* ── Sidebar ── */}
      <div className="w-56 shrink-0 space-y-3">

        {/* Mini calendrier */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Calendrier</h3>
          </div>
          <div className="p-3">
            <p className="mb-2 text-center text-[13px] font-semibold text-adp-slate">Mai 2024</p>
            <div className="grid grid-cols-7 gap-0.5 text-center">
              {['L','M','M','J','V','S','D'].map((d, i) => (
                <div key={i} className="py-1 text-[11px] font-bold uppercase text-adp-muted">{d}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <button key={d} className={cn(
                  'rounded-lg py-1 text-[12px] transition-colors duration-150',
                  d === 27
                    ? 'bg-adp-blue font-bold text-white'
                    : [15, 20, 24].includes(d)
                    ? 'bg-adp-blue/10 font-semibold text-adp-blue'
                    : 'text-adp-muted hover:bg-slate-100'
                )}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Échéances proches */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Échéances proches</h3>
          </div>
          <div className="divide-y divide-slate-100/80">
            {[
              { label: 'Rendu APD Kribi',       date: '30 Nov.', priority: 'haute' },
              { label: 'Coordination BIM BCEC',  date: '2 Déc.',  priority: 'normale' },
              { label: 'Rapport EXE Villa Bali', date: '5 Déc.',  priority: 'basse' },
            ].map(({ label, date, priority }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2.5 transition-colors duration-150 hover:bg-slate-50">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-adp-slate">{label}</p>
                  <p className="text-[11px] text-adp-muted">{date}</p>
                </div>
                <span className={cn('shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-bold', PRIORITY_CLS[priority])}>
                  {priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Répartition par statut */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Répartition par statut</h3>
          </div>
          <div className="space-y-3 p-4">
            {[
              { label: 'Terminées',  value: 58, pct: 45, color: 'bg-emerald-500', text: 'text-emerald-600' },
              { label: 'En cours',   value: 46, pct: 36, color: 'bg-adp-blue',    text: 'text-adp-blue' },
              { label: 'En attente', value: 24, pct: 19, color: 'bg-amber-400',   text: 'text-amber-600' },
            ].map(({ label, value, pct, color, text }) => (
              <div key={label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[13px] text-adp-muted">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={cn('text-[12px] font-bold', text)}>{pct}%</span>
                    <span className="text-[12px] font-semibold text-adp-slate">{value}</span>
                  </div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productivité équipe */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Productivité équipe</h3>
          </div>
          <div className="p-4">
            <div className="flex items-end gap-2">
              <p className="text-[30px] font-bold leading-none text-adp-blue">32</p>
              <p className="mb-0.5 text-[13px] text-adp-muted">actions / jour</p>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[12px] font-bold text-emerald-600">
                ↑ +12%
              </span>
              <span className="text-[12px] text-adp-muted">vs semaine dernière</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
