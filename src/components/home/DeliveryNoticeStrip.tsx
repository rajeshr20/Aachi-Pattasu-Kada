import { Truck } from 'lucide-react'

interface DeliveryNoticeProps {
  notice?: string
  settings?: Record<string, string>
}

export default function DeliveryNoticeStrip({ notice, settings = {} }: DeliveryNoticeProps) {
  const text =
    notice ||
    settings.delivery_notice ||
    'DELIVERY NOTICE: Transport charges applicable to customers (to be either paid to transport when collecting or paid when booking, depending on transporter only).'

  return (
    <div className="w-full bg-[#FFF8E7] border-y border-[#FFE8A3] py-3.5 px-4 text-[#855B00] text-xs sm:text-sm font-medium">
      <div className="site-container flex items-center justify-center gap-2.5 text-center">
        <Truck className="w-4 h-4 shrink-0 text-[#B87A00]" />
        <span>{text}</span>
      </div>
    </div>
  )
}
