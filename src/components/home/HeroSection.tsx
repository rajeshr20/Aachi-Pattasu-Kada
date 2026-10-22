'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface HeroProps {
  settings: Record<string, string>
}

// Gentle twinkling coordinates (respects prefers-reduced-motion in CSS)
const TWINKLE_STARS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: `${((i * 37 + 13) % 94) + 3}%`,
  top: `${((i * 29 + 17) % 85) + 5}%`,
  delay: `${(((i * 17) % 30) / 10).toFixed(1)}s`,
  duration: `${(2.2 + ((i * 11) % 20) / 10).toFixed(1)}s`,
}))

export default function HeroSection({ settings }: HeroProps) {
  const { locale, t } = useLanguage()

  const shopName =
    locale === 'ta'
      ? settings.shop_name_ta || 'ஆச்சி பட்டாசு கடை'
      : settings.shop_name || 'Aachi Pattasu Kadai'

  const subtitle =
    locale === 'ta'
      ? settings.hero_subtitle_ta || 'சிவகாசியிலிருந்து நேரடியாக தொழிற்சாலை மொத்த விலையில் பாதுகாப்பான, தரமான பசுமைப் பட்டாசுகள்.'
      : settings.hero_subtitle || 'Direct-from-factory Sivakasi green crackers at transparent wholesale prices. Safe, certified, and delivered to your doorstep.'

  const whatsapp = settings.whatsapp || '919500565391'

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-navy-teal text-white border-b border-[#0b3a52]/50">
      {/* CSS Twinkling Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {TWINKLE_STARS.map((star) => (
          <div
            key={star.id}
            className="star-dot"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 site-container text-center flex flex-col items-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFB300] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('hero.badge', '★ SIVAKASI DIRECT WHOLESALE CRACKERS ★')}</span>
        </div>

        {/* Big Bold Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] mb-6 max-w-4xl">
          {locale === 'ta' ? (
            <>
              <span className="text-[#FFB300]">{shopName}</span>{' '}
              <span>உடன் கொண்டாடுங்கள்</span>
            </>
          ) : (
            <>
              <span>Celebrate with</span>{' '}
              <span className="text-[#FFB300]">{shopName}</span>
            </>
          )}
        </h1>

        {/* Short Subtitle */}
        <p className="text-base sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        {/* Action Buttons: Amber Primary + Outlined WhatsApp */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none">
          <Link href="/catalogue" className="btn-amber w-full sm:w-auto text-base">
            <span>{t('hero.shop_now', 'Shop the collection →')}</span>
          </Link>

          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi Aachi Pattasu Kadai, I would like to inquire about Bulk & Wedding cracker orders.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white w-full sm:w-auto text-base"
          >
            <MessageSquare className="w-4 h-4 text-[#16A34A]" />
            <span>{t('hero.bulk_weddings', 'Bulk & Weddings')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
