import { NextResponse } from 'next/server'
import { getDb, schema } from '../../../../../db'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await req.json()

    for (const [key, value] of Object.entries(settings)) {
      await getDb().insert(schema.setting).values({ key, value: String(value) })
        .onConflictDoUpdate({ target: schema.setting.key, set: { value: String(value) } })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
