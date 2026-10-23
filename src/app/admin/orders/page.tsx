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
    <div className="space-y-8 pt-12 lg:pt-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div className="space-y-1.5">
          <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-bold">
            Order Fulfillment & Tracking
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Customer Orders & Enquiries
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
            Review incoming festival enquiries, verify customer contact details, confirm stock packing, and track road dispatches.
          </p>
        </div>

        <div className="text-xs sm:text-sm text-slate-300 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl font-semibold shrink-0">
          Total Recorded Orders: <strong className="text-[#D6B36A] font-bold">{total}</strong>
        </div>
      </div>

      {/* Filters with clear spacing */}
      <div className="bg-[#121626] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between shadow-sm">
        <form className="flex gap-2.5 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              name="q"
              defaultValue={params.q}
              placeholder="Search by order #, customer name, or phone..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#D6B36A] transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#B91C35] hover:bg-[#991429] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Status Pills */}
        <div className="flex gap-2 flex-wrap items-center">
          <Link
            href="/admin/orders"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              !params.status
                ? 'bg-[#D6B36A] text-slate-950 shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            All Orders
          </Link>
          {statuses.map(s => (
            <Link
              key={s}
              href={`/admin/orders?status=${s}`}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                params.status === s
                  ? 'bg-[#D6B36A] text-slate-950 shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      {/* Orders table with generous cell spacing */}
      <div className="bg-[#121626] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#181D33] text-slate-400 text-xs uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-4 px-5 font-bold">Order Number</th>
                <th className="py-4 px-5 font-bold">Customer Details</th>
                <th className="py-4 px-5 font-bold">Items Count</th>
                <th className="py-4 px-5 font-bold text-right">Order Value</th>
                <th className="py-4 px-5 text-center font-bold">Fulfillment Status</th>
                <th className="py-4 px-5 font-bold">Date Received</th>
                <th className="py-4 px-5 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400">
                    <p className="text-base font-bold text-white mb-1">No orders found</p>
                    <p className="text-xs text-slate-400">There are currently no customer orders matching the selected filter criteria.</p>
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-4 px-5">
                      <span className="font-mono font-bold text-white text-sm">#{order.orderNumber}</span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="space-y-1">
                        <p className="text-white font-semibold text-sm">{order.customerName}</p>
                        <p className="text-slate-400 text-xs font-mono">{order.customerPhone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-300 text-xs">
                      <span className="px-2 py-1 bg-white/5 rounded-md border border-white/5">
                        {order.items.length} items
                      </span>
                    </td>
                    <td className="py-4 px-5 text-emerald-400 font-bold font-mono text-sm text-right">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status] || ''}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-400 text-xs font-mono">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[#D6B36A] hover:underline text-xs font-bold transition-all"
                      >
                        View & Manage →
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
