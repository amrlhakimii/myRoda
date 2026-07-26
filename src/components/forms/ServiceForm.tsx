import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { clsx } from 'clsx'
import { Input } from '@/components/common/Input'
import { Textarea } from '@/components/common/Textarea'
import { Button } from '@/components/common/Button'
import {
  serviceFormSchema,
  type ServiceFormInput,
  type ServiceFormValues,
} from '@/lib/validation/service'
import { DEFAULT_SERVICE_COMPONENTS } from '@/utils/constants'

interface ServiceFormProps {
  defaultValues?: Partial<ServiceFormValues>
  onSubmit: (values: ServiceFormValues) => Promise<void> | void
  onCancel: () => void
  submitLabel?: string
}

export function ServiceForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Save service record',
}: ServiceFormProps) {
  const [customComponent, setCustomComponent] = useState('')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormInput, unknown, ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
      mileage: 0,
      workshopName: '',
      workshopLocation: '',
      totalCost: 0,
      notes: '',
      items: [],
      ...defaultValues,
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  function toggleDefaultComponent(name: string) {
    const existingIndex = fields.findIndex((f) => f.itemName === name)
    if (existingIndex >= 0) {
      remove(existingIndex)
    } else {
      append({ itemName: name, quantity: 1 })
    }
  }

  function addCustomComponent() {
    const trimmed = customComponent.trim()
    if (!trimmed) return
    append({ itemName: trimmed, quantity: 1 })
    setCustomComponent('')
  }

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Service date" type="date" error={errors.date?.message} {...register('date')} />
        <Input
          label="Mileage (km)"
          type="number"
          error={errors.mileage?.message}
          {...register('mileage')}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Workshop name"
          placeholder="Auto Care Center"
          error={errors.workshopName?.message}
          {...register('workshopName')}
        />
        <Input
          label="Workshop location"
          placeholder="Petaling Jaya"
          error={errors.workshopLocation?.message}
          {...register('workshopLocation')}
        />
      </div>
      <Input
        label="Total cost (RM)"
        type="number"
        step="0.01"
        error={errors.totalCost?.message}
        {...register('totalCost')}
      />
      <Textarea
        label="Notes (optional)"
        placeholder="Anything worth remembering…"
        error={errors.notes?.message}
        {...register('notes')}
      />

      <div>
        <p className="text-sm font-medium text-navy-700">Parts & components replaced</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {DEFAULT_SERVICE_COMPONENTS.map((name) => {
            const active = fields.some((f) => f.itemName === name)
            return (
              <button
                type="button"
                key={name}
                onClick={() => toggleDefaultComponent(name)}
                className={clsx(
                  'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                  active
                    ? 'border-navy-700 bg-navy-700 text-white'
                    : 'border-mist-300 bg-white text-navy-600 hover:border-steel-400',
                )}
              >
                {name}
              </button>
            )
          })}
        </div>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Add a custom component…"
            value={customComponent}
            onChange={(e) => setCustomComponent(e.target.value)}
            className="flex-1"
          />
          <Button type="button" variant="secondary" onClick={addCustomComponent}>
            <Plus size={16} />
          </Button>
        </div>

        {fields.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-2 rounded-xl border border-mist-200 p-2.5"
              >
                <span className="flex-1 truncate text-sm font-medium text-navy-800">
                  {field.itemName}
                </span>
                <Input
                  type="number"
                  aria-label="Quantity"
                  className="w-16"
                  {...register(`items.${index}.quantity`)}
                />
                <Input
                  type="number"
                  aria-label="Cost"
                  placeholder="RM"
                  step="0.01"
                  className="w-24"
                  {...register(`items.${index}.cost`)}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="shrink-0 rounded-full p-1.5 text-navy-400 hover:bg-mist-100 hover:text-red-600"
                  aria-label="Remove"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

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
