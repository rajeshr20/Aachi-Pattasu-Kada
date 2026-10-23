'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCategoryImageUrl } from '@/lib/catalogData'
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface Category {
  id: string
  name: string
  nameTa?: string
  slug: string
  icon?: string | null
  image?: string | null
}

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { locale, t } = useLanguage()

  if (!categories || categories.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const offset = direction === 'left' ? -320 : 320
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section id="categories" className="w-full py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#EAE5DC]">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="section-eyebrow">
              {locale === 'ta' ? 'பட்டாசு வகைகள்' : 'BROWSE THE LINEUP'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              {locale === 'ta' ? 'வகைகள் வாரியாக வாங்க' : 'Shop by category'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
              {locale === 'ta'
                ? 'பூந்தொட்டி முதல் வான்வெடி வரை உங்கள் குடும்பத்திற்கு ஏற்ற அனைத்து ரகங்களும்.'
                : 'Explore our diverse selections, from sparkling flower pots to ground spinners.'}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/catalogue"
              className="text-xs sm:text-sm font-bold text-[#0B6E99] hover:underline"
            >
              {locale === 'ta' ? 'அனைத்து வகைகள் →' : 'View full catalogue →'}
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full bg-white border border-[#EAE5DC] hover:border-[#FFB300] flex items-center justify-center text-[#0F172A] shadow-xs cursor-pointer transition-colors"
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full bg-white border border-[#EAE5DC] hover:border-[#FFB300] flex items-center justify-center text-[#0F172A] shadow-xs cursor-pointer transition-colors"
                aria-label="Next categories"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Fiery Radiant Rounded Cards Carousel / Grid */}
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {categories.map((cat) => {
            const displayName = locale === 'ta' && cat.nameTa ? cat.nameTa : cat.name

            return (
              <Link
                key={cat.id}
                href={`/catalogue?category=${cat.slug}`}
                className="group shrink-0 w-44 sm:w-52 rounded-2xl bg-white border border-[#EAE5DC] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl hover:border-[#FFB300] relative"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Full image completely filling until the name under it */}
                <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-stone-100">
                  <Image
                    src={getCategoryImageUrl(cat)}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 176px, 208px"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Category Name under the image */}
                <div className="p-3 sm:p-3.5 text-center bg-white flex flex-col items-center justify-between flex-1 border-t border-[#EAE5DC]/80">
                  <h3 className="font-extrabold text-[#0F172A] text-xs sm:text-sm tracking-wide uppercase leading-tight line-clamp-2 group-hover:text-[#B91C35] transition-colors">
                    {displayName}
                  </h3>
                  <span className="text-[#0B6E99] group-hover:text-[#B91C35] text-[10px] sm:text-[11px] font-bold mt-1 transition-colors">
                    {locale === 'ta' ? 'காண்க →' : 'Explore →'}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
