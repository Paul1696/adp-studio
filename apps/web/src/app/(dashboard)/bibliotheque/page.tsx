import type { Metadata } from 'next'
import { FileText, Scale, Layers, Box, FileCheck, BookOpen, Download, Star } from 'lucide-react'
import { MOCK_RESOURCES, RESOURCE_CATEGORIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { SectionHeader } from '@/components/ui/section-header'

export const metadata: Metadata = { title: 'Bibliothèque' }

const CAT_ICONS = { FileText, Scale, Layers, Box, FileCheck, BookOpen }

const CAT_COLORS: Record<string, { icon: string; bg: string }> = {
  FileText: { icon: 'text-adp-blue',    bg: 'bg-blue-50' },
  Scale:    { icon: 'text-violet-600',  bg: 'bg-violet-50' },
  Layers:   { icon: 'text-emerald-600', bg: 'bg-emerald-50' },
  Box:      { icon: 'text-orange-600',  bg: 'bg-orange-50' },
  FileCheck:{ icon: 'text-rose-600',    bg: 'bg-rose-50' },
  BookOpen: { icon: 'text-teal-600',    bg: 'bg-teal-50' },
}

const FORMAT_CLS: Record<string, string> = {
  DWG:  'bg-blue-100 text-blue-700',
  PDF:  'bg-red-100 text-red-700',
  DOCX: 'bg-sky-100 text-sky-700',
  RFA:  'bg-orange-100 text-orange-700',
  XLSX: 'bg-emerald-100 text-emerald-700',
}

export default function BibliotequePage() {
  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-5">

        <PageHeader
          title="Bibliothèque"
          description="Accédez à toutes les ressources ADP : templates, normes, détails constructifs, guides et plus encore."
        />

        {/* Catégories — stats */}
        <div className="grid grid-cols-6 gap-3">
          {RESOURCE_CATEGORIES.map(({ label, count, icon }) => {
            const Icon = CAT_ICONS[icon as keyof typeof CAT_ICONS] ?? FileText
            const colors = CAT_COLORS[icon] ?? { icon: 'text-adp-blue', bg: 'bg-blue-50' }
            return (
              <button
                key={label}
                className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm text-center transition-all duration-150 hover:-translate-y-0.5 hover:border-adp-blue/30 hover:shadow-md"
              >
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-150 group-hover:scale-105', colors.bg)}>
                  <Icon className={cn('h-4 w-4', colors.icon)} strokeWidth={1.75} />
                </div>
                <div>
                  <p className={cn('text-[21px] font-bold leading-tight', colors.icon)}>{count}</p>
                  <p className="mt-0.5 text-[12px] leading-tight text-adp-muted">{label}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Ressources récentes */}
        <div>
          <SectionHeader title="Ressources récentes" href="/bibliotheque" linkLabel="Voir toutes les ressources" />
          <div className="grid grid-cols-3 gap-3">
            {MOCK_RESOURCES.slice(0, 6).map((r) => (
              <div
                key={r.id}
                className="group flex cursor-pointer flex-col rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-adp-blue/20 hover:shadow-md"
              >
                {/* Badge format + téléchargements */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-bold', FORMAT_CLS[r.format] ?? 'bg-slate-100 text-slate-600')}>
                    {r.format}
                  </span>
                  <div className="flex items-center gap-1 text-[12px] text-adp-muted">
                    <Download className="h-3 w-3" strokeWidth={1.75} />
                    {r.downloads.toLocaleString()}
                  </div>
                </div>

                {/* Nom */}
                <p className="flex-1 text-[14px] font-semibold leading-snug text-adp-slate transition-colors duration-150 group-hover:text-adp-blue">
                  {r.name}
                </p>

                {/* Description */}
                <p className="mt-1.5 text-[12px] leading-relaxed text-adp-muted line-clamp-2">
                  {r.description}
                </p>

                {/* Footer auteur + date */}
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[12px] text-adp-muted">
                  <span className="font-medium text-adp-slate/70">{r.author}</span>
                  <span>{r.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Par catégorie */}
        <div>
          <SectionHeader title="Par catégorie" />
          <div className="grid grid-cols-2 gap-3">
            {RESOURCE_CATEGORIES.map(({ label, count, icon, description }) => {
              const Icon = CAT_ICONS[icon as keyof typeof CAT_ICONS] ?? FileText
              const colors = CAT_COLORS[icon] ?? { icon: 'text-adp-blue', bg: 'bg-blue-50' }
              return (
                <button
                  key={label}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm text-left transition-all duration-150 hover:border-adp-blue/20 hover:shadow-md"
                >
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-150 group-hover:scale-105', colors.bg)}>
                    <Icon className={cn('h-4 w-4', colors.icon)} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-semibold text-adp-slate transition-colors duration-150 group-hover:text-adp-blue">{label}</p>
                      <span className={cn('rounded-full px-1.5 py-0.5 text-[11px] font-bold', colors.bg, colors.icon)}>{count}</span>
                    </div>
                    <p className="mt-0.5 text-[13px] leading-snug text-adp-muted">{description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Sidebar ── */}
      <div className="w-56 shrink-0 space-y-3">

        {/* Panel Filtres */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Filtres</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-adp-muted">Format</p>
              <div className="space-y-1">
                {['DWG', 'PDF', 'DOCX', 'RFA', 'XLSX'].map((f) => (
                  <label key={f} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1 transition-colors duration-150 hover:bg-slate-50">
                    <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-adp-blue" />
                    <span className="text-[13px] text-adp-slate">{f}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-adp-muted">Trier par</p>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-adp-slate outline-none transition-colors duration-150 focus:border-adp-blue focus:bg-white">
                <option>Téléchargements</option>
                <option>Date de mise à jour</option>
                <option>Nom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Panel Populaires */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Populaires</h3>
          </div>
          <div className="divide-y divide-slate-100/80">
            {[...MOCK_RESOURCES].sort((a, b) => b.downloads - a.downloads).slice(0, 4).map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-2.5 px-4 py-2.5 transition-colors duration-150 hover:bg-slate-50"
              >
                <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" strokeWidth={0} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium leading-snug text-adp-slate">{r.name}</p>
                  <div className="mt-0.5 flex items-center gap-1 text-[11px] text-adp-muted">
                    <Download className="h-2.5 w-2.5" strokeWidth={1.75} />
                    {r.downloads.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Partager */}
        <div className="overflow-hidden rounded-xl border border-adp-blue/20 bg-adp-blue-light p-4">
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-adp-blue/10">
              <Download className="h-3.5 w-3.5 text-adp-blue" strokeWidth={2} />
            </div>
            <p className="text-[14px] font-semibold text-adp-blue">Partager une ressource</p>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-adp-muted">
            Contribuez à la bibliothèque ADP Studio en partageant vos ressources.
          </p>
          <button className="mt-3 w-full rounded-lg bg-adp-blue py-2 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-adp-blue-dark">
            Télécharger une ressource
          </button>
        </div>
      </div>
    </div>
  )
}
