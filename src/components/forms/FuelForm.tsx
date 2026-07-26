import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Button } from '@/components/common/Button'
import { fuelFormSchema, type FuelFormInput, type FuelFormValues } from '@/lib/validation/fuel'
import { FUEL_TYPES } from '@/utils/constants'

interface FuelFormProps {
  defaultValues?: Partial<FuelFormValues>
  onSubmit: (values: FuelFormValues) => Promise<void> | void
  onCancel: () => void
  submitLabel?: string
}

export function FuelForm({ defaultValues, onSubmit, onCancel, submitLabel = 'Save fuel record' }: FuelFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FuelFormInput, unknown, FuelFormValues>({
    resolver: zodResolver(fuelFormSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
      mileage: 0,
      petrolStation: '',
      petrolType: 'RON95',
      litres: 0,
      totalPrice: 0,
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Refuel date" type="date" error={errors.date?.message} {...register('date')} />
        <Input
          label="Mileage (km)"
          type="number"
          error={errors.mileage?.message}
          {...register('mileage')}
        />
      </div>
      <Input
        label="Petrol station (optional)"
        placeholder="Petronas, Shell…"
        error={errors.petrolStation?.message}
        {...register('petrolStation')}
      />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Fuel type" error={errors.petrolType?.message} {...register('petrolType')}>
          {FUEL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Input
          label="Litres"
          type="number"
          step="0.01"
          error={errors.litres?.message}
          {...register('litres')}
        />
      </div>
      <Input
        label="Total cost (RM)"
        type="number"
        step="0.01"
        error={errors.totalPrice?.message}
        {...register('totalPrice')}
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
