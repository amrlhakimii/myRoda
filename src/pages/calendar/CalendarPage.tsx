import { useMemo, useState } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { EmptyState } from '@/components/common/EmptyState'
import { useVehicles } from '@/hooks/useVehicles'
import { useRemindersByUser } from '@/hooks/useReminders'
import { useServiceRecordsByUser } from '@/hooks/useServiceRecords'
import { formatDate, formatRelativeToToday } from '@/utils/formatters'
import { reminderUrgency } from '@/utils/reminderCalculations'
import { REMINDER_TYPE_LABELS } from '@/utils/constants'

const URGENCY_TONE = { overdue: 'danger', soon: 'warning', upcoming: 'neutral' } as const

export function CalendarPage() {
  const { data: vehicles } = useVehicles()
  const { data: reminders } = useRemindersByUser()
  const { data: serviceRecords } = useServiceRecordsByUser()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const vehicleNameById = useMemo(
    () => new Map(vehicles.map((v) => [v.id, v.nickname || `${v.brand} ${v.model}`])),
    [vehicles],
  )

  const reminderDatesSet = useMemo(() => new Set(reminders.map((r) => r.nextDueDate)), [reminders])
  const serviceDatesSet = useMemo(() => new Set(serviceRecords.map((r) => r.date)), [serviceRecords])

  const selectedKey = dayjs(selectedDate).format('YYYY-MM-DD')
  const remindersOnDate = reminders.filter((r) => r.nextDueDate === selectedKey)
  const servicesOnDate = serviceRecords.filter((r) => r.date === selectedKey)

  const upcoming = [...reminders].sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate)).slice(0, 6)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-navy-900">Maintenance calendar</h1>
        <p className="mt-1 text-sm text-navy-500">
          Every past service and upcoming due date, across all your vehicles.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-4">
          <Calendar
            value={selectedDate}
            onChange={(value) => setSelectedDate(value as Date)}
            className="myroda-calendar"
            tileContent={({ date }) => {
              const key = dayjs(date).format('YYYY-MM-DD')
              const hasReminder = reminderDatesSet.has(key)
              const hasService = serviceDatesSet.has(key)
              if (!hasReminder && !hasService) return null
              return (
                <div className="mt-1 flex justify-center gap-1">
                  {hasService && <span className="h-1.5 w-1.5 rounded-full bg-steel-500" />}
                  {hasReminder && <span className="h-1.5 w-1.5 rounded-full bg-blush-500" />}
                </div>
              )
            }}
          />
          <div className="mt-4 flex items-center gap-4 text-xs text-navy-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-steel-500" /> Service done
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blush-500" /> Reminder due
            </span>
          </div>

          <div className="mt-5 border-t border-mist-200 pt-4">
            <h3 className="text-sm font-bold text-navy-800">{formatDate(selectedDate.toISOString())}</h3>
            {remindersOnDate.length === 0 && servicesOnDate.length === 0 ? (
              <p className="mt-2 text-sm text-navy-500">Nothing recorded for this date.</p>
            ) : (
              <div className="mt-3 flex flex-col gap-2">
                {servicesOnDate.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-xl bg-steel-50 px-3.5 py-2.5 text-sm"
                  >
                    <span className="font-medium text-navy-800">{s.workshopName}</span>
                    <span className="text-navy-500">{vehicleNameById.get(s.vehicleId)}</span>
                  </div>
                ))}
                {remindersOnDate.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between rounded-xl bg-blush-50 px-3.5 py-2.5 text-sm"
                  >
                    <span className="font-medium text-navy-800">
                      {r.label || REMINDER_TYPE_LABELS[r.type]}
                    </span>
                    <span className="text-navy-500">{vehicleNameById.get(r.vehicleId)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-bold text-navy-800">Upcoming reminders</h3>
          {upcoming.length === 0 ? (
            <EmptyState
              icon={<CalendarDays size={26} />}
              title="Nothing scheduled"
              description="Set a reminder from any vehicle to see it here."
            />
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {upcoming.map((reminder) => {
                const urgency = reminderUrgency(reminder.nextDueDate)
                return (
                  <li key={reminder.id} className="rounded-xl bg-mist-50 px-3.5 py-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-navy-800">
                        {reminder.label || REMINDER_TYPE_LABELS[reminder.type]}
                      </p>
                      <Badge tone={URGENCY_TONE[urgency]}>{formatRelativeToToday(reminder.nextDueDate)}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-navy-400">
                      {vehicleNameById.get(reminder.vehicleId)} · {formatDate(reminder.nextDueDate)}
                    </p>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
