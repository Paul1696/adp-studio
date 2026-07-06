import { Upload, Bot, MessageSquare, AlertTriangle, CheckCircle, UserPlus, Filter } from 'lucide-react'
import { getProjectActivities } from '@/lib/data/activities'
import type { MockActivity } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const TYPE_CFG = {
  upload:     { icon: Upload,        color: 'text-blue-600 bg-blue-50',    label: 'Import' },
  agent:      { icon: Bot,           color: 'text-violet-600 bg-violet-50', label: 'Agent IA' },
  comment:    { icon: MessageSquare, color: 'text-slate-500 bg-slate-100', label: 'Commentaire' },
  clash:      { icon: AlertTriangle, color: 'text-red-600 bg-red-50',      label: 'Clash' },
  validation: { icon: CheckCircle,   color: 'text-emerald-600 bg-emerald-50', label: 'Validation' },
  member:     { icon: UserPlus,      color: 'text-orange-600 bg-orange-50', label: 'Équipe' },
} as const

interface Props { params: Promise<{ id: string }> }

export default async function ProjectActivitesPage({ params }: Props) {
  const { id } = await params
  const activities = await getProjectActivities(id)

  const grouped = activities.reduce<Record<string, MockActivity[]>>((acc, a) => {
    acc[a.date] = [...(acc[a.date] ?? []), a]
    return acc
  }, {})

  return (
    <div className="flex gap-5">
      {/* ── Timeline ── */}
      <div className="min-w-0 flex-1 space-y-6">
        {activities.length === 0 && (
          <div className="rounded-xl border border-slate-200/80 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-adp-muted">Aucune activité enregistrée sur ce projet pour le moment.</p>
          </div>
        )}
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <p className="mb-3 text-xs font-semibold text-adp-muted">{date}</p>
            <div className="space-y-2">
              {items.map((a) => {
                const cfg = TYPE_CFG[a.type]
                const Icon = cfg.icon
                const priority = { haute: 'bg-red-100 text-red-700', normale: 'bg-slate-100 text-slate-600', basse: 'bg-green-100 text-green-700' }[a.priority]
                return (
                  <div key={a.id} className="flex gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm">
                    <div className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', cfg.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-adp-slate">{a.label}</p>
                          <p className="mt-0.5 text-xs text-adp-muted">{a.detail}</p>
                        </div>
                        <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold', priority)}>
                          {a.priority}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-[12px] text-adp-muted">
                        <span>{a.userName}</span>
                        {a.agentName && <><span>·</span><span className="text-violet-600">{a.agentName}</span></>}
                        <span>·</span><span>{a.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Sidebar filtres ── */}
      <div className="w-52 shrink-0 space-y-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-adp-muted" />
            <h3 className="text-xs font-semibold uppercase tracking-wide text-adp-muted">Filtres</h3>
          </div>
          <div className="mb-4">
            <p className="mb-2 text-[12px] font-semibold text-adp-slate">Type d&apos;activité</p>
            <div className="space-y-1.5">
              {Object.entries(TYPE_CFG).map(([key, { label }]) => (
                <label key={key} className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-adp-blue" />
                  <span className="text-xs text-adp-slate">{label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2 text-[12px] font-semibold text-adp-slate">Priorité</p>
            <div className="space-y-1.5">
              {['Haute', 'Normale', 'Basse'].map((p) => (
                <label key={p} className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-adp-blue" />
                  <span className="text-xs text-adp-slate">{p}</span>
                </label>
              ))}
            </div>
          </div>
          <button className="w-full rounded-lg bg-adp-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-adp-blue-dark">
            Appliquer les filtres
          </button>
        </div>
      </div>
    </div>
  )
}
