import { Link } from 'react-router-dom'
import { BellRing } from 'lucide-react'
import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { EmptyState } from '@/components/common/EmptyState'
import { formatDate, formatRelativeToToday } from '@/utils/formatters'
import { reminderUrgency } from '@/utils/reminderCalculations'
import { REMINDER_TYPE_LABELS } from '@/utils/constants'
import type { Reminder } from '@/types/reminder'

const URGENCY_TONE = { overdue: 'danger', soon: 'warning', upcoming: 'neutral' } as const

interface UpcomingRemindersProps {
  reminders: Reminder[]
  vehicleNameById: Map<string, string>
}

export function UpcomingReminders({ reminders, vehicleNameById }: UpcomingRemindersProps) {
  const upcoming = [...reminders].sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate)).slice(0, 5)

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-mist-100">Upcoming reminders</h3>
        <Link to="/calendar" className="text-xs font-semibold text-steel-600 hover:text-steel-700">
          View calendar
        </Link>
      </div>
      {upcoming.length === 0 ? (
        <EmptyState icon={<BellRing size={24} />} title="Nothing due" description="You're all caught up." />
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {upcoming.map((reminder) => {
            const urgency = reminderUrgency(reminder.nextDueDate)
            return (
              <li
                key={reminder.id}
                className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5"
              >
                <div>
                  <p className="text-sm font-semibold text-mist-100">
                    {reminder.label || REMINDER_TYPE_LABELS[reminder.type]}
                  </p>
                  <p className="text-xs text-mist-500">
                    {vehicleNameById.get(reminder.vehicleId)} · {formatDate(reminder.nextDueDate)}
                  </p>
                </div>
                <Badge tone={URGENCY_TONE[urgency]}>{formatRelativeToToday(reminder.nextDueDate)}</Badge>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
