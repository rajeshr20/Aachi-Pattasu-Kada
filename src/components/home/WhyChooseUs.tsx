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
    <section className="w-full py-20 sm:py-28 bg-[#0D1020] border-y border-white/5 relative overflow-hidden">
      <div className="site-container relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest text-[#F5A623] font-black bg-[#F5A623]/10 px-4 py-1.5 rounded-full border border-[#F5A623]/30">
            The Aachi Crackers Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4 mb-4">
            Why Thousands Choose Us Every Diwali
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Experience reliable service, certified safety, and unmatched wholesale fireworks prices right here in Perumanallur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-[#121626] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-[#F5A623]/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 text-[#F5A623] flex items-center justify-center mb-5 group-hover:bg-[#F5A623] group-hover:text-[#0B0D1A] transition-colors">
                <r.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base mb-2 group-hover:text-[#F5A623] transition-colors">
                {r.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
