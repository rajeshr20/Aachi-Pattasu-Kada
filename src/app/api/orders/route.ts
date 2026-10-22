import { NextResponse } from 'next/server'
import { getDb, schema } from '../../../../db'
import { z } from 'zod'

const orderSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().min(5).max(500),
  pincode: z.string().max(6).optional(),
  deliveryType: z.enum(['PICKUP', 'PARCEL']).default('PICKUP'),
  notes: z.string().max(500).optional(),
  legalAccepted: z.boolean().refine(v => v === true, 'Must accept legal notice'),
  honeypot: z.string().max(0, 'Bot detected').optional(),
  items: z.array(z.object({
    productId: z.string().optional(),
    productName: z.string(),
    productNameTa: z.string(),
    unit: z.string(),
    mrp: z.number().nonnegative(),
    offerPrice: z.number().nonnegative(),
    quantity: z.number().int().positive(),
    lineTotal: z.number().nonnegative(),
  })).min(1),
  subtotal: z.number().nonnegative(),
  total: z.number().nonnegative(),
})

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const parsed = orderSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Validation error' }, { status: 422 })
  }

  const data = parsed.data

  // Min order check
  const minOrder = 3000
  if (data.total < minOrder) {
    return NextResponse.json({ error: `Minimum order is ₹${minOrder}` }, { status: 422 })
  }

  try {
    const order = await getDb().transaction(async tx => {
      const [customer] = await tx.insert(schema.customer).values({
        name: data.name, phone: data.phone, whatsapp: data.whatsapp || data.phone,
        email: data.email || null, address: data.address, pincode: data.pincode,
      }).onConflictDoUpdate({
        target: schema.customer.phone,
        set: { name: data.name, email: data.email || undefined, address: data.address },
      }).returning()

      // UUID suffixes avoid collisions between simultaneous serverless requests.
      const orderNumber = `APK-${new Date().getFullYear()}-${crypto.randomUUID().toUpperCase()}`
      const [created] = await tx.insert(schema.order).values({
        orderNumber, customerId: customer.id,
        customerName: data.name, customerPhone: data.phone,
        customerEmail: data.email || null, customerAddress: data.address,
        customerPincode: data.pincode, whatsappNumber: data.whatsapp || data.phone,
        deliveryType: data.deliveryType, notes: data.notes,
        subtotal: data.subtotal, total: data.total, legalAccepted: data.legalAccepted,
      }).returning()
      await tx.insert(schema.orderItem).values(data.items.map(item => ({
        ...item, productId: item.productId || null, orderId: created.id,
      })))
      await tx.insert(schema.orderStatusHistory).values({
        orderId: created.id, status: 'RECEIVED', note: 'Order placed by customer',
      })
      return created
    })

    return NextResponse.json({ orderNumber: order.orderNumber, orderId: order.id }, { status: 201 })
  } catch (err) {
    console.error('Order creation failed:', err)
    return NextResponse.json({ error: 'Failed to create order. Please try again.' }, { status: 500 })
  }
}
