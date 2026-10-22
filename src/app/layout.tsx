import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Aachi Crackers | Premium Firecrackers - Perumanallur',
    template: '%s | Aachi Crackers',
  },
  description: 'Best premium firecrackers at direct factory prices in Perumanallur. Opposite Aachi Mess. Call 95005 65391 for Diwali crackers, gift boxes, sparklers, aerial shots and flower pots.',
  keywords: ['Aachi Crackers', 'Perumanallur crackers', 'Diwali crackers', 'fireworks store', 'Sivakasi crackers Perumanallur', 'Aachi Pattasu Kadai'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Aachi Crackers',
    title: 'Aachi Crackers | Best Firecrackers in Perumanallur',
    description: 'Quality firecrackers at direct Sivakasi factory prices. Legal & 100% licensed. Fast delivery & store pickup. Order online or via WhatsApp.',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B0D1A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Aachi Crackers',
              alternateName: 'Aachi Pattasu Kadai',
              description: 'Best firecrackers at factory prices in Perumanallur',
              telephone: '+919500565391',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Opposite Aachi Mess',
                addressLocality: 'Perumanallur',
                addressRegion: 'Tamil Nadu',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '10.9526',
                longitude: '77.3411',
              },
              openingHours: 'Mo-Su 09:00-21:00',
              priceRange: '₹₹',
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
