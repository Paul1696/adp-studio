'use client'

import { MOCK_PROJECTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { MapPin } from 'lucide-react'

interface Props {
  value: string
  onChange: (id: string, name: string) => void
}

export function StepProjet({ value, onChange }: Props) {
  const active = MOCK_PROJECTS.filter((p) => p.status !== 'archive')
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[16px] font-bold text-adp-slate">Sur quel projet ?</h2>
        <p className="mt-1 text-[14px] text-adp-muted">Sélectionnez le projet concerné par cette mission.</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {active.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id, p.name)}
            className={cn(
              'flex items-start gap-3 rounded-xl border p-3 text-left transition-all duration-150',
              value === p.id
                ? 'border-adp-blue bg-adp-blue/5 ring-1 ring-adp-blue/30'
                : 'border-slate-200 bg-white hover:border-adp-blue/30',
            )}
          >
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className={cn('truncate text-[14px] font-semibold', value === p.id ? 'text-adp-blue' : 'text-adp-slate')}>{p.name}</p>
              <div className="mt-0.5 flex items-center gap-1 text-[12px] text-adp-muted">
                <MapPin className="h-2.5 w-2.5" strokeWidth={1.75} />
                {p.location}
              </div>
              <p className="mt-0.5 text-[12px] text-adp-muted">{p.phase} · {p.progress}%</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
