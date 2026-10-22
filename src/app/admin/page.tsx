import { prisma } from '@/lib/prisma'
import { ShoppingBag, Users, Package, TrendingUp, Clock, CheckCircle, AlertTriangle, IndianRupee } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default async function AdminDashboard() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [
    totalOrders,
    todayOrders,
    pendingOrders,
    confirmedOrders,
    totalRevenue,
    recentOrders,
    lowStockProducts,
    totalProducts,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: today } } }),
    prisma.order.count({ where: { status: 'RECEIVED' } }),
    prisma.order.count({ where: { status: { in: ['CONFIRMED', 'PACKED', 'DISPATCHED'] } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' } } }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: { items: true },
    }),
    prisma.product.findMany({
      where: { isDeleted: false, stock: { lte: 10 }, inStock: true },
      orderBy: { stock: 'asc' },
      take: 5,
    }),
    prisma.product.count({ where: { isDeleted: false } }),
  ])

  const stats = [
    { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'text-[#F5A623]', bg: 'bg-[#F5A623]/10' },
    { label: "Today's Orders", value: todayOrders, icon: TrendingUp, color: 'text-[#2ECC71]', bg: 'bg-[#2ECC71]/10' },
    { label: 'Pending Confirmation', value: pendingOrders, icon: Clock, color: 'text-[#E67E22]', bg: 'bg-[#E67E22]/10' },
    { label: 'Active Orders', value: confirmedOrders, icon: CheckCircle, color: 'text-[#3498DB]', bg: 'bg-[#3498DB]/10' },
    { label: 'Total Revenue', value: formatPrice(totalRevenue._sum.total || 0), icon: IndianRupee, color: 'text-[#F5A623]', bg: 'bg-[#F5A623]/10' },
    { label: 'Products', value: totalProducts, icon: Package, color: 'text-[#8E44AD]', bg: 'bg-[#8E44AD]/10' },
  ]

  const statusColors: Record<string, string> = {
    RECEIVED: 'status-received',
    CONFIRMED: 'status-confirmed',
    PACKED: 'status-packed',
    DISPATCHED: 'status-dispatched',
    DELIVERED: 'status-delivered',
    CANCELLED: 'status-cancelled',
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-0.5">Overview of store operations, orders and inventory</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="glass-card p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[#F5A623] text-sm hover:underline">View All →</Link>
          </div>
          <div className="space-y-2">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No orders yet</p>
            ) : (
              recentOrders.map(order => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono font-bold text-white text-sm">{order.orderNumber}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status] || ''}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{order.customerName} • {order.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#F5A623] font-bold text-sm">{formatPrice(order.total)}</p>
                    <p className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Low stock */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#E67E22]" />
              Low Stock
            </h2>
            <Link href="/admin/products" className="text-[#F5A623] text-xs hover:underline">Manage →</Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">✅</p>
              <p className="text-gray-400 text-sm">All products well stocked</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map(p => (
                <div key={p.id} className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white text-xs truncate">{p.name}</p>
                    <p className="text-gray-500 text-xs truncate">{p.unit}</p>
                  </div>
                  <span className={`text-sm font-bold px-2 py-0.5 rounded-full ml-2 ${
                    p.stock <= 5 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/admin/orders', label: 'Manage Orders', icon: ShoppingBag, color: 'from-[#F5A623] to-[#FFD166]' },
          { href: '/admin/products/new', label: 'Add Product', icon: Package, color: 'from-[#27AE60] to-[#2ECC71]' },
          { href: '/admin/categories', label: 'Categories', icon: Users, color: 'from-[#8E44AD] to-[#9B59B6]' },
          { href: '/admin/settings', label: 'Settings', icon: AlertTriangle, color: 'from-[#C0392B] to-[#E74C3C]' },
        ].map(action => (
          <Link
            key={action.href}
            href={action.href}
            className={`glass-card p-4 hover:scale-[1.02] transition-transform flex flex-col items-center gap-2 text-center`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-sm font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
