import { HelpCircle } from 'lucide-react'

export default function FAQSection() {
  const faqs = [
    {
      q: 'How does ordering on Aachi Crackers work?',
      a: 'Browse our complete catalog, add products to your cart (minimum order value is ₹3,000), and submit your booking details. We will contact you over WhatsApp or phone to confirm your stock and delivery preference.',
    },
    {
      q: 'Is online payment required during checkout?',
      a: 'No online payment is collected on this portal. In accordance with government safety guidelines, this website operates as an enquiry and quotation platform. You pay directly via UPI, cash, or bank transfer once your order is confirmed by our team.',
    },
    {
      q: 'What are the delivery and collection options?',
      a: 'We offer two convenient fulfillment options: 1) Free direct store pickup at our landmark shop in Perumanallur (Opposite Aachi Mess); or 2) Safe transport parcel dispatch to all major bus stands and transport hubs across Tamil Nadu.',
    },
    {
      q: 'Are all your fireworks legally approved Green Crackers?',
      a: 'Yes, 100%. All our fireworks are sourced directly from licensed, accredited Sivakasi manufacturers complying with Petroleum and Explosives Safety Organization (PESO) regulations and Supreme Court emission standards.',
    },
    {
      q: 'Can I visit the store in person to buy crackers?',
      a: 'Absolutely! Our store is located directly opposite Aachi Mess on the Perumanallur main junction, Tirupur District. We are open all 7 days from 9:00 AM to 9:00 PM during the festive season.',
    },
    {
      q: 'Do you offer bulk discounts for corporate or community orders?',
      a: 'Yes! For large community orders or corporate gift box hampers exceeding ₹25,000, please reach out to us directly on WhatsApp or call 95005 65391 for custom tiered wholesale pricing.',
    },
  ]

  return (
    <section className="w-full py-16 sm:py-20">
      <div className="site-container-narrow">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-[#F5A623] font-extrabold bg-[#F5A623]/10 px-3.5 py-1.5 rounded-full border border-[#F5A623]/25">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
          Everything you need to know about our wholesale fireworks, ordering, safety, and delivery.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group bg-[#121626] border border-white/10 rounded-2xl overflow-hidden hover:border-[#F5A623]/30 transition-colors"
          >
            <summary className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 list-none select-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#F5A623] shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-[#F5A623] transition-colors">
                  {faq.q}
                </h3>
              </div>
              <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#F5A623] group-open:rotate-45 transition-transform duration-200 text-lg font-bold shrink-0">
                +
              </span>
            </summary>
            <div className="px-6 pb-6 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
      </div>
    </section>
  )
}
