import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-[#080A14] flex">
      <AdminSidebar user={session.user} />
      <main className="flex-1 min-w-0 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
