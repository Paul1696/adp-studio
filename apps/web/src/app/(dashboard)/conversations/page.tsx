import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageSquare, Bot, Clock } from 'lucide-react'
import { MOCK_CONVERSATIONS, MOCK_AGENTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/page-header'
import { SidebarPanel } from '@/components/ui/sidebar-panel'
import { EmptyState } from '@/components/ui/empty-state'

export const metadata: Metadata = { title: 'Conversations IA' }

export default function ConversationsPage() {
  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <PageHeader
          title="Conversations IA"
          description="Toutes vos sessions de dialogue avec les agents ADP Studio."
        />

        {MOCK_CONVERSATIONS.length === 0 ? (
          <EmptyState icon={MessageSquare} title="Aucune conversation" description="Commencez une conversation avec un agent IA pour obtenir des réponses spécialisées." />
        ) : (
        <div className="space-y-2">
          {MOCK_CONVERSATIONS.map((conv) => {
            const agent = MOCK_AGENTS.find((a) => a.id === conv.agentId)
            return (
              <Link
                key={conv.id}
                href={`/conversations/${conv.id}`}
                className="group flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-adp-blue/20 hover:shadow-md"
              >
                {/* Icône agent */}
                <div className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[16px] font-bold',
                  agent?.colorBg ?? 'bg-slate-100',
                  agent?.color ?? 'text-slate-500',
                )}>
                  {agent?.icon ?? '?'}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[15px] font-semibold text-adp-slate transition-colors duration-150 group-hover:text-adp-blue">
                      {conv.title}
                    </p>
                    <span className="shrink-0 text-[12px] text-adp-muted">{conv.updatedAt}</span>
                  </div>
                  <p className="mt-0.5 text-[13px] text-adp-muted">{conv.agentName} · {conv.projectName}</p>
                  <p className="mt-1.5 text-[13px] leading-snug text-adp-muted line-clamp-2">{conv.summary}</p>
                  <div className="mt-2 flex items-center gap-3 text-[12px] text-adp-muted">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" strokeWidth={1.75} />
                      {conv.messageCount} messages
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" strokeWidth={1.75} />
                      {conv.createdAt}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        )}
      </div>

      <div className="w-56 shrink-0 space-y-3">
        <SidebarPanel title="Agents actifs">
          <div className="divide-y divide-slate-100/80">
            {MOCK_AGENTS.slice(0, 5).map((a) => {
              const count = MOCK_CONVERSATIONS.filter((c) => c.agentId === a.id).length
              return (
                <div key={a.id} className="flex items-center gap-2.5 px-4 py-2.5">
                  <div className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[12px] font-bold', a.colorBg, a.color)}>
                    {a.icon}
                  </div>
                  <span className="flex-1 truncate text-[13px] text-adp-muted">{a.name}</span>
                  <span className="text-[13px] font-semibold text-adp-slate">{count}</span>
                </div>
              )
            })}
          </div>
        </SidebarPanel>
      </div>
    </div>
  )
}
