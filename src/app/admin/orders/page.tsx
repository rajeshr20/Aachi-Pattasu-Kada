import { connection } from 'next/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { Plus, Search } from 'lucide-react'

const statusColors: Record<string, string> = {
  RECEIVED: 'status-received',
  CONFIRMED: 'status-confirmed',
  PACKED: 'status-packed',
  DISPATCHED: 'status-dispatched',
  DELIVERED: 'status-delivered',
  CANCELLED: 'status-cancelled',
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>
}) {
  // Query live data only when handling a request, never during prerendering.
  await connection()

  const params = await searchParams
  const page = Number(params.page) || 1
  const pageSize = 20
  const skip = (page - 1) * pageSize

  const where: Record<string, unknown> = {}
  if (params.status) where.status = params.status
  if (params.q) {
    where.OR = [
      { orderNumber: { contains: params.q } },
      { customerName: { contains: params.q } },
      { customerPhone: { contains: params.q } },
    ]
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
      include: { items: true },
    }),
    prisma.order.count({ where }),
  ])

  const totalPages = Math.ceil(total / pageSize)

  const statuses = ['RECEIVED', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED', 'CANCELLED']

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-gray-400 text-sm mt-0.5">{total} total orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <form className="flex gap-2 flex-1 min-w-[200px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              name="q"
              defaultValue={params.q}
              placeholder="Search orders, name, phone..."
              className="input-dark pl-9 py-2 text-sm w-full"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-[#F5A623] text-black rounded-lg font-bold text-sm">Search</button>
        </form>
        <div className="flex gap-1 flex-wrap">
          <Link href="/admin/orders" className={`px-3 py-1.5 rounded-full text-xs font-medium ${!params.status ? 'bg-[#F5A623] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            All
          </Link>
          {statuses.map(s => (
            <Link key={s} href={`/admin/orders?status=${s}`}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${params.status === s ? 'bg-[#F5A623] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      {/* Orders table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-left">
                <th className="p-4 font-medium">Order #</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-gray-500">No orders found</td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="hover:bg-white/3 transition-colors">
                    <td className="p-4">
                      <span className="font-mono font-bold text-white">{order.orderNumber}</span>
                    </td>
                    <td className="p-4">
                      <p className="text-white font-medium">{order.customerName}</p>
                      <p className="text-gray-500 text-xs">{order.customerPhone}</p>
                    </td>
                    <td className="p-4 text-gray-400">{order.items.length} items</td>
                    <td className="p-4 text-[#F5A623] font-bold">{formatPrice(order.total)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[order.status] || ''}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="p-4">
                      <Link href={`/admin/orders/${order.id}`} className="text-[#F5A623] hover:underline text-xs">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-white/10">
            <p className="text-gray-500 text-sm">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link href={`/admin/orders?page=${page - 1}${params.status ? `&status=${params.status}` : ''}`}
                  className="px-3 py-1.5 text-sm bg-white/5 text-gray-400 rounded-lg hover:bg-white/10">
                  ← Prev
                </Link>
              )}
              {page < totalPages && (
                <Link href={`/admin/orders?page=${page + 1}${params.status ? `&status=${params.status}` : ''}`}
                  className="px-3 py-1.5 text-sm bg-white/5 text-gray-400 rounded-lg hover:bg-white/10">
                  Next →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
