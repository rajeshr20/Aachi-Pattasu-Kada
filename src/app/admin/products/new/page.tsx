'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    nameTa: '',
    slug: '',
    categoryId: '',
    mrp: '',
    offerPrice: '',
    unit: '1 box',
    stock: '100',
    inStock: true,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    description: '',
    descTa: '',
  })

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories) {
          setCategories(data.categories)
          if (data.categories.length > 0) {
            setForm(f => ({ ...f, categoryId: data.categories[0].id }))
          }
        }
      })
      .catch(console.error)
  }, [])

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setForm(f => ({
      ...f,
      name: val,
      slug: generateSlug(val),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          nameTa: form.nameTa || form.name,
          mrp: parseFloat(form.mrp),
          offerPrice: parseFloat(form.offerPrice),
          stock: parseInt(form.stock) || 0,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create product')
      }

      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Product</h1>
          <p className="text-xs text-gray-400">Create a new firecracker item in catalog</p>
        </div>
      </div>

      <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Product Name (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 50 Shots Sky Novelty"
                value={form.name}
                onChange={handleNameChange}
                className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Product Subtitle / Alternate Name
              </label>
              <input
                type="text"
                placeholder="e.g. 50 Shots Multi Color Sky Novelty"
                value={form.nameTa}
                onChange={e => setForm({ ...form, nameTa: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#F5A623]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                required
                placeholder="50-shots-sky-novelty"
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={form.categoryId}
                onChange={e => setForm({ ...form, categoryId: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#F5A623]"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                MRP (₹) *
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="1000"
                value={form.mrp}
                onChange={e => setForm({ ...form, mrp: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Our Price (₹) *
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="500"
                value={form.offerPrice}
                onChange={e => setForm({ ...form, offerPrice: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Unit
              </label>
              <input
                type="text"
                placeholder="1 box / 10 pcs"
                value={form.unit}
                onChange={e => setForm({ ...form, unit: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Stock Quantity
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#F5A623]"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2 border-t border-white/10">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={e => setForm({ ...form, inStock: e.target.checked })}
                className="w-4 h-4 accent-[#F5A623]"
              />
              In Stock
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-4 h-4 accent-[#F5A623]"
              />
              Featured Product
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
              <input
                type="checkbox"
                checked={form.isBestSeller}
                onChange={e => setForm({ ...form, isBestSeller: e.target.checked })}
                className="w-4 h-4 accent-[#F5A623]"
              />
              Bestseller
            </label>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <Link
              href="/admin/products"
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#F5A623] hover:bg-[#E67E22] text-[#0B0D1A] font-bold text-sm rounded-xl shadow-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
