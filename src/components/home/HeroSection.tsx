'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { MapPin, Phone, ChevronRight, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'

const FireworkCanvas = dynamic(() => import('../FireworkCanvas'), { ssr: false })

interface HeroProps {
  settings: Record<string, string>
}

// Gentle ambient starry coordinates (restrained, non-distracting)
const AMBIENT_STARS = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${((i * 41 + 17) % 96) + 2}%`,
  top: `${((i * 31 + 11) % 65) + 2}%`,
  opacity: (0.12 + ((i * 17) % 25) / 100).toFixed(2),
  duration: `${(2.8 + ((i * 13) % 20) / 10).toFixed(1)}s`,
  delay: `${(((i * 19) % 25) / 10).toFixed(1)}s`,
}))

export default function HeroSection({ settings }: HeroProps) {
  const phone1 = settings.phone1 || '9500565391'
  const address = settings.address || 'Opposite Aachi Mess, Perumanallur, Tirupur'

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32 bg-[#10172A]">
      {/* Cinematic Ambient Canvas */}
      <FireworkCanvas />

      {/* Lighting Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10172A]/40 via-transparent to-[#10172A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,179,106,0.12)_0%,transparent_65%)] pointer-events-none" />

      {/* Gentle Starry Constellations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {AMBIENT_STARS.map((star) => (
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
        {/* Refined Gold Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[#D6B36A] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
          <span>Sivakasi Factory Wholesale • Authentic Green Crackers</span>
        </div>

        {/* Cinematic Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
          Light Up Every <span className="text-gold-gradient">Celebration</span>
        </h1>

        {/* Refined Supporting Subtitle */}
        <p className="text-base sm:text-xl lg:text-2xl text-gray-200 font-medium max-w-2xl mx-auto mb-8 leading-relaxed px-2">
          Discover crackers for unforgettable celebrations with Aachi Crackers.
        </p>

        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm font-semibold mb-10 backdrop-blur-md">
          <MapPin className="w-4 h-4 text-[#B91C35] shrink-0" />
          <span>{address}</span>
        </div>

        {/* Action Buttons: Crimson Primary + Champagne Gold Secondary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full max-w-md mx-auto sm:max-w-none">
          <Link
            href="/products"
            className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#B91C35] hover:bg-[#9E152B] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-950/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Crackers</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent hover:bg-[#D6B36A]/10 text-white font-bold text-sm sm:text-base border border-[#D6B36A]/50 hover:border-[#D6B36A] backdrop-blur-md shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4 text-[#D6B36A]" />
          </Link>
        </div>

        {/* Phone Contact Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <a
            href={`tel:${phone1}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs sm:text-sm font-bold transition-all"
          >
            <Phone className="w-4 h-4 text-[#D6B36A]" />
            <span>Order Enquiry: {phone1.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-300 pt-8 border-t border-white/10 w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
            <span>100% Licensed Green Crackers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#D6B36A]">⚡</span>
            <span>Direct Factory Wholesale Pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#B91C35]">📦</span>
            <span>Store Pickup & Tamil Nadu Parcel Transport</span>
          </div>
        </div>
      </div>
    </section>
  )
}
