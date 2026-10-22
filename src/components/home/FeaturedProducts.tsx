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
  nameTa: string
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
}

export default function FeaturedProducts({ products, title, subtitle }: FeaturedProductsProps) {
  const { addItem, openCart } = useCartStore()
  const [addedId, setAddedId] = useState<string | null>(null)

  if (products.length === 0) return null

  const handleAdd = (p: Product) => {
    addItem({
      id: p.id,
      productId: p.id,
      name: p.name,
      nameTa: p.name,
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

  return (
    <section className="w-full py-12 sm:py-16">
      <div className="site-container flex flex-col items-center">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/25 text-[#F5A623] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Factory Wholesale Deals</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto px-2">{subtitle}</p>}
        </div>

        {/* Balanced 2-Column Mobile, 4-Column Desktop Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full justify-center">
          {products.map(product => {
            const discount = calcDiscount(product.mrp, product.offerPrice)
            const savings = Math.round(product.mrp - product.offerPrice)
            const isAdded = addedId === product.id
            const imageUrl = product.images[0]?.url || 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80'

            return (
              <div
                key={product.id}
                className="group relative bg-[#121626] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-[#F5A623]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col justify-between"
              >
                {/* Product Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#181D33]">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121626] via-transparent to-black/30" />

                  {/* Badges on Image */}
                  <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between">
                    {discount > 0 ? (
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-[#C0392B] text-white text-[10px] sm:text-[11px] font-black uppercase shadow-lg">
                        {discount}% OFF
                      </span>
                    ) : <span />}

                    <span className="px-1.5 py-0.5 sm:px-2 rounded-md bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] text-gray-300 font-semibold border border-white/10 truncate max-w-[90px] sm:max-w-none">
                      {product.category.name}
                    </span>
                  </div>

                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details - Centered & Balanced */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between text-center">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-base leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors mb-1 min-h-[2rem] sm:min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-2 sm:mb-3">
                      Packing: <span className="text-gray-300 font-semibold">{product.unit}</span>
                    </p>
                  </div>

                  <div>
                    {/* Price Row */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1">
                      <span className="text-base sm:text-xl font-black text-[#2ECC71] font-mono">
                        {formatPrice(product.offerPrice)}
                      </span>
                      {product.mrp > product.offerPrice && (
                        <span className="text-[10px] sm:text-xs text-gray-500 line-through font-mono">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>

                    {savings > 0 && (
                      <p className="text-[10px] sm:text-[11px] font-semibold text-[#F5A623] mb-2 sm:mb-3">
                        Save {formatPrice(savings)}
                      </p>
                    )}

                    {/* Add To Cart Button */}
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className={`w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all shadow-md ${
                        isAdded
                          ? 'bg-[#27AE60] text-white shadow-green-500/20'
                          : 'bg-gradient-to-r from-[#F5A623] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F5A623] text-[#0B0D1A]'
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Centered Browse CTA */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm border border-white/10 hover:border-[#F5A623]/40 transition-all shadow-lg"
          >
            <span>View All Products in Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#F5A623]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
