import { getDb } from '../../db'

export type Settings = Record<string, string>

export async function getSettings(): Promise<Settings> {
  const settings = await getDb().query.setting.findMany()
  return settings.reduce((acc, s) => {
    acc[s.key] = s.value
    return acc
  }, {} as Settings)
}

export async function getSetting(key: string, fallback = ''): Promise<string> {
  const s = await getDb().query.setting.findFirst({ where: { key } })
  return s?.value ?? fallback
}
