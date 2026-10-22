import { ShoppingBag, MessageSquare, Truck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: ShoppingBag,
      title: 'Select Your Crackers',
      desc: 'Browse our organized Sivakasi catalogue and add your family’s favourite sparklers, pots, chakkars, and gift boxes to your order list.',
    },
    {
      num: '02',
      icon: MessageSquare,
      title: 'Confirm via WhatsApp',
      desc: 'Submit your list online or send it directly over WhatsApp. Our team immediately reviews your order, verifies stock, and confirms the final wholesale bill.',
    },
    {
      num: '03',
      icon: Truck,
      title: 'Store Pickup or Delivery',
      desc: 'Collect directly from our store in Perumanallur (Opposite Aachi Mess) or enjoy safe, professional road transport delivery across Tamil Nadu.',
    },
  ]

  return (
    <section className="w-full py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#EADBCA]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest text-[#B91C35] font-black bg-[#B91C35]/10 px-4 py-1.5 rounded-full border border-[#B91C35]/20">
            Simple 3-Step Ordering
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#10172A] tracking-tight mt-4 mb-4">
            How To Order From Us
          </h2>
          <p className="text-[#647084] text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-normal">
            Online crackers sale is regulated in India. We make booking your festival fireworks simple, transparent, and 100% legal.
          </p>
        </div>

        {/* 3 Step Cards with Generous Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white border border-[#EADBCA] rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Step Number & Icon Row */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-4xl sm:text-5xl font-black text-[#D6B36A]/60 group-hover:text-[#B91C35] transition-colors">
                    {step.num}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF9F0] border border-[#EADBCA] text-[#B91C35] flex items-center justify-center group-hover:bg-[#B91C35] group-hover:text-white transition-all shadow-sm">
                    <step.icon className="w-7 h-7" />
                  </div>
                </div>

                <h3 className="font-extrabold text-[#10172A] text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-[#647084] text-sm sm:text-base leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-2 text-xs font-bold text-[#B91C35]">
                <span>Step {idx + 1} of 3</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="text-center mt-16 sm:mt-20">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#B91C35] hover:bg-[#9E152B] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-950/20 hover:-translate-y-0.5 transition-all"
          >
            <span>Start Building Your Cracker List</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  )
}
