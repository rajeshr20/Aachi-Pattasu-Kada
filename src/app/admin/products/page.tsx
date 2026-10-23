import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Tag, Package, ExternalLink, Search, X } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { DEFAULT_PRODUCTS } from '@/lib/catalogData'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string }>
}) {
  const params = searchParams ? await searchParams : {}
  const query = (params.q || '').trim().toLowerCase()

  let allProducts: any[] = []

  try {
    const dbProducts = await prisma.product.findMany({
      where: { isDeleted: false },
      include: { category: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    })
    allProducts = dbProducts.length > 0 ? dbProducts : DEFAULT_PRODUCTS
  } catch (err) {
    console.warn('AdminProductsPage: DB query fallback:', err)
    allProducts = DEFAULT_PRODUCTS
  }

  // Filter based on search query
  const filteredProducts = query
    ? allProducts.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.nameTa?.toLowerCase().includes(query) ||
          p.category?.name?.toLowerCase().includes(query)
      )
    : allProducts

  return (
    <div className="space-y-8 pt-12 lg:pt-0">
      
      {/* Page Header with Generous Sentence Gap */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div className="space-y-1.5">
          <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-bold">
            Catalog & Inventory Management
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Products Management
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
            Control firecracker varieties, pack units, discount percentages, and live seasonal inventory stock.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3.5 shrink-0">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-5 py-3 bg-[#B91C35] hover:bg-[#991429] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/products"
            target="_blank"
            className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/10 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Store</span>
          </Link>
        </div>
      </div>

      {/* Admin Search Bar & Quick Filters */}
      <div className="bg-[#121626] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm">
        <form method="GET" action="/admin/products" className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            name="q"
            defaultValue={params.q || ''}
            placeholder="Search products by name, Tamil title, or category..."
            className="w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#D6B36A] transition-all"
          />
          {params.q && (
            <Link
              href="/admin/products"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </Link>
          )}
        </form>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
          <span className="font-medium">
            Showing <strong className="text-white font-bold">{filteredProducts.length}</strong> of {allProducts.length} items
          </span>
          {params.q && (
            <Link
              href="/admin/products"
              className="text-[#D6B36A] hover:underline font-bold"
            >
              Reset search
            </Link>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#121626] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#181D33] text-slate-400 text-xs uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-4 px-5 font-bold">Product Name</th>
                <th className="py-4 px-5 font-bold">Tamil Title</th>
                <th className="py-4 px-5 font-bold">Category</th>
                <th className="py-4 px-5 text-center font-bold">Pack Unit</th>
                <th className="py-4 px-5 text-right font-bold">Original MRP</th>
                <th className="py-4 px-5 text-right font-bold">Offer Price</th>
                <th className="py-4 px-5 text-center font-bold">Stock Count</th>
                <th className="py-4 px-5 text-center font-bold">Inventory Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <p className="text-base font-bold text-white mb-1">No products match your search</p>
                    <p className="text-xs text-slate-400 mb-4">Try checking for typos or searching a broader term like &quot;chakkar&quot; or &quot;pot&quot;.</p>
                    <Link
                      href="/admin/products"
                      className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15 transition-all inline-block"
                    >
                      View All Products
                    </Link>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                    
                    {/* Product Name */}
                    <td className="py-4 px-5 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <span>{p.name}</span>
                        {p.isBestSeller && (
                          <span className="text-[10px] bg-[#D6B36A]/20 text-[#D6B36A] px-2 py-0.5 rounded-full border border-[#D6B36A]/30 font-bold shrink-0">
                            Bestseller
                          </span>
                        )}
                        {p.isFeatured && (
                          <span className="text-[10px] bg-[#B91C35]/20 text-[#B91C35] px-2 py-0.5 rounded-full border border-[#B91C35]/30 font-bold shrink-0">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Tamil Title */}
                    <td className="py-4 px-5 text-xs text-[#D6B36A] font-medium">
                      {p.nameTa || '—'}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-5 text-xs text-slate-300">
                      {p.category?.name || 'Sivakasi Variety'}
                    </td>

                    {/* Pack Unit */}
                    <td className="py-4 px-5 text-xs text-slate-300 text-center font-mono">
                      <span className="px-2 py-1 bg-white/5 rounded-md border border-white/5">
                        {p.unit}
                      </span>
                    </td>

                    {/* Original MRP */}
                    <td className="py-4 px-5 text-right text-slate-500 line-through font-mono text-xs">
                      {formatPrice(p.mrp)}
                    </td>

                    {/* Offer Price */}
                    <td className="py-4 px-5 text-right text-emerald-400 font-bold font-mono text-sm">
                      {formatPrice(p.offerPrice)}
                    </td>

                    {/* Stock Count */}
                    <td className="py-4 px-5 text-center text-xs font-mono">
                      <span className={p.stock < 20 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                        {p.stock}
                      </span>
                    </td>

                    {/* Inventory Status */}
                    <td className="py-4 px-5 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          p.inStock
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
