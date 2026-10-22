'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, ShoppingCart, Menu, X, Sparkles, FileText, ChevronRight } from 'lucide-react'
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

  // Close mobile drawer on resize to desktop
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
    { href: '/products', label: 'Products' },
    { href: '/#categories', label: 'Categories' },
    { href: '/price-list', label: 'Price List' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#10172A]/95 backdrop-blur-md border-b border-[#D6B36A]/20 shadow-xl'
            : 'bg-gradient-to-b from-[#10172A]/90 via-[#10172A]/40 to-transparent'
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
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-gray-300 hover:text-[#D6B36A] transition-colors tracking-wide py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Rate Card Quick Download */}
              <Link
                href="/price-list"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span>Price List</span>
              </Link>

              {/* Direct Call Button */}
              <a
                href={`tel:${phone1}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-[#D6B36A] bg-[#D6B36A]/10 hover:bg-[#D6B36A]/20 border border-[#D6B36A]/30 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>95005 65391</span>
              </a>

              {/* Cart / Enquiry Button */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B91C35] hover:bg-[#9E152B] text-white text-xs font-black shadow-lg shadow-red-950/40 transition-all hover:scale-[1.02] cursor-pointer"
                aria-label="Open Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Enquiry Cart</span>
                {itemCount > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-white text-[#B91C35] text-[10px] font-black min-w-[18px] text-center">
                    {itemCount}
                  </span>
                ) : (
                  <span className="sm:hidden">Cart</span>
                )}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X className="w-5 h-5 text-[#D6B36A]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#10172A] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <span className="font-black text-white text-base block">Aachi Crackers</span>
                  <span className="text-[#D6B36A] text-[10px] font-bold uppercase tracking-wider block">
                    Perumanallur
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <a
                href={`tel:${phone1}`}
                className="w-full py-3 rounded-xl bg-[#D6B36A]/15 border border-[#D6B36A]/30 text-[#D6B36A] font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store: {phone1}</span>
              </a>

              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white/5 text-gray-400 font-semibold text-xs text-center block hover:text-white"
              >
                Store Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
