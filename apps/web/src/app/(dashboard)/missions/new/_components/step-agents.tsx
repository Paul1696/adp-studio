'use client'

import type { MockAgent } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Props {
  agents: MockAgent[]
  value: string[]
  onChange: (ids: string[]) => void
}

export function StepAgents({ agents, value, onChange }: Props) {
  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[16px] font-bold text-adp-slate">Quels agents mobiliser ?</h2>
        <p className="mt-1 text-[14px] text-adp-muted">Sélectionnez un ou plusieurs agents spécialisés.</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {agents.map((a) => {
          const selected = value.includes(a.id)
          return (
            <button
              key={a.id}
              onClick={() => toggle(a.id)}
              className={cn(
                'flex items-start gap-3 rounded-xl border p-3 text-left transition-all duration-150',
                selected
                  ? 'border-adp-blue bg-adp-blue/5 ring-1 ring-adp-blue/30'
                  : 'border-slate-200 bg-white hover:border-adp-blue/30',
              )}
            >
              <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[16px] font-bold', a.colorBg, a.color)}>
                {a.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn('truncate text-[14px] font-semibold', selected ? 'text-adp-blue' : 'text-adp-slate')}>{a.name}</p>
                <p className="mt-0.5 truncate text-[12px] text-adp-muted">{a.specialty}</p>
              </div>
              {selected && (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-adp-blue">
                  <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                </div>
              )}
            </button>
          )
        })}
      </div>
      {value.length > 0 && (
        <p className="text-[13px] text-adp-blue">{value.length} agent{value.length > 1 ? 's' : ''} sélectionné{value.length > 1 ? 's' : ''}</p>
      )}
    </div>
  )
}
