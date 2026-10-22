'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice, calcDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { Plus, Check, ArrowRight, Sparkles, Flame } from 'lucide-react'

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
  accent?: 'gold' | 'crimson'
  bgTone?: 'navy' | 'deep'
}

export default function FeaturedProducts({
  products,
  title,
  subtitle,
  badgeText = 'Factory Wholesale Deals',
  accent = 'gold',
  bgTone = 'navy',
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
      categoryName: p.category.name,
    })
    setAddedId(p.id)
    setTimeout(() => setAddedId(null), 1200)
    openCart()
  }

  const isGold = accent === 'gold'
  const isDeep = bgTone === 'deep'

  return (
    <section
      className={`w-full py-16 sm:py-24 relative overflow-hidden ${
        isDeep
          ? 'bg-[#0E1224] border-y border-white/5'
          : 'bg-[#0B0D1A]'
      }`}
    >
      {/* Subtle radial ambient background light */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-20 ${
          isGold ? 'bg-[#F5A623]' : 'bg-[#C0392B]'
        }`}
      />

      <div className="site-container relative z-10 flex flex-col items-center">
        {/* Centered Section Header with Generous Spacing */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 border ${
              isGold
                ? 'bg-[#F5A623]/10 border-[#F5A623]/30 text-[#F5A623]'
                : 'bg-[#C0392B]/10 border-[#C0392B]/30 text-[#FF6B6B]'
            }`}
          >
            {isGold ? <Sparkles className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
            <span>{badgeText}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            {title}
          </h2>

          {subtitle && (
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* Enhanced Responsive Product Grid: 2 cols on mobile, 3 on md, 4 on lg */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full justify-center">
          {products.map((product) => {
            const discount = calcDiscount(product.mrp, product.offerPrice)
            const savings = Math.round(product.mrp - product.offerPrice)
            const isAdded = addedId === product.id
            const imageUrl =
              product.images[0]?.url ||
              'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80'

            return (
              <div
                key={product.id}
                className="group relative bg-[#131728] border border-white/10 rounded-2xl overflow-hidden hover:border-[#F5A623]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-500/15 flex flex-col justify-between"
              >
                {/* Product Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#181D33]">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131728] via-transparent to-black/20" />

                  {/* Badges on Image */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-1">
                    {discount > 0 ? (
                      <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#C0392B] to-[#E74C3C] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                        {discount}% OFF
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-[10px] sm:text-xs text-gray-200 font-semibold border border-white/15 truncate max-w-[110px]">
                      {product.category.name}
                    </span>
                  </div>

                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-black text-xs uppercase tracking-wider">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details with generous breathing room */}
                <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between text-center">
                  <div className="mb-3">
                    <h3 className="font-bold text-white text-xs sm:text-base leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors mb-1.5 min-h-[2rem] sm:min-h-[2.75rem]">
                      {product.name}
                    </h3>
                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-xs text-gray-300 font-medium">
                      Packing: <span className="text-white font-bold">{product.unit}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    {/* Price Row */}
                    <div className="flex items-baseline justify-center gap-2 mb-1">
                      <span className="text-base sm:text-2xl font-black text-[#2ECC71] font-mono tracking-tight">
                        {formatPrice(product.offerPrice)}
                      </span>
                      {product.mrp > product.offerPrice && (
                        <span className="text-xs sm:text-sm text-gray-500 line-through font-mono">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>

                    {savings > 0 && (
                      <p className="text-[11px] sm:text-xs font-bold text-[#F5A623] mb-3">
                        Save {formatPrice(savings)}
                      </p>
                    )}

                    {/* Add To Cart Button */}
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className={`w-full py-2.5 sm:py-3 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 shadow-lg ${
                        isAdded
                          ? 'bg-[#27AE60] text-white shadow-green-500/30'
                          : 'bg-gradient-to-r from-[#F5A623] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F5A623] text-[#0B0D1A] shadow-orange-500/20 active:scale-95'
                      } disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Order
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Centered Browse CTA Button with Great Spacing */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-extrabold text-sm sm:text-base border border-white/15 hover:border-[#F5A623]/60 transition-all shadow-xl hover:-translate-y-0.5"
          >
            <span>Explore All 21+ Sivakasi Fireworks</span>
            <ArrowRight className="w-5 h-5 text-[#F5A623]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
