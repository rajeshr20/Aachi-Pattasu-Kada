'use client'

import Link from 'next/link'
import { Sparkles, ShieldCheck, Truck, Receipt, Sparkle, Phone, MapPin, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface FooterProps {
  settings?: Record<string, string>
}

export default function Footer({ settings = {} }: FooterProps) {
  const { locale } = useLanguage()

  const shopName =
    locale === 'ta'
      ? settings.shop_name_ta || 'ஆச்சி பட்டாசு கடை'
      : settings.shop_name || 'Aachi Pattasu Kadai'

  const phone1 = settings.phone1 || '9500565391'
  const phone2 = settings.phone2 || '7708632966'
  const whatsapp = settings.whatsapp || '919500565391'
  const address =
    locale === 'ta'
      ? settings.location_ta || 'ஆச்சிமெஸ் எதிரில், பெருமாநல்லூர், திருப்பூர் — 641666'
      : settings.location || 'Opposite Aachi Mess, Perumanallur, Tirupur — 641666'

  const legalNotice =
    settings.legal_notice ||
    'Online sale of firecrackers with instant payment is restricted in India. This website operates as an order-request catalogue. Orders are confirmed over phone or WhatsApp within 24 hours. Payments are accepted only after personal verification.'

  return (
    <footer className="w-full bg-[#041720] text-white">
      {/* 1. Trust Strip */}
      <div className="border-y border-white/10 bg-[#06222f]/60 py-8">
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FFB300] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xs sm:text-sm text-white block">
                  {locale === 'ta' ? 'PESO சான்றிதழ்' : 'PESO Licensed'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {locale === 'ta' ? 'அரசு அனுமதி பெற்றது' : 'Govt. of India approved'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FFB300] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xs sm:text-sm text-white block">
                  {locale === 'ta' ? '2026 புதிய சரக்கு' : 'Fresh 2026 Stock'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {locale === 'ta' ? 'நேரடி சிவகாசி தரம்' : 'Direct Sivakasi quality'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FFB300] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xs sm:text-sm text-white block">
                  {locale === 'ta' ? 'பாதுகாப்பான பார்சல்' : 'Licensed Logistics'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {locale === 'ta' ? 'அனைத்து நகரங்களுக்கும்' : 'Tracked road transport'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FFB300] shrink-0">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xs sm:text-sm text-white block">
                  {locale === 'ta' ? 'GST ரசீது வசதி' : 'Direct Invoicing'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {locale === 'ta' ? 'B2B & B2C வெளிப்படை' : 'B2B & B2C transparent'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Columns */}
      <div className="site-container py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06222f] to-[#0b3a52] border border-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FFB300]" />
              </div>
              <div>
                <span className="font-black text-white text-lg tracking-tight block">
                  {shopName}
                </span>
                <span className="text-xs text-[#FFB300] font-semibold block">
                  {locale === 'ta' ? 'சிவகாசி நேரடி பட்டாசு' : 'Sivakasi Direct Crackers'}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {locale === 'ta'
                ? 'பெருமாநல்லூர் ஆச்சிமெஸ் எதிரில் அமைந்துள்ள உங்கள் நம்பகமான சிவகாசி பட்டாசு கடை. பாதுகாப்பான பசுமைப் பட்டாசுகள் மற்றும் நேரடி மொத்த விலை.'
                : 'Premium Sivakasi Fireworks opposite Aachi Mess, Perumanallur. Bringing safe, high-bursting fireworks, flower pots, and family gift boxes to brighten your celebrations.'}
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi Aachi Pattasu Kadai!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{locale === 'ta' ? 'வாட்ஸ்அப் உதவி' : 'Chat on WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Shop Links (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              {locale === 'ta' ? 'பட்டாசு ரகங்கள்' : 'SHOP'}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/catalogue" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'அனைத்து பட்டாசுகள்' : 'All Crackers'}
                </Link>
              </li>
              <li>
                <Link href="/catalogue?category=sparklers" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'கம்பி மத்தாப்பு' : 'Sparklers & Twinklers'}
                </Link>
              </li>
              <li>
                <Link href="/catalogue?category=flower-pots" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'பூந்தொட்டி & பவுண்டன்' : 'Flower Pots & Fountains'}
                </Link>
              </li>
              <li>
                <Link href="/catalogue?category=ground-chakkars" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'தரை சக்கரம்' : 'Ground Chakkars'}
                </Link>
              </li>
              <li>
                <Link href="/catalogue?category=aerial-shots" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'வான்வேடிக்கை ரகங்கள்' : 'Aerial Repeaters'}
                </Link>
              </li>
              <li>
                <Link href="/catalogue?category=gift-boxes" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'தீபாவளி பரிசு பெட்டிகள்' : 'Diwali Gift Boxes'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              {locale === 'ta' ? 'தகவல்கள்' : 'COMPANY'}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'உதவி & கேள்விகள்' : 'Help & FAQ'}
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'மொத்த ஆர்டர்கள்' : 'Bulk Orders'}
                </Link>
              </li>
              <li>
                <Link href="/price-list" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'விலைப்பட்டியல்' : 'Price List'}
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'ஆர்டர் நிலை' : 'Track Order'}
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white transition-colors">
                  {locale === 'ta' ? 'பாதுகாப்பு குறிப்புகள்' : 'Safety Guide'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              {locale === 'ta' ? 'தொடர்புக்கு' : 'CONTACT'}
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFB300] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFB300] shrink-0" />
                <a href={`tel:+91${phone1}`} className="hover:text-white transition-colors">
                  Shop: +91 {phone1}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFB300] shrink-0" />
                <a href={`tel:+91${phone2}`} className="hover:text-white transition-colors">
                  Alt: +91 {phone2}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Legal Notice & Copyright */}
        <div className="mt-14 pt-8 border-t border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="max-w-2xl leading-relaxed text-[11px]">
            {legalNotice}
          </p>
          <div className="shrink-0 text-slate-400 text-xs">
            © {new Date().getFullYear()} {shopName}. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  )
}
