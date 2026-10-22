import { connection } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSettings } from '@/lib/settings'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductsPageClient from '@/components/products/ProductsPageClient'
import WhatsAppFab from '@/components/WhatsAppFab'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop Firecrackers',
  description: 'Browse all firecrackers, sparklers, rockets and gift boxes at factory prices.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  // Query live data only when handling a request, never during prerendering.
  await connection()

  const params = await searchParams
  const [settings, categories, products] = await Promise.all([
    getSettings(),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.product.findMany({
      where: { isDeleted: false },
      include: {
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
        category: { select: { name: true, nameTa: true, slug: true } },
      },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { name: 'asc' }],
    }),
  ])

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
