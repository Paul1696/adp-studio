'use client'

import { User, Bot, Settings, FileText, Bell, Shield, Plug, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SettingsTab =
  | 'profil'
  | 'agents'
  | 'general'
  | 'documents'
  | 'notifications'
  | 'securite'
  | 'integrations'
  | 'facturation'

const NAV_ITEMS: { id: SettingsTab; icon: React.ElementType; label: string }[] = [
  { id: 'profil',        icon: User,       label: 'Profil & Équipe' },
  { id: 'agents',        icon: Bot,        label: 'Agent IA' },
  { id: 'general',       icon: Settings,   label: 'Général' },
  { id: 'documents',     icon: FileText,   label: 'Documents' },
  { id: 'notifications', icon: Bell,       label: 'Notifications' },
  { id: 'securite',      icon: Shield,     label: 'Sécurité' },
  { id: 'integrations',  icon: Plug,       label: 'Intégrations' },
  { id: 'facturation',   icon: CreditCard, label: 'Facturation' },
]

interface SettingsNavProps {
  active: SettingsTab
  onChange: (tab: SettingsTab) => void
}

export function SettingsNav({ active, onChange }: SettingsNavProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3">
        <p className="text-[12px] font-semibold uppercase tracking-widest text-adp-muted">
          Configuration
        </p>
      </div>
      <div className="p-1.5">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[14px] font-medium transition-colors duration-150',
              active === id
                ? 'bg-adp-blue/10 font-semibold text-adp-blue'
                : 'text-adp-muted hover:bg-slate-50 hover:text-adp-slate'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
