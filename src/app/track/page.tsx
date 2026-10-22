'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search, Package, Clock, CheckCircle, Truck, AlertCircle, Phone, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface OrderData {
  orderNumber: string
  createdAt: string
  customerName: string
  customerPhone: string
  deliveryType: string
  status: string
  total: number
  items: Array<{
    id: string
    productName: string
    productNameTa: string
    quantity: number
    offerPrice: number
    lineTotal: number
    unit: string
  }>
}

const statusSteps = [
  { key: 'RECEIVED', label: 'Order Received', desc: 'Enquiry received' },
  { key: 'CONFIRMED', label: 'Confirmed', desc: 'Verified by shop' },
  { key: 'PACKED', label: 'Packed & Ready', desc: 'Ready for delivery' },
  { key: 'DISPATCHED', label: 'In Transit', desc: 'On its way' },
  { key: 'DELIVERED', label: 'Delivered', desc: 'Completed' },
]

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState<OrderData | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) {
      setError('Please enter your Order ID')
      return
    }
    setLoading(true)
    setError('')
    setOrder(null)

    try {
      const res = await fetch(`/api/track?orderNumber=${encodeURIComponent(orderNumber.trim())}&phone=${encodeURIComponent(phone.trim())}`)
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Order not found')
      }
      setOrder(data.order)
    } catch (err: any) {
      setError(err.message || 'Unable to find order details. Please check your Order ID.')
    } finally {
      setLoading(false)
    }
  }

  const getStepIndex = (status: string) => {
    const idx = statusSteps.findIndex(s => s.key === status)
    return idx === -1 ? 0 : idx
  }

  return (
    <div className="min-h-screen bg-[#0B0D1A] text-white flex flex-col">
      <Header />

      <main className="flex-1 pt-36 sm:pt-44 pb-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-bold bg-[#D6B36A]/10 px-3.5 py-1.5 rounded-full border border-[#D6B36A]/30">
            Live Order Status
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Enter your order reference ID (e.g. APK-2026-XXXX) and registered phone number to track your crackers enquiry status.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-[#121626] border border-[#F5A623]/20 rounded-2xl p-6 sm:p-8 shadow-2xl mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Order ID *
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. APK-2026-0001"
                    value={orderNumber}
                    onChange={e => setOrderNumber(e.target.value.toUpperCase())}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623] transition-colors"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D35400] text-[#0B0D1A] font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>Searching...</>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Track My Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Details Display */}
        {order && (
          <div className="bg-[#121626] border border-[#27AE60]/30 rounded-2xl p-6 sm:p-8 shadow-2xl animate-fade-in space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-gray-400">Order Reference</span>
                <h2 className="text-2xl font-black text-[#F5A623]">{order.orderNumber}</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-400">Delivery Preference</span>
                <div className="font-semibold text-white flex items-center gap-1.5 justify-end">
                  {order.deliveryType === 'PICKUP' ? (
                    <span className="text-[#F5A623]">🏬 Direct Store Pickup</span>
                  ) : (
                    <span className="text-[#2ECC71]">🚚 Door / Transport Delivery</span>
                  )}
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  Total: <span className="text-[#2ECC71]">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Stepper / Timeline */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Order Progress
              </h3>
              <div className="relative flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                {statusSteps.map((step, idx) => {
                  const currentIdx = getStepIndex(order.status)
                  const isCompleted = idx <= currentIdx
                  const isCurrent = idx === currentIdx

                  return (
                    <div key={step.key} className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1 relative text-left sm:text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border-2 transition-all ${
                          isCompleted
                            ? 'bg-[#27AE60] border-[#2ECC71] text-white shadow-lg shadow-green-500/20'
                            : 'bg-[#181D33] border-white/10 text-gray-500'
                        } ${isCurrent ? 'ring-4 ring-[#2ECC71]/30 animate-pulse' : ''}`}
                      >
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                      </div>

                      <div>
                        <div className={`text-xs font-bold ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                          {step.label}
                        </div>
                        <div className={`text-[10px] ${isCompleted ? 'text-[#F5A623]' : 'text-gray-600'}`}>
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Items summary */}
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Items in this Order ({order.items.length})
              </h3>
              <div className="divide-y divide-white/5 max-h-60 overflow-y-auto pr-2">
                {order.items.map(item => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-white">{item.productName}</p>
                      <p className="text-xs text-gray-500">{item.unit} × {item.quantity}</p>
                    </div>
                    <div className="text-right font-semibold text-white">
                      {formatPrice(item.lineTotal)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-[#181D33] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F5A623]" />
                <span>Need assistance? Call us directly: <strong>95005 65391</strong> / <strong>77086 32966</strong></span>
              </div>
              <a
                href={`https://wa.me/919500565391?text=${encodeURIComponent(`Hi Aachi Pattasu Kadai, I want to ask about my order ${order.orderNumber}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-semibold hover:bg-[#25D366]/30 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer settings={{}} />
    </div>
  )
}
