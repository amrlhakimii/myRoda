import dayjs from 'dayjs'
import type { FuelRecord } from '@/types/fuel'

export interface ConsumptionEntry {
  record: FuelRecord
  distance: number | null
  kmPerLitre: number | null
}

export function computeConsumption(records: FuelRecord[]): ConsumptionEntry[] {
  const sorted = [...records].sort((a, b) => a.mileage - b.mileage)
  return sorted.map((record, index) => {
    const previous = sorted[index - 1]
    if (!previous) return { record, distance: null, kmPerLitre: null }
    const distance = record.mileage - previous.mileage
    const kmPerLitre = distance > 0 && record.litres > 0 ? distance / record.litres : null
    return { record, distance, kmPerLitre }
  })
}

export function averageConsumption(entries: ConsumptionEntry[]): number | null {
  const valid = entries.filter(
    (e): e is ConsumptionEntry & { kmPerLitre: number } => e.kmPerLitre !== null,
  )
  if (valid.length === 0) return null
  return valid.reduce((sum, e) => sum + e.kmPerLitre, 0) / valid.length
}

export function averageMonthlyFuelCost(records: FuelRecord[]): number {
  if (records.length === 0) return 0
  const byMonth = new Map<string, number>()
  records.forEach((r) => {
    const key = dayjs(r.date).format('YYYY-MM')
    byMonth.set(key, (byMonth.get(key) ?? 0) + r.totalPrice)
  })
  const totals = Array.from(byMonth.values())
  return totals.reduce((sum, v) => sum + v, 0) / totals.length
}
