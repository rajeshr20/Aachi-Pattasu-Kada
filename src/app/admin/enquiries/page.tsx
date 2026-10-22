import { prisma } from '@/lib/prisma'
import { MessageSquare, Phone, Mail, Clock, CheckCircle } from 'lucide-react'

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Customer Enquiries</h1>
        <p className="text-gray-400 text-sm">
          Incoming questions & quotation requests ({enquiries.length})
        </p>
      </div>

      <div className="space-y-4">
        {enquiries.length === 0 ? (
          <div className="bg-[#121626] border border-white/10 rounded-2xl p-12 text-center text-gray-400">
            No customer enquiries received yet.
          </div>
        ) : (
          enquiries.map(e => (
            <div
              key={e.id}
              className="bg-[#121626] border border-white/10 rounded-2xl p-6 hover:border-[#F5A623]/30 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F5A623]/10 text-[#F5A623] flex items-center justify-center font-bold text-sm">
                    {e.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{e.name}</h3>
                    <p className="text-xs text-gray-400">
                      {new Date(e.createdAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${e.phone}`}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#27AE60]/20 text-[#2ECC71] text-xs font-semibold border border-[#27AE60]/30 hover:bg-[#27AE60]/30 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call {e.phone}
                  </a>
                  <a
                    href={`https://wa.me/91${e.phone}?text=${encodeURIComponent(`Hi ${e.name}, thank you for contacting Aachi Pattasu Kadai.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366]/20 text-[#25D366] text-xs font-semibold border border-[#25D366]/30 hover:bg-[#25D366]/30 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed bg-[#0B0D1A] p-4 rounded-xl border border-white/5">
                {e.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
