interface StatsBandProps {
  settings?: Record<string, string>
}

export default function StatsBand({ settings = {} }: StatsBandProps) {
  const stats = [
    {
      num: settings.stat1_num || '100%',
      label: settings.stat1_label || 'Direct Sivakasi Stock',
      sub: settings.stat1_sub || 'Fresh 2026 Batch',
    },
    {
      num: settings.stat2_num || '500+',
      label: settings.stat2_label || 'Cracker Varieties',
      sub: settings.stat2_sub || 'Across 16 categories',
    },
    {
      num: settings.stat3_num || '100%',
      label: settings.stat3_label || 'PESO Certified',
      sub: settings.stat3_sub || 'Govt. of India approved',
    },
    {
      num: settings.stat4_num || '₹3,000',
      label: settings.stat4_label || 'Min Order Value',
      sub: settings.stat4_sub || 'Wholesale rates for all',
    },
  ]

  return (
    <section className="w-full bg-[#F4EFE6]/60 border-b border-[#EAE5DC] py-8 sm:py-10">
      <div className="site-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="p-2 sm:p-3">
              <p className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">{s.num}</p>
              <p className="text-xs sm:text-sm font-bold text-[#0F172A] mt-1">{s.label}</p>
              <p className="text-[11px] text-[#64748B] font-medium">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
