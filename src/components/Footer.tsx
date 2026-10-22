import Link from 'next/link'
import { Phone, MapPin, Sparkles, ShieldAlert, ArrowUpRight, Clock } from 'lucide-react'

interface FooterProps {
  settings?: Record<string, string>
}

export default function Footer({ settings = {} }: FooterProps) {
  const phone1 = settings.phone1 || '9500565391'
  const phone2 = settings.phone2 || '7708632966'
  const address = settings.address || 'Opposite Aachi Mess, Perumanallur, Tirupur, Tamil Nadu'
  const legalNotice =
    settings.legal_notice ||
    'Online sale of fireworks is strictly regulated in India. This website accepts quotation and booking requests only. Orders are confirmed over phone or WhatsApp. No payments are collected online.'

  return (
    <footer className="w-full bg-[#10172A] border-t border-white/10 pt-20 pb-28 lg:pb-16 text-white text-left">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B91C35] via-[#10172A] to-[#1E293B] border border-[#D6B36A]/40 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-[#D6B36A]" />
              </div>
              <div>
                <span className="font-black text-white text-lg tracking-tight block">
                  Aachi Crackers
                </span>
                <span className="text-[#D6B36A] text-xs font-bold uppercase tracking-wider block">
                  Perumanallur • Sivakasi Direct
                </span>
              </div>
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              Your authentic Sivakasi firecrackers destination in Perumanallur. Providing genuine, certified Green Crackers at factory wholesale rates for joyful Diwali celebrations.
            </p>
          </div>

          {/* Quick Product Links (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-extrabold text-white text-xs uppercase tracking-widest mb-5 pb-2.5 border-b border-white/10">
              Explore Catalog
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home Page' },
                { href: '/products', label: 'All Firecrackers' },
                { href: '/products?category=gift-boxes', label: 'Diwali Gift Hampers' },
                { href: '/price-list', label: 'Complete Rate Card (PDF)' },
                { href: '/track', label: 'Track Order Status' },
                { href: '/safety', label: 'Safety Guidelines' },
                { href: '/about', label: 'About Our Store' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#D6B36A] text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-extrabold text-white text-xs uppercase tracking-widest mb-5 pb-2.5 border-b border-white/10">
              Store & Contacts
            </h3>
            <div className="space-y-3 text-sm text-[#94A3B8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B91C35] shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6B36A] shrink-0" />
                <a href={`tel:${phone1}`} className="hover:text-white text-xs transition-colors">
                  Primary: {phone1.replace(/(\d{5})(\d{5})/, '$1 $2')}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6B36A] shrink-0" />
                <a href={`tel:${phone2}`} className="hover:text-white text-xs transition-colors">
                  Alternate: {phone2.replace(/(\d{5})(\d{5})/, '$1 $2')}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/91${phone1}?text=${encodeURIComponent('Hi! I want to enquire about firecrackers from Aachi Crackers.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/30 transition-colors"
                >
                  WhatsApp Quick Assistance
                </a>
              </div>
            </div>
          </div>

          {/* Business Timings & Admin (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-extrabold text-white text-xs uppercase tracking-widest mb-5 pb-2.5 border-b border-white/10">
              Store Timings
            </h3>
            <div className="bg-[#1E293B]/60 border border-white/10 rounded-xl p-4 space-y-1.5 mb-5 text-left">
              <div className="flex items-center gap-1.5 text-xs text-white font-bold">
                <Clock className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span>9:00 AM – 9:00 PM</span>
              </div>
              <p className="text-[11px] text-[#27AE60] font-semibold">Open All 7 Days during season</p>
            </div>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#D6B36A] transition-colors"
            >
              <span>Store Staff Admin Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Regulatory Statutory Compliance Box */}
        <div className="border-t border-white/10 pt-8 mb-10">
          <div className="bg-[#B91C35]/10 border border-[#B91C35]/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
            <ShieldAlert className="w-5 h-5 text-[#B91C35] shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed space-y-1 text-left">
              <strong className="text-white block font-bold text-sm">
                Statutory Compliance & Legal Disclaimer
              </strong>
              <p>{legalNotice}</p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 pt-6 border-t border-white/5">
          <p>© 2026 Aachi Crackers, Perumanallur. All Rights Reserved.</p>
          <p className="text-gray-400">Celebrating Diwali with Safety, Light & Family Joy 🎆</p>
        </div>
      </div>
    </footer>
  )
}
