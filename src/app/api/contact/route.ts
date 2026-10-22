import { NextResponse } from 'next/server'
import { getDb, schema } from '../../../../db'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().min(5, 'Message must be at least 5 characters'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message || 'Invalid input' }, { status: 400 })
    }

    const { name, phone, email, message } = result.data

    const [enquiry] = await getDb().insert(schema.enquiry).values({
        name,
        phone,
        email: email || null,
        message,
    }).returning()

    return NextResponse.json({ success: true, id: enquiry.id })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }
}
