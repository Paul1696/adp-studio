import { notFound } from 'next/navigation'
import { UserPlus, MoreHorizontal } from 'lucide-react'
import { getProject } from '@/lib/data/projects'
import { getProjectTeam } from '@/lib/data/team'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }> }

const ROLE_CFG: Record<string, { label: string; cls: string }> = {
  owner:  { label: 'Propriétaire', cls: 'bg-blue-100 text-blue-700' },
  admin:  { label: 'Admin',        cls: 'bg-violet-100 text-violet-700' },
  editor: { label: 'Éditeur',      cls: 'bg-emerald-100 text-emerald-700' },
  viewer: { label: 'Lecteur',      cls: 'bg-slate-100 text-slate-600' },
}

export default async function ProjectEquipePage({ params }: Props) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()

  const members = await getProjectTeam(id)

  const roleCount = members.reduce<Record<string, number>>((acc, m) => {
    acc[m.role] = (acc[m.role] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="flex gap-5">
      {/* ── Liste membres ── */}
      <div className="min-w-0 flex-1">
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3">
            <p className="text-sm font-semibold text-adp-slate">{members.length} membres</p>
            <button className="flex items-center gap-1.5 rounded-lg bg-adp-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-adp-blue-dark">
              <UserPlus className="h-3.5 w-3.5" /> Inviter un membre
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-xs">
            <thead className="border-b border-slate-200/80 bg-adp-surface">
              <tr>
                {['Membre', 'Rôle', 'Profession', 'Date d\'ajout', ''].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-semibold text-adp-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {members.map((m) => {
                const rc = ROLE_CFG[m.role] ?? ROLE_CFG.editor!
                return (
                  <tr key={m.id} className="hover:bg-adp-surface">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white', m.avatarColor)}>
                          {m.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-adp-slate">{m.fullName}</p>
                          <p className="text-[11px] text-adp-muted">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', rc.cls)}>{rc.label}</span>
                    </td>
                    <td className="px-4 py-3 text-adp-muted">{m.profession}</td>
                    <td className="px-4 py-3 text-adp-muted">{m.joinedAt}</td>
                    <td className="px-4 py-3">
                      <button className="rounded p-1 hover:bg-slate-100">
                        <MoreHorizontal className="h-3.5 w-3.5 text-adp-muted" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Sidebar ── */}
      <div className="w-52 shrink-0 space-y-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-adp-muted">Répartition par rôle</h3>
          <div className="space-y-2">
            {Object.entries(ROLE_CFG).map(([key, { label, cls }]) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', cls)}>{label}</span>
                <span className="font-bold text-adp-slate">{roleCount[key] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-adp-muted">Actions rapides</h3>
          <div className="space-y-2">
            {['Modifier les rôles', 'Exporter la liste', 'Gérer les accès'].map((a) => (
              <button key={a} className="w-full rounded-lg border border-slate-200/80 px-3 py-1.5 text-left text-xs text-adp-muted hover:border-adp-blue hover:text-adp-blue">
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
