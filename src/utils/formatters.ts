import dayjs from 'dayjs'

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(amount)
}

export function formatDate(date: string | Date, pattern = 'D MMM YYYY') {
  return dayjs(date).format(pattern)
}

export function formatMileage(mileage: number) {
  return `${new Intl.NumberFormat('en-MY').format(Math.round(mileage))} km`
}

export function formatRelativeToToday(date: string) {
  const target = dayjs(date).startOf('day')
  const today = dayjs().startOf('day')
  const diff = target.diff(today, 'day')
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  if (diff > 0) return `In ${diff} days`
  return `${Math.abs(diff)} days overdue`
}
