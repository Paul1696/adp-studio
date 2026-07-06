import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

/** Utilisateur DB correspondant à la session Clerk (null si non connecté / non synchronisé). */
export async function getCurrentDbUser() {
  const { userId } = await auth()
  if (!userId) return null

  const existing = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (existing) return existing

  // Filet de sécurité si le webhook Clerk n'est pas encore passé
  const cu = await currentUser()
  if (!cu) return null
  const email = cu.primaryEmailAddress?.emailAddress ?? ''
  if (!email) return null

  return prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: {
      clerkId: userId,
      email,
      firstName: cu.firstName,
      lastName: cu.lastName,
      avatarUrl: cu.imageUrl,
    },
  })
}

export function fullName(u: { firstName: string | null; lastName: string | null; email: string }) {
  const name = `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim()
  return name || u.email
}

export function initials(u: { firstName: string | null; lastName: string | null; email: string }) {
  const a = u.firstName?.[0] ?? ''
  const b = u.lastName?.[0] ?? ''
  return (a + b).toUpperCase() || u.email.slice(0, 2).toUpperCase()
}
