import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { FolderTree, Plus, Sparkles } from 'lucide-react'
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS, getCategoryImageUrl } from '@/lib/catalogData'

export default async function AdminCategoriesPage() {
  let categories: any[] = []

  try {
    const dbCategories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: { where: { isDeleted: false } } },
        },
      },
    })
    categories = dbCategories.length > 0 ? dbCategories : DEFAULT_CATEGORIES.map(c => ({
      ...c,
      _count: {
        products: DEFAULT_PRODUCTS.filter(p => p.category?.id === c.id || p.category?.name === c.name).length,
      },
    }))
  } catch (err) {
    console.warn('AdminCategoriesPage: DB fallback:', err)
    categories = DEFAULT_CATEGORIES.map(c => ({
      ...c,
      _count: {
        products: DEFAULT_PRODUCTS.filter(p => p.category?.id === c.id || p.category?.name === c.name).length,
      },
    }))
  }

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-bold">Catalog Structure</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Categories Management</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Total {categories.length} organized Sivakasi firecracker categories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-[#121626] border border-white/10 rounded-2xl p-5 hover:border-[#D6B36A]/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/20 bg-black/40 shrink-0">
                <Image
                  src={getCategoryImageUrl(c)}
                  alt={c.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{c.name}</h3>
                <p className="text-xs text-[#D6B36A] font-medium">{c.nameTa}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">/{c.slug}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#D6B36A]/10 text-[#D6B36A] border border-[#D6B36A]/20">
                {c._count?.products ?? 0} items
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
