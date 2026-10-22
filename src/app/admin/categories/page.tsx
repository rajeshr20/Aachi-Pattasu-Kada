import { connection } from 'next/server'
import { prisma } from '@/lib/prisma'
import { FolderTree, Plus, Sparkles } from 'lucide-react'

export default async function AdminCategoriesPage() {
  // Query live data only when handling a request, never during prerendering.
  await connection()

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { products: { where: { isDeleted: false } } },
      },
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Categories Management</h1>
          <p className="text-gray-400 text-sm">
            Total {categories.length} cracker categories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c, i) => (
          <div
            key={c.id}
            className="bg-[#121626] border border-white/10 rounded-2xl p-5 hover:border-[#F5A623]/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <span className="text-3xl p-2 rounded-xl bg-white/5">{c.icon || '💥'}</span>
              <div>
                <h3 className="font-bold text-white text-base">{c.name}</h3>
                <p className="text-xs text-[#F5A623]">{c.nameTa}</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">/{c.slug}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/20">
                {c._count.products} items
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
