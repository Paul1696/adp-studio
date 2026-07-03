import { notFound } from 'next/navigation'
import { Info, Layers, Bell, Shield, Trash2, Save } from 'lucide-react'
import { MOCK_PROJECTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface Props { params: Promise<{ id: string }> }

const NAV_SECTIONS = [
  { icon: Info,   label: 'Général',          active: true },
  { icon: Layers, label: 'Phases & Formats',  active: false },
  { icon: Bell,   label: 'Notifications',     active: false },
  { icon: Shield, label: 'Suppressions',      active: false },
]

export default async function ProjectParametresPage({ params }: Props) {
  const { id } = await params
  const project = MOCK_PROJECTS.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <div className="flex gap-5">
      {/* ── Nav sections ── */}
      <div className="w-44 shrink-0">
        <div className="rounded-xl border border-slate-200/80 bg-white p-2 shadow-sm">
          {NAV_SECTIONS.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors',
                active ? 'bg-adp-blue-light text-adp-blue' : 'text-adp-muted hover:bg-slate-50 hover:text-adp-slate'
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </button>
          ))}
          <div className="my-1 border-t border-slate-200/80" />
          <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-500 hover:bg-red-50">
            <Trash2 className="h-3.5 w-3.5 shrink-0" />
            Supprimer le projet
          </button>
        </div>
      </div>

      {/* ── Formulaire ── */}
      <div className="min-w-0 flex-1 space-y-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-adp-slate">Informations générales</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Nom du projet',    value: project.name,      span: 2 },
              { label: 'Code du projet',   value: project.reference, span: 1 },
              { label: 'Type de projet',   value: project.type,      span: 1 },
              { label: 'Phase actuelle',   value: project.phase,     span: 1 },
              { label: 'Date de début',    value: project.startDate, span: 1 },
              { label: 'Date de fin',      value: project.endDate,   span: 1 },
              { label: 'Surface (m²)',     value: String(project.surface), span: 1 },
            ].map(({ label, value, span }) => (
              <div key={label} className={span === 2 ? 'col-span-2' : ''}>
                <label className="mb-1 block text-xs font-medium text-adp-muted">{label}</label>
                <input
                  defaultValue={value}
                  className="w-full rounded-lg border border-slate-200/80 bg-adp-surface px-3 py-2 text-xs text-adp-slate outline-none focus:border-adp-blue focus:ring-1 focus:ring-adp-blue/20"
                />
              </div>
            ))}
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-adp-muted">Description</label>
              <textarea
                rows={3}
                defaultValue={project.description}
                className="w-full rounded-lg border border-slate-200/80 bg-adp-surface px-3 py-2 text-xs text-adp-slate outline-none focus:border-adp-blue focus:ring-1 focus:ring-adp-blue/20"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="flex items-center gap-1.5 rounded-lg bg-adp-blue px-4 py-2 text-xs font-semibold text-white hover:bg-adp-blue-dark">
              <Save className="h-3.5 w-3.5" /> Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>

      {/* ── Résumé ── */}
      <div className="w-52 shrink-0 space-y-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-adp-muted">Résumé du projet</h3>
          <div className="space-y-2 text-xs">
            {[
              { label: 'Membres',     value: `${project.members.length} personnes` },
              { label: 'Documents',   value: '24 fichiers' },
              { label: 'Progression', value: `${project.progress}%` },
              { label: 'Budget',      value: project.budget },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-adp-muted">{label}</span>
                <span className="font-semibold text-adp-slate">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-adp-muted">Besoin d&apos;aide ?</h3>
          <p className="text-[12px] leading-snug text-adp-muted">Consultez la documentation ou contactez le support ADP Studio.</p>
          <button className="mt-2 text-xs font-medium text-adp-blue hover:underline">Voir la documentation →</button>
        </div>
      </div>
    </div>
  )
}
