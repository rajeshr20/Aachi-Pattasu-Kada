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
                className="group shrink-0 w-48 sm:w-56 h-56 sm:h-64 rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1.5 shadow-md shadow-orange-950/10 hover:shadow-xl hover:shadow-orange-600/25 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FF6F00 0%, #F55100 50%, #D83A00 100%)',
                  scrollSnapAlign: 'start',
                }}
              >
                {/* Subtle festive background pattern / radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />

                {/* Central illuminated cracker product image */}
                <div className="relative mt-2 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/40 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 bg-black/20">
                  <Image
                    src={getCategoryImageUrl(cat)}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 80px, 96px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Category Title in Bold ALL-CAPS */}
                <div className="relative z-10 w-full mb-1">
                  <h3 className="text-white font-black text-xs sm:text-sm tracking-wider uppercase leading-tight line-clamp-2 drop-shadow-xs">
                    {displayName}
                  </h3>
                  <span className="text-amber-200 text-[10px] sm:text-[11px] font-semibold mt-1 opacity-90 group-hover:opacity-100 block">
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
