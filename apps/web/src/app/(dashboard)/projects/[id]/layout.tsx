import { notFound } from 'next/navigation'
import { Calendar, Maximize2, Banknote, Info } from 'lucide-react'
import { MOCK_PROJECTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { ProjectTabs } from './_components/project-tabs'
import { ProjectImage } from '@/components/ui/project-image'

interface ProjectLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { id } = await params
  const project = MOCK_PROJECTS.find((p) => p.id === id)
  if (!project) notFound()

  const statusCfg = {
    en_cours: 'bg-emerald-100 text-emerald-700',
    en_pause: 'bg-orange-100 text-orange-700',
    termine:  'bg-blue-100 text-blue-700',
    archive:  'bg-slate-100 text-slate-600',
  }[project.status]

  return (
    <div className="space-y-0">
      {/* ── Header projet ── */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        {/* Bandeau photo */}
        <div className="relative h-32 overflow-hidden bg-slate-200">
          <ProjectImage
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Info projet flottant */}
          <div className="absolute bottom-3 left-4 flex items-end gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-xl border-2 border-white shadow-md">
              <ProjectImage src={project.image} alt={project.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white">{project.name}</h1>
                <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', statusCfg)}>
                  {project.statusLabel}
                </span>
              </div>
              <p className="text-xs text-white/80">{project.type} · {project.location}</p>
            </div>
          </div>
          {/* Bouton info */}
          <button className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/20 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/30">
            <Info className="h-3.5 w-3.5" />
            Informations du projet
          </button>
        </div>

        {/* Stats + tabs */}
        <div className="px-5">
          {/* Métriques */}
          <div className="flex items-center gap-6 border-b border-slate-200/80 py-3 text-xs">
            <div className="flex items-center gap-1.5 text-adp-muted">
              <span className="font-semibold text-adp-blue">{project.reference}</span>
              <span>·</span>
              <span>{project.type}</span>
            </div>
            <div className="flex items-center gap-1 text-adp-muted">
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="font-semibold text-adp-slate">{project.surface.toLocaleString('fr-FR')} m²</span>
            </div>
            <div className="flex items-center gap-1 text-adp-muted">
              <Banknote className="h-3.5 w-3.5" />
              <span className="font-semibold text-adp-slate">{project.budget}</span>
            </div>
            <div className="flex items-center gap-1 text-adp-muted">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-semibold text-adp-slate">{project.startDate}</span>
            </div>
            <div className="text-adp-muted">→</div>
            <div className="flex items-center gap-1 text-adp-muted">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-semibold text-adp-slate">{project.endDate}</span>
            </div>
            {/* Progression globale */}
            <div className="ml-auto flex items-center gap-2">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-adp-blue" style={{ width: `${project.progress}%` }} />
              </div>
              <span className="font-semibold text-adp-blue">{project.progress}%</span>
            </div>
          </div>

          {/* Tabs */}
          <ProjectTabs id={id} />
        </div>
      </div>

      {/* ── Contenu page ── */}
      <div className="pt-4">{children}</div>
    </div>
  )
}
