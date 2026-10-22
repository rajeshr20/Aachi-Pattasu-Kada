import { getSettings } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from '@/lib/catalogData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'
import DeliveryNoticeStrip from '@/components/home/DeliveryNoticeStrip'
import StatsBand from '@/components/home/StatsBand'
import ProductCarousel from '@/components/products/ProductCarousel'
import CategoryGrid from '@/components/home/CategoryGrid'
import BrandGrid from '@/components/home/BrandGrid'
import OurStory from '@/components/home/OurStory'
import HowItWorks from '@/components/home/HowItWorks'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import PromotionalBanner from '@/components/home/PromotionalBanner'
import FAQSection from '@/components/home/FAQSection'
import NewsletterSection from '@/components/home/NewsletterSection'
import MapSection from '@/components/home/MapSection'
import WhatsAppFab from '@/components/WhatsAppFab'

export const revalidate = 60

async function getHomePageData() {
  try {
    const [
      settings,
      categoriesFromDb,
      brandsFromDb,
      bestsellersFromDb,
      newReleasesFromDb,
      featuredFromDb,
      allActiveFromDb,
    ] = await Promise.all([
      getSettings(),
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }).catch(() => []),
      prisma.brand.findMany({
        orderBy: { sortOrder: 'asc' },
      }).catch(() => []),
      prisma.product.findMany({
        where: { isBestSeller: true, isDeleted: false, inStock: true },
        include: { images: { orderBy: { sortOrder: 'asc' } }, category: true, variants: true },
        take: 12,
      }).catch(() => []),
      prisma.product.findMany({
        where: { isNewArrival: true, isDeleted: false, inStock: true },
        include: { images: { orderBy: { sortOrder: 'asc' } }, category: true, variants: true },
        take: 12,
      }).catch(() => []),
      prisma.product.findMany({
        where: { isFeatured: true, isDeleted: false, inStock: true },
        include: { images: { orderBy: { sortOrder: 'asc' } }, category: true, variants: true },
        take: 12,
      }).catch(() => []),
      prisma.product.findMany({
        where: { isDeleted: false, inStock: true },
        include: { images: { orderBy: { sortOrder: 'asc' } }, category: true, variants: true },
        take: 20,
      }).catch(() => []),
    ])

    const categories =
      categoriesFromDb && categoriesFromDb.length > 0 ? categoriesFromDb : (DEFAULT_CATEGORIES as any[])
    const brands = brandsFromDb || []

    const bestsellers =
      bestsellersFromDb && bestsellersFromDb.length > 0
        ? bestsellersFromDb
        : DEFAULT_PRODUCTS.filter((p) => p.isBestSeller)

    const newReleases =
      newReleasesFromDb && newReleasesFromDb.length > 0
        ? newReleasesFromDb
        : DEFAULT_PRODUCTS.filter((p) => p.isNewArrival)

    const favourites =
      featuredFromDb && featuredFromDb.length > 0
        ? featuredFromDb
        : (allActiveFromDb && allActiveFromDb.length > 0 ? allActiveFromDb : DEFAULT_PRODUCTS)

    return {
      settings,
      categories,
      brands,
      bestsellers,
      newReleases,
      favourites,
    }
  } catch {
    const settings = await getSettings()
    return {
      settings,
      categories: DEFAULT_CATEGORIES as any[],
      brands: [],
      bestsellers: DEFAULT_PRODUCTS.filter((p) => p.isBestSeller),
      newReleases: DEFAULT_PRODUCTS.filter((p) => p.isNewArrival),
      favourites: DEFAULT_PRODUCTS.filter((p) => p.isFeatured),
    }
  }
}

export default async function HomePage() {
  const { settings, categories, brands, bestsellers, newReleases, favourites } =
    await getHomePageData()

  const whatsapp = settings.whatsapp || '919500565391'

  return (
    <main className="min-h-screen bg-[#FAF8F4] flex flex-col text-slate-800 antialiased selection:bg-[#FFB300] selection:text-slate-900">
      {/* 1. Header with Top Announcement Bar */}
      <Header settings={settings} />

      {/* 2. Cinematic Hero Section */}
      <HeroSection settings={settings} />

      {/* 3. Delivery Notice Strip (Rathinam Style) */}
      <DeliveryNoticeStrip notice={settings.delivery_notice} />

      {/* 4. Stats Band */}
      <StatsBand settings={settings} />

      {/* 5. Carousel 1: Hot & Trending — All-Time Bestsellers */}
      <ProductCarousel
        eyebrow="🔥 HOT & TRENDING"
        title="All-Time Bestsellers"
        viewAllLink="/catalogue"
        viewAllText="View all products →"
        products={bestsellers}
        whatsappNumber={whatsapp}
      />

      {/* 6. Carousel 2: 2026 Latest Arrivals — NEWLY RELEASED PRODUCTS */}
      <ProductCarousel
        eyebrow="✨ 2026 LATEST ARRIVALS"
        title="NEWLY RELEASED PRODUCTS"
        viewAllLink="/catalogue"
        viewAllText="View all new releases →"
        products={newReleases}
        whatsappNumber={whatsapp}
      />

      {/* 7. Carousel 3: Hand-Picked — This season's favourites */}
      <ProductCarousel
        eyebrow="HAND-PICKED"
        title="This season's favourites"
        viewAllLink="/catalogue"
        viewAllText="View all products →"
        products={favourites}
        whatsappNumber={whatsapp}
      />

      {/* 8. Shop by category — Fiery Radiant Tiles */}
      <CategoryGrid categories={categories} />

      {/* 9. Associated Manufacturers — Shop by brand */}
      <BrandGrid brands={brands} />

      {/* 10. Our Story — From Sivakasi to Perumanallur */}
      <OurStory settings={settings} />

      {/* 11. Simple & Safe — How it works */}
      <HowItWorks />

      {/* 12. The Aachi Promise — 6 Clean Cards */}
      <WhyChooseUs />

      {/* 13. Planning something big? — Bulk & Events CTA */}
      <PromotionalBanner settings={settings} />

      {/* 14. Quick Answers — Frequently Asked Questions */}
      <FAQSection />

      {/* 15. Newsletter Subscription */}
      <NewsletterSection settings={settings} />

      {/* 16. Store Map & Directions */}
      <MapSection settings={settings} />

      {/* 17. Multi-column Footer + Legal Notice */}
      <Footer settings={settings} />

      {/* 18. Floating WhatsApp Button */}
      <WhatsAppFab settings={settings} />
    </main>
  )
}
