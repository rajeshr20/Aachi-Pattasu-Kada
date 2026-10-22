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
    <section className="w-full py-16 sm:py-20 bg-[#0E1222] border-y border-white/5">
      <div className="site-container">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-[#F5A623] font-extrabold bg-[#F5A623]/10 px-3.5 py-1.5 rounded-full border border-[#F5A623]/25">
            The Aachi Crackers Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3 mb-3">
            Why Thousands Choose Us Every Diwali
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Experience reliable service, certified safety, and unmatched wholesale fireworks prices right here in Perumanallur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
