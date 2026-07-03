import { FileText, Share2, Upload, Box, HardDrive, Download, MoreHorizontal, Search, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOCK_DOCUMENTS } from '@/lib/mock-data'

interface Props { params: Promise<{ id: string }> }

const STATS = [
  { icon: FileText,  label: 'Total docs',  value: '24',      color: 'text-blue-500 bg-blue-50' },
  { icon: Share2,    label: 'Partagés',    value: '8',       color: 'text-violet-500 bg-violet-50' },
  { icon: Upload,    label: 'Importés',    value: '36',      color: 'text-emerald-500 bg-emerald-50' },
  { icon: Box,       label: 'Fichiers BIM', value: '12',     color: 'text-orange-500 bg-orange-50' },
  { icon: HardDrive, label: 'Taille totale', value: '124,6 Go', color: 'text-pink-500 bg-pink-50' },
]

export default async function ProjectDocumentsPage({ params }: Props) {
  const { id } = await params
  const docs = MOCK_DOCUMENTS.filter((d) => d.projectId === id)

  return (
    <div className="flex gap-5">
      {/* ── Contenu principal ── */}
      <div className="min-w-0 flex-1 space-y-4">

        {/* Stats */}
        <div className="grid grid-cols-5 gap-3">
          {STATS.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm font-bold text-adp-slate">{value}</p>
                <p className="text-[11px] text-adp-muted">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Table documents ── */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-adp-surface px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-adp-muted" />
              <input placeholder="Rechercher un document..." className="bg-transparent text-xs outline-none placeholder:text-adp-muted/70 w-48" />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-adp-muted hover:text-adp-slate">
                <Upload className="h-3.5 w-3.5" /> Importer
              </button>
              <button className="flex items-center gap-1.5 rounded-lg bg-adp-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-adp-blue-dark">
                <Plus className="h-3.5 w-3.5" /> Nouveau dossier
              </button>
            </div>
          </div>

          {/* Thead */}
          <table className="w-full text-xs">
            <thead className="border-b border-slate-200/80 bg-adp-surface">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-adp-muted">Nom</th>
                <th className="px-3 py-2.5 text-left font-semibold text-adp-muted">Type</th>
                <th className="px-3 py-2.5 text-left font-semibold text-adp-muted">Taille</th>
                <th className="px-3 py-2.5 text-left font-semibold text-adp-muted">Version</th>
                <th className="px-3 py-2.5 text-left font-semibold text-adp-muted">Téléchargé par</th>
                <th className="px-3 py-2.5 text-left font-semibold text-adp-muted">Date</th>
                <th className="px-3 py-2.5 text-left font-semibold text-adp-muted">Statut</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(docs.length > 0 ? docs : MOCK_DOCUMENTS).map((doc) => {
                const typeCfg: Record<string, string> = {
                  DWG:  'bg-blue-100 text-blue-700',
                  IFC:  'bg-violet-100 text-violet-700',
                  PDF:  'bg-red-100 text-red-700',
                  RVT:  'bg-orange-100 text-orange-700',
                  XLSX: 'bg-emerald-100 text-emerald-700',
                  DOCX: 'bg-sky-100 text-sky-700',
                }
                const statusCfg: Record<string, string> = {
                  valide:      'bg-emerald-100 text-emerald-700',
                  en_revision: 'bg-orange-100 text-orange-700',
                  archive:     'bg-slate-100 text-slate-500',
                }
                return (
                  <tr key={doc.id} className="hover:bg-adp-surface">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 shrink-0 text-adp-muted" />
                        <span className="font-medium text-adp-slate">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={cn('rounded px-1.5 py-0.5 text-[11px] font-bold', typeCfg[doc.type] ?? 'bg-slate-100 text-slate-600')}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-adp-muted">{doc.size}</td>
                    <td className="px-3 py-2.5 font-medium text-adp-slate">{doc.version}</td>
                    <td className="px-3 py-2.5 text-adp-muted">{doc.uploadedBy}</td>
                    <td className="px-3 py-2.5 text-adp-muted">{doc.uploadedAt}</td>
                    <td className="px-3 py-2.5">
                      <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', statusCfg[doc.status])}>
                        {doc.statusLabel}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <button className="rounded p-1 hover:bg-slate-100"><Download className="h-3.5 w-3.5 text-adp-muted" /></button>
                        <button className="rounded p-1 hover:bg-slate-100"><MoreHorizontal className="h-3.5 w-3.5 text-adp-muted" /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Sidebar filtres ── */}
      <div className="w-52 shrink-0 space-y-4">
        {/* Filtres type */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-adp-muted">Filtres</h3>
          <div className="mb-3">
            <p className="mb-1.5 text-[12px] font-semibold text-adp-slate">Type de fichier</p>
            <div className="space-y-1.5">
              {['DWG', 'IFC', 'PDF', 'RVT', 'XLSX', 'DOCX'].map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-adp-blue" />
                  <span className="text-xs text-adp-slate">{t}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[12px] font-semibold text-adp-slate">Statut</p>
            <div className="space-y-1.5">
              {[['Validé', 'valide'], ['En révision', 'en_revision'], ['Archivé', 'archive']].map(([label]) => (
                <label key={label} className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-adp-blue" />
                  <span className="text-xs text-adp-slate">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Stockage */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-adp-muted">Stockage utilisé</h3>
          <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-adp-blue" style={{ width: '64%' }} />
          </div>
          <p className="text-xs text-adp-slate"><span className="font-bold">124,6 Go</span> / 200 Go</p>
          <p className="mt-0.5 text-[11px] text-adp-muted">64% utilisé</p>
        </div>
      </div>
    </div>
  )
}
