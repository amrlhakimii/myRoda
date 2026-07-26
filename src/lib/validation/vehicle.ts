import { z } from 'zod'

export const vehicleSchema = z.object({
  vehicleType: z.enum(['car', 'motorcycle']),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.coerce.number().int().min(1980).max(new Date().getFullYear() + 1),
  registrationNumber: z.string().min(1, 'Registration number is required'),
  mileage: z.coerce.number().min(0, 'Mileage cannot be negative'),
  nickname: z.string().optional(),
})
/** Parsed/coerced output — what onSubmit handlers receive. */
export type VehicleFormValues = z.output<typeof vehicleSchema>
/** Raw shape react-hook-form should type its fields as (numeric inputs arrive as strings pre-coercion). */
export type VehicleFormInput = z.input<typeof vehicleSchema>
