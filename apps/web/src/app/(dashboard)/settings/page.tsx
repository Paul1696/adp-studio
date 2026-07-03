import type { Metadata } from 'next'
import { ChevronRight, HelpCircle, ExternalLink } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { SettingsContent } from './_components/settings-content'

export const metadata: Metadata = { title: 'Paramètres' }

function SettingsSidebar() {
  return (
    <div className="w-56 shrink-0 space-y-3">
      {/* Résumé compte */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Résumé du compte</h3>
        </div>
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-adp-muted">Plan actuel</span>
            <span className="rounded-md bg-adp-blue px-2 py-0.5 text-[12px] font-bold text-white">Studio Pro</span>
          </div>
        </div>
        <div className="divide-y divide-slate-100/80">
          {[
            { label: 'Membres',   value: '6 / 10' },
            { label: 'Projets',   value: '7 actifs' },
            { label: 'Agents IA', value: '9 disponibles' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-4 py-2.5">
              <span className="text-[13px] text-adp-muted">{label}</span>
              <span className="text-[13px] font-semibold text-adp-slate">{value}</span>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4 pt-3">
          <div className="mb-1.5 flex items-center justify-between text-[12px]">
            <span className="text-adp-muted">Stockage</span>
            <span className="font-semibold text-adp-slate">284 Go / 500 Go</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[57%] rounded-full bg-gradient-to-r from-adp-blue to-blue-400" />
          </div>
          <p className="mt-1.5 text-[12px] text-adp-muted">57% du stockage utilisé</p>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Actions rapides</h3>
        </div>
        <div className="divide-y divide-slate-100/80">
          {['Changer le mot de passe', 'Gérer les membres', 'Exporter mes données', 'Voir les factures'].map((action) => (
            <button key={action} className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors duration-150 hover:bg-slate-50">
              <span className="text-[13px] text-adp-muted hover:text-adp-slate">{action}</span>
              <ChevronRight className="h-3 w-3 text-slate-300" strokeWidth={2} />
            </button>
          ))}
        </div>
      </div>

      {/* Aide */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-3.5 w-3.5 text-adp-muted" strokeWidth={1.75} />
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Besoin d&apos;aide ?</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-[13px] leading-snug text-adp-muted">
            Consultez notre documentation ou contactez le support ADP Studio.
          </p>
          <div className="mt-3 space-y-1.5">
            {['Documentation', 'Contacter le support'].map((lbl) => (
              <button key={lbl} className="flex w-full items-center gap-1 text-left text-[13px] font-medium text-adp-blue hover:text-adp-blue-dark hover:underline">
                <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Paramètres"
        description="Gérez votre profil, vos préférences et la configuration de votre espace ADP Studio."
      />
      <div className="flex gap-6">
        <SettingsContent />
        <SettingsSidebar />
      </div>
    </div>
  )
}
