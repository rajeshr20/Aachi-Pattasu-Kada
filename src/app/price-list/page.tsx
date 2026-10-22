'use client'

import { useState, useEffect, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search, Printer, ShoppingCart, Plus, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, calcDiscount } from '@/lib/utils'

interface ProductItem {
  id: string
  name: string
  nameTa?: string
  category: { name: string; nameTa?: string; slug: string }
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
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products)
          const cats = Array.from(
            new Set(data.products.map((p: any) => p.category?.name).filter(Boolean))
          ) as string[]
          setCategories(cats)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'ALL' || p.category?.name === selectedCategory
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.nameTa && p.nameTa.toLowerCase().includes(search.toLowerCase()))
      return matchCat && matchSearch
    })
  }, [products, selectedCategory, search])

  const handleAddToCart = (product: ProductItem) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      nameTa: product.nameTa || product.name,
      mrp: product.mrp,
      offerPrice: product.offerPrice,
      unit: product.unit,
      categoryName: product.category?.name || 'Crackers',
    })
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
    openCart()
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#10172A] flex flex-col">
      <Header />

      <main className="flex-1 pb-20">
        {/* Header Hero Banner (Midnight Navy) */}
        <div className="bg-[#10172A] text-white pt-36 sm:pt-44 pb-14 sm:pb-20 border-b border-[#D6B36A]/20 print:hidden relative overflow-hidden">
          <div className="site-container text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-black bg-[#D6B36A]/10 px-4 py-1.5 rounded-full border border-[#D6B36A]/30 inline-block mb-4">
              Diwali 2026 Special Rate Card
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
              Wholesale Crackers <span className="text-gold-gradient">Price List</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Direct Sivakasi factory wholesale rates in Perumanallur. Transparent pricing with verified green certification and up to 80% discount on standard retail MRP.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-bold border border-white/15 transition-all shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#D6B36A]" />
                <span>Print / Save as PDF</span>
              </button>
              <button
                onClick={openCart}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B91C35] hover:bg-[#9E152B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-950/30 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>View Order Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="site-container pt-8 sm:pt-12">
          {/* Search & Category Filter Bar */}
          <div className="bg-[#FFFFFF] border border-[#EADBCA] rounded-2xl p-5 mb-8 max-w-4xl mx-auto shadow-sm print:hidden space-y-4">
            <div className="relative max-w-2xl mx-auto w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#647084]" />
              <input
                type="text"
                placeholder="Search firecracker by name (e.g. Bijili, Chakkar, Ladi, Rocket, Sparklers)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#FFF9F0] border border-[#EADBCA] rounded-xl text-sm text-[#10172A] placeholder-gray-500 focus:outline-none focus:border-[#B91C35] transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-[#EADBCA]/60">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'ALL'
                    ? 'bg-[#B91C35] text-white shadow-md'
                    : 'bg-[#FFF9F0] text-[#10172A] hover:bg-[#F3ECE1] border border-[#EADBCA]'
                }`}
              >
                All Categories ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#B91C35] text-white shadow-md'
                      : 'bg-[#FFF9F0] text-[#10172A] hover:bg-[#F3ECE1] border border-[#EADBCA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Printable Header for paper export */}
          <div className="hidden print:block text-center mb-8 border-b border-gray-300 pb-4">
            <h1 className="text-2xl font-black text-black">Aachi Crackers, Perumanallur</h1>
            <p className="text-xs text-gray-700">
              Opposite Aachi Mess, Perumanallur, Tirupur | Phone: 95005 65391 / 77086 32966
            </p>
            <p className="text-xs font-bold text-gray-800 mt-1">
              Diwali 2026 Factory Wholesale Rate Card (Direct Sivakasi Stock)
            </p>
          </div>

          {/* Table Container */}
          <div className="bg-[#FFFFFF] border border-[#EADBCA] rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FFF9F0] border-b border-[#EADBCA] text-[#647084] text-xs font-black uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-5 text-center w-12">#</th>
                    <th className="py-4 px-5">Cracker Name</th>
                    <th className="py-4 px-5 hidden sm:table-cell">Category</th>
                    <th className="py-4 px-5">Packing</th>
                    <th className="py-4 px-5 text-right font-mono">MRP (₹)</th>
                    <th className="py-4 px-5 text-right font-mono">Offer Rate (₹)</th>
                    <th className="py-4 px-5 text-center hidden md:table-cell">Discount</th>
                    <th className="py-4 px-5 text-center print:hidden">Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EADBCA]/60">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-[#647084]">
                        Loading wholesale price list...
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-[#647084]">
                        No crackers match your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p, index) => {
                      const discount = calcDiscount(p.mrp, p.offerPrice)
                      const isAdded = addedId === p.id

                      return (
                        <tr
                          key={p.id}
                          className="hover:bg-[#FFF9F0]/60 transition-colors text-xs sm:text-sm"
                        >
                          <td className="py-3.5 px-5 text-center text-[#647084] font-mono text-xs">
                            {index + 1}
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="font-extrabold text-[#10172A] block">{p.name}</span>
                            {p.nameTa && (
                              <span className="text-[11px] text-[#647084] block font-normal">
                                {p.nameTa}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 hidden sm:table-cell">
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FFF9F0] border border-[#EADBCA] text-[11px] font-semibold text-[#10172A]">
                              {p.category?.name}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-[#647084] font-medium text-xs">
                            {p.unit}
                          </td>
                          <td className="py-3.5 px-5 text-right text-[#647084] line-through font-mono">
                            {formatPrice(p.mrp)}
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono font-black text-sm sm:text-base text-[#10172A]">
                            {formatPrice(p.offerPrice)}
                          </td>
                          <td className="py-3.5 px-5 text-center hidden md:table-cell">
                            {discount > 0 && (
                              <span className="px-2 py-0.5 rounded-md bg-red-50 text-[#B91C35] font-black text-[11px] border border-red-200">
                                {discount}% OFF
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 text-center print:hidden">
                            <button
                              onClick={() => handleAddToCart(p)}
                              disabled={!p.inStock}
                              className={`p-2 rounded-xl transition-all shadow-xs ${
                                isAdded
                                  ? 'bg-[#27AE60] text-white'
                                  : 'bg-[#B91C35] hover:bg-[#9E152B] text-white'
                              } disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
                              title="Add to Enquiry Cart"
                            >
                              {isAdded ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Plus className="w-3.5 h-3.5" />
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
