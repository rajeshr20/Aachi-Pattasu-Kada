import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import OrderActions from '@/components/admin/OrderActions'
import { ArrowLeft, Phone, MapPin, Truck, Store } from 'lucide-react'

const statusColors: Record<string, string> = {
  RECEIVED: 'status-received', CONFIRMED: 'status-confirmed',
  PACKED: 'status-packed', DISPATCHED: 'status-dispatched',
  DELIVERED: 'status-delivered', CANCELLED: 'status-cancelled',
}
const statusSteps = ['RECEIVED', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED']

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      statusHistory: { orderBy: { createdAt: 'asc' } },
      customer: true,
    },
  })
  if (!order) notFound()

  const stepIndex = statusSteps.indexOf(order.status)

  const waMessage = `Hi ${order.customerName}!\n\nYour order *${order.orderNumber}* has been confirmed.\n\nItems:\n${order.items.map(i => `• ${i.productName} × ${i.quantity} = ₹${i.lineTotal}`).join('\n')}\n\nTotal: ₹${order.total}\n\nPlease ${order.deliveryType === 'PICKUP' ? 'visit our shop for pickup' : 'expect delivery via transport'}.\n\nThank you! 🎆\n- Aachi Pattasu Kadai`

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      <Link href="/admin/orders" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white font-mono">{order.orderNumber}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusColors[order.status] || ''}`}>
              {order.status}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
        </div>
        <OrderActions order={order} waMessage={waMessage} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Order items */}
          <div className="glass-card p-5">
            <h2 className="font-bold text-white mb-4">Order Items ({order.items.length})</h2>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="font-tamil text-white text-sm">{item.productNameTa}</p>
                    <p className="text-gray-400 text-xs">{item.productName} · {item.unit}</p>
                    <p className="text-gray-500 text-xs">{formatPrice(item.offerPrice)} × {item.quantity}</p>
                  </div>
                  <span className="text-[#F5A623] font-bold">{formatPrice(item.lineTotal)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between font-bold">
              <span className="text-white">Total</span>
              <span className="text-[#F5A623] text-xl">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Status timeline */}
          <div className="glass-card p-5">
            <h2 className="font-bold text-white mb-4">Status Timeline</h2>
            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-2 shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    i <= stepIndex && order.status !== 'CANCELLED'
                      ? 'border-[#27AE60] bg-[#27AE60]/20 text-[#27AE60]'
                      : 'border-gray-700 text-gray-600'
                  }`}>
                    {i < stepIndex && order.status !== 'CANCELLED' ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs ${i <= stepIndex && order.status !== 'CANCELLED' ? 'text-white' : 'text-gray-600'}`}>{step}</span>
                  {i < statusSteps.length - 1 && <div className="w-8 h-0.5 bg-gray-700 shrink-0" />}
                </div>
              ))}
            </div>
            <div className="space-y-2 mt-4">
              {order.statusHistory.map(h => (
                <div key={h.id} className="flex gap-3 text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs ${statusColors[h.status] || 'text-gray-400'}`}>{h.status}</span>
                  <span className="text-gray-400">{h.note}</span>
                  <span className="text-gray-600 text-xs ml-auto">{new Date(h.createdAt).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer info */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h2 className="font-bold text-white mb-4">Customer</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-xs mb-0.5">Name</p>
                <p className="text-white font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-0.5">Phone</p>
                <a href={`tel:${order.customerPhone}`} className="flex items-center gap-1.5 text-[#2ECC71] hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  {order.customerPhone}
                </a>
              </div>
              {order.customerEmail && (
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Email</p>
                  <p className="text-white">{order.customerEmail}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs mb-0.5">Delivery</p>
                <div className="flex items-center gap-1.5 text-white">
                  {order.deliveryType === 'PICKUP' ? <Store className="w-3.5 h-3.5 text-[#F5A623]" /> : <Truck className="w-3.5 h-3.5 text-[#F5A623]" />}
                  {order.deliveryType}
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-0.5">Address</p>
                <p className="text-white text-sm flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C0392B] mt-0.5 shrink-0" />
                  {order.customerAddress}
                </p>
              </div>
              {order.notes && (
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Notes</p>
                  <p className="text-white text-sm">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card p-5">
            <h2 className="font-bold text-white mb-3">Payment</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className={`font-bold ${order.paymentStatus === 'PAID' ? 'text-[#27AE60]' : order.paymentStatus === 'PARTIAL' ? 'text-[#E67E22]' : 'text-[#E74C3C]'}`}>
                  {order.paymentStatus}
                </span>
              </div>
              {order.paymentMethod && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Method</span>
                  <span className="text-white">{order.paymentMethod}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
