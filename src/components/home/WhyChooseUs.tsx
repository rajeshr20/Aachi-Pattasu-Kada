'use client'

import { ShieldCheck, Truck, Receipt, HeartHandshake, PhoneCall, Tag } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function WhyChooseUs() {
  const { locale } = useLanguage()

  const promises = [
    {
      icon: ShieldCheck,
      title: locale === 'ta' ? 'உயர் தரம் & பாதுகாப்பு' : 'Premium quality',
      desc:
        locale === 'ta'
          ? 'சிவகாசியின் முன்னணி ஆலைகளில் பரிசோதிக்கப்பட்ட 2026 புதிய சீசன் பட்டாசுகள் மட்டுமே வழங்கப்படும்.'
          : 'Every batch hand-checked at licensed Sivakasi units. Fresh stock for every season — zero leftover inventory.',
    },
    {
      icon: Truck,
      title: locale === 'ta' ? 'பாதுகாப்பான போக்குவரத்து' : 'Safe transport & pickup',
      desc:
        locale === 'ta'
          ? 'அனுமதி பெற்ற பிரத்யேக வாகனங்கள் மூலம் பாதுகாப்பான டெலிவரி மற்றும் பெருமாநல்லூர் கடையில் நேரடி பிக்கப்.'
          : 'Specialised, licensed cracker logistics. Insured transport to your town hub plus easy Perumanallur store pickup.',
    },
    {
      icon: Receipt,
      title: locale === 'ta' ? 'GST & PESO சான்றிதழ்' : 'GST & PESO compliant',
      desc:
        locale === 'ta'
          ? 'அரசு விதிகளுக்கு உட்பட்ட 100% PESO பசுமைப் பட்டாசுகள் மற்றும் முறையான GST ரசீது.'
          : 'Every product 100% PESO-licensed. Every invoice GST-compliant. 100% legal, 100% transparent.',
    },
    {
      icon: HeartHandshake,
      title: locale === 'ta' ? 'நேர்மையான வாடிக்கையாளர் சேவை' : 'Local friendly service',
      desc:
        locale === 'ta'
          ? 'பெருமாநல்லூர் ஆச்சிமெஸ் எதிரில் உள்ள எங்கள் கடையில் உங்கள் குடும்ப கொண்டாட்டத்தை எங்கள் சொந்த விழாவாக கருதுகிறோம்.'
          : 'Locally rooted opposite Aachi Mess, Perumanallur — we treat every customer’s family celebration as our own.',
    },
    {
      icon: PhoneCall,
      title: locale === 'ta' ? '24 மணி நேர உறுதிப்படுத்தல்' : '24-hour human confirmation',
      desc:
        locale === 'ta'
          ? 'ஆர்டர் சமர்ப்பித்தவுடன் எங்கள் ஊழியர்கள் நேரடியாக தொலைபேசியில் தொடர்பு கொண்டு விபரங்களை உறுதி செய்வார்கள்.'
          : 'Real humans call you within 24 hours of every order. No bots, no confusing chatbots — just our friendly team.',
    },
    {
      icon: Tag,
      title: locale === 'ta' ? 'மொத்த விலை சலுகை' : 'Fair wholesale pricing',
      desc:
        locale === 'ta'
          ? 'நேரடி தொழிற்சாலை விலைகள். 10+ எண்ணிக்கைகளுக்கு சிறப்பு மொத்த விலை சலுகைகள் உண்டு. மறைமுக கட்டணங்கள் இல்லை.'
          : 'Direct-from-manufacturer rates. Automatic wholesale tiers applied for 10+ unit orders. No hidden fees.',
    },
  ]

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF8F4] border-b border-[#EAE5DC]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="section-eyebrow">
            {locale === 'ta' ? 'ஆச்சி பட்டாசு கடையின் உறுதிமொழி' : 'THE AACHI PROMISE'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-1">
            {locale === 'ta' ? 'வாடிக்கையாளர்கள் எங்களை விரும்புவதற்கான காரணங்கள்' : 'Why families choose us, year after year'}
          </h2>
        </div>

        {/* 6 Clean Cards in 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {promises.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#EAE5DC] p-6 sm:p-7 shadow-xs hover:border-[#FFB300] hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#FFB300] group-hover:text-slate-900 transition-all">
                <item.icon className="w-5 h-5" />
              </div>

              <h3 className="font-extrabold text-[#0F172A] text-base sm:text-lg mb-2 group-hover:text-[#0B6E99] transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
