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
    <section id="categories" className="w-full py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#EADBCA]">
      <div className="site-container flex flex-col items-center">
        {/* Section Header with generous margin */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B91C35] font-black bg-[#B91C35]/10 px-4 py-1.5 rounded-full border border-[#B91C35]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Sivakasi Collections</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#10172A] tracking-tight leading-tight mb-4">
            Shop By <span className="text-[#B91C35]">Cracker Category</span>
          </h2>
          <p className="text-[#647084] text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-normal">
            Handcrafted traditional and modern fireworks organized for effortless family selection.
          </p>
        </div>

        {/* Category Card Grid - 4 cols desktop, 2 mobile with comfortable gaps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 w-full">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-[#EADBCA] bg-white hover:border-[#D6B36A] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 flex flex-col"
            >
              {/* Category Image with 4:3 Aspect Ratio */}
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
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Emoji badge */}
                <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-base shadow-sm">
                  {cat.icon || '💥'}
                </div>
              </div>

              {/* Clean Card Footer */}
              <div className="p-4 sm:p-5 flex items-center justify-between flex-1 bg-white">
                <div className="min-w-0 pr-2">
                  <h3 className="font-extrabold text-[#10172A] text-sm sm:text-base group-hover:text-[#B91C35] transition-colors leading-snug truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-[#D6B36A] font-bold mt-0.5 block truncate">
                    Explore Collection →
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EADBCA] flex items-center justify-center text-stone-600 group-hover:bg-[#B91C35] group-hover:text-white group-hover:border-[#B91C35] transition-all shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14 sm:mt-18">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#10172A] hover:bg-[#1E293B] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-slate-950/20 hover:-translate-y-0.5 transition-all"
          >
            <span>Browse Full Products Catalogue</span>
            <ChevronRight className="w-5 h-5 text-[#D6B36A]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
