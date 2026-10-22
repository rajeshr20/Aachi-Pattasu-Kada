'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Check, ShieldCheck, MessageSquare } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useLanguage } from '@/context/LanguageContext'
import { formatPrice, calcDiscount } from '@/lib/utils'

export interface ProductCardProps {
  product: {
    id: string
    name: string
    nameTa?: string
    slug?: string
    mrp: number
    offerPrice: number
    unit: string
    inStock: boolean
    isBestSeller?: boolean
    isNewArrival?: boolean
    isFeatured?: boolean
    isLicensed?: boolean
    images?: { url: string }[]
    category?: { name: string; nameTa?: string; slug?: string }
    variants?: Array<{ id: string; name: string; packText: string; mrp: number; price: number }>
  }
  whatsappNumber?: string
}

const DEFAULT_CRACKER_IMAGE = '/images/products/one-and-only-5inch.jpg'

export default function ProductCard({ product, whatsappNumber = '919500565391' }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  const { locale, t } = useLanguage()
  const [justAdded, setJustAdded] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants && product.variants.length > 0 ? product.variants[0].id : null
  )

  const activeVariant = product.variants?.find((v) => v.id === selectedVariantId)
  const currentPrice = activeVariant ? activeVariant.price : product.offerPrice
  const currentMrp = activeVariant ? activeVariant.mrp : product.mrp
  const currentUnit = activeVariant ? activeVariant.packText : product.unit
  const discount = calcDiscount(currentMrp, currentPrice)

  const hasVariants = Boolean(product.variants && product.variants.length > 1)
  const displayName = locale === 'ta' && product.nameTa ? product.nameTa : product.name
  const categoryName =
    locale === 'ta' && product.category?.nameTa ? product.category.nameTa : product.category?.name || 'Crackers'

  const imageUrl = product.images?.[0]?.url || DEFAULT_CRACKER_IMAGE

  const handleAdd = () => {
    addItem({
      id: activeVariant ? `${product.id}-${activeVariant.id}` : product.id,
      productId: product.id,
      name: displayName,
      nameTa: product.nameTa || product.name,
      mrp: currentMrp,
      offerPrice: currentPrice,
      unit: currentUnit,
      imageUrl,
      categoryName,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
    openCart()
  }

  const notifyUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, please notify me when "${product.name}" is back in stock at Aachi Pattasu Kadai.`
  )}`

  return (
    <div className="cracker-card overflow-hidden flex flex-col justify-between h-full group bg-white">
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F4] p-3">
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Top Badges Row */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex flex-wrap items-center justify-between gap-1 pointer-events-none">
          {/* Category Chip */}
          <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#475569] shadow-xs">
            {categoryName}
          </span>

          {/* Special Status Badges */}
          <div className="flex items-center gap-1">
            {product.isBestSeller && (
              <span className="px-2 py-0.5 rounded-full bg-[#FFB300] text-[#0F172A] text-[9px] font-black uppercase tracking-wider shadow-xs">
                {t('card.bestseller', 'BESTSELLER')}
              </span>
            )}
            {product.isNewArrival && (
              <span className="px-2 py-0.5 rounded-full bg-[#16A34A] text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                {t('card.new_release', 'NEW RELEASE')}
              </span>
            )}
            {product.isFeatured && !product.isBestSeller && !product.isNewArrival && (
              <span className="px-2 py-0.5 rounded-full bg-[#0B6E99] text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                {t('card.featured', 'FEATURED')}
              </span>
            )}
          </div>
        </div>

        {/* Discount & PESO Badges Bottom of Image */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {discount > 0 ? (
            <span className="px-2 py-0.5 rounded-md bg-[#B3121F] text-white text-[10px] font-bold shadow-xs">
              {discount}% OFF
            </span>
          ) : (
            <span />
          )}

          {product.isLicensed && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-700/80 backdrop-blur-xs text-white text-[9px] font-bold">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              <span>PESO</span>
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center p-4">
            <span className="px-3 py-1 rounded-full bg-red-100 border border-red-300 text-[#B3121F] font-bold text-xs">
              {t('card.out_of_stock', 'OUT OF STOCK')}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
        <div>
          <h3 className="font-bold text-[#0F172A] text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#0B6E99] transition-colors mb-1.5 min-h-[2.5rem]">
            {displayName}
          </h3>

          {/* Pack text / Variant selection */}
          {hasVariants ? (
            <select
              value={selectedVariantId || ''}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full text-xs font-semibold text-[#0F172A] bg-[#FAF8F4] border border-[#EAE5DC] rounded-lg px-2 py-1 mb-2.5 focus:outline-none focus:border-[#FFB300] cursor-pointer"
            >
              {product.variants!.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.packText} — {formatPrice(v.price)}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-[11px] text-[#64748B] font-medium mb-3">
              Packing: <strong className="text-[#0F172A]">{currentUnit}</strong>
            </p>
          )}

          {/* Wholesale Rule Notice */}
          <span className="inline-block text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200/70 rounded-md px-2 py-0.5 mb-2 font-medium">
            ✓ {t('card.wholesale_rule', '10+ units wholesale auto-applied')}
          </span>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#EAE5DC] mt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg sm:text-2xl font-black text-[#0F172A] font-mono tracking-tight">
              {hasVariants ? `₹${currentPrice}+` : formatPrice(currentPrice)}
            </span>
            {currentMrp > currentPrice && (
              <span className="text-xs text-[#94A3B8] line-through font-mono">
                {formatPrice(currentMrp)}
              </span>
            )}
          </div>

          {/* Action button */}
          {product.inStock ? (
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 px-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                justAdded
                  ? 'bg-[#16A34A] text-white'
                  : 'bg-[#FFB300] hover:bg-[#E5A100] text-[#0F172A]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" /> {t('card.added', 'Added to Order')}
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> {t('card.add', 'Add to Order')}
                </>
              )}
            </button>
          ) : (
            <a
              href={notifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t('card.notify', 'Notify on WhatsApp')}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
