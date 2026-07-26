import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Button } from '@/components/common/Button'
import {
  reminderFormSchema,
  type ReminderFormInput,
  type ReminderFormValues,
} from '@/lib/validation/reminder'
import { REMINDER_INTERVAL_OPTIONS, REMINDER_TYPE_LABELS } from '@/utils/constants'

interface ReminderFormProps {
  defaultValues?: Partial<ReminderFormValues>
  onSubmit: (values: ReminderFormValues) => Promise<void> | void
  onCancel: () => void
  submitLabel?: string
}

export function ReminderForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Save reminder',
}: ReminderFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReminderFormInput, unknown, ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      type: 'service',
      basis: 'interval',
      intervalMonths: 6,
      lastServiceDate: new Date().toISOString().slice(0, 10),
      label: '',
      ...defaultValues,
    },
  })

  const basis = watch('basis')

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <Select label="Reminder for" error={errors.type?.message} {...register('type')}>
          {Object.entries(REMINDER_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select label="Repeats by" error={errors.basis?.message} {...register('basis')}>
          <option value="interval">Time interval</option>
          <option value="mileage">Mileage</option>
          <option value="custom">Custom date</option>
        </Select>
      </div>

      {basis === 'interval' && (
        <div className="grid grid-cols-2 gap-4">
          <Select label="Every" error={errors.intervalMonths?.message} {...register('intervalMonths')}>
            {REMINDER_INTERVAL_OPTIONS.map((opt) => (
              <option key={opt.months} value={opt.months}>
                {opt.label}
              </option>
            ))}
          </Select>
          <Input
            label="From date"
            type="date"
            error={errors.lastServiceDate?.message}
            {...register('lastServiceDate')}
          />
        </div>
      )}

      {basis === 'mileage' && (
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Every (km)"
            type="number"
            placeholder="10000"
            error={errors.mileageInterval?.message}
            {...register('mileageInterval')}
          />
          <Input
            label="From mileage (km)"
            type="number"
            error={errors.lastServiceMileage?.message}
            {...register('lastServiceMileage')}
          />
        </div>
      )}

      {basis === 'custom' && (
        <Input label="Due date" type="date" error={errors.customDate?.message} {...register('customDate')} />
      )}

      <Input
        label="Label (optional)"
        placeholder="e.g. Front tyre rotation"
        error={errors.label?.message}
        {...register('label')}
      />

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
