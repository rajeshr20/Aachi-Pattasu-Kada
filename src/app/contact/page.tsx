'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageCircle, Mail } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry')
      }
      setSuccess(true)
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#10172A] flex flex-col">
      <Header />

      {/* Cinematic Header Banner */}
      <section className="bg-[#10172A] text-white pt-32 pb-16 border-b border-[#D6B36A]/20">
        <div className="site-container text-center">
          <span className="inline-block text-xs uppercase tracking-widest text-[#D6B36A] font-bold bg-[#D6B36A]/10 px-3.5 py-1.5 rounded-full border border-[#D6B36A]/30 mb-4">
            Customer Support & Store Visits
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Contact Aachi Crackers
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have questions regarding wholesale orders, Diwali gift boxes, or store visits? Reach out to our dedicated team in Perumanallur, Tirupur.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <main className="flex-1 py-16 sm:py-20">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Store Information Card (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B91C35]">Direct Visit</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#10172A] mt-1">
                  Store Location & Hours
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#D6B36A]/15 text-[#8C6D23] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#10172A]">Store Address</h3>
                    <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                      Opposite Aachi Mess, Perumanallur, Tirupur, Tamil Nadu — 641666
                    </p>
                    <p className="text-xs font-semibold text-[#B91C35] mt-1">
                      Landmark: Directly opposite Aachi Mess main arch
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#B91C35]/10 text-[#B91C35] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#10172A]">Direct Phone Support</h3>
                    <p className="text-xs text-stone-500 mt-0.5 mb-2">Speak directly with our counter staff</p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="tel:9500565391"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#B91C35] hover:underline"
                      >
                        <Phone className="w-4 h-4 text-stone-400" />
                        +91 95005 65391 (Primary)
                      </a>
                      <a
                        href="tel:7708632966"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#10172A] hover:text-[#B91C35] transition-colors"
                      >
                        <Phone className="w-4 h-4 text-stone-400" />
                        +91 77086 32966 (Alternate)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#10172A]">Instant WhatsApp Help</h3>
                    <p className="text-xs text-stone-500 mt-0.5 mb-2">Send your order list directly on WhatsApp</p>
                    <a
                      href="https://wa.me/919500565391?text=Hi%20Aachi%20Crackers%2C%20I%20would%20like%20to%20enquire%20about%20crackers."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp (+91 95005 65391)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#10172A]">Working Hours</h3>
                    <p className="text-sm text-stone-600 mt-1">
                      Monday to Sunday: 9:00 AM – 9:00 PM
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Open 7 days a week during festive seasons
                    </p>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden border border-stone-200 h-52 w-full">
                  <iframe
                    title="Aachi Crackers Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15654.551989467645!2d77.3750!3d11.1925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9067b5f54d197%3A0xc3f1a0d33e9b1bb4!2sPerumanallur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="border-b border-stone-100 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D6B36A]">Online Message</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#10172A] mt-1">
                  Send an Enquiry
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  Fill in your requirements below and our team will get back to you with pricing and availability.
                </p>
              </div>

              {success ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-extrabold text-[#10172A]">Enquiry Received Successfully!</h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Thank you for reaching out to Aachi Crackers. Our sales team will contact you shortly on your provided mobile number.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-crimson inline-flex items-center gap-2 mt-2"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFF9F0] border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#B91C35] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFF9F0] border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#B91C35] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      Email Address <span className="text-stone-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFF9F0] border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#B91C35] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      Cracker Requirements / Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please let us know what crackers you need, your estimated budget, or any specific brand preferences..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFF9F0] border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#B91C35] focus:bg-white transition-all"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-[#B91C35] text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-crimson w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Submitting Enquiry...' : 'Submit Enquiry'}
                  </button>

                  <p className="text-center text-xs text-stone-500">
                    Your details are kept safe and used solely for fulfilling your crackers enquiry.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer settings={{}} />
    </div>
  )
}
