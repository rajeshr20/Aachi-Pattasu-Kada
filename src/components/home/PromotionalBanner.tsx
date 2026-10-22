'use client'

import { MessageSquare, PhoneCall } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface BulkEventsCTAProps {
  settings?: Record<string, string>
}

export default function PromotionalBanner({ settings = {} }: BulkEventsCTAProps) {
  const { locale } = useLanguage()

  const phone1 = settings.phone1 || '9500565391'
  const whatsapp = settings.whatsapp || '919500565391'

  return (
    <section className="w-full py-16 sm:py-20 bg-gradient-to-r from-[#06222f] via-[#093246] to-[#0b3a52] text-white">
      <div className="site-container">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10">
          
          {/* Left Text */}
          <div className="max-w-2xl">
            <span className="text-[#FFB300] text-xs font-black uppercase tracking-widest block mb-2">
              {locale === 'ta' ? 'திருமணம், திருவிழா & பெரு நிறுவனங்கள்' : 'FOR WEDDINGS, EVENTS & CORPORATES'}
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {locale === 'ta' ? 'மொத்தமாக வாங்க திட்டமிடுகிறீர்களா?' : 'Planning something big?'}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              {locale === 'ta'
                ? 'திருமண வரவேற்பு, கோவில் திருவிழாக்கள் அல்லது நிறுவன விழாக்களுக்கு தனிப்பயன் பேக்குகள் மற்றும் பிரத்யேக மொத்த விலை வழங்குகிறோம்.'
                : 'Wedding sangeet, temple festival, corporate gifting or a community celebration — our bulk team will design a custom pack and price for you.'}
            </p>

            <p className="text-xs text-amber-300/80 font-semibold tracking-wide">
              {locale === 'ta'
                ? 'நேரடி மொத்த விலை · ஜிஎஸ்டி பில் · பாதுகாப்பான பார்சல் டெலிவரி'
                : 'Wholesale rates auto-applied · GST B2B invoices · Doorstep delivery'}
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                'Hi Aachi Pattasu Kadai, I would like to get a quote for a bulk/wedding cracker order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber text-sm sm:text-base justify-center shadow-lg"
            >
              <MessageSquare className="w-4 h-4 text-slate-900" />
              <span>{locale === 'ta' ? 'வாட்ஸ்அப் மூலம் பேச' : 'WhatsApp us'}</span>
            </a>

            <a
              href={`tel:+91${phone1}`}
              className="btn-outline-white text-sm sm:text-base justify-center"
            >
              <PhoneCall className="w-4 h-4 text-[#FFB300]" />
              <span>{locale === 'ta' ? `அழைக்க (${phone1})` : `Call our team (${phone1})`}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
