'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare, TrendingUp, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MockAgent } from '@/lib/mock-data'

const CATEGORIES = [
  { label: 'Toutes',          specialty: null },
  { label: 'Architecture',    specialty: 'Architecture & Réglementation' },
  { label: 'BIM & Coordination', specialty: 'BIM & Coordination' },
  { label: 'Économie',        specialty: 'Économie de la construction' },
  { label: 'Environnement',   specialty: 'Environnement & Durabilité' },
  { label: 'Fluides & CVC',   specialty: 'Fluides & CVC' },
  { label: 'Contrôle qualité', specialty: 'Contrôle & Conformité' },
]

interface AgentsClientProps {
  agents: MockAgent[]
}

export function AgentsClient({ agents }: AgentsClientProps) {
  const [category, setCategory] = useState<string | null>(null)

  const filtered = category
    ? agents.filter((a) => a.specialty === category)
    : agents

  const countBySpecialty = (specialty: string | null) =>
    specialty ? agents.filter((a) => a.specialty === specialty).length : agents.length

  return (
    <div className="flex gap-5">
      {/* ── Colonne principale ── */}
      <div className="min-w-0 flex-1 space-y-4">
        <div>
          <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-adp-slate">
            Agents ADP
            {category && <span className="ml-2 text-[13px] font-normal text-adp-muted">— {category}</span>}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((agent) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.id}`}
                className="group flex gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-adp-blue/20 hover:shadow-md"
              >
                <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[16px] font-bold', agent.colorBg, agent.color)}>
                  {agent.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-adp-slate transition-colors duration-150 group-hover:text-adp-blue">
                      {agent.name}
                    </p>
                    <span className="flex shrink-0 items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-600">
                      <TrendingUp className="h-2.5 w-2.5" strokeWidth={2} />
                      Actif
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="min-w-0 flex-1 truncate rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-adp-muted">
                      {agent.specialty}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-adp-muted">{agent.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[12px] text-adp-muted">
                      <MessageSquare className="h-3 w-3" strokeWidth={1.75} />
                      {agent.usageCount.toLocaleString()} sessions
                    </span>
                    <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-adp-slate transition-all duration-150 group-hover:border-adp-blue group-hover:bg-adp-blue group-hover:text-white">
                      Lancer →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sidebar ── */}
      <div className="w-56 shrink-0 space-y-3">
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Catégories</h3>
          </div>
          <div className="divide-y divide-slate-100/80">
            {CATEGORIES.map(({ label, specialty }) => {
              const isActive = category === specialty
              const count = countBySpecialty(specialty)
              return (
                <button
                  key={label}
                  onClick={() => setCategory(specialty)}
                  className={cn(
                    'flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors duration-150',
                    isActive ? 'bg-adp-blue/5' : 'hover:bg-slate-50'
                  )}
                >
                  <span className={cn('text-[13px]', isActive ? 'font-semibold text-adp-blue' : 'text-adp-muted hover:text-adp-slate')}>
                    {label}
                  </span>
                  <span className={cn(
                    'rounded-full px-1.5 py-0.5 text-[11px] font-bold',
                    isActive ? 'bg-adp-blue/10 text-adp-blue' : 'bg-slate-100 text-slate-500'
                  )}>
                    {count > 0 ? count : '—'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-adp-blue/20 bg-adp-blue-light p-4">
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-adp-blue/10">
              <Plus className="h-3.5 w-3.5 text-adp-blue" strokeWidth={2} />
            </div>
            <p className="text-[14px] font-semibold text-adp-blue">Agent personnalisé</p>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-adp-muted">
            Configurez un agent adapté à vos besoins métier spécifiques.
          </p>
          <button className="mt-3 w-full rounded-lg bg-adp-blue py-2 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-adp-blue-dark">
            Créer un agent
          </button>
        </div>
      </div>
    </div>
  )
}
