import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function syncUser() {
  const { userId } = await auth()
  if (!userId) return null

  const existing = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (existing) return existing

  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const primaryEmail = clerkUser.emailAddresses.find(
    (e) => e.id === clerkUser.primaryEmailAddressId
  )?.emailAddress ?? ''

  return prisma.user.create({
    data: {
      clerkId:   userId,
      email:     primaryEmail,
      firstName: clerkUser.firstName,
      lastName:  clerkUser.lastName,
      avatarUrl: clerkUser.imageUrl,
    },
  })
}
