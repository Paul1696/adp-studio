import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const body = await req.json()
  const { objectif, projectId, agentIds } = body as {
    objectif?: string
    projectId?: string
    agentIds?: string[]
  }

  if (!objectif?.trim()) return NextResponse.json({ error: 'Objectif requis' }, { status: 400 })
  if (!agentIds?.length) return NextResponse.json({ error: 'Au moins un agent requis' }, { status: 400 })

  if (projectId) {
    const membership = await prisma.projectMember.findFirst({
      where: { projectId, userId: user.id },
    })
    if (!membership) return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 })
  }

  const mission = await prisma.mission.create({
    data: {
      objectif: objectif.trim(),
      status: 'PENDING',
      projectId: projectId || null,
      userId: user.id,
      agents: { create: agentIds.map((agentId) => ({ agentId })) },
    },
  })

  await prisma.activity.create({
    data: {
      type: 'MISSION_LAUNCH',
      label: 'Mission créée',
      detail: objectif.trim().slice(0, 200),
      projectId: projectId || null,
      userId: user.id,
    },
  })

  return NextResponse.json({ mission }, { status: 201 })
}
