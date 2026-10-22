'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Flame, Eye, EyeOff, AlertTriangle, ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: 'admin@aachipattasu.com', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      })
      if (res?.error) {
        setError('Invalid administrator email or password')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch {
      setError('Unable to authenticate. Please verify database connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#10172A] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[#D6B36A]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Return to website link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#B91C35] to-[#10172A] border border-[#D6B36A]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-red-950/40">
            <Flame className="w-8 h-8 text-[#D6B36A]" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Aachi Crackers</h1>
          <p className="text-xs font-bold tracking-widest text-[#D6B36A] uppercase mt-1">
            Store Management Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1E293B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-7 shadow-2xl space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-semibold text-gray-300">
            <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
            <span>Authorized Staff & Store Administrator Access</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-300 text-xs font-bold block mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="admin@aachipattasu.com"
                required
                autoComplete="email"
                className="w-full bg-[#0A0F1D] border border-white/15 focus:border-[#D6B36A] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-gray-300 text-xs font-bold block mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#0A0F1D] border border-white/15 focus:border-[#D6B36A] rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/25 rounded-xl p-3 text-red-400 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-black text-sm bg-[#B91C35] hover:bg-[#9E152B] text-white shadow-lg shadow-red-950/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <span>Sign In to Admin Dashboard</span>
              )}
            </button>
          </form>

          {/* Seed credentials hint */}
          <div className="bg-[#0A0F1D]/80 border border-white/5 rounded-xl p-3 text-[11px] text-gray-400 space-y-1">
            <span className="font-bold text-gray-300 block">Default System Credentials:</span>
            <div className="flex justify-between font-mono text-[10px] text-gray-400">
              <span>Email: admin@aachipattasu.com</span>
              <span>Pass: Admin@123456</span>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2026 Aachi Crackers, Perumanallur. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}
