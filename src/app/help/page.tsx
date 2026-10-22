import { getSettings } from '@/lib/settings'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFab from '@/components/WhatsAppFab'
import FAQSection from '@/components/home/FAQSection'
import { Sparkles, Phone, MessageSquare, MapPin, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help & FAQ - Aachi Pattasu Kadai',
  description: 'Common questions, order process, store location, and customer support for Aachi Pattasu Kadai, Perumanallur.',
}

export default async function HelpPage() {
  const settings = await getSettings()
  const phone1 = settings.phone1 || '9500565391'
  const phone2 = settings.phone2 || '7708632966'
  const whatsapp = settings.whatsapp || '919500565391'
  const address = settings.location || 'Opposite Aachi Mess, Perumanallur, Tirupur — 641666'

  return (
    <main className="min-h-screen bg-[#FAF8F4] flex flex-col">
      <Header settings={settings} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#06222f] to-[#0b3a52] text-white pt-44 sm:pt-52 pb-16 sm:pb-24 border-b border-[#0b3a52]">
        <div className="site-container text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFB300] text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CUSTOMER SUPPORT & ASSISTANCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            How Can We <span className="text-[#FFB300]">Help You?</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed mb-8">
            Have questions about placing an order, transport logistics, payment procedures, or product recommendations? Our friendly team in Perumanallur is ready to assist you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi Aachi Pattasu Kadai, I need help with my cracker order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber text-base w-full sm:w-auto"
            >
              <MessageSquare className="w-5 h-5 text-slate-900" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`tel:+91${phone1}`}
              className="btn-outline-white text-base w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 text-[#FFB300]" />
              <span>Call: {phone1}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-white border-b border-[#EAE5DC]">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#EAE5DC] flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#0B6E99] shrink-0 mt-1" />
              <div>
                <h3 className="font-extrabold text-[#0F172A] text-sm mb-1">Store Address</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{address}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#EAE5DC] flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#FFB300] shrink-0 mt-1" />
              <div>
                <h3 className="font-extrabold text-[#0F172A] text-sm mb-1">Phone Lines</h3>
                <p className="text-xs text-slate-600">Primary: +91 {phone1}</p>
                <p className="text-xs text-slate-600">Alternate: +91 {phone2}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#EAE5DC] flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#16A34A] shrink-0 mt-1" />
              <div>
                <h3 className="font-extrabold text-[#0F172A] text-sm mb-1">Operating Hours</h3>
                <p className="text-xs text-slate-600">9:00 AM – 9:00 PM</p>
                <p className="text-[11px] text-emerald-700 font-bold">Open all 7 days during festival season</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FAQSection />

      <Footer settings={settings} />
      <WhatsAppFab settings={settings} />
    </main>
  )
}
