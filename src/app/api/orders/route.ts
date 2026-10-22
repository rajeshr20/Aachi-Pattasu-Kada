import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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

async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const count = await prisma.order.count()
  return `APK-${year}-${String(count + 1).padStart(4, '0')}`
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
    // Upsert customer
    const customer = await prisma.customer.upsert({
      where: { phone: data.phone },
      update: { name: data.name, email: data.email || undefined, address: data.address },
      create: {
        name: data.name,
        phone: data.phone,
        whatsapp: data.whatsapp || data.phone,
        email: data.email || undefined,
        address: data.address,
        pincode: data.pincode,
      },
    })

    const orderNumber = await generateOrderNumber()

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        customerName: data.name,
        customerPhone: data.phone,
        customerEmail: data.email || undefined,
        customerAddress: data.address,
        customerPincode: data.pincode,
        whatsappNumber: data.whatsapp || data.phone,
        deliveryType: data.deliveryType,
        notes: data.notes,
        subtotal: data.subtotal,
        total: data.total,
        legalAccepted: data.legalAccepted,
        status: 'RECEIVED',
        paymentStatus: 'PENDING',
        items: {
          create: data.items.map(item => ({
            productId: item.productId || null,
            productName: item.productName,
            productNameTa: item.productNameTa,
            unit: item.unit,
            mrp: item.mrp,
            offerPrice: item.offerPrice,
            quantity: item.quantity,
            lineTotal: item.lineTotal,
          })),
        },
        statusHistory: {
          create: {
            status: 'RECEIVED',
            note: 'Order placed by customer',
          },
        },
      },
    })

    return NextResponse.json({ orderNumber: order.orderNumber, orderId: order.id }, { status: 201 })
  } catch (err) {
    console.error('Order creation failed:', err)
    return NextResponse.json({ error: 'Failed to create order. Please try again.' }, { status: 500 })
  }
}
