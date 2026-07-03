'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FolderKanban, FileText, Bot, Clock, ArrowRight } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { MOCK_PROJECTS } from '@/lib/mock-data'

const STATS = [
  { icon: FolderKanban, label: 'projets actifs',        value: 4,  color: 'text-adp-blue',    bg: 'bg-blue-50' },
  { icon: FileText,     label: 'documents ajoutés',     value: 18, color: 'text-violet-600',  bg: 'bg-violet-50' },
  { icon: Bot,          label: 'analyses IA terminées', value: 3,  color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Clock,        label: 'tâches en attente',     value: 7,  color: 'text-amber-600',   bg: 'bg-amber-50' },
]

const lastProject = MOCK_PROJECTS[0]!

export function HeroDashboard() {
  const { user } = useUser()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'
  const firstName = user?.firstName ?? user?.emailAddresses[0]?.emailAddress.split('@')[0] ?? 'vous'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
    >
      {/* Fond dégradé décoratif */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-white" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-adp-blue/5 blur-3xl" />

      <div className="relative px-6 py-5">
        {/* En-tête */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="mb-0.5 text-[12px] font-medium uppercase tracking-widest text-adp-muted">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <h1 className="text-[22px] font-bold leading-tight text-adp-slate">
              {greeting}, {firstName} 👋
            </h1>
            <p className="mt-0.5 text-[14px] text-adp-muted">
              Bienvenue sur <span className="font-semibold text-adp-blue">ADP Studio</span>
            </p>
          </div>

          <Link
            href={`/projects/${lastProject.id}`}
            className="group flex shrink-0 flex-col gap-2 rounded-xl border border-adp-blue/25 bg-adp-blue-light px-4 py-3 transition-all duration-150 hover:border-adp-blue hover:bg-adp-blue hover:shadow-md hover:shadow-adp-blue/20"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-adp-blue/15 px-1.5 py-0.5 text-[11px] font-bold text-adp-blue group-hover:bg-white/20 group-hover:text-white">
                {lastProject.phase}
              </span>
              <span className="text-[13px] font-semibold text-adp-blue group-hover:text-white">
                {lastProject.name}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-adp-blue transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-white" />
            </div>
            {/* Barre de progression */}
            <div className="w-full">
              <div className="mb-1 flex items-center justify-between text-[11px] text-adp-blue/70 group-hover:text-white/70">
                <span>Avancement</span>
                <span className="font-bold text-adp-blue group-hover:text-white">{lastProject.progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-adp-blue/15 group-hover:bg-white/20">
                <div
                  className="h-full rounded-full bg-adp-blue transition-all duration-500 group-hover:bg-white"
                  style={{ width: `${lastProject.progress}%` }}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Statistiques */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {STATS.map(({ icon: Icon, label, value, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 transition-all duration-150 hover:border-slate-200 hover:bg-white hover:shadow-sm"
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div>
                <p className="text-[20px] font-bold leading-none text-adp-slate">{value}</p>
                <p className="mt-0.5 text-[12px] leading-tight text-adp-muted">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
