'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, MessageCircle, Search } from 'lucide-react'
import { Suspense } from 'react'

function SuccessContent() {
  const params = useSearchParams()
  const orderNumber = params.get('order') || ''
  const phone = '9500565391'

  const waMessage = `Hi! I just placed an enquiry on your website.\nOrder ID: ${orderNumber}\nPlease confirm my order. Thank you!`

  return (
    <div className="min-h-screen bg-[#0B0D1A] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-[#27AE60]/20 rounded-full flex items-center justify-center mx-auto border-2 border-[#27AE60]/40">
            <CheckCircle className="w-12 h-12 text-[#27AE60]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-5xl animate-bounce">🎆</div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Enquiry Submitted!</h1>
        <p className="text-gray-400 text-sm mb-6">Thank you for choosing Aachi Crackers, Perumanallur!</p>

        <div className="glass-card p-5 mb-6">
          <p className="text-gray-400 text-sm mb-1">Your Order ID</p>
          <p className="text-3xl font-mono font-extrabold text-[#F5A623]">{orderNumber}</p>
          <p className="text-gray-500 text-xs mt-2">Save this ID to track your order</p>
        </div>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          We will confirm your order via <span className="text-[#25D366] font-semibold">WhatsApp</span> or{' '}
          <span className="text-[#2ECC71] font-semibold">phone call</span> within{' '}
          <span className="text-[#F5A623] font-semibold">24 hours</span>.
          No payment is required now.
        </p>

        <div className="space-y-3">
          <a
            href={`https://wa.me/91${phone}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Send on WhatsApp
          </a>

          <Link
            href={`/track?order=${orderNumber}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 btn-outline-gold rounded-xl"
          >
            <Search className="w-4 h-4" />
            Track Order
          </Link>

          <Link href="/products" className="block w-full py-3 text-center text-gray-400 hover:text-white text-sm transition-colors">
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D1A] flex items-center justify-center"><p className="text-white">Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  )
}
