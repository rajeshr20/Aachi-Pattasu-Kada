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
  const whatsapp = settings.whatsapp || '919500565391'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-[#06222f] to-[#041720] text-white">
      <div className="site-container-narrow text-center">
        
        {/* Envelope Icon */}
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-[#FFB300] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Mail className="w-7 h-7" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
          {locale === 'ta' ? 'தீபாவளி சலுகைகளை உடனுக்குடன் பெறுக' : 'Get festive deals in your inbox'}
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          {locale === 'ta'
            ? 'புதிய ரகங்கள், குடும்ப பேக் தள்ளுபடி சலுகைகள் மற்றும் சிறப்பு விலைப்பட்டியல் மாதத்திற்கு ஒருமுறை மட்டுமே.'
            : 'Early access, festival packs and special bundles — once a month, never spammy. Unsubscribe anytime.'}
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm">
            <Check className="w-5 h-5 text-emerald-400" />
            <span>
              {locale === 'ta' ? 'நன்றி! நீங்கள் பதிவு செய்துவிட்டீர்கள்.' : 'Thank you! You are subscribed to festive updates.'}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
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
              className="btn-amber w-full sm:w-auto shrink-0 justify-center text-sm"
            >
              <span>{locale === 'ta' ? 'இணையுங்கள்' : 'Subscribe'}</span>
            </button>
          </form>
        )}

        <div className="mt-6">
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi, I want to get the festival price list and updates on WhatsApp.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#FFB300] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>{locale === 'ta' ? 'அல்லது வாட்ஸ்அப்பில் சலுகைகளைப் பெற இங்கே கிளிக் செய்யவும்' : 'Or message us on WhatsApp for instant offers.'}</span>
          </a>
        </div>

      </div>
    </section>
  )
}
