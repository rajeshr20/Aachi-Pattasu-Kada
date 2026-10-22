'use client'

import { useCartStore } from '@/store/cart'
import { formatPrice, calcDiscount } from '@/lib/utils'
import { X, ShoppingCart, Trash2, Plus, Minus, AlertTriangle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const MIN_ORDER = 3000

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore()

  // Calculate total and count directly to guarantee accurate reactivity
  const total = items.reduce((sum, item) => sum + (Number(item.offerPrice) || 0) * (Number(item.quantity) || 0), 0)
  const itemCount = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
  const remaining = Math.max(0, MIN_ORDER - total)
  const progress = Math.min(100, (total / MIN_ORDER) * 100)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#10172A] border-l border-white/10 z-[70] flex flex-col shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0E1424]">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-[#D6B36A]" />
            <h2 className="font-extrabold text-white text-base">Your Cracker Order</h2>
            {itemCount > 0 && (
              <span className="bg-[#B91C35] text-white text-xs font-black px-2 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-white/5"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
              <ShoppingCart className="w-16 h-16 text-slate-600" />
              <p className="text-white font-bold text-base">Your cracker cart is empty</p>
              <p className="text-slate-400 text-xs max-w-xs">
                Explore our authentic Sivakasi catalogue and add sparklers, chakkars, or gift boxes to start your order.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-[#B91C35] hover:bg-[#9E152B] text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Browse Catalogue
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-3.5 sm:p-4 flex gap-3.5 items-center justify-between hover:border-[#D6B36A]/40 transition-all"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-bold text-white text-sm truncate">{item.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.unit}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#D6B36A] font-extrabold text-sm font-mono">
                      {formatPrice(item.offerPrice)}
                    </span>
                    {item.mrp > item.offerPrice && (
                      <span className="text-slate-500 line-through text-xs font-mono">
                        {formatPrice(item.mrp)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center font-bold text-xs font-mono text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-emerald-400 font-extrabold text-xs font-mono">
                    {formatPrice(item.offerPrice * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0E1424] space-y-4">
            {/* Minimum Order Indicator */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Wholesale Min. Order (₹3,000)</span>
                <span className={remaining === 0 ? 'text-emerald-400 font-bold' : 'text-[#D6B36A] font-bold'}>
                  {remaining === 0 ? '✓ Min. Order Reached!' : `Add ${formatPrice(remaining)} more`}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: remaining === 0 ? '#10B981' : '#D6B36A',
                  }}
                />
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-slate-300 font-semibold text-sm">Estimated Subtotal</span>
              <span className="text-white text-xl sm:text-2xl font-black font-mono text-[#D6B36A]">
                {formatPrice(total)}
              </span>
            </div>

            {remaining > 0 && (
              <div className="flex gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  Minimum order is ₹3,000 for factory wholesale rates. Please add {formatPrice(remaining)} more to proceed.
                </p>
              </div>
            )}

            <Link
              href="/checkout"
              onClick={closeCart}
              className={`w-full py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 text-center transition-all ${
                remaining === 0
                  ? 'bg-[#B91C35] hover:bg-[#9E152B] text-white shadow-xl shadow-red-950/40'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed pointer-events-none'
              }`}
            >
              <span>{remaining === 0 ? 'Proceed to Order Booking' : 'Add More Crackers to Unlock'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-center text-[11px] text-slate-400">
              No online card payment required. We confirm stock and payment over phone or WhatsApp.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
