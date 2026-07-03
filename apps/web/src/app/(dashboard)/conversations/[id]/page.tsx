import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, Lock, MessageSquare, Zap, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { MOCK_CONVERSATIONS, MOCK_AGENTS, MOCK_MISSIONS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { SidebarPanel } from '@/components/ui/sidebar-panel'
import { ChatBubble } from '@/components/ui/chat-bubble'

export const metadata: Metadata = { title: 'Conversation' }

interface Props { params: Promise<{ id: string }> }

export default async function ConversationDetailPage({ params }: Props) {
  const { id } = await params
  const conv = MOCK_CONVERSATIONS.find((c) => c.id === id)
  if (!conv) notFound()

  const agent = MOCK_AGENTS.find((a) => a.id === conv.agentId)

  return (
    <div className="flex gap-5">
      {/* Colonne principale */}
      <div className="min-w-0 flex-1 space-y-4">
        {/* Retour */}
        <Link href="/conversations" className="flex items-center gap-1.5 text-[12px] text-adp-muted hover:text-adp-slate">
          <ArrowLeft className="h-3 w-3" strokeWidth={2} />
          Toutes les conversations
        </Link>

        {/* Header */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[16px] font-bold', agent?.colorBg, agent?.color)}>
              {agent?.icon}
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-adp-slate">{conv.title}</h1>
              <p className="text-[12px] text-adp-muted">{conv.agentName} · {conv.projectName}</p>
            </div>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-adp-muted">{conv.summary}</p>
        </div>

        {/* Messages */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="space-y-5 px-5 py-5">
            {conv.messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
                authorName={msg.role === 'user' ? 'Paul Figueras' : (msg.agentName ?? conv.agentName)}
                authorInitials={msg.role === 'user' ? 'PF' : (agent?.icon ?? '?')}
                authorColorBg={msg.role === 'agent' ? agent?.colorBg : undefined}
                authorColor={msg.role === 'agent' ? agent?.color : undefined}
              />
            ))}
          </div>

          {/* Zone saisie désactivée */}
          <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <Lock className="h-3.5 w-3.5 shrink-0 text-adp-muted" strokeWidth={1.75} />
              <span className="flex-1 text-[13px] text-adp-muted/70">Envoyer un message…</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                Lecture seule
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-56 shrink-0 space-y-3">
        {/* Agent */}
        <SidebarPanel title="Agent">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold', agent?.colorBg, agent?.color)}>
                {agent?.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-adp-slate">{conv.agentName}</p>
                <p className="truncate text-[11px] text-adp-muted">{agent?.specialty}</p>
              </div>
            </div>
            <Link href={`/agents/${conv.agentId}`} className="mt-3 flex items-center gap-1 text-[12px] font-medium text-adp-blue hover:underline">
              Voir l&apos;agent <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </SidebarPanel>

        {/* Infos */}
        <SidebarPanel title="Infos">
          <div className="divide-y divide-slate-100/80">
            {[
              { label: 'Projet',   value: conv.projectName },
              { label: 'Messages', value: String(conv.messageCount) },
              { label: 'Créée',    value: conv.createdAt },
              { label: 'Mise à jour', value: conv.updatedAt },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-2 px-4 py-2.5">
                <span className="text-[12px] text-adp-muted">{label}</span>
                <span className="max-w-[100px] text-right text-[12px] font-medium text-adp-slate">{value}</span>
              </div>
            ))}
          </div>
        </SidebarPanel>

        {/* Mission liée */}
        {conv.missionId && (() => {
          const mission = MOCK_MISSIONS.find((m) => m.id === conv.missionId)
          if (!mission) return null
          return (
            <SidebarPanel title="Mission liée">
              <div className="px-4 py-3">
                <div className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-adp-blue" strokeWidth={1.75} />
                  <p className="text-[13px] font-medium leading-snug text-adp-slate">{mission.title}</p>
                </div>
                <Link href={`/missions/${mission.id}`} className="mt-2.5 flex items-center gap-1 text-[12px] font-medium text-adp-blue hover:underline">
                  Voir la mission <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </SidebarPanel>
          )
        })()}

        {/* Compteur messages */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-adp-muted" strokeWidth={1.75} />
            <span className="text-[13px] text-adp-muted">{conv.messageCount} messages échangés</span>
          </div>
        </div>
      </div>
    </div>
  )
}
