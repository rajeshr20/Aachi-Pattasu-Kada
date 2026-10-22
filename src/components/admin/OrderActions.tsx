'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, CheckCircle } from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  status: string
  customerPhone: string
  whatsappNumber?: string | null
}

const STATUSES = ['RECEIVED', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED', 'CANCELLED']

export default function OrderActions({ order, waMessage }: { order: Order; waMessage: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [newStatus, setNewStatus] = useState(order.status)

  const waPhone = order.whatsappNumber || order.customerPhone

  const handleStatusChange = async () => {
    if (newStatus === order.status) return
    setLoading(true)
    try {
      await fetch(`/api/admin/orders/${order.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      router.refresh()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* WhatsApp confirm */}
      <a
        href={`https://wa.me/91${waPhone.replace(/\D/g, '')}?text=${encodeURIComponent(waMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] rounded-xl text-sm font-medium hover:bg-[#25D366]/30 transition-all"
      >
        <MessageCircle className="w-4 h-4" />
        Send WhatsApp
      </a>

      {/* Status change */}
      <div className="flex items-center gap-2">
        <select
          value={newStatus}
          onChange={e => setNewStatus(e.target.value)}
          className="input-dark py-2 text-sm"
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={handleStatusChange}
          disabled={loading || newStatus === order.status}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#F5A623] text-black rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFD166] transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          {loading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  )
}
