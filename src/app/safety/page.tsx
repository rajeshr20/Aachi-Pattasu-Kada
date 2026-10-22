import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Phone, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Safety Guidelines & Tips | Aachi Crackers Perumanallur',
  description: 'Essential firecracker safety guidelines, do’s and don’ts for Diwali celebration. Protect your family and celebrate safely.',
}

export default function SafetyPage() {
  const dos = [
    { title: 'Always purchase from licensed sellers', desc: 'Ensure you buy legal, certified green crackers from authorized shops like Aachi Crackers.' },
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
    <div className="min-h-screen bg-[#FFF9F0] text-[#10172A] flex flex-col">
      <Header />

      {/* Cinematic Header Banner */}
      <section className="bg-[#10172A] text-white pt-32 pb-16 border-b border-[#D6B36A]/20">
        <div className="site-container text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[#D6B36A] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            Safety First — Celebrate Responsibly
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Diwali Safety <span className="text-[#D6B36A]">Guidelines & Tips</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Your family&apos;s happiness and safety are our highest priorities. Please review and share these essential firecracker safety guidelines with your loved ones.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-16 sm:py-20">
        <div className="site-container">
          
          {/* Emergency Helplines Callout */}
          <div className="bg-[#10172A] text-white border border-[#B91C35]/40 rounded-3xl p-6 sm:p-8 mb-16 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#B91C35] flex items-center justify-center shrink-0 shadow-md">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">Emergency Helplines</h2>
                <p className="text-xs text-slate-300 mt-0.5">Keep these emergency contact numbers accessible at all times during Diwali.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs text-center">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Fire Service</span>
                <strong className="text-white text-base font-extrabold">101</strong>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs text-center">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Ambulance</span>
                <strong className="text-white text-base font-extrabold">108</strong>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs text-center">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Police</span>
                <strong className="text-white text-base font-extrabold">100</strong>
              </div>
              <a
                href="tel:9500565391"
                className="btn-crimson inline-flex items-center gap-2 text-xs py-2.5 px-4 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                Store: 95005 65391
              </a>
            </div>
          </div>

          {/* Do's and Don'ts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Do's */}
            <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-7 h-7" />
                <div>
                  <h3 className="text-xl font-extrabold text-[#10172A]">Essential Practices (DO&apos;S)</h3>
                  <p className="text-xs text-emerald-700 mt-0.5 font-medium">Safe guidelines for a joyful Diwali</p>
                </div>
              </div>
              <div className="space-y-4">
                {dos.map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#10172A]">{item.title}</h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Don'ts */}
            <div className="bg-white border border-red-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-100 text-[#B91C35]">
                <XCircle className="w-7 h-7" />
                <div>
                  <h3 className="text-xl font-extrabold text-[#10172A]">Hazards to Avoid (DON&apos;TS)</h3>
                  <p className="text-xs text-[#B91C35] mt-0.5 font-medium">Critical safety precautions</p>
                </div>
              </div>
              <div className="space-y-4">
                {donts.map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-red-50/50 border border-red-100">
                    <span className="w-6 h-6 rounded-full bg-[#B91C35] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#10172A]">{item.title}</h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* First Aid Tips */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#D6B36A]" />
              <h3 className="text-xl font-extrabold text-[#10172A]">
                First Aid Measures in Case of Accidental Burns
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-stone-600">
              <div className="p-5 bg-[#FFF9F0] rounded-2xl border border-stone-200">
                <strong className="text-[#10172A] block text-base font-extrabold mb-2">
                  1. Cool Water Immediately
                </strong>
                Pour clean, cold running water over the burned area for at least 10–15 minutes. Never apply ice or ice water directly to skin.
              </div>
              <div className="p-5 bg-[#FFF9F0] rounded-2xl border border-stone-200">
                <strong className="text-[#10172A] block text-base font-extrabold mb-2">
                  2. Do NOT Apply Remedies
                </strong>
                Do NOT apply toothpaste, butter, ink, or oils on burn injuries. Cover the area with a clean, dry, lint-free cloth.
              </div>
              <div className="p-5 bg-[#FFF9F0] rounded-2xl border border-stone-200">
                <strong className="text-[#10172A] block text-base font-extrabold mb-2">
                  3. Seek Immediate Medical Help
                </strong>
                In case of eye injuries or severe skin burns, rush immediately to the nearest hospital or dial 108 without delay.
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer settings={{}} />
    </div>
  )
}
