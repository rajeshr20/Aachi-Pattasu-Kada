'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Locale = 'ta' | 'en'

interface LanguageContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string, fallback?: string) => string
}

const TRANSLATIONS: Record<Locale, Record<string, string>> = {
  ta: {
    // Nav
    'nav.home': 'முகப்பு',
    'nav.catalogue': 'பட்டாசு பட்டியல்',
    'nav.help': 'உதவி',
    'nav.bulk': 'மொத்த ஆர்டர்கள்',
    'nav.cart': 'ஆர்டர் பட்டியல்',
    'nav.login': 'உள்நுழை',

    // Hero
    'hero.badge': '★ சிவகாசி நேரடி மொத்த விலை பட்டாசுகள் ★',
    'hero.celebrate': 'கொண்டாடுங்கள்',
    'hero.with': 'உடன்',
    'hero.subtitle': 'சிவகாசியிலிருந்து நேரடியாக தொழிற்சாலை மொத்த விலையில் பாதுகாப்பான, தரமான பசுமைப் பட்டாசுகள்.',
    'hero.shop_now': 'பட்டாசுகளை காண்க →',
    'hero.bulk_weddings': 'மொத்த & திருமண ஆர்டர்கள்',

    // Delivery notice
    'delivery.notice': 'போக்குவரத்து கட்டணங்கள் வாடிக்கையாளரால் நேரடியாக லாரி/டிரான்ஸ்போர்ட் நிறுவனத்திடம் செலுத்தப்பட வேண்டும்.',

    // Sections
    'section.bestsellers_eyebrow': 'அதிக வரவேற்பு பெற்றவை',
    'section.bestsellers_title': 'அனைத்து காலங்களின் சிறந்த பட்டாசுகள்',
    'section.view_all': 'அனைத்தையும் காண்க →',
    'section.new_eyebrow': 'புதிய வரவு 2026',
    'section.new_title': 'புதிய தலைமுறை பட்டாசுகள்',
    'section.featured_eyebrow': 'தேர்ந்தெடுக்கப்பட்டவை',
    'section.featured_title': 'இந்த பருவத்தின் சிறப்பு பட்டாசுகள்',
    'section.categories_eyebrow': 'வகைகள்',
    'section.categories_title': 'பட்டாசு வகைகள் வாரியாக',
    'section.brands_eyebrow': 'பிராண்டுகள்',
    'section.brands_title': 'நம்பகமான தயாரிப்பாளர்கள்',
    'section.how_eyebrow': 'எளிய வழிமுறை',
    'section.how_title': 'ஆர்டர் செய்வது எப்படி?',
    'section.promise_eyebrow': 'ஆச்சி உறுதிமொழி',
    'section.promise_title': 'எங்களை ஏன் தேர்வு செய்ய வேண்டும்?',
    'section.faq_eyebrow': 'கேள்விகள்',
    'section.faq_title': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',

    // Product Card
    'card.add': 'ஆர்டரில் சேர்க்க',
    'card.added': 'சேர்க்கப்பட்டது',
    'card.bestseller': 'டாப் விற்பனை',
    'card.new_release': 'புதிய வரவு',
    'card.featured': 'சிறப்பு',
    'card.out_of_stock': 'கையிருப்பு இல்லை',
    'card.notify': 'வாட்ஸ்அப்பில் தெரிவிக்க',
    'card.peso': 'PESO உரிமம் பெற்றது',
    'card.from': 'இருந்து',
    'card.save': 'சேமிப்பு',
    'card.wholesale_rule': '10+ வாங்கினால் மொத்த விலை',

    // Cart
    'cart.title': 'உங்கள் ஆர்டர் பட்டியல்',
    'cart.empty': 'கார்ட் காலியாக உள்ளது',
    'cart.min_order_warning': 'குறைந்தபட்ச ஆர்டர்: ₹3,000 — ஆர்டரை உறுதி செய்ய இன்னும் ₹{amt} சேர்க்கவும்.',
    'cart.subtotal': 'மொத்த தொகை',
    'cart.discount': 'தள்ளுபடி',
    'cart.total': 'இறுதி தொகை',
    'cart.checkout': 'ஆர்டரை சமர்ப்பிக்கவும்',
    'cart.coupon_placeholder': 'கூப்பன் குறியீடு (எ.கா. WELCOME5)',
    'cart.apply': 'பயன்படுத்து',

    // Floating WhatsApp
    'whatsapp.chat': 'வாட்ஸ்அப்பில் விசாரிக்க',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.catalogue': 'Catalogue',
    'nav.help': 'Help & FAQ',
    'nav.bulk': 'Bulk Orders',
    'nav.cart': 'Order List',
    'nav.login': 'Login',

    // Hero
    'hero.badge': '★ SIVAKASI DIRECT WHOLESALE CRACKERS ★',
    'hero.celebrate': 'Celebrate with',
    'hero.with': '',
    'hero.subtitle': 'Direct-from-factory Sivakasi green crackers at transparent wholesale prices. Safe, certified, and delivered to your doorstep.',
    'hero.shop_now': 'Shop the collection →',
    'hero.bulk_weddings': 'Bulk & Weddings',

    // Delivery notice
    'delivery.notice': 'Transport charges are paid by the customer, either to the transporter on collection or at booking, depending on the transporter.',

    // Sections
    'section.bestsellers_eyebrow': 'HOT & TRENDING',
    'section.bestsellers_title': 'All-Time Bestsellers',
    'section.view_all': 'View all products →',
    'section.new_eyebrow': 'FRESH RELEASES 2026',
    'section.new_title': 'Newly Released Products',
    'section.featured_eyebrow': 'HAND-PICKED',
    'section.featured_title': "This Season's Favourites",
    'section.categories_eyebrow': 'BROWSE BY CATEGORY',
    'section.categories_title': 'Shop by Cracker Category',
    'section.brands_eyebrow': 'MANUFACTURERS',
    'section.brands_title': 'Shop by Brand',
    'section.how_eyebrow': 'SIMPLE PROCESS',
    'section.how_title': 'How It Works',
    'section.promise_eyebrow': 'THE AACHI PROMISE',
    'section.promise_title': 'Why Thousands Choose Us',
    'section.faq_eyebrow': 'HELP CENTER',
    'section.faq_title': 'Frequently Asked Questions',

    // Product Card
    'card.add': 'Add to Order',
    'card.added': 'Added to Order',
    'card.bestseller': 'BESTSELLER',
    'card.new_release': 'NEW RELEASE',
    'card.featured': 'FEATURED',
    'card.out_of_stock': 'OUT OF STOCK',
    'card.notify': 'Notify on WhatsApp',
    'card.peso': 'PESO Licensed',
    'card.from': 'From',
    'card.save': 'Save',
    'card.wholesale_rule': '10+ units wholesale auto-applied',

    // Cart
    'cart.title': 'Your Order List',
    'cart.empty': 'Your cart is empty',
    'cart.min_order_warning': 'Minimum Order: ₹3,000 — Add ₹{amt} more to unlock checkout.',
    'cart.subtotal': 'Subtotal',
    'cart.discount': 'Discount',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Place Order',
    'cart.coupon_placeholder': 'Coupon code (e.g. WELCOME5)',
    'cart.apply': 'Apply',

    // Floating WhatsApp
    'whatsapp.chat': 'Chat on WhatsApp',
  },
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'ta',
  setLocale: () => {},
  t: (k: string) => k,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ta') // Tamil default

  useEffect(() => {
    const saved = localStorage.getItem('aachi_lang') as Locale
    if (saved === 'ta' || saved === 'en') {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('aachi_lang', l)
  }

  const t = (key: string, fallback?: string): string => {
    return TRANSLATIONS[locale]?.[key] || fallback || TRANSLATIONS.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
