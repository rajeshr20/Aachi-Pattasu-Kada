'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, ShoppingCart, Menu, X, Sparkles, FileText, ChevronRight, MessageSquare } from 'lucide-react'
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const phone1 = settings.phone1 || '9500565391'

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Crackers Catalogue' },
    { href: '/#categories', label: 'Categories' },
    { href: '/price-list', label: 'Price List' },
    { href: '/safety', label: 'Safety Tips' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Top Announcement Bar (Rathinam Style) */}
        <div className="bg-[#B91C35] text-white text-[11px] sm:text-xs font-bold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-3">
          <span>✨ 2026 Diwali Bookings Open! Factory-Direct Sivakasi Green Crackers</span>
          <span className="hidden md:inline text-white/50">•</span>
          <a
            href={`tel:${phone1}`}
            className="hidden md:inline-flex items-center gap-1 text-white hover:underline"
          >
            <Phone className="w-3 h-3" />
            +91 {phone1.replace(/(\d{5})(\d{5})/, '$1 $2')}
          </a>
        </div>

        {/* Navigation Bar */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-[#10172A]/95 backdrop-blur-md border-b border-[#D6B36A]/20 shadow-xl'
              : 'bg-gradient-to-b from-[#10172A]/90 via-[#10172A]/60 to-transparent'
          }`}
        >
          <div className="site-container">
            <div className="flex items-center justify-between h-20 sm:h-22">
              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#B91C35] via-[#10172A] to-[#1E293B] border border-[#D6B36A]/40 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-[#D6B36A]" />
                </div>
                <div>
                  <span className="font-black text-white text-lg sm:text-xl tracking-tight block leading-tight group-hover:text-[#D6B36A] transition-colors">
                    Aachi Crackers
                  </span>
                  <span className="text-[#D6B36A] text-[10px] sm:text-xs font-bold uppercase tracking-widest block">
                    Perumanallur • Sivakasi Direct
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-7">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-slate-300 hover:text-[#D6B36A] transition-colors tracking-wide py-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Header Right Actions */}
              <div className="flex items-center gap-3">
                {/* Rate Card Quick Link */}
                <Link
                  href="/price-list"
                  className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Price List</span>
                </Link>

                {/* WhatsApp Order Action */}
                <a
                  href={`https://wa.me/91${phone1}?text=${encodeURIComponent('Hi Aachi Crackers, I want to inquire about Diwali firecrackers.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                {/* Cart Action Button */}
                <button
                  onClick={toggleCart}
                  className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#B91C35] hover:bg-[#9E152B] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-950/30 transition-all cursor-pointer"
                  aria-label="View Enquiry Cart"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  <span className="hidden sm:inline">Order List</span>
                  {itemCount > 0 && (
                    <span className="bg-[#D6B36A] text-[#10172A] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Hamburger Toggle */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-[#D6B36A] transition-colors"
                  aria-label="Toggle Navigation Menu"
                >
                  {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#10172A] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B91C35] to-[#D6B36A] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-extrabold text-white text-base block leading-tight">
                      Aachi Crackers
                    </span>
                    <span className="text-[#D6B36A] text-[10px] font-bold uppercase tracking-wider block">
                      Perumanallur
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-xl text-sm font-bold text-gray-200 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#D6B36A]" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href={`tel:${phone1}`}
                className="btn-crimson w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store: +91 {phone1}</span>
              </a>
              <a
                href={`https://wa.me/91${phone1}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
