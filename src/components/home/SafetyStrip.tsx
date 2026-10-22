import Link from 'next/link'
import { ShieldAlert, ArrowRight, Eye, Droplet, UserCheck, Shield, HeartPulse, Sparkles } from 'lucide-react'

export default function SafetyStrip() {
  const tips = [
    { icon: Eye, title: 'Safe Distance', text: 'Maintain minimum 5 meters from burst zone' },
    { icon: Droplet, title: 'Water Ready', text: 'Keep 2 buckets of water and sand nearby' },
    { icon: UserCheck, title: 'Adult Guard', text: 'Children must burst only with adult oversight' },
    { icon: Shield, title: 'Cotton Clothes', text: 'Wear snug cotton clothes, avoid loose silk' },
    { icon: HeartPulse, title: 'First Aid', text: 'Pour clean running water in case of burns' },
    { icon: Sparkles, title: 'Long Incense', text: 'Ignite fuses from arm’s length with sparklers' },
  ]

  return (
    <section className="w-full py-16 sm:py-20 bg-[#FFFFFF] border-t border-[#EADBCA]">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 sm:mb-12">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-[#B91C35] flex items-center justify-center border border-red-200 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#10172A] text-lg sm:text-2xl tracking-tight">
                Diwali Fireworks Safety Norms
              </h2>
              <p className="text-xs sm:text-sm text-[#647084] mt-0.5">
                Celebrate Diwali with happiness and zero accidents. Follow these critical safety precautions.
              </p>
            </div>
          </div>
          <Link
            href="/safety"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B91C35] hover:underline self-start sm:self-auto shrink-0"
          >
            <span>Read Complete Safety Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {tips.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FFF9F0] border border-[#EADBCA] rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-2.5 hover:border-[#D6B36A] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EADBCA] flex items-center justify-center text-[#B91C35] shadow-xs">
                <t.icon className="w-5 h-5" />
              </div>
              <p className="text-[#10172A] font-extrabold text-xs">{t.title}</p>
              <p className="text-[#647084] text-[11px] leading-relaxed font-normal">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
