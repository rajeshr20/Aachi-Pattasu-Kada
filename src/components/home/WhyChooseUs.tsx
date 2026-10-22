import { Factory, ShieldCheck, PackageCheck, Headphones, Gift, Truck, Sparkles } from 'lucide-react'

export default function WhyChooseUs() {
  const promises = [
    {
      icon: Factory,
      title: 'Factory-Direct Pricing',
      desc: 'Direct from Sivakasi manufacturing units. Enjoy transparent wholesale pricing with genuine festival discounts.',
    },
    {
      icon: ShieldCheck,
      title: '100% Green Certified',
      desc: 'Formulated with CSIR-NEERI approved green cracker standards for lower emissions and reliable family safety.',
    },
    {
      icon: PackageCheck,
      title: 'Moisture-Safe Packaging',
      desc: 'Double-walled heavy-duty boxes with moisture absorption barriers ensure perfect ignition on Diwali night.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Order Support',
      desc: 'Direct phone & WhatsApp guidance from our Perumanallur store counter team 7 days a week.',
    },
    {
      icon: Gift,
      title: 'Curated Family Hampers',
      desc: 'Balanced gift boxes thoughtfully packed with colourful ground spinners, fountains, and sparkling aerials.',
    },
    {
      icon: Truck,
      title: 'Store Pickup & Parcel Service',
      desc: 'Visit our landmark shop opposite Aachi Mess in Perumanallur, or schedule verified transport parcel delivery.',
    },
  ]

  return (
    <section className="w-full py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#EADBCA]">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B91C35] font-black bg-[#B91C35]/10 px-4 py-1.5 rounded-full border border-[#B91C35]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Aachi Promise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#10172A] tracking-tight mb-4">
            Why Choose Aachi Crackers
          </h2>
          <p className="text-[#647084] text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-normal">
            Trusted by families across Tirupur, Coimbatore, and Tamil Nadu for authentic Sivakasi quality and transparent prices.
          </p>
        </div>

        {/* Reasons Grid with generous card padding and gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {promises.map((r, i) => (
            <div
              key={i}
              className="bg-white border border-[#EADBCA] rounded-3xl p-8 sm:p-10 hover:border-[#D6B36A] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 group text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#EADBCA] text-[#B91C35] flex items-center justify-center mb-6 group-hover:bg-[#B91C35] group-hover:text-white transition-colors shadow-sm">
                  <r.icon className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-[#10172A] text-lg sm:text-xl mb-3 group-hover:text-[#B91C35] transition-colors">
                  {r.title}
                </h3>
                <p className="text-[#647084] text-sm sm:text-base leading-relaxed font-normal">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
