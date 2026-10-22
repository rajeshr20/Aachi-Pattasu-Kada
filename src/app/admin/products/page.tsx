import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Search, Tag, Eye, Package, Trash2, Edit } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    where: { isDeleted: false },
    include: { category: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products Management</h1>
          <p className="text-gray-400 text-sm">
            Total {products.length} products in catalog
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F5A623] to-[#E67E22] text-[#0B0D1A] font-bold text-sm rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#121626] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#181D33] text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Tamil Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Unit</th>
                <th className="py-3 px-4 text-right">MRP</th>
                <th className="py-3 px-4 text-right">Offer Price</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">
                    {p.name}
                    {p.isBestSeller && (
                      <span className="ml-2 text-[10px] bg-[#F5A623]/20 text-[#F5A623] px-2 py-0.5 rounded-full border border-[#F5A623]/30">
                        Bestseller
                      </span>
                    )}
                    {p.isFeatured && (
                      <span className="ml-1 text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/30">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#F5A623]">{p.nameTa}</td>
                  <td className="py-3 px-4 text-xs text-gray-400">{p.category?.name}</td>
                  <td className="py-3 px-4 text-xs text-gray-300 text-center font-mono">{p.unit}</td>
                  <td className="py-3 px-4 text-right text-gray-400 line-through font-mono">
                    {formatPrice(p.mrp)}
                  </td>
                  <td className="py-3 px-4 text-right text-[#2ECC71] font-bold font-mono">
                    {formatPrice(p.offerPrice)}
                  </td>
                  <td className="py-3 px-4 text-center text-xs font-mono">
                    <span className={p.stock < 20 ? 'text-red-400 font-bold' : 'text-gray-300'}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        p.inStock
                          ? 'bg-[#27AE60]/20 text-[#2ECC71] border border-[#27AE60]/30'
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
