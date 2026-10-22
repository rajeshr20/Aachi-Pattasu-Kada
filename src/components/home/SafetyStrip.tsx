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
    <section className="w-full py-10 sm:py-12 bg-gradient-to-r from-[#181D33] via-[#121626] to-[#181D33] border-y border-white/10">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-lg sm:text-xl">
                Fireworks Safety Rules (Diwali Safety First)
              </h2>
              <p className="text-xs text-gray-400">
                Celebrate Diwali with happiness and zero accidents. Follow these critical safety norms.
              </p>
            </div>
          </div>
          <Link
            href="/safety"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5A623] hover:underline self-start sm:self-auto"
          >
            <span>Read Complete Safety Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tips.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#0B0D1A]/80 border border-white/5 rounded-xl p-4 text-center flex flex-col items-center justify-center gap-2 hover:border-[#F5A623]/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#F5A623]">
                <t.icon className="w-4 h-4" />
              </div>
              <p className="text-white font-bold text-xs">{t.title}</p>
              <p className="text-gray-400 text-[11px] leading-tight">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
