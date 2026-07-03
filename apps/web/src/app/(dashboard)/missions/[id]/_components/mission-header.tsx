import { Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Mission } from '@/lib/types'
import { cn } from '@/lib/utils'

const STATUS_CFG = {
  draft:     { label: 'Brouillon', cls: 'bg-slate-100 text-slate-600' },
  running:   { label: 'En cours',  cls: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Terminée',  cls: 'bg-emerald-100 text-emerald-700' },
  failed:    { label: 'Échouée',   cls: 'bg-red-100 text-red-700' },
}

export function MissionHeader({ mission }: { mission: Mission }) {
  const cfg = STATUS_CFG[mission.status]
  const done = mission.steps.filter((s) => s.status === 'done').length

  return (
    <div className="space-y-3">
      <Link href="/missions" className="flex items-center gap-1.5 text-[12px] text-adp-muted transition-colors hover:text-adp-slate">
        <ArrowLeft className="h-3 w-3" strokeWidth={2} />
        Toutes les missions
      </Link>

      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-adp-blue/10">
            <Zap className="h-6 w-6 text-adp-blue" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-[19px] font-bold leading-tight text-adp-slate">{mission.title}</h1>
              <span className={cn('shrink-0 rounded-md px-2.5 py-1 text-[12px] font-semibold', cfg.cls)}>
                {cfg.label}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-adp-muted">{mission.projectName}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-adp-slate">{mission.objective}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4 text-[12px] text-adp-muted">
          <span>{done}/{mission.steps.length} étapes terminées</span>
          <span>·</span>
          <span>Lancée le {mission.createdAt}</span>
          {mission.completedAt && <><span>·</span><span>Terminée le {mission.completedAt}</span></>}
        </div>

        {mission.summary && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-[12px] font-semibold text-emerald-700">Synthèse</p>
            <p className="mt-1 text-[12px] leading-relaxed text-emerald-800">{mission.summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}
