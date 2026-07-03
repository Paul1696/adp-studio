'use client'

import { Save, UserPlus, Link2, CheckCircle, ExternalLink } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { MOCK_USERS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/toast'

const ROLES: Record<string, string> = {
  u1: 'Chef de projet', u2: 'BIM Manager', u3: 'Architecte',
  u4: 'Ingénieur structure', u5: 'Dessinateur', u6: 'Économiste',
}

export function SectionProfil() {
  const { toast } = useToast()
  const { user } = useUser()
  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || 'U'
    : 'U'
  const fullName = user?.fullName ?? user?.emailAddresses[0]?.emailAddress ?? ''
  const email = user?.emailAddresses[0]?.emailAddress ?? ''
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Membres de l&apos;équipe</h2>
            <p className="mt-0.5 text-[13px] text-adp-muted">6 membres actifs sur 10 disponibles.</p>
          </div>
          <button onClick={() => toast('Invitation envoyée par email !')} className="flex items-center gap-1.5 rounded-lg bg-adp-blue px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-adp-blue-dark">
            <UserPlus className="h-3.5 w-3.5" strokeWidth={2} /> Inviter
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {MOCK_USERS.map((u) => (
            <div key={u.id} className="flex items-center gap-3 px-5 py-3">
              <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white', u.avatarColor)}>
                {u.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-adp-slate">{u.fullName}</p>
                <p className="text-[12px] text-adp-muted">{ROLES[u.id] ?? 'Membre'}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">Actif</span>
              <select className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[12px] text-adp-slate outline-none">
                <option>Éditeur</option><option>Lecteur</option><option>Admin</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export function SectionAgents() {
  const agents = [
    { name: 'ADP Architecte', specialty: 'Architecture & Réglementation', icon: 'A', color: 'bg-blue-100 text-blue-700', on: true },
    { name: 'ADP BIM Manager', specialty: 'BIM & Coordination', icon: 'B', color: 'bg-violet-100 text-violet-700', on: true },
    { name: 'ADP QuanTBIM', specialty: 'Économie de la construction', icon: 'Q', color: 'bg-emerald-100 text-emerald-700', on: true },
    { name: 'ADP Réduction', specialty: 'Optimisation & Valeur', icon: 'R', color: 'bg-orange-100 text-orange-700', on: false },
    { name: 'ADP Contrôleur', specialty: 'Contrôle & Conformité', icon: 'C', color: 'bg-red-100 text-red-700', on: true },
  ]
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Agents actifs</h2>
          <p className="mt-0.5 text-[13px] text-adp-muted">Activez ou désactivez les agents disponibles pour votre espace.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {agents.map((a) => (
            <div key={a.name} className="flex items-center gap-3 px-5 py-3">
              <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[14px] font-bold', a.color)}>{a.icon}</div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-adp-slate">{a.name}</p>
                <p className="text-[12px] text-adp-muted">{a.specialty}</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked={a.on} className="peer sr-only" />
                <div className="h-5 w-9 rounded-full bg-slate-200 peer-checked:bg-adp-blue after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Modèle par défaut</h2>
        </div>
        <div className="p-5">
          <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[14px] text-adp-slate outline-none focus:border-adp-blue focus:bg-white">
            <option>claude-sonnet-4-6 (Recommandé)</option>
            <option>claude-opus-4-8 (Plus puissant)</option>
            <option>claude-haiku-4-5 (Plus rapide)</option>
          </select>
          <p className="mt-2 text-[12px] text-adp-muted">Limite de sessions : <strong>500 / mois</strong> — 342 utilisées</p>
        </div>
      </div>
    </div>
  )
}
export function SectionDocuments() {
  const formats = ['DWG', 'IFC', 'PDF', 'RVT', 'XLSX', 'DOCX', 'DXF', 'PNG']
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Formats acceptés</h2>
          <p className="mt-0.5 text-[13px] text-adp-muted">Types de fichiers autorisés dans votre espace.</p>
        </div>
        <div className="flex flex-wrap gap-2 p-5">
          {formats.map((f) => (
            <label key={f} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 hover:border-adp-blue/40">
              <input type="checkbox" defaultChecked className="accent-adp-blue" />
              <span className="text-[13px] font-semibold text-adp-slate">{f}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Règles</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { label: 'Nomenclature automatique', desc: 'Renomme les fichiers selon la convention ADP', on: true },
            { label: 'Versioning automatique', desc: 'Incrémente la version à chaque upload', on: true },
            { label: 'Compression des images', desc: 'Réduit le poids des PNG/JPG importés', on: false },
            { label: 'OCR sur les PDF', desc: 'Rend les PDF scannés consultables', on: true },
          ].map(({ label, desc, on }) => (
            <div key={label} className="flex items-center gap-3 px-5 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-adp-slate">{label}</p>
                <p className="text-[12px] text-adp-muted">{desc}</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked={on} className="peer sr-only" />
                <div className="h-5 w-9 rounded-full bg-slate-200 peer-checked:bg-adp-blue after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export function SectionNotifications() {
  const groups = [
    { title: 'Missions IA', items: [
      { label: 'Mission terminée', on: true },
      { label: 'Erreur ou blocage', on: true },
      { label: 'Nouveau résultat disponible', on: true },
    ]},
    { title: 'Projets', items: [
      { label: 'Clash BIM détecté', on: true },
      { label: 'Jalon approchant (7 jours)', on: true },
      { label: 'Document importé par un membre', on: false },
      { label: 'Nouveau membre ajouté', on: false },
    ]},
    { title: 'Compte', items: [
      { label: 'Limite de stockage atteinte (80%)', on: true },
      { label: 'Nouvelle facture disponible', on: true },
    ]},
  ]
  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <div key={g.title} className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-3">
            <h2 className="text-[14px] font-semibold tracking-tight text-adp-slate">{g.title}</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {g.items.map(({ label, on }) => (
              <div key={label} className="flex items-center justify-between px-5 py-3">
                <span className="text-[14px] text-adp-slate">{label}</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked={on} className="peer sr-only" />
                  <div className="h-5 w-9 rounded-full bg-slate-200 peer-checked:bg-adp-blue after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
export function SectionSecurite() {
  const { toast } = useToast()
  const sessions = [
    { device: 'Chrome · macOS', ip: '41.202.xx.xx', date: 'Aujourd\'hui 09:14', current: true },
    { device: 'Safari · iPhone', ip: '41.202.xx.xx', date: 'Hier 18:32', current: false },
    { device: 'Firefox · Windows', ip: '41.199.xx.xx', date: '28 juin 2026', current: false },
  ]
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Mot de passe</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 p-5">
          {['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le mot de passe'].map((l) => (
            <div key={l} className={l === 'Mot de passe actuel' ? 'col-span-2' : ''}>
              <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">{l}</label>
              <input type="password" placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[14px] text-adp-slate outline-none focus:border-adp-blue focus:bg-white focus:ring-2 focus:ring-adp-blue/10" />
            </div>
          ))}
          <div className="col-span-2 flex justify-end">
            <button onClick={() => toast('Mot de passe mis à jour !')} className="flex items-center gap-2 rounded-xl bg-adp-blue px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:bg-adp-blue-dark">
              <Save className="h-3.5 w-3.5" /> Changer le mot de passe
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Double authentification</h2>
            <p className="mt-0.5 text-[13px] text-adp-muted">Application d&apos;authentification (TOTP)</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" defaultChecked={false} className="peer sr-only" />
            <div className="h-5 w-9 rounded-full bg-slate-200 peer-checked:bg-adp-blue after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-4" />
          </label>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Sessions actives</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {sessions.map((s) => (
            <div key={s.device} className="flex items-center gap-3 px-5 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-adp-slate">{s.device}</p>
                <p className="text-[12px] text-adp-muted">{s.ip} · {s.date}</p>
              </div>
              {s.current
                ? <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">Session actuelle</span>
                : <button onClick={() => toast('Session révoquée.', 'info')} className="text-[13px] font-medium text-red-500 hover:text-red-600">Révoquer</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export function SectionIntegrations() {
  const { toast } = useToast()
  const integrations = [
    { name: 'Autodesk BIM 360', desc: 'Synchronisation des modèles IFC et coordination', connected: true,  badge: 'Connecté', badgeCls: 'bg-emerald-50 text-emerald-600' },
    { name: 'Google Drive',     desc: 'Import/export de documents depuis Drive',         connected: true,  badge: 'Connecté', badgeCls: 'bg-emerald-50 text-emerald-600' },
    { name: 'Procore',          desc: 'Gestion de chantier et suivi des RFIs',            connected: false, badge: 'Disponible', badgeCls: 'bg-slate-100 text-slate-500' },
    { name: 'SharePoint',       desc: 'Accès aux bibliothèques de documents Office 365',  connected: false, badge: 'Disponible', badgeCls: 'bg-slate-100 text-slate-500' },
    { name: 'Slack',            desc: 'Notifications et résumés dans vos canaux',         connected: false, badge: 'Bientôt',    badgeCls: 'bg-amber-50 text-amber-600' },
  ]
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Connexions tierces</h2>
          <p className="mt-0.5 text-[13px] text-adp-muted">Connectez ADP Studio à vos outils métier.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {integrations.map((itg) => (
            <div key={itg.name} className="flex items-center gap-4 px-5 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <Link2 className="h-4 w-4 text-adp-muted" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-adp-slate">{itg.name}</p>
                <p className="text-[12px] text-adp-muted">{itg.desc}</p>
              </div>
              <span className={cn('shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold', itg.badgeCls)}>{itg.badge}</span>
              {itg.connected
                ? <button onClick={() => toast(`${itg.name} déconnecté.`, 'info')} className="shrink-0 text-[13px] font-medium text-red-400 hover:text-red-500">Déconnecter</button>
                : <button onClick={() => itg.badge !== 'Bientôt' && toast(`Connexion à ${itg.name} en cours…`, 'info')} className={cn('shrink-0 flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[13px] font-semibold transition-colors', itg.badge === 'Bientôt' ? 'cursor-not-allowed border-slate-200 text-slate-300' : 'border-adp-blue/30 text-adp-blue hover:bg-adp-blue/5')}>
                    <ExternalLink className="h-3 w-3" /> Connecter
                  </button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export function SectionFacturation() {
  const { toast } = useToast()
  const invoices = [
    { id: 'INV-2026-06', date: '1 juin 2026',  amount: '149,00 €', status: 'Payée' },
    { id: 'INV-2026-05', date: '1 mai 2026',   amount: '149,00 €', status: 'Payée' },
    { id: 'INV-2026-04', date: '1 avr. 2026',  amount: '149,00 €', status: 'Payée' },
    { id: 'INV-2026-03', date: '1 mars 2026',  amount: '89,00 €',  status: 'Payée' },
  ]
  return (
    <div className="space-y-4">
      {/* Plan actuel */}
      <div className="overflow-hidden rounded-xl border border-adp-blue/20 bg-adp-blue/5 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-bold text-adp-blue">Plan Studio Pro</h2>
              <span className="rounded-full bg-adp-blue px-2 py-0.5 text-[11px] font-bold text-white">Actif</span>
            </div>
            <p className="mt-0.5 text-[13px] text-adp-muted">149 € / mois · Renouvellement le 1 juil. 2026</p>
          </div>
          <button onClick={() => toast('Redirection vers les plans disponibles…', 'info')} className="rounded-lg border border-adp-blue/30 px-3 py-1.5 text-[13px] font-semibold text-adp-blue hover:bg-adp-blue/10">
            Changer de plan
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-adp-blue/10 px-5 py-3">
          {[
            { label: 'Agents', value: '5 / 5' },
            { label: 'Stockage', value: '42 Go / 100 Go' },
            { label: 'Missions IA', value: '342 / 500 / mois' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-adp-muted">{label}</p>
              <p className="mt-0.5 text-[14px] font-semibold text-adp-slate">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Méthode de paiement */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Moyen de paiement</h2>
          <button className="text-[13px] font-medium text-adp-blue hover:underline">Modifier</button>
        </div>
        <div className="flex items-center gap-3 px-5 py-3">
          <div className="flex h-8 w-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-[12px] font-bold text-adp-slate">VISA</div>
          <div>
            <p className="text-[14px] font-semibold text-adp-slate">•••• •••• •••• 4242</p>
            <p className="text-[12px] text-adp-muted">Expire 09/2028</p>
          </div>
          <CheckCircle className="ml-auto h-4 w-4 text-emerald-500" />
        </div>
      </div>

      {/* Factures */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Historique des factures</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center gap-3 px-5 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-adp-slate">{inv.id}</p>
                <p className="text-[12px] text-adp-muted">{inv.date}</p>
              </div>
              <span className="text-[14px] font-semibold text-adp-slate">{inv.amount}</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">{inv.status}</span>
              <button className="flex items-center gap-1 text-[13px] font-medium text-adp-blue hover:underline">
                <ExternalLink className="h-3 w-3" /> PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SectionGeneral() {
  return (
    <div className="space-y-4">
      {/* Informations générales */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Informations générales</h2>
          <p className="mt-0.5 text-[13px] text-adp-muted">Votre identité sur ADP Studio.</p>
        </div>
        <div className="p-5">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-adp-blue text-xl font-bold text-white ring-4 ring-adp-blue/10">
              {initials}
            </div>
            <div>
              <p className="text-[16px] font-semibold text-adp-slate">{fullName}</p>
              <p className="text-[13px] text-adp-muted">Architecte</p>
              <button className="mt-1.5 text-[13px] font-medium text-adp-blue hover:text-adp-blue-dark hover:underline">
                Changer la photo
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Nom complet',  value: fullName,      type: 'text' },
              { label: 'Email',        value: email,         type: 'email' },
              { label: 'Profession',   value: 'Architecte',  type: 'text' },
              { label: 'Organisation', value: 'Ateliers de Paul',      type: 'text' },
            ].map(({ label, value, type }) => (
              <div key={label}>
                <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">{label}</label>
                <input
                  type={type}
                  defaultValue={value}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[14px] text-adp-slate outline-none transition-all duration-150 focus:border-adp-blue focus:bg-white focus:ring-2 focus:ring-adp-blue/10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Préférences */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">Préférences</h2>
          <p className="mt-0.5 text-[13px] text-adp-muted">Langue, fuseau horaire et apparence.</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">Langue</label>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[14px] text-adp-slate outline-none focus:border-adp-blue focus:bg-white focus:ring-2 focus:ring-adp-blue/10">
                <option>Français</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-adp-muted">Fuseau horaire</label>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[14px] text-adp-slate outline-none focus:border-adp-blue focus:bg-white focus:ring-2 focus:ring-adp-blue/10">
                <option>Europe/Paris (UTC+1)</option>
                <option>Africa/Douala (UTC+1)</option>
                <option>UTC</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="mb-2 block text-[13px] font-medium text-adp-muted">Thème</label>
              <div className="flex gap-2">
                {[
                  { label: 'Clair',   value: 'light',  desc: 'Fond blanc' },
                  { label: 'Sombre',  value: 'dark',   desc: 'Fond sombre' },
                  { label: 'Système', value: 'system', desc: 'Auto' },
                ].map(({ label, value, desc }) => (
                  <label
                    key={value}
                    className={cn(
                      'flex flex-1 cursor-pointer flex-col gap-0.5 rounded-xl border px-4 py-3 transition-all duration-150',
                      value === 'system'
                        ? 'border-adp-blue bg-adp-blue/5'
                        : 'border-slate-200 bg-white hover:border-adp-blue/40'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <input type="radio" name="theme" defaultChecked={value === 'system'} className="accent-adp-blue" />
                      <span className={cn('text-[14px] font-semibold', value === 'system' ? 'text-adp-blue' : 'text-adp-slate')}>
                        {label}
                      </span>
                    </div>
                    <p className="pl-5 text-[12px] text-adp-muted">{desc}</p>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button className="flex items-center gap-2 rounded-xl bg-adp-blue px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-md hover:shadow-adp-blue/20">
              <Save className="h-3.5 w-3.5" strokeWidth={2} />
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
