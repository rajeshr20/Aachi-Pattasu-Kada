import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({
  status: z.enum(['RECEIVED', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED', 'CANCELLED']),
  note: z.string().optional(),
})

export const dynamic = 'force-dynamic'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 422 })

  const { status, note } = parsed.data

  await prisma.order.update({
    where: { id },
    data: {
      status,
      statusHistory: {
        create: {
          status,
          note: note || `Status changed to ${status}`,
          changedBy: session.user.name || 'Admin',
        },
      },
    },
  })

  return NextResponse.json({ success: true })
}
