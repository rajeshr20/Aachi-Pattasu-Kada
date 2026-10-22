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
    <section className="w-full py-16 sm:py-24 relative overflow-hidden bg-[#0B0D1A]">
      <div className="site-container flex flex-col items-center relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#F5A623] font-black bg-[#F5A623]/10 px-4 py-1.5 rounded-full border border-[#F5A623]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Fireworks Range</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Explore Our <span className="text-gradient-gold">Crackers Collection</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto px-2 leading-relaxed">
            From sparkling flower pots and thrilling aerial repeaters to mega gift boxes, explore factory-direct fireworks.
          </p>
        </div>

        {/* Category Card Grid - Responsive 2-col on mobile, 3-col on tablet, 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121626] hover:border-[#F5A623]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col"
            >
              {/* Background image container */}
              <div className="relative h-32 sm:h-48 w-full overflow-hidden bg-[#181D33]">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-75 group-hover:opacity-95"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl bg-gradient-to-br from-[#181D33] to-[#0B0D1A]">
                    {cat.icon || '🎆'}
                  </div>
                )}
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121626] via-[#121626]/30 to-transparent" />

                {/* Emoji badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-base sm:text-xl shadow-lg">
                  {cat.icon || '💥'}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex items-center justify-between flex-1 gap-2">
                <div className="min-w-0 pr-1">
                  <h3 className="font-extrabold text-white text-xs sm:text-base group-hover:text-[#F5A623] transition-colors leading-snug truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-[#2ECC71] font-bold mt-1 block truncate">
                    Direct Sivakasi Stock
                  </span>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#F5A623] group-hover:text-[#0B0D1A] group-hover:border-[#F5A623] transition-all shrink-0">
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
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-sm sm:text-base border border-white/20 hover:border-[#F5A623]/50 transition-all shadow-lg hover:-translate-y-0.5"
          >
            <span>Browse Complete Fireworks Catalog</span>
            <ChevronRight className="w-5 h-5 text-[#F5A623]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
