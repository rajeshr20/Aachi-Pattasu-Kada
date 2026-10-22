'use client'

import { useState, useEffect, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search, Printer, Download, ShoppingCart, Plus, Check, ArrowUpDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, calcDiscount } from '@/lib/utils'

interface ProductItem {
  id: string
  name: string
  nameTa: string
  category: { name: string; nameTa: string; slug: string }
  mrp: number
  offerPrice: number
  unit: string
  inStock: boolean
}

export default function PriceListPage() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [addedId, setAddedId] = useState<string | null>(null)
  const { addItem, openCart } = useCartStore()

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.products) {
          setProducts(data.products)
          const cats = Array.from(new Set(data.products.map((p: any) => p.category?.name).filter(Boolean))) as string[]
          setCategories(cats)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === 'ALL' || p.category?.name === selectedCategory
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.nameTa.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [products, selectedCategory, search])

  const handleAddToCart = (product: ProductItem) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      nameTa: product.nameTa,
      mrp: product.mrp,
      offerPrice: product.offerPrice,
      unit: product.unit,
      categoryName: product.category?.name,
    })
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#0B0D1A] text-white flex flex-col">
      <Header />

      <main className="flex-1 pb-16 site-container" style={{ paddingTop: '120px' }}>
        {/* Centered Header banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 pb-6 border-b border-white/10 print:border-none">
          <span className="text-xs uppercase tracking-widest text-[#F5A623] font-bold bg-[#F5A623]/10 px-4 py-1.5 rounded-full border border-[#F5A623]/25 inline-block mb-3">
            Diwali 2026 Special Rate Card
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
            Wholesale Crackers <span className="text-[#F5A623]">Price List</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Direct Sivakasi factory wholesale rates in Perumanallur. Transparent pricing with up to 80% discount on standard MRP.
          </p>

          <div className="flex items-center justify-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/10 transition-colors shadow-md"
            >
              <Printer className="w-4 h-4 text-[#F5A623]" />
              Print / Save PDF
            </button>
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#FFD166] text-[#0B0D1A] text-sm font-bold shadow-lg transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              View Cart & Order
            </button>
          </div>
        </div>

        {/* Centered Filter & Search Bar (Hidden when printing) */}
        <div className="bg-[#121626]/90 border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 max-w-4xl mx-auto shadow-2xl print:hidden space-y-4">
          <div className="relative max-w-2xl mx-auto w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search firecracker by name (e.g. Bijili, Chakkar, Ladi, Rocket, Sparklers)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623] transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/5">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === 'ALL'
                  ? 'bg-[#F5A623] text-[#0B0D1A] shadow-md shadow-orange-500/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              All Categories ({products.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#F5A623] text-[#0B0D1A] shadow-md shadow-orange-500/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price List Table */}
        <div className="bg-[#121626] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#181D33] text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">Unit</th>
                  <th className="py-3.5 px-4 text-right">MRP</th>
                  <th className="py-3.5 px-4 text-right">Offer Price</th>
                  <th className="py-3.5 px-4 text-center">Discount</th>
                  <th className="py-3.5 px-4 text-center print:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400">
                      Loading crackers price list...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400">
                      No products found matching &ldquo;{search}&rdquo;
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p, idx) => {
                    const discount = calcDiscount(p.mrp, p.offerPrice)
                    const isAdded = addedId === p.id

                    return (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 text-xs text-gray-500 font-mono">{idx + 1}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{p.name}</div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-gray-400">
                          {p.category?.name || 'General'}
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
                        <td className="py-3.5 px-4 text-center print:hidden">
                          <button
                            onClick={() => handleAddToCart(p)}
                            disabled={!p.inStock}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 mx-auto ${
                              isAdded
                                ? 'bg-[#27AE60] text-white'
                                : 'bg-[#F5A623]/20 hover:bg-[#F5A623] text-[#F5A623] hover:text-[#0B0D1A]'
                            } disabled:opacity-30`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" /> Added
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" /> Add
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note on legal compliance */}
        <div className="mt-8 p-4 bg-[#121626] border border-white/5 rounded-xl text-xs text-gray-400 space-y-1">
          <p className="font-semibold text-gray-300">⚠️ Disclaimer & Terms:</p>
          <p>• Prices are subject to revision as per factory supply and stock availability.</p>
          <p>• In accordance with Indian explosive safety regulations, all bookings on this portal are processed as quotation/enquiry requests. Orders will be confirmed directly by phone call.</p>
          <p>• Delivery options: Direct shop pickup in Perumanallur (Opposite Aachi Mess) or transport parcel service to all major districts in Tamil Nadu.</p>
        </div>
      </main>

      <Footer settings={{}} />
    </div>
  )
}
