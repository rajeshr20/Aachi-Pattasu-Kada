import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

import { DEFAULT_SETTINGS } from '@/lib/settings'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const all = await prisma.setting.findMany()
    const settings: Record<string, string> = { ...DEFAULT_SETTINGS }
    all.forEach(s => {
      settings[s.key] = s.value
    })
    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ settings: DEFAULT_SETTINGS })
  }
}
