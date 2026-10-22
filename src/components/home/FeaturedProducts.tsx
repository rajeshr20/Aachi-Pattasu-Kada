'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice, calcDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { Plus, Check, ArrowRight, Sparkles } from 'lucide-react'

interface Product {
  id: string
  name: string
  nameTa?: string
  mrp: number
  offerPrice: number
  unit: string
  inStock: boolean
  images: { url: string }[]
  category: { id?: string; name: string; slug?: string }
}

interface FeaturedProductsProps {
  products: Product[]
  title: string
  subtitle?: string
  badgeText?: string
  bgTone?: 'white' | 'ivory'
}

export default function FeaturedProducts({
  products,
  title,
  subtitle,
  badgeText = 'Factory Wholesale Deals',
  bgTone = 'white',
}: FeaturedProductsProps) {
  const { addItem, openCart } = useCartStore()
  const [addedId, setAddedId] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  // Extract unique categories for quick filter pills
  const filterCategories = useMemo(() => {
    const cats = new Set<string>()
    products.forEach((p) => {
      if (p.category?.name) cats.add(p.category.name)
    })
    return ['all', ...Array.from(cats)]
  }, [products])

  const filteredProducts = useMemo(() => {
    if (selectedFilter === 'all') return products.slice(0, 8)
    return products.filter((p) => p.category?.name === selectedFilter).slice(0, 8)
  }, [products, selectedFilter])

  if (!products || products.length === 0) return null

  const handleAdd = (p: Product) => {
    addItem({
      id: p.id,
      productId: p.id,
      name: p.name,
      nameTa: p.nameTa || p.name,
      mrp: p.mrp,
      offerPrice: p.offerPrice,
      unit: p.unit,
      imageUrl: p.images[0]?.url,
      categoryName: p.category?.name || 'Crackers',
    })
    setAddedId(p.id)
    setTimeout(() => setAddedId(null), 1200)
    openCart()
  }

  const isIvory = bgTone === 'ivory'

  return (
    <section
      className={`w-full py-24 sm:py-32 border-t border-[#EADBCA] ${
        isIvory ? 'bg-[#FAF7F2]' : 'bg-[#FFFFFF]'
      }`}
    >
      <div className="site-container flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 bg-[#B91C35]/10 border border-[#B91C35]/20 text-[#B91C35]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badgeText}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#10172A] tracking-tight leading-tight mb-4">
            {title}
          </h2>

          {subtitle && (
            <p className="text-[#647084] text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* Category Filter Pills (Spacious & Clean like Rathinam) */}
        {filterCategories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold capitalize transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#B91C35] text-white shadow-md shadow-red-950/20'
                    : 'bg-white text-stone-600 hover:text-[#10172A] border border-[#EADBCA] hover:border-stone-400'
                }`}
              >
                {cat === 'all' ? 'All Crackers' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Product Cards Grid: 4 cols desktop, 3 md, 2 mobile with generous gaps */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 w-full justify-center">
          {filteredProducts.map((product) => {
            const discount = calcDiscount(product.mrp, product.offerPrice)
            const isAdded = addedId === product.id
            const imageUrl =
              product.images[0]?.url ||
              'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80'

            return (
              <div
                key={product.id}
                className="group relative bg-[#FFFFFF] border border-[#EADBCA] hover:border-[#D6B36A] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F8F9FA]">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Clean Discount Tag */}
                  {discount > 0 && (
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-lg bg-[#B91C35] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm">
                        {discount}% OFF
                      </span>
                    </div>
                  )}

                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-700 font-black text-xs uppercase tracking-wider">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content with spacious padding */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
                  <div className="mb-3">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D6B36A] block mb-1">
                      {product.category?.name || 'Sivakasi Variety'}
                    </span>
                    <h3 className="font-extrabold text-[#10172A] text-xs sm:text-base leading-snug line-clamp-2 group-hover:text-[#B91C35] transition-colors mb-2 min-h-[2rem] sm:min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                      Packing: <strong className="text-stone-800">{product.unit}</strong>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EADBCA]/70">
                    {/* Prices */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg sm:text-2xl font-black text-[#10172A] tracking-tight font-mono">
                        {formatPrice(product.offerPrice)}
                      </span>
                      {product.mrp > product.offerPrice && (
                        <span className="text-xs sm:text-sm text-stone-400 line-through font-mono">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>

                    {/* Add to Order Button */}
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className={`w-full py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#B91C35] hover:bg-[#9E152B] text-white hover:shadow-md'
                      } disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Order
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> Add to Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-14 sm:mt-18 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-transparent hover:bg-stone-100 text-[#10172A] font-extrabold text-sm sm:text-base border-2 border-[#10172A] transition-all hover:-translate-y-0.5"
          >
            <span>Explore All 21+ Sivakasi Fireworks</span>
            <ArrowRight className="w-5 h-5 text-[#B91C35]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
