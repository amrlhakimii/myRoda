import dayjs from 'dayjs'
import type { ReminderBasis } from '@/types/reminder'

export function computeNextDueDate(params: {
  basis: ReminderBasis
  intervalMonths?: number
  lastServiceDate?: string
  customDate?: string
}): string {
  const { basis, intervalMonths, lastServiceDate, customDate } = params
  if (basis === 'custom' && customDate) return customDate
  if (basis === 'interval' && intervalMonths) {
    const from = lastServiceDate ? dayjs(lastServiceDate) : dayjs()
    return from.add(intervalMonths, 'month').format('YYYY-MM-DD')
  }
  return dayjs().add(6, 'month').format('YYYY-MM-DD')
}

export function computeNextDueMileage(params: {
  mileageInterval?: number
  lastServiceMileage?: number
}): number | undefined {
  const { mileageInterval, lastServiceMileage } = params
  if (mileageInterval && lastServiceMileage !== undefined) {
    return lastServiceMileage + mileageInterval
  }
  return undefined
}

export type ReminderUrgency = 'overdue' | 'soon' | 'upcoming'

export function reminderUrgency(nextDueDate: string): ReminderUrgency {
  const daysLeft = dayjs(nextDueDate).startOf('day').diff(dayjs().startOf('day'), 'day')
  if (daysLeft < 0) return 'overdue'
  if (daysLeft <= 14) return 'soon'
  return 'upcoming'
}
