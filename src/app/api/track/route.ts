import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orderNumber = searchParams.get('orderNumber')?.trim().toUpperCase()
    const phone = searchParams.get('phone')?.trim()

    if (!orderNumber || !phone) {
      return NextResponse.json({ error: 'Order Number and Phone Number are required' }, { status: 400 })
    }

    const order = await prisma.order.findFirst({
      where: {
        orderNumber,
        customerPhone: {
          endsWith: phone.slice(-10),
        },
      },
      include: {
        items: true,
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'No matching order found for this Order ID and phone number.' }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Track order error:', error)
    return NextResponse.json({ error: 'Failed to look up order' }, { status: 500 })
  }
}
