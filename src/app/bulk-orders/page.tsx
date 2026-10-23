import { getSettings } from '@/lib/settings'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFab from '@/components/WhatsAppFab'
import { Sparkles, Phone, MessageSquare, ShieldCheck, Truck, Users, Gift, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bulk & Wedding Crackers - Aachi Pattasu Kadai',
  description: 'Special wholesale rates for weddings, temple festivals, and corporate gifting. Sourced directly from Sivakasi.',
}

export default async function BulkOrdersPage() {
  const settings = await getSettings()
  const rawPhone = settings.phone1 || '9500565391'
  const cleanPhone = rawPhone.replace(/\D/g, '').slice(-10) || '9500565391'
  const displayPhone = `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
  const whatsappNumber = settings.whatsapp || `91${cleanPhone}`

  return (
    <main className="min-h-screen bg-[#FAF8F4] flex flex-col">
      <Header settings={settings} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#06222f] to-[#0b3a52] text-white pt-44 sm:pt-52 pb-16 sm:pb-24 border-b border-[#0b3a52]">
        <div className="site-container text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFB300] text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHOLESALE & CELEBRATION PACKS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Bulk & Wedding <span className="text-[#FFB300]">Orders</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed sm:leading-loose mb-10 max-w-2xl mx-auto">
            Planning a grand wedding sangeet, temple festival, apartment community event, or corporate festival gifting? Get direct-from-factory wholesale rates with GST compliance and doorstep delivery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Aachi Pattasu Kadai, I would like to get a custom bulk/wedding quotation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber text-base w-full sm:w-auto shadow-lg"
            >
              <MessageSquare className="w-5 h-5 text-slate-900" />
              <span>WhatsApp Us ({displayPhone})</span>
            </a>

            <a
              href={`tel:+91${cleanPhone}`}
              className="btn-outline-white text-base w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 text-[#FFB300]" />
              <span>Call Team ({displayPhone})</span>
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-[#FAF8F4] border-b border-[#EAE5DC]">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="section-eyebrow">WHY CHOOSE AACHI FOR BULK</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Designed For High-Volume Celebrations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-3xl p-8 border border-[#EAE5DC] shadow-xs hover:border-[#FFB300] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#0F172A] text-lg mb-2">Dedicated Road Logistics</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direct dispatch from Sivakasi to your location or transport hub with transit insurance and moisture-proof packaging.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#EAE5DC] shadow-xs hover:border-[#FFB300] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#0F172A] text-lg mb-2">Customized Gift Hampers</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Personalized branding, company logo stickers, and customized item selections suited for your budget and employees.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#EAE5DC] shadow-xs hover:border-[#FFB300] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#0F172A] text-lg mb-2">Official B2B GST Invoicing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                100% legal compliance with official input tax credit (ITC) eligible GST invoices for corporate accounting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
      <WhatsAppFab settings={settings} />
    </main>
  )
}
