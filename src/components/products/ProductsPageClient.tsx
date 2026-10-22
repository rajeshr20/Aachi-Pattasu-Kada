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

interface Product {
  id: string
  name: string
  nameTa?: string
  mrp: number
  offerPrice: number
  unit: string
  inStock: boolean
  isBestSeller?: boolean
  isFeatured?: boolean
  images: { url: string }[]
  category: { name: string; nameTa?: string; slug: string }
}

interface Category {
  id: string
  name: string
  nameTa?: string
  slug: string
  icon?: string | null
}

interface Props {
  products: Product[]
  categories: Category[]
  initialCategory?: string
  initialSearch?: string
  minOrder: number
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
    if (activeCategory !== 'all') list = list.filter((p) => p.category?.slug === activeCategory)
    if (inStockOnly) list = list.filter((p) => p.inStock)
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
      imageUrl: p.images[0]?.url,
      categoryName: p.category?.name || 'Crackers',
    })
    setAddedId(p.id)
    setTimeout(() => setAddedId(null), 1200)
    openCart()
  }

  return (
    <div className="bg-[#FFF9F0] min-h-screen text-[#10172A] pt-24 sm:pt-28 pb-24">
      {/* Top Banner (Midnight Navy Header) */}
      <div className="bg-[#10172A] text-white py-14 sm:py-20 border-b border-[#D6B36A]/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6B36A]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[#D6B36A] text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Sivakasi Factory Wholesale Price</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Browse All <span className="text-gold-gradient">Firecrackers</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Authentic Sivakasi Green Crackers at wholesale factory rates with up to 80% discount. Select your items to submit an enquiry or quotation.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-300">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
              100% Certified Green Crackers
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-medium">
              <Store className="w-4 h-4 text-[#B91C35]" />
              Opposite Aachi Mess, Perumanallur
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-medium">
              <Truck className="w-4 h-4 text-emerald-400" />
              Min. Order: {formatPrice(minOrder)}
            </span>
          </div>
        </div>
      </div>

      <div className="site-container pt-8 sm:pt-12">
        {/* Search, Sort & Filters Console */}
        <div className="bg-[#FFFFFF] border border-[#EADBCA] rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3.5 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#647084]" />
              <input
                type="text"
                placeholder="Search crackers (e.g. Bijili, Chakkar, Flower Pot, Rocket, Sparklers)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-[#FFF9F0] border border-[#EADBCA] rounded-xl text-[#10172A] placeholder-gray-500 text-sm focus:outline-none focus:border-[#B91C35] transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & In Stock Filters */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-3 bg-[#FFF9F0] border border-[#EADBCA] rounded-xl text-[#10172A] text-xs font-bold focus:outline-none focus:border-[#B91C35]"
              >
                <option value="default">Sort: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#10172A] bg-[#FFF9F0] px-3.5 py-3 rounded-xl border border-[#EADBCA] whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#B91C35]"
                />
                In Stock Only
              </label>

              {/* View Toggle */}
              <div className="flex items-center bg-[#FFF9F0] border border-[#EADBCA] rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#B91C35] text-white shadow-xs'
                      : 'text-[#647084] hover:text-[#10172A]'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'table'
                      ? 'bg-[#B91C35] text-white shadow-xs'
                      : 'text-[#647084] hover:text-[#10172A]'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#EADBCA]/60">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#B91C35] text-white shadow-md shadow-red-950/20'
                  : 'bg-[#FFF9F0] text-[#10172A] hover:bg-[#F3ECE1] border border-[#EADBCA]'
              }`}
            >
              All Categories ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category?.slug === cat.slug).length
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeCategory === cat.slug
                      ? 'bg-[#B91C35] text-white shadow-md shadow-red-950/20'
                      : 'bg-[#FFF9F0] text-[#10172A] hover:bg-[#F3ECE1] border border-[#EADBCA]'
                  }`}
                >
                  <span>{cat.icon || '💥'}</span>
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Count summary indicator */}
        <div className="flex items-center justify-between text-xs text-[#647084] font-medium mb-6 px-1">
          <span>
            Showing <strong className="text-[#10172A] font-extrabold">{filtered.length}</strong> firecracker products
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-[#B91C35] font-bold hover:underline"
            >
              Clear category filter
            </button>
          )}
        </div>

        {/* Products Display */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-[#FFFFFF] rounded-2xl border border-[#EADBCA] max-w-md mx-auto shadow-sm">
            <p className="text-5xl mb-3">🔍</p>
            <h3 className="text-lg font-black text-[#10172A]">No products found</h3>
            <p className="text-sm text-[#647084] mt-1.5">
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
          /* Clean 4-Col Desktop, 3-Col Tablet, 2-Col Mobile Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 justify-center">
            {filtered.map((p) => {
              const discount = calcDiscount(p.mrp, p.offerPrice)
              const qty = getQty(p.id)
              const isJustAdded = addedId === p.id
              const imageUrl =
                p.images[0]?.url ||
                'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80'

              return (
                <div
                  key={p.id}
                  className="group relative bg-[#FFFFFF] border border-[#EADBCA] hover:border-[#D6B36A] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#F8F9FA]">
                    <Image
                      src={imageUrl}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-500"
                    />

                    {/* Discount & Category Tags */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-1">
                      {discount > 0 ? (
                        <span className="px-2.5 py-1 rounded-lg bg-[#B91C35] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
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
                    <div className="mb-3">
                      <h3 className="font-extrabold text-[#10172A] text-xs sm:text-base leading-snug line-clamp-2 group-hover:text-[#B91C35] transition-colors mb-2 min-h-[2rem] sm:min-h-[2.5rem]">
                        {p.name}
                      </h3>
                      <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#FFF9F0] border border-[#EADBCA] text-[11px] text-[#647084] font-medium">
                        Packing: <span className="text-[#10172A] font-bold">{p.unit}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EADBCA]/70">
                      <div className="flex items-baseline justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg sm:text-2xl font-black text-[#10172A] font-mono tracking-tight">
                            {formatPrice(p.offerPrice)}
                          </span>
                          {p.mrp > p.offerPrice && (
                            <span className="text-xs text-[#647084] line-through font-mono">
                              {formatPrice(p.mrp)}
                            </span>
                          )}
                        </div>

                        {discount > 0 && (
                          <span className="text-[11px] font-bold text-[#27AE60] bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                            Save {formatPrice(Math.round(p.mrp - p.offerPrice))}
                          </span>
                        )}
                      </div>

                      {/* Quantity or Add Button */}
                      {qty > 0 ? (
                        <div className="flex items-center justify-between bg-[#FFF9F0] border border-[#EADBCA] rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(p.id, qty - 1)}
                            className="w-8 h-8 rounded-lg bg-white border border-[#EADBCA] flex items-center justify-center text-[#10172A] hover:bg-[#B91C35] hover:text-white hover:border-[#B91C35] transition-colors font-bold text-sm"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-extrabold text-[#10172A] text-sm font-mono px-2">
                            {qty} in Cart
                          </span>
                          <button
                            onClick={() => updateQuantity(p.id, qty + 1)}
                            className="w-8 h-8 rounded-lg bg-white border border-[#EADBCA] flex items-center justify-center text-[#10172A] hover:bg-[#B91C35] hover:text-white hover:border-[#B91C35] transition-colors font-bold text-sm"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAdd(p)}
                          disabled={!p.inStock}
                          className={`w-full py-2.5 sm:py-3 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                            isJustAdded
                              ? 'bg-[#27AE60] text-white shadow-green-600/20'
                              : 'bg-[#B91C35] hover:bg-[#9E152B] text-white shadow-red-950/20 hover:scale-[1.01] active:scale-[0.99]'
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
          <div className="bg-[#FFFFFF] border border-[#EADBCA] rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FFF9F0] border-b border-[#EADBCA] text-[#647084] text-xs font-black uppercase tracking-wider">
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
                      <tr key={p.id} className="hover:bg-[#FFF9F0]/60 transition-colors">
                        <td className="py-3.5 px-5">
                          <span className="font-extrabold text-[#10172A] block">{p.name}</span>
                          {p.nameTa && <span className="text-xs text-[#647084]">{p.nameTa}</span>}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FFF9F0] border border-[#EADBCA] text-xs font-medium text-[#10172A]">
                            {p.category?.name}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-[#647084] text-xs font-medium">{p.unit}</td>
                        <td className="py-3.5 px-5 text-[#647084] line-through font-mono text-xs">
                          {formatPrice(p.mrp)}
                        </td>
                        <td className="py-3.5 px-5 font-mono font-black text-base text-[#10172A]">
                          {formatPrice(p.offerPrice)}
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          {qty > 0 ? (
                            <div className="inline-flex items-center gap-2 bg-[#FFF9F0] border border-[#EADBCA] rounded-xl p-1">
                              <button
                                onClick={() => updateQuantity(p.id, qty - 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-[#EADBCA] flex items-center justify-center text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold text-xs px-1">{qty}</span>
                              <button
                                onClick={() => updateQuantity(p.id, qty + 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-[#EADBCA] flex items-center justify-center text-xs font-bold"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAdd(p)}
                              disabled={!p.inStock}
                              className={`px-4 py-2 rounded-xl text-xs font-extrabold ${
                                isJustAdded
                                  ? 'bg-[#27AE60] text-white'
                                  : 'bg-[#B91C35] hover:bg-[#9E152B] text-white'
                              } transition-colors`}
                            >
                              {isJustAdded ? 'Added' : 'Add to Order'}
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
      </div>
    </div>
  )
}
