'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../products/ProductCard'
import { useLanguage } from '@/context/LanguageContext'

interface FeaturedGridProps {
  products: any[]
  whatsappNumber?: string
}

export default function FeaturedGrid({ products, whatsappNumber }: FeaturedGridProps) {
  const { t } = useLanguage()

  if (!products || products.length === 0) return null

  return (
    <section className="w-full py-16 sm:py-20 bg-white border-b border-[#EAE5DC]">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-eyebrow">
              {t('section.featured_eyebrow', 'HAND-PICKED')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              {t('section.featured_title', "This Season's Favourites")}
            </h2>
          </div>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B6E99] hover:underline"
          >
            <span>{t('section.view_all', 'View all products →')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((p) => (
            <div key={p.id} className="h-full">
              <ProductCard product={p} whatsappNumber={whatsappNumber} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
