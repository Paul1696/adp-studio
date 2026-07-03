import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ projects: [] })

  const memberships = await prisma.projectMember.findMany({
    where: { userId: user.id },
    include: {
      project: {
        include: {
          members: { include: { user: true } },
          _count: { select: { documents: true, missions: true } },
        },
      },
    },
    orderBy: { project: { updatedAt: 'desc' } },
  })

  const projects = memberships.map((m) => m.project)
  return NextResponse.json({ projects })
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const body = await req.json()
  const { name, description, location, surface, startDate, endDate, budget } = body

  if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })

  const project = await prisma.project.create({
    data: {
      name: name.trim(),
      description,
      location,
      surface: surface ? parseFloat(surface) : null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      budget: budget ? parseFloat(budget) : null,
      members: { create: { userId: user.id, role: 'Chef de projet' } },
    },
  })

  return NextResponse.json({ project }, { status: 201 })
}
