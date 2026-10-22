'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, ShoppingBag, Package, Tags, Image, Users,
  MessageSquare, Settings, LogOut, Sparkles, Menu, X, ExternalLink
} from 'lucide-react'
import { useState } from 'react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/orders', label: 'Orders & Enquiries', icon: ShoppingBag },
  { href: '/admin/products', label: 'Products Catalog', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
  { href: '/admin/banners', label: 'Banners', icon: Image },
  { href: '/admin/enquiries', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Store Settings', icon: Settings },
]

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null }
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const NavContent = () => (
    <div className="flex flex-col h-full bg-[#0E1322] border-r border-white/10">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#B91C35] to-[#D6B36A] rounded-xl flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-extrabold text-white text-base tracking-tight">Aachi Admin</p>
            <p className="text-[#D6B36A] text-xs font-semibold">Store Management Portal</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {NAV.map(item => {
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? 'bg-[#B91C35] text-white shadow-lg shadow-[#B91C35]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}

        <div className="pt-4 border-t border-white/10 mt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <span>Live Customer Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* User + logout */}
      <div className="p-4 border-t border-white/10 bg-[#0A0E18]">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#D6B36A]/20 border border-[#D6B36A]/30 flex items-center justify-center text-[#D6B36A] text-sm font-extrabold">
            {user.name?.[0] || 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-bold truncate">{user.name || 'Store Manager'}</p>
            <p className="text-slate-400 text-xs truncate">{user.email || 'admin@aachipattasu.com'}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-red-500/20 text-xs font-bold transition-all border border-transparent hover:border-red-500/30"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out of Admin
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed top-0 left-0 bottom-0 z-40">
        <NavContent />
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0E1322] border-b border-white/10 flex items-center justify-between px-5 h-14">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gradient-to-br from-[#B91C35] to-[#D6B36A] rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">Aachi Admin</span>
        </div>
        <button
          onClick={() => setOpen(o => !o)}
          className="text-slate-300 hover:text-white p-1.5 rounded-lg bg-white/5"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="lg:hidden fixed top-0 left-0 bottom-0 w-64 z-50 flex flex-col">
            <NavContent />
          </aside>
        </>
      )}
    </>
  )
}
