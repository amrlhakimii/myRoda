import { useState } from 'react'
import { Plus, BellRing, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { ReminderForm } from '@/components/forms/ReminderForm'
import { useReminders } from '@/hooks/useReminders'
import { createReminder, deleteReminder, updateReminder } from '@/services/firestore/reminders'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { formatDate, formatRelativeToToday } from '@/utils/formatters'
import { computeNextDueDate, computeNextDueMileage, reminderUrgency } from '@/utils/reminderCalculations'
import { REMINDER_TYPE_LABELS } from '@/utils/constants'
import type { Vehicle } from '@/types/vehicle'
import type { Reminder } from '@/types/reminder'
import type { ReminderFormValues } from '@/lib/validation/reminder'

const URGENCY_TONE = { overdue: 'danger', soon: 'warning', upcoming: 'neutral' } as const

export function RemindersTab({ vehicle }: { vehicle: Vehicle }) {
  const userId = useAuthStore((s) => s.user?.uid)
  const { data: reminders, isLoading } = useReminders(vehicle.id)
  const pushToast = useToastStore((s) => s.push)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null)
  const [deletingReminder, setDeletingReminder] = useState<Reminder | null>(null)

  const sorted = [...reminders].sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate))

  function openCreate() {
    setEditingReminder(null)
    setModalOpen(true)
  }

  function openEdit(reminder: Reminder) {
    setEditingReminder(reminder)
    setModalOpen(true)
  }

  function handleSubmit(values: ReminderFormValues) {
    if (!userId) return
    const nextDueDate = computeNextDueDate({
      basis: values.basis,
      intervalMonths: values.intervalMonths,
      lastServiceDate: values.lastServiceDate,
      customDate: values.customDate,
    })
    const nextDueMileage = computeNextDueMileage({
      mileageInterval: values.mileageInterval,
      lastServiceMileage: values.lastServiceMileage,
    })
    const input = {
      type: values.type,
      basis: values.basis,
      intervalMonths: values.intervalMonths,
      mileageInterval: values.mileageInterval,
      lastServiceDate: values.lastServiceDate,
      lastServiceMileage: values.lastServiceMileage,
      label: values.label,
      nextDueMileage,
    }
    setModalOpen(false)
    if (editingReminder) {
      updateReminder(editingReminder.id, { ...input, nextDueDate })
        .then(() => pushToast('Reminder updated'))
        .catch((error) =>
          pushToast(error instanceof Error ? error.message : 'Failed to save reminder', 'error'),
        )
    } else {
      createReminder(userId, vehicle.id, input, nextDueDate)
        .then(() => pushToast('Reminder set'))
        .catch((error) =>
          pushToast(error instanceof Error ? error.message : 'Failed to save reminder', 'error'),
        )
    }
  }

  function handleDelete() {
    if (!deletingReminder) return
    const reminder = deletingReminder
    setDeletingReminder(null)
    deleteReminder(reminder.id)
      .then(() => pushToast('Reminder removed'))
      .catch((error) =>
        pushToast(error instanceof Error ? error.message : 'Failed to remove reminder', 'error'),
      )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-mist-50">Reminders</h2>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} /> Add reminder
        </Button>
      </div>

      {isLoading ? (
        <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
      ) : sorted.length === 0 ? (
        <EmptyState
          icon={<BellRing size={28} />}
          title="No reminders yet"
          description="Set a service, road tax, or insurance reminder so you never miss a renewal."
          action={<Button onClick={openCreate}>Add reminder</Button>}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((reminder) => {
            const urgency = reminderUrgency(reminder.nextDueDate)
            return (
              <Card key={reminder.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-mist-50">
                      {reminder.label || REMINDER_TYPE_LABELS[reminder.type]}
                    </p>
                    <Badge tone="steel">{REMINDER_TYPE_LABELS[reminder.type]}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-mist-500">Due {formatDate(reminder.nextDueDate)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={URGENCY_TONE[urgency]}>{formatRelativeToToday(reminder.nextDueDate)}</Badge>
                  <button
                    onClick={() => openEdit(reminder)}
                    className="rounded-full p-1.5 text-mist-500 hover:bg-white/10 hover:text-mist-100"
                    aria-label="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeletingReminder(reminder)}
                    className="rounded-full p-1.5 text-mist-500 hover:bg-red-500/10 hover:text-red-400"
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingReminder ? 'Edit reminder' : 'Add reminder'}
      >
        <ReminderForm
          defaultValues={editingReminder ?? undefined}
          submitLabel={editingReminder ? 'Save changes' : 'Add reminder'}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deletingReminder)}
        title="Remove this reminder?"
        description="This will permanently delete the reminder."
        confirmLabel="Delete reminder"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeletingReminder(null)}
      />
    </div>
  )
}
