'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function FAQSection() {
  const { locale } = useLanguage()

  const faqs = [
    {
      q:
        locale === 'ta'
          ? 'நான் ஆன்லைனில் உடனே பணம் செலுத்த வேண்டுமா?'
          : 'Do I need to pay online immediately?',
      a:
        locale === 'ta'
          ? 'இல்லை! இந்தியாவில் ஆன்லைனில் நேரடியாக கார்டு மூலம் பணம் செலுத்துவது பட்டாசு வர்த்தக விதிகளின்படி கட்டுப்படுத்தப்பட்டுள்ளது. நீங்கள் கார்ட்டில் பொருட்களைச் சேர்த்து ஆர்டர் கோரிக்கையை பதிவு செய்யலாம். எங்கள் ஊழியர்கள் 24 மணி நேரத்திற்குள் தொலைபேசியில் அழைத்து விபரங்களை உறுதி செய்வார்கள்.'
          : 'No! Firecrackers in India are regulated. You add items to your cart and place an order enquiry. Our team confirms availability and logistics by phone within 24 hours, after which payments are settled securely.',
    },
    {
      q:
        locale === 'ta'
          ? 'ஜிஎஸ்டி (GST) ரசீது கிடைக்குமா?'
          : 'Can I get an official GST invoice?',
      a:
        locale === 'ta'
          ? 'நிச்சயமாக! தனிநபர்கள் மற்றும் நிறுவனங்களுக்கு உரிய B2B மற்றும் B2C அதிகாரப்பூர்வ ஜிஎஸ்டி ரசீது வழங்கப்படுகிறது. செக்-அவுட் பக்கத்தில் உங்கள் ஜிஎஸ்டி எண்ணை உள்ளிடலாம்.'
          : 'Yes, absolutely! We provide 100% compliant B2B and B2C GST invoices. Simply enter your company name and GSTIN during checkout.',
    },
    {
      q:
        locale === 'ta'
          ? 'டெலிவரி எவ்வாறு செய்யப்படுகிறது?'
          : 'How does delivery work across Tamil Nadu?',
      a:
        locale === 'ta'
          ? 'அனுமதி பெற்ற பாதுகாப்பான டிரான்ஸ்போர்ட் பார்சல் மூலம் அனைத்து முக்கிய நகரங்களுக்கும் அனுப்பப்படுகிறது. வாடிக்கையாளர்கள் தங்கள் ஊர் பார்சல் அலுவலகத்தில் பெற்றுக்கொள்ளலாம் அல்லது பெருமாநல்லூர் கடையில் நேரடியாக பெற்றுக்கொள்ளலாம்.'
          : 'We ship via licensed road transport logistics to your nearest town parcel hub. You can collect from the transport office or pick up directly from our Perumanallur store.',
    },
    {
      q:
        locale === 'ta'
          ? 'குறைந்தபட்ச ஆர்டர் தொகை எவ்வளவு?'
          : 'What is the minimum order value?',
      a:
        locale === 'ta'
          ? 'போக்குவரத்து பாதுகாப்பு மற்றும் செலவு சிக்கனத்தை கருத்தில் கொண்டு குறைந்தபட்ச ஆர்டர் தொகை ₹3,000 ஆக நிர்ணயிக்கப்பட்டுள்ளது.'
          : 'Our minimum order requirement is ₹3,000 to ensure cost-effective and safe transporter shipping.',
    },
    {
      q:
        locale === 'ta'
          ? 'மொத்த ஆர்டர்களுக்கு சிறப்பு தள்ளுபடி உண்டா?'
          : 'Is there a discount for bulk orders & weddings?',
      a:
        locale === 'ta'
          ? 'ஆம்! ஏதேனும் ஒரு பட்டாசு ரகத்தை 10 அல்லது அதற்கு மேற்பட்ட எண்ணிக்கையில் வாங்கும்போது சிறப்பு மொத்த விலை தானாகவே பொருந்தும். பெரிய ஆர்டர்களுக்கு வாட்ஸ்அப்பில் எங்களை தொடர்பு கொள்ளவும்.'
          : 'Yes! We auto-apply wholesale tier discounts when you order 10+ units of an item. For large wedding or temple orders, contact us via WhatsApp for custom quotes.',
    },
  ]

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF8F4] border-b border-[#EAE5DC]">
      <div className="site-container-narrow">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="section-eyebrow">
            {locale === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'QUICK ANSWERS'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-1">
            {locale === 'ta' ? 'பொதுவான சந்தேகங்கள் & பதில்கள்' : 'Frequently asked'}
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white border border-[#EAE5DC] rounded-2xl overflow-hidden hover:border-[#FFB300] transition-colors shadow-xs"
            >
              <summary className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 list-none select-none">
                <h3 className="font-extrabold text-[#0F172A] text-sm sm:text-base group-hover:text-[#0B6E99] transition-colors">
                  {faq.q}
                </h3>
                <span className="w-7 h-7 rounded-full bg-[#FAF8F4] border border-[#EAE5DC] flex items-center justify-center text-slate-700 group-open:rotate-45 transition-transform duration-200 text-base font-bold shrink-0">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-[#FAF8F4] pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* See Full FAQ Button */}
        <div className="text-center mt-10">
          <Link
            href="/help"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#EAE5DC] hover:border-[#FFB300] text-xs sm:text-sm font-bold text-[#0F172A] hover:text-[#0B6E99] shadow-xs transition-all"
          >
            <span>{locale === 'ta' ? 'முழுமையான உதவி பக்கம் →' : 'See full Help & FAQ →'}</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
