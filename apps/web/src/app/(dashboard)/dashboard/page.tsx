'use client'

import Link from 'next/link'
import {
  FolderPlus, FileSearch, Calculator,
  FileBarChart, Lightbulb, MessageSquare, ChevronRight,
} from 'lucide-react'
import { getUserProjects } from '@/lib/data/projects'
import { getUserMissions } from '@/lib/data/missions'
import { getAgents } from '@/lib/data/agents'
import { getUserActivities } from '@/lib/data/activities'
import { getUserDocuments } from '@/lib/data/documents'
import { HeroDashboard }    from '@/components/features/hero-dashboard'
import { QuickActionCard }  from '@/components/features/quick-action-card'
import { MissionCard }      from '@/components/features/mission-card'
import { ActiveMissions }   from '@/components/features/active-missions'
import { ProjectCard }      from '@/components/features/project-card'
import { FavoriteAgents }   from '@/components/features/favorite-agents'
import { RecentActivities } from '@/components/features/recent-activities'

const QUICK_ACTIONS = [
  { icon: FolderPlus,    label: 'Nouveau projet',          description: 'Créez un projet et invitez votre équipe.',  actionLabel: 'Créer',    href: '/projects',     gradient: 'bg-gradient-to-br from-blue-50/80 to-transparent',    iconBg: 'bg-blue-50',    iconColor: 'text-blue-600' },
  { icon: FileSearch,    label: 'Analyser un document',    description: 'PDF, DWG, RVT ou DOCX — résultat immédiat.', actionLabel: 'Analyser', href: '/missions/new', gradient: 'bg-gradient-to-br from-violet-50/80 to-transparent',  iconBg: 'bg-violet-50',  iconColor: 'text-violet-600' },
  { icon: Calculator,    label: 'Estimer un budget',       description: 'Estimation rapide en quelques secondes.',    actionLabel: 'Estimer',  href: '/missions/new', gradient: 'bg-gradient-to-br from-emerald-50/80 to-transparent', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { icon: FileBarChart,  label: 'Générer un rapport',      description: 'Rapport ou compte-rendu automatique.',       actionLabel: 'Générer',  href: '/missions/new', gradient: 'bg-gradient-to-br from-amber-50/80 to-transparent',   iconBg: 'bg-amber-50',   iconColor: 'text-amber-600' },
  { icon: Lightbulb,     label: 'Trouver une solution',    description: 'Recommandations techniques personnalisées.', actionLabel: 'Explorer', href: '/agents',       gradient: 'bg-gradient-to-br from-rose-50/80 to-transparent',    iconBg: 'bg-rose-50',    iconColor: 'text-rose-600' },
  { icon: MessageSquare, label: 'Discuter avec un expert', description: 'Lancez une conversation IA spécialisée.',   actionLabel: 'Démarrer', href: '/conversations',gradient: 'bg-gradient-to-br from-teal-50/80 to-transparent',    iconBg: 'bg-teal-50',    iconColor: 'text-teal-600' },
]

function SectionHeader({ title, href, linkLabel = 'Voir tout' }: { title: string; href: string; linkLabel?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">{title}</h2>
      <Link
        href={href}
        className="flex items-center gap-1 text-[13px] font-medium text-adp-muted transition-colors duration-150 hover:text-adp-blue"
      >
        {linkLabel}
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}

export default async function DashboardPage() {
  const [projects, missions, agents, activities, documents] = await Promise.all([
    getUserProjects(),
    getUserMissions(),
    getAgents(),
    getUserActivities(),
    getUserDocuments(),
  ])

  const lastProject = projects[0] ?? null
  const favoriteAgents = [...agents].sort((a, b) => b.usageCount - a.usageCount)

  const stats = {
    activeProjects: projects.filter((p) => p.status === 'en_cours').length,
    documents: documents.length,
    completedMissions: missions.filter((m) => m.status === 'completed').length,
    pendingMissions: missions.filter((m) => m.status === 'draft' || m.status === 'running').length,
  }

  return (
    <div className="flex gap-6">

      {/* ── Colonne principale ── */}
      <div className="min-w-0 flex-1 space-y-4">

        <HeroDashboard lastProject={lastProject} stats={stats} />

        {/* Actions rapides */}
        <section>
          <SectionHeader title="Actions rapides" href="/agents" linkLabel="Tous les outils" />
          <div className="grid grid-cols-3 gap-3">
            {QUICK_ACTIONS.map((props, i) => (
              <QuickActionCard key={props.label} {...props} delay={0.04 * i} />
            ))}
          </div>
        </section>

        {/* Missions actives */}
        <ActiveMissions missions={missions} agents={agents} />

        {/* Mission IA */}
        <MissionCard />

        {/* Projets récents */}
        <section>
          <SectionHeader title="Projets récents" href="/projects" linkLabel="Voir tous les projets" />
          <div className="grid grid-cols-4 gap-3">
            {projects.slice(0, 4).map((p, i) => (
              <ProjectCard key={p.id} project={p} members={p.members} delay={0.05 * i} index={i} />
            ))}
          </div>
        </section>
      </div>

      {/* ── Colonne droite ── */}
      <div className="w-64 shrink-0 space-y-3">
        <FavoriteAgents agents={favoriteAgents} />
        <RecentActivities activities={activities} />
      </div>
    </div>
  )
}
