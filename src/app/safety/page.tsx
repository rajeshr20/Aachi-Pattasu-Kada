import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Phone, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Safety Guidelines & Tips | Aachi Crackers Perumanallur',
  description: 'Essential firecracker safety guidelines, do’s and don’ts for Diwali celebration. Protect your family and celebrate safely.',
}

export default function SafetyPage() {
  const dos = [
    { title: 'Always purchase from licensed sellers', desc: 'Ensure you buy legal, certified green crackers from licensed shops like Aachi Crackers.' },
    { title: 'Keep water & sand buckets ready', desc: 'Always have at least 2 buckets of clean water and a bucket of dry sand near the bursting area.' },
    { title: 'Wear fitted cotton clothing', desc: 'Avoid loose synthetic fabrics like nylon, polyester, or silk that easily catch fire.' },
    { title: 'Use long agarbatti / sparklers to light', desc: 'Always light crackers from an arm’s length using long sparklers or incense sticks, never matches or lighters directly.' },
    { title: 'Adult supervision is mandatory', desc: 'Children must never handle or light firecrackers without continuous adult presence.' },
    { title: 'Store crackers in a cool, dry place', desc: 'Keep firecrackers in a closed metal or wooden box away from heat, kitchens, and children.' },
  ]

  const donts = [
    { title: 'Never light crackers inside hands', desc: 'Always place crackers firmly on open ground or flat surface before lighting.' },
    { title: 'Never re-ignite a dud / unexploded cracker', desc: 'If a cracker doesn’t ignite, wait 15 minutes, pour water over it, and safely dispose of it.' },
    { title: 'Never burst crackers indoors or balconies', desc: 'Always choose open fields, wide streets away from parked vehicles, wires, and dry trees.' },
    { title: 'Never aim rockets or aerial shots at buildings', desc: 'Fix rockets vertically into sturdy bottles or launch pipes tilted away from homes and people.' },
    { title: 'Never carry crackers in pockets', desc: 'Friction and body heat can accidentally ignite gunpowder in clothing pockets.' },
    { title: 'Never burst near animals or hospitals', desc: 'Be considerate of pets, elders, infants, and patients who are sensitive to loud noise.' },
  ]

  return (
    <div className="min-h-screen bg-[#0B0D1A] text-white flex flex-col">
      <Header />

      <main className="flex-1 pb-16 px-4 sm:px-6 max-w-5xl mx-auto w-full" style={{ paddingTop: '120px' }}>
        {/* Hero Banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#27AE60]/20 border border-[#27AE60]/40 text-[#2ECC71] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            Safety First — Celebrate Responsibly
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Firecracker Safety <span className="text-[#F5A623]">Guidelines & Tips</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Your family&apos;s happiness and safety are our highest priorities. Please review and share these essential Diwali firecracker safety guidelines with your family.
          </p>
        </div>

        {/* Emergency quick bar */}
        <div className="bg-gradient-to-r from-[#C0392B]/20 via-[#181D33] to-[#C0392B]/20 border border-[#C0392B]/40 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#C0392B] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Emergency Helplines</h2>
              <p className="text-xs text-gray-400">Keep these emergency contact numbers accessible at all times during Diwali.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs">
              <span className="text-gray-400">Fire Service:</span> <strong className="text-white">101</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs">
              <span className="text-gray-400">Ambulance:</span> <strong className="text-white">108</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs">
              <span className="text-gray-400">Police:</span> <strong className="text-white">100</strong>
            </div>
            <a
              href="tel:9500565391"
              className="px-3 py-1.5 rounded-lg bg-[#F5A623] text-[#0B0D1A] font-bold text-xs flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              Shop: 95005 65391
            </a>
          </div>
        </div>

        {/* Do's and Don'ts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Do's */}
          <div className="bg-[#121626] border border-[#27AE60]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-6 text-[#2ECC71]">
              <CheckCircle2 className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Essential Safety Practices (DO&apos;S)</h3>
            </div>
            <div className="space-y-4">
              {dos.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-[#27AE60]/20 text-[#2ECC71] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div className="bg-[#121626] border border-[#C0392B]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-6 text-[#E74C3C]">
              <XCircle className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Hazardous Mistakes to Avoid (DON&apos;TS)</h3>
            </div>
            <div className="space-y-4">
              {donts.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-[#C0392B]/20 text-[#E74C3C] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* First Aid Tips */}
        <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-[#F5A623] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            First Aid in Case of Accidental Burns
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <strong className="text-white block text-sm mb-1">1. Cool Water Immediately</strong>
              Pour clean, cold running water over the burned area for at least 10–15 minutes. Never apply ice or ice water directly.
            </div>
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <strong className="text-white block text-sm mb-1">2. Do NOT Apply Remedies</strong>
              Do NOT apply toothpaste, butter, ink, or oils on burn injuries. Cover the area with a clean, dry, lint-free cloth.
            </div>
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <strong className="text-white block text-sm mb-1">3. Seek Medical Attention</strong>
              In case of eye injuries or severe skin burns, rush immediately to the nearest hospital or call 108 without delay.
            </div>
          </div>
        </div>
      </main>

      <Footer settings={{}} />
    </div>
  )
}
