import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MOCK_MISSIONS, MOCK_AGENTS, MOCK_PROJECTS } from '@/lib/mock-data'
import { MissionHeader } from './_components/mission-header'
import { MissionSteps } from './_components/mission-steps'
import { MissionSidebar } from './_components/mission-sidebar'

export const metadata: Metadata = { title: 'Mission IA' }

interface Props { params: Promise<{ id: string }> }

export default async function MissionDetailPage({ params }: Props) {
  const { id } = await params
  const mission = MOCK_MISSIONS.find((m) => m.id === id)
  if (!mission) notFound()

  const agents  = MOCK_AGENTS.filter((a) => mission.agentIds.includes(a.id))
  const project = MOCK_PROJECTS.find((p) => p.id === mission.projectId)

  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <MissionHeader mission={mission} />
        <MissionSteps  mission={mission} />
      </div>
      <div className="w-56 shrink-0">
        <MissionSidebar mission={mission} agents={agents} project={project} />
      </div>
    </div>
  )
}
