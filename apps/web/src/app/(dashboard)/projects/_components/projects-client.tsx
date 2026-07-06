'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutGrid, List, ChevronDown, Plus, FolderPlus, FolderKanban } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { ProjectImage } from '@/components/ui/project-image'
import type { MockProject } from '@/lib/mock-data'

// ── Types ────────────────────────────────────────────────

export interface ProjectsClientProps {
  projects: MockProject[]
  onNewProject?: () => void
}

// Avatars dérivés des noms réels des membres
const AVATAR_COLORS = ['bg-adp-blue', 'bg-violet-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-rose-500']

function memberInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || '?'
}

function MemberAvatars({ names, max }: { names: string[]; max: number }) {
  return (
    <div className="flex -space-x-1.5">
      {names.slice(0, max).map((name, i) => (
        <div key={`${name}-${i}`} title={name} className={cn('flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white shadow-sm', AVATAR_COLORS[i % AVATAR_COLORS.length])}>
          {memberInitials(name)}
        </div>
      ))}
      {names.length > max && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[8px] font-bold text-slate-500">
          +{names.length - max}
        </div>
      )}
    </div>
  )
}

// ── Constantes ───────────────────────────────────────────

const STATUS_CFG = {
  en_cours: { label: 'En cours', cls: 'bg-emerald-500 text-white' },
  en_pause: { label: 'En pause', cls: 'bg-amber-500 text-white' },
  termine:  { label: 'Terminé',  cls: 'bg-blue-500 text-white' },
  archive:  { label: 'Archivé', cls: 'bg-slate-400 text-white' },
} as const

const PHASE_CFG: Record<string, string> = {
  ESQ: 'bg-slate-700',
  APS: 'bg-violet-600',
  APD: 'bg-blue-600',
  PRO: 'bg-adp-blue',
  DCE: 'bg-orange-500',
  EXE: 'bg-emerald-600',
  RCE: 'bg-teal-600',
}

const TABS = [
  { label: 'Tous',      filter: null         },
  { label: 'En cours',  filter: 'en_cours'   },
  { label: 'En pause',  filter: 'en_pause'   },
  { label: 'Terminés',  filter: 'termine'    },
  { label: 'Archivés',  filter: 'archive'    },
] as const

// ── Composant principal ──────────────────────────────────

export function ProjectsClient({ projects, onNewProject }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = activeFilter
    ? projects.filter((p) => p.status === activeFilter)
    : projects

  const count = (filter: string | null) =>
    filter ? projects.filter((p) => p.status === filter).length : projects.length

  return (
    <div className="space-y-0">
      {/* ── Barre onglets + contrôles ── */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex gap-0">
          {TABS.map(({ label, filter }) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={label}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-[14px] font-medium transition-colors duration-150',
                  isActive
                    ? 'border-adp-blue text-adp-blue'
                    : 'border-transparent text-adp-muted hover:text-adp-slate'
                )}
              >
                {label}
                <span className={cn(
                  'rounded-full px-1.5 py-0.5 text-[12px] font-semibold',
                  isActive ? 'bg-adp-blue/10 text-adp-blue' : 'bg-slate-100 text-adp-muted'
                )}>
                  {count(filter)}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mb-0.5 flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              onClick={() => setView('grid')}
              className={cn('rounded-md p-1.5 transition-colors duration-150', view === 'grid' ? 'bg-adp-blue text-white' : 'text-adp-muted hover:text-adp-slate')}
            >
              <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn('rounded-md p-1.5 transition-colors duration-150', view === 'list' ? 'bg-adp-blue text-white' : 'text-adp-muted hover:text-adp-slate')}
            >
              <List className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-adp-muted transition-colors duration-150 hover:text-adp-slate">
            Trier par : Récent <ChevronDown className="h-3 w-3" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ── Contenu ── */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="Aucun projet dans cette catégorie"
          description="Essayez un autre filtre ou créez un nouveau projet."
          className="mt-4"
          action={
            <button
              onClick={() => setActiveFilter(null)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-[14px] font-medium text-adp-muted hover:text-adp-slate"
            >
              Voir tous les projets
            </button>
          }
        />
      ) : view === 'grid' ? (
        <GridView projects={filtered} {...(onNewProject ? { onNewProject } : {})} />
      ) : (
        <ListView projects={filtered} />
      )}
    </div>
  )
}

// ── ListView ─────────────────────────────────────────────

