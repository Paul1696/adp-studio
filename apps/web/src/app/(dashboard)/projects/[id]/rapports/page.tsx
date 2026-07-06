import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FileText, Download, Plus, Bot, BarChart3, FileCheck, MessageSquare } from 'lucide-react'
import { getProject } from '@/lib/data/projects'
import type { Report } from '@/lib/types'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { SidebarPanel } from '@/components/ui/sidebar-panel'
import { EmptyState } from '@/components/ui/empty-state'

export const metadata: Metadata = { title: 'Rapports' }
export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }> }

const TYPE_CFG: Record<Report['type'], { label: string; icon: typeof FileText; color: string; bg: string }> = {
  phase:        { label: 'Rapport de phase',  icon: FileCheck,     color: 'text-adp-blue',    bg: 'bg-blue-50' },
  compte_rendu: { label: 'Compte-rendu',      icon: MessageSquare, color: 'text-violet-600',  bg: 'bg-violet-50' },
  note_technique:{ label: 'Note technique',   icon: FileText,      color: 'text-emerald-600', bg: 'bg-emerald-50' },
  mission_ia:   { label: 'Mission IA',        icon: Bot,           color: 'text-amber-600',   bg: 'bg-amber-50' },
  budget:       { label: 'Budget',            icon: BarChart3,     color: 'text-rose-600',    bg: 'bg-rose-50' },
}

const STATUS_CFG: Record<Report['status'], { cls: string }> = {
  draft:  { cls: 'bg-slate-100 text-slate-600' },
  final:  { cls: 'bg-emerald-100 text-emerald-700' },
  shared: { cls: 'bg-blue-100 text-blue-700' },
}

const TEMPLATES = [
  'Rapport de phase',
  'Compte-rendu de réunion',
  'Note technique',
  'Point budgétaire',
  'Rapport Mission IA',
]

export default async function RapportsPage({ params }: Props) {
  const { id } = await params
  const result = await getProject(id)
  if (!result) notFound()
  const project = result.ui

  // Pas de modèle rapport en base pour l'instant — état vide honnête.
  const reports: Report[] = []

  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Rapports"
          description={`Documents produits — ${project.name}`}
          action={
            <button className="flex items-center gap-2 rounded-xl bg-adp-blue px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-md">
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Générer un rapport
            </button>
          }
        />

        {reports.length === 0 ? (
          <EmptyState icon={FileText} title="Aucun rapport" description="Aucun rapport n'a encore été généré pour ce projet." />
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  {['Type', 'Titre', 'Auteur', 'Pages', 'Statut', 'Date', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-adp-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((r) => {
                  const cfg = TYPE_CFG[r.type]
                  const Icon = cfg.icon
                  return (
                    <tr key={r.id} className="transition-colors duration-100 hover:bg-slate-50/80">
                      <td className="px-4 py-3">
                        <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', cfg.bg)}>
                          <Icon className={cn('h-3.5 w-3.5', cfg.color)} strokeWidth={1.75} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[13px] font-medium text-adp-slate">{r.title}</p>
                        <p className="text-[11px] text-adp-muted">{cfg.label}</p>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-adp-muted">{r.author}</td>
                      <td className="px-4 py-3 text-[12px] text-adp-muted">{r.pages} p.</td>
                      <td className="px-4 py-3">
                        <span className={cn('rounded-md px-2 py-0.5 text-[11px] font-semibold', STATUS_CFG[r.status].cls)}>
                          {r.statusLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-adp-muted">{r.createdAt}</td>
                      <td className="px-4 py-3">
                        <button className="rounded-lg p-1.5 text-adp-muted transition-colors duration-150 hover:bg-slate-100 hover:text-adp-slate">
                          <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="w-56 shrink-0 space-y-3">
        <SidebarPanel title="Modèles disponibles">
          <div className="divide-y divide-slate-100/80">
            {TEMPLATES.map((t) => (
              <button key={t} className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors duration-150 hover:bg-slate-50">
                <span className="text-[12px] text-adp-muted">{t}</span>
                <Plus className="h-3 w-3 text-slate-300" strokeWidth={2} />
              </button>
            ))}
          </div>
        </SidebarPanel>
      </div>
    </div>
  )
}
