import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Tag, Package, ExternalLink } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { DEFAULT_PRODUCTS } from '@/lib/catalogData'

export default async function AdminProductsPage() {
  let products: any[] = []

  try {
    const dbProducts = await prisma.product.findMany({
      where: { isDeleted: false },
      include: { category: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    })
    products = dbProducts.length > 0 ? dbProducts : DEFAULT_PRODUCTS
  } catch (err) {
    console.warn('AdminProductsPage: DB query fallback:', err)
    products = DEFAULT_PRODUCTS
  }

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-bold">Catalog Management</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Products Management</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Total {products.length} products listed in catalogue
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#B91C35] hover:bg-[#991429] text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Link>
          <Link
            href="/products"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Store
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#121626] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#181D33] text-slate-400 text-xs uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4 font-bold">Product Name</th>
                <th className="py-3.5 px-4 font-bold">Tamil Name</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 text-center font-bold">Unit</th>
                <th className="py-3.5 px-4 text-right font-bold">Original MRP</th>
                <th className="py-3.5 px-4 text-right font-bold">Offer Price</th>
                <th className="py-3.5 px-4 text-center font-bold">Stock</th>
                <th className="py-3.5 px-4 text-center font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {p.name}
                    {p.isBestSeller && (
                      <span className="ml-2 text-[10px] bg-[#D6B36A]/20 text-[#D6B36A] px-2 py-0.5 rounded-full border border-[#D6B36A]/30">
                        Bestseller
                      </span>
                    )}
                    {p.isFeatured && (
                      <span className="ml-1 text-[10px] bg-[#B91C35]/20 text-[#B91C35] px-2 py-0.5 rounded-full border border-[#B91C35]/30">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#D6B36A] font-medium">{p.nameTa}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-400">{p.category?.name || 'Sivakasi Variety'}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-300 text-center font-mono">{p.unit}</td>
                  <td className="py-3.5 px-4 text-right text-slate-500 line-through font-mono">
                    {formatPrice(p.mrp)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-emerald-400 font-bold font-mono">
                    {formatPrice(p.offerPrice)}
                  </td>
                  <td className="py-3.5 px-4 text-center text-xs font-mono">
                    <span className={p.stock < 20 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        p.inStock
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
