import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'

// Proxy validates the signed JWT without importing credential lookup or Postgres.
const { auth } = NextAuth(authConfig)

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/admin')) {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
