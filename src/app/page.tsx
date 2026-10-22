import { connection } from 'next/server'
import { getSettings } from '@/lib/settings'
import { getDb } from '../../db'
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

export default async function HomePage() {
  // Query live data only when handling a request, never during prerendering.
  await connection()

  const [settings, categories, featuredProducts, newArrivals] = await Promise.all([
    getSettings(),
    getDb().query.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    }),
    getDb().query.product.findMany({
      where: { isFeatured: true, isDeleted: false, inStock: true },
      with: { images: { orderBy: { sortOrder: 'asc' }, limit: 1 }, category: true },
      limit: 8,
    }),
    getDb().query.product.findMany({
      where: { isNewArrival: true, isDeleted: false, inStock: true },
      with: { images: { orderBy: { sortOrder: 'asc' }, limit: 1 }, category: true },
      limit: 8,
    }),
  ])

  return (
    <main className="min-h-screen bg-[#0B0D1A]">
      <Header settings={settings} />
      <HeroSection settings={settings} />
      <CategoryGrid categories={categories} />
      <FeaturedProducts
        products={featuredProducts}
        title="⭐ Best Selling Diwali Crackers"
        subtitle="Top customer favorites with guaranteed factory discounts"
      />
      <FeaturedProducts
        products={newArrivals}
        title="🆕 Trending & New Arrivals"
        subtitle="Latest 2026 formulations with vibrant aerial bursts"
      />
      <WhyChooseUs />
      <SafetyStrip />
      <FAQSection />
      <MapSection settings={settings} />
      <Footer settings={settings} />
      <WhatsAppFab settings={settings} />
    </main>
  )
}
