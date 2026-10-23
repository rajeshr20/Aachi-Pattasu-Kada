'use client'

import { useState } from 'react'
import { Mail, Check, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface NewsletterSectionProps {
  settings?: Record<string, string>
}

export default function NewsletterSection({ settings = {} }: NewsletterSectionProps) {
  const { locale } = useLanguage()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const rawPhone = settings.phone1 || '9500565391'
  const cleanPhone = rawPhone.replace(/\D/g, '').slice(-10) || '9500565391'
  const displayPhone = `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
  const whatsappNumber = settings.whatsapp || `91${cleanPhone}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="w-full py-12 sm:py-20 bg-[#FAF8F4]">
      <div className="site-container-narrow">
        
        {/* Elegant Framed Newsletter Card with Ambient Lighting */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0a2331] via-[#061924] to-[#030e14] text-white p-8 sm:p-12 lg:p-14 border border-white/10 shadow-2xl text-center overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#FFB300]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#0B6E99]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            {/* Envelope Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 text-[#FFB300] flex items-center justify-center mx-auto mb-6 shadow-md">
              <Mail className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
              {locale === 'ta' ? 'தீபாவளி சலுகைகளை உடனுக்குடன் பெறுக' : 'Get festive deals in your inbox'}
            </h2>

            <div className="space-y-2 text-slate-300 text-xs sm:text-sm mb-8 leading-relaxed sm:leading-loose">
              <p>
                {locale === 'ta'
                  ? 'புதிய ரகங்கள், குடும்ப பேக் தள்ளுபடி சலுகைகள் மற்றும் சிறப்பு விலைப்பட்டியல் மாதத்திற்கு ஒருமுறை மட்டுமே.'
                  : 'Early access, seasonal discount vouchers, and festival price lists delivered directly to you.'}
              </p>
              <p className="text-slate-400 text-xs">
                {locale === 'ta'
                  ? 'தேவையற்ற மின்னஞ்சல்கள் இல்லை. எப்போது வேண்டுமானாலும் விலகிக் கொள்ளலாம்.'
                  : 'Sent once a month, strictly zero spam. You can unsubscribe anytime.'}
              </p>
            </div>

            {submitted ? (
              <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm shadow-sm">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>
                  {locale === 'ta' ? 'நன்றி! நீங்கள் பதிவு செய்துவிட்டீர்கள்.' : 'Thank you! You are subscribed to festive updates.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === 'ta' ? 'உங்கள் மின்னஞ்சல் முகவரி...' : 'you@example.com'}
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#FFB300] transition-colors"
                />
                <button
                  type="submit"
                  className="btn-amber w-full sm:w-auto shrink-0 justify-center text-sm py-3.5 px-6 font-bold shadow-lg"
                >
                  <span>{locale === 'ta' ? 'இணையுங்கள்' : 'Subscribe'}</span>
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I want to get the festival price list and updates on WhatsApp.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-[#FFB300] transition-colors font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10"
              >
                <MessageSquare className="w-4 h-4 text-[#16A34A]" />
                <span>
                  {locale === 'ta'
                    ? `வாட்ஸ்அப்பில் சலுகைகளைப் பெற: ${displayPhone}`
                    : `Or message us on WhatsApp (${displayPhone}) for instant offers`}
                </span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
