'use client'

export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <main className="min-h-screen bg-[#0B0D1A] text-white flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-5">
        <p className="text-[#F5A623] font-bold">Aachi Crackers</p>
        <h1 className="text-3xl font-bold">We’re having trouble loading this page</h1>
        <p className="text-gray-300">Please try again in a moment. For help with products or an order, call our shop.</p>
        <button onClick={() => retry()} className="rounded-xl bg-[#F5A623] px-6 py-3 font-bold text-[#0B0D1A]">Try again</button>
        <p><a href="tel:+919500565391" className="text-[#F5A623] underline">Call 95005 65391</a></p>
      </div>
    </main>
  )
}
