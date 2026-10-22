import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

import { DEFAULT_PRODUCTS } from '@/lib/catalogData'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categorySlug = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('q')

    const where: any = {
      isDeleted: false,
    }

    if (categorySlug && categorySlug !== 'ALL') {
      where.category = { slug: categorySlug }
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { nameTa: { contains: search } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
      },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    if (products.length === 0 && !search && (!categorySlug || categorySlug === 'ALL')) {
      return NextResponse.json({ products: DEFAULT_PRODUCTS })
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ products: DEFAULT_PRODUCTS })
  }
}
