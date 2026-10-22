'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Phone, ChevronRight, Sparkles, ShieldCheck, ArrowRight, FileText, CheckCircle2, Factory, Flame, Award } from 'lucide-react'

const FireworkCanvas = dynamic(() => import('../FireworkCanvas'), { ssr: false })

interface HeroProps {
  settings: Record<string, string>
}

export default function HeroSection({ settings }: HeroProps) {
  const phone1 = settings.phone1 || '9500565391'
  const address = settings.address || 'Opposite Aachi Mess, Perumanallur, Tirupur'

  const highlights = [
    {
      icon: ShieldCheck,
      title: '100% Certified',
      subtitle: 'CSIR-NEERI Green Crackers',
    },
    {
      icon: Factory,
      title: 'Factory Direct',
      subtitle: 'Direct from Sivakasi',
    },
    {
      icon: Flame,
      title: '50+ Varieties',
      subtitle: 'Sparklers to Mega Aerials',
    },
    {
      icon: Award,
      title: 'Zero Brokerage',
      subtitle: 'Direct Wholesale Pricing',
    },
  ]

  return (
    <section className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-28 bg-[#10172A] border-b border-white/5">
      {/* Cinematic Ambient Canvas */}
      <FireworkCanvas />

      {/* Elegant Radial Glow & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,179,106,0.15)_0%,rgba(16,23,42,0.85)_55%,#10172A_100%)] pointer-events-none" />

      <div className="relative z-10 site-container text-center flex flex-col items-center">
        
        {/* Subtle Gold Pill Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[#D6B36A] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#D6B36A]" />
          <span>SIVAKASI DIRECT WHOLESALE CRACKERS</span>
        </div>

        {/* Grand Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] mb-6 max-w-4xl">
          Light Up Every <span className="text-gold-gradient">Celebration</span>
        </h1>

        {/* Clean, Spacious Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
          Direct-from-factory Sivakasi green crackers at transparent wholesale prices. Safe, certified, and delivered to your doorstep with guaranteed family joy.
        </p>

        {/* Action Buttons: Spacious Crimson Primary + Clean Gold Outline */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-md mx-auto sm:max-w-none">
          <Link
            href="/products"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#B91C35] hover:bg-[#9E152B] text-white font-bold text-sm sm:text-base shadow-xl shadow-red-950/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span>Browse Crackers Catalogue</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="/price-list"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm sm:text-base border border-white/20 hover:border-[#D6B36A] backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#D6B36A]" />
            <span>Download 2026 Price List</span>
          </Link>
        </div>

        {/* 4-Column Highlights Bar (Rathinam Crackers Pattern) */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/10">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D6B36A]/15 text-[#D6B36A] flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-sm sm:text-base">{item.title}</h3>
                <p className="text-slate-400 text-xs mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
