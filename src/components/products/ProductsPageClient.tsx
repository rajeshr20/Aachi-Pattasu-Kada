'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search, LayoutGrid, List, Plus, Minus, ShoppingCart, Sparkles, X, Check, ShieldCheck, Truck, Store } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, calcDiscount } from '@/lib/utils'

interface Product {
  id: string
  name: string
  nameTa: string
  mrp: number
  offerPrice: number
  unit: string
  inStock: boolean
  isBestSeller: boolean
  isFeatured: boolean
  images: { url: string }[]
  category: { name: string; nameTa: string; slug: string }
}

interface Category {
  id: string
  name: string
  nameTa: string
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
    items.find(i => i.productId === productId)?.quantity || 0

  const filtered = useMemo(() => {
    let list = products
    if (activeCategory !== 'all') list = list.filter(p => p.category.slug === activeCategory)
    if (inStockOnly) list = list.filter(p => p.inStock)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q))
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
    <div className="pb-24 lg:pb-16 site-container" style={{ paddingTop: '120px' }}>
      {/* Centered Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] text-xs font-extrabold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Sivakasi Factory Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Order Premium <span className="text-[#F5A623]">Firecrackers</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Authentic Sivakasi fireworks with up to 80% discount off standard retail MRP.
          Book your Diwali crackers online with convenient store pickup in Perumanallur or parcel transport across Tamil Nadu.
        </p>

        {/* Feature Highlights Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-300">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-[#2ECC71]" />
            100% Green Crackers
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <Store className="w-4 h-4 text-[#F5A623]" />
            Opposite Aachi Mess, Perumanallur
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <Truck className="w-4 h-4 text-[#3498DB]" />
            Min. Booking: {formatPrice(minOrder)}
          </span>
        </div>
      </div>

      {/* Centered Search & Filter Console */}
      <div className="bg-[#121626]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 shadow-2xl max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          {/* Centered Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by cracker name (e.g. Bijili, Chakkar, Ladi, Rocket, Sparklers)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-[#0B0D1A] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F5A623] transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Sort, In Stock, View Mode */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3.5 py-3 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-[#F5A623]"
            >
              <option value="default">Sort: Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-300 bg-[#0B0D1A] px-3.5 py-3 rounded-xl border border-white/10 whitespace-nowrap">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#F5A623]"
              />
              In Stock
            </label>

            <div className="flex items-center bg-[#0B0D1A] border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#F5A623] text-[#0B0D1A]'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-[#F5A623] text-[#0B0D1A]'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Centered Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-4 border-t border-white/5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-[#F5A623] text-[#0B0D1A] shadow-md shadow-orange-500/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map(cat => {
            const count = products.filter(p => p.category.slug === cat.slug).length
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.slug
                    ? 'bg-[#F5A623] text-[#0B0D1A] shadow-md shadow-orange-500/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{cat.icon || '💥'}</span>
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="text-center text-xs text-gray-400 mb-6">
        Showing <span className="font-bold text-white">{filtered.length}</span> firecracker products
      </div>

      {/* Products Display */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 bg-[#121626]/50 rounded-2xl border border-white/5 max-w-md mx-auto">
          <p className="text-5xl mb-3">🔍</p>
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search terms or select &ldquo;All Products&rdquo;.
          </p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('all') }}
            className="mt-4 px-5 py-2 rounded-xl bg-[#F5A623] text-[#0B0D1A] font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Perfectly Balanced Centered 2-Column Mobile, 4-Column Desktop Grid */
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 justify-center">
          {filtered.map(p => {
            const discount = calcDiscount(p.mrp, p.offerPrice)
            const qty = getQty(p.id)
            const isJustAdded = addedId === p.id
            const imageUrl = p.images[0]?.url || 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80'

            return (
              <div
                key={p.id}
                className="group bg-[#121626] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-[#F5A623]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-square w-full bg-[#181D33] overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={p.name}
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

                    <span className="px-1.5 py-0.5 sm:px-2 rounded-md bg-black/60 backdrop-blur-md text-gray-300 text-[9px] sm:text-[10px] font-medium border border-white/10 truncate max-w-[80px] sm:max-w-none">
                      {p.category.name}
                    </span>
                  </div>

                  {!p.inStock && (
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-red-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-red-500/10 border border-red-500/30">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between text-center">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-base line-clamp-2 leading-snug group-hover:text-[#F5A623] transition-colors mb-1 min-h-[2rem] sm:min-h-[2.5rem]">
                      {p.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-2 sm:mb-3">
                      Packing: <span className="text-gray-300 font-semibold">{p.unit}</span>
                    </p>
                  </div>

                  <div>
                    {/* Price Block */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      <span className="text-base sm:text-xl font-black text-[#2ECC71] font-mono">
                        {formatPrice(p.offerPrice)}
                      </span>
                      {p.mrp > p.offerPrice && (
                        <span className="text-[10px] sm:text-xs text-gray-500 line-through font-mono">
                          {formatPrice(p.mrp)}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    {qty === 0 ? (
                      <button
                        onClick={() => handleAdd(p)}
                        disabled={!p.inStock}
                        className={`w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-all shadow-md ${
                          isJustAdded
                            ? 'bg-[#27AE60] text-white'
                            : 'bg-gradient-to-r from-[#F5A623] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F5A623] text-[#0B0D1A]'
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-[#F5A623]/15 border border-[#F5A623]/40 rounded-lg sm:rounded-xl px-1.5 sm:px-2 py-1 sm:py-1.5">
                        <button
                          onClick={() => updateQuantity(p.id, qty - 1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-black/50 text-[#F5A623] flex items-center justify-center hover:bg-black"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                        <span className="text-white font-extrabold text-xs sm:text-sm">{qty} in cart</span>
                        <button
                          onClick={() => updateQuantity(p.id, qty + 1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-black/50 text-[#F5A623] flex items-center justify-center hover:bg-black"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#121626] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#181D33] text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4 text-center">#</th>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4 text-center">Category</th>
                  <th className="py-3.5 px-4 text-center">Unit</th>
                  <th className="py-3.5 px-4 text-right">MRP</th>
                  <th className="py-3.5 px-4 text-right">Our Price</th>
                  <th className="py-3.5 px-4 text-center">Discount</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((p, idx) => {
                  const discount = calcDiscount(p.mrp, p.offerPrice)
                  const qty = getQty(p.id)

                  return (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 text-xs text-gray-500 font-mono text-center">{idx + 1}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{p.name}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-gray-400 text-center">
                        {p.category.name}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-gray-300 text-center font-mono">
                        {p.unit}
                      </td>
                      <td className="py-3.5 px-4 text-right text-gray-400 line-through font-mono">
                        {formatPrice(p.mrp)}
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#2ECC71] font-bold font-mono text-base">
                        {formatPrice(p.offerPrice)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-[#C0392B]/20 text-[#E74C3C] text-xs font-bold border border-[#C0392B]/30">
                          {discount}% OFF
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {qty === 0 ? (
                          <button
                            onClick={() => handleAdd(p)}
                            disabled={!p.inStock}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#F5A623] hover:bg-[#E67E22] text-[#0B0D1A] transition-all disabled:opacity-30 flex items-center justify-center gap-1 mx-auto"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-2 bg-[#F5A623]/15 border border-[#F5A623]/30 rounded-lg px-2 py-1">
                            <button onClick={() => updateQuantity(p.id, qty - 1)} className="text-white hover:text-[#F5A623]">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white">{qty}</span>
                            <button onClick={() => updateQuantity(p.id, qty + 1)} className="text-white hover:text-[#F5A623]">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
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
  )
}
