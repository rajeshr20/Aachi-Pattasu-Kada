'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react'

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
        throw new Error(data.error || 'Failed to submit message')
      }
      setSuccess(true)
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0D1A] text-white flex flex-col">
      <Header />

      <main className="flex-1 pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full" style={{ paddingTop: '120px' }}>
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#F5A623] font-semibold bg-[#F5A623]/10 px-3 py-1 rounded-full border border-[#F5A623]/20">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Have questions about crackers, bulk orders, or shop timings? Call us or send an enquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Shop Information Card */}
          <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">
              Shop Location & Contact Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 text-[#F5A623] flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Store Address</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Opposite Aachi Mess, Perumanallur, Tirupur, Tamil Nadu — 641666
                  </p>
                  <p className="text-xs text-[#F5A623] mt-0.5">
                    Landmark: Directly opposite Aachi Mess main arch
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#27AE60]/10 text-[#2ECC71] flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Phone & WhatsApp Support</h3>
                  <div className="flex flex-wrap gap-3 mt-1.5">
                    <a
                      href="tel:9500565391"
                      className="px-3 py-1 rounded-lg bg-[#27AE60]/20 text-[#2ECC71] font-semibold text-xs border border-[#27AE60]/30 hover:bg-[#27AE60]/30 transition-colors"
                    >
                      95005 65391 (Primary & WhatsApp)
                    </a>
                    <a
                      href="tel:7708632966"
                      className="px-3 py-1 rounded-lg bg-[#27AE60]/20 text-[#2ECC71] font-semibold text-xs border border-[#27AE60]/30 hover:bg-[#27AE60]/30 transition-colors"
                    >
                      77086 32966 (Alternate)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3498DB]/10 text-[#3498DB] flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Store Hours</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Monday – Sunday: 9:00 AM – 9:00 PM
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Open all 7 days during festive seasons
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map iframe */}
            <div className="rounded-xl overflow-hidden border border-white/10 h-56 w-full">
              <iframe
                title="Aachi Crackers Location"
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

          {/* Contact Enquiry Form */}
          <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-6">
              Send Us a Message
            </h2>

            {success ? (
              <div className="p-6 bg-[#27AE60]/10 border border-[#27AE60]/30 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#2ECC71] mx-auto" />
                <h3 className="text-lg font-bold text-white">Message Received!</h3>
                <p className="text-xs text-gray-300">
                  Thank you for reaching out. Our team will contact you on your mobile number shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 bg-[#F5A623] text-[#0B0D1A] font-bold text-xs rounded-lg mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Message / Crackers Enquiry *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what crackers or quantities you are looking for..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D35400] text-[#0B0D1A] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer settings={{}} />
    </div>
  )
}
