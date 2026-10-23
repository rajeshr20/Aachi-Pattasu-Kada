import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { ShoppingBag, Package, TrendingUp, Clock, CheckCircle, IndianRupee, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { DEFAULT_PRODUCTS, DEFAULT_CATEGORIES, getCategoryImageUrl } from '@/lib/catalogData'

export default async function AdminDashboard() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let totalOrders = 0
  let todayOrders = 0
  let pendingOrders = 0
  let confirmedOrders = 0
  let totalRevenue = 0
  let recentOrders: any[] = []
  let lowStockProducts: any[] = []
  let totalProducts = DEFAULT_PRODUCTS.length

  try {
    const [
      dbTotalOrders,
      dbTodayOrders,
      dbPendingOrders,
      dbConfirmedOrders,
      dbRevenue,
      dbRecentOrders,
      dbLowStock,
      dbTotalProducts,
    ] = await Promise.all([
      prisma.order.count().catch(() => 0),
      prisma.order.count({ where: { createdAt: { gte: today } } }).catch(() => 0),
      prisma.order.count({ where: { status: 'RECEIVED' } }).catch(() => 0),
      prisma.order.count({ where: { status: { in: ['CONFIRMED', 'PACKED', 'DISPATCHED'] } } }).catch(() => 0),
      prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' } } }).catch(() => ({ _sum: { total: 0 } })),
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        include: { items: true },
      }).catch(() => []),
      prisma.product.findMany({
        where: { isDeleted: false, stock: { lte: 25 }, inStock: true },
        orderBy: { stock: 'asc' },
        take: 5,
      }).catch(() => []),
      prisma.product.count({ where: { isDeleted: false } }).catch(() => DEFAULT_PRODUCTS.length),
    ])

    totalOrders = dbTotalOrders
    todayOrders = dbTodayOrders
    pendingOrders = dbPendingOrders
    confirmedOrders = dbConfirmedOrders
    totalRevenue = dbRevenue._sum?.total || 0
    recentOrders = dbRecentOrders
    lowStockProducts = dbLowStock
    totalProducts = dbTotalProducts || DEFAULT_PRODUCTS.length
  } catch (err) {
    console.warn('AdminDashboard: Database read warning, using safe fallbacks:', err)
  }

  const stats = [
    { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'text-[#D6B36A]', bg: 'bg-[#D6B36A]/10' },
    { label: "Today's Enquiries", value: todayOrders, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Pending Processing', value: pendingOrders, icon: Clock, color: 'text-[#B91C35]', bg: 'bg-[#B91C35]/15' },
    { label: 'Confirmed Dispatches', value: confirmedOrders, icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Total Order Value', value: formatPrice(totalRevenue), icon: IndianRupee, color: 'text-[#D6B36A]', bg: 'bg-[#D6B36A]/10' },
    { label: 'Active Catalog Items', value: totalProducts, icon: Package, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ]

  const statusColors: Record<string, string> = {
    RECEIVED: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    CONFIRMED: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    PACKED: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    DISPATCHED: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    DELIVERED: 'bg-emerald-600/30 text-emerald-200 border border-emerald-500/40',
    CANCELLED: 'bg-red-500/20 text-red-300 border border-red-500/30',
  }

  return (
    <div className="space-y-10 pt-12 lg:pt-0">
      {/* Page Title & Sentence Clearance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div className="space-y-1.5">
          <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-bold">
            Executive Control & Analytics
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Store Dashboard
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
            Real-time overview of customer cracker enquiries, active stock inventory levels, and festive sales performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3.5 shrink-0">
          <Link
            href="/admin/products/new"
            className="px-5 py-3 bg-[#B91C35] hover:bg-[#991429] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all"
          >
            + Add New Cracker
          </Link>
          <Link
            href="/products"
            target="_blank"
            className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/10 transition-all flex items-center gap-2"
          >
            <span>View Live Store</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* Stats grid with generous card padding and gaps */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {stats.map(stat => (
          <div key={stat.label} className="bg-[#121626] border border-white/10 rounded-3xl p-6 sm:p-7 hover:border-[#D6B36A]/50 transition-all shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center shadow-inner`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">{stat.value}</p>
              <p className="text-slate-400 text-xs sm:text-sm font-medium leading-normal">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-[#121626] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
            <div>
              <h2 className="font-extrabold text-white text-base">Recent Enquiries & Orders</h2>
              <p className="text-xs text-slate-400">Latest customer submissions from website</p>
            </div>
            <Link href="/admin/orders" className="text-[#D6B36A] text-xs font-bold hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-white/10 rounded-xl">
                <ShoppingBag className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
                <p className="text-slate-300 font-bold text-sm">No Live Orders Yet</p>
                <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                  Customer enquiries placed via the catalog checkout or WhatsApp will be recorded here with status tracking.
                </p>
              </div>
            ) : (
              recentOrders.map(order => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#D6B36A]/30 transition-all"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-white text-sm">#{order.orderNumber}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusColors[order.status] || ''}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {order.customerName} • {order.customerPhone}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-bold text-emerald-400 text-sm">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Catalog Overview & Quick Actions */}
        <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <Sparkles className="w-5 h-5 text-[#D6B36A]" />
              <h2 className="font-extrabold text-white text-base">Catalog Inventory</h2>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Your store contains {DEFAULT_CATEGORIES.length} active Sivakasi categories and {DEFAULT_PRODUCTS.length} standard cracker SKUs.
            </p>

            <div className="space-y-2.5">
              {DEFAULT_CATEGORIES.slice(0, 5).map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <div className="relative w-5 h-5 rounded overflow-hidden shrink-0 border border-white/20 bg-black/40">
                      <Image
                        src={getCategoryImageUrl(cat)}
                        alt={cat.name}
                        fill
                        sizes="20px"
                        className="object-cover"
                      />
                    </div>
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[11px] text-[#D6B36A] font-bold">
                    {DEFAULT_PRODUCTS.filter(p => p.category?.id === cat.id || p.category?.name === cat.name).length} items
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <Link
              href="/admin/products"
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center text-xs font-bold text-white block transition-all"
            >
              Manage Complete Inventory →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
