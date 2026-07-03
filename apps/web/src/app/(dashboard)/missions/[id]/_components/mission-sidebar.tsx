'use client'

import Link from 'next/link'
import { ExternalLink, Download, FileText, Share2 } from 'lucide-react'
import type { Mission } from '@/lib/types'
import type { MockAgent, MockProject } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { SidebarPanel } from '@/components/ui/sidebar-panel'
import { useToast } from '@/components/ui/toast'

interface Props {
  mission: Mission
  agents: MockAgent[]
  project: MockProject | undefined
}

export function MissionSidebar({ mission, agents, project }: Props) {
  const { toast } = useToast()
  const done    = mission.steps.filter((s) => s.status === 'done').length
  const total   = mission.steps.length
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0
  const isDone  = mission.status === 'completed'

  return (
    <div className="space-y-3">
      {/* Progression */}
      <SidebarPanel title="Progression">
        <div className="p-4">
          <div className="flex items-end gap-2">
            <p className="text-[29px] font-bold leading-none text-adp-blue">{pct}%</p>
            <p className="mb-0.5 text-[12px] text-adp-muted">{done}/{total} étapes</p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-adp-blue transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </SidebarPanel>

      {/* Agents */}
      <SidebarPanel title="Agents mobilisés">
        <div className="divide-y divide-slate-100/80">
          {agents.map((a) => (
            <div key={a.id} className="flex items-center gap-2.5 px-4 py-2.5">
              <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold', a.colorBg, a.color)}>
                {a.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium text-adp-slate">{a.name}</p>
                <p className="truncate text-[10px] text-adp-muted">{a.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </SidebarPanel>

      {/* Exporter */}
      {isDone && (
        <div className="overflow-hidden rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4 shadow-sm">
          <p className="mb-3 text-[13px] font-semibold text-emerald-800">Résultats disponibles</p>
          <div className="space-y-2">
            <button
              onClick={() => toast('Rapport PDF en cours de génération…', 'info')}
              className="flex w-full items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-[12px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
              Exporter en PDF
            </button>
            <button
              onClick={() => toast('Rapport téléchargé — rapport_mission.docx', 'success')}
              className="flex w-full items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-[12px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
              Télécharger DOCX
            </button>
            <button
              onClick={() => toast('Lien de partage copié dans le presse-papiers !', 'success')}
              className="flex w-full items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-[12px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              <Share2 className="h-3.5 w-3.5" strokeWidth={1.75} />
              Partager
            </button>
          </div>
        </div>
      )}

      {/* Projet lié */}
      {project && (
        <SidebarPanel title="Projet">
          <div className="p-4">
            <div className="h-16 overflow-hidden rounded-lg">
              <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
            </div>
            <p className="mt-2 text-[13px] font-semibold text-adp-slate">{project.name}</p>
            <p className="text-[11px] text-adp-muted">{project.phase} · {project.progress}%</p>
            <Link
              href={`/projects/${project.id}/missions`}
              className="mt-2 flex items-center gap-1 text-[12px] font-medium text-adp-blue hover:underline"
            >
              Voir le projet
              <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
            </Link>
          </div>
        </SidebarPanel>
      )}
    </div>
  )
}
