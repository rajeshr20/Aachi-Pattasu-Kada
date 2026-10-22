import { getSettings } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from '@/lib/catalogData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import HowItWorks from '@/components/home/HowItWorks'
import PromotionalBanner from '@/components/home/PromotionalBanner'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import SafetyStrip from '@/components/home/SafetyStrip'
import MapSection from '@/components/home/MapSection'
import FAQSection from '@/components/home/FAQSection'
import WhatsAppFab from '@/components/WhatsAppFab'

export const revalidate = 60

async function getHomePageData() {
  try {
    const [settings, categoriesFromDb, featuredFromDb, allActiveFromDb] = await Promise.all([
      getSettings(),
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }).catch(() => []),
      prisma.product.findMany({
        where: { isFeatured: true, isDeleted: false, inStock: true },
        include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 }, category: true },
        take: 12,
      }).catch(() => []),
      prisma.product.findMany({
        where: { isDeleted: false, inStock: true },
        include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 }, category: true },
        take: 16,
      }).catch(() => []),
    ])

    const categories: any[] = categoriesFromDb && categoriesFromDb.length > 0 ? categoriesFromDb : DEFAULT_CATEGORIES

    let featuredProducts: any[] = featuredFromDb && featuredFromDb.length > 0 ? featuredFromDb : allActiveFromDb
    if (!featuredProducts || featuredProducts.length === 0) {
      featuredProducts = DEFAULT_PRODUCTS.filter((p) => p.isFeatured || p.isBestSeller)
    }

    return { settings, categories, featuredProducts }
  } catch {
    return {
      settings: await getSettings(),
      categories: DEFAULT_CATEGORIES as any[],
      featuredProducts: DEFAULT_PRODUCTS.filter((p) => p.isFeatured || p.isBestSeller) as any[],
    }
  }
}

export default async function HomePage() {
  const { settings, categories, featuredProducts } = await getHomePageData()

  return (
    <main className="min-h-screen bg-[#10172A] flex flex-col">
      {/* Refined Navigation Header with Top Announcement Bar */}
      <Header settings={settings} />

      {/* Cinematic Fireworks Hero Section with 4-Column Highlights Bar */}
      <HeroSection settings={settings} />

      {/* Category Grid Collection (Spacious Warm Ivory) */}
      <CategoryGrid categories={categories} />

      {/* All-Time Festive Bestsellers with Quick Category Pills (Pure White) */}
      <FeaturedProducts
        products={featuredProducts}
        title="All-Time Festive Bestsellers"
        subtitle="Our most loved family crackers, tested for vibrant colours, sparkling fountains, and maximum reliability"
        badgeText="Top Recommended • Direct Sivakasi Deals"
        bgTone="white"
      />

      {/* Simple 3-Step Ordering Flow (Rathinam Style) */}
      <HowItWorks />

      {/* Cinematic Dark Promotional Feature: Curated Gift Hampers */}
      <PromotionalBanner />

      {/* The Aachi Promise (Brand Trust & Benefits) */}
      <WhyChooseUs />

      {/* Responsible Fireworks Safety Guidelines */}
      <SafetyStrip />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Landmark Store Map & Perumanallur Location */}
      <MapSection settings={settings} />

      {/* Midnight Navy Multi-Column Footer */}
      <Footer settings={settings} />

      {/* WhatsApp Quick Floating Action */}
      <WhatsAppFab settings={settings} />
    </main>
  )
}
