import type { Metadata } from 'next'
import { Activity, Clock, CalendarDays, FolderKanban } from 'lucide-react'
import { getUserActivities } from '@/lib/data/activities'
import { getCurrentDbUser } from '@/lib/data/users'
import { prisma } from '@/lib/prisma'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'
import { ActivitesClient } from './_components/activites-client'

export const metadata: Metadata = { title: 'Activités' }

const MONTH_LABEL = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

const TYPE_BUCKET: Record<string, { label: string; color: string; text: string }> = {
  DOCUMENT_UPLOAD:  { label: 'Imports',       color: 'bg-blue-500',    text: 'text-blue-600' },
  MISSION_LAUNCH:   { label: 'Agents IA',     color: 'bg-violet-500',  text: 'text-violet-600' },
  MISSION_COMPLETE: { label: 'Agents IA',     color: 'bg-violet-500',  text: 'text-violet-600' },
  MEMBER_ADD:       { label: 'Équipe',        color: 'bg-amber-400',   text: 'text-amber-600' },
  PROJECT_UPDATE:   { label: 'Validations',   color: 'bg-emerald-500', text: 'text-emerald-600' },
  COMMENT:          { label: 'Commentaires',  color: 'bg-slate-400',   text: 'text-slate-600' },
}

async function getActivityOverview() {
  const user = await getCurrentDbUser()
  const where = user
    ? { OR: [{ userId: user.id }, { project: { members: { some: { userId: user.id } } } }] }
    : { id: 'none' }

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfWeek = new Date(startOfToday)
  startOfWeek.setDate(startOfWeek.getDate() - 6)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const startOfPrevWeek = new Date(startOfWeek)
  startOfPrevWeek.setDate(startOfPrevWeek.getDate() - 7)

  const [total, today, week, prevWeek, projects, monthActivities, byType] = await Promise.all([
    prisma.activity.count({ where }),
    prisma.activity.count({ where: { ...where, createdAt: { gte: startOfToday } } }),
    prisma.activity.count({ where: { ...where, createdAt: { gte: startOfWeek } } }),
    prisma.activity.count({ where: { ...where, createdAt: { gte: startOfPrevWeek, lt: startOfWeek } } }),
    prisma.activity.findMany({ where, select: { projectId: true }, distinct: ['projectId'] }),
    prisma.activity.findMany({
      where: { ...where, createdAt: { gte: startOfMonth, lt: startOfNextMonth } },
      select: { createdAt: true },
    }),
    prisma.activity.groupBy({ by: ['type'], where, _count: true }),
  ])

  const avgPerDay = Math.round((week / 7) * 10) / 10
  const trendPct = prevWeek > 0
    ? Math.round(((week - prevWeek) / prevWeek) * 100)
    : week > 0 ? 100 : 0

  const activeDays = new Set(monthActivities.map((a) => a.createdAt.getDate()))

  const bucketCounts = new Map<string, number>()
  for (const row of byType) {
    const bucket = TYPE_BUCKET[row.type]?.label ?? 'Autres'
    bucketCounts.set(bucket, (bucketCounts.get(bucket) ?? 0) + row._count)
  }
  const typeBreakdown = [...bucketCounts.entries()]
    .map(([label, value]) => {
      const style = Object.values(TYPE_BUCKET).find((b) => b.label === label)
      return {
        label,
        value,
        pct: total > 0 ? Math.round((value / total) * 100) : 0,
        color: style?.color ?? 'bg-slate-400',
        text: style?.text ?? 'text-slate-600',
      }
    })
    .sort((a, b) => b.value - a.value)

  return {
    total,
    today,
    week,
    activeProjects: projects.filter((p) => p.projectId).length,
    calendar: { daysInMonth, today: now.getDate(), activeDays },
    typeBreakdown,
    productivity: { avgPerDay, trendPct },
  }
}

export default async function ActivitesPage() {
  const [activities, stats] = await Promise.all([getUserActivities(), getActivityOverview()])

  const STATS = [
    { icon: Activity,     label: 'Total activités', value: stats.total,         sub: 'Toutes périodes',   iconColor: 'text-adp-blue',    iconBg: 'bg-blue-50' },
    { icon: Clock,        label: "Aujourd'hui",     value: stats.today,         sub: 'Depuis minuit',     iconColor: 'text-amber-600',   iconBg: 'bg-amber-50' },
    { icon: CalendarDays, label: 'Cette semaine',   value: stats.week,          sub: '7 derniers jours',  iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
    { icon: FolderKanban, label: 'Projets actifs',  value: stats.activeProjects, sub: 'Avec activité récente', iconColor: 'text-violet-600',  iconBg: 'bg-violet-50' },
  ]

  return (
    <div className="flex gap-5">
      {/* ── Colonne principale ── */}
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Activités"
          description="Suivez, gérez et filtrez toutes les activités de vos projets."
        />

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <ActivitesClient activities={activities} />
      </div>

      {/* ── Sidebar ── */}
      <div className="w-56 shrink-0 space-y-3">

        {/* Mini calendrier */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Calendrier</h3>
          </div>
          <div className="p-3">
            <p className="mb-2 text-center text-[13px] font-semibold capitalize text-adp-slate">{MONTH_LABEL}</p>
            <div className="grid grid-cols-7 gap-0.5 text-center">
              {['L','M','M','J','V','S','D'].map((d, i) => (
                <div key={i} className="py-1 text-[11px] font-bold uppercase text-adp-muted">{d}</div>
              ))}
              {Array.from({ length: stats.calendar.daysInMonth }, (_, i) => i + 1).map((d) => (
                <button key={d} className={cn(
                  'rounded-lg py-1 text-[12px] transition-colors duration-150',
                  d === stats.calendar.today
                    ? 'bg-adp-blue font-bold text-white'
                    : stats.calendar.activeDays.has(d)
                    ? 'bg-adp-blue/10 font-semibold text-adp-blue'
                    : 'text-adp-muted hover:bg-slate-100'
                )}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Répartition par type */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Répartition par type</h3>
          </div>
          <div className="space-y-3 p-4">
            {stats.typeBreakdown.length === 0 ? (
              <p className="text-center text-[13px] text-adp-muted">Aucune activité pour l'instant.</p>
            ) : stats.typeBreakdown.map(({ label, value, pct, color, text }) => (
              <div key={label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[13px] text-adp-muted">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={cn('text-[12px] font-bold', text)}>{pct}%</span>
                    <span className="text-[12px] font-semibold text-adp-slate">{value}</span>
                  </div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productivité équipe */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">Productivité équipe</h3>
          </div>
          <div className="p-4">
            <div className="flex items-end gap-2">
              <p className="text-[30px] font-bold leading-none text-adp-blue">{stats.productivity.avgPerDay}</p>
              <p className="mb-0.5 text-[13px] text-adp-muted">actions / jour</p>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <span className={cn(
                'rounded-md px-2 py-0.5 text-[12px] font-bold',
                stats.productivity.trendPct >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              )}>
                {stats.productivity.trendPct >= 0 ? '↑' : '↓'} {Math.abs(stats.productivity.trendPct)}%
              </span>
              <span className="text-[12px] text-adp-muted">vs semaine dernière</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
