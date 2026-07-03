import type { Metadata } from 'next'
import { FileText, Share2, Upload, Box, HardDrive, Plus } from 'lucide-react'
import { MOCK_DOCUMENTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'
import { DocumentsClient } from './_components/documents-client'

export const metadata: Metadata = { title: 'Documents' }

const STATS = [
  { icon: FileText,  label: 'Total docs',    value: '86',     sub: 'Tous projets',   iconColor: 'text-adp-blue',    iconBg: 'bg-blue-50' },
  { icon: Share2,    label: 'Partagés',      value: '24',     sub: "Avec l'équipe",  iconColor: 'text-violet-600',  iconBg: 'bg-violet-50' },
  { icon: Upload,    label: 'Importés',      value: '128',    sub: 'Ce mois',        iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
  { icon: Box,       label: 'Fichiers BIM',  value: '42',     sub: 'IFC, RVT, DWG', iconColor: 'text-orange-600',  iconBg: 'bg-orange-50' },
  { icon: HardDrive, label: 'Taille totale', value: '284 Go', sub: '57% utilisé',   iconColor: 'text-rose-600',    iconBg: 'bg-rose-50' },
]

const TYPE_COLOR: Record<string, string> = {
  DWG:  'text-blue-600 bg-blue-50',
  IFC:  'text-violet-600 bg-violet-50',
  PDF:  'text-red-500 bg-red-50',
  RVT:  'text-orange-600 bg-orange-50',
  XLSX: 'text-emerald-600 bg-emerald-50',
  DOCX: 'text-sky-600 bg-sky-50',
}

export default function DocumentsPage() {
  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Documents"
          description="Organisez, consultez et partagez tous les documents de vos projets."
          action={
            <button className="flex items-center gap-2 rounded-xl bg-adp-blue px-4 py-2 text-[14px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-md">
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Ajouter
            </button>
          }
        />

        <div className="grid grid-cols-5 gap-3">
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        <DocumentsClient documents={MOCK_DOCUMENTS} />
      </div>

      {/* ── Sidebar ── */}
      <div className="w-56 shrink-0 space-y-3">

        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Filtres</h3>
          </div>
          <div className="space-y-4 p-4">
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-adp-muted">Type</p>
              <div className="space-y-1">
                {['DWG', 'IFC', 'PDF', 'RVT', 'XLSX', 'DOCX'].map((t) => (
                  <label key={t} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1 transition-colors duration-150 hover:bg-slate-50">
                    <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-adp-blue" />
                    <span className="text-[13px] text-adp-slate">{t}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-adp-muted">Statut</p>
              <div className="space-y-1">
                {['Validé', 'En révision', 'Archivé'].map((s) => (
                  <label key={s} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1 transition-colors duration-150 hover:bg-slate-50">
                    <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-adp-blue" />
                    <span className="text-[13px] text-adp-slate">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Documents récents</h3>
          </div>
          <div className="divide-y divide-slate-100/80">
            {MOCK_DOCUMENTS.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center gap-2.5 px-4 py-2.5 transition-colors duration-150 hover:bg-slate-50">
                <div className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold', TYPE_COLOR[d.type] ?? 'text-slate-500 bg-slate-100')}>
                  {d.type}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-adp-slate">{d.name}</p>
                  <p className="text-[11px] text-adp-muted">{d.size} · {d.version}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
