import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Sparkles, Phone, Award, Shield, HeartHandshake } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'About Us | Aachi Crackers Perumanallur',
  description: 'Learn about Aachi Crackers in Perumanallur, our commitment to factory-direct genuine Sivakasi crackers, safety and customer trust.',
}

export default function AboutPage() {
  const highlights = [
    {
      icon: Award,
      title: 'Genuine Sivakasi Crackers',
      desc: 'We source directly from licensed, certified manufacturers in Sivakasi with stringent quality and safety standards.',
    },
    {
      icon: Shield,
      title: '100% Legal & Green Certified',
      desc: 'All crackers comply with Supreme Court and PESO safety norms with lower emissions and authentic QR verification.',
    },
    {
      icon: HeartHandshake,
      title: 'Direct Factory Prices',
      desc: 'Zero middlemen margins. We pass on direct factory savings with up to 80% discount off standard retail MRP.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0B0D1A] text-white flex flex-col">
      <Header />

      <main className="flex-1 pb-16 px-4 sm:px-6 max-w-5xl mx-auto w-full" style={{ paddingTop: '120px' }}>
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#F5A623] font-semibold bg-[#F5A623]/10 px-3 py-1 rounded-full border border-[#F5A623]/20">
            Our Story & Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            Aachi Crackers — <span className="text-[#F5A623]">Perumanallur</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bringing light, joy, and the authentic sound of Diwali celebrations to thousands of happy families across Tirupur and Tamil Nadu.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 sm:p-10 mb-12 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 text-[#F5A623]">
            <Sparkles className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Our Heritage & Commitment</h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Located conveniently opposite the landmark <strong>Aachi Mess on the Perumanallur main road</strong>, Aachi Crackers was founded with one clear mission: to make premium, safe, and authentic Sivakasi firecrackers accessible to everyone at genuine wholesale prices.
          </p>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            For generations, Diwali has been an emotion — the aroma of ground chakkars, the thrill of aerial flower pots, the sparkle of twinklers in children’s hands. We take pride in delivering tested, certified green crackers that produce vibrant colors with strict noise and emission compliance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="text-3xl font-black text-[#F5A623]">100%</div>
              <div className="text-xs text-gray-400 mt-1">Authentic Sivakasi Stock</div>
            </div>
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="text-3xl font-black text-[#2ECC71]">80%</div>
              <div className="text-xs text-gray-400 mt-1">Direct Factory Discount</div>
            </div>
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="text-3xl font-black text-[#E74C3C]">15,000+</div>
              <div className="text-xs text-gray-400 mt-1">Happy Families Celebrated</div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((h, i) => (
            <div key={i} className="bg-[#121626] border border-white/10 rounded-2xl p-6 hover:border-[#F5A623]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 text-[#F5A623] flex items-center justify-center mb-4">
                <h.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{h.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Visit us CTA */}
        <div className="bg-gradient-to-r from-[#181D33] via-[#121626] to-[#181D33] border border-[#F5A623]/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Visit Our Shop in Perumanallur</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
            Opposite Aachi Mess, Perumanallur, Tirupur District. Open 9:00 AM to 9:00 PM daily during the festive season.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E67E22] text-[#0B0D1A] font-bold text-sm shadow-lg hover:shadow-orange-500/20 transition-all"
            >
              Browse Products & Order
            </Link>
            <a
              href="tel:9500565391"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#2ECC71]" />
              Call 95005 65391
            </a>
          </div>
        </div>
      </main>

      <Footer settings={{}} />
    </div>
  )
}