function ListView({ projects }: ViewProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            {['Projet', 'Phase', 'Statut', 'Progression', 'Équipe', ''].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-widest text-adp-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {projects.map((p) => {
            const statusCfg = STATUS_CFG[p.status]
            const phaseCls  = PHASE_CFG[p.apdStage] ?? 'bg-slate-600'
            return (
              <tr key={p.id} className="group transition-colors duration-100 hover:bg-slate-50/80">
                {/* Nom */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <ProjectImage src={p.image} alt={p.name} index={projects.indexOf(p)} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-adp-slate group-hover:text-adp-blue">{p.name}</p>
                      <p className="text-[12px] text-adp-muted">{p.location}</p>
                    </div>
                  </div>
                </td>
                {/* Phase */}
                <td className="px-4 py-3">
                  <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-bold text-white', phaseCls)}>
                    {p.apdStage}
                  </span>
                </td>
                {/* Statut */}
                <td className="px-4 py-3">
                  <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-semibold', statusCfg.cls)}>
                    {statusCfg.label}
                  </span>
                </td>
                {/* Progression */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={cn('h-full rounded-full', p.progress === 100 ? 'bg-emerald-500' : 'bg-adp-blue')}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-[13px] font-semibold text-adp-blue">{p.progress}%</span>
                  </div>
                </td>
                {/* Équipe */}
                <td className="px-4 py-3">
                  <MemberAvatars names={p.members} max={3} />
                </td>
                {/* Action */}
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/projects/${p.id}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-semibold text-adp-slate transition-all duration-150 hover:border-adp-blue hover:bg-adp-blue hover:text-white"
                  >
                    Ouvrir →
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ── GridView ─────────────────────────────────────────────

type ViewProps = { projects: MockProject[]; onNewProject?: () => void }

function GridView({ projects, onNewProject }: ViewProps) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      {projects.map((p) => {
        const statusCfg = STATUS_CFG[p.status]
        const phaseCls  = PHASE_CFG[p.apdStage] ?? 'bg-slate-600'
        return (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="group overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Photo */}
            <div className="relative h-40 overflow-hidden bg-slate-100">
              <ProjectImage src={p.image} alt={p.name} index={projects.indexOf(p)} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              <div className="absolute left-2.5 top-2.5">
                <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-bold text-white shadow-sm', phaseCls)}>{p.apdStage}</span>
              </div>
              <div className="absolute right-2.5 top-2.5">
                <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-semibold shadow-sm', statusCfg.cls)}>{statusCfg.label}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5">
                <p className="text-[15px] font-bold leading-tight text-white drop-shadow-sm">{p.name}</p>
                <p className="mt-0.5 text-[12px] text-white/70">{p.location}</p>
              </div>
            </div>

            {/* Corps */}
            <div className="p-3">
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <p className="text-[13px] text-adp-muted">{p.type}</p>
                <span className="shrink-0 rounded-md bg-adp-blue-light px-2 py-0.5 text-[12px] font-semibold text-adp-blue">{p.reference}</span>
              </div>
              <div className="mb-2.5 flex items-center gap-4 text-[13px]">
                <span className="font-semibold text-adp-slate">{p.surface.toLocaleString('fr-FR')} m²</span>
                <div className="h-3 w-px bg-slate-200" />
                <span className="font-semibold text-adp-slate">{p.budget}</span>
              </div>
              <div className="mb-3">
                <div className="mb-1.5 flex items-center justify-between text-[13px]">
                  <span className="text-adp-muted">Progression</span>
                  <span className="font-bold text-adp-blue">{p.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={cn('h-full rounded-full transition-all', p.progress === 100 ? 'bg-emerald-500' : 'bg-adp-blue')} style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <MemberAvatars names={p.members} max={4} />
                <span className="flex items-center gap-1 rounded-lg bg-adp-blue px-3 py-1.5 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-adp-blue-dark">
                  Ouvrir →
                </span>
              </div>
            </div>
          </Link>
        )
      })}

      {/* Card Nouveau projet */}
      <button onClick={onNewProject} className="group flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white p-6 text-center transition-all duration-150 hover:border-adp-blue/50 hover:bg-adp-blue-light/50">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-150 group-hover:bg-adp-blue/10">
          <FolderPlus className="h-5 w-5 text-adp-muted transition-colors duration-150 group-hover:text-adp-blue" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-[15px] font-semibold text-adp-muted transition-colors duration-150 group-hover:text-adp-blue">Nouveau projet</p>
          <p className="mt-1 text-[13px] leading-relaxed text-adp-muted/60">Créez un projet et<br />invitez votre équipe.</p>
        </div>
      </button>
    </div>
  )
}
