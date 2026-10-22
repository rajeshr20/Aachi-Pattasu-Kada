'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { MapPin, Phone, ChevronRight, Download, Sparkles, ShieldCheck } from 'lucide-react'

const FireworkCanvas = dynamic(() => import('../FireworkCanvas'), { ssr: false })

interface HeroProps {
  settings: Record<string, string>
}

// Deterministic static stars
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${((i * 37 + 13) % 96) + 2}%`,
  top: `${((i * 29 + 7) % 55) + 2}%`,
  opacity: (0.15 + ((i * 19) % 35) / 100).toFixed(2),
  duration: `${(2.2 + ((i * 13) % 25) / 10).toFixed(1)}s`,
  delay: `${(((i * 23) % 28) / 10).toFixed(1)}s`,
}))

export default function HeroSection({ settings }: HeroProps) {
  const phone1 = settings.phone1 || '9500565391'
  const phone2 = settings.phone2 || '7708632966'
  const address = settings.address || 'Opposite Aachi Mess, Perumanallur, Tirupur'

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Animated Fireworks Canvas */}
      <FireworkCanvas />

      {/* Lighting overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D1A]/30 via-transparent to-[#0B0D1A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,166,35,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Background Starry Night */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STARS.map(star => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
              opacity: parseFloat(star.opacity),
              animation: `sparkle ${star.duration} ease-in-out infinite`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 site-container text-center flex flex-col items-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#F5A623]/30 text-[#F5A623] text-xs font-bold tracking-wide uppercase mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Diwali 2026 Mega Crackers Sale • Up to 80% Off MRP</span>
        </div>

        {/* Brand Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-4">
          <span className="text-gradient-gold">Aachi</span>{' '}
          <span className="text-white">Crackers</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl lg:text-2xl text-gray-200 font-semibold max-w-2xl mx-auto mb-4 leading-snug px-2">
          Your Diwali, Our Spark — Direct Factory Prices from Sivakasi
        </p>

        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#121626]/80 border border-white/10 text-gray-300 text-xs sm:text-sm font-medium mb-8">
          <MapPin className="w-4 h-4 text-[#C0392B] shrink-0" />
          <span>{address}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 w-full max-w-md mx-auto sm:max-w-none">
          <Link
            href="/products"
            className="w-full sm:w-auto justify-center flex items-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#F5A623] via-[#E67E22] to-[#D35400] text-[#0B0D1A] font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/25 hover:scale-105 transition-all"
          >
            <span>Shop Crackers Now</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="/price-list"
            className="w-full sm:w-auto justify-center flex items-center gap-2 px-7 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base border border-white/15 backdrop-blur-md shadow-lg transition-all"
          >
            <Download className="w-5 h-5 text-[#F5A623]" />
            <span>Download Price List</span>
          </Link>
        </div>

        {/* Phone Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          <a
            href={`tel:${phone1}`}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#27AE60]/20 border border-[#27AE60]/40 text-[#2ECC71] text-xs sm:text-sm font-bold hover:bg-[#27AE60]/30 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Order Line: {phone1.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
          </a>
          <a
            href={`tel:${phone2}`}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm font-semibold hover:bg-white/10 transition-all"
          >
            <Phone className="w-4 h-4 text-gray-400" />
            <span>Support: {phone2.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
          </a>
        </div>

        {/* Compliance Guarantee Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-gray-400 pt-6 border-t border-white/10 w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2ECC71]" />
            <span>100% Genuine Sivakasi Stock</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#F5A623]">⚡</span>
            <span>Zero Middlemen Factory Prices</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#3498DB]">🚚</span>
            <span>Direct Pickup & Tamil Nadu Parcel Transport</span>
          </div>
        </div>
      </div>
    </section>
  )
}
