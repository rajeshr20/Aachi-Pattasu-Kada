import { auth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Unauthenticated requests (such as the admin login screen) render cleanly without sidebar or redirect loop
  if (!session?.user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#0A0F1D] flex text-white">
      <AdminSidebar user={session.user} />
      <main className="flex-1 min-w-0 lg:ml-64 p-6 sm:p-10">
        {children}
      </main>
    </div>
  )
}
