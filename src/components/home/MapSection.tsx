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
    <section className="w-full py-20 sm:py-28 bg-[#FFFFFF] border-t border-[#EADBCA] relative" id="contact">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#B91C35] font-black bg-[#B91C35]/10 px-4 py-1.5 rounded-full border border-[#B91C35]/20">
            Store Visit & Self Pickup
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#10172A] tracking-tight mt-4 mb-4">
            Visit Our Landmark Store in Perumanallur
          </h2>
          <p className="text-[#647084] text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-normal">
            Located right opposite Aachi Mess on the main Perumanallur junction with convenient vehicle parking.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Google Map Frame */}
          <div className="rounded-2xl overflow-hidden border border-[#EADBCA] shadow-lg h-80 sm:h-auto min-h-[340px] w-full relative">
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

          {/* Contact & Timing Info Cards */}
          <div className="flex flex-col justify-between gap-5">
            <div className="bg-[#FFF9F0] border border-[#EADBCA] rounded-2xl p-6 sm:p-7 hover:border-[#D6B36A] transition-colors text-left">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-50 text-[#B91C35] flex items-center justify-center shrink-0 mt-0.5 border border-red-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-[#10172A] text-base sm:text-lg">Store Address</h3>
                  <p className="text-[#647084] text-sm mt-1 leading-relaxed font-normal">{address}</p>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-[#B91C35] hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps & Get Directions →</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF9F0] border border-[#EADBCA] rounded-2xl p-6 sm:p-7 hover:border-[#D6B36A] transition-colors text-left">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#27AE60] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-[#10172A] text-base sm:text-lg">Call & WhatsApp Order Assistance</h3>
                  <p className="text-[#647084] text-xs mt-1">Direct phone lines for quotes, transport details, and enquiries:</p>
                  <div className="flex flex-wrap gap-2.5 mt-3.5">
                    <a
                      href={`tel:${phone1}`}
                      className="px-4 py-2 rounded-xl bg-white border border-[#EADBCA] text-[#10172A] font-bold text-xs hover:border-[#B91C35] transition-colors shadow-xs"
                    >
                      📞 {phone1.replace(/(\d{5})(\d{5})/, '$1 $2')}
                    </a>
                    <a
                      href={`tel:${phone2}`}
                      className="px-4 py-2 rounded-xl bg-white border border-[#EADBCA] text-[#10172A] font-bold text-xs hover:border-[#B91C35] transition-colors shadow-xs"
                    >
                      📞 {phone2.replace(/(\d{5})(\d{5})/, '$1 $2')}
                    </a>
                    <a
                      href={`https://wa.me/91${phone1}?text=${encodeURIComponent('Hi Aachi Crackers, I want to inquire about Diwali firecrackers.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20bd5a] transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF9F0] border border-[#EADBCA] rounded-2xl p-6 sm:p-7 hover:border-[#D6B36A] transition-colors text-left">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#D6B36A] flex items-center justify-center shrink-0 mt-0.5 border border-amber-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#10172A] text-base sm:text-lg">Store Operating Hours</h3>
                  <p className="text-[#647084] text-sm mt-1 font-medium">{hours}</p>
                  <p className="text-xs text-[#27AE60] font-bold mt-1">
                    ✓ Open 7 days a week continuously throughout the festive season
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
