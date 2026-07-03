'use client'

import { useState } from 'react'
import { FileText, Download, MoreHorizontal, Search, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import type { MockDocument } from '@/lib/mock-data'

// ── Types ────────────────────────────────────────────────

export interface DocumentsClientProps {
  documents: MockDocument[]
}

// ── Constantes ───────────────────────────────────────────

const BIM_TYPES = ['DWG', 'IFC', 'RVT'] as const

const TABS = [
  { label: 'Tous',     fn: (_d: MockDocument) => true },
  { label: 'Plans',    fn: (d: MockDocument) => d.category === 'Plans' },
  { label: 'Rapports', fn: (d: MockDocument) => d.category === 'Rapport' },
  { label: 'BIM',      fn: (d: MockDocument) => (BIM_TYPES as readonly string[]).includes(d.type) },
  { label: 'Archivés', fn: (d: MockDocument) => d.status === 'archive' },
] as const

const TYPE_CLS: Record<string, string> = {
  DWG:  'bg-blue-100 text-blue-700',
  IFC:  'bg-violet-100 text-violet-700',
  PDF:  'bg-red-100 text-red-700',
  RVT:  'bg-orange-100 text-orange-700',
  XLSX: 'bg-emerald-100 text-emerald-700',
  DOCX: 'bg-sky-100 text-sky-700',
}

const ST_CLS: Record<string, string> = {
  valide:      'bg-emerald-100 text-emerald-700',
  en_revision: 'bg-amber-100 text-amber-700',
  archive:     'bg-slate-100 text-slate-500',
}

const TYPE_COLOR: Record<string, string> = {
  DWG:  'text-blue-600 bg-blue-50',
  IFC:  'text-violet-600 bg-violet-50',
  PDF:  'text-red-500 bg-red-50',
  RVT:  'text-orange-600 bg-orange-50',
  XLSX: 'text-emerald-600 bg-emerald-50',
  DOCX: 'text-sky-600 bg-sky-50',
}

// ── Composant principal ──────────────────────────────────

export function DocumentsClient({ documents }: DocumentsClientProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [search, setSearch] = useState('')

  const tabFn = TABS[activeTab]?.fn ?? (() => true)

  const filtered = documents
    .filter(tabFn)
    .filter((d) =>
      search.trim() === '' ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.projectName.toLowerCase().includes(search.toLowerCase())
    )

  const count = (fn: (d: MockDocument) => boolean) => documents.filter(fn).length

  return (
    <div className="space-y-0">
      {/* ── Onglets ── */}
      <div className="flex items-center border-b border-slate-200">
        {TABS.map(({ label, fn }, i) => (
          <button
            key={label}
            onClick={() => setActiveTab(i)}
            className={cn(
              'flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-[14px] font-medium transition-colors duration-150',
              activeTab === i
                ? 'border-adp-blue text-adp-blue'
                : 'border-transparent text-adp-muted hover:text-adp-slate'
            )}
          >
            {label}
            <span className={cn(
              'rounded-full px-1.5 py-0.5 text-[12px] font-semibold',
              activeTab === i ? 'bg-adp-blue/10 text-adp-blue' : 'bg-slate-100 text-adp-muted'
            )}>
              {count(fn)}
            </span>
          </button>
        ))}
      </div>

      {/* ── Table wrapper ── */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        {/* Barre recherche + action */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 transition-colors duration-150 focus-within:border-adp-blue focus-within:bg-white">
            <Search className="h-3.5 w-3.5 shrink-0 text-adp-muted" strokeWidth={1.75} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un document…"
              className="w-52 bg-transparent text-[13px] outline-none placeholder:text-adp-muted/50"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-adp-muted transition-colors duration-150 hover:border-slate-300 hover:text-adp-slate">
            <Upload className="h-3.5 w-3.5" strokeWidth={1.75} />
            Importer
          </button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Aucun document trouvé"
            description={search ? `Aucun résultat pour "${search}".` : 'Aucun document dans cette catégorie.'}
            className="m-4"
            action={
              search ? (
                <button onClick={() => setSearch('')} className="rounded-lg border border-slate-200 px-4 py-2 text-[14px] font-medium text-adp-muted hover:text-adp-slate">
                  Effacer la recherche
                </button>
              ) : undefined
            }
          />
        ) : (
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {['Nom', 'Projet', 'Type', 'Taille', 'Version', 'Auteur', 'Date', 'Statut', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-widest text-adp-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((doc) => (
                <tr key={doc.id} className="transition-colors duration-100 hover:bg-slate-50/80">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded text-[8px] font-bold', TYPE_COLOR[doc.type] ?? 'text-slate-500 bg-slate-100')}>
                        {doc.type}
                      </div>
                      <span className="text-[14px] font-medium text-adp-slate">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-adp-muted">{doc.projectName}</td>
                  <td className="px-4 py-3">
                    <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-bold', TYPE_CLS[doc.type] ?? 'bg-slate-100 text-slate-600')}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-adp-muted">{doc.size}</td>
                  <td className="px-4 py-3 text-[13px] font-medium text-adp-slate">{doc.version}</td>
                  <td className="px-4 py-3 text-[13px] text-adp-muted">{doc.uploadedBy}</td>
                  <td className="px-4 py-3 text-[13px] text-adp-muted">{doc.uploadedAt}</td>
                  <td className="px-4 py-3">
                    <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-semibold', ST_CLS[doc.status] ?? 'bg-slate-100 text-slate-500')}>
                      {doc.statusLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5">
                      <button className="rounded-lg p-1.5 text-adp-muted transition-colors duration-150 hover:bg-slate-100 hover:text-adp-slate">
                        <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                      <button className="rounded-lg p-1.5 text-adp-muted transition-colors duration-150 hover:bg-slate-100 hover:text-adp-slate">
                        <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
