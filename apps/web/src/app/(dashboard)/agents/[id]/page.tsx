import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MessageSquare, CheckCircle2, Zap, CheckCircle, ArrowLeft, Bot } from 'lucide-react'
import type { MockAgent } from '@/lib/mock-data'
import type { Mission } from '@/lib/types'
import { getAgent } from '@/lib/data/agents'
import { getAgentMissions } from '@/lib/data/missions'
import { cn } from '@/lib/utils'
import { StatCard } from '@/components/ui/stat-card'
import { SidebarPanel } from '@/components/ui/sidebar-panel'

export const metadata: Metadata = { title: 'Agent IA' }
export const dynamic = 'force-dynamic'

type Agent = MockAgent

function AgentDetails({ agent }: { agent: Agent }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h3 className="text-[12px] font-semibold tracking-tight text-adp-slate">Description</h3>
        </div>
        <div className="p-4">
          <p className="text-[13px] leading-relaxed text-adp-slate">{agent.description}</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h3 className="text-[12px] font-semibold tracking-tight text-adp-slate">Compétences</h3>
        </div>
        <div className="divide-y divide-slate-100/80">
          {agent.competences.map((c) => (
            <div key={c} className="flex items-center gap-2.5 px-4 py-2.5">
              <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={1.75} />
              <span className="text-[12px] text-adp-slate">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AgentMissions({ missions }: { missions: Mission[] }) {
  if (missions.length === 0) return null
  const STATUS_CLS = {
    draft:     'bg-slate-100 text-slate-600',
    running:   'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    failed:    'bg-red-100 text-red-700',
  }
  const STATUS_LABEL = { draft: 'Brouillon', running: 'En cours', completed: 'Terminée', failed: 'Échouée' }
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-[14px] font-semibold tracking-tight text-adp-slate">Missions récentes</h3>
      </div>
      <table className="w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            {['Mission', 'Projet', 'Étapes', 'Statut', 'Date'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-adp-muted">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {missions.map((m) => {
            const done = m.steps.filter((s) => s.status === 'done').length
            return (
              <tr key={m.id} className="transition-colors duration-100 hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <Link href={`/missions/${m.id}`} className="text-[13px] font-medium text-adp-blue hover:underline">{m.title}</Link>
                </td>
                <td className="px-4 py-3 text-[12px] text-adp-muted">{m.projectName}</td>
                <td className="px-4 py-3 text-[12px] text-adp-muted">{done}/{m.steps.length}</td>
                <td className="px-4 py-3">
                  <span className={cn('rounded-md px-2 py-0.5 text-[11px] font-semibold', STATUS_CLS[m.status])}>
                    {STATUS_LABEL[m.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-[12px] text-adp-muted">{m.completedAt ?? m.createdAt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function AgentSidebar({ agent }: { agent: Agent }) {
  return (
    <div className="w-56 shrink-0 space-y-3">
      <SidebarPanel title="Modèle IA">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-adp-blue" strokeWidth={1.75} />
            <p className="text-[12px] font-semibold text-adp-slate">{agent.model}</p>
          </div>
          <p className="mt-1 text-[11px] text-adp-muted">Anthropic Claude</p>
        </div>
      </SidebarPanel>
      <SidebarPanel title="Actions rapides">
        <div className="divide-y divide-slate-100/80">
          {[
            { label: 'Lancer une mission', href: `/missions/new?agentId=${agent.id}` },
            { label: 'Voir les conversations', href: '/conversations' },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="flex w-full items-center justify-between px-4 py-2.5 text-[12px] text-adp-muted transition-colors hover:bg-slate-50 hover:text-adp-blue">
              {label}
              <span className="text-slate-300">→</span>
            </Link>
          ))}
        </div>
      </SidebarPanel>
    </div>
  )
}

function AgentHeader({ agent }: { agent: Agent }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-[22px] font-bold', agent.colorBg, agent.color)}>
          {agent.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-[19px] font-bold text-adp-slate">{agent.name}</h1>
              <p className="mt-0.5 text-[13px] text-adp-muted">{agent.specialty}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-600">Actif</span>
              <Link
                href={`/missions/new?agentId=${agent.id}`}
                className="flex items-center gap-1.5 rounded-xl bg-adp-blue px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-md"
              >
                <Zap className="h-3.5 w-3.5" strokeWidth={1.75} />
                Lancer une mission
              </Link>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {agent.tags.map((t) => (
              <span key={t} className="rounded-md bg-adp-blue/8 px-2.5 py-0.5 text-[11px] font-semibold text-adp-blue">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface Props { params: Promise<{ id: string }> }

export default async function AgentDetailPage({ params }: Props) {
  const { id } = await params
  const agent = await getAgent(id)
  if (!agent) notFound()

  const missions = await getAgentMissions(id)
  const completed = missions.filter((m) => m.status === 'completed').length

  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">

        {/* Retour */}
        <Link href="/agents" className="flex items-center gap-1.5 text-[12px] text-adp-muted hover:text-adp-slate">
          <ArrowLeft className="h-3 w-3" strokeWidth={2} />
          Tous les agents
        </Link>

        {/* StatCards */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={MessageSquare} label="Missions lancées"   value={agent.usageCount.toLocaleString('fr-FR')} sub="Cumul"          iconColor="text-adp-blue"    iconBg="bg-blue-50" />
          <StatCard icon={CheckCircle2}  label="Missions terminées" value={String(completed)}                        sub="Cumul"          iconColor="text-emerald-600" iconBg="bg-emerald-50" />
          <StatCard icon={Zap}           label="Missions en cours"  value={String(missions.filter((m) => m.status === 'running').length)} sub="Actuellement" iconColor="text-violet-600" iconBg="bg-violet-50" />
        </div>

        {/* Header agent */}
        <AgentHeader agent={agent} />

        {/* Description + compétences */}
        <AgentDetails agent={agent} />

        {/* Missions récentes */}
        <AgentMissions missions={missions} />

      </div>

      {/* Sidebar */}
      <AgentSidebar agent={agent} />
    </div>
  )
}
