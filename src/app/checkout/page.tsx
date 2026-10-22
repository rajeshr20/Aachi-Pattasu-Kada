'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Phone, MapPin, Truck, Store, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', phone: '', sameWhatsApp: true, whatsapp: '',
    email: '', address: '', pincode: '',
    deliveryType: 'PICKUP', notes: '', legalAccepted: false,
    honeypot: '', // bot trap
  })

  const MIN_ORDER = 3000

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => {
    if (!/^[6-9]\d{9}$/.test(form.phone)) return 'Enter a valid 10-digit Indian phone number'
    if (!form.name.trim()) return 'Name is required'
    if (!form.address.trim()) return 'Address is required'
    if (!form.legalAccepted) return 'Please accept the legal notice'
    if (total < MIN_ORDER) return `Minimum order is ${formatPrice(MIN_ORDER)}`
    if (form.honeypot) return 'Bot detected'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          whatsapp: form.sameWhatsApp ? form.phone : form.whatsapp,
          items: items.map(i => ({
            productId: i.productId,
            productName: i.name,
            productNameTa: i.nameTa,
            unit: i.unit,
            mrp: i.mrp,
            offerPrice: i.offerPrice,
            quantity: i.quantity,
            lineTotal: i.offerPrice * i.quantity,
          })),
          subtotal: total,
          total,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to place order')
      clearCart()
      router.push(`/checkout/success?order=${data.orderNumber}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0D1A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <p className="text-white font-bold text-xl mb-2">Your cart is empty</p>
          <Link href="/products" className="btn-primary mt-4 inline-flex">Browse Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0D1A] pb-24 px-4 sm:px-6" style={{ paddingTop: '120px' }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Place Order Enquiry</h1>
        <p className="text-gray-400 mb-8 text-sm sm:text-base">Direct Sivakasi factory firecrackers. Quick confirmation via WhatsApp/phone.</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot */}
            <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="glass-card p-5 space-y-4">
              <h2 className="font-bold text-white">Your Details</h2>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required className="input-dark" />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Phone Number * <span className="text-gray-500">(10-digit)</span></label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm">+91</span>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="9XXXXXXXXX" maxLength={10} required className="input-dark flex-1" />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="sameWhatsApp" checked={form.sameWhatsApp} onChange={handleChange} className="w-4 h-4 accent-[#F5A623]" />
                <span className="text-gray-400 text-sm">WhatsApp same as phone</span>
              </label>

              {!form.sameWhatsApp && (
                <div>
                  <label className="text-gray-400 text-sm block mb-1">WhatsApp Number</label>
                  <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp number" className="input-dark" />
                </div>
              )}

              <div>
                <label className="text-gray-400 text-sm block mb-1">Email <span className="text-gray-600">(optional)</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-dark" />
              </div>
            </div>

            <div className="glass-card p-5 space-y-4">
              <h2 className="font-bold text-white">Delivery Details</h2>

              {/* Delivery type */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'PICKUP', label: 'Pickup from Shop', icon: Store },
                  { value: 'PARCEL', label: 'Parcel via Transport', icon: Truck },
                ].map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      form.deliveryType === opt.value
                        ? 'border-[#F5A623] bg-[#F5A623]/10 text-[#F5A623]'
                        : 'border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <input type="radio" name="deliveryType" value={opt.value} checked={form.deliveryType === opt.value} onChange={handleChange} className="sr-only" />
                    <opt.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Address *</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="Full address for delivery / reference" required className="input-dark resize-none" />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Pincode</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="641XXX" maxLength={6} className="input-dark" />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Notes / Special requests</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Any special requirements..." className="input-dark resize-none" />
              </div>
            </div>

            {/* Legal notice */}
            <div className="glass-card p-5 border border-[#C0392B]/20 bg-[#C0392B]/5">
              <p className="text-[#E74C3C] font-bold text-xs mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Legal Notice
              </p>
              <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                Online sale of firecrackers is regulated in India. This is an enquiry request only. No payment will be collected online. Our team will contact you within 24 hours to confirm your order.
              </p>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" name="legalAccepted" checked={form.legalAccepted} onChange={handleChange} className="w-4 h-4 accent-[#F5A623] mt-0.5" />
                <span className="text-gray-300 text-sm">I understand this is an enquiry, not a direct purchase. I accept the terms.</span>
              </label>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-base bg-gradient-to-r from-[#F5A623] to-[#FFD166] text-black hover:shadow-xl hover:shadow-[#F5A623]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Submitting...' : '🎆 Submit Enquiry'}
            </button>
            <p className="text-center text-xs text-gray-500">
              No payment now. We confirm by WhatsApp/phone within 24 hours.
            </p>
          </form>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h2 className="font-bold text-white mb-4">Order Summary ({items.length} items)</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">{item.name}</p>
                      <p className="text-gray-500 text-xs">{item.unit} × {item.quantity}</p>
                    </div>
                    <span className="text-[#F5A623] font-bold text-sm shrink-0">
                      {formatPrice(item.offerPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-white">Total</span>
                <span className="text-[#F5A623] text-xl font-extrabold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* What happens next */}
            <div className="glass-card p-5">
              <h3 className="font-bold text-white mb-3">What happens next?</h3>
              <ol className="space-y-3">
                {[
                  { step: '1', text: 'You submit this enquiry form', icon: CheckCircle },
                  { step: '2', text: 'We review & confirm via WhatsApp/call within 24hrs', icon: Phone },
                  { step: '3', text: 'You arrange pickup or we dispatch via transport', icon: MapPin },
                  { step: '4', text: 'Payment collected at delivery or after confirmation', icon: CheckCircle },
                ].map(s => (
                  <li key={s.step} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="w-6 h-6 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/30 text-[#F5A623] text-xs font-bold flex items-center justify-center shrink-0">
                      {s.step}
                    </span>
                    {s.text}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
