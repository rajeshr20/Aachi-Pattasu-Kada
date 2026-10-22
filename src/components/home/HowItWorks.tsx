'use client'

import { ShoppingBag, FileCheck, Truck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function HowItWorks() {
  const { locale } = useLanguage()

  const steps = [
    {
      num: '01',
      icon: Sparkles,
      title: locale === 'ta' ? 'பட்டியலை தேர்ந்தெடுக்கவும்' : 'Browse the catalogue',
      desc:
        locale === 'ta'
          ? 'வானவேடிக்கை, தரை சக்கரம், பூந்தொட்டி, பரிசு பெட்டிகள் உள்ளிட்ட அனைத்து ரகங்களையும் எளிதாக தேர்வு செய்து கார்ட்டில் சேர்க்கவும்.'
          : '500+ items across aerial, ground, sparklers, gift boxes and family bundles. Filter by occasion or budget.',
    },
    {
      num: '02',
      icon: FileCheck,
      title: locale === 'ta' ? 'ஆர்டர் கோரிக்கை சமர்ப்பிக்கவும்' : 'Place your order',
      desc:
        locale === 'ta'
          ? 'கார்ட்டில் பொருட்களை சேர்த்து, தள்ளுபடி கூப்பனைப் பயன்படுத்தி, முன்பணம் ஏதுமின்றி ஆர்டர் கோரிக்கையை பதிவு செய்யவும்.'
          : 'Add to cart, apply your coupon, request a GST invoice and check out as a guest. No account needed.',
    },
    {
      num: '03',
      icon: Truck,
      title: locale === 'ta' ? 'வீட்டில் கொண்டாடுங்கள்' : 'Celebrate at home',
      desc:
        locale === 'ta'
          ? 'எங்கள் குழுவினர் 24 மணி நேரத்திற்குள் அழைத்து ஆர்டரை உறுதி செய்வார்கள். பாதுகாப்பான போக்குவரத்து மூலம் உங்கள் இல்லம் வந்து சேரும்.'
          : 'Our team confirms by phone within 24 hours. Licensed logistics deliver safely to your doorstep or transport hub.',
    },
  ]

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF8F4] border-b border-[#EAE5DC]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="section-eyebrow">
            {locale === 'ta' ? 'எளிதான 3 படிகள்' : 'SIMPLE & SAFE'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-1">
            {locale === 'ta' ? 'ஆர்டர் செய்யும் முறை' : 'How it works'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            {locale === 'ta'
              ? 'இந்திய சட்ட விதிகளுக்கு உட்பட்டு, வெளிப்படையான முறையில் உங்கள் பட்டாசு முன்பதிவு செய்யப்படுகிறது.'
              : 'Online crackers sale is enquiry-based in India. We make booking your festival fireworks simple and transparent.'}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white border border-[#EAE5DC] rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden"
            >
              {/* Giant soft watermark number */}
              <span className="absolute -top-3 -right-2 font-black text-7xl sm:text-8xl text-slate-100 select-none pointer-events-none group-hover:text-amber-50 transition-colors">
                {step.num}
              </span>

              <div className="relative z-10">
                {/* Icon box */}
                <div className="w-12 h-12 rounded-2xl bg-[#06222f] text-[#FFB300] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                  <step.icon className="w-6 h-6" />
                </div>

                <h3 className="font-extrabold text-[#0F172A] text-lg sm:text-xl mb-2.5">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="relative z-10 pt-5 mt-5 border-t border-[#FAF8F4] flex items-center text-xs font-bold text-[#0B6E99]">
                <span>Step {step.num}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
