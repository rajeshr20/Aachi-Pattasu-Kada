import { NextResponse } from 'next/server'
import { getDb } from '../../../../db'

export async function GET() {
  try {
    const all = await getDb().query.setting.findMany()
    const settings: Record<string, string> = {}
    all.forEach(s => {
      settings[s.key] = s.value
    })
    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Settings API error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}
