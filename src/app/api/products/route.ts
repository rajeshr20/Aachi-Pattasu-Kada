import { NextResponse } from 'next/server'
import { getDb } from '../../../../db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categorySlug = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('q')

    const where: NonNullable<Parameters<ReturnType<typeof getDb>["query"]["product"]["findMany"]>[0]>["where"] = {
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
        { name: { ilike: `%${search.replace(/[%_\\]/g, "\\$&")}%` } },
        { nameTa: { ilike: `%${search.replace(/[%_\\]/g, "\\$&")}%` } },
      ]
    }

    const products = await getDb().query.product.findMany({
      where,
      with: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          limit: 1,
        },
      },
      orderBy: { sortOrder: 'asc', createdAt: 'desc' },
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
