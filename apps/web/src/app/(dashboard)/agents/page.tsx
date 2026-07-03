import type { Metadata } from 'next'
import { Bot, BarChart3, FileSearch, ThumbsUp } from 'lucide-react'
import { MOCK_AGENTS } from '@/lib/mock-data'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'
import { AgentsClient } from './_components/agents-client'

export const metadata: Metadata = { title: 'Agents IA' }

const STATS = [
  { icon: Bot,        label: 'Agents disponibles',  value: '9',     sub: 'Tous actifs',           iconColor: 'text-adp-blue',    iconBg: 'bg-blue-50' },
  { icon: BarChart3,  label: 'Sessions ce mois',    value: '342',   sub: '+18% vs mois dernier',  iconColor: 'text-violet-600',  iconBg: 'bg-violet-50' },
  { icon: FileSearch, label: 'Documents analysés',  value: '1 284', sub: 'Cumul total',            iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
  { icon: ThumbsUp,   label: 'Taux de satisfaction', value: '97%',  sub: 'Basé sur 342 sessions', iconColor: 'text-amber-600',   iconBg: 'bg-amber-50' },
]

export default function AgentsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Agents IA"
        description="Agents spécialisés pour l'architecture, le BIM et la construction."
      />
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <AgentsClient agents={MOCK_AGENTS} />
    </div>
  )
}
