'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { useCreateProject } from '@/hooks/use-projects'

interface Props { open: boolean; onClose: () => void }

const PHASES = ['ESQ', 'APS', 'APD', 'PRO', 'DCE', 'EXE', 'RCE']

export function NewProjectModal({ open, onClose }: Props) {
  const { mutate, isPending } = useCreateProject()
  const [form, setForm] = useState({ name: '', description: '', location: '', surface: '', budget: '', phase: 'APD' })

  if (!open) return null

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(
      { name: form.name, description: form.description, location: form.location, surface: form.surface, budget: form.budget, phase: form.phase } as never,
      { onSuccess: () => { onClose(); setForm({ name: '', description: '', location: '', surface: '', budget: '', phase: 'APD' }) } }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-[16px] font-semibold text-adp-slate">Nouveau projet</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-adp-muted hover:bg-slate-100"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">Nom du projet *</label>
            <input required value={form.name} onChange={set('name')} placeholder="Villa Riviera…" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[14px] text-adp-slate outline-none focus:border-adp-blue focus:ring-2 focus:ring-adp-blue/10" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">Phase</label>
              <select value={form.phase} onChange={set('phase')} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[14px] text-adp-slate outline-none focus:border-adp-blue">
                {PHASES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">Localisation</label>
              <input value={form.location} onChange={set('location')} placeholder="Paris, 75001" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[14px] text-adp-slate outline-none focus:border-adp-blue" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">Surface (m²)</label>
              <input type="number" value={form.surface} onChange={set('surface')} placeholder="450" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[14px] text-adp-slate outline-none focus:border-adp-blue" />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">Budget (€)</label>
              <input type="number" value={form.budget} onChange={set('budget')} placeholder="1200000" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[14px] text-adp-slate outline-none focus:border-adp-blue" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">Description</label>
            <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Décrivez le projet…" className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-[14px] text-adp-slate outline-none focus:border-adp-blue focus:ring-2 focus:ring-adp-blue/10" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-[14px] font-medium text-adp-muted hover:text-adp-slate">Annuler</button>
            <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-adp-blue px-5 py-2 text-[14px] font-semibold text-white hover:bg-adp-blue-dark disabled:opacity-60">
              {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Créer le projet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
