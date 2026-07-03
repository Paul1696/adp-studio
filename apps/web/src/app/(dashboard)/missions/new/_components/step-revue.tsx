'use client'

import { MOCK_AGENTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Zap, MapPin, Bot } from 'lucide-react'
import type { WizardState } from '../page'

interface Props { state: WizardState }

export function StepRevue({ state }: Props) {
  const agents = MOCK_AGENTS.filter((a) => state.agentIds.includes(a.id))
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[16px] font-bold text-adp-slate">Récapitulatif de la mission</h2>
        <p className="mt-1 text-[14px] text-adp-muted">Vérifiez les informations avant de lancer.</p>
      </div>

      <div className="space-y-3">
        {/* Objectif */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-adp-blue" strokeWidth={1.75} />
            <p className="text-[13px] font-semibold uppercase tracking-widest text-adp-muted">Objectif</p>
          </div>
          <p className="text-[14px] leading-relaxed text-adp-slate">{state.objectif}</p>
        </div>

        {/* Projet */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-adp-blue" strokeWidth={1.75} />
            <p className="text-[13px] font-semibold uppercase tracking-widest text-adp-muted">Projet</p>
          </div>
          <p className="text-[14px] font-medium text-adp-slate">{state.projectName}</p>
        </div>

        {/* Agents */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Bot className="h-3.5 w-3.5 text-adp-blue" strokeWidth={1.75} />
            <p className="text-[13px] font-semibold uppercase tracking-widest text-adp-muted">Agents ({agents.length})</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {agents.map((a) => (
              <div key={a.id} className={cn('flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5', a.colorBg)}>
                <span className={cn('text-[13px] font-bold', a.color)}>{a.icon}</span>
                <span className="text-[13px] font-medium text-adp-slate">{a.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-adp-blue/20 bg-adp-blue/5 p-3">
          <p className="text-[13px] leading-relaxed text-adp-blue">
            La mission sera simulée avec des données fictives. Aucune IA réelle ne sera sollicitée dans cette version MVP.
          </p>
        </div>
      </div>
    </div>
  )
}
