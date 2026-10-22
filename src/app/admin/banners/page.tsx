import { connection } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Image as ImageIcon, Plus } from 'lucide-react'

export default async function AdminBannersPage() {
  // Query live data only when handling a request, never during prerendering.
  await connection()

  const banners = await prisma.banner.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Promotional Banners</h1>
          <p className="text-gray-400 text-sm">
            Manage festival banners and promotional hero slides
          </p>
        </div>
      </div>

      <div className="bg-[#121626] border border-white/10 rounded-2xl p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F5A623]/10 text-[#F5A623] flex items-center justify-center mx-auto">
          <ImageIcon className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-white">Hero & Promo Banners Active</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Currently displaying dynamic Diwali countdown and sparkler canvas hero animations on the customer storefront.
        </p>
      </div>
    </div>
  )
}
