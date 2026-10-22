'use client'

import { Sparkles, Flame } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface OurStoryProps {
  settings?: Record<string, string>
}

export default function OurStory({ settings = {} }: OurStoryProps) {
  const { locale } = useLanguage()

  const shopName =
    locale === 'ta'
      ? settings.shop_name_ta || 'ஆச்சி பட்டாசு கடை'
      : settings.shop_name || 'Aachi Pattasu Kadai'

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-br from-[#06222f] via-[#082e3f] to-[#0b3a52] text-white">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB300]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0B6E99]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story text and stats */}
          <div className="lg:col-span-7">
            <span className="inline-block text-[#FFB300] text-xs font-black uppercase tracking-widest mb-3">
              {locale === 'ta' ? 'சிவகாசி முதல் பெருமாநல்லூர் வரை' : 'FROM SIVAKASI TO PERUMANALLUR'}
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6">
              {locale === 'ta' ? (
                <>
                  பாரம்பரிய தயாரிப்பு, <span className="text-[#FFB300]">பாதுகாப்பு & கொண்டாட்டம்</span>
                </>
              ) : (
                <>
                  Celebratory joy, <span className="text-[#FFB300]">safety & craftsmanship</span>
                </>
              )}
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                {locale === 'ta'
                  ? 'பெருமாநல்லூர் ஆச்சிமெஸ் எதிரில் அமைந்துள்ள ஆச்சி பட்டாசு கடை, சிவகாசியின் முன்னணி தயாரிப்பாளர்களிடமிருந்து நேரடியாக தரமான பசுமைப் பட்டாசுகளை உங்கள் இல்லங்களுக்கு வழங்குகிறது.'
                  : 'Located directly opposite Aachi Mess in Perumanallur, Aachi Pattasu Kadai brings the finest pyrotechnic craftsmanship directly from licensed Sivakasi units to your celebrations.'}
              </p>
              <p>
                {locale === 'ta'
                  ? 'ஒவ்வொரு ரகமும் அரசு அனுமதி பெற்ற PESO விதிகளுக்கு உட்பட்டு, தரம் பரிசோதிக்கப்பட்டு பாதுகாப்பாக வழங்கப்படுகிறது. நடுத்தர குடும்பங்களும் மகிழ்ச்சியாக கொண்டாடும் வகையில் நியாயமான நேரடி தொழிற்சாலை விலையை நாங்கள் வழங்குகிறோம்.'
                  : 'Every single batch is PESO-compliant, quality-checked, and stored in optimal conditions. We believe festival joy should be safe, authentic, and accessible at transparent factory rates.'}
              </p>
            </div>

            {/* Founded & Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#FFB300]">100%</span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1 block">
                  {locale === 'ta' ? 'PESO சான்றளிப்பு' : 'PESO Certified'}
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#FFB300]">2026</span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1 block">
                  {locale === 'ta' ? 'புதிய சீசன் சரக்கு' : 'Fresh Season Stock'}
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#FFB300]">DIRECT</span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1 block">
                  {locale === 'ta' ? 'தொழிற்சாலை விலை' : 'Factory Rates'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Diya Quote Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white/5 border border-white/15 p-8 sm:p-10 backdrop-blur-md flex flex-col items-center text-center shadow-2xl">
              {/* Diya glowing badge */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB300] to-[#E65100] flex items-center justify-center text-white shadow-lg shadow-orange-500/30 mb-6">
                <Flame className="w-10 h-10 fill-amber-100 text-amber-100 animate-pulse" />
              </div>

              <div className="text-3xl text-[#FFB300] font-serif mb-2">“</div>
              <blockquote className="text-lg sm:text-xl font-medium text-white italic leading-snug mb-6 max-w-sm">
                {locale === 'ta'
                  ? '“நாங்கள் பட்டாசுகளை மட்டும் விற்பதில்லை. ஒரு குழந்தையின் முகத்தில் மலரும் பிரகாசமான புன்னகையையும் கொண்டாட்டத்தையும் தருகிறோம்.”'
                  : '“We don\'t just sell crackers. We sell the moment a child\'s eyes light up with celebration.”'}
              </blockquote>

              <div className="pt-4 border-t border-white/10 w-full">
                <span className="font-extrabold text-[#FFB300] text-sm block">
                  {shopName}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {locale === 'ta' ? 'ஆச்சிமெஸ் எதிரில், பெருமாநல்லூர்' : 'Opposite Aachi Mess, Perumanallur'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
