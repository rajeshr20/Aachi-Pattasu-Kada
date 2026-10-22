import { NextResponse } from 'next/server'
import { getDb, schema } from '../../../../../../../db'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const statusSchema = z.object({
  status: z.enum(['RECEIVED', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED', 'CANCELLED']),
  note: z.string().optional(),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const parsed = statusSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 422 })

  const { status, note } = parsed.data

  const changedBy = session.user.name || 'Admin'

  await getDb().transaction(async tx => {
    await tx.update(schema.order).set({ status }).where(eq(schema.order.id, id))
    await tx.insert(schema.orderStatusHistory).values({
      orderId: id, status,
      note: note || `Status changed to ${status}`,
      changedBy,
    })
  })

  return NextResponse.json({ success: true })
}
