'use client'

import { useCartStore } from '@/store/cart'
import { formatPrice, calcDiscount } from '@/lib/utils'
import { X, ShoppingCart, Trash2, Plus, Minus, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

const MIN_ORDER = 3000

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total } = useCartStore()
  const itemCount = items.reduce((s, i) => s + i.quantity, 0)
  const remaining = Math.max(0, MIN_ORDER - total)
  const progress = Math.min(100, (total / MIN_ORDER) * 100)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#111428] border-l border-[#F5A623]/20 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#F5A623]" />
            <h2 className="font-bold text-white">Your Cart</h2>
            {itemCount > 0 && (
              <span className="bg-[#C0392B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-1 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-600" />
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-gray-500 text-sm">Add some firecrackers to get started!</p>
              <button
                onClick={closeCart}
                className="px-6 py-2 bg-[#F5A623] text-black font-bold rounded-lg hover:bg-[#FFD166] transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.productId} className="glass-card p-3 flex gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">{item.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.unit}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#F5A623] font-bold text-sm">{formatPrice(item.offerPrice)}</span>
                    {item.mrp > item.offerPrice && (
                      <>
                        <span className="text-gray-500 line-through text-xs">{formatPrice(item.mrp)}</span>
                        <span className="badge-discount">{calcDiscount(item.mrp, item.offerPrice)}% OFF</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => removeItem(item.productId)} className="text-gray-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-white font-bold text-sm">
                    {formatPrice(item.offerPrice * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-white/10 space-y-3">
            {/* Min order progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Minimum Order Progress</span>
                <span className={remaining === 0 ? 'text-[#27AE60] font-bold' : 'text-[#F5A623]'}>
                  {remaining === 0 ? '✓ Min. reached!' : `Add ${formatPrice(remaining)} more`}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: remaining === 0 ? 'linear-gradient(90deg, #27AE60, #2ECC71)' : 'linear-gradient(90deg, #F5A623, #FFD166)',
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between font-bold">
              <span className="text-gray-300">Subtotal</span>
              <span className="text-[#F5A623] text-lg">{formatPrice(total)}</span>
            </div>

            {remaining > 0 && (
              <div className="flex gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2.5">
                <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-yellow-400 text-xs">
                  Minimum order is ₹3,000. Add {formatPrice(remaining)} more to proceed.
                </p>
              </div>
            )}

            <Link
              href="/checkout"
              onClick={closeCart}
              className={`block w-full py-3 text-center font-bold rounded-lg transition-all ${
                remaining === 0
                  ? 'bg-gradient-to-r from-[#F5A623] to-[#FFD166] text-black hover:shadow-lg hover:shadow-[#F5A623]/30'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed pointer-events-none'
              }`}
            >
              {remaining === 0 ? '🎉 Place Enquiry' : 'Add more to proceed'}
            </Link>
            <p className="text-center text-xs text-gray-500">
              No payment now. We confirm by WhatsApp/phone.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
