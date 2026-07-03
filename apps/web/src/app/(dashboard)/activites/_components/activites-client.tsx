'use client'

import { useState } from 'react'
import { Upload, Bot, MessageSquare, AlertTriangle, CheckCircle, UserPlus, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MockActivity } from '@/lib/mock-data'

const TYPE_CFG = {
  upload:     { icon: Upload,        color: 'text-blue-600 bg-blue-50',       label: 'Import' },
  agent:      { icon: Bot,           color: 'text-violet-600 bg-violet-50',   label: 'Agent IA' },
  comment:    { icon: MessageSquare, color: 'text-slate-500 bg-slate-100',    label: 'Commentaire' },
  clash:      { icon: AlertTriangle, color: 'text-red-500 bg-red-50',         label: 'Clash' },
  validation: { icon: CheckCircle,   color: 'text-emerald-600 bg-emerald-50', label: 'Validation' },
  member:     { icon: UserPlus,      color: 'text-amber-600 bg-amber-50',     label: 'Équipe' },
} as const

const PRIORITY_CLS: Record<string, string> = {
  haute:   'bg-red-100 text-red-700',
  normale: 'bg-slate-100 text-slate-600',
  basse:   'bg-green-100 text-green-700',
}

const STATUS_CLS: Record<string, string> = {
  termine:    'bg-emerald-100 text-emerald-700',
  en_cours:   'bg-blue-100 text-blue-700',
  en_attente: 'bg-orange-100 text-orange-700',
}

const STATUS_LABEL: Record<string, string> = {
  termine: 'Terminé', en_cours: 'En cours', en_attente: 'En attente',
}

interface ActivitesClientProps {
  activities: MockActivity[]
}

export function ActivitesClient({ activities }: ActivitesClientProps) {
  const [projet,   setProjet]   = useState<string | null>(null)
  const [type,     setType]     = useState<string | null>(null)
  const [priorite, setPriorite] = useState<string | null>(null)
  const [statut,   setStatut]   = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  // Options dérivées des données
  const projets  = [...new Set(activities.map((a) => a.projectName))].sort()
  const types    = Object.entries(TYPE_CFG).map(([k, v]) => ({ value: k, label: v.label }))
  const priorites = ['haute', 'normale', 'basse']
  const statuts  = Object.entries(STATUS_LABEL).map(([k, v]) => ({ value: k, label: v }))

  // Filtrage en cascade
  const filtered = activities.filter((a) => {
    if (projet   && a.projectName !== projet)  return false
    if (type     && a.type        !== type)    return false
    if (priorite && a.priority    !== priorite) return false
    if (statut   && a.status      !== statut)  return false
    return true
  })

  const hasFilters = projet || type || priorite || statut
  const resetAll   = () => { setProjet(null); setType(null); setPriorite(null); setStatut(null) }

  const toggle = (menu: string) => setOpenMenu((o) => (o === menu ? null : menu))

  const FilterBtn = ({
    id, label, value, options, onSelect,
  }: {
    id: string
    label: string
    value: string | null
    options: { value: string; label: string }[] | string[]
    onSelect: (v: string | null) => void
  }) => {
    const opts = options.map((o) => typeof o === 'string' ? { value: o, label: o } : o)
    const active = value !== null
    return (
      <div className="relative">
        <button
          onClick={() => toggle(id)}
          className={cn(
            'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-all duration-150',
            active
              ? 'border-adp-blue/40 bg-adp-blue/5 text-adp-blue'
              : 'border-slate-200 bg-white text-adp-muted hover:border-adp-blue/30 hover:text-adp-slate'
          )}
        >
          {active ? opts.find((o) => o.value === value)?.label : label}
          {active
            ? <X className="h-3 w-3" strokeWidth={2} onClick={(e) => { e.stopPropagation(); onSelect(null); setOpenMenu(null) }} />
            : <ChevronDown className="h-3 w-3" strokeWidth={2} />
          }
        </button>
        {openMenu === id && (
          <div className="absolute left-0 top-full z-20 mt-1 min-w-[140px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
            {opts.map((o) => (
              <button
                key={o.value}
                onClick={() => { onSelect(o.value); setOpenMenu(null) }}
                className={cn(
                  'flex w-full items-center px-3 py-2 text-left text-[13px] transition-colors duration-100 hover:bg-slate-50',
                  value === o.value ? 'font-semibold text-adp-blue' : 'text-adp-slate'
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Filtres */}
      <div className="flex items-center gap-2 flex-wrap">
        <FilterBtn id="projet"   label="Projet"   value={projet}   options={projets.map((p) => ({ value: p, label: p }))} onSelect={setProjet} />
        <FilterBtn id="type"     label="Type"     value={type}     options={types}    onSelect={setType} />
        <FilterBtn id="priorite" label="Priorité" value={priorite} options={priorites} onSelect={setPriorite} />
        <FilterBtn id="statut"   label="Statut"   value={statut}   options={statuts}  onSelect={setStatut} />
        {hasFilters && (
          <button onClick={resetAll} className="text-[13px] text-adp-muted underline hover:text-adp-slate">
            Tout effacer
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[15px] font-semibold text-adp-slate">Aucun résultat</p>
            <p className="mt-1 text-[13px] text-adp-muted">Essayez de modifier les filtres.</p>
            <button onClick={resetAll} className="mt-3 text-[13px] font-medium text-adp-blue hover:underline">
              Effacer les filtres
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {['Type', 'Activité', 'Projet', 'Agent', 'Priorité', 'Statut', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-widest text-adp-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((a) => {
                const cfg  = TYPE_CFG[a.type]
                const Icon = cfg.icon
                return (
                  <tr key={a.id} className="transition-colors duration-100 hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', cfg.color)}>
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[14px] font-medium text-adp-slate">{a.label}</p>
                      <p className="text-[12px] text-adp-muted">{a.userName}</p>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-adp-muted">{a.projectName}</td>
                    <td className="px-4 py-3 text-[13px] text-adp-muted">
                      {a.agentName ?? <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-semibold', PRIORITY_CLS[a.priority])}>
                        {a.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-semibold', STATUS_CLS[a.status])}>
                        {STATUS_LABEL[a.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-adp-muted">{a.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
