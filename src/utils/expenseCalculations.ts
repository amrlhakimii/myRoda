import dayjs from 'dayjs'
import type { ServiceRecord } from '@/types/service'
import type { FuelRecord } from '@/types/fuel'

export interface MonthlyExpense {
  month: string
  label: string
  service: number
  fuel: number
}

export function buildMonthlyExpenses(
  serviceRecords: ServiceRecord[],
  fuelRecords: FuelRecord[],
  monthsBack = 6,
): MonthlyExpense[] {
  const months: MonthlyExpense[] = []
  for (let i = monthsBack - 1; i >= 0; i--) {
    const m = dayjs().subtract(i, 'month')
    months.push({ month: m.format('YYYY-MM'), label: m.format('MMM'), service: 0, fuel: 0 })
  }
  const byMonth = new Map(months.map((m) => [m.month, m]))

  serviceRecords.forEach((r) => {
    const entry = byMonth.get(dayjs(r.date).format('YYYY-MM'))
    if (entry) entry.service += r.totalCost
  })
  fuelRecords.forEach((r) => {
    const entry = byMonth.get(dayjs(r.date).format('YYYY-MM'))
    if (entry) entry.fuel += r.totalPrice
  })

  return months
}

export function buildServiceFrequency(
  serviceRecords: ServiceRecord[],
  monthsBack = 6,
): { month: string; label: string; count: number }[] {
  const months: { month: string; label: string; count: number }[] = []
  for (let i = monthsBack - 1; i >= 0; i--) {
    const m = dayjs().subtract(i, 'month')
    months.push({ month: m.format('YYYY-MM'), label: m.format('MMM'), count: 0 })
  }
  const byMonth = new Map(months.map((m) => [m.month, m]))
  serviceRecords.forEach((r) => {
    const entry = byMonth.get(dayjs(r.date).format('YYYY-MM'))
    if (entry) entry.count += 1
  })
  return months
}
