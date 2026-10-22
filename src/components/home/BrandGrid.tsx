'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Award, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface Brand {
  id: string
  name: string
  nameTa?: string | null
  slug: string
}

interface BrandGridProps {
  brands?: Brand[]
}

const DEFAULT_BRANDS: Brand[] = [
  { id: 'b-standard', name: 'Standard Fireworks', nameTa: 'ஸ்டாண்டர்ட் பட்டாசு', slug: 'standard-fireworks' },
  { id: 'b-sony', name: 'Sony Fireworks', nameTa: 'சோனி பட்டாசு', slug: 'sony-fireworks' },
  { id: 'b-coronation', name: 'Coronation Fireworks', nameTa: 'கொரோனேஷன் பட்டாசு', slug: 'coronation-fireworks' },
  { id: 'b-muthu', name: 'Muthu Fireworks', nameTa: 'முத்து பட்டாசு', slug: 'muthu-fireworks' },
  { id: 'b-ayyan', name: 'Ayyan Fireworks', nameTa: 'அய்யன் பட்டாசு', slug: 'ayyan-fireworks' },
]

export default function BrandGrid({ brands = DEFAULT_BRANDS }: BrandGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { locale } = useLanguage()

  const list = brands && brands.length > 0 ? brands : DEFAULT_BRANDS

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const offset = direction === 'left' ? -260 : 260
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#EAE5DC]">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="section-eyebrow">
              {locale === 'ta' ? 'அங்கீகரிக்கப்பட்ட நிறுவனங்கள்' : 'ASSOCIATED MANUFACTURERS'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              {locale === 'ta' ? 'பிராண்டுகள் வாரியாக வாங்க' : 'Shop by brand'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
              {locale === 'ta'
                ? 'சிவகாசியின் முன்னணி பட்டாசு தயாரிப்பாளர்களிடமிருந்து நேரடி தரம்.'
                : 'Browse premium collections directly from trusted Sivakasi manufacturers.'}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white border border-[#EAE5DC] hover:border-[#FFB300] flex items-center justify-center text-[#0F172A] shadow-xs cursor-pointer transition-colors"
              aria-label="Previous brands"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white border border-[#EAE5DC] hover:border-[#FFB300] flex items-center justify-center text-[#0F172A] shadow-xs cursor-pointer transition-colors"
              aria-label="Next brands"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brands Carousel */}
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {list.map((brand) => {
            const displayName = locale === 'ta' && brand.nameTa ? brand.nameTa : brand.name

            return (
              <Link
                key={brand.id}
                href={`/catalogue?brand=${brand.slug}`}
                className="group shrink-0 w-52 sm:w-60 bg-white rounded-2xl border border-[#EAE5DC] p-6 flex flex-col items-center text-center hover:border-[#FFB300] hover:shadow-md transition-all duration-300"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Brand emblem circle */}
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 group-hover:bg-[#FFB300] group-hover:text-slate-900 transition-all duration-300">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <h3 className="font-extrabold text-[#0F172A] text-sm sm:text-base leading-snug mb-1 group-hover:text-[#0B6E99] transition-colors">
                  {displayName}
                </h3>

                <span className="text-[11px] sm:text-xs font-bold text-[#0B6E99] group-hover:underline mt-2 inline-flex items-center gap-1">
                  {locale === 'ta' ? 'தயாரிப்புகளை காண்க →' : 'Explore collection →'}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
