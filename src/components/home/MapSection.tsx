import { Phone, MapPin, Navigation, Clock, MessageSquare } from 'lucide-react'

interface MapSectionProps {
  settings: Record<string, string>
}

export default function MapSection({ settings }: MapSectionProps) {
  const phone1 = settings.phone1 || '9500565391'
  const phone2 = settings.phone2 || '7708632966'
  const address = settings.address || 'Opposite Aachi Mess, Perumanallur, Tirupur, Tamil Nadu'
  const mapLink = settings.map_link || 'https://maps.google.com/?q=Perumanallur'
  const hours = settings.opening_hours || '9:00 AM - 9:00 PM (All 7 Days)'

  return (
    <section className="w-full py-16 sm:py-20" id="contact">
      <div className="site-container">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-[#F5A623] font-extrabold bg-[#F5A623]/10 px-3.5 py-1.5 rounded-full border border-[#F5A623]/25">
          Store Visit & Pickup
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3 mb-3">
          Visit Our Landmark Store in Perumanallur
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
          Located right opposite Aachi Mess on the main Perumanallur road with ample vehicle parking.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Google Map Iframe */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-80 sm:h-96 w-full relative">
          <iframe
            src="https://maps.google.com/maps?q=Perumanallur,Tamil+Nadu&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Aachi Crackers Shop Location"
          />
        </div>

        {/* Contact Info Cards */}
        <div className="flex flex-col justify-between gap-4">
          <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 hover:border-[#F5A623]/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5 border border-red-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-base">Store Address</h3>
                <p className="text-gray-300 text-sm mt-1 leading-relaxed">{address}</p>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-[#F5A623] hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps & Get Directions →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 hover:border-[#F5A623]/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#2ECC71] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-base">Call & WhatsApp Order Lines</h3>
                <p className="text-gray-400 text-xs mt-1">Tap to dial directly or start a WhatsApp chat:</p>
                <div className="flex flex-wrap gap-2.5 mt-3">
                  <a
                    href={`tel:${phone1}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#27AE60]/20 border border-[#27AE60]/40 text-[#2ECC71] font-bold text-xs hover:bg-[#27AE60]/30 transition-colors"
                  >
                    📞 {phone1.replace(/(\d{5})(\d{5})/, '$1 $2')}
                  </a>
                  <a
                    href={`tel:${phone2}`}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-bold text-xs hover:bg-white/10 transition-colors"
                  >
                    📞 {phone2.replace(/(\d{5})(\d{5})/, '$1 $2')}
                  </a>
                  <a
                    href={`https://wa.me/91${phone1}?text=${encodeURIComponent('Hi Aachi Crackers, I want to inquire about Diwali crackers.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-xs hover:bg-[#25D366]/30 transition-colors flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 hover:border-[#F5A623]/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Store Operating Hours</h3>
                <p className="text-gray-300 text-sm mt-1">{hours}</p>
                <p className="text-xs text-[#2ECC71] font-semibold mt-1">
                  ✓ Open continuously every day including Sundays during Diwali festive season
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
