'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Sparkles, User, Globe, MessageSquare } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useLanguage } from '@/context/LanguageContext'
import CartDrawer from './CartDrawer'

interface HeaderProps {
  settings?: Record<string, string>
}

export default function Header({ settings = {} }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { items, toggleCart } = useCartStore()
  const { locale, setLocale, t } = useLanguage()

  const itemCount = items.reduce((s, i) => s + (Number(i.quantity) || 0), 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
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

  const announcementEnabled = settings.announcement_bar_enabled !== 'false'
  const announcementText = settings.announcement_bar || 'Festive offers live · GST invoice available · Parcel & pickup'
  const estYear = settings.established_year || ''
  const shopName = locale === 'ta' ? (settings.shop_name_ta || 'ஆச்சி பட்டாசு கடை') : (settings.shop_name || 'Aachi Pattasu Kadai')
  const phone1 = settings.phone1 || '9500565391'

  const phone2 = settings.phone2 || '7708632966'

  const navLinks = [
    { href: '/', label: t('nav.home', 'Home') },
    { href: '/catalogue', label: t('nav.catalogue', 'Catalogue') },
    { href: '/price-list', label: locale === 'ta' ? 'விலைப்பட்டியல்' : 'Price List' },
    { href: '/help', label: t('nav.help', 'Help') },
    { href: '/bulk-orders', label: t('nav.bulk', 'Bulk Orders'), isGreenPill: true },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-200">
        {/* 1. Top Announcement Bar (Rathinam Style) */}
        {announcementEnabled && (
          <div className="bg-[#06222f] text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 tracking-wide border-b border-white/10">
            <div className="site-container flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-200 truncate">
                <span className="text-[#FFB300]">✨</span>
                <span>{announcementText}</span>
              </span>
              <div className="hidden sm:flex items-center gap-4 text-slate-300 text-[11px] shrink-0">
                <a href={`tel:+91${phone1}`} className="hover:text-[#FFB300] transition-colors flex items-center gap-1">
                  <span>📞 {phone1}</span>
                </a>
                <span>·</span>
                <a href={`tel:+91${phone2}`} className="hover:text-[#FFB300] transition-colors">
                  <span>{phone2}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 2. Crisp White Sticky Navigation Bar */}
        <div
          className={`bg-white border-b border-[#EAE5DC] transition-shadow duration-300 ${
            scrolled ? 'shadow-md shadow-slate-900/5' : ''
          }`}
        >
          <div className="site-container">
            <div className="flex items-center justify-between h-18 sm:h-20">
              
              {/* Brand Logo + Optional EST tag */}
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06222f] to-[#0b3a52] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-[#FFB300]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#0F172A] text-base sm:text-lg tracking-tight block leading-tight group-hover:text-[#0B6E99] transition-colors">
                      {shopName}
                    </span>
                    {estYear && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FAF8F4] border border-[#EAE5DC] text-[#475569]">
                        EST. {estYear}
                      </span>
                    )}
                  </div>
                  <span className="text-[#0B6E99] text-[10px] sm:text-[11px] font-medium block">
                    {locale === 'ta' ? 'ஆச்சிமெஸ் எதிரில், பெருமாநல்லூர்' : 'Opposite Aachi Mess, Perumanallur'}
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold transition-all py-1.5 px-2.5 rounded-lg ${
                      link.isGreenPill
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold border border-emerald-200/80'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                
                {/* Language Toggle */}
                <button
                  onClick={() => setLocale(locale === 'ta' ? 'en' : 'ta')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF8F4] hover:bg-[#F1ECE1] border border-[#EAE5DC] text-[#0F172A] transition-all cursor-pointer"
                  title="Switch Language / மொழியை மாற்ற"
                >
                  <Globe className="w-3.5 h-3.5 text-[#0B6E99]" />
                  <span>{locale === 'ta' ? 'English' : 'தமிழ்'}</span>
                </button>

                {/* Cart Icon with Orange Count Badge */}
                <button
                  onClick={toggleCart}
                  className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FAF8F4] hover:bg-[#F1ECE1] border border-[#EAE5DC] text-[#0F172A] font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  aria-label="View Order List Cart"
                >
                  <ShoppingCart className="w-4 h-4 text-[#0B6E99]" />
                  <span className="hidden sm:inline">{t('nav.cart', 'Cart')}</span>
                  {itemCount > 0 && (
                    <span className="bg-[#FFB300] text-[#0F172A] font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                      {itemCount}
                    </span>
                  )}
                </button>

                {/* Login Button */}
                <Link
                  href="/admin"
                  className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#FAF8F4] transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t('nav.login', 'Login')}</span>
                </Link>

                {/* Mobile Menu Hamburger */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden p-2 rounded-xl bg-[#FAF8F4] border border-[#EAE5DC] text-[#0F172A] hover:bg-[#F1ECE1] transition-colors"
                  aria-label="Toggle Navigation Menu"
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white border-l border-[#EAE5DC] p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#EAE5DC] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06222f] to-[#0b3a52] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#FFB300]" />
                  </div>
                  <span className="font-extrabold text-[#0F172A] text-base">{shopName}</span>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-[#FAF8F4] text-slate-500 hover:text-black"
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
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                      link.isGreenPill
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                        : 'text-[#0F172A] hover:bg-[#FAF8F4]'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-[#475569] hover:bg-[#FAF8F4]"
                >
                  <span>{t('nav.login', 'Login / Admin')}</span>
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#EAE5DC] space-y-3">
              <a
                href={`https://wa.me/${settings.whatsapp || '919500565391'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#16A34A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: +91 {phone1}</span>
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
