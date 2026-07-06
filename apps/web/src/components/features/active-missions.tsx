'use client'

import Link from 'next/link'
import { Zap, CheckCircle, Clock, Loader, ChevronRight, Bot } from 'lucide-react'
import type { Mission } from '@/lib/types'
import type { MockAgent } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const STATUS_CFG = {
  running:   { label: 'En cours',  cls: 'bg-blue-100 text-blue-700',    dot: 'bg-adp-blue animate-pulse' },
  draft:     { label: 'Brouillon', cls: 'bg-slate-100 text-slate-600',  dot: 'bg-slate-400' },
  completed: { label: 'Terminée',  cls: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  failed:    { label: 'Échouée',   cls: 'bg-red-100 text-red-700',      dot: 'bg-red-500' },
}

interface ActiveMissionsProps {
  missions: Mission[]
  agents: MockAgent[]
}

export function ActiveMissions({ missions: allMissions, agents: allAgents }: ActiveMissionsProps) {
  const missions = allMissions
    .filter((m) => m.status === 'running' || m.status === 'draft')
    .slice(0, 3)

  if (missions.length === 0) return null

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Missions actives</h2>
          <span className="rounded-full bg-adp-blue/10 px-2 py-0.5 text-[11px] font-bold text-adp-blue">
            {missions.length}
          </span>
        </div>
        <Link href="/missions" className="flex items-center gap-1 text-[13px] font-medium text-adp-muted transition-colors hover:text-adp-blue">
          Voir toutes <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {missions.map((mission) => {
          const cfg = STATUS_CFG[mission.status]
          const agents = allAgents.filter((a) => mission.agentIds.includes(a.id))
          const done = mission.steps.filter((s) => s.status === 'done').length
          const total = mission.steps.length
          const pct = total > 0 ? Math.round((done / total) * 100) : 0
          const running = mission.steps.find((s) => s.status === 'running')

          return (
            <Link
              key={mission.id}
              href={`/missions/${mission.id}`}
              className="group flex flex-col rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-adp-blue/20 hover:shadow-md"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-adp-blue/10">
                  {mission.status === 'running'
                    ? <Loader className="h-4 w-4 animate-spin text-adp-blue" strokeWidth={1.75} />
                    : <Zap className="h-4 w-4 text-adp-blue" strokeWidth={1.75} />
                  }
                </div>
                <span className={cn('rounded-md px-2 py-0.5 text-[11px] font-semibold', cfg.cls)}>
                  {cfg.label}
                </span>
              </div>

              {/* Titre + projet */}
              <p className="text-[14px] font-semibold leading-snug text-adp-slate transition-colors group-hover:text-adp-blue">
                {mission.title}
              </p>
              <p className="mt-0.5 text-[12px] text-adp-muted">{mission.projectName}</p>

              {/* Étape en cours */}
              {running && (
                <p className="mt-2 text-[12px] text-adp-muted line-clamp-1">
                  <span className="font-medium text-adp-slate">↳</span> {running.title}
                </p>
              )}

              {/* Progress */}
              {total > 0 && (
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[11px] text-adp-muted">
                    <span>{done}/{total} étapes</span>
                    <span className="font-semibold text-adp-slate">{pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn('h-full rounded-full transition-all duration-500', mission.status === 'running' ? 'bg-adp-blue' : 'bg-slate-300')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Agents */}
              <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-2.5">
                <Bot className="h-3 w-3 shrink-0 text-adp-muted" strokeWidth={1.75} />
                <div className="flex flex-wrap gap-1">
                  {agents.map((a) => (
                    <span key={a.id} className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-bold', a.colorBg, a.color)}>
                      {a.icon}
                    </span>
                  ))}
                  <span className="text-[11px] text-adp-muted">{agents.map((a) => a.name.replace('ADP ', '')).join(', ')}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
