import { getSettings } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from '@/lib/catalogData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import PromotionalBanner from '@/components/home/PromotionalBanner'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import SafetyStrip from '@/components/home/SafetyStrip'
import MapSection from '@/components/home/MapSection'
import FAQSection from '@/components/home/FAQSection'
import WhatsAppFab from '@/components/WhatsAppFab'

export const revalidate = 60

async function getHomePageData() {
  try {
    const [settings, categoriesFromDb, featuredFromDb, newArrivalsFromDb, allActiveFromDb] = await Promise.all([
      getSettings(),
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }).catch(() => []),
      prisma.product.findMany({
        where: { isFeatured: true, isDeleted: false, inStock: true },
        include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 }, category: true },
        take: 8,
      }).catch(() => []),
      prisma.product.findMany({
        where: { isNewArrival: true, isDeleted: false, inStock: true },
        include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 }, category: true },
        take: 8,
      }).catch(() => []),
      prisma.product.findMany({
        where: { isDeleted: false, inStock: true },
        include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 }, category: true },
        take: 12,
      }).catch(() => []),
    ])

    const categories: any[] = categoriesFromDb && categoriesFromDb.length > 0 ? categoriesFromDb : DEFAULT_CATEGORIES

    let featuredProducts: any[] = featuredFromDb && featuredFromDb.length > 0 ? featuredFromDb : allActiveFromDb
    if (!featuredProducts || featuredProducts.length === 0) {
      featuredProducts = DEFAULT_PRODUCTS.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 8)
    }

    let newArrivals: any[] = newArrivalsFromDb && newArrivalsFromDb.length > 0 ? newArrivalsFromDb : []
    if (!newArrivals || newArrivals.length === 0) {
      const fallbackNew = DEFAULT_PRODUCTS.filter((p) => p.isNewArrival)
      newArrivals = fallbackNew.length > 0 ? fallbackNew : DEFAULT_PRODUCTS.slice(4, 12)
    }

    return { settings, categories, featuredProducts, newArrivals }
  } catch {
    return {
      settings: await getSettings(),
      categories: DEFAULT_CATEGORIES as any[],
      featuredProducts: DEFAULT_PRODUCTS.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 8) as any[],
      newArrivals: DEFAULT_PRODUCTS.filter((p) => p.isNewArrival || !p.isFeatured).slice(0, 8) as any[],
    }
  }
}

export default async function HomePage() {
  const { settings, categories, featuredProducts, newArrivals } = await getHomePageData()

  return (
    <main className="min-h-screen bg-[#10172A] flex flex-col">
      {/* Refined Navigation Header */}
      <Header settings={settings} />

      {/* Cinematic Fireworks Hero Section */}
      <HeroSection settings={settings} />

      {/* Category Grid Collection (Warm Ivory) */}
      <CategoryGrid categories={categories} />

      {/* Best Selling Products (Pure White Catalog Grid) */}
      <FeaturedProducts
        products={featuredProducts}
        title="Best Selling Diwali Crackers"
        subtitle="Top customer favorites from Sivakasi with guaranteed factory wholesale pricing"
        badgeText="Best Sellers • Maximum Savings"
        bgTone="white"
      />

      {/* Cinematic Dark Promotional Feature Banner */}
      <PromotionalBanner />

      {/* Trending & New 2026 Formulations (Warm Ivory) */}
      <FeaturedProducts
        products={newArrivals}
        title="Trending & New 2026 Arrivals"
        subtitle="Experience our latest certified eco-friendly formulations, sparkling repeaters, and vibrant aerial bursts"
        badgeText="Brand New 2026 Stock"
        bgTone="ivory"
      />

      {/* Why Choose Us (Brand Trust & Benefits) */}
      <WhyChooseUs />

      {/* Responsible Fireworks Safety Guidelines */}
      <SafetyStrip />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Landmark Store Map & Location */}
      <MapSection settings={settings} />

      {/* Midnight Navy Multi-Column Footer */}
      <Footer settings={settings} />

      {/* WhatsApp Quick Floating Action */}
      <WhatsAppFab settings={settings} />
    </main>
  )
}
