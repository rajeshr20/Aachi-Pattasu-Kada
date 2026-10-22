'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Sparkles } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  icon?: string | null
  image?: string | null
}

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) return null

  return (
    <section id="categories" className="w-full py-20 sm:py-28 bg-[#FFF9F0] border-t border-[#EADBCA]">
      <div className="site-container flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B91C35] font-black bg-[#B91C35]/10 px-4 py-1.5 rounded-full border border-[#B91C35]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Fireworks Range</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#10172A] tracking-tight leading-tight mb-4">
            Explore By <span className="text-[#B91C35]">Crackers Category</span>
          </h2>
          <p className="text-[#647084] text-sm sm:text-base max-w-xl mx-auto px-2 leading-relaxed font-normal">
            Browse authentic Sivakasi firecrackers organized by category. Factory wholesale pricing with verified green certification.
          </p>
        </div>

        {/* Category Card Grid - Responsive 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 w-full">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-[#EADBCA] bg-[#FFFFFF] hover:border-[#D6B36A] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 flex flex-col"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1E293B]">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-[#1E293B] to-[#10172A] text-white">
                    {cat.icon || '🎆'}
                  </div>
                )}
                {/* Subtle bottom shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Emoji Pill */}
                <div className="absolute top-3 left-3 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-sm sm:text-base shadow-md">
                  {cat.icon || '💥'}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 sm:p-5 flex items-center justify-between flex-1 gap-2 bg-white">
                <div className="min-w-0 pr-1">
                  <h3 className="font-extrabold text-[#10172A] text-sm sm:text-base group-hover:text-[#B91C35] transition-colors leading-snug truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-[#27AE60] font-bold mt-1 block truncate">
                    Direct Sivakasi Stock
                  </span>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFF9F0] border border-[#EADBCA] flex items-center justify-center text-[#10172A] group-hover:bg-[#B91C35] group-hover:text-white group-hover:border-[#B91C35] transition-all shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl bg-[#10172A] hover:bg-[#1E293B] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 transition-all"
          >
            <span>Browse Full Products Catalog</span>
            <ChevronRight className="w-5 h-5 text-[#D6B36A]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
