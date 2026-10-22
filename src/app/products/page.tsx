import { prisma } from '@/lib/prisma'
import { getSettings } from '@/lib/settings'
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from '@/lib/catalogData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductsPageClient from '@/components/products/ProductsPageClient'
import WhatsAppFab from '@/components/WhatsAppFab'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Shop Firecrackers',
  description: 'Browse all firecrackers, sparklers, rockets and gift boxes at factory prices.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const params = await searchParams

  let settings = await getSettings()
  let categories = DEFAULT_CATEGORIES
  let products = DEFAULT_PRODUCTS

  try {
    const [categoriesFromDb, productsFromDb] = await Promise.all([
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }).catch(() => []),
      prisma.product.findMany({
        where: { isDeleted: false },
        include: {
          images: { orderBy: { sortOrder: 'asc' }, take: 1 },
          category: { select: { name: true, nameTa: true, slug: true } },
        },
        orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { name: 'asc' }],
      }).catch(() => []),
    ])

    if (categoriesFromDb && categoriesFromDb.length > 0) {
      categories = categoriesFromDb
    }
    if (productsFromDb && productsFromDb.length > 0) {
      products = productsFromDb as unknown as typeof DEFAULT_PRODUCTS
    }
  } catch {
    // Graceful fallback to default Sivakasi catalog
    categories = DEFAULT_CATEGORIES
    products = DEFAULT_PRODUCTS
  }

  return (
    <main className="min-h-screen bg-[#0B0D1A]">
      <Header settings={settings} />
      <ProductsPageClient
        products={products}
        categories={categories}
        initialCategory={params.category}
        initialSearch={params.q}
        minOrder={Number(settings.min_order) || 3000}
      />
      <Footer settings={settings} />
      <WhatsAppFab settings={settings} />
    </main>
  )
}
