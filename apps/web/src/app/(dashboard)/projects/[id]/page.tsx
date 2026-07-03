import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, User, CheckCircle, Upload, Bot, MessageSquare, AlertTriangle } from 'lucide-react'
import { MOCK_PROJECTS, MOCK_USERS, MOCK_ACTIVITIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface Props { params: Promise<{ id: string }> }

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = MOCK_PROJECTS.find((p) => p.id === id)
  if (!project) notFound()

  const owner = MOCK_USERS.find((u) => u.id === project.members[0])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = id // used in JSX links below

  return (
    <div className="flex gap-5">
      {/* ── Colonne gauche ── */}
      <div className="w-64 shrink-0 space-y-4">
        {/* Résumé */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-adp-muted">Résumé du projet</h3>
          <p className="text-xs leading-relaxed text-adp-slate">{project.description}</p>
          <button className="mt-2 text-xs font-medium text-adp-blue hover:underline">Voir plus de détails</button>
        </div>

        {/* Infos clés */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-adp-muted">Informations clés</h3>
          <div className="space-y-2.5 text-xs">
            {[
              { label: 'Type de projet',  value: project.type },
              { label: 'Phase actuelle',  value: project.phase },
              { label: 'Référence',       value: project.reference },
              { label: 'Surface',         value: `${project.surface.toLocaleString('fr-FR')} m²` },
              { label: 'Budget',          value: project.budget },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-2">
                <span className="text-adp-muted">{label}</span>
                <span className="text-right font-medium text-adp-slate">{value}</span>
              </div>
            ))}
            <div className="flex justify-between gap-2">
              <span className="text-adp-muted">Adresse</span>
              <span className="flex items-center gap-1 text-right font-medium text-adp-slate">
                <MapPin className="h-3 w-3 shrink-0" />{project.location}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-adp-muted">Chef de projet</span>
              <span className="flex items-center gap-1 font-medium text-adp-slate">
                <User className="h-3 w-3" />{owner?.fullName ?? '—'}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-adp-muted">BIM activé</span>
              <span className={`flex items-center gap-1 font-semibold ${project.bimEnabled ? 'text-emerald-600' : 'text-adp-muted'}`}>
                <CheckCircle className="h-3 w-3" />{project.bimEnabled ? 'Oui' : 'Non'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Colonne centre ── */}
      <div className="flex-1 space-y-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-adp-muted">Avancement par phase</h3>
          <div className="space-y-3">
            {[
              { phase: 'ESQ', label: 'Esquisse',                pct: 100 },
              { phase: 'APS', label: 'Avant-Projet Sommaire',   pct: 100 },
              { phase: 'APD', label: 'Avant-Projet Définitif',  pct: 85  },
              { phase: 'PRO', label: 'Projet',                  pct: 60  },
              { phase: 'DCE', label: 'Dossier Consultation',    pct: 20  },
              { phase: 'EXE', label: 'Exécution',               pct: 0   },
            ].map(({ phase, label, pct }) => (
              <div key={phase}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-8 font-semibold text-adp-blue">{phase}</span>
                    <span className="text-adp-muted">{label}</span>
                  </div>
                  <span className={`font-semibold ${pct === 100 ? 'text-emerald-600' : pct > 0 ? 'text-adp-blue' : 'text-adp-muted'}`}>
                    {pct}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-emerald-500' : 'bg-adp-blue'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Colonne droite ── */}
      <div className="w-56 shrink-0 space-y-4">
        {/* Équipe */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-adp-muted">Équipe du projet</h3>
            <Link href={`/projects/${id}/equipe`} className="text-[11px] text-adp-blue hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-2">
            {project.members.slice(0, 5).map((uid) => {
              const u = MOCK_USERS.find((x) => x.id === uid)
              if (!u) return null
              return (
                <div key={uid} className="flex items-center gap-2">
                  <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white', u.avatarColor)}>
                    {u.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-adp-slate">{u.fullName}</p>
                    <p className="truncate text-[11px] text-adp-muted">{u.profession}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Activités récentes */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-adp-muted">Activités récentes</h3>
            <Link href={`/projects/${id}/activites`} className="text-[11px] text-adp-blue hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-3">
            {MOCK_ACTIVITIES.filter((a) => a.projectId === id).slice(0, 4).map((a) => {
              const icons = { upload: Upload, agent: Bot, comment: MessageSquare, clash: AlertTriangle, validation: CheckCircle, member: User } as const
              const Icon = icons[a.type] ?? MessageSquare
              return (
                <div key={a.id} className="flex gap-2">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-adp-blue-light">
                    <Icon className="h-2.5 w-2.5 text-adp-blue" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium leading-snug text-adp-slate">{a.label}</p>
                    <p className="text-[11px] text-adp-muted">{a.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
