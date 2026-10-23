'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import {
  Search,
  LayoutGrid,
  List,
  Plus,
  Minus,
  Sparkles,
  X,
  Check,
  ShieldCheck,
  Truck,
  Store,
} from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, calcDiscount } from '@/lib/utils'
import { getCategoryImageUrl } from '@/lib/catalogData'

interface Product {
  id: string
  name: string
  nameTa?: string
  slug?: string
  mrp: number
  offerPrice: number
  unit: string
  inStock: boolean
  isBestSeller?: boolean
  isFeatured?: boolean
  images: { url: string }[]
  category: { id?: string; name: string; nameTa?: string; slug: string }
}

interface Category {
  id: string
  name: string
  nameTa?: string
  slug: string
  icon?: string | null
  image?: string | null
}

interface Props {
  products: Product[]
  categories: Category[]
  initialCategory?: string
  initialSearch?: string
  minOrder: number
}

// Curated authentic celebration photos ensuring zero city skyscrapers or balloons
const PRODUCT_IMAGE_FALLBACKS: Record<string, string> = {
  'red-bijili-crackers': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80',
  'classic-28-chorsa-ladi': 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&auto=format&fit=crop&q=80',
  'deluxe-100-sound-garland': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
  'mega-1000-wala-sound-ladi': 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&auto=format&fit=crop&q=80',
  'special-ground-chakkar-big': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
  'deluxe-ground-chakkar-deluxe': 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=800&auto=format&fit=crop&q=80',
  'rotating-disco-wheel': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80',
  'tri-colour-flower-pots': 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&auto=format&fit=crop&q=80',
  'grand-ashoka-flower-pot': 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
  'peacock-feathers-fountain': 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=800&auto=format&fit=crop&q=80',
  'gold-sparklers-15cm': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80',
  'colour-sparklers-30cm': 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=800&auto=format&fit=crop&q=80',
  'electric-sparklers-50cm': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
  'baby-rocket': 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&auto=format&fit=crop&q=80',
  'whistling-rocket-bomb': 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=800&auto=format&fit=crop&q=80',
  'luna-parachute-rocket': 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
  '7-shots-colour-chaser': 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&auto=format&fit=crop&q=80',
  '12-shots-multi-colour': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
  '30-shots-mega-display': 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=800&auto=format&fit=crop&q=80',
  'family-delight-gift-box': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
  'vip-royal-celebration-box': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
}

function resolveProductImage(p: Product): string {
  const current = p.images?.[0]?.url
  // If image is city skyline (477959858617) or balloons (508873696983) or empty, use curated photo
  if (
    !current ||
    current.includes('photo-1477959858617') ||
    current.includes('photo-1508873696983') ||
    current.includes('photo-1533230307785')
  ) {
    if (p.slug && PRODUCT_IMAGE_FALLBACKS[p.slug]) {
      return PRODUCT_IMAGE_FALLBACKS[p.slug]
    }
    return 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80'
  }
  return current
}

