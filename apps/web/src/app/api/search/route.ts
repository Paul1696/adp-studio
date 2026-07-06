import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentDbUser } from '@/lib/data/users'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') ?? '').trim()
  if (q.length < 2) return NextResponse.json({ projects: [], agents: [], documents: [] })

  const user = await getCurrentDbUser()
  if (!user) return NextResponse.json({ projects: [], agents: [], documents: [] })

  const [projects, agents, documents] = await Promise.all([
    prisma.project.findMany({
      where: {
        members: { some: { userId: user.id } },
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { location: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: { id: true, name: true, location: true },
      take: 3,
    }),
    prisma.agent.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { category: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: { id: true, name: true, category: true },
      take: 3,
    }),
    prisma.document.findMany({
      where: {
        OR: [{ uploadedBy: user.id }, { project: { members: { some: { userId: user.id } } } }],
        name: { contains: q, mode: 'insensitive' },
      },
      select: { id: true, name: true, type: true },
      take: 3,
    }),
  ])

  return NextResponse.json({
    projects: projects.map((p) => ({ id: p.id, name: p.name, location: p.location ?? '—' })),
    agents: agents.map((a) => ({ id: a.id, name: a.name, specialty: a.category })),
    documents: documents.map((d) => ({ id: d.id, name: d.name, type: d.type })),
  })
}
