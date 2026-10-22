'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

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
  return (
    <section className="w-full py-12 sm:py-20">
      <div className="site-container flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-widest text-[#F5A623] font-extrabold bg-[#F5A623]/10 px-3.5 py-1.5 rounded-full border border-[#F5A623]/25">
            Complete Fireworks Range
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-3 mb-3">
            Explore Our <span className="text-[#F5A623]">Crackers Collection</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-base max-w-xl mx-auto px-2">
            From sparkling flower pots and thrilling aerial repeaters to mega gift boxes, explore factory-direct fireworks.
          </p>
        </div>

        {/* Category Card Grid - Responsive 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#121626] hover:border-[#F5A623]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col"
            >
              {/* Background image container */}
              <div className="relative h-28 sm:h-44 w-full overflow-hidden bg-[#181D33]">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl bg-gradient-to-br from-[#181D33] to-[#0B0D1A]">
                    {cat.icon || '🎆'}
                  </div>
                )}
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121626] via-[#121626]/40 to-transparent" />

                {/* Emoji badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-sm sm:text-lg shadow-md">
                  {cat.icon || '💥'}
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-5 flex items-center justify-between flex-1">
                <div className="min-w-0 pr-1">
                  <h3 className="font-bold text-white text-xs sm:text-base group-hover:text-[#F5A623] transition-colors leading-snug truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-[#2ECC71] font-semibold mt-0.5 block truncate">
                    Direct Sivakasi Stock
                  </span>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#F5A623] group-hover:text-[#0B0D1A] group-hover:border-[#F5A623] transition-all shrink-0">
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/15 hover:border-[#F5A623]/40 transition-all shadow-md"
          >
            <span>Browse All Firecrackers Catalog</span>
            <ChevronRight className="w-4 h-4 text-[#F5A623]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
