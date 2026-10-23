'use client'

import { useState, useEffect } from 'react'
import { Save, CheckCircle, AlertCircle } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings) {
          setSettings(data.settings)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (key: string, val: string) => {
    setSettings(s => ({ ...s, [key]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error('Failed to save settings')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-gray-400 py-12 text-center">Loading settings...</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-12 lg:pt-0 pb-16">
      {/* Page Header */}
      <div className="space-y-1.5 pb-6 border-b border-white/10">
        <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-bold">
          System & Store Configuration
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Store Settings
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
          Configure shop branding, direct WhatsApp lines, opening hours, delivery notices, and checkout minimum order thresholds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {saved && (
          <div className="flex items-center gap-3 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-300 text-sm font-semibold shadow-sm">
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>Settings updated and saved successfully!</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-300 text-sm font-semibold shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Basic Shop Info */}
        <div className="bg-[#121626] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-xs font-bold text-[#D6B36A] uppercase tracking-wider">
              Store Identity & Branding
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Name and tagline displayed across customer storefront and PDF invoices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Shop Name (English)</label>
              <input
                type="text"
                value={settings.shop_name || ''}
                onChange={e => handleChange('shop_name', e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D6B36A] transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Shop Name (Tamil / Brand)</label>
              <input
                type="text"
                value={settings.shop_name_ta || ''}
                onChange={e => handleChange('shop_name_ta', e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D6B36A] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Primary Tagline</label>
              <input
                type="text"
                value={settings.tagline || ''}
                onChange={e => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D6B36A] transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Secondary Tagline / Subtitle</label>
              <input
                type="text"
                value={settings.tagline_ta || ''}
                onChange={e => handleChange('tagline_ta', e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D6B36A] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="bg-[#121626] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-xs font-bold text-[#D6B36A] uppercase tracking-wider">
              Phone & WhatsApp Hotlines
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct numbers for customer enquiry calls and WhatsApp order confirmations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Primary Phone</label>
              <input
                type="text"
                value={settings.phone1 || ''}
                onChange={e => handleChange('phone1', e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#D6B36A] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Secondary Phone</label>
              <input
                type="text"
                value={settings.phone2 || ''}
                onChange={e => handleChange('phone2', e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsapp || ''}
                onChange={e => handleChange('whatsapp', e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Address</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={e => handleChange('address', e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Address Landmark</label>
              <input
                type="text"
                value={settings.address_ta || ''}
                onChange={e => handleChange('address_ta', e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Order & Business Rules */}
        <div className="bg-[#121626] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-[#F5A623] uppercase tracking-wider text-xs">
            Order Rules & Store Mode
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Minimum Order Value (₹)</label>
              <input
                type="number"
                value={settings.min_order || '3000'}
                onChange={e => handleChange('min_order', e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Store Hours</label>
              <input
                type="text"
                value={settings.opening_hours || '9:00 AM - 9:00 PM'}
                onChange={e => handleChange('opening_hours', e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Website Mode</label>
              <select
                value={settings.is_coming_soon || 'false'}
                onChange={e => handleChange('is_coming_soon', e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm"
              >
                <option value="false">Active - Taking Orders</option>
                <option value="true">Coming Soon Mode</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Legal Disclaimer Notice</label>
            <textarea
              rows={3}
              value={settings.legal_notice || ''}
              onChange={e => handleChange('legal_notice', e.target.value)}
              className="w-full px-4 py-2 bg-[#0B0D1A] border border-white/10 rounded-xl text-white text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#F5A623] hover:bg-[#E67E22] text-[#0B0D1A] font-bold text-sm rounded-xl shadow-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
