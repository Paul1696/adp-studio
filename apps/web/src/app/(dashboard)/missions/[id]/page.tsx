import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMission } from '@/lib/data/missions'
import { getAgents } from '@/lib/data/agents'
import { getProject } from '@/lib/data/projects'
import { MissionHeader } from './_components/mission-header'
import { MissionSteps } from './_components/mission-steps'
import { MissionSidebar } from './_components/mission-sidebar'

export const metadata: Metadata = { title: 'Mission IA' }
export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }> }

export default async function MissionDetailPage({ params }: Props) {
  const { id } = await params
  const mission = await getMission(id)
  if (!mission) notFound()

  const allAgents = await getAgents()
  const agents  = allAgents.filter((a) => mission.agentIds.includes(a.id))
  const projectResult = mission.projectId ? await getProject(mission.projectId) : null
  const project = projectResult?.ui

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
