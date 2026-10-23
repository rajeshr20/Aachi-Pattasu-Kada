'use client'

import { MessageSquare, PhoneCall, CheckCircle, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface BulkEventsCTAProps {
  settings?: Record<string, string>
}

export default function PromotionalBanner({ settings = {} }: BulkEventsCTAProps) {
  const { locale } = useLanguage()

  // Always use the primary shop WhatsApp and phone numbers
  const rawPhone = settings.phone1 || '9500565391'
  const cleanPhone = rawPhone.replace(/\D/g, '').slice(-10) || '9500565391'
  const displayPhone = `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
  const whatsappNumber = settings.whatsapp || `91${cleanPhone}`

  return (
    <section className="w-full relative py-16 sm:py-24 bg-gradient-to-br from-[#0c2f40] via-[#08222f] to-[#04141d] text-white border-y border-white/10 overflow-hidden">
      {/* Subtle Ambient Radial Lights across full screen */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFB300]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0B6E99]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Eyebrow badge centered */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#FFB300] text-xs font-black uppercase tracking-wider mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB300]" />
          <span>
            {locale === 'ta' ? 'திருமணம், திருவிழா & பெரு நிறுவனங்கள்' : 'FOR WEDDINGS, EVENTS & CORPORATES'}
          </span>
        </div>

        {/* Big Bold Heading Centered */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-5">
          {locale === 'ta' ? 'மொத்தமாக வாங்க திட்டமிடுகிறீர்களா?' : 'Planning something big?'}
        </h2>

        {/* Centered Description Paragraphs */}
        <div className="space-y-3.5 text-slate-200 text-sm sm:text-base leading-relaxed sm:leading-loose max-w-2xl mx-auto mb-6">
          <p>
            {locale === 'ta'
              ? 'திருமண வரவேற்பு, கோவில் திருவிழாக்கள் அல்லது நிறுவன விழாக்களுக்கு தனிப்பயன் பேக்குகள் மற்றும் பிரத்யேக நேரடி தொழிற்சாலை மொத்த விலை வழங்குகிறோம்.'
              : 'Wedding sangeet, temple festival, corporate festival gifting, or a community celebration — our wholesale team will design a custom pack and discounted quote suited for your budget.'}
          </p>
          <p className="text-slate-300 text-xs sm:text-sm">
            {locale === 'ta'
              ? '10+ எண்ணிக்கைகளுக்கு நேரடி மொத்த விலை தானாகப் பொருந்தும். உத்தியோகபூர்வ ஜிஎஸ்டி பில் மற்றும் பாதுகாப்பான வாகன போக்குவரத்து வசதி உண்டு.'
              : 'Wholesale factory tiers automatically applied for volume orders. Includes official B2B GST tax invoices and insured transport directly to your town or venue.'}
          </p>
        </div>

        {/* Trust Badges Centered */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-xs font-semibold text-amber-200/90">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
            <CheckCircle className="w-3.5 h-3.5 text-[#FFB300]" />
            {locale === 'ta' ? 'தொழிற்சாலை மொத்த விலை' : 'Wholesale factory rates'}
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
            <CheckCircle className="w-3.5 h-3.5 text-[#FFB300]" />
            {locale === 'ta' ? 'ஜிஎஸ்டி முறையான ரசீது' : 'Official GST invoice'}
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
            <CheckCircle className="w-3.5 h-3.5 text-[#FFB300]" />
            {locale === 'ta' ? 'பாதுகாப்பான போக்குவரத்து' : 'Doorstep road delivery'}
          </span>
        </div>

        {/* Action Buttons Centered */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              'Hi Aachi Pattasu Kadai, I would like to get a custom quote for a bulk/wedding cracker order.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber w-full sm:w-auto text-sm sm:text-base justify-center py-4 px-8 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold"
          >
            <MessageSquare className="w-5 h-5 text-slate-900 shrink-0" />
            <span>
              {locale === 'ta' ? `வாட்ஸ்அப் (${displayPhone})` : `WhatsApp Us (${displayPhone})`}
            </span>
          </a>

          <a
            href={`tel:+91${cleanPhone}`}
            className="btn-outline-white w-full sm:w-auto text-sm sm:text-base justify-center py-4 px-8 hover:bg-white/10 transition-all font-bold"
          >
            <PhoneCall className="w-5 h-5 text-[#FFB300] shrink-0" />
            <span>
              {locale === 'ta' ? `அழைக்க (${displayPhone})` : `Call Us (${displayPhone})`}
            </span>
          </a>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-3">
          {locale === 'ta'
            ? 'காலை 9:00 முதல் இரவு 9:00 வரை உடனடி பதில்'
            : 'Instant reply: 9:00 AM – 9:00 PM (Daily)'}
        </p>

      </div>
    </section>
  )
}
