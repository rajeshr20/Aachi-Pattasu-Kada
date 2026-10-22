import { prisma } from './prisma'

export type Settings = Record<string, string>

export const DEFAULT_SETTINGS: Settings = {
  shop_name: 'Aachi Crackers',
  shop_name_ta: 'Aachi Crackers',
  tagline: 'Your Diwali, Our Spark',
  tagline_ta: 'Factory Direct Genuine Sivakasi Fireworks',
  phone1: '9500565391',
  phone2: '7708632966',
  whatsapp: '9500565391',
  address: 'Opposite Aachi Mess, Perumanallur, Tirupur, Tamil Nadu',
  address_ta: 'Opposite Aachi Mess, Perumanallur, Tirupur, Tamil Nadu',
  map_link: 'https://maps.google.com/?q=Perumanallur',
  min_order: '3000',
  opening_hours: '9:00 AM - 9:00 PM (All 7 Days)',
  is_coming_soon: 'false',
  diwali_date: '2026-10-20',
  legal_notice:
    'Online sale of fireworks is strictly regulated in India. We operate as an enquiry and quotation platform complying with all statutory norms. Orders are confirmed over phone/WhatsApp.',
}

export async function getSettings(): Promise<Settings> {
  try {
    const settings = await prisma.setting.findMany()
    const result = settings.reduce((acc, s) => {
      acc[s.key] = s.value
      return acc
    }, {} as Settings)
    return { ...DEFAULT_SETTINGS, ...result }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export async function getSetting(key: string, fallback = ''): Promise<string> {
  try {
    const s = await prisma.setting.findUnique({ where: { key } })
    return s?.value ?? DEFAULT_SETTINGS[key] ?? fallback
  } catch {
    return DEFAULT_SETTINGS[key] ?? fallback
  }
}
