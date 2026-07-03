'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Upload, MessageSquare, CheckCircle, AlertTriangle, Bot, UserPlus } from 'lucide-react'
import { MOCK_ACTIVITIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const TYPE_CFG = {
  upload:     { icon: Upload,        cls: 'text-blue-600 bg-blue-50' },
  comment:    { icon: MessageSquare, cls: 'text-slate-500 bg-slate-100' },
  validation: { icon: CheckCircle,   cls: 'text-emerald-600 bg-emerald-50' },
  clash:      { icon: AlertTriangle, cls: 'text-red-500 bg-red-50' },
  agent:      { icon: Bot,           cls: 'text-violet-600 bg-violet-50' },
  member:     { icon: UserPlus,      cls: 'text-amber-600 bg-amber-50' },
} as const

const REL_TIME = ["À l'instant", 'Il y a 1 h', 'Il y a 3 h', 'Hier', 'Il y a 2 j']

const GROUPS = [
  { label: "Aujourd'hui", indices: [0, 1, 2] },
  { label: 'Hier',        indices: [3, 4] },
]

export function RecentActivities() {
  const items = MOCK_ACTIVITIES.slice(0, 5)

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Activités récentes</h3>
        <Link
          href="/activites"
          className="text-[12px] font-medium text-adp-muted transition-colors duration-150 hover:text-adp-blue"
        >
          Voir tout
        </Link>
      </div>

      <div className="space-y-0.5 p-2">
        {GROUPS.map(({ label, indices }) => (
          <div key={label}>
            {/* Label de groupe */}
            <p className="px-2 pb-1 pt-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">{label}</p>

            {indices.map((idx) => {
              const a = items[idx]
              if (!a) return null
              const { icon: Icon, cls } = TYPE_CFG[a.type]
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.04 * idx }}
                  className="flex items-start gap-2.5 rounded-xl px-2 py-2 transition-colors duration-150 hover:bg-slate-50"
                >
                  <div className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md', cls)}>
                    <Icon className="h-2.5 w-2.5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium leading-snug text-adp-slate">{a.label}</p>
                    <p className="mt-0.5 text-[11px] text-adp-muted">
                      {a.projectName} · {REL_TIME[idx]}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
