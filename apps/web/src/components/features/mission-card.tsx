'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'

const AGENTS = [
  'ADP Architecte',
  'ADP BIM Manager',
  'ADP QuantBIM',
  'ADP Documentation',
]

export function MissionCard() {
  const router  = useRouter()
  const [text, setText] = useState('')

  const handleLaunch = () => {
    const qs = text.trim() ? `?objectif=${encodeURIComponent(text.trim())}` : ''
    router.push(`/missions/new${qs}`)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim()) handleLaunch()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-adp-slate via-[#1a2d5a] to-[#0f1f45] shadow-lg"
    >
      {/* Décorations lumineuses */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-adp-blue/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-48 -translate-x-1/2 rounded-full bg-blue-400/10 blur-2xl" />

      <div className="relative flex items-center gap-0 px-6 py-4">

        {/* ① Label + titre (25%) */}
        <div className="w-[25%] shrink-0 space-y-1 pr-6">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-blue-300" strokeWidth={2} />
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-300/90">Fonctionnalité signature</p>
          </div>
          <h2 className="text-[17px] font-bold leading-tight text-white">Mission IA</h2>
          <p className="text-[12px] leading-relaxed text-blue-100/60">
            Décrivez votre objectif. Les agents collaborent automatiquement.
          </p>
        </div>

        {/* Divider */}
        <div className="h-14 w-px shrink-0 bg-white/10" />

        {/* ② Agents disponibles (30%) */}
        <div className="w-[30%] shrink-0 px-6">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/30">Agents actifs</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {AGENTS.map((agent, i) => (
              <motion.div
                key={agent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-center gap-1.5"
              >
                <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-400" strokeWidth={2} />
                <span className="truncate text-[12px] font-medium text-white/80">{agent}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-14 w-px shrink-0 bg-white/10" />

        {/* ③ Champ + bouton (45%) */}
        <div className="flex flex-1 items-center gap-3 pl-6">
          <div className="relative flex-1">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Décrivez votre mission…"
              className="w-full rounded-xl border border-white/10 bg-white/8 px-3.5 py-2.5 text-[14px] text-white outline-none placeholder:text-white/25 transition-all duration-150 focus:border-adp-blue/50 focus:bg-white/12 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]"
            />
          </div>
          <button
            onClick={handleLaunch}
            className="group flex shrink-0 items-center gap-2 rounded-xl bg-adp-blue px-4 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-adp-blue/30 transition-all duration-150 hover:bg-blue-500 hover:shadow-adp-blue/40 disabled:opacity-40 whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            Lancer une mission
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
