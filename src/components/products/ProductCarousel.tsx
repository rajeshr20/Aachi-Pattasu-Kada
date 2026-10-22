'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'

interface ProductCarouselProps {
  eyebrow: string
  title: string
  viewAllLink: string
  viewAllText?: string
  products: any[]
  whatsappNumber?: string
}

export default function ProductCarousel({
  eyebrow,
  title,
  viewAllLink,
  viewAllText = 'View all products →',
  products,
  whatsappNumber,
}: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  if (!products || products.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const offset = direction === 'left' ? -320 : 320
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#EAE5DC]">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B6E99] hover:underline"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Carousel Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full bg-white border border-[#EAE5DC] hover:border-[#FFB300] flex items-center justify-center text-[#0F172A] shadow-xs cursor-pointer transition-colors"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full bg-white border border-[#EAE5DC] hover:border-[#FFB300] flex items-center justify-center text-[#0F172A] shadow-xs cursor-pointer transition-colors"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div ref={containerRef} className="carousel-snap">
          {products.map((p) => (
            <div key={p.id} className="carousel-item">
              <ProductCard product={p} whatsappNumber={whatsappNumber} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
