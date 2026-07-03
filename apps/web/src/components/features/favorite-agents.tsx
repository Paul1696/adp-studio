'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Clock, Zap } from 'lucide-react'
import { MOCK_AGENTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const LAST_USED = ['Il y a 2 h', 'Hier', 'Il y a 3 j', 'Il y a 1 sem.', 'Il y a 2 sem.']

export function FavoriteAgents() {
  const top = MOCK_AGENTS.slice(0, 5)

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Agents favoris</h3>
        <Link
          href="/agents"
          className="flex items-center gap-1 text-[12px] font-medium text-adp-muted transition-colors duration-150 hover:text-adp-blue"
        >
          Voir tout
          <ExternalLink className="h-2.5 w-2.5" strokeWidth={2} />
        </Link>
      </div>

      {/* Liste */}
      <div className="divide-y divide-slate-100/80">
        {top.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 + i * 0.05 }}
            className="group flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 hover:bg-slate-50/80"
          >
            {/* Avatar */}
            <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold', agent.colorBg, agent.color)}>
              {agent.icon}
            </div>

            {/* Infos */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold leading-snug text-adp-slate">{agent.name}</p>
              <div className="mt-0.5 flex items-center gap-2 text-[11px] text-adp-muted">
                <span className="flex items-center gap-0.5">
                  <Clock className="h-2 w-2" strokeWidth={2} />
                  {LAST_USED[i]}
                </span>
                <span className="flex items-center gap-0.5 text-emerald-600">
                  <Zap className="h-2 w-2" strokeWidth={2} />
                  Actif
                </span>
              </div>
            </div>

            {/* Action */}
            <Link
              href={`/agents/${agent.id}`}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-adp-muted opacity-0 transition-all duration-150 group-hover:opacity-100 hover:border-adp-blue hover:text-adp-blue"
            >
              <ExternalLink className="h-3 w-3" strokeWidth={2} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
