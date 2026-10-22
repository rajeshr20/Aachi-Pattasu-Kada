import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Sparkles, Phone, Award, Shield, HeartHandshake, MapPin } from 'lucide-react'
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
      desc: 'We source directly from licensed, accredited manufacturers in Sivakasi with stringent quality and safety standards.',
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
    <div className="min-h-screen bg-[#FFF9F0] text-[#10172A] flex flex-col">
      <Header />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        {/* Hero Banner (Midnight Navy) */}
        <div className="bg-[#10172A] text-white py-14 sm:py-20 border-b border-[#D6B36A]/20 relative overflow-hidden">
          <div className="site-container text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-black bg-[#D6B36A]/10 px-4 py-1.5 rounded-full border border-[#D6B36A]/30 inline-block mb-4">
              Our Story & Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
              About <span className="text-gold-gradient">Aachi Crackers</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              Bringing light, celebration, and authentic Sivakasi fireworks to families across Perumanallur, Tirupur, and Tamil Nadu.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="site-container pt-12 sm:pt-16">
          <div className="bg-[#FFFFFF] border border-[#EADBCA] rounded-2xl p-6 sm:p-10 mb-12 shadow-sm space-y-6 text-left">
            <div className="flex items-center gap-3 text-[#B91C35]">
              <Sparkles className="w-6 h-6 text-[#D6B36A]" />
              <h2 className="text-2xl sm:text-3xl font-black text-[#10172A] tracking-tight">
                Our Heritage & Customer Commitment
              </h2>
            </div>
            <p className="text-[#647084] leading-relaxed text-sm sm:text-base font-normal">
              Located conveniently opposite the landmark <strong className="text-[#10172A]">Aachi Mess on the Perumanallur main junction</strong>, Aachi Crackers was established to make premium, safe, and authentic Sivakasi firecrackers accessible directly at wholesale factory rates.
            </p>
            <p className="text-[#647084] leading-relaxed text-sm sm:text-base font-normal">
              For generations, Diwali has been an emotion — the aroma of ground chakkars, the thrill of aerial flower pots, and the sparkle of twinklers in children’s hands. We take pride in supplying tested, certified green crackers that produce vibrant colors with strict noise and emission compliance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#EADBCA]/70 text-center">
              <div className="p-5 bg-[#FFF9F0] rounded-xl border border-[#EADBCA]">
                <div className="text-3xl sm:text-4xl font-black text-[#10172A]">100%</div>
                <div className="text-xs text-[#647084] font-bold mt-1 uppercase tracking-wider">
                  Authentic Sivakasi Stock
                </div>
              </div>
              <div className="p-5 bg-[#FFF9F0] rounded-xl border border-[#EADBCA]">
                <div className="text-3xl sm:text-4xl font-black text-[#27AE60]">80%</div>
                <div className="text-xs text-[#647084] font-bold mt-1 uppercase tracking-wider">
                  Direct Factory Discount
                </div>
              </div>
              <div className="p-5 bg-[#FFF9F0] rounded-xl border border-[#EADBCA]">
                <div className="text-3xl sm:text-4xl font-black text-[#B91C35]">PESO</div>
                <div className="text-xs text-[#647084] font-bold mt-1 uppercase tracking-wider">
                  Green Cracker Certified
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mb-14">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-[#FFFFFF] border border-[#EADBCA] rounded-2xl p-7 hover:border-[#D6B36A] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFF9F0] border border-[#EADBCA] text-[#B91C35] flex items-center justify-center mb-5">
                  <h.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-[#10172A] mb-2">{h.title}</h3>
                <p className="text-xs sm:text-sm text-[#647084] leading-relaxed font-normal">{h.desc}</p>
              </div>
            ))}
          </div>

          {/* Visit Us CTA Banner */}
          <div className="bg-[#10172A] text-white border border-[#D6B36A]/30 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-black bg-[#D6B36A]/10 px-4 py-1.5 rounded-full border border-[#D6B36A]/30 inline-block mb-1">
                Landmark Store
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white">Visit Our Shop in Perumanallur</h3>
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                Opposite Aachi Mess, Perumanallur, Tirupur District. Open 9:00 AM to 9:00 PM daily during the festive season.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/products"
                  className="px-7 py-3.5 rounded-xl bg-[#B91C35] hover:bg-[#9E152B] text-white font-extrabold text-sm shadow-lg shadow-red-950/40 hover:-translate-y-0.5 transition-all"
                >
                  Browse Products & Order
                </Link>
                <a
                  href="tel:9500565391"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D6B36A]" />
                  <span>Call 95005 65391</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
