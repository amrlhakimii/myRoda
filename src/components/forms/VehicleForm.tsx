import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Button } from '@/components/common/Button'
import { vehicleSchema, type VehicleFormInput, type VehicleFormValues } from '@/lib/validation/vehicle'

interface VehicleFormProps {
  defaultValues?: Partial<VehicleFormValues>
  onSubmit: (values: VehicleFormValues) => Promise<void> | void
  onCancel: () => void
  submitLabel?: string
}

export function VehicleForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Save vehicle',
}: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormInput, unknown, VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vehicleType: 'car',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      registrationNumber: '',
      mileage: 0,
      nickname: '',
      ...defaultValues,
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className="flex flex-col gap-4"
      noValidate
    >
      <Select label="Vehicle type" error={errors.vehicleType?.message} {...register('vehicleType')}>
        <option value="car">Car</option>
        <option value="motorcycle">Motorcycle</option>
      </Select>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Brand" placeholder="Perodua" error={errors.brand?.message} {...register('brand')} />
        <Input label="Model" placeholder="Myvi" error={errors.model?.message} {...register('model')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Year"
          type="number"
          error={errors.year?.message}
          {...register('year')}
        />
        <Input
          label="Registration no."
          placeholder="WXX 1234"
          error={errors.registrationNumber?.message}
          {...register('registrationNumber')}
        />
      </div>
      <Input
        label="Current mileage (km)"
        type="number"
        error={errors.mileage?.message}
        {...register('mileage')}
      />
      <Input
        label="Nickname (optional)"
        placeholder="e.g. Daily Driver"
        error={errors.nickname?.message}
        {...register('nickname')}
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
