import { Factory, ShieldCheck, PackageCheck, Headphones, Gift, Truck } from 'lucide-react'

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Factory,
      title: 'Factory Direct Wholesale Prices',
      desc: 'Zero middlemen markup. Genuine Sivakasi manufactured fireworks delivered directly with up to 80% discount on standard MRP.',
    },
    {
      icon: ShieldCheck,
      title: '100% Legal & Green Certified',
      desc: 'Every cracker is manufactured under stringent safety norms with approved chemical formulations and QR code verification.',
    },
    {
      icon: PackageCheck,
      title: 'Moisture-Proof Safe Packaging',
      desc: 'Double-walled corrugated packing boxes with internal shock cushioning ensure your fireworks arrive in immaculate condition.',
    },
    {
      icon: Headphones,
      title: 'Instant Phone & WhatsApp Assistance',
      desc: 'Our dedicated customer service team is reachable 7 days a week to guide you with selections and order confirmation.',
    },
    {
      icon: Gift,
      title: 'Exclusive Diwali Mega Gift Hampers',
      desc: 'Thoughtfully curated assorted boxes containing ground chakkars, pots, sparklers, and repeaters for every budget.',
    },
    {
      icon: Truck,
      title: 'Direct Store Pickup & Transport Parcel',
      desc: 'Pickup directly at our landmark shop in Perumanallur (Opposite Aachi Mess) or reliable parcel delivery across Tamil Nadu.',
    },
  ]

  return (
    <section className="w-full py-20 sm:py-28 bg-[#FFF9F0] border-t border-[#EADBCA]">
      <div className="site-container">
        {/* Section Header with 32-40px spacing */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#B91C35] font-black bg-[#B91C35]/10 px-4 py-1.5 rounded-full border border-[#B91C35]/20">
            The Aachi Crackers Difference
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#10172A] tracking-tight mt-4 mb-4">
            Why Thousands Choose Us Every Diwali
          </h2>
          <p className="text-[#647084] text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
            Experience reliable service, certified green safety, and authentic factory-direct fireworks from Sivakasi right here in Perumanallur.
          </p>
        </div>

        {/* Reasons Grid with 24-28px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-[#FFFFFF] border border-[#EADBCA] rounded-2xl p-6 sm:p-8 hover:border-[#D6B36A] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 group text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFF9F0] border border-[#EADBCA] text-[#B91C35] flex items-center justify-center mb-6 group-hover:bg-[#B91C35] group-hover:text-white transition-colors">
                <r.icon className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#10172A] text-lg mb-2.5 group-hover:text-[#B91C35] transition-colors">
                {r.title}
              </h3>
              <p className="text-[#647084] text-sm leading-relaxed font-normal">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
