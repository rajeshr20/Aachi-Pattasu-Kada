'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, ShoppingCart, Menu, X, Flame } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import CartDrawer from './CartDrawer'

interface HeaderProps {
  settings?: Record<string, string>
}

export default function Header({ settings = {} }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { items, total, toggleCart } = useCartStore()

  const itemCount = items.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const phone1 = settings.phone1 || '9500565391'

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop Crackers' },
    { href: '/price-list', label: 'Price List' },
    { href: '/track', label: 'Track Order' },
    { href: '/safety', label: 'Safety Tips' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0D1A]/95 backdrop-blur-md border-b border-[#F5A623]/20 shadow-xl'
            : 'bg-gradient-to-b from-[#0B0D1A]/90 to-transparent'
        }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F5A623] via-[#E67E22] to-[#C0392B] flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block leading-tight group-hover:text-[#F5A623] transition-colors">
                  Aachi Crackers
                </span>
                <span className="text-[#F5A623] text-xs font-semibold uppercase tracking-wider block">
                  Perumanallur • Sivakasi Direct
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-gray-300 hover:text-[#F5A623] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Direct Call Button */}
              <a
                href={`tel:${phone1}`}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#27AE60]/15 border border-[#27AE60]/40 text-[#2ECC71] text-xs font-bold hover:bg-[#27AE60]/30 transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs font-bold hover:bg-[#F5A623]/30 transition-all shadow-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#C0392B] text-white text-[10px] font-extrabold">
                    {itemCount}
                  </span>
                )}
                {itemCount > 0 && (
                  <span className="hidden md:inline font-mono text-white">
                    ₹{Math.round(total)}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="lg:hidden border-t border-white/10 py-4 space-y-1 bg-[#0B0D1A]/95 rounded-b-2xl shadow-2xl animate-in slide-in-from-top-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-200 hover:text-[#F5A623] hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 px-4 flex gap-3">
                <a
                  href={`tel:${phone1}`}
                  className="flex-1 py-2.5 text-center text-xs font-bold rounded-xl bg-[#27AE60]/20 text-[#2ECC71] border border-[#27AE60]/40"
                >
                  📞 Call: 95005 65391
                </a>
                <Link
                  href="/products"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 py-2.5 text-center text-xs font-bold rounded-xl bg-[#F5A623] text-[#0B0D1A]"
                >
                  🛒 Shop Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Bottom Quick-Action Bar */}
      <div className="mobile-action-bar lg:hidden flex items-center justify-around">
        <a href={`tel:${phone1}`} className="flex flex-col items-center gap-0.5 text-[#2ECC71] py-1 px-3">
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-bold">Call</span>
        </a>
        <a
          href={`https://wa.me/91${phone1}?text=${encodeURIComponent('Hi! I want to enquire about firecrackers from Aachi Crackers.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[#25D366] py-1 px-3"
        >
          <svg
            width="20"
            height="20"
            style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px' }}
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>
        <button onClick={toggleCart} className="flex flex-col items-center gap-0.5 text-[#F5A623] py-1 px-3 relative">
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 bg-[#C0392B] rounded-full text-white text-[9px] font-extrabold flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="text-[10px] font-bold">
            {itemCount > 0 ? `₹${Math.round(total)}` : 'Cart'}
          </span>
        </button>
        <Link href="/products" className="flex flex-col items-center gap-0.5 text-white py-1 px-3">
          <Flame className="w-5 h-5 text-[#F5A623]" />
          <span className="text-[10px] font-bold">Shop</span>
        </Link>
      </div>

      <CartDrawer />
    </>
  )
}
