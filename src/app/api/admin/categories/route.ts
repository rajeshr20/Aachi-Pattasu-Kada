import { NextResponse } from 'next/server'
import { getDb, schema } from '../../../../../db'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameTa: z.string().min(1, 'Tamil Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  icon: z.string().optional(),
})

export async function GET() {
  try {
    const categories = await getDb().query.category.findMany({
      orderBy: { sortOrder: 'asc' },
      with: {
        products: true,
      },
    })
    return NextResponse.json({ categories: categories.map(({ products, ...category }) => ({ ...category, _count: { products: products.length } })) })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const result = categorySchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message || 'Invalid input' }, { status: 400 })
    }

    const [category] = await getDb().insert(schema.category).values(result.data).returning()

    return NextResponse.json({ success: true, category })
  } catch (error: any) {
    if ((error.cause?.code || error.code) === '23505') {
      return NextResponse.json({ error: 'Category with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
