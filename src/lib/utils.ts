import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function calcDiscount(mrp: number, offerPrice: number): number {
  if (mrp <= 0) return 0
  return Math.round(((mrp - offerPrice) / mrp) * 100)
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `APK-${year}-${rand}`
}

export function formatPhoneDisplay(phone: string): string {
  const clean = phone.replace(/\D/g, '')
  if (clean.length === 10) {
    return `${clean.slice(0, 5)} ${clean.slice(5)}`
  }
  return phone
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const clean = phone.replace(/\D/g, '')
  const number = clean.startsWith('91') ? clean : `91${clean}`
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
