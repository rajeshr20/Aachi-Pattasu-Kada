'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

export default function PromotionalBanner() {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#10172A] relative overflow-hidden border-y border-white/10">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[450px] bg-[#D6B36A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[#D6B36A] text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diwali 2026 Special Collection</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Curated Diwali <span className="text-gold-gradient">Gift Hampers</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
              Celebrate the festival of lights with our handpicked family assortments. Packed with deluxe ground chakkars, sparkling flower pots, whistling rockets, and repeating aerial shots with up to 80% direct factory savings.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-gray-300 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
                <span>Moisture-Proof Double Packing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D6B36A]">⚡</span>
                <span>Genuine Sivakasi Assortment</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/products?category=gift-boxes"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#B91C35] hover:bg-[#9E152B] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-950/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Gift Hampers</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-black/40">
              <Image
                src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80"
                alt="Diwali Fireworks Gift Hampers"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10172A] via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#10172A]/85 backdrop-blur-md border border-white/15 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#D6B36A] uppercase tracking-wider block">
                      Wholesale Family Hamper
                    </span>
                    <span className="text-white font-bold text-sm block">
                      VIP Royal Assortment Box
                    </span>
                  </div>
                  <span className="text-white font-mono font-black text-lg text-[#27AE60]">
                    From ₹1,250
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
