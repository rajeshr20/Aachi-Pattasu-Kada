'use client'

import { useState } from 'react'
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
  category: { name: string }
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
      className={`w-full py-20 sm:py-28 border-t border-[#EADBCA] ${
        isIvory ? 'bg-[#FFF9F0]' : 'bg-[#FFFFFF]'
      }`}
    >
      <div className="site-container flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
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

        {/* Product Cards Grid: 4 cols desktop, 3 md, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 w-full justify-center">
          {products.map((product) => {
            const discount = calcDiscount(product.mrp, product.offerPrice)
            const savings = Math.round(product.mrp - product.offerPrice)
            const isAdded = addedId === product.id
            const imageUrl =
              product.images[0]?.url ||
              'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80'

            return (
              <div
                key={product.id}
                className="group relative bg-[#FFFFFF] border border-[#EADBCA] hover:border-[#D6B36A] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F8F9FA]">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />

                  {/* Badges on Image */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-1">
                    {discount > 0 ? (
                      <span className="px-2.5 py-1 rounded-lg bg-[#B91C35] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                        {discount}% OFF
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-[10px] text-white font-semibold border border-white/20 truncate max-w-[110px]">
                      {product.category?.name || 'Crackers'}
                    </span>
                  </div>

                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-700 font-black text-xs uppercase tracking-wider">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content with comfortable internal spacing */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
                  <div className="mb-3">
                    <h3 className="font-extrabold text-[#10172A] text-xs sm:text-base leading-snug line-clamp-2 group-hover:text-[#B91C35] transition-colors mb-2 min-h-[2rem] sm:min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#FFF9F0] border border-[#EADBCA] text-[11px] text-[#647084] font-medium">
                      Packing: <span className="text-[#10172A] font-bold">{product.unit}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EADBCA]/70">
                    {/* Prices */}
                    <div className="flex items-baseline justify-between mb-1.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-2xl font-black text-[#10172A] tracking-tight font-mono">
                          {formatPrice(product.offerPrice)}
                        </span>
                        {product.mrp > product.offerPrice && (
                          <span className="text-xs text-[#647084] line-through font-mono">
                            {formatPrice(product.mrp)}
                          </span>
                        )}
                      </div>

                      {savings > 0 && (
                        <span className="text-[11px] font-bold text-[#27AE60] bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                          Save {formatPrice(savings)}
                        </span>
                      )}
                    </div>

                    {/* Add to Order Button */}
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className={`w-full py-2.5 sm:py-3 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                        isAdded
                          ? 'bg-[#27AE60] text-white shadow-green-600/20'
                          : 'bg-[#B91C35] hover:bg-[#9E152B] text-white shadow-red-900/15 hover:scale-[1.01] active:scale-[0.99]'
                      } disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer mt-3`}
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
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl bg-transparent hover:bg-[#10172A]/5 text-[#10172A] font-extrabold text-sm sm:text-base border-2 border-[#10172A] transition-all hover:-translate-y-0.5"
          >
            <span>Explore All 21+ Sivakasi Fireworks</span>
            <ArrowRight className="w-5 h-5 text-[#B91C35]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
