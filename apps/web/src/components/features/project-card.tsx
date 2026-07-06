'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Maximize2, Banknote, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProjectImage } from '@/components/ui/project-image'
import type { MockProject } from '@/lib/mock-data'

interface ProjectCardProps {
  project: MockProject
  members: string[]
  delay?: number
  index?: number
}

const AVATAR_COLORS = ['bg-adp-blue', 'bg-violet-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-rose-500']

function memberInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || '?'
}

const STATUS_CFG = {
  en_cours: { label: 'En cours', cls: 'bg-emerald-500/90 text-white' },
  en_pause:  { label: 'En pause', cls: 'bg-amber-500/90 text-white' },
  termine:   { label: 'Terminé',  cls: 'bg-blue-500/90 text-white' },
  archive:   { label: 'Archivé', cls: 'bg-slate-500/90 text-white' },
}

const PHASES = ['ESQ', 'APS', 'APD', 'PRO', 'DCE', 'EXE', 'RCE']

const PHASE_CFG: Record<string, string> = {
  ESQ: 'bg-slate-700',
  APS: 'bg-violet-600',
  APD: 'bg-blue-600',
  PRO: 'bg-adp-blue',
  DCE: 'bg-orange-500',
  EXE: 'bg-emerald-600',
  RCE: 'bg-teal-600',
}

export function ProjectCard({ project: p, members, delay = 0, index = 0 }: ProjectCardProps) {
  const status = STATUS_CFG[p.status]!
  const phaseBg = PHASE_CFG[p.apdStage] ?? 'bg-slate-600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60"
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-slate-100">
        <ProjectImage
          src={p.image}
          alt={p.name}
          index={index}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {/* Overlay gradient permanent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        {/* Overlay hover — séquence des phases */}
        <div className="absolute inset-0 flex flex-col justify-end bg-black/75 px-3 pb-3 pt-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/50">Phases du projet</p>
          <div className="flex items-center gap-1">
            {PHASES.map((ph) => {
              const currentIdx = PHASES.indexOf(p.apdStage)
              const phIdx      = PHASES.indexOf(ph)
              const isDone     = phIdx < currentIdx
              const isCurrent  = ph === p.apdStage
              return (
                <div key={ph} className="flex flex-1 flex-col items-center gap-1">
                  <div className={cn(
                    'h-1 w-full rounded-full transition-colors',
                    isDone   ? 'bg-emerald-400'  :
                    isCurrent? 'bg-adp-blue'      :
                               'bg-white/20'
                  )} />
                  <span className={cn(
                    'text-[9px] font-bold',
                    isCurrent ? 'text-adp-blue' : isDone ? 'text-emerald-400' : 'text-white/35'
                  )}>
                    {ph}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="mt-2.5 text-[11px] text-white/60">
            Phase <span className="font-bold text-white">{PHASES.indexOf(p.apdStage) + 1}</span>/{PHASES.length} ·
            {' '}<span className="font-bold text-white">{p.startDate}</span> → <span className="font-bold text-white">{p.endDate}</span>
          </p>
        </div>

        {/* Badges top */}
        <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
          <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-bold text-white shadow-sm', phaseBg)}>
            {p.apdStage}
          </span>
        </div>
        <div className="absolute right-2.5 top-2.5">
          <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-semibold shadow-sm', status.cls)}>
            {status.label}
          </span>
        </div>

        {/* Titre + lieu sur l'image */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <p className="text-[15px] font-bold leading-tight text-white drop-shadow-sm">{p.name}</p>
          <div className="mt-0.5 flex items-center gap-1 text-[12px] text-white/70">
            <MapPin className="h-2.5 w-2.5 shrink-0" strokeWidth={2} />
            {p.location}
          </div>
        </div>
      </div>

      {/* Corps */}
      <div className="p-3">
        {/* Métriques */}
        <div className="mb-2.5 flex items-center gap-4 text-[13px]">
          <div className="flex items-center gap-1 text-adp-muted">
            <Maximize2 className="h-3 w-3 shrink-0" strokeWidth={1.75} />
            <span className="font-semibold text-adp-slate">{p.surface.toLocaleString('fr-FR')} m²</span>
          </div>
          <div className="flex items-center gap-1 text-adp-muted">
            <Banknote className="h-3 w-3 shrink-0" strokeWidth={1.75} />
            <span className="font-semibold text-adp-slate">{p.budget}</span>
          </div>
        </div>

        {/* Progression */}
        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[12px] text-adp-muted">Progression</span>
            <span className="text-[13px] font-bold text-adp-blue">{p.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${p.progress}%` }}
              transition={{ delay: delay + 0.25, duration: 0.7, ease: 'easeOut' }}
              className={cn('h-full rounded-full', p.progress === 100 ? 'bg-emerald-500' : 'bg-adp-blue')}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Avatars */}
          <div className="flex -space-x-1.5">
            {members.slice(0, 4).map((name, i) => (
              <div
                key={`${name}-${i}`}
                title={name}
                className={cn('flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white shadow-sm', AVATAR_COLORS[i % AVATAR_COLORS.length])}
              >
                {memberInitials(name)}
              </div>
            ))}
            {members.length > 4 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[8px] font-bold text-slate-500">
                +{members.length - 4}
              </div>
            )}
          </div>

          <Link
            href={`/projects/${p.id}`}
            className="flex items-center gap-1.5 rounded-lg bg-adp-blue px-3 py-1.5 text-[13px] font-semibold text-white transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-sm"
          >
            Ouvrir
            <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
