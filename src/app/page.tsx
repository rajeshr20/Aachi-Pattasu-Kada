import { getSettings } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from '@/lib/catalogData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
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

    // Ensure categories are always populated
    const categories: any[] = categoriesFromDb && categoriesFromDb.length > 0 ? categoriesFromDb : DEFAULT_CATEGORIES

    // Ensure featured products are always populated and visible
    let featuredProducts: any[] = featuredFromDb && featuredFromDb.length > 0 ? featuredFromDb : allActiveFromDb
    if (!featuredProducts || featuredProducts.length === 0) {
      featuredProducts = DEFAULT_PRODUCTS.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 8)
    }

    // Ensure new arrivals are always populated and distinct
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
    <main className="min-h-screen bg-[#0B0D1A] flex flex-col">
      <Header settings={settings} />

      {/* Hero Section */}
      <HeroSection settings={settings} />

      {/* Explore Categories Collection */}
      <CategoryGrid categories={categories} />

      {/* Best Selling Firecrackers with Gold Festive Tone */}
      <FeaturedProducts
        products={featuredProducts}
        title="⭐ Best Selling Diwali Crackers"
        subtitle="Top customer favorites from Sivakasi with guaranteed factory wholesale discounts up to 80% off"
        badgeText="Best Sellers • Maximum Savings"
        accent="gold"
        bgTone="deep"
      />

      {/* Trending & New 2026 Arrivals with Crimson Accent */}
      <FeaturedProducts
        products={newArrivals}
        title="🎆 Trending & New 2026 Arrivals"
        subtitle="Experience our latest certified eco-friendly formulations, aerial repeaters, and dazzling sparkles"
        badgeText="Brand New 2026 Stock"
        accent="crimson"
        bgTone="navy"
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Safety Strip */}
      <SafetyStrip />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Landmark Map & Location */}
      <MapSection settings={settings} />

      {/* Footer */}
      <Footer settings={settings} />

      {/* WhatsApp Floating Button */}
      <WhatsAppFab settings={settings} />
    </main>
  )
}
