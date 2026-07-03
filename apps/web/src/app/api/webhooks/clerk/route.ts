import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'No webhook secret' }, { status: 500 })

  const headersList = await headers()
  const svixId        = headersList.get('svix-id')
  const svixTimestamp = headersList.get('svix-timestamp')
  const svixSignature = headersList.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const payload = await req.text()
  const wh = new Webhook(secret)
  let event: { type: string; data: Record<string, unknown> }

  try {
    event = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as typeof event
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const { type, data } = event

  if (type === 'user.created' || type === 'user.updated') {
    const emails = data.email_addresses as { email_address: string; id: string }[]
    const primaryEmailId = data.primary_email_address_id as string
    const primaryEmail = emails.find((e) => e.id === primaryEmailId)?.email_address ?? ''

    await prisma.user.upsert({
      where: { clerkId: data.id as string },
      update: {
        email:     primaryEmail,
        firstName: data.first_name as string | null,
        lastName:  data.last_name  as string | null,
        avatarUrl: data.image_url  as string | null,
      },
      create: {
        clerkId:   data.id as string,
        email:     primaryEmail,
        firstName: data.first_name as string | null,
        lastName:  data.last_name  as string | null,
        avatarUrl: data.image_url  as string | null,
      },
    })
  }

  if (type === 'user.deleted') {
    await prisma.user.deleteMany({ where: { clerkId: data.id as string } })
  }

  return NextResponse.json({ received: true })
}
