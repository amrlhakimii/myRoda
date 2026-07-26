import { Wrench, Fuel, Gauge, CalendarClock } from 'lucide-react'
import { StatTile } from '@/components/common/StatTile'
import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { useServiceRecords } from '@/hooks/useServiceRecords'
import { useFuelRecords } from '@/hooks/useFuelRecords'
import { useReminders } from '@/hooks/useReminders'
import { formatCurrency, formatDate, formatMileage, formatRelativeToToday } from '@/utils/formatters'
import { reminderUrgency } from '@/utils/reminderCalculations'
import { REMINDER_TYPE_LABELS } from '@/utils/constants'
import type { Vehicle } from '@/types/vehicle'

export function OverviewTab({ vehicle }: { vehicle: Vehicle }) {
  const { data: serviceRecords } = useServiceRecords(vehicle.id)
  const { data: fuelRecords } = useFuelRecords(vehicle.id)
  const { data: reminders } = useReminders(vehicle.id)

  const totalServiceCost = serviceRecords.reduce((sum, r) => sum + r.totalCost, 0)
  const totalFuelCost = fuelRecords.reduce((sum, r) => sum + r.totalPrice, 0)
  const lastService = [...serviceRecords].sort((a, b) => b.date.localeCompare(a.date))[0]
  const upcomingReminders = [...reminders]
    .sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate))
    .slice(0, 3)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Current mileage" value={formatMileage(vehicle.mileage)} icon={<Gauge size={18} />} />
        <StatTile
          label="Total service cost"
          value={formatCurrency(totalServiceCost)}
          icon={<Wrench size={18} />}
        />
        <StatTile label="Total fuel cost" value={formatCurrency(totalFuelCost)} icon={<Fuel size={18} />} />
        <StatTile
          label="Last service"
          value={lastService ? formatDate(lastService.date, 'D MMM') : '—'}
          icon={<CalendarClock size={18} />}
        />
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-bold text-navy-800">Vehicle details</h3>
        <dl className="mt-3 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-navy-400">Brand</dt>
            <dd className="font-medium text-navy-800">{vehicle.brand}</dd>
          </div>
          <div>
            <dt className="text-navy-400">Model</dt>
            <dd className="font-medium text-navy-800">{vehicle.model}</dd>
          </div>
          <div>
            <dt className="text-navy-400">Year</dt>
            <dd className="font-medium text-navy-800">{vehicle.year}</dd>
          </div>
          <div>
            <dt className="text-navy-400">Registration</dt>
            <dd className="font-medium text-navy-800">{vehicle.registrationNumber}</dd>
          </div>
        </dl>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-bold text-navy-800">Upcoming reminders</h3>
        {upcomingReminders.length === 0 ? (
          <p className="mt-2 text-sm text-navy-500">No reminders set for this vehicle yet.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {upcomingReminders.map((reminder) => {
              const urgency = reminderUrgency(reminder.nextDueDate)
              return (
                <li
                  key={reminder.id}
                  className="flex items-center justify-between rounded-xl bg-mist-50 px-3.5 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-navy-800">
                      {reminder.label || REMINDER_TYPE_LABELS[reminder.type]}
                    </p>
                    <p className="text-xs text-navy-400">{formatDate(reminder.nextDueDate)}</p>
                  </div>
                  <Badge tone={urgency === 'overdue' ? 'danger' : urgency === 'soon' ? 'warning' : 'neutral'}>
                    {formatRelativeToToday(reminder.nextDueDate)}
                  </Badge>
                </li>
              )
            })}
          </ul>
        )}
      </Card>
    </div>
  )
}
