import Link from 'next/link'
import { Phone, MapPin, Flame, ShieldAlert, ArrowUpRight } from 'lucide-react'

interface FooterProps {
  settings: Record<string, string>
}

export default function Footer({ settings }: FooterProps) {
  const phone1 = settings.phone1 || '9500565391'
  const phone2 = settings.phone2 || '7708632966'
  const address = settings.address || 'Opposite Aachi Mess, Perumanallur, Tirupur, Tamil Nadu'
  const legalNotice =
    settings.legal_notice ||
    'Online sale of fireworks is regulated in India. This website accepts quotation and booking requests only. Orders are confirmed over phone or WhatsApp. No payments are collected online.'

  return (
    <footer className="w-full bg-[#070913] border-t border-white/10 pt-16 pb-24 lg:pb-14">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#C0392B] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block">
                  Aachi Crackers
                </span>
                <span className="text-[#F5A623] text-xs font-semibold uppercase tracking-wider block">
                  Perumanallur
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted Sivakasi fireworks partner in Perumanallur. Providing authentic, licensed Green Crackers at wholesale factory direct rates for Diwali celebrations.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home Page' },
                { href: '/products', label: 'Shop Crackers' },
                { href: '/price-list', label: 'Complete Rate Card (PDF)' },
                { href: '/track', label: 'Track Order Status' },
                { href: '/safety', label: 'Safety Guidelines' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Store & Contacts
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5 text-gray-400">
                <MapPin className="w-4 h-4 text-[#C0392B] shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-400">
                <Phone className="w-4 h-4 text-[#2ECC71] shrink-0" />
                <a href={`tel:${phone1}`} className="hover:text-white transition-colors">
                  Order: {phone1.replace(/(\d{5})(\d{5})/, '$1 $2')}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-gray-400">
                <Phone className="w-4 h-4 text-[#2ECC71] shrink-0" />
                <a href={`tel:${phone2}`} className="hover:text-white transition-colors">
                  Alt: {phone2.replace(/(\d{5})(\d{5})/, '$1 $2')}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/91${phone1}?text=${encodeURIComponent('Hi! I want to enquire about firecrackers from Aachi Crackers.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/30 transition-colors"
                >
                  WhatsApp Order Help
                </a>
              </div>
            </div>
          </div>

          {/* Shop Timings & Admin */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Business Hours
            </h3>
            <div className="bg-[#121626] border border-white/10 rounded-xl p-4 space-y-2 mb-4">
              <p className="text-white font-bold text-sm">9:00 AM – 9:00 PM</p>
              <p className="text-xs text-[#2ECC71] font-semibold">Open All 7 Days during season</p>
            </div>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <span>Store Staff / Admin Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Statutory Regulatory Notice */}
        <div className="border-t border-white/10 pt-6 mb-8">
          <div className="bg-[#C0392B]/10 border border-[#C0392B]/30 rounded-2xl p-5 flex items-start gap-3.5">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-400 leading-relaxed space-y-1">
              <strong className="text-white block font-semibold">
                Statutory Compliance & Legal Disclaimer
              </strong>
              <p>{legalNotice}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 pt-4 border-t border-white/5">
          <p>© 2026 Aachi Crackers, Perumanallur. All Rights Reserved.</p>
          <p className="text-gray-400">Celebrating Diwali with Safety, Light & Joy 🎆</p>
        </div>
      </div>
    </footer>
  )
}
