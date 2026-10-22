import { NextResponse } from 'next/server'
import { getDb, schema } from '../../../../../db'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameTa: z.string().min(1, 'Tamil Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  categoryId: z.string().min(1, 'Category is required'),
  mrp: z.number().positive(),
  offerPrice: z.number().positive(),
  unit: z.string().default('1 box'),
  stock: z.number().int().default(100),
  inStock: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  description: z.string().optional(),
  descTa: z.string().optional(),
})

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const products = await getDb().query.product.findMany({
      where: { isDeleted: false },
      with: { category: true },
      orderBy: { sortOrder: 'asc', createdAt: 'desc' },
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const result = productSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message || 'Invalid input' }, { status: 400 })
    }

    const [product] = await getDb().insert(schema.product).values(result.data).returning()

    return NextResponse.json({ success: true, product })
  } catch (error: any) {
    if ((error.cause?.code || error.code) === '23505') {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await getDb().update(schema.product).set({ isDeleted: true }).where(eq(schema.product.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