export default function ProductsPageClient({
  products,
  categories,
  initialCategory,
  initialSearch,
  minOrder,
}: Props) {
  const [search, setSearch] = useState(initialSearch || '')
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')
  const [sortBy, setSortBy] = useState('default')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [addedId, setAddedId] = useState<string | null>(null)
  const { addItem, updateQuantity, items, openCart } = useCartStore()

  const getQty = (productId: string) =>
    items.find((i) => i.productId === productId)?.quantity || 0

  const filtered = useMemo(() => {
    let list = products
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category?.slug === activeCategory)
    }
    if (inStockOnly) {
      list = list.filter((p) => p.inStock)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category?.name && p.category.name.toLowerCase().includes(q))
      )
    }

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.offerPrice - b.offerPrice)
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.offerPrice - a.offerPrice)
    if (sortBy === 'discount') {
      return [...list].sort((a, b) => {
        const dA = (a.mrp - a.offerPrice) / a.mrp
        const dB = (b.mrp - b.offerPrice) / b.mrp
        return dB - dA
      })
    }
    return list
  }, [products, activeCategory, inStockOnly, search, sortBy])

  const handleAdd = (p: Product) => {
    addItem({
      id: p.id,
      productId: p.id,
      name: p.name,
      nameTa: p.nameTa || p.name,
      mrp: p.mrp,
      offerPrice: p.offerPrice,
      unit: p.unit,
      imageUrl: resolveProductImage(p),
      categoryName: p.category?.name || 'Crackers',
    })
    setAddedId(p.id)
    setTimeout(() => setAddedId(null), 1200)
    openCart()
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#10172A] pb-24">
      {/* Top Banner: Starts cleanly below fixed header with generous clearance */}
      <section className="bg-[#10172A] text-white pt-36 sm:pt-44 pb-14 sm:pb-20 border-b border-[#D6B36A]/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6B36A]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[#D6B36A] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Sivakasi Factory Wholesale Rates</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Browse All <span className="text-gold-gradient">Firecrackers</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            Authentic Sivakasi Green Crackers at factory wholesale rates with up to 80% discount. Select your favourite items to build an order enquiry.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
              100% Certified Green Crackers
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-semibold">
              <Store className="w-4 h-4 text-[#B91C35]" />
              Opposite Aachi Mess, Perumanallur
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-semibold">
              <Truck className="w-4 h-4 text-emerald-400" />
              Min. Order: {formatPrice(minOrder)}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="site-container pt-8 sm:pt-12">
        {/* Search, Sort & View Controls */}
        <div className="bg-white border border-[#EADBCA] rounded-3xl p-5 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search crackers (e.g. Bijili, Chakkar, Flower Pot, Rocket, Sparklers, Gift Box)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 bg-[#FAF7F2] border border-[#EADBCA] rounded-2xl text-[#10172A] placeholder-stone-400 text-sm sm:text-base focus:outline-none focus:border-[#B91C35] focus:bg-white transition-all shadow-inner"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#10172A] p-1.5 rounded-full hover:bg-stone-200 transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & In-Stock Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3.5 bg-[#FAF7F2] border border-[#EADBCA] rounded-2xl text-[#10172A] text-xs sm:text-sm font-bold focus:outline-none focus:border-[#B91C35] cursor-pointer"
              >
                <option value="default">Sort: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-bold text-[#10172A] bg-[#FAF7F2] px-4 py-3.5 rounded-2xl border border-[#EADBCA] whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#B91C35] rounded cursor-pointer"
                />
                In Stock Only
              </label>

              {/* View Toggle */}
              <div className="flex items-center bg-[#FAF7F2] border border-[#EADBCA] rounded-2xl p-1 shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#B91C35] text-white shadow-xs'
                      : 'text-stone-500 hover:text-[#10172A]'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2.5 rounded-xl transition-all ${
                    viewMode === 'table'
                      ? 'bg-[#B91C35] text-white shadow-xs'
                      : 'text-stone-500 hover:text-[#10172A]'
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-5 border-t border-[#EADBCA]/70">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#B91C35] text-white shadow-md shadow-red-950/20'
                  : 'bg-[#FAF7F2] text-[#10172A] hover:bg-[#F3ECE1] border border-[#EADBCA]'
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0">
                ✨
              </span>
              <span>All Categories</span>
              <span className="text-[11px] opacity-75 font-mono">({products.length})</span>
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category?.slug === cat.slug).length
              const imgUrl = getCategoryImageUrl(cat)
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                    activeCategory === cat.slug
                      ? 'bg-[#B91C35] text-white shadow-md shadow-red-950/20'
                      : 'bg-[#FAF7F2] text-[#10172A] hover:bg-[#F3ECE1] border border-[#EADBCA]'
                  }`}
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden shrink-0 border border-black/10 shadow-xs bg-stone-200">
                    <Image
                      src={imgUrl}
                      alt={cat.name}
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{cat.name}</span>
                  <span className="text-[11px] opacity-75 font-mono">({count})</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Count Summary & Sentence Spacing */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-stone-600 font-medium mb-8 px-1">
          <p className="leading-relaxed">
            Showing <strong className="text-[#10172A] font-extrabold">{filtered.length}</strong> firecracker varieties available for booking enquiry.
          </p>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-[#B91C35] font-bold hover:underline cursor-pointer self-start sm:self-auto"
            >
              Clear category filter ({activeCategory})
            </button>
          )}
        </div>

        {/* Products Grid / Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-[#EADBCA] max-w-md mx-auto shadow-sm">
            <p className="text-5xl mb-3">🔍</p>
            <h3 className="text-lg font-black text-[#10172A]">No products found</h3>
            <p className="text-sm text-stone-500 mt-1.5">
              Try adjusting your search terms or choose &ldquo;All Categories&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setActiveCategory('all')
              }}
              className="mt-5 px-6 py-2.5 rounded-xl bg-[#B91C35] text-white font-bold text-xs shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Responsive Product Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 justify-center">
            {filtered.map((p) => {
              const discount = calcDiscount(p.mrp, p.offerPrice)
              const qty = getQty(p.id)
              const isJustAdded = addedId === p.id
              const imageUrl = resolveProductImage(p)

              return (
                <div
                  key={p.id}
                  className="group relative bg-white border border-[#EADBCA] hover:border-[#D6B36A] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#F8F9FA]">
                    <Image
                      src={imageUrl}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount & Category Tags */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-1">
                      {discount > 0 ? (
                        <span className="px-2.5 py-1 rounded-lg bg-[#B91C35] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm">
                          {discount}% OFF
                        </span>
                      ) : (
                        <span />
                      )}

                      <span className="px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-[10px] text-white font-semibold border border-white/20 truncate max-w-[110px]">
                        {p.category?.name || 'Crackers'}
                      </span>
                    </div>

                    {!p.inStock && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-700 font-black text-xs uppercase tracking-wider">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
                    <div className="mb-3.5 space-y-1.5">
                      <h3 className="font-extrabold text-[#10172A] text-xs sm:text-base leading-snug line-clamp-2 group-hover:text-[#B91C35] transition-colors min-h-[2rem] sm:min-h-[2.5rem]">
                        {p.name}
                      </h3>
                      {p.nameTa && (
                        <p className="text-[11px] sm:text-xs text-amber-800/90 font-medium line-clamp-1">
                          {p.nameTa}
                        </p>
                      )}
                      <div className="pt-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FAF7F2] border border-[#EADBCA] text-[11px] text-stone-600 font-medium">
                          Packing: <strong className="text-stone-900">{p.unit}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EADBCA]/70">
                      <div className="flex items-baseline justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg sm:text-2xl font-black text-[#10172A] font-mono tracking-tight">
                            {formatPrice(p.offerPrice)}
                          </span>
                          {p.mrp > p.offerPrice && (
                            <span className="text-xs text-stone-400 line-through font-mono">
                              {formatPrice(p.mrp)}
                            </span>
                          )}
                        </div>

                        {discount > 0 && (
                          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Save {formatPrice(Math.round(p.mrp - p.offerPrice))}
                          </span>
                        )}
                      </div>

                      {/* Quantity or Add Button */}
                      {qty > 0 ? (
                        <div className="flex items-center justify-between bg-[#FAF7F2] border border-[#EADBCA] rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(p.id, qty - 1)}
                            className="w-8 h-8 rounded-lg bg-white border border-[#EADBCA] flex items-center justify-center text-[#10172A] hover:bg-[#B91C35] hover:text-white hover:border-[#B91C35] transition-colors font-bold text-sm cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-extrabold text-[#10172A] text-xs sm:text-sm font-mono px-2">
                            {qty} in Cart
                          </span>
                          <button
                            onClick={() => updateQuantity(p.id, qty + 1)}
                            className="w-8 h-8 rounded-lg bg-white border border-[#EADBCA] flex items-center justify-center text-[#10172A] hover:bg-[#B91C35] hover:text-white hover:border-[#B91C35] transition-colors font-bold text-sm cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAdd(p)}
                          disabled={!p.inStock}
                          className={`w-full py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#B91C35] hover:bg-[#9E152B] text-white hover:shadow-md'
                          } disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-4 h-4" /> Added to Order
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" /> Add to Order
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white border border-[#EADBCA] rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF7F2] border-b border-[#EADBCA] text-stone-500 text-xs font-black uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-5">Product Name</th>
                    <th className="py-4 px-5">Category</th>
                    <th className="py-4 px-5">Packing</th>
                    <th className="py-4 px-5 font-mono">MRP</th>
                    <th className="py-4 px-5 font-mono">Offer Rate</th>
                    <th className="py-4 px-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EADBCA]/60">
                  {filtered.map((p) => {
                    const qty = getQty(p.id)
                    const isJustAdded = addedId === p.id
                    return (
                      <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="py-3.5 px-5">
                          <span className="font-extrabold text-[#10172A] block">{p.name}</span>
                          {p.nameTa && <span className="text-xs text-stone-500">{p.nameTa}</span>}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FAF7F2] border border-[#EADBCA] text-xs font-medium text-[#10172A]">
                            {p.category?.name}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-stone-500 text-xs font-medium">{p.unit}</td>
                        <td className="py-3.5 px-5 text-stone-400 line-through font-mono text-xs">
                          {formatPrice(p.mrp)}
                        </td>
                        <td className="py-3.5 px-5 font-mono font-black text-base text-[#10172A]">
                          {formatPrice(p.offerPrice)}
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          {qty > 0 ? (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                              {qty} in Cart
                            </span>
                          ) : (
                            <button
                              onClick={() => handleAdd(p)}
                              disabled={!p.inStock}
                              className="px-4 py-1.5 bg-[#B91C35] hover:bg-[#9E152B] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                            >
                              Add
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
